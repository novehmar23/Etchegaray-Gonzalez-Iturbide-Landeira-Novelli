import Web3 from "web3";
import eventTokenArtifact from "../../build/contracts/EventToken.json";
import vendorArtifact from "../../build/contracts/Vendor.json";

const App = {
  web3: null,
  account: null,
  ev: null,
  vendor: null,

  connect: async function() {
    if(window.ethereum)
    {
      // Proveedor web 3
      await window.ethereum.request({method: 'eth_requestAccounts'});

      web3 = new Web3(window.ethereum);

      console.log("connected");
    }
    else 
    {
      console.warn(
        "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      App.web3 = new Web3(
        new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
      );
    }
  },

  getAccountsAndNetwork: async function()
  {
    try
      {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = eventTokenArtifact.networks[networkId];
        this.ev = new web3.eth.Contract(
          eventTokenArtifact.abi,
          deployedNetwork.address,
        );
        this.vendor = new web3.eth.Contract(
          vendorArtifact.abi,
          deployedNetwork.address,
        )

        const accounts = await web3.eth.getAccounts();
        this.account = accounts[0];
      }
      catch(error)
      {
        //Rechazado, o la network no existe/ no quiere conectar.
        console.error("Could not connect to contract or chain.");
      }
  },

  refreshBalance: async function() {
    const balanceElement = document.getElementsByClassName("balance")[0];
    const accountElement = document.getElementsByClassName("account")[0];

    if(balanceElement === undefined){
      return;
    }

    this.getBalanceForAccount(this.account).then(
    balance => 
      {
        balanceElement.innerHTML = balance;
        accountElement.innerHTML = this.account.substring(0, 4) + "..." + this.account.substring(this.account.length - 4);
      });
  },

  getBalanceForAccount: async function(account) {
    const { getBalance } = this.ev.methods;
    const balance = await getBalance(account).call();

    return balance;
  },

  sendCoin: async function(from, to, amount) {
    try{
      const { sendCoin } = this.ev.methods;
      await sendCoin(to, amount).send({ from: from });

      this.refreshBalance();
      return true;
    }catch(error)
    {
      console.error(error);
      return false;
    }
  },

  buyCoin: async function(amount) {
    const { buyTokens } = this.vendor.methods;
    await buyTokens().send({value: amount, from: this.account});

    this.refreshBalance();
  },

  sellCoin: async function(amount) {
    const { sellTokens } = this.vendor.methods;
    await sellTokens(amount).send({from: this.account});

    this.refreshBalance();
  },

  getValueInEthsBuy: async function(amount)
  {
    const { convertToEthBuy } = this.ev.methods;
    const balance = await convertToEthBuy(amount).call();

    return balance;
  },

  getValueInEthsSell: async function(amount)
  {
    const { convertToEthSell } = this.ev.methods;
    const balance = convertToEthSell(amount).call();

    return balance;
  }
};

const Events = 
{
  loginWithMetamask: async function() {
    await App.connect();
    document.location.href = "./mainPage.html";
  },

  getCoinsForUser: async function() {
    await App.connect();
    await App.getAccountsAndNetwork();

    const receiver = document.getElementById("receiver");
    if(receiver === undefined){
      return;
    }

    await App.getBalanceForAccount(receiver.value).then(
      balance => 
      {
        const showTokens = document.getElementById("showTokens");

        if(showTokens === undefined){
          return;
        }

        showTokens.style = "";
        showTokens.innerHTML = balance;
      });
  },

  sendCoinsToUser: async function() {
    await App.connect();
    await App.getAccountsAndNetwork();

    const receiver = document.getElementById("receiver");
    const amount = document.getElementById("amount");
    if(receiver === undefined || amount === undefined){
      return;
    }

    await App.sendCoin(App.account, receiver.value, Number.parseInt(amount.value)).then(
      result => 
      {
        if(result)
        {
          receiver.value = "";
          amount.value = "";
        }
      }
    );
  },

  goToTradingPage: function() {
    document.location.href = "./trading.html";
  },

  goToBalancePage: function() {
    document.location.href = "./checkOtherUsersBalance.html";
  },

  goToMainPage: function() {
    document.location.href = "./mainPage.html";
  },

  goToExchangePage: function() {
    document.location.href = "./exchange.html";
  },

  actualizeConvertionBuyState: function(){
    App.getValueInEthsBuy(document.getElementById("quantityBuy").value).then(
      balance => {
        document.getElementById("priceInETHBuy").innerHTML = balance;
      });
  },

  actualizeConvertionSellState: function(){
    App.getValueInEthsSell(document.getElementById("quantitySell").value).then(
      balance => {
        document.getElementById("priceInETHSell").innerHTML = balance;
      });
  },

  buyCoin: function(){
    App.buyCoin(document.getElementById("quantityBuy").value);
  },

  sellCoin: function(){
    App.sellCoin(document.getElementById("quantitySell").value);
  },
}

window.Events = Events;

window.addEventListener("load", async function() {
  const index = document.getElementById("indexChecker");
  if(index === undefined || index === null){
    await App.connect();
    await App.getAccountsAndNetwork();
    App.refreshBalance();
  }
});
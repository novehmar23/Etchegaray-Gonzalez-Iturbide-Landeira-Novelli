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

  // Account Balance
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
  ////

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

  // Set Buy/Sell Price
  setBuyPrice: async function(amount) {
    const { adjustTokensPerEthBuy } = this.ev.methods;
    await adjustTokensPerEthBuy(amount).send({from:this.account});
  },

  setSellPrice: async function(amount) {
    const { adjustTokensPerEthSell } = this.ev.methods;
    await adjustTokensPerEthSell(amount).send({from:this.account});
  },
  ////

  //Buy / Sell coin
  buyCoin: async function(amount) {
    const { buyTokens } = this.vendor.methods;
    console.log(await buyTokens().send({value: amount, from: this.account}));

    this.refreshBalance();
  },

  sellCoin: async function(amount) {
    const { sellTokens } = this.ev.methods;
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
  ////
};

// BUTTON EVENTS
const Events = 
{
  //FOR INDEX.HTML
  loginWithMetamask: async function() {
    await App.connect();
    document.location.href = "./mainPage.html";
  },

  ////

  // FOR ALL NAVBAR HTML's
  getCoinsForUser: async function() {
    await App.connect();
    await App.getAccountsAndNetwork();

    const receiver = this.getElementWrapper("receiver");

    await App.getBalanceForAccount(receiver.value).then(
      balance => 
      {
        const showTokens = this.getElementWrapper("showTokens");

        showTokens.style = "";
        showTokens.innerHTML = balance;
      });
  },

  goToAdminPage: function() {
    document.location.href = "./admin.html";
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

  ////

  // FOR TRADING.HTML
  sendCoinsToUser: async function() {
    await App.connect();
    await App.getAccountsAndNetwork();

    const receiver = document.getElementById("receiver");
    const amount = document.getElementById("amount");

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
  ////

  // FOR EXCHANGE.HTML
  actualizeConvertionBuyState: function(){
    const quantityBuy = this.getElementWrapper("quantityBuy");
    const priceInETHBuy = this.getElementWrapper("priceInETHBuy");

    App.getValueInEthsBuy(quantityBuy.value).then(
      balance => {
        priceInETHBuy.innerHTML = balance;
      });
  },

  actualizeConvertionSellState: function(){
    const quantitySell = this.getElementWrapper("quantitySell");
    const priceInETHSell = this.getElementWrapper("priceInETHSell");

    App.getValueInEthsSell(quantitySell.value).then(
      balance => {
        priceInETHSell.innerHTML = balance;
      });
  },

  buyCoin: function(){
    const quantityBuy = this.getElementWrapper("quantityBuy");

    App.buyCoin(quantityBuy.value);
  },

  sellCoin: function(){
    const quantitySell = this.getElementWrapper("quantitySell");

    App.sellCoin(quantitySell.value);
  },

  ////

  // FOR ADMIN.HTML
  setBuyPrice: function(){
    const buyPrice = this.getElementWrapper("evBuyPrice");
    const setBuyPrice = this.getElementWrapper("setBuyPrice");

    App.setBuyPrice(setBuyPrice.value).then(
      App.getValueInEthsBuy(1).then(
      balance => {
        buyPrice.innerHTML = balance;
      }));
  },

  setSellPrice: function(){
    const sellPrice = this.getElementWrapper("evSellPrice");
    const setSellPrice = this.getElementWrapper("setSellPrice");

    App.setSellPrice(setSellPrice.value).then(
      App.getValueInEthsSell(1).then(
      balance => {
        sellPrice.innerHTML = balance;
      }));
  },
  ////

  getElementWrapper: function(name)
  {
    const element = document.getElementById(name);

    if(element === undefined)
    {
      console.error("Element doesnt exist");
      throw new Error("Element doesnt exist");
    }

    return element;
  }
}

window.Events = Events;

window.addEventListener("load", async function() {
  const index = document.getElementById("indexChecker");
  if(index === undefined || index === null){
    await App.connect();
    await App.getAccountsAndNetwork();
    App.refreshBalance();

    window.ethereum.on('accountsChanged', async () => {
      await App.getAccountsAndNetwork();
      App.refreshBalance();
    })
  }
});
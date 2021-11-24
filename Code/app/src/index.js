import Web3 from "web3";
import eventTokenArtifact from "../../build/contracts/EventToken.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  connect: async function() {
    if(window.ethereum)
    {
      // Proveedor web 3
      await window.ethereum.request({method: 'eth_requestAccounts'});

      web3 = new Web3(window.ethereum);
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
        this.meta = new web3.eth.Contract(
          eventTokenArtifact.abi,
          deployedNetwork.address,
        );

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
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(this.account).call();
    console.log(balance);

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

  sendCoin: async function() {
    const amount = parseInt(document.getElementById("amount").value);
    const receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    const { sendCoin } = this.meta.methods;
    await sendCoin(receiver, amount).send({ from: this.account });

    this.setStatus("Transaction complete!");
    this.refreshBalance();
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

const Events = 
{
  loginWithMetamask: async function() {
    await App.connect();
    document.location.href = "./mainPage.html";
  },

  getAccountsAndNetwork: async function() {
    await App.getAccountsAndNetwork();
  },

  testo: async function() {
    await App.connect();
    await App.getAccountsAndNetwork();
    console.log(App.account);
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
    document.getElementById("priceInETHBuy").innerHTML =  document.getElementById("quantityBuy").value * 2;
  },

  actualizeConvertionSellState: function(){
    document.getElementById("priceInETHSell").innerHTML =  document.getElementById("quantitySell").value * 4;
  },

  buyCoin: function(){
  
  },

  sellCoin: function(){
  
  },
}

window.Events = Events;
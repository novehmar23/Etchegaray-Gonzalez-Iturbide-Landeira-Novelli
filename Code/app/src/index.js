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
    const balanceElement = document.getElementsByClassName("balance")[0];

    if(balanceElement === undefined){
      return;
    }

    this.getBalanceForAccount(this.account).then(
    balance => 
      {
        balanceElement.innerHTML = balance;
      });
  },

  getBalanceForAccount: async function(account) {
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(account).call();

    return balance;
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

  getCoinsForUser: async function() {
    await App.connect();
    await this.getAccountsAndNetwork();

    const receiver = document.getElementById("receiver");

    await App.getBalanceForAccount(receiver.value).then(
      balance => 
      {
        const showTokens = document.getElementById("showTokens");

        showTokens.style = "";
        showTokens.innerHTML = balance;
      });
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
}

window.Events = Events;

window.addEventListener("load", async function() {
  await App.connect();
  await Events.getAccountsAndNetwork();
  App.refreshBalance();
});
import Web3 from "web3";
import eventTokenArtifact from "../../build/contracts/EventToken.json";
import vendorArtifact from "../../build/contracts/Vendor.json";

const App = {
  web3: null,
  account: null,
  ev: null,
  vendor: null,

  connect: async function () {
    if (window.ethereum) {
      // Proveedor web 3
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      web3 = new Web3(window.ethereum);

      console.log("connected");
    }
    else {
      console.warn(
        "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      App.web3 = new Web3(
        new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
      );
    }
  },

  getAccountsAndNetwork: async function () {
    try {
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
    catch (error) {
      //Rechazado, o la network no existe/ no quiere conectar.
      console.error("Could not connect to contract or chain.");
    }
  },

  // Account Balance
  refreshBalance: async function () {
    const balanceElement = document.getElementsByClassName("balance")[0];
    const accountElement = document.getElementsByClassName("account")[0];

    if (balanceElement === undefined || accountElement === undefined) {
      return;
    }

    this.getBalanceForAccount(this.account).then(
      balance => {
        balanceElement.innerHTML = balance;
        accountElement.innerHTML = this.account.substring(0, 4) + "..." + this.account.substring(this.account.length - 4);
      });
  },

  getBalanceForAccount: async function (account) {
    const { getBalance } = this.ev.methods;
    const balance = await getBalance(account).call();

    return balance;
  },
  ////

  sendCoin: async function (from, to, amount) {
    try {
      const { sendCoin } = this.ev.methods;
      await sendCoin(to, amount).send({ from: from });

      this.refreshBalance();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  // Set Buy/Sell Price
  setBuyPrice: async function (to) {

  },

  setSellPrice: async function (to) {

  },
  ////

  //Buy / Sell coin
  buyCoin: async function (amount) {
    const { buyTokens } = this.vendor.methods;
    await buyTokens().send({ value: amount, from: this.account });

    this.refreshBalance();
  },

  sellCoin: async function (amount) {
    const { sellTokens } = this.vendor.methods;
    await sellTokens(amount).send({ from: this.account });

    this.refreshBalance();
  },

  getValueInEthsBuy: async function (amount) {
    const { convertToEthBuy } = this.ev.methods;
    const balance = await convertToEthBuy(amount).call();

    return balance;
  },

  getValueInEthsSell: async function (amount) {
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
  loginWithMetamask: async function () {
    await App.connect();
    document.location.href = "./mainPage.html";
  },

  ////

  // FOR ALL NAVBAR HTML's
  getCoinsForUser: async function () {
    await App.connect();
    await App.getAccountsAndNetwork();

    const receiver = this.getElementWrapper("receiver");

    await App.getBalanceForAccount(receiver.value).then(
      balance => {
        const showTokens = this.getElementWrapper("showTokens");

        showTokens.style = "";
        showTokens.innerHTML = balance;
      });
  },

  goToAdminPage: function () {
    document.location.href = "./admin.html";
  },

  goToTradingPage: function () {
    document.location.href = "./trading.html";
  },

  goToBalancePage: function () {
    document.location.href = "./checkOtherUsersBalance.html";
  },

  goToTokensMainPage: function () {
    document.location.href = "./tokensMainPage.html";
  },

  goToVotingMainPage: function () {
    document.location.href = "./votingMainPage.html";
  },

  goToCreateBallotPage: function () {
    document.location.href = "./createBallot.html";
  },

  goToMainPage: function () {
    document.location.href = "./mainPage.html";
  },

  goToExchangePage: function () {
    document.location.href = "./exchange.html";
  },

  goToMyBallots: function () {
    document.location.href = "./myBallots.html";
  },

  goToAllBallots: function () {
    document.location.href = "./allBallots.html";
  },

  closeBallot: function () {
    selectedRow.cells[4].innerHTML = 'destroyed';
    selectedRow.cells[0].style.color = '#AFAFAF';
    selectedRow.cells[1].style.color = '#AFAFAF';
    selectedRow.cells[2].style.color = '#AFAFAF';
    selectedRow.cells[3].style.color = '#AFAFAF';
    selectedRow.cells[4].style.color = '#B5573C';

    Events.refreshCloseBallotButton('destroyed');
  },

  voteOptionA: function () {
    alert("Se clockeo el boton para votar la opcion A");
  },

  voteOptionB: function () {
    alert("Se clockeo el boton para votar la opcion B");
  },

  voteOptionC: function () {
    alert("Se clockeo el boton para votar la opcion C");
  },

  ////

  // FOR TRADING.HTML
  sendCoinsToUser: async function () {
    await App.connect();
    await App.getAccountsAndNetwork();

    const receiver = this.getElementWrapper("receiver");
    const amount = this.getElementWrapper("amount");

    await App.sendCoin(App.account, receiver.value, Number.parseInt(amount.value)).then(
      result => {
        if (result) {
          receiver.value = "";
          amount.value = "";
        }
      }
    );
  },
  ////

  // FOR MYBALLOTS.HTML
  loadBallotsTable: function (currentPageName) {

    let myTable = this.getElementWrapper('ballotsTable');
    let headerRow = document.createElement('tr');

    myBallotsTableHeaders.forEach(headerText => {
      let header = document.createElement('th');
      header.style.padding = '8px';
      let textNode = document.createTextNode(headerText);
      header.appendChild(textNode);
      headerRow.appendChild(header);
    });

    myTable.appendChild(headerRow);

    if (currentPageName == 'myBallots') {
      var currentButton = this.getElementWrapper('closeButton');
      currentButton.disabled = true;
      Events.refreshMyBallotsTable();
    }else{
      Events.refreshAllBallotsTable();
    }

    this.loadInfoText();

  },

  loadInfoText: function () {
    let detailsSelectedOptions = this.getElementWrapper('options');
    let infoDetailsText = document.createElement('p');
    infoDetailsText.textContent = 'Double click a ballot to see their details.'
    infoDetailsText.style.textAlign = 'center';
    infoDetailsText.style.marginTop = '160px';
    detailsSelectedOptions.appendChild(infoDetailsText);
  },

  refreshMyBallotsTable: function () {
    let myTable = this.getElementWrapper('ballotsTable');

    let myBallotsIndex = 0;
    myBallots.forEach(currentBallot => {
      let row = document.createElement('tr');

      Object.values(currentBallot).forEach(text => {
        let cell = document.createElement('td');
        cell.style.padding = '8px';
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
      })

      row.style.borderBlockWidth = '0.5px';

      if (row.cells[4].innerHTML == 'open') {
        row.cells[4].style.color = 'green';
      } else {
        row.cells[4].style.color = 'red';
      }

      if (myBallotsIndex % 2 === 0) {
        row.style.backgroundColor = '#ECF6FE';
      } else {
        row.style.backgroundColor = '#FFFFFF';
      }
      let currentBackgroundColor = row.style.backgroundColor;

      row.addEventListener('mouseover', () => {
        if (selectedRowId != row.cells[0]) {
          row.style.backgroundColor = '#C0E3FB';
        }
      });

      row.addEventListener('mouseout', () => {
        if (selectedRowId != row.cells[0]) {
          row.style.backgroundColor = currentBackgroundColor;
        }
      });

      row.addEventListener('dblclick', () => {
        Events.refreshSelectedDetailsBallot(row, row.cells[0]);
        if (selectedRow != null) {
          selectedRow.style.backgroundColor = selectedRowOriginalBackgroundColor;
        }
        selectedRow = row;
        selectedRowId = row.cells[0];
        Events.refreshCloseBallotButton(row.cells[4].innerHTML);
      });

      myTable.appendChild(row);
      myBallotsIndex++;
    });

  },

  refreshAllBallotsTable: function () {
    let myTable = this.getElementWrapper('ballotsTable');

    let myBallotsIndex = 0;
    myBallots.forEach(currentBallot => {
      let row = document.createElement('tr');

      Object.values(currentBallot).forEach(text => {
        let cell = document.createElement('td');
        cell.style.padding = '8px';
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
      })

      row.style.borderBlockWidth = '0.5px';

      if (row.cells[4].innerHTML == 'open') {
        row.cells[4].style.color = 'green';
      } else {
        row.cells[4].style.color = 'red';
      }

      if (myBallotsIndex % 2 === 0) {
        row.style.backgroundColor = '#ECF6FE';
      } else {
        row.style.backgroundColor = '#FFFFFF';
      }
      let currentBackgroundColor = row.style.backgroundColor;

      row.addEventListener('mouseover', () => {
        if (selectedRowId != row.cells[0]) {
          row.style.backgroundColor = '#C0E3FB';
        }
      });

      row.addEventListener('mouseout', () => {
        if (selectedRowId != row.cells[0]) {
          row.style.backgroundColor = currentBackgroundColor;
        }
      });

      row.addEventListener('dblclick', () => {
        Events.refreshVotingOptions(row, row.cells[0]);
        if (selectedRow != null) {
          selectedRow.style.backgroundColor = selectedRowOriginalBackgroundColor;
        }
        selectedRow = row;
        selectedRowId = row.cells[0]; 
        Events.refreshCloseBallotButton(row.cells[4].innerHTML);
      });
      
      if(row.cells[4].innerHTML !== 'expired'){
        myTable.appendChild(row);
      }

      myBallotsIndex++;
    });

  },

  refreshVotingOptions: function (currentRow, rowIndex) {
    currentRow.style.backgroundColor = '#83B8DE';

    let optionA = this.getElementWrapper('optionA');
    while(optionA.firstChild){
      optionA.removeChild(optionA.firstChild);
    }
    let optionB = this.getElementWrapper('optionB');
    while(optionB.firstChild){
      optionB.removeChild(optionB.firstChild);
    }
    let optionC = this.getElementWrapper('optionC');
    while(optionC.firstChild){
      optionC.removeChild(optionC.firstChild);
    }

    let visibility = this.getElementWrapper('visibility');
    visibility.hidden = false;
    // options.innerHTML = '';

    let count = 0;
    myBallotsDetails[rowIndex.innerHTML - 1].details.forEach(currentOptionData => {
      let currentOption = document.createElement('div');
      let titleA = document.createElement('h6');
      let naemA = document.createElement('pre');
      let naemAText = document.createElement("i");
      let accountA = document.createElement('pre');
      let accountAText = document.createElement('i');
      let descriptionA = document.createElement('pre');
      let descriptionAText = document.createElement('i');
      descriptionA.style.marginBottom = '15px';

      titleA.textContent = currentOptionData.title;
      naemA.textContent = selectedBallotOptionDetailsTittles[0];
      naemAText.textContent = currentOptionData.name;
      accountA.textContent = selectedBallotOptionDetailsTittles[1];
      accountAText.textContent = currentOptionData.account;
      descriptionA.textContent = selectedBallotOptionDetailsTittles[2];
      descriptionAText.textContent = currentOptionData.description;

      currentOption.appendChild(titleA);
      naemA.appendChild(naemAText);
      currentOption.appendChild(naemA);
      accountA.appendChild(accountAText);
      currentOption.appendChild(accountA);
      descriptionA.appendChild(descriptionAText);
      currentOption.appendChild(descriptionA);

      if(count == 0){
        optionA.appendChild(currentOption);
      }
      if(count == 1){
        optionB.appendChild(currentOption);
      }
      if(count ==2){
        optionC.appendChild(currentOption);
      }
      count++;
    });
  },

  refreshSelectedDetailsBallot: function (currentRow, rowIndex) {
    currentRow.style.backgroundColor = '#83B8DE';

    let options = this.getElementWrapper('options');
    options.innerHTML = '';
    let detailsTitle = document.createElement('h4');
    detailsTitle.textContent = 'Selected ballot details:';
    options.appendChild(detailsTitle);
    options.appendChild(document.createElement('br'));
    myBallotsDetails[rowIndex.innerHTML - 1].details.forEach(currentOptionData => {
      let currentOption = document.createElement('div');
      let titleA = document.createElement('h6');
      let naemA = document.createElement('pre');
      let naemAText = document.createElement("i");
      let accountA = document.createElement('pre');
      let accountAText = document.createElement('i');
      let descriptionA = document.createElement('pre');
      let descriptionAText = document.createElement('i');
      descriptionA.style.marginBottom = '15px';

      titleA.textContent = currentOptionData.title;
      naemA.textContent = selectedBallotOptionDetailsTittles[0];
      naemAText.textContent = currentOptionData.name;
      accountA.textContent = selectedBallotOptionDetailsTittles[1];
      accountAText.textContent = currentOptionData.account;
      descriptionA.textContent = selectedBallotOptionDetailsTittles[2];
      descriptionAText.textContent = currentOptionData.description;

      currentOption.appendChild(titleA);
      naemA.appendChild(naemAText);
      currentOption.appendChild(naemA);
      accountA.appendChild(accountAText);
      currentOption.appendChild(accountA);
      descriptionA.appendChild(descriptionAText);
      currentOption.appendChild(descriptionA);

      options.appendChild(currentOption);
    });
  },

  refreshCloseBallotButton: function (currentStatus) {
    var currentButton = this.getElementWrapper('closeButton');
    if (currentStatus == 'destroyed') {
      currentButton.disabled = true;
      currentButton.style.backgroundColor = '#73A7F4';
    } else {
      currentButton.disabled = false;
      currentButton.style.backgroundColor = '#4B8EF1';
    }
  },
  ////

  // FOR EXCHANGE.HTML
  actualizeConvertionBuyState: function () {
    const quantityBuy = this.getElementWrapper("quantityBuy");
    const priceInETHBuy = this.getElementWrapper("priceInETHBuy");

    App.getValueInEthsBuy(quantityBuy.value).then(
      balance => {
        priceInETHBuy.innerHTML = balance;
      });
  },

  actualizeConvertionSellState: function () {
    const quantitySell = this.getElementWrapper("quantitySell");
    const priceInETHSell = this.getElementWrapper("priceInETHSell");

    App.getValueInEthsSell(quantitySell.value).then(
      balance => {
        priceInETHSell.innerHTML = balance;
      });
  },

  buyCoin: function () {
    const quantityBuy = this.getElementWrapper("quantityBuy");

    App.buyCoin(quantityBuy.value);
  },

  sellCoin: function () {
    const quantitySell = this.getElementWrapper("quantitySell");

    App.sellCoin(quantitySell.value);
  },

  ////

  // FOR ADMIN.HTML
  setBuyPrice: function () {
    const buyPrice = this.getElementWrapper("evBuyPrice");
    const setBuyPrice = this.getElementWrapper("setBuyPrice");

    App.setBuyPrice(setBuyPrice.value).then(
      balance => {
        buyPrice.innerHTML = balance;
      });
  },

  setSellPrice: function () {
    const sellPrice = this.getElementWrapper("evSellPrice");
    const setSellPrice = this.getElementWrapper("setSellPrice");

    App.setBuyPrice(setSellPrice.value).then(
      balance => {
        sellPrice.innerHTML = balance;
      });
  },
  ////

  getElementWrapper: function (name) {
    const element = document.getElementById(name);

    if (element === undefined) {
      console.error("Element doesnt exist");
      throw new Error("Element doesnt exist");
    }

    return element;
  }
}

window.Events = Events;

window.addEventListener("load", async function () {
  const index = Events.getElementWrapper("indexChecker");
  if (index === undefined || index === null) {
    await App.connect();
    await App.getAccountsAndNetwork();
    App.refreshBalance();

    window.ethereum.on('accountsChanged', async () => {
      await App.getAccountsAndNetwork();
      App.refreshBalance();
    })
  }
});

//TESTING ATTRIBUTES FOR FRONT
let myBallots = [
  { id: '1', title: 'Which cat is the cutest?', startingDate: '2021/12/08', ballotDuration: '240', status: 'open' },
  { id: '2', title: 'Which dog is the cutest?', startingDate: '2021/12/10', ballotDuration: '300', status: 'expired' },
  { id: '3', title: 'Which bird is the cutest?', startingDate: '2021/12/15', ballotDuration: '210', status: 'open' }
]
let myBallotsTableHeaders = ['#', 'Title', 'Starting date', 'Ballot duration', 'Status']
var selectedRow = null;
let selectedRowId = 0;
let selectedRowOriginalBackgroundColor = null;


let selectedBallotOptionDetailsTittles = ['Name:         ', 'Account:      ', 'Description:  ']

let OptonsFromSelected1 = [
  { title: 'Option A', name: 'El nombre 1', account: 'El numero de cuenta 1', description: 'Esta es una descripcion y no puede ser mas largaaaaaaaaaaaa1' },
  { title: 'Option B', name: 'El nombre 2', account: 'El numero de cuenta 2', description: 'Esta es una descripcion y no puede ser mas largaaaaaaaaaaaa2' },
  { title: 'Option C', name: 'El nombre 3', account: 'El numero de cuenta 3', description: 'Esta es una descripcion y no puede ser mas largaaaaaaaaaaaa3' }
]


let OptonsFromSelected2 = [
  { title: 'Option A', name: 'El nombre 4', account: 'El numero de cuenta 4', description: 'Esta es una descripcion y no puede ser mas largaaaaaaaaaaaa4' },
  { title: 'Option B', name: 'El nombre 5', account: 'El numero de cuenta 5', description: 'Esta es una descripcion y no puede ser mas largaaaaaaaaaaaa5' },
  { title: 'Option C', name: 'El nombre 6', account: 'El numero de cuenta 6', description: 'Esta es una descripcion y no puede ser mas largaaaaaaaaaaaa6' }
]


let OptonsFromSelected3 = [
  { title: 'Option A', name: 'El nombre 7', account: 'El numero de cuenta 7', description: 'Esta es una descripcion y no puede ser mas largaaaaaaaaaaaa7' },
  { title: 'Option B', name: 'El nombre 8', account: 'El numero de cuenta 8', description: 'Esta es una descripcion y no puede ser mas largaaaaaaaaaaaa8' },
  { title: 'Option C', name: 'El nombre 9', account: 'El numero de cuenta 9', description: 'Esta es una descripcion y no puede ser mas largaaaaaaaaaaaa9' }
]

let myBallotsDetails = [
  { id: '1', details: OptonsFromSelected1 },
  { id: '2', details: OptonsFromSelected2 },
  { id: '3', details: OptonsFromSelected3 }
]

let firstVote = document.createElement('checkbox');
let secondVote = document.createElement('checkbox');
let thirdVote = document.createElement('checkbox');

let myBallotsVote = [
  { id: '1', vote: firstVote },
  { id: '2', vote: secondVote },
  { id: '3', vote: thirdVote }
]

let currentNamePage = "";

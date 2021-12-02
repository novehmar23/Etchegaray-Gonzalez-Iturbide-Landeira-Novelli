const EventToken = artifacts.require("EventToken");

contract("EventToken", accounts => {
  let instance = null;
  beforeEach(async () => {
    var instance1 = await EventToken.deployed();
    assert.ok(instance1)

    instance = await EventToken.new();

  });
  
  it("should put 10000000000000000000000000 EventToken in the first account", async () => {
    const balance = await instance.getBalance(accounts[0]);
    assert.equal(balance.valueOf(), 10000000000000000000000000, "10000000000000000000000000 wasn't in the first account");
  });

  it("should send coin correctly", async () => {
    const account1 = accounts[1];
    const account2 = accounts[2];
    const account0 = accounts[0];

    const amount = 100;
    await instance.sendCoin(account1, amount, { from: account0 });
    // get initial balances
    const initBalance1 = await instance.getBalance.call(account1)/ 10**18;
    const initBalance2 = await instance.getBalance.call(account2)/ 10**18;

    const secondAmount = amount - 5;
    // send coins from account 1 to 2
    await instance.sendCoin(account2, secondAmount, { from: account1 });

    // get final balances
    const finalBalance1 = await instance.getBalance.call(account1)/ 10**18;
    const finalBalance2 = await instance.getBalance.call(account2)/ 10**18;

    assert.equal(
        parseInt(finalBalance1),
        parseInt(initBalance1) - secondAmount,
      "Amount wasn't correctly taken from the sender",
    );
    assert.equal(
      parseInt(initBalance2),
      parseInt(finalBalance2) - (secondAmount - 5),
      // +5 representing de 5% comission he is taxing on himself because its main account
      "Amount wasn't correctly sent to the receiver",
    );
  });

  
  it("should buy 100 tokens from the 2nd account", async () => {

    await instance.buyTokens(100, {from: accounts[1], value: 1*10**18});
    const balance = await instance.getBalance.call(accounts[1]) / 10**18;

    assert.equal(parseInt(balance), 100, "100 wasn't in the second account");
  });

  it("should remove 100 tokens from the main acc", async () => {

    const originalBalance = await instance.getBalance.call(accounts[0]) / 10**18;
    await instance.buyTokens(100, {from: accounts[1], value: 1*10**18});
    const mainBalance = await instance.getBalance.call(accounts[0]) / 10**18;
    assert.equal(parseInt(mainBalance), parseInt(originalBalance) - 100, "100 werent removed from the main acc");
  });

  it("should remove 50 tokens from the 2nd account", async () => {

    await instance.buyTokens(100, {from: accounts[1], value: 1*10**18});
    const originalBalance = await instance.getBalance.call(accounts[1]) / 10**18;
    await instance.sellTokens(50,{from: accounts[1]});
    const mainBalance = await instance.getBalance.call(accounts[1]) / 10**18;
    assert.equal(parseInt(mainBalance), parseInt(originalBalance) - 50, "50 werent removed in the second account");
  });

  it("should add 50 tokens to the main acc", async () => {

    await instance.buyTokens(100, {from: accounts[1], value: 1*10**18});
    const originalBalance = await instance.getBalance.call(accounts[0]) / 10**18;
    await instance.sellTokens(50,{from: accounts[1]});
    const mainBalance = await instance.getBalance.call(accounts[0]) / 10**18;
    assert.equal(parseInt(mainBalance), parseInt(originalBalance) + 50, "50 tokens werent added to main account");
  });


});

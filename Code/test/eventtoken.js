const EventToken = artifacts.require("EventToken");

contract("EventToken", accounts => {
  let instance = null;
  beforeEach(async () => {
    var instance1 = await EventToken.deployed();
    assert.ok(instance1)

    instance = await EventToken.new();

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
    assert.equal(parseInt(mainBalance), parseInt(originalBalance) - 100, "100 wasn't in the second account");
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

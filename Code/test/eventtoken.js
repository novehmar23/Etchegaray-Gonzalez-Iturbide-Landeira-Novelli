const EventToken = artifacts.require("EventToken");

contract("EventToken", accounts => {
  let instance = null;
  beforeEach(async () => {
    var instance1 = await EventToken.deployed();
    assert.ok(instance1)

    instance = await EventToken.new();

  });

  /*
  it("should put 10000000 EventToken in the first account", async () => {

    const balance = await instance.getBalance.call(accounts[0]);
    assert.equal(balance.valueOf(), 10000000, "10000000 wasn't in the first account");
  });

  it("should call a function that depends on a linked library", async () => {

    const EventTokenBalance = await instance.getBalance.call(accounts[0]);
    const EventTokenBalanceInEth = await instance.getBalanceInEth.call(
      accounts[0],
    );

    const expected = 2 * EventTokenBalance.toNumber();

    assert.equal(
      EventTokenBalanceInEth.toNumber(),
      expected,
      "Library function returned unexpeced function, linkage may be broken",
    );
  });

  it("should send coin correctly", async () => {

    const account1 = accounts[0];
    const account2 = accounts[1];

    // get initial balances
    const initBalance1 = await instance.getBalance.call(account1);
    const initBalance2 = await instance.getBalance.call(account2);

    // send coins from account 1 to 2
    const amount = 10;
    await instance.sendCoin(account2, amount, { from: account1 });

    // get final balances
    const finalBalance1 = await instance.getBalance.call(account1);
    const finalBalance2 = await instance.getBalance.call(account2);

    assert.equal(
        finalBalance1,
        initBalance1.toLong() - amount,
      "Amount wasn't correctly taken from the sender",
    );
    assert.equal(
      finalBalance2.toNumber(),
      initBalance2.toNumber() + amount,
      "Amount wasn't correctly sent to the receiver",
    );
  });
*/
  
  it("should buy 10Eths worth in tokens from the main account", async () => {

    await instance.buyTokens(100, {from: accounts[1], value: 1*10**18});
    const balance = instance.getBalance.call(accounts[1]);
    assert.equal(balance.valueOf(), 100, "100 wasn't in the second account");
  });


});

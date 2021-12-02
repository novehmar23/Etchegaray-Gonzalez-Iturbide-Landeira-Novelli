const EventToken = artifacts.require("EventToken");

contract("EventToken", accounts => {
  it("should put 10000000000000000000000000 EventToken in the first account", async () => {
    const instance = await EventToken.deployed();
    const balance = await instance.getBalance(accounts[0]);
    assert.equal(balance.valueOf(), 10000000000000000000000000, "10000000000000000000000000 wasn't in the first account");
  });

  it("should send coin correctly", async () => {
    const instance = await EventToken.deployed();

    const account1 = accounts[0];
    const account2 = accounts[1];

    // get initial balances
    const initBalance1 = await instance.getBalance(account1);
    const initBalance2 = await instance.getBalance(account2);

    // send coins from account 1 to 2
    const amount = 10;
    await instance.sendCoin(account2, amount, { from: account1 });

    // get final balances
    const finalBalance1 = await instance.getBalance(account1);
    const finalBalance2 = await instance.getBalance(account2);

    assert.equal(
        Number.parseInt(finalBalance1),
        Number.parseInt(initBalance1) - amount,
      "Amount wasn't correctly taken from the sender",
    );
    assert.equal(
      Number.parseInt(initBalance2),
      Number.parseInt(finalBalance2) - amount,
      "Amount wasn't correctly sent to the receiver",
    );
  });

  it("should buy 10Eths worth in tokens from the main account", async () => {
    // const instance = await EventToken.deployed();
    // const balance = await instance.buyTokens({value: 10});
    // const balance = await instance.getBalance(accounts[0]).call();
    // assert.equal(balance.valueOf(), 10000000, "10000000 wasn't in the first account");
  });
})

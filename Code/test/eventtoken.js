const EventToken = artifacts.require("EventToken");

contract("EventToken", accounts => {
  it("should put 10000000 EventToken in the first account", async () => {
    const instance = await EventToken.deployed();
    const balance = await instance.getBalance(accounts[0]);
    assert.equal(balance.valueOf(), 10000000 * 10**18, "10000000000000000000000000 wasn't in the first account");
  });
});

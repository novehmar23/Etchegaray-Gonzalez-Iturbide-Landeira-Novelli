const EventVoterManager = artifacts.require("EventVoterManager");

contract("EventVoterManager", accounts => {
  it("Add ballot should add", async () => {
    const instance = await EventVoterManager.deployed();
    const from = (long)(Date.now()/1000);
    await instance.AddBallot(accounts[0], "Vote1", from, 299);
    const allBallots = await instance.GetAllBallots(); 
    assert.equal(allBallots.length, 1, "Length should have been 1");
  });
});

const EventVoterManager = artifacts.require("EventVoterManager");

contract("EventVoterManager", accounts => {
    let instance = null;
    beforeEach(async () => {
        var instance1 = await EventVoterManager.deployed();
        assert.ok(instance1)

        instance = await EventVoterManager.new(instance1.address);

    });

    it("Add ballot should add", async () => {
        let date = (new Date()).getTime();
        const from = Number.parseInt(date/1000);
        await instance.AddBallot(accounts[0], "Vote1", from, 299);
        const allBallots = await instance.GetAllBallots(); 
        assert.equal(allBallots.length, 1, "Length should have been 1");
    });

    it("Three Add ballot should add three times", async () => {
        let date = (new Date()).getTime();
        const from = Number.parseInt(date/1000);
        await instance.AddBallot(accounts[0], "Vote1", from, 299);
        await instance.AddBallot(accounts[3], "Vote2", from, 20);
        await instance.AddBallot(accounts[2], "Vote3", from, 11);
        const allBallots = await instance.GetAllBallots(); 
        assert.equal(allBallots.length, 3, "Length should have been 3");
    });
});

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

    it("Get ID gets the correct last ID.", async () => {
        let date = (new Date()).getTime();
        const from = Number.parseInt(date/1000);
        await instance.AddBallot(accounts[0], "Vote1", from, 299);
        const id = await instance.GetLastAddedBallotID();
        assert.equal(id.toNumber(), 1, "ID should be 1");
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

    it("Get Ballot brings information correctly", async () => {
        let date = (new Date()).getTime();
        const from = Number.parseInt(date/1000);
        await instance.AddBallot(accounts[2], "Vote1", from, 299);
        const allBallots = await instance.GetAllBallots();
        const firstBallot = allBallots[0];

        assert.equal(firstBallot["Id"], 1, "Id should be the same");
        assert.equal(firstBallot["Title"], "Vote1", "Title should be the same");
        assert.equal(firstBallot["Owner"], accounts[2], "Owners should be the same");
        assert.equal(firstBallot["StartingDate"], from, "Dates should be the same");
        assert.equal(firstBallot["Duration"], 299, "Durations should be the same");
        assert.equal(firstBallot["Status"], "Open", "Status makes sense");
    });

    it("Get Ballot brings information for many objects", async () => {
        let date = (new Date()).getTime();
        const from = Number.parseInt(date/1000);
        await instance.AddBallot(accounts[2], "Vote1", from, 299);
        await instance.AddBallot(accounts[1], "Vote2", from, 5);
        const allBallots = await instance.GetAllBallots();
        const firstBallot = allBallots[0];
        const secondBallot = allBallots[1];

        assert.equal(firstBallot["Id"], 1, "Id should be the same");
        assert.equal(firstBallot["Title"], "Vote1", "Title should be the same");
        assert.equal(firstBallot["Owner"], accounts[2], "Owners should be the same");
        assert.equal(firstBallot["StartingDate"], from, "Dates should be the same");
        assert.equal(firstBallot["Duration"], 299, "Durations should be the same");
        assert.equal(firstBallot["Status"], "Open", "Status makes sense");

        assert.equal(secondBallot["Id"], 2, "Id should be the same");
        assert.equal(secondBallot["Title"], "Vote2", "Title should be the same");
        assert.equal(secondBallot["Owner"], accounts[1], "Owners should be the same");
        assert.equal(secondBallot["StartingDate"], from, "Dates should be the same");
        assert.equal(secondBallot["Duration"], 5, "Durations should be the same");
        assert.equal(secondBallot["Status"], "Open", "Status makes sense");
    });

    it("Add vote option should add to ballot", async () => {
        let date = (new Date()).getTime();
        const from = Number.parseInt(date/1000);
        await instance.AddBallot(accounts[2], "Vote1", from, 299);

        const id = await instance.GetLastAddedBallotID();
        await instance.AddVoteOption(id.toNumber(), "Name1", "Papas fritas con queso.", accounts[3], 1);
        await instance.AddVoteOption(id.toNumber(), "Name2", "Papas fritas sin queso.", accounts[1], 2);
        await instance.AddVoteOption(id.toNumber(), "Name3", "Papas fritas con queso y hongos.", accounts[0], 3);
        const allBallots = await instance.GetAllBallots();
        const firstBallot = allBallots[0];

        assert.equal(firstBallot["VoteOptions"][0]["Name"], "Name1", "Names should be the same");
    });

    it("Get Ballot brings information for right accounts", async () => {
        let date = (new Date()).getTime();
        const from = Number.parseInt(date/1000);
        await instance.AddBallot(accounts[2], "Vote1", from, 299);
        await instance.AddBallot(accounts[0], "Vote4", from, 29);
        await instance.AddBallot(accounts[1], "Vote2", from, 5);
        await instance.AddBallot(accounts[1], "Vote3", from, 33);
        const ballotsForOne = null;
        instance.GetBallotsForAddress(accounts[1]).then(function(result) {
            ballotsForOne = result;
            assert.equal(ballotsForOne.length, 2, "Should have returned the two added ballots for this account");
        })
    });

    
});

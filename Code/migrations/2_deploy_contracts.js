const ConvertLib = artifacts.require("ConvertLib");
const EventToken = artifacts.require("EventToken");
const EventVoterManager = artifacts.require("EventVoterManager");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, EventToken);
  deployer.deploy(EventToken).then(
    function () {
      return deployer.deploy(EventVoterManager, EventToken.address);
    }
  );
};

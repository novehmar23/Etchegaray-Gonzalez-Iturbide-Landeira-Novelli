const ConvertLib = artifacts.require("ConvertLib");
const EventToken = artifacts.require("EventToken");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, EventToken);
  deployer.deploy(EventToken);
};

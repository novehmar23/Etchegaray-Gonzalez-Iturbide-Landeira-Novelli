pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Vendor.sol";

contract TestVendor {
    function testBuyingCoinsContract() public {
        Vendor vendor = Vendor(DeployedAddresses.Vendor());
        vendor.buyTokens{value: 1}();
        uint expected = 1;

        Assert.equal(
            vendor.yourToken().getBalance(msg.sender),
            expected,
            "Owner should have bought 10 EventToken"
        );
    }
}

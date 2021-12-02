pragma solidity 0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/EventToken.sol";

contract TestEventToken {
    function testInitialBalanceUsingDeployedContract() public {
        EventToken meta = EventToken(DeployedAddresses.EventToken());

        uint expected = 10000000000000000000000000;

        Assert.equal(
            meta.getBalance(msg.sender),
            expected,
            "Owner should have 10000000000000000000000000 EventToken initially"
        );
    }

    function testInitialBalanceWithNewEventToken() public {
        EventToken meta = new EventToken();

        uint expected = 10000000000000000000000000;

        Assert.equal(
            meta.getBalance(address(this)),
            expected,
            "Owner should have 10000 EventToken initially"
        );
    }

}

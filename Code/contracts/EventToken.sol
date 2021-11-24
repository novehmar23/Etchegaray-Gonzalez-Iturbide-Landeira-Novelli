// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./ConvertLib.sol";
import "./Vendor.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// This is a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract EventToken is ERC20{
    address public zeroAccount;
    constructor() ERC20("EventToken", "EV") {
        _mint(msg.sender, 10000000 * 10 ** 18);
        zeroAccount = msg.sender;
    }

    function getBalance(address addr) public view returns(uint256){
        return balanceOf(addr);
    }
    
    function sendCoin(address recipient, uint256 amount) public returns (bool) {
        return transfer(recipient, amount);
    }


}

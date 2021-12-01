// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./Ballot.sol";

contract EventVoterManager {
    mapping(address => Ballot) _ballotsMatchedToOwners;
    constructor(){
    }
}
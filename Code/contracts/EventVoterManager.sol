// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./Ballot.sol";

contract EventVoterManager {
    mapping(address => Ballot) private _ballotsMatchedToOwners;
    address[] private _addressMappingArray;

    event ReturnAllBallots(Structs.BallotData[] ballots);

    constructor(){
    }

    function GetAllBallots() public view
    {
        Structs.BallotData[] allData = new Structs.BallotData[](_addressMappingArray.length);

        for(uint i = 0; i < _addressMappingArray.length; i++)
        {
            allData.push(_ballotsMatchedToOwners[_addressMappingArray[i]].GetData());
        }

        emit ReturnAllBallots(allData);
    }
}
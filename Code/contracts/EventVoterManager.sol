// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./Ballot.sol";

contract EventVoterManager {
    Ballot[] private _allBallots;

    event ReturnBallots(Structs.BallotData[] ballots);

    constructor(){
    }

    function GetAllBallots() public
    {
        uint length = _allBallots.length;
        Structs.BallotData[] memory allData = new Structs.BallotData[](length);

        for(uint i = 0; i < _addressMappingArray.length; i++)
        {
            allData[i] = _allBallots[i].GetData();
        }

        emit ReturnBallots(allData);
    }

    function GetBallotsForAddress(address memory addr) public
    {
        Structs.BallotData[] memory allData;

        for(uint i = 0; i < _addressMappingArray.length; i++)
        {
            if(_allBallots[i].GetData().Owner == addr){
                allData.push(_allBallots[i].GetData());
            }
        }

        emit ReturnBallots(allData);
    }
}
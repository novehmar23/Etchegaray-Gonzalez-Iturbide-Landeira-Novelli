// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./Ballot.sol";

contract EventVoterManager {
    Ballot[] private _allBallots;
    uint256 private _currentId = 1;

    event ReturnBallots(Structs.BallotData[] ballots);

    constructor(){
    }

    function GetAllBallots() public view returns (Structs.BallotData[] memory)
    {
        uint length = _allBallots.length;
        Structs.BallotData[] memory allData = new Structs.BallotData[](length);

        for(uint i = 0; i < _addressMappingArray.length; i++)
        {
            allData[i] = _allBallots[i].GetData();
        }

        return allData;
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

        return allData;
    }

    function AddBallot(
        address memory owner,
        string memory title,
        uint256 memory startingDate,
        uint256 memory duration,
        string memory nameA,
        string memory descriptionA,
        address memory responsibleA,
        string memory nameB,
        string memory descriptionB,
        address memory responsibleB,
        string memory nameC,
        string memory descriptionC,
        address memory responsibleC
    ) public
    {
        require(now < startingDate + duration && duration > 0);
        string status = "Open";

        if(now < startingDate )
        {
            status = "Closed";
        }

        Structs.VoteOption[] memory options = Structs.VoteOption[](3);
        options[0] = Structs.VoteOption(
            {
                Name: nameA,
                Description: descriptionA,
                Responsible: resposnibleA,
                Votes: 0
            }
        );
        options[1] = Structs.VoteOption(
            {
                Name: nameB,
                Description: descriptionB,
                Responsible: resposnibleB,
                Votes: 0
            }
        );
        options[2] = Structs.VoteOption(
            {
                Name: nameC,
                Description: descriptionC,
                Responsible: resposnibleC,
                Votes: 0
            }
        );

        Structs.BallotData data = Structs.BallotData(
            {
                Id: this._currentId,
                Owner: owner,
                Title: title,
                StartingDate: startingDate,
                Duration: duration,
                Status: status,
                VoteOptions: options
            }
        );
        this._currentId++;

        Ballot b = new Ballot(data);

        _allBallots.push(b);
    }
}
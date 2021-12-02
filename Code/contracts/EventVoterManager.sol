// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./EventToken.sol";
import "./Ballot.sol";

contract EventVoterManager {
    Ballot[] private _allBallots;
    uint256 private _currentId;
    EventToken private _token;

    constructor(address tAddress){
        _currentId = 0;
        _token = EventToken(tAddress);
    }

    function GetAllBallots() public view returns (Structs.BallotData[] memory)
    {
        uint length = _allBallots.length;
        Structs.BallotData[] memory allData = new Structs.BallotData[](length);

        for(uint i = 0; i < _allBallots.length; i++)
        {
            allData[i] = _allBallots[i].GetData();
        }

        return allData;
    }

    function Vote(uint256 id, uint256 optionSelected) public {
        bool finished = false;
        
        for(uint i = 0; i < _allBallots.length && !finished; i++)
        {
            Structs.BallotData memory dataToModify = _allBallots[i].GetData();
            require(block.timestamp <= dataToModify.StartingDate + dataToModify.Duration && block.timestamp > dataToModify.StartingDate && msg.sender != dataToModify.Owner);
            if(dataToModify.Id == id)
            {
                dataToModify.VoteOptions[optionSelected - 1].Votes++;
                _allBallots[i].InsertVoteOption(dataToModify.VoteOptions[optionSelected - 1], optionSelected - 1);
                finished = true;
            }
        }

        _token.sendCoin(address(this), 1);
    }

    function AddBallot(
        address owner,
        string memory title,
        uint256 startingDate,
        uint256 duration
    ) public
    {
        Ballot b = new Ballot();

        require(block.timestamp < startingDate + duration && duration > 0);

        Structs.ParameterBallot memory p;

        p.Id = _currentId;
        p.Owner = owner;
        p.Title = title;
        p.StartingDate = startingDate;
        p.Duration = duration;
        p.Status = GetStatus(startingDate);
        
        b.SetData(p);

        _currentId = _currentId + 1;

        _allBallots.push(b);
    }

    function AddVoteOption(
        uint256 id,
        string memory name,
        string memory description,
        address responsible,
        uint option
        ) public
        {
            bool finished = false;
        
            for(uint i = 0; i < _allBallots.length && !finished; i++)
            {
                Structs.BallotData memory dataToModify = _allBallots[i].GetData();
                require(block.timestamp <= dataToModify.StartingDate + dataToModify.Duration && block.timestamp > dataToModify.StartingDate && msg.sender != dataToModify.Owner);
                if(dataToModify.Id == id)
                {
                    dataToModify.VoteOptions[option - 1] = Structs.VoteOption(
                    {
                        Name: name,
                        Description: description,
                        Responsible: responsible,
                        Votes: 0
                    });
                    _allBallots[i].InsertVoteOption(dataToModify.VoteOptions[option - 1], option - 1);
                    finished = true;
                }
            }
        }

    function GetBallotsForAddress(address addr) public view returns (Structs.BallotData[] memory)
    {
        uint256 amountOfItemsWithAddress = CountBallotsWithAddress(addr);

        Structs.BallotData[] memory allData = new Structs.BallotData[](amountOfItemsWithAddress);

        for(uint i = 0; i < _allBallots.length; i++)
        {
            if(_allBallots[i].GetData().Owner == addr){
                allData[i] = _allBallots[i].GetData();
            }
        }

        return allData;
    }

    function CountBallotsWithAddress(address addr) private view returns (uint256)
    {
        uint count = 0;
        for(uint i = 0; i < _allBallots.length; i++)
        {
            if(_allBallots[i].GetData().Owner == addr){
                count++;
            }
        }
        return count;
    }

    function GetStatus(uint256 startingDate) private view returns (string memory)
    {
        if(block.timestamp < startingDate )
        {
            return "Closed";
        }
        else{
            return "Open";
        }
    }
}
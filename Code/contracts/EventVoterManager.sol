// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./EventToken.sol";
import "./Ballot.sol";

contract EventVoterManager {
    Ballot[] private _allBallots;
    uint256 private _currentId;
    EventToken private _token;

    constructor(address tAddress){
        _currentId = 1;
        _token = EventToken(tAddress);
    }

    /// Summary:
    /// Gets all currently added ballots on the contract. This includes Ballots whose duration has already passed.
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

    /// Summary
    /// Allows an account, that isn't the owner of the vote option, to vote for a vote option.
    /// Params:
    /// id: The ballots ID. optionSelected: The selected voting option (1=A, 2=B, 3=C)
    function Vote(uint256 id, uint256 optionSelected) public 
    {
        require(optionSelected > 0 && optionSelected < 4,"OptionSelected must be a number from 1 to 3");

        bool finished = false;
        
        for(uint i = 0; i < _allBallots.length && !finished; i++)
        {
            Structs.BallotData memory dataToModify = _allBallots[i].GetData();
            require(block.timestamp <= dataToModify.StartingDate + dataToModify.Duration && block.timestamp > dataToModify.StartingDate, "The voting ballot must be Open to vote.");
            if(dataToModify.Id == id)
            {
                require(msg.sender != dataToModify.VoteOptions[optionSelected - 1].Responsible, "You can't vote your own options.");
                dataToModify.VoteOptions[optionSelected - 1].Votes++;
                _allBallots[i].InsertVoteOption(dataToModify.VoteOptions[optionSelected - 1], optionSelected - 1);
                finished = true;
            }
        }

        _token.sendCoin(address(this), 1);
    }

    /// Summary
    /// Allows an account, to add a Voting Ballot to the system.
    /// Params:
    /// owner: The owners hash. title: The ballots title., startingDate: The date in which the ballot opens, duration: Duration in seconds of the ballot.
    /// Returns:
    /// The ballots ID.
    function AddBallot(address owner, string memory title, uint256 startingDate, uint256 duration) public
    {
        Ballot b = new Ballot();

        require(block.timestamp < startingDate + duration && duration > 0, "The finishing date can't be later than now.");

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

    /// Summary
    /// Gets the last added ballot's ID. This is a terrible workaround due to the stack too deep error.
    function GetLastAddedBallotID() public view returns(uint256)
    {
        return _currentId - 1;
    }

    /// Summary
    /// Allows an account, to add a voting option to a ballot. You must be the owner of the ballot.
    /// Must be done after adding a ballot. This needed to be done due to solidity's stack too deep error plus not being able to send structs.
    /// Params:
    /// id: The ballots ID. name: The option name, description: The option description, option: Which option is (1=A, 2=B, 3=C).
    function AddVoteOption(uint256 id, string memory name, string memory description, address responsible, uint option) public
    {
        require(_allBallots.length > 0, "There are no ballots available to add options to.");
        bool found = false;
    
        for(uint i = 0; i < _allBallots.length && !found; i++)
        {
            Structs.BallotData memory dataToModify = _allBallots[i].GetData();
            //require(msg.sender == dataToModify.Owner, "You must be the Ballot's owner to add the option.");
            if(dataToModify.Id == id)
            {
                _allBallots[i].InsertVoteOption(Structs.VoteOption(
                {
                    Name: name,
                    Description: description,
                    Responsible: responsible,
                    Votes: 0
                }), option - 1);
                found = true;
            }
        }

        require(found, "The ballot didn't exist and no vote option was added.");
    }

    /// Summary:
    /// Gets all currently added ballots on the contract whose owner is the passed address.
    /// Params:
    /// addr: The owners hash.
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

    // Count function
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

    // Status processing function. Closed if it hasn't opened yet.
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
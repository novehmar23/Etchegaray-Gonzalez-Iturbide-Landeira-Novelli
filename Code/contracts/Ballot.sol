// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./Structs.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ballot is Ownable{
    uint256 Id;
    address Owner;
    string Title;
    uint256 StartingDate;
    uint256 Duration;
    string Status; // Open or expired
    mapping(uint => Structs.VoteOption) VoteOptionsMapping;
    uint mappingLength;

    constructor()
    {
        mappingLength = 0;
    }

    function SetData(
        Structs.ParameterBallot memory data
    ) onlyOwner public {
        Id = data.Id;
        Owner = data.Owner;
        Title = data.Title;
        StartingDate = data.StartingDate;
        Duration = data.Duration;
        Status = data.Status;
    }

    function InsertVoteOption(Structs.VoteOption memory vote, uint position) public{
        Structs.VoteOption storage option = VoteOptionsMapping[position];
        option.Name = vote.Name;
        option.Description = vote.Description;
        option.Responsible = vote.Responsible;
        option.Votes = vote.Votes;
    }

    function GetData() onlyOwner public view returns (Structs.BallotData memory){
        Structs.VoteOption[3] memory votes;
        votes[0] = VoteOptionsMapping[0];
        votes[1] = VoteOptionsMapping[1];
        votes[2] = VoteOptionsMapping[2];

        Structs.BallotData memory data = Structs.BallotData({
            Id: Id,
            Owner: Owner,
            Title: Title,
            StartingDate: StartingDate,
            Duration: Duration,
            Status: Status,
            VoteOptions: votes
        });

        return data;
    }

}
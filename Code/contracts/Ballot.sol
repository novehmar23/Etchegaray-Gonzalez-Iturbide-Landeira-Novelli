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
    mapping(uint => Structs.VoteOption) VoteOptionsMapping;
    uint mappingLength;

    constructor()
    {
        mappingLength = 0;
    }

    function Destroy(address payable collector) onlyOwner public
    {
        selfdestruct(collector);
    }

    function SetData(
        Structs.ParameterBallot memory data
    ) onlyOwner public {
        Id = data.Id;
        Owner = data.Owner;
        Title = data.Title;
        StartingDate = data.StartingDate;
        Duration = data.Duration;
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

        string memory status = "Open";
        if(block.timestamp < StartingDate || block.timestamp > StartingDate + Duration)
        {
            status = "Closed";
        }

        Structs.BallotData memory data = Structs.BallotData({
            Id: Id,
            Owner: Owner,
            Title: Title,
            StartingDate: StartingDate,
            Duration: Duration,
            Status: status,
            VoteOptions: votes
        });

        return data;
    }

}
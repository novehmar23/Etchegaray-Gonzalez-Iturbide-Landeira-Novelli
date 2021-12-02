// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

library Structs{
    struct BallotData{
        uint256 Id;
        address Owner;
        string Title;
        uint256 StartingDate;
        uint256 Duration;
        string Status; // Open or expired
        VoteOption[3] VoteOptions;
    }

    struct ParameterBallot{
        uint256 Id;
        address Owner;
        string Title;
        uint256 StartingDate;
        uint256 Duration;
    }

    struct VoteOption{
        string Name;
        string Description;
        address Responsible;
        uint256 Votes;
    }
}
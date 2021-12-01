// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./Structs.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ballot is Ownable{
    Structs.BallotData private _myData;    

    function GetData() onlyOwner public returns (Structs.BallotData){
        return _myData;
    }

}
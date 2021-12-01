// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./Structs.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ballot is Ownable{
    Structs.BallotData private _myData;  

    function SetData(Structs.BallotData memory data) onlyOwner public {
        _myData = data;
    }  

    function GetData() onlyOwner public returns (Structs.BallotData memory){
        return _myData;
    }

}
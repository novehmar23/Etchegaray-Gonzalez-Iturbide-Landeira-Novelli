// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./ConvertLib.sol";
import "./Vendor.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// This is a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract EventToken is ERC20 {
    address public _owner;
    uint256 public tokensPerEthSell;
    uint256 public tokensPerEthBuy;

    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
    event SellTokens(
        address seller,
        uint256 amountOfTokens,
        uint256 amountOfETH
    );

    constructor() ERC20("EventToken", "EV") {
        _mint(msg.sender, 10000000 * 10**18);
        _owner = msg.sender;
        tokensPerEthBuy = 100;
        tokensPerEthSell = 120;
    }

    function getBalance(address addr) public view returns (uint256) {
        return balanceOf(addr);
    }

    function sendCoin(address recipient, uint256 amount) public returns (bool) {
        uint256 amountWithDecimals = amount*10**18;
        uint256 fivePercent = (amountWithDecimals * 5) / 100;
        transfer(_owner, fivePercent);
        return transfer(recipient, amountWithDecimals - fivePercent);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }


    function buyTokens(uint256 amountToBuy) public payable {
        uint256 realAmount = amountToBuy*10**18;

        // check if the Vendor Contract has enough amount of tokens for the transaction
        require(msg.value == realAmount/tokensPerEthBuy, "msg.value is not right");


        uint256 vendorBalance = getBalance(_owner)*10**18;
        require(vendorBalance >= realAmount, "Vendor contract has not enough tokens in its balance");

        _approve(_owner,msg.sender, realAmount);
        // Transfer token to the msg.sender
        
        bool sent = transferFrom(_owner, msg.sender, realAmount);

        require(sent, "Failed to transfer token to user");


    }


    function sellTokens(uint256 tokenAmountToSell) external {
        tokenAmountToSell = tokenAmountToSell*10**18;
        // Check that the requested amount of tokens to sell is more than 0
        require(tokenAmountToSell > 0, "Specify an amount of token greater than zero");

        // Check that the user's token balance is enough to do the swap
        uint256 userBalance = getBalance(msg.sender);
        require(
            userBalance >= tokenAmountToSell,
            "Your balance is lower than the amount of tokens you want to sell"
        );

        // Check that the Vendor's balance is enough to do the swap
        uint256 amountOfETHToTransfer = tokenAmountToSell / tokensPerEthSell;
        uint256 ownerETHBalance = getBalance(_owner);
        require(
            ownerETHBalance >= amountOfETHToTransfer,
            "Vendor has not enough funds to accept the sell request"
        );
        _approve(msg.sender,msg.sender, tokenAmountToSell);

        bool sent = transferFrom(msg.sender, _owner, tokenAmountToSell);
        require(sent, "Failed to transfer tokens from user to vendor");

        payable(msg.sender).transfer(amountOfETHToTransfer);
        require(sent, "Failed to send ETH to the user");
    }

    receive() external payable {}


    function convertToEthBuy(uint256 eventTokens) public view returns (uint256){
        return ConvertLib.convert((eventTokens), tokensPerEthBuy);
    }

    function convertToEthSell(uint256 eventTokens) public view returns (uint256) {
        return ConvertLib.convert((eventTokens), tokensPerEthSell);
    }

    function adjustTokensPerEthBuy(uint256 newValue) public returns (uint256) {
        tokensPerEthBuy = newValue;
        return tokensPerEthBuy;
    }

    function adjustTokensPerEthSell(uint256 newValue) public {
        require(newValue >= (tokensPerEthBuy * 20)/100, "Sell price must be 20% higher than buy price");
        tokensPerEthSell = newValue;
    }
}

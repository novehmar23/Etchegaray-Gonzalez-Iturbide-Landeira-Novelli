// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./ConvertLib.sol";
import "./Vendor.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// This is a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract EventToken is ERC20{

    address public _owner;
    uint256 public tokensPerEthSell;
    uint256 public tokensPerEthBuy;

    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
    event SellTokens(address seller, uint256 amountOfTokens, uint256 amountOfETH);

    constructor() ERC20("EventToken", "EV") {
        _mint(msg.sender, 10000000 * 10 ** 18);
        _owner = msg.sender;
        tokensPerEthBuy = 100;
        tokensPerEthSell = 120;
    }

    function getBalance(address addr) public view returns(uint256){
        return balanceOf(addr);
    }
    
    function sendCoin(address recipient, uint256 amount) public returns (bool) {
        // TODO: 5% para la cuenta principal
        return transfer(recipient, amount);
    }

    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }

    function buyTokens() public payable returns (uint256 tokenAmount) {
        require(msg.value > 0, "Send ETH to buy some tokens");

        uint256 amountToBuy = msg.value * tokensPerEthBuy;

        // check if the Vendor Contract has enough amount of tokens for the transaction
        uint256 vendorBalance = getBalance(_owner);
        require(vendorBalance >= amountToBuy, "Vendor contract has not enough tokens in its balance");

        // Transfer token to the msg.sender
        (bool sent) = transfer(msg.sender, amountToBuy);
        require(sent, "Failed to transfer token to user");

        // emit the event
        emit BuyTokens(msg.sender, msg.value, amountToBuy);

        return amountToBuy;
    }

    function sellTokens(uint256 tokenAmountToSell) public {
        // Check that the requested amount of tokens to sell is more than 0
        require(tokenAmountToSell > 0, "Specify an amount of token greater than zero");

        // Check that the user's token balance is enough to do the swap
        uint256 userBalance = getBalance(msg.sender);
        require(userBalance >= tokenAmountToSell, "Your balance is lower than the amount of tokens you want to sell");

        // Check that the Vendor's balance is enough to do the swap
        uint256 amountOfETHToTransfer = tokenAmountToSell / tokensPerEthSell;
        uint256 ownerETHBalance = getBalance(_owner);
        require(ownerETHBalance >= amountOfETHToTransfer, "Vendor has not enough funds to accept the sell request");

        (bool sent) = transferFrom(msg.sender, _owner, tokenAmountToSell);
        require(sent, "Failed to transfer tokens from user to vendor");


        (sent,) = msg.sender.call{value: amountOfETHToTransfer}("");
        require(sent, "Failed to send ETH to the user");
    }

    function convertToEthBuy(uint256 eventTokens) public view returns(uint256){
        return ConvertLib.convert((eventTokens), 2);
    }

    function convertToEthSell(uint256 eventTokens) public view returns(uint256){
        return ConvertLib.convert((eventTokens), 2);
    }
}

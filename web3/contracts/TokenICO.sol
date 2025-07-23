// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

/**
* @title TokenICO
* @dev 
*/
interface IERC20{
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

contract TokenICO{

    address public immutable owner;
    address public saleToken;
    uint256 public ethPriceForToken = 0.001 ether;
    uint256 public tokensSold;

    event TokensPurchased(
        address indexed buyers,
        uint256 amountPaid,
        uint256 tokensBought
    );
    event PriceUpdated(
        uint256 oldPrice,
        uint256 newPrice
    );
    event SaleTokenSet(
        address indexed token
    );
    
    error OnlyOwner();
    error InvalidPrice();
    error InvalidAddress();
    error NoEtherSent();
    error SaleTokenNotSet();
    error TokenTransferFailed();
    error EthTransferFailed();
    error NoTokenWithdraw();
    error CannotRescueSaleToken();
    error NoTokenToRescue();
    error UseTokenFunction();

    modifier onlyOwner(){
        if(msg.sender != owner) revert OnlyOwner();
        _;
    }

    constructor(){
        owner = msg.sender;
    }

    //prevent direct eth transfers
    receive() external payable{
        revert UseTokenFunction();
    }

    //Admin functions
    function updatetokenPrice(uint256 newPrice) external onlyOwner{
        if(newPrice == 0) revert InvalidPrice();
        uint256 oldPrice = ethPriceForToken;
        ethPriceForToken = newPrice;
        emit PriceUpdated(oldPrice, newPrice);
    }

    function setSaleToken(address _token) external onlyOwner{
        if(_token == address(0)) revert InvalidAddress();
        saleToken = _token;
        emit SaleTokenSet(_token);
    }

    function withdrawAllToken() external onlyOwner{
        address token = saleToken;
        uint256 balance = IERC20(token).balanceOf(address(this));

        if(balance == 0) revert NoTokenWithdraw();
        if(!IERC20(token).transfer(owner, balance)) revert TokenTransferFailed(); 
    }

    //User functions

    function buyTokens() external payable {
        if(msg.value == 0) revert NoEtherSent();
        address token = saleToken;
        if(token == address(0)) revert SaleTokenNotSet();

        IERC20 tokenContract = IERC20(token);
        uint8 decimals = tokenContract.decimals();
        uint256 tokenAmount = (msg.value * 10 ** decimals) / ethPriceForToken;

        unchecked {
            tokensSold += tokenAmount;
        }

        if(!tokenContract.transfer(msg.sender, tokenAmount)) revert TokenTransferFailed();

        (bool success,) = owner.call{value: msg.value}("");
        if(!success) revert EthTransferFailed();

        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }

    function rescueToken(address tokenAddress) external onlyOwner{
        if(tokenAddress == saleToken) revert CannotRescueSaleToken();
        
        IERC20 tokenContract = IERC20(tokenAddress);
        uint256 balance = tokenContract.balanceOf(address(this));

        if(balance == 0) revert NoTokenToRescue();
        if(!tokenContract.transfer(owner, balance)) revert TokenTransferFailed();
    }

    //View functions

    function getContractInfo() external view returns(
        address tokenAddress,
        string memory tokenSymbol,
        uint8 tokenDecimals,
        uint256 tokenBalance,
        uint256 ethPrice,
        uint256 tokenSold
    )
    {
        address token = saleToken;
        IERC20 tokenContract = IERC20(token);
        return(
        token,
        tokenContract.symbol(),
        tokenContract.decimals(),
        tokenContract.balanceOf(address(this)),
        ethPriceForToken,
        tokenSold
        );
    }    
}


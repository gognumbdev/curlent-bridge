// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenBase is ERC20 {
    address public admin;
    address public bridgeContract;

    event Mint(
        address caller,
        address mintTo,
        address processor,
        uint amount
    );

    constructor(string memory name,string memory symbol ) ERC20(name,symbol) {
        admin = msg.sender;
    }

    function updateAdmin(address newAdmin) external {
        require(msg.sender == admin,"Only old admin can update new admin.");
        admin = newAdmin;
    }

    function mint(address toAddress,uint amount) external {
        require(msg.sender == admin,"Only admin can mint this token to other people's address.");
        _mint(toAddress,amount);
    }

    function burn(address account,uint amount) external {
        require(msg.sender == admin,"Only admin can burn token from other's people account.");
        _burn(account,amount);
    }    

    function setupBridgeContract(address adminAddress) external {
        require(adminAddress == admin , "Only admin can assign bridge address to this token smart contract.");
        bridgeContract = msg.sender;
    }

    function mintFromBridge(address toAddress,uint amount,address processor) external {
        require(processor == admin,"Only admin can mint this token to other people's address.");
        require(msg.sender == bridgeContract,"Only calling from bridge contract can mint this token to other people's address.");        
        // Curlent bridge charge 0.25% fee from transaction amount
        _mint(admin,25*amount/10000);
        _mint(toAddress, 9975*amount/10000 );
    }

    function burnFromBridge(address account,uint amount,address processor) external {
        require(processor == admin,"Only admin can mint this token to other people's address.");
        require(msg.sender == bridgeContract,"Only calling from bridge contract can mint this token to other people's address.");        
        _burn(account,amount);
    }


}


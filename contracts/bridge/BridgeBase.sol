// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../IToken.sol";

contract BridgeBase {
    address public admin;
    IToken public token;
    uint public nonce;
    mapping(uint => bool) public processedNonces;

    enum Step {Burn,Mint}

    event Transfer(
        address processor,
        address to,
        uint amount,
        uint date,
        uint nonce,
        Step indexed step
    );

    constructor(address _token){
        admin = msg.sender;
        token = IToken(_token);
        setupContract(msg.sender);
    }

    function setupContract(address adminAddress) internal {
        require(adminAddress == admin , "Only admin can assign this bridge contract to token contract.");
        token.setupBridgeContract(adminAddress);   
    }

    
    function burnByBridge(address account,uint amount) external {
        token.burnFromBridge(account,amount,msg.sender);
        emit Transfer(
            msg.sender,
            account,
            amount,
            block.timestamp,
            nonce,
            Step.Burn
        );
        nonce++;
    }

    function mintByBridge(address toAddress,uint amount,uint otherChainNonce) external {
        require(msg.sender == admin,"Only admin can mint Curlent token to other people's account");
        require(processedNonces[otherChainNonce] == false,"transfer already processed");
        

        address processor = msg.sender; 
        
        // Change state of the nonce to true for confirm bridge transaction happen.
        processedNonces[otherChainNonce] = true;


        // Transfer token to people's address to make their bridge completed.
        token.mintFromBridge(toAddress,amount,processor);
        
        // Emit the message in the Transfer form to inform the token minting from bridge transaction.
        emit Transfer(
            processor,
            toAddress,
            amount,
            block.timestamp,
            otherChainNonce,
            Step.Mint
        );
    }
}



// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

// Solidity allow us to call other contract without its code by use "interface"
// So we define a function we want to call from the contract in the interface.
// For example of  IToken usage, We call "IToken(contractAddress)"  to access smart contract function of "contractAddress" contract.
// In summary , "interface" allow you to call other contracts without having its code on yor computer/folder/project/sourceCode.

interface IToken {
    // Functions of Interface can be only of type external.
    function mintFromBridge(address to,uint amount,address processor) external;
    function burnFromBridge(address account,uint amount,address processor) external;
    function setupBridgeContract(address adminAddress) external;
}

const { ethers } = require("hardhat");
const config = require("../../next.config")
// Token config on local
const {ethereumKovan} = config.testOnLocal.token;
const {userInfo} = config.testOnLocal;

// scripts/index.js
async function main () {
   
    const {utils} = ethers;
    let userAddress = userInfo[1].account;
    // 1 Ether , 1 ETH  => 10^18 wei => 1000000000000000000
    let mintAmount = 1;

    // Ethereum Kovan token 
    const EthereumToken = await ethers.getContractFactory('TokenBsc');
    const ethereumToken = await EthereumToken.attach(ethereumKovan.contractAddress);
    let ethereumTokenAdmin = await ethereumToken.admin();
    let ethereumTokenName = await ethereumToken.name();
    let ethereumTokenSymbol = await ethereumToken.symbol();
    let ethereumTokenTotalSupply = await ethereumToken.totalSupply();
    console.log("Ethereum Token Admin : ",ethereumTokenAdmin);
    console.log("Ethereum Token name : ",ethereumTokenName);
    console.log("Ethereum Token symbol : ",ethereumTokenSymbol);
    console.log("Ethereum Token total supply : ",ethereumTokenTotalSupply.toString());    

    console.log("--------------------------------------------------------------- \n After Mint Token  \n ");

    // Check transaction result on Ethereum Kovan Network
    await ethereumToken.mint(userAddress,utils.parseEther(mintAmount.toString()));
    userBalance = await ethereumToken.balanceOf(userAddress);
    userBalance = ethers.utils.formatUnits(userBalance,"ether");
    console.log(`${ethereumTokenName} (${ethereumTokenSymbol}) after get mint : ${userBalance} CETH.`)
    ethereumTokenTotalSupply = await ethereumToken.totalSupply();
    console.log(`Total supply of ${ethereumTokenName} (${ethereumTokenSymbol}) after get mint : ${ethers.utils.formatUnits(ethereumTokenTotalSupply,"ether")} CETH.`)

  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
const { ethers } = require("hardhat");
const config = require("../../next.config")
// Token config on local
const {bscTestnet} = config.testOnLocal.token;
const {userInfo} = config.testOnLocal

// scripts/index.js
async function main () {
   
    const {utils} = ethers;
    let userAddress = userInfo[1].account;
    // 1 Ether , 1 BNB  => 10^18 wei => 1000000000000000000
    let mintAmount = 1;
    
    // BSC testnet token 
    const BscToken = await ethers.getContractFactory('TokenBsc');
    const bscToken = await BscToken.attach(bscTestnet.contractAddress);
    let bscTokenAdmin = await bscToken.admin();
    let bscTokenName = await bscToken.name();
    let bscTokenSymbol = await bscToken.symbol();
    let bscTokenTotalSupply = await bscToken.totalSupply();
    console.log("BSC token Admin : ",bscTokenAdmin);
    console.log("BSC token name : ",bscTokenName);
    console.log("BSC token symbol : ",bscTokenSymbol);
    console.log("BSC token total supply : ",bscTokenTotalSupply.toString());

    console.log("--------------------------------------------------------------- \n After Mint Token  \n ");

    // Check transaction result on BSC Test Network
    await bscToken.mint(userAddress,utils.parseEther(mintAmount.toString()));
    let userBalance = await bscToken.balanceOf(userAddress); 
    userBalance = ethers.utils.formatUnits(userBalance,"ether");
    console.log(`${bscTokenName} (${bscTokenSymbol}) after get mint : ${userBalance} CBSC.`)
    bscTokenTotalSupply = await bscToken.totalSupply();
    console.log(`Total supply of ${bscTokenName} (${bscTokenSymbol}) after get mint : ${ethers.utils.formatUnits(bscTokenTotalSupply,"ether")} CBSC.`)

  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
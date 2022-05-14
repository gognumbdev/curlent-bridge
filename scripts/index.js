const { ethers } = require("hardhat");
const config = require("../next.config")
// Token config on local
const {bscTestnet,ethereumKovan,polygonMumbai,optimismKovan,arbitrumRinkeby} = config.testOnLocal.token;

// scripts/index.js
async function main () {
   // Retrieve accounts from the local node
    const {utils} = ethers;
    let userAddress = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
    // 1 Ether , 1 BNB  => 10^18 wei => 1000000000000000000
    let mintAmount = 1;

    // Set up an ethers contract, representing our deployed Token instance
    
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

    // Check transaction result on BSC Test Network
    await bscToken.mint(userAddress,utils.parseEther(mintAmount.toString()));
    let userBalance = await bscToken.balanceOf(userAddress); 
    userBalance = ethers.utils.formatUnits(userBalance,"ether");
    console.log(`${bscTokenName} (${bscTokenSymbol}) after get mint : ${userBalance} CBSC.`)
    bscTokenTotalSupply = await bscToken.totalSupply();
    console.log(`Total supply of ${bscTokenName} (${bscTokenSymbol}) after get mint : ${ethers.utils.formatUnits(bscTokenTotalSupply,"ether")} CBSC.`)

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
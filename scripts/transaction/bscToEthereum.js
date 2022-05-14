const { ethers } = require("hardhat");
const config = require("../../next.config")
// Token config on local
const {bscTestnet,ethereumKovan} = config.testOnLocal.token;
const bridgeConfig = config.testOnLocal.bridge;
const {userInfo} = config.testOnLocal;


async function main () {

    const {utils} = ethers;
    let nonce;
    // 1 Ether , 1 BNB  => 10^18 wei => 1000000000000000000
    let bridgeAmount =  ethers.utils.parseEther("1");
    let userAddress = userInfo[1].account;

    // Set up Token contract instance
    const BscToken = await ethers.getContractFactory('TokenBsc');
    const bscToken = await BscToken.attach(bscTestnet.contractAddress);
    const EthereumToken = await ethers.getContractFactory('TokenBsc');
    const ethereumToken = await EthereumToken.attach(ethereumKovan.contractAddress);
    let userBalanceOnBsc = await bscToken.balanceOf(userAddress); 
    userBalanceOnBsc = ethers.utils.formatUnits(userBalanceOnBsc,"ether");
    let userBalanceOnEthereum = await ethereumToken.balanceOf(userAddress);
    userBalanceOnEthereum = ethers.utils.formatUnits(userBalanceOnEthereum,"ether");
    
    //Bridge from BSC Test Network
    const BridgeBsc = await ethers.getContractFactory('BridgeBsc');
    const bridgeBsc = await BridgeBsc.attach(bridgeConfig.bscTestnet.contractAddress);
    let bscNonce = await bridgeBsc.nonce();

    console.log(`Nonce on BSC Test Network before bridge : ${bscNonce}`);
    console.log(`${userAddress}'s Curlent token balance on BSC Test Network : ${userBalanceOnBsc} CBSC`)
    console.log(`${userAddress}'s Curlent token balance on Ethereum Kovan Network : ${userBalanceOnEthereum} CETH`)

    await bridgeBsc.burnByBridge(userAddress,bridgeAmount);

    console.log(`Already Burn ${ethers.utils.formatUnits(bridgeAmount,"ether")} CBSC on BSC Test Network from ${userAddress}.`)

    nonce = await bridgeBsc.nonce();

    //Bridge to Ethereum Kovan Network 
    const BridgeEthereum = await ethers.getContractFactory('BridgeEthereum');
    const bridgeEthereum = await BridgeEthereum.attach(bridgeConfig.ethereumKovan.contractAddress);
  
    
    await bridgeEthereum.mintByBridge(userAddress,bridgeAmount,nonce);
    console.log(`Already Mint ${ethers.utils.formatUnits(bridgeAmount,"ether")} CETH on Ethereum Kovan Network.`)

    console.log("--------------------------------------------------------------- \n After Bridge Curlent Token  \n ");
    
    // BSC Test Netowrk
    userBalanceOnBsc = await bscToken.balanceOf(userAddress); 
    userBalanceOnBsc = ethers.utils.formatUnits(userBalanceOnBsc,"ether");
    console.log(`${userAddress}'s Curlent BSC balance : ${userBalanceOnBsc} CBSC.`)
    let bscTokenTotalSupply = await bscToken.totalSupply();
    console.log(`Total supply of Curlent BSC Token after bridge completed : ${ethers.utils.formatUnits(bscTokenTotalSupply,"ether")} CBSC.`)

    // Ethereum Kovan token 
    userBalanceOnEthereum = await ethereumToken.balanceOf(userAddress);
    userBalanceOnEthereum = ethers.utils.formatUnits(userBalanceOnEthereum,"ether");
    console.log(`${userAddress}'s Curlent Ethereum balance : ${userBalanceOnEthereum} CETH.`)
    let ethereumTokenTotalSupply = await ethereumToken.totalSupply();
    console.log(`Total supply of Curlent Ethereum Token after bridge completed : ${ethers.utils.formatUnits(ethereumTokenTotalSupply,"ether")} CETH.`)
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
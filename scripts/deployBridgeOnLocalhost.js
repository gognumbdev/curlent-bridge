const {ethers} = require("hardhat");
const {testOnLocal} = require("../next.config")

async function main() {
    const [deployer] = await ethers.getSigners();
    const {token} = testOnLocal;
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // BSC local
    const BridgeBsc = await ethers.getContractFactory("BridgeBsc");
    const bridgeBsc = await BridgeBsc.deploy(token.bscTestnet.contractAddress);

    console.log("Bridge BSC address:", bridgeBsc.address);

    // Ethereum local
    const BridgeEthereum = await ethers.getContractFactory("BridgeEthereum");
    const bridgeEthereum = await BridgeEthereum.deploy(token.ethereumKovan.contractAddress);

    console.log("Bridge Ethereum address:", bridgeEthereum.address);

  }
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

const {ethers} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // BSC local
    const TokenBsc = await ethers.getContractFactory("TokenBsc");
    const tokenBsc = await TokenBsc.deploy();


    console.log("Token BSC address:", tokenBsc.address);

    // Ethereum local
    const TokenEthereum = await ethers.getContractFactory("TokenEthereum");
    const tokenEthereum = await TokenEthereum.deploy();


    console.log("Token Ethereum address:", tokenEthereum.address);

    // Polygon local
    const TokenPolygon = await ethers.getContractFactory("TokenPolygon");
    const tokenPolygon = await TokenPolygon.deploy();


    console.log("Token Polygon address:", tokenPolygon.address);

    // Optimism Local
    const TokenOptimism = await ethers.getContractFactory("TokenOptimism");
    const tokenOptimism = await TokenOptimism.deploy();


    console.log("Token Optimism address:", tokenOptimism.address);

    // Arbitrum Local
    const TokenArbitrum = await ethers.getContractFactory("TokenArbitrum");
    const tokenArbitrum = await TokenArbitrum.deploy();
  

    console.log("Token Arbitrum address:", tokenArbitrum.address);
  }
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

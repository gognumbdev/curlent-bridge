/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
const {env,ethereumKovan,bscTestnet} = require("./next.config")

const {curlentAdminInfo} = env;

const adminPrivateKey = curlentAdminInfo.privateKey;

module.exports = {
  solidity: "0.8.7",
  networks: {
    ethereumKovan: {
      // Ethereum Kovan Network RPC Url
      url: ethereumKovan.config.rpcUrl,
      chainId:ethereumKovan.config.chainId,
      accounts: [adminPrivateKey]
    },
    bscTestnet:{
      // BSC Test Network RPC Url
      url: bscTestnet.config.rpcUrl,
      chainId:bscTestnet.config.chainId,
      accounts: [adminPrivateKey]
    },
  //   polygonMumbai:{
  //     url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
  //     accounts: [`${ROPSTEN_PRIVATE_KEY}`]
  //   },
  //   optimismKovan:{
  //     url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
  //     accounts: [`${ROPSTEN_PRIVATE_KEY}`]
  //   },
  //   arbitrumRinkeby:{
  //     url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
  //     accounts: [`${ROPSTEN_PRIVATE_KEY}`]
  //   },
  }
};

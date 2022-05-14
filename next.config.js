/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // Info about smart contract that deployed on testnet and configuration
  ethereumKovan:{
    token:{
      contractAddress:"0x12489b123f782031D2f136daa32Fc274e8C06eE7"
    },
    bridge:{
      contractAddress:"0xaFB2c13D15604486D1852d4E1d14565D037a587c"
    },
    config:{
      chainId:42,
      rpcUrl:"https://kovan.infura.io/v3/",
      blockExplorerUrl:"https://kovan.etherscan.io/"
    }
  },
  bscTestnet:{
    token:{
      contractAddress:"0x12489b123f782031D2f136daa32Fc274e8C06eE7"
    },
    bridge:{
      contractAddress:"0x9FBe41FEB04c315D7123403aCDd08CECf5327046"
    },
    config:{
      chainId:97,
      rpcUrl:"https://data-seed-prebsc-1-s1.binance.org:8545/",
      blockExplorerUrl:"https://testnet.bscscan.com/"
    }
  },
  polygonMumbai:{
    token:{
      contractAddress:"0x7b54363bE2527Bb996e936A49f33F61df17D64b1"
    },
    bridge:{
      contractAddress:"0xc31986700b26B9170424c34F32bbecfCaFF61723"
    },
    config:{
      chainId:80001,
      rpcUrl:"https://rpc-mumbai.matic.today",
      blockExplorerUrl:"https://mumbai.polygonscan.com/"
    }
  },
  optimismKovan:{
    token:{
      contractAddress:"0x12489b123f782031D2f136daa32Fc274e8C06eE7"
    },
    bridge:{
      contractAddress:"0xaFB2c13D15604486D1852d4E1d14565D037a587c"
    },
    config:{
      chainId:69,
      rpcUrl:"https://kovan.optimism.io/",
      blockExplorerUrl:"https://kovan-optimistic.etherscan.io/"
    }
  }
}

module.exports = nextConfig

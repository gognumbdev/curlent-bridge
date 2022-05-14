let testNetworks = {
    ethereumKovan:{
      chainId:`0x${Number(42).toString(16)}`,
      chainName:"Kovan Test Network",
      nativeCurrency:{
        name:"Ether",
        symbol:"ETH",
        decimals:18
      },
      rpcUrls:["https://kovan.infura.io/v3/"],
      blockExplorerUrls:["https://kovan.etherscan.io/"]
    },
    ethereumRopsten:{
        chainId:`0x${Number(3).toString(16)}`,
        chainName:"Ropsten Testnet",
        nativeCurrency:{
          name:"Ether",
          symbol:"ETH",
          decimals:18
        },
        rpcUrls:["https://ropsten.infura.io/v3/"],
        blockExplorerUrls:["https://ropsten.etherscan.io"]
    },
    optimismKovan:{
        chainId:`0x${Number(69).toString(16)}`,
        chainName:"Optimism Kovan",
        nativeCurrency:{
          name:"Ether",
          symbol:"ETH",
          decimals:18
        },
        rpcUrls:["https://kovan.optimism.io/"],
        blockExplorerUrls:["https://kovan-optimistic.etherscan.io/"]
    },
    arbitumRinkeby:{
        chainId:`0x${Number(421611).toString(16)}`,
        chainName:"Arbitum Rinkeby",
        nativeCurrency:{
          name:"Ether",
          symbol:"ETH",
          decimals:18
        },
        rpcUrls:["https://rinkeby.arbitrum.io/rpc"],
        blockExplorerUrls:["https://testnet.arbiscan.io/"]
    },
    bscTestnet:{
        chainId:`0x${Number(97).toString(16)}`,
        chainName:"BSC Testnet",
        nativeCurrency:{
          name:"BNB",
          symbol:"BNB",
          decimals:18
        },
        rpcUrls:["https://data-seed-prebsc-1-s1.binance.org:8545/"],
        blockExplorerUrls:["https://testnet.bscscan.com/"]
    },
    polygonMumbai:{
      chainId:`0x${Number(80001).toString(16)}`,
      chainName:"Polygon Mumbai",
      nativeCurrency:{
        name:"MATIC",
        symbol:"MATIC",
        decimals:18
      },
      rpcUrls:["https://rpc-mumbai.matic.today",],
      blockExplorerUrls:["https://mumbai.polygonscan.com/"]
    },

}

let mainNetworks = {
    ethereum:{
      chainId:`0x${Number(1).toString(16)}`,
      chainName:"Ethereum Main Network",
      nativeCurrency:{
        name:"Ether",
        symbol:"ETH",
        decimals:18
      },
      rpcUrls:[
        "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        "https://rpc.ankr.com/eth",
      ],
      blockExplorerUrls:["https://etherscan.io/"]
    },
    polygon:{
      chainId:`0x${Number(137).toString(16)}`,
      chainName:"Polygon Mainnet",
      nativeCurrency:{
        name:"MATIC",
        symbol:"MATIC",
        decimals:18
      },
      rpcUrls:["https://polygon-rpc.com"],
      blockExplorerUrls:["https://polygonscan.com/"]
    },
    bsc:{
      chainId:`0x${Number(56).toString(16)}`,
      chainName:"Binance Smart Chain Mainnet",
      nativeCurrency:{
        name:"Binance Smart Native Token",
        symbol:"BNB",
        decimals:18
      },
      rpcUrls: [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed2.defibit.io",
        "https://bsc-dataseed3.defibit.io",
        "https://bsc-dataseed4.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "wss://bsc-ws-node.nariox.org"
      ],
      blockExplorerUrls:["https://bscscan.com"]
    },
    optimism:{
        chainId:`0x${Number(10).toString(16)}`,
        chainName:"Optimism",
        nativeCurrency:{
          name:"Ether",
          symbol:"ETH",
          decimals:18
        },
        rpcUrls:["https://mainnet.optimism.io"],
        blockExplorerUrls:["https://optimistic.etherscan.io/"]
      },
}


export {mainNetworks,testNetworks};
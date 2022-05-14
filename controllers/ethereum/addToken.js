import { switchEthereumChain } from "./switchNetwork";

const config = require("../../next.config")
const {ethereumKovan,bscTestnet,polygonMumbai,optimismKovan} = config

const addToken = async (tokenCode) => {
    if(typeof window !== "undefined"){
        const {ethereum} = window;

        switch(tokenCode){
            case "CETH":
                await switchEthereumChain("ethereumKovan","test")
                break;
            case "CBSC":
                await switchEthereumChain("bscTestnet","test");
                break;
            case "CPLY":
                await switchEthereumChain("polygonMumbai","test");
                break;
            case "COPT":
                await switchEthereumChain("optimismKovan","test");
                break;
        }

        try {
            const wasAdded = await ethereum.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: tokensInfo[tokenCode],
                    },
            });

            return wasAdded;

        } catch (error) {
            alert(error);
        }
    }
}

let tokensInfo = {
    CBSC:{
        address: bscTestnet.token.contractAddress,
        symbol: 'CBSC',
        decimals: 18,
        // image: 'https://etherscan.io/token/images/centre-usdc_28.png',
    },
    CETH:{
        address: ethereumKovan.token.contractAddress,
        symbol: 'CETH',
        decimals: 18,
        // image: 'https://etherscan.io/token/images/centre-usdc_28.png',
    },
    CPLY:{
        address: polygonMumbai.token.contractAddress,
        symbol: 'CPLY',
        decimals: 18,
        // image: 'https://etherscan.io/token/images/centre-usdc_28.png',
    },
    COPT:{
        address: optimismKovan.token.contractAddress,
        symbol: 'COPT',
        decimals: 18,
        // image: 'https://etherscan.io/token/images/centre-usdc_28.png',
    },
}

export {addToken}
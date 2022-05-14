const config = require("../../next.config")
import { ethers } from "ethers";
import TokenBsc from "../../artifacts/contracts/token/TokenBsc.sol/TokenBsc.json";
import TokenEthereum from "../../artifacts/contracts/token/TokenEthereum.sol/TokenEthereum.json";
import TokenPolygon from "../../artifacts/contracts/token/TokenPolygon.sol/TokenPolygon.json";
import TokenOptimism from "../../artifacts/contracts/token/TokenOptimism.sol/TokenOptimism.json";
import { switchEthereumChain } from "../ethereum/switchNetwork";

export const getTokenInstance = async (chainName) => {

    if (typeof ethereum != "undefinded") {
        const {ethereum} = window;
        await ethereum.enable();

        let token;
        let chainInfo;
        
        switch(chainName) {
            case "ethereumKovan":
                token = TokenEthereum;
                chainInfo = config.ethereumKovan
                await switchEthereumChain(chainName,"test");
                break;
            case "bscTestnet":
                token = TokenBsc;
                chainInfo = config.bscTestnet
                await switchEthereumChain(chainName,"test");
                break;
            case "polygonMumbai":
                token = TokenPolygon;
                chainInfo = config.polygonMumbai
                await switchEthereumChain(chainName,"test");
                break;
            case "optimismKovan":
                token = TokenOptimism;
                chainInfo = config.optimismKovan
                await switchEthereumChain(chainName,"test");
                break;
        }

        const provider = new ethers.providers.Web3Provider(ethereum)

        return new ethers.Contract(chainInfo.token.contractAddress,token.abi,provider);   
    }
}
const config = require("../../next.config")
import { ethers } from "ethers";
import BridgeBsc from "../../artifacts/contracts/bridge/BridgeBsc.sol/BridgeBsc.json";
import BridgeEthereum from "../../artifacts/contracts/bridge/BridgeEthereum.sol/BridgeEthereum.json";
import BridgePolygon from "../../artifacts/contracts/bridge/BridgePolygon.sol/BridgePolygon.json";
import BridgeOptimism from "../../artifacts/contracts/bridge/BridgeOptimism.sol/BridgeOptimism.json";
import { switchEthereumChain } from "../ethereum/switchNetwork";

export const getBridgeInstance = async (chainName) => {

    if (typeof ethereum != "undefinded") {
        const {ethereum} = window;
        await ethereum.enable();

        let bridge;
        let chainInfo;
        
        switch(chainName) {
            case "ethereumKovan":
                bridge = BridgeEthereum;
                chainInfo = config.ethereumKovan
                await switchEthereumChain(chainName,"test");
                break;
            case "bscTestnet":
                bridge = BridgeBsc;
                chainInfo = config.bscTestnet
                await switchEthereumChain(chainName,"test");
                break;
            case "polygonMumbai":
                bridge = BridgePolygon;
                chainInfo = config.polygonMumbai
                await switchEthereumChain(chainName,"test");
                break;
            case "optimismKovan":
                bridge = BridgeOptimism;
                chainInfo = config.optimismKovan
                await switchEthereumChain(chainName,"test");
                break;
        }

        const provider = new ethers.providers.Web3Provider(ethereum)

        return new ethers.Contract(chainInfo.bridge.contractAddress,bridge.abi,provider);   
    }
}
import { ethers } from "ethers";
import {testNetworks} from "../database/networksInfo"
import { switchEthereumChain } from "./ethereum/switchNetwork";

const connectWallet = async (selectedNetwork) => {

    if (typeof window !== "undefined") {
        try {
            const {ethereum} =window;
        
            await ethereum.enable()
            
            //* Get user log in with Metamask wallet 
            switch(selectedNetwork){
                case "Ethereum Kovan Network" :
                    switchEthereumChain("ethereumKovan","test");
                    break;
                case "BSC Test Network":
                    switchEthereumChain("bscTestnet","test");
                    break;
                default:
                    switchEthereumChain("ethereumKovan","test");
                    break;
            }

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer =  provider.getSigner();
            const userAddress = await signer.getAddress();

            return {userAddress};

        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export {connectWallet}

let networkKeyword = {
    "Ethereum Kovan Network":"kovan",
    "BSC Test Network":"bsc",
}
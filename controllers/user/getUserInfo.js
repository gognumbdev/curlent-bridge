import { ethers } from "ethers";
import { switchEthereumChain } from "../ethereum/switchNetwork";

async function getUserInfo (chainName) {
    if (typeof ethereum != "undefinded") {
        const {ethereum} = window;
        await ethereum.enable();

        switch(chainName) {
            case "ethereumKovan":
                await switchEthereumChain(chainName,"test");
                break;
            case "bscTestnet":
                await switchEthereumChain(chainName,"test");
                break;
        }


        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer =  provider.getSigner();
        const userAddress = await signer.getAddress();
        const userBalance = await signer.getBalance();
        const userNetwork = await provider.getNetwork();

        return {userAddress,userBalance,userNetwork}

    }
}

export {getUserInfo};
import { ethers } from "ethers";
const {env} = require("../../next.config")

export const getAdminWallet = async () => {

    if(typeof window !== "undefined"){
        const {ethereum} = window;

        const provider = new ethers.providers.Web3Provider(ethereum);

        return new ethers.Wallet(env.curlentAdminInfo.privateKey,provider);
    }

}

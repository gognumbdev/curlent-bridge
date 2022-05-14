import { ethers } from "ethers";
export const getAdminWallet = async () => {
    let adminPrivateKey = process.env.NEXT_PUBLIC_CURLENT_ADMIN_PRIVATE_KEY;

    if(typeof window !== "undefined"){
        const {ethereum} = window;

        const provider = new ethers.providers.Web3Provider(ethereum);

        return new ethers.Wallet(adminPrivateKey,provider);
    }

}


import { getAdminWallet } from "../admin/getAdminWallet";
import { getTokenInstance } from "../token/getTokenInstace";
import {ethers} from "ethers"
import { getBridgeInstance } from "./getBridgeInstance";

async function bridgeBurnToken (sourceChain,userAddress,tokenAmount) {
    // Initialization
    let result = {};
    const {utils} = ethers;
    let tokenAmountToBridge = utils.parseEther(tokenAmount);

    // Create Token and Bridge Instance to interact with smart contract
    const sourceToken = await getTokenInstance(sourceChain);
    const sourceBridge = await getBridgeInstance(sourceChain);

    console.log(`Bridge start to burn token process from ${sourceChain}.`);
    let adminWallet = await getAdminWallet();
    let adminAddress = await adminWallet.getAddress();
    console.log("Admin Address : ",adminAddress);
    console.log("User Address : ",userAddress);
    
    // Connect admin wallet instance to token and bridge instance to interact smart contract on blockchain
    const sourceTokenWithWallet = sourceToken.connect(adminWallet)
    const sourceBridgeWithWallet = sourceBridge.connect(adminWallet)

    
    try {
        // Burn Curlent token from source chain
        let sourceTokenBridgeContract = await sourceTokenWithWallet.bridgeContract();
        let userSourceTokenBalance = await sourceTokenWithWallet.balanceOf(userAddress);
        let sourceBridgeAdmin = await sourceBridgeWithWallet.admin();
        let sourceBridgeNonce = await sourceBridgeWithWallet.nonce();
        let sourceBridgeTokenContract = await sourceBridgeWithWallet.token();

        console.log("Before burn",sourceTokenBridgeContract,userSourceTokenBalance.toString(),sourceBridgeAdmin,
        sourceBridgeNonce.toString(),sourceBridgeTokenContract,tokenAmountToBridge)

        await sourceBridgeWithWallet.burnByBridge(userAddress,tokenAmountToBridge);

        userSourceTokenBalance = await sourceTokenWithWallet.balanceOf(userAddress);

        result.nonce = sourceBridgeNonce;
        result.userTokenBalance = userSourceTokenBalance;
        result.bridgeResult = "success"

        return result;

    } catch (error) {
        console.log(error);
        alert("Something went wrong !, Please try to bridge again later.")
    }
    return "Success"
}

async function bridgeMintToken (destinationChain,tokenAmount,destinationAddress,otherChainNonce) {
    // Initialization
    let result = {};
    const {utils} = ethers;
    let tokenAmountToBridge = utils.parseEther(tokenAmount);

    const destinationToken = await getTokenInstance(destinationChain);
    const destinationBridge = await getBridgeInstance(destinationChain);

    console.log(`Bridge start to mint token process to ${destinationChain} on ${destinationChain}.`);
    let adminWallet = await getAdminWallet();
    let adminAddress = await adminWallet.getAddress();
    console.log("Admin Address : ",adminAddress);
    console.log("Destination Address : ",destinationAddress);

    // Mint Curlent token on destintaion chain
    const destinationTokenWithWallet = destinationToken.connect(adminWallet);
    const destinationBridgeWithWallet = destinationBridge.connect(adminWallet);
    
    try {
        
        let destinationTokenBridgeContract = await destinationTokenWithWallet.bridgeContract();
        let userDestinationTokenBalance = await destinationTokenWithWallet.balanceOf(destinationAddress);
        let destinationBridgeAdmin = await destinationBridgeWithWallet.admin();
        let destinationBridgeNonce = await destinationBridgeWithWallet.nonce();
        let destinationBridgeTokenContract = await destinationBridgeWithWallet.token();

        console.log("Before mint",destinationTokenBridgeContract,userDestinationTokenBalance.toString(),destinationBridgeAdmin,
        destinationBridgeNonce.toString(),destinationBridgeTokenContract,tokenAmountToBridge,otherChainNonce)

        await destinationBridgeWithWallet.mintByBridge(destinationAddress,tokenAmountToBridge,otherChainNonce);

        console.log("Mintin success");
        
        userDestinationTokenBalance = await destinationTokenWithWallet.balanceOf(destinationAddress);

        result.userTokenBalance = userDestinationTokenBalance;
        result.bridgeResult = "success"

        return result;

    } catch (error) {
        console.log(error);
        alert("Something went wrong !, Please try to bridge again later.")
    }
}


  export {bridgeBurnToken,bridgeMintToken}
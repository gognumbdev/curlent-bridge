import { getAdminWallet } from "../admin/getAdminWallet";
import { getUserInfo } from "../user/getUserInfo";
import { getTokenInstance } from "./getTokenInstace";
import {ethers} from "ethers"

async function mintToken (chainName,tokenCode) {
  const {utils} = ethers;

  const token = await getTokenInstance(chainName) ;
  const {userAddress} = await getUserInfo(chainName);

  let adminWallet = await getAdminWallet();

  let adminAddress = await adminWallet.getAddress();

  console.log("Admin Address : ",adminAddress);
  console.log("User Address : ",userAddress);

  // connect admin wallet instance token smart contract
  const tokenWithWallet = token.connect(adminWallet)
  // let userAddress = userInfo[1].account;
  // 1 Ether , 1 ETH  => 10^18 wei => 1000000000000000000
  let mintAmount = 1;

  try {
    let tokenName = await tokenWithWallet.name();
    let tokenSymbol = await tokenWithWallet.symbol();
    let tokenTotalSupply = await tokenWithWallet.totalSupply();
    let userTokenBalance = await tokenWithWallet.balanceOf(userAddress);
    console.log(`${tokenName}'s name : `,tokenName);
    console.log(`${tokenName}'s symbol : `,tokenSymbol);
    console.log(`${userAddress}'s ${tokenName} balance : ${userTokenBalance} ${tokenSymbol}`);
    console.log(`${tokenName}'s total supply : `,tokenTotalSupply.toString());    

    console.log("--------------------------------------------------------------- \n After Mint Token  \n ");

    // Check transaction result on Ethereum Kovan Network
    await tokenWithWallet.mint(userAddress,utils.parseEther(mintAmount.toString()));
    userTokenBalance = await tokenWithWallet.balanceOf(userAddress);
    userTokenBalance = ethers.utils.formatUnits(userTokenBalance,"ether");
    console.log(`${userAddress}'s ${tokenName} balance : ${userTokenBalance} ${tokenSymbol}`);
    tokenTotalSupply = await tokenWithWallet.totalSupply();
    console.log(`Total supply of ${tokenName} (${tokenSymbol}) after get mint : ${ethers.utils.formatUnits(tokenTotalSupply,"ether")} ${tokenSymbol}.`)
    

    return {tokenName,tokenSymbol,userTokenBalance,mintingResult:"success"} 

  } catch (error) {
    alert("Something went wrong about minting token")
    console.log(error)
  }
  }

  export {mintToken}
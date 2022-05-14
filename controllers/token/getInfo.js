import { getUserInfo } from "../user/getUserInfo";
import { getTokenInstance } from "./getTokenInstace";

async function getTokenInfo (chainName) {
      let result={};

      const token = await getTokenInstance(chainName) ;
      const userInfo = await getUserInfo(chainName);
      
      result.userInfo = userInfo;

      console.log(userInfo);

      // Request token info from smart contract on blockhain 
      let tokenAdmin = await token.admin();
      let tokenName = await token.name();
      let tokenSymbol = await token.symbol();
      let userTokenBalance = await token.balanceOf(userInfo.userAddress);
      let tokenTotalSupply = await token.totalSupply();
      console.log(tokenAdmin,tokenName,tokenSymbol,tokenTotalSupply);
      // Assign eact token info to result hash map 
      result.tokenAdmin = tokenAdmin;
      result.tokenName = tokenName;
      result.tokenSymbol = tokenSymbol;
      result.userTokenBalance = userTokenBalance.toString();
      result.tokenTotalSupply = tokenTotalSupply.toString();

      console.log(result)

      return result;
    
}

const getTokenBalance = async (chainName,userAddress) => {

      const token = await getTokenInstance(chainName);

      let userTokenBalance = await token.balanceOf(userAddress);

      return userTokenBalance.toString();

}
export {getTokenInfo,getTokenBalance};
import { ethers } from "ethers";
import { logIn } from "../redux/actions/supplierAction";

const connectWallet = async () => {
    let requestMessage = "Please sign to get sign in to our Curlent platform"

    if (typeof window !== "undefined") {
        try {
            const {ethereum} =window;
        
            await ethereum.enable()

            //* Get user log in with Metamask wallet 
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer =  provider.getSigner();
            const signature = await signer.signMessage(requestMessage);
            const userNetwork = await provider.getNetwork();
            const userAddress = await signer.getAddress();
            const userBalance = await signer.getBalance()

            let permission = await verifyMessage(
                {
                    message:requestMessage,
                    address:userAddress,
                    signature
                }
            )

            console.log(permission);
            
            console.log("request result:",userNetwork,userAddress,userBalance);
            
            return ({permission,userAddress,userNetwork,userBalance})
            

        } catch (error) {
            return ({permission:false})
        }
    }
}

const connectAndDispatch = (dispatch,router) => {
    
    connectWallet().then( async ({permission,userAddress}) => {

        //! if !permission === true -> You don't get signature permission from user for sign them in your web application.
        if (!permission) {
            console.log("You don't get permission");
            return ;
        }

        //* if !permission === false -> You get permission from user to sign them in your web application , let's continue
        const res = await fetch(`/api/auth/supplier/${userAddress}`)
        const userData = await res.json()
        
        dispatch(logIn(
            {
                username: userData.username,
                publicAddress: userAddress,
            }
        ))

        router.push(`/supplier/${userAddress}`)
    })
}

const verifyMessage = async ({ message, address, signature }) => {
    try {
      const signerAddress = await ethers.utils.verifyMessage(message, signature);
      
      if (signerAddress !== address) {
        return false;
      }
  
      return true;

    } catch (err) {
        console.log(err);
        return false;
    }
};

export {connectWallet,connectAndDispatch,verifyMessage}
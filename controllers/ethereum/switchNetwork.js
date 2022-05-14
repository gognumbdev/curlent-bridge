import {mainNetworks,testNetworks} from "../../database/networksInfo"

const changeNetwork = async (networkName) => {
    if(typeof window !== "undefined"){
      try {
        if(!window.ethereum) throw new Error("Crypto wallet not found");
        await window.ethereum.request({
          method:"wallet_addEthereumChain",
          params:[
            {
              ...networks[networkName]
            }
          ]
        })
    
      } catch (error) {
          alert(error);
          console.log(error)
      }   
    }
  }

  const handleSwitchNetwork = async (networkName) => {
    await changeNetwork(networkName);
  }

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  const switchEthereumChain = async (chainName,networkType) => {
    
    let networks = networkType === "main" ? mainNetworks : testNetworks;

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networks[chainName].chainId }],
      });
    } catch (switchError) {
      console.log(switchError);
    }    
  }

export {changeNetwork,handleSwitchNetwork,networkChanged,switchEthereumChain}
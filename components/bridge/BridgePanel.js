import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { switchSelectedNetwork } from '../../redux/actions/networkAction'
import SelectBlockchain from './SelectBlockchain'
import { cryptoInfo,curlentTokenInfo } from '../../database/cryptoInfo'
import { testnetFaucet } from '../../database/testnetInfo'
import Wormhole from "../../public/icon/wormhole.png"
import Image from "next/image"
import { addToken } from '../../controllers/ethereum/addToken'
import { mintToken } from '../../controllers/token/mintToken'
import { getTokenBalance} from '../../controllers/token/getInfo'
import { ethers } from 'ethers'
import { bridgeBurnToken,bridgeMintToken } from '../../controllers/bridge/bridgeToken'
import { RefreshIcon } from '@heroicons/react/solid'

const BridgePanel = () => {
  const [sourceBlockchain, setSourceBlockchain] = useState("Ethereum Kovan Network")
  const [destinationBlockchain, setDestinationBlockchain] = useState("BSC Test Network")
  const [tokenAmount, setTokenAmount] = useState(0);
  const [destinationAddress, setDestinationAddress] = useState("");
  const {sourceChain,destinationChain} = useSelector(state => state.selectedNetwork);
  const {userAddress} = useSelector(state => state.user)
  const [userTokenBalance, setUserTokenBalance] = useState("0");
  const [latestSelect, setLatestSelect] = useState("From");
  const [showBalance, setShowBalance] = useState(false)
  const [onBridgeProcessing, setOnBridgeProcessing] = useState(false);
  const [onReceiveTokenProcessing, setOnReceiveTokenProcessing] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if(sourceBlockchain !== destinationBlockchain) {
      dispatch(switchSelectedNetwork({
        sourceChain:sourceBlockchain,
        destinationChain:destinationBlockchain
      }));
    }
    else {
        alert("Please select different blockchain to bridge")
      }
  }, [sourceBlockchain,destinationBlockchain])

  const handleAddToken = async (tokenCode) => {
    try {
      let wasAdded = await addToken(tokenCode);
      console.log(wasAdded)
    } catch (error) {
      alert("Something went wrong")
      console.log(first)
    }
  }

  const handleMintToken = async (tokenCode) => {
    setOnReceiveTokenProcessing(true);
    console.log(`Process Minting ${tokenCode} `)
    let mintingInfo =  await mintToken(tokenToChainName[tokenCode],tokenCode)
    console.log(mintingInfo);
    alert(`${tokenCode} minting success , Check balance on your crypto wallet !`);
    setOnReceiveTokenProcessing(false);
  }

  const handleShowBalance = async (tokenCode) => {
    if(!showBalance){
      let tokenBalance = await getTokenBalance(tokenToChainName[tokenCode],userAddress);
      console.log(tokenBalance);
      setUserTokenBalance(tokenBalance);
    }
    setShowBalance(!showBalance);
  }

  const handleConfirmBridge = async () => {

    setOnBridgeProcessing(true);

    let userTokenBalanceInEther = ethers.utils.formatEther(userTokenBalance,"ether");
    
    console.log(userTokenBalanceInEther,tokenAmount)

    if(userTokenBalanceInEther < tokenAmount){
      alert("Please mint more token to bridge, your token balance is less than the amount you want to bridge.")
      return
    }else{
      console.log("Process Confirm Bridge : ",networkToChainName[sourceBlockchain],networkToChainName[destinationBlockchain],tokenAmount,destinationAddress)
      // Bridge burn token on source chain
      let bridgeBurnInfo = await bridgeBurnToken(networkToChainName[sourceBlockchain],userAddress,tokenAmount);
      console.log(bridgeBurnInfo);
      let bridgeMintInfo = await bridgeMintToken(networkToChainName[destinationBlockchain],tokenAmount,destinationAddress,bridgeBurnInfo?.nonce);
      console.log(bridgeMintInfo);
      // Bridge mint token on destination chain
      if(bridgeBurnInfo?.bridgeResult == "success" && bridgeMintInfo?.bridgeResult == "success"){
        alert(`Bridge ${tokenAmount} ${curlentTokenInfo[sourceChain]?.symbol} from ${sourceBlockchain} to ${destinationBlockchain} success , Check balance on your crypto wallet !`);
      }else{
        alert(`Sorry womething went worng, your bridge transaction fail.`);
      }
    }

    setOnBridgeProcessing(false);

  }

  console.log(sourceChain,destinationChain)

  return (
    <div className='w-8/12 p-12 rounded mt-10 bg-neutral-800 grid grid-cols-1 space-y-8'>
        
        <p className='place-self-center text-2xl font-medium'>Transfer</p>
        
        {/* Select blockchain */}
        <div className='flex w-fill justify-around'>
            <SelectBlockchain setBlockchain={setSourceBlockchain} chainDirection={"From"} setLatestSelect={setLatestSelect}  />
            <Image src={Wormhole} height={30} width={100} objectFit="contain" className="rotate-90 animate-pulse transform"  />
            <SelectBlockchain setBlockchain={setDestinationBlockchain} chainDirection={"To"} setLatestSelect={setLatestSelect}  />
        </div>

        {/* Get coin on testnet from faucet */}
        <a target="_blank" href={testnetFaucet[sourceChain]} rel="noopener noreferrer" 
          className='place-self-center cursor-pointer hover:text-blue-500 transition transform duration-150 ease-out text-lg' >
              Don&apos;t have {cryptoInfo[sourceChain]} on {sourceChain} ? Click this link ! 
        </a>
            

        {/* Manage Curlent ERC-20 token */}
        <div className='grid grid-cols-1 w-10/12 place-self-center pt-4 pb-2 px-4 space-y-4 rounded border-t-2 '>
          <p className='text-2xl font-medium'>Manage Curlent Token</p>
          <div className='flex font-medium text-xl justify-around space-x-4'>  
            
            <button 
              onClick={() => handleAddToken(curlentTokenInfo[sourceChain]?.symbol)}
              className='bg-blue-600 px-4 py-2 rounded transition transform duration-300 ease-out active:scale-90'>
                Add {curlentTokenInfo[sourceChain]?.name} ( {curlentTokenInfo[sourceChain]?.symbol} ) to your wallet
            </button>

                {onReceiveTokenProcessing ? (
                  <button type="button" class="bg-blue-500 flex items-center justify-center space-x-4 rounded p-4" disabled>
                    <RefreshIcon className='h-10 w-10 animate-spin' />
                    Processing...
                  </button>
                ) : (
                  <button 
                  onClick={() => handleMintToken(curlentTokenInfo[sourceChain]?.symbol)}
                  className='bg-blue-600 px-4 py-2 rounded transition transform duration-300 ease-out active:scale-90'>
                        Receive {curlentTokenInfo[sourceChain]?.name} ( {curlentTokenInfo[sourceChain]?.symbol} )
                  </button>
                )}

          </div>
        </div>
        
        {/* Transaction info */}
        <div className='grid grid-cols-1 w-10/12 place-self-center py-2 px-4 space-y-4'>
          <p className='text-2xl font-medium'>Transaction info </p>
          <div className='grid grid-cols-1 font-medium text-xl space-y-10 px-12 py-4'>  

            <div className='rounded bg-neutral-800 '>
              <p className='text-blue-500'>Amount to bridge</p>
              <div className='flex items-center space-x-4'>
                <input type="text" 
                  className='bg-neutral-800 border-blue-500 border-b-2 p-4 text-xl outline-none' 
                  placeholder='Amount of Curlent token'
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                />
                <p className=''>{curlentTokenInfo[sourceChain]?.symbol}</p>  
                <button 
                    onClick={() => handleShowBalance(curlentTokenInfo[sourceChain]?.symbol)}
                    className='border-2 px-4 py-2 rounded w-fit transition transform duration-300 hover:bg-white hover:text-blue-500 ease-out active:scale-90'>
                    {showBalance ? "hide" : "show"} balance
                </button>
              </div>
              
              {showBalance && (
                <p className='mt-2 '>
                  Your {curlentTokenInfo[sourceChain]?.name} balance : {ethers.utils.formatUnits(userTokenBalance,"ether") || 0} {curlentTokenInfo[sourceChain]?.symbol}
                </p>
              )}
              
            </div>

            <div className='rounded bg-neutral-800 w-full'>
              <p className='text-blue-500'>Destination Address</p>
              <div className='flex items-center space-x-4 w-full'>
                <input type="text" 
                  className='bg-neutral-800 border-blue-500 border-b-2 p-4 text-xl outline-none w-10/12' 
                  placeholder={`Address on ${destinationChain}`}
                  value={destinationAddress}
                  onChange={(e) => setDestinationAddress(e.target.value)}
                />
                <button 
                  onClick={ () => setDestinationAddress(userAddress)}
                  className='border-2 px-4 py-2 rounded w-fit transition transform duration-300 ease-out hover:bg-white hover:text-blue-500
                  active:scale-90 '>
                  Your address 
                </button>
              </div>

            </div>
          </div>

          {/* Bridge */}
  
            {onBridgeProcessing ? (
              <button type="button" class="bg-blue-500 flex items-center justify-center space-x-4 rounded p-4" disabled>
                <RefreshIcon className='h-10 w-10 animate-spin' />
                Processing...
              </button>
            ): (
              <button 
                onClick={handleConfirmBridge}
                className='bg-blue-500 text-white font-medium w-fit p-4 place-self-center rounded text-xl 
                transition transform duration-300 ease-out active:scale-90'>
                      Confirm Bridge 
              </button>
            )}
            

        </div>


    </div>
  )
}

export default BridgePanel


let tokenToChainName = {
  "CBSC":"bscTestnet",
  "CETH":"ethereumKovan",
  "CPLY":"polygonMumbai",
  "COPT":"optimismKovan"
}

let networkToChainName = {
  "Ethereum Kovan Network":"ethereumKovan",
  "BSC Test Network":"bscTestnet",
  "Polygon Mumbai Network":"polygonMumbai",
  "Optimism Kovan Network":"optimismKovan",
}



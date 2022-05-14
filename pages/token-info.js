import Head from 'next/head'
import React, { useState } from 'react'
import TokenMonitor from '../components/token/TokenMonitor'
import { getTokenInfo } from '../controllers/token/getInfo'

const tokenInfoPage = () => {
    
    const [tokenInfo, setTokenInfo] = useState({});

    const handleGetTokenInfo = async (chainName) => {
        let result = await getTokenInfo(chainName)
        setTokenInfo(result);
    }

    return (
        <div className='h-full'>
            <Head>
                <title>Curlent Token info</title>
                <meta name="description" content="Curlent bridge is DeFi protocol to help DeFi user transfer assets across blockchain." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className='w-full grid grid-cols-1 place-items-center space-y-10 h-screen'>
                
                <TokenMonitor tokenInfo={tokenInfo} />

                <div className='flex w-full space-x-4 justify-center items-center'>
                    {chainsInfo.map((chainInfo,index) => (
                        <button 
                            key={index}
                            className='border-white border-2 p-4 rounded text-xl text-blue-500 font-medium'
                            onClick={() => handleGetTokenInfo(chainInfo.chainName)}>
                            Get {chainInfo.tokenName} Info
                        </button>
                    ))}
                </div>
                
            </main>

            <footer>
                
            </footer>
        </div>
    )
}

export default tokenInfoPage

let chainsInfo = [
    {
        chainName:"bscTestnet",
        tokenName:"Curlent BSC Token",
    },
    {
        chainName:"ethereumKovan",
        tokenName:"Curlent Ethereum Token",
    },
]
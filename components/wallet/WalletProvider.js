import Image from 'next/image'
import React from 'react'

const WalletProvider = ({walletName,image,connectWallet,network}) => {
  return (
    <div
        onClick={ () => connectWallet(walletName,network)} 
        className='bg-black text-white rounded p-4 my-8 bg-opacity-50 flex items-center space-x-4 cursor-pointer
         hover:scale-105 transition transform duration-150 ease-in-out '>
        <Image src={image} width={35} height={35} />
        <p className='text-xl'>{walletName}</p>
        
    </div>
  )
}

export default WalletProvider
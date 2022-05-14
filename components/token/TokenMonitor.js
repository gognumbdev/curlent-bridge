import React from 'react'

const Monitor = ({tokenInfo}) => {
  let {tokenName,tokenSymbol,tokenTotalSuply,userInfo,userTokenBalance} = tokenInfo

  return (
    <div className='border-2 border-white w-8/12 h-fit my-8 p-12 space-y-2 bg-neutral-800'>
      
      <div className='grid grid-cols-8 w-full place-items-center'>
        <p className='col-span-2 text-2xl font-bold'>Token Name : </p>
        <p className='col-span-6 text-xl font-medium'>{tokenName}</p>
      </div>    

      <div className='grid grid-cols-8 w-full place-items-center'>
        <p className='col-span-2 text-2xl font-bold'>Token Symbol : </p>
        <p className='col-span-6 text-xl font-medium'>{tokenSymbol}</p>
      </div>    

      <div className='grid grid-cols-8 w-full place-items-center'>
        <p className='col-span-2 text-2xl font-bold'>Token Total Supply : </p>
        <p className='col-span-6 text-xl font-medium'>{tokenTotalSuply || 0 } {tokenSymbol}</p>
      </div>    

      <div className='grid grid-cols-8 w-full place-items-center'>
        <p className='col-span-2 text-2xl font-bold'>Your Token Balance : </p>
        <p className='col-span-6 text-xl font-medium'>{userTokenBalance?.toString()} {tokenSymbol}</p>
      </div>    

    </div>
  )
}

export default Monitor
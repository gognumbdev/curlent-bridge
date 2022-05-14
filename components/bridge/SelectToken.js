import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import ETH from "../../public/icon/crypto/ETH.png"
import USDC from "../../public/icon/crypto/USDC.png"
import USDT from "../../public/icon/crypto/USDT.png"
import BUSD from "../../public/icon/crypto/BUSD.png"
import BNB from "../../public/icon/crypto/BNB.png"
import LUNA from "../../public/icon/crypto/LUNA.png"
import UST from "../../public/icon/crypto/UST.png"
import MATIC from "../../public/icon/crypto/MATIC.png"
import Image from "next/image"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}  

let blockchainCoins = {
  "Ropsten Test Network":[
    { name: 'Ether',code:"ETH" , image:ETH},
    { name: 'USD Coin',code:"USDC" , image:USDC},
    { name: 'USD Tether',code:"USDT" , image:USDT},
  ],
  "BSC Test Network":[
    { name: 'Binance Coin',code:"BNB" , image:BNB},
    { name: 'Binance USD',code:"BUSD" , image:BUSD}  
  ],
  "Optimism Kovan":[
    { name: 'Ether',code:"ETH" , image:ETH},
    { name: 'USD Coin',code:"USDC" , image:USDC},
    { name: 'USD Tether',code:"USDT" , image:USDT},
  ],
  "Arbitum Rinkeby":[
    { name: 'Ether',code:"ETH" , image:ETH},
    { name: 'USD Coin',code:"USDC" , image:USDC},
    { name: 'USD Tether',code:"USDT" , image:USDT},
  ],
  "Terra Test Network":[
    { name: 'Terra',code:"LUNA" , image:LUNA},
    { name: 'Terra USD',code:"UST" , image:UST},
  ],
  "Polygon Mumbai":[
    { name: 'Polygon',code:"MATIC" , image:MATIC},
    { name: 'USD Coin',code:"USDC" , image:USDC},
  ]
}

export default function SelectCrypto({setCrypto,blockchain,setTxResult}) {
  const [selected, setSelected] = useState(blockchainCoins[blockchain][0])
  const [cryptos, setCryptos] = useState([]);

  
  useEffect(() => {
    setCrypto(selected.code);
    setTxResult(null);
  }, [selected])

  useEffect(() => {
    if(blockchain === "Terra Test Network"){
      setSelected(blockchainCoins[blockchain][0]);
    }
    setCryptos(blockchainCoins[blockchain]);
  }, [blockchain])

  if(typeof window !== "undefined"){   
    window.ethereum.on("chainChanged", () => setSelected(blockchainCoins[blockchain][0]));
  }
  

  return (
    <div className="w-72 my-4 shadow">
      <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className='w-full'>
          <Listbox.Label className="block text-lg font-medium text-gray-700">Select Cryptocurrency</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer">
              <div className="flex items-center">
                <Image src={selected?.image} height={30} width={30} objectFit="cover" className="flex-shrink-0 h-6 w-6 rounded-full" />
                <section className='flex-col'>
                    <p className="ml-3 block truncate">{selected?.code}</p>
                    <p className='ml-3 text-gray-500'>{selected?.name}</p>
                </section>
              </div>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            {open && (
                <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <Listbox.Options static className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {cryptos?.map((stablecoin,index) => (
                        <Listbox.Option
                        key={index}
                        className={({ active }) =>
                            classNames(
                            active ? 'bg-blue-100' : 'text-gray-900',
                            'cursor-pointer select-none relative py-2 pl-3 pr-9'
                            )
                        }
                        value={stablecoin}
                        >
                        {({ selected, active }) => (
                            <>
                            <div className="flex items-center">
                                <Image src={stablecoin?.image} height={30} width={30} objectFit="cover" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                <section className='flex-col'>
                                    <p className="ml-3 block truncate">{stablecoin.code}</p>
                                    <p className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate text-gray-500')}>{stablecoin.name}</p>
                                </section>
                            </div>
    
                            {selected ? (
                                <span
                                className={classNames(
                                    active ? 'text-gray-500' : 'text-blue-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                                >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                            ) : null}
                            </>
                        )}
                        </Listbox.Option>
                    ))}
                    </Listbox.Options>
                </Transition>
            )}

          </div>
        </div>
      )}
      </Listbox>
    </div>
  )
}
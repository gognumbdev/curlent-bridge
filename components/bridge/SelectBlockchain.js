import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import BNBSmartChain  from "../../public/icon/blockchain/bnbBeaconChain.png"
import Ethereum from "../../public/icon/blockchain/ethereum.png"
import Terra from "../../public/icon/blockchain/terra.png"
import Polygon from "../../public/icon/blockchain/polygon.png"
import Optimism from "../../public/icon/blockchain/optimism.png"
import Arbitrum from "../../public/icon/blockchain/arbitrum.svg"
import Image from "next/image"
import { useSelector } from 'react-redux'
import { switchEthereumChain } from '../../controllers/ethereum/switchNetwork'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}  


const testnetBlockchains = [
  { name: 'Ethereum Kovan Network',code:"Ropsten" , image:Ethereum,chain:"ethereumKovan"},
  { name: 'BSC Test Network',code:"BSC" , image:BNBSmartChain,chain:"bscTestnet"},
  { name: 'Polygon Mumbai Network',code:"Polygon" , image:Polygon,chain:"polygonMumbai"},
  { name: 'Optimism Kovan Network',code:"Optimism" , image:Optimism,chain:"optimismKovan"},
]

export default function SelectBlockchain({setBlockchain,chainDirection,setLatestSelect}) {
  const [selected, setSelected] = useState(chainDirection == "From" ? testnetBlockchains[0] : testnetBlockchains[1])
  const {sourceChain,destinationChain} = useSelector(state => state.selectedNetwork)

  useEffect(() => {
    setBlockchain(selected?.name);
    if(chainDirection == "From"){
      switchEthereumChain(selected.chain,"test");
    }
  }, [selected])

  const handleSelectBlockchain = () => {
    setLatestSelect(chainDirection);
  }

  return (
    <div className="w-72 my-2 shadow">
      <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className='w-full'>
          <Listbox.Label className="block text-lg font-medium text-white">{chainDirection}</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer">
              <div className="flex items-center">
                <Image src={selected?.image ? selected?.image : Terra }  height={30} width={30} objectFit="contain" className="flex-shrink-0 h-6 w-6 rounded-full" />
                <section className='flex-col '>
                    <p className="ml-3 block truncate text-black font-medium">{selected?.name}</p>
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
                    {testnetBlockchains.map((blockchain,index) => (
                        <Listbox.Option
                        key={index}
                        className={({ active }) =>
                            classNames(
                            active ? 'bg-blue-100 text-black' : ' text-black',
                            'cursor-pointer select-none relative py-2 pl-3 pr-9 text-black'
                            )
                        }
                        value={blockchain}
                        >
                        {({ selected, active }) => (
                            <div
                                onClick={handleSelectBlockchain}
                            >
                            <div className="flex items-center">
                                <Image src={blockchain.image} height={30} width={30} objectFit="cover" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                <section className='flex-col'>
                                    <p className="ml-3 block truncate text-black ">{blockchain.name}</p>
                                </section>
                            </div>
    
                            {selected ? (
                                <span
                                className={classNames(
                                    active ? 'text-black ' : 'text-blue-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                                >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                            ) : null}
                            </div>
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


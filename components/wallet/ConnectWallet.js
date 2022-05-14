import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { ethers } from 'ethers'
import WalletProvider from './WalletProvider'
import MetaMask from "../../public/icon/wallet/MetaMask.png"
import { connectWallet } from '../../controllers/connectWallet'
import { connectUserToDapp } from '../../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'

export default function ConnectWallet() {
  let [isOpen, setIsOpen] = useState(false)
  const {sourceChain} = useSelector(state => state.selectedNetwork)
  const dispatch = useDispatch()
  
  console.log("Source Chain: ",sourceChain)
  
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const connectToWallet = async (walletName,network) => {
    // Only MetaMask wallet for now
    let userData ;
    switch(network){
      case "Ethereum Kovan Network":
        userData = await connectWallet("Ethereum Kovan Network")
        break;
      case "BSC Test Network":
        userData = await connectWallet("BSC Test Network")
        break;
      default:
        break;
    }
    
    console.log(userData);

    if (userData) {
      dispatch(connectUserToDapp({
        userAddress:userData.userAddress
      }))
    }

    closeModal();
  }

  return (
    <>
      <div className="flex items-center justify-center">
            <button className='rounded text-base px-4 py-2 text-white font-medium bg-blue-500' onClick={openModal}>
                Connect Wallet
            </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            {/* Connect Wallet Component Body */}
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-800  p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white flex justify-between"
                  >
                    <p className='text-xl'>
                      Select your wallet to connect 
                    </p>
                    
                    <XIcon 
                      className='h-6 hover:cursor-pointer hover:text-red-500 transition transform duration-150 ease-out ' 
                      onClick={closeModal}  
                    />
                  </Dialog.Title>
                  <div className="mt-2 " >
                    <WalletProvider walletName="MetaMask" image={MetaMask} connectWallet={connectToWallet} network={sourceChain}  />
                  </div>

                  <div className="mt-4">
                    
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>

          </div>
        </Dialog>
      </Transition>
    </>
  )
}
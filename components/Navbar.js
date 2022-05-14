/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConnectWallet from "../components/wallet/ConnectWallet"
import { disconnectUserFromDapp } from '../redux/actions/userAction'


{/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfwolAaPkgpsAyeI8AOPK2-8fndpzEqw5JoD2S28PihkM2zCQ/viewform?embedded=true" width="640" height="1083" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> */}
const navigation = [
  { name: 'Token info', href: 'Products', current: false,},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const router = useRouter();
  const {userAddress} = useSelector(state =>  state.user )
  const [showDisconnect, setShowDisconnect] = useState(false)
  const dispatch = useDispatch();

  console.log(userAddress)

  const goToPage = (pageName) => {
    switch(pageName){
      case "Token info":
        router.push("/token-info")
        break;
      default:
        router.push("/")
        break;
    }
  }

  const handleDisconnect = () => {
    console.log("disconenct user ")
    dispatch(disconnectUserFromDapp());
  }

  return (
    <Disclosure as="nav" className="fixed top-0 shadow w-full z-50 text-xl bg-black ">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-center sm:justify-start h-full ">
                <p 
                  onClick={() => router.push("/") }
                  className='text-2xl font-medium text-blue-500 cursor-pointer'>
                    Curlent Bridge
                </p>

                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((page,index) => (
                          <a
                          key={index}
                          onClick={() => goToPage(page.name)}
                          className={classNames(
                            page.current ? 'font-bold' : 'text-white  font-bold',
                            'px-3 py-2 rounded-md cursor-pointer'
                          )}
                          aria-current={page.current ? 'page' : undefined}
                        >
                          {page.name}
                        </a>
                      ))
                    }
                  </div>
                </div>
                
              </div>

              {userAddress ? (
                <div className='flex space-x-4'>
                  <div 
                    className='text-blue-500 border-blue-500 font-medium border-2 rounded py-2 px-4 cursor-pointer'
                    onClick={() => setShowDisconnect(!showDisconnect)}
                    >
                    {userAddress.slice(0,8)+"..."+userAddress.slice(-6,)}
                  </div>
                  {showDisconnect && (
                    <button 
                      className='border-2 px-4 py-2 rounded'
                      onClick={handleDisconnect}
                    >
                      Disconnect
                    </button>
                  )}
                  
                </div>

                
              ) : (
                <ConnectWallet />
              )}
              
              

            </div>
          </div>

        </>
      )}
    </Disclosure>
  )
}
import Head from 'next/head'
import BridgePanel from '../components/bridge/BridgePanel'

export default function Home() {
  

  return (
    <div className="h-full">
      <Head>
        <title>Curlent Bridge</title>
        <meta name="description" content="Curlent bridge is DeFi protocol to help DeFi user transfer assets across blockchain." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <main className='w-full grid grid-cols-1 place-items-center'>
        <BridgePanel  />
     </main>

      <footer>
        
      </footer>
    </div>
  )
}

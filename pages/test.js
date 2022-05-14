import Head from 'next/head'

export default function Test() {
  

  return (
    <div className="h-full">
      <Head>
        <title>Curlent Bridge Test Page</title>
        <meta name="description" content="Curlent bridge is DeFi protocol to help DeFi user transfer assets across blockchain." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <main className='w-full grid grid-cols-1 place-items-center'>
        <p>Hello World</p>
     </main>

      <footer>
        
      </footer>
    </div>
  )
}


export async function getServerSideProps() {
    let privateKey = process.env.CURLENT_ADMIN_PRIVATE_KEY
    let adminAddress = process.env.ADMIN_ADDRESS
  
    console.log(privateKey,adminAddress);
  
    return {
      props:{}
    }
  }
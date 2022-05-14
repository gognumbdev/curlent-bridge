import Layout from '../components/Layout'
import '../styles/globals.css'
import { Provider } from 'react-redux';
import getStore from "../redux/store.js"
import { PersistGate } from 'redux-persist/integration/react';


const {store,persistor} = getStore();


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
  
}

export default MyApp

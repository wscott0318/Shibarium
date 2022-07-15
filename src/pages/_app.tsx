import { useContext, useState } from "react";
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react';
// @ts-ignore
import SnackbarProvider from 'react-simple-snackbar'

import "../styles/globals.scss";
import Header from "./layout/header";
// import Sidebar from "./layout/sidebar";
// import { Provider } from "react-redux";
// import RStore from "./redux/store";
import store, { persistor } from '../state'
import { useRouter } from "next/router";
import { ProjectContext } from "../context/ProjectContext";
import { Provider as ReduxProvider } from 'react-redux'

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { RouteGuard } from "../utils/RouteGaurd";

import { MoralisProvider } from "react-moralis";

// import Web3ProviderNetwork from '../components/Web3ProviderNetwork';
import Web3ReactManager from '../components/Web3ReactManager';
import getLibrary from '../functions/getLibrary'
import dynamic from "next/dynamic";
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from "app/config/constant";
// import Header from "app/components/Header";

// function getLibrary(provider) {
//   const library = new Web3Provider(provider);
//   library.pollingInterval = 12000;
//   return library;
// }

declare global {
   interface Window {
  walletLinkExtension?: any
  ethereum?: {
    isCoinbaseWallet?: true
    isMetaMask?: true
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    removeAllListeners?: (...args: any[]) => void
    autoRefreshOnNetworkChange?: boolean
  }
  web3?: Record<string, unknown>
}
}
const Web3ProviderNetwork = dynamic(() => import('../components/Web3ProviderNetwork'), { ssr: false })

function MyApp({ Component, pageProps }:any) {
  const router = useRouter();
  const [isSideNav, setIsSideNav] = useState(false);

  console.log("component", pageProps);
  const routeWithoutHeader = ['/login']
  return (
      <ProjectContext>
        <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
        <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
         <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Web3ReactManager>
            <ReduxProvider store={store}>
            <SnackbarProvider>
        <RouteGuard>
          {router.asPath == "/login" ? "" : <Header />}
          <Component {...pageProps} />
        </RouteGuard>
        </SnackbarProvider>
        </ReduxProvider>
        </Web3ReactManager>
        </Web3ProviderNetwork>
        </Web3ReactProvider>
        </I18nProvider>
        </MoralisProvider>
      </ProjectContext>
  );
}

export default MyApp;

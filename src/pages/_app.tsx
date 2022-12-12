
import { useContext, useEffect, useState } from "react";
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react';
// @ts-ignore
import SnackbarProvider from 'react-simple-snackbar'
import "../styles/globals.scss";
import Header from "./layout/header";
import store, { persistor } from '../state'
import { useRouter } from "next/router";
import { ProjectContext } from "../context/ProjectContext";
import { Provider as ReduxProvider } from 'react-redux'
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Web3ReactManager from '../components/Web3ReactManager';
import getLibrary from '../functions/getLibrary'
import dynamic from "next/dynamic";
import ComponentRouters from "./routes";

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
  const routeWithoutHeader = ['/login']
  if (process.env.NODE_ENV === "production") {
    console.log = () => { };
  }
  // useEffect(() => {
  //  console.log(screen.orientation );
 
  // })
  
  return (
    <ProjectContext>
        {/* <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}> */}
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <Web3ReactManager>
                <ReduxProvider store={store}>
                  <SnackbarProvider>
                  <ComponentRouters Component={Component} pageProps={pageProps} />
                  </SnackbarProvider>
                </ReduxProvider>
              </Web3ReactManager>
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        {/* </I18nProvider> */}
    </ProjectContext>
  );
}

export default MyApp;

// @ts-ignore
import SnackbarProvider from "react-simple-snackbar";
import "../styles/globals.scss";
import store from "../state";
import { ProjectContext } from "../context/ProjectContext";
import { Provider as ReduxProvider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import Web3ReactManager from "../components/Web3ReactManager";
import getLibrary from "../functions/getLibrary";
import dynamic from "next/dynamic";
import ComponentRouters from "./routes";
import Head from "next/head";
import ErrorBoundary from "../components/ErrorBoundary";
const APP_NAME = "Shibarium";
declare global {
  interface Window {
    walletLinkExtension?: any;
    ethereum?: {
      isCoinbaseWallet?: true;
      isMetaMask?: true;
      on?: (...args: any[]) => void;
      removeListener?: (...args: any[]) => void;
      removeAllListeners?: (...args: any[]) => void;
      autoRefreshOnNetworkChange?: boolean;
    };
    web3?: Record<string, unknown>;
  }
}
const Web3ProviderNetwork = dynamic(
  () => import("../components/Web3ProviderNetwork"),
  { ssr: false }
);

function MyApp({ Component, pageProps }: any) {
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
  }
  // useEffect(() => {
  //  console.log(screen.orientation );

  // })
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <ProjectContext>
        {/* <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}> */}
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Web3ReactManager>
              <ReduxProvider store={store}>
                <SnackbarProvider>
                  <ErrorBoundary>
                    <ComponentRouters
                      Component={Component}
                      pageProps={pageProps}
                    />
                  </ErrorBoundary>
                </SnackbarProvider>
              </ReduxProvider>
            </Web3ReactManager>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
        {/* </I18nProvider> */}
      </ProjectContext>
    </>
  );
}

export default MyApp;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/dist/client/router";
import Popup from "../components/PopUp";
// import { useWeb3React } from '@web3-react/core'
// import { Web3Provider } from '@ethersproject/providers'
// import  ProjectContext  from "../../context/ProjectContext";
// import { useAccount } from "../../../hooks/web3hooks";
// import { walletConnector } from "../../utils/connectors";
// import Web3 from "web3";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import Link from "next/link";
import Web3Status from "app/components/Web3Status";
import { useActiveWeb3React } from "app/services/web3";

export default function Login() {
  const router = useRouter();
  const [showInsModal, setShowInsModal] = useState(false);

  const { account } = useActiveWeb3React();
  // const account = useAccount()

  const connectToMetamask = () => {
    // authenticate()
    // activate(walletConnector)
  };

  // useEffect(() => {
  //   if (library) {
  //    let web3 =  new Web3(library?.provider)
  //    const publicAddress = account;
  //    if ( publicAddress && web3 && web3.eth &&  web3.eth.personal) {
  //      web3.eth.personal.sign(
  //       'Welcome to Shibarium',
  //       publicAddress,
  //       ()=>{}
  //     )
  //    }
  //   }
  // }, [library,account])

  // useEffect(()=>{
  //  const isLoggedIn =  localStorage.getItem('isLoggedIn')
  //  if (isLoggedIn) {
  //    connectToMetamask()
  //  }
  // },[])
  useEffect(() => {
    if (account) {
      // handleAccount(account)
      router.push("/home");
    }
  }, [account]);
  // useEffect(() => {
  //   // if(error){
  //   //   const errorMsg = getErrorMessage(error)
  //   //  alert(errorMsg)
  //   //  }
  // },[error]);

  function getErrorMessage(error) {
    if (error instanceof NoEthereumProviderError) {
      return "Please install metamask and try again.";
    } else if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect
    ) {
      return "Please authorize this website to access your Ethereum account.";
    } else {
      console.error(error);
      return "";
    }
  }

  return (
    <>
      <main className="main-content full-vh dark-bg-800">
        {/* login section start */}
        <p
          className="mb-0"
          style={{ display: "flex", justifyContent: "center" }}
        ></p>
        <section className="login-section">
          <div className="container">
            <div className="login_h_logo text-center d-none">
              <a href="#" className="">
                <img
                  className="img-fluid"
                  src="../../assets/images/logo.png"
                  alt="site-logo"
                  width={250}
                />
              </a>
            </div>
            <div className="login_holder">
              <div className="login_outr">
                <h2>Login</h2>
                <Web3Status />
                <p className="sign_up_optn">
                  Don’t have a wallet?{" "}
                  <Link
                    href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                    passHref
                  >
                    <a target="_blank">Download here</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* login section end */}
      </main>
    </>
  );
}

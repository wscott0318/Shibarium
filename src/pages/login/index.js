/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
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

  const connectToMetamask = () => {
    // authenticate()
    // activate(walletConnector)
  };

  useEffect(() => {
    if (account) {
      // handleAccount(account)
      router.push("/home");
    }
  }, [account]);

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

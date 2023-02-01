/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Web3Status from "app/components/Web3Status";
import { useActiveWeb3React } from "app/services/web3";

export default function Login() {
  const router = useRouter();

  const { account } = useActiveWeb3React();


  useEffect(() => {
    if (account) {
      // handleAccount(account)
      router.push("/home");
    }
  }, [account]);


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

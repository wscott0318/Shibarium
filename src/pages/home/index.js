/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import  ProjectContext  from "../../context/ProjectContext";

export default function Home() {
  // const {account}=useContext(ProjectContext)
  
  const { active,deactivate } = useWeb3React()
  // const [accountsAddress, setAccountsAddress] = useState("");
  // useEffect(() => {
  //   setAccountsAddress(localStorage.getItem("accounts"));
  //   console.log('chainId',chainId)
  //   console.log('account-home',account)
  // },[account]);

  /**
   * 
    useEffect(()=>{
      let userDetails = localStorage.getItem('ShibariumUser');
      userDetails = userDetails ? JSON.parse(userDetails)?.objectId: ''
      if (!userDetails && active) {
        deactivate()
      }
    },[active])
  */

//  console.log('account---------------', account)
  return (
    <>
      {/* main-header start */}

      {/* <header className="main-header darkBg">
        <div className="container">
          <nav className="nav justify-content-between align-items-center">
            <div className="left-widget">
              <a href="javascrip:void(0)" className="navbar-brand">
                <img
                  className="img-fluid d-none"
                  src="../../assets/images/logo.png"
                  alt=""
                />
                <img
                  className="img-fluid"
                  src="../../assets/images/logo-white.png"
                  alt=""
                />
              </a>
            </div>
            <div className="right-widget">
              {accountsAddress != null ? (
                <>
                  <img
                    className="img-fluid"
                    src="../../assets/images/meta.png"
                  />
                  <span>
                    Account {accountsAddress && accountsAddress.slice(0, 4)}
                  </span>
                </>
              ) : (
                <form action="" className="inline-form">
                  <Link href="./login">
                    <a className="btn gradient_btn">
                      <span>Connect To A Wallet</span>
                    </a>
                  </Link>
                </form>
              )}
            </div>
          </nav>
        </div>
      </header> */}

      {/* main header end */}
      <main className="page-content">
        {/* banner section start */}
        <section className="banner-section banner-pad ban-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <h1 className="text-white main-title">
                  <span className="mb-1 sub-title d-block mb-md-2 mb-lg-3">
                    Getting started with {" "}
                  </span>
                  Shibarium PoS chain
                </h1>
              </div>
            </div>
          </div>
        </section>
        {/* banner section end */}

        {/* features section start */}
        <div className="page-content-wrap darkBg">
          <section className="mt-4 features-section mt-lg-0">
            <div className="container">
              <div className="row ftrs-row">
                <div className="mb-4 col-sm-6 col-lg-3 ftrs-col mb-lg-5">
                  <div className="ftrs-item">
                    <div className="ftrs-icon">
                      <img
                        className="img-fluid"
                        src="../../assets/images/transaction.png"
                        alt="ftrs-icon"
                        width={130}
                        height={130}
                      />
                    </div>
                    <div className="ftrs-content">
                      <h3 className="mb-0 fwb">Fastest Transactions</h3>
                    </div>
                  </div>
                </div>
                <div className="mb-4 col-sm-6 col-lg-3 ftrs-col mb-lg-5">
                  <div className="ftrs-item">
                    <div className="ftrs-icon">
                      <img
                        className="img-fluid"
                        src="../../assets/images/gaming.png"
                        alt="ftrs-icon"
                        width={130}
                        height={130}
                      />
                    </div>
                    <div className="ftrs-content">
                      <h3 className="mb-0 fwb">Made For Gaming</h3>
                    </div>
                  </div>
                </div>
                <div className="mb-4 col-sm-6 col-lg-3 ftrs-col mb-lg-5">
                  <div className="ftrs-item">
                    <div className="ftrs-icon">
                      <img
                        className="img-fluid"
                        src="../../assets/images/op-shib.png"
                        alt="ftrs-icon"
                        width={130}
                        height={130}
                      />
                    </div>
                    <div className="ftrs-content">
                      <h3 className="mb-0 fwb">Optimized For Shib</h3>
                    </div>
                  </div>
                </div>
                <div className="mb-4 col-sm-6 col-lg-3 ftrs-col mb-lg-5">
                  <div className="ftrs-item">
                    <div className="ftrs-icon">
                      <img
                        className="img-fluid"
                        src="../../assets/images/secure.png"
                        alt="ftrs-icon"
                        width={130}
                        height={130}
                      />
                    </div>
                    <div className="ftrs-content">
                      <h3 className="mb-0 fwb">
                        Secured by Shibarium Validators
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* fetures section end */}

          {/* chain  start  */}
          <section className="chain-section">
            <div className="shib-img">
              {/* <img className='img-fluid' src="../../assets/images/shib-img.png" alt="shib-img"/> */}
            </div>
            <div className="container position-relative">
              <div className="heading-wrap">
                <h2 className="text-white heading fwb">
                  <span className="heading-bg">Getting started</span> with
                  Shibarium PoS chain
                </h2>
                <p className="mt-2 text-white heading-desc">
                  The safe, fast, and most secure way to use Shibarium PoS.
                </p>
              </div>
              <div className="col-lg-9 ms-auto">
                <div className="row chain-row justify-content-center">
                  <div className="col-md-6 chain-col">
                    <Link
                      href={`/balance`}
                    >
                      <div className="cus-card chain-item">
                        <div className="chain-img">
                          <img
                            className="img-fluid"
                            src="../../assets/images/shib-wallet.png"
                            alt=""
                          />
                        </div>
                        <div className="chain-content">
                          <div className="cus-hr primary-bg2"></div>
                          <h3 className="mb-2 fwb">Shibarium Wallet</h3>
                          <p>
                            Send and receive crypto assets on Shibarium network
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-6 chain-col">
                    <Link href="./bone-staking">
                    <div  className="cus-card chain-item">
                      <div className="chain-img">
                        <img
                          className="img-fluid"
                          src="../../assets/images/shib-staking.png"
                          alt=""
                        />
                      </div>
                      <div className="chain-content">
                        <div className="cus-hr primary-bg2"></div>
                        <h3 className="mb-2 fwb">Shibarium Staking</h3>
                        <p>Stake BONE to earn rewards</p>
                      </div>
                    </div>
                    </Link>
                  </div>
                  <div className="col-md-6 chain-col">
                    <Link
                      href={`/dashboard`}
                    >
                      <div className="cus-card chain-item">
                        <div className="chain-img">
                          <img
                            className="img-fluid"
                            src="../../assets/images/shib-bridge.png"
                            alt=""
                          />
                        </div>
                        <div className="chain-content">
                          <div className="cus-hr primary-bg2"></div>
                          <h3 className="mb-2 fwb">Shibarium Bridge</h3>
                          <p>Deposit and withdraw between networks</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  {/* <div className='col-md-6 chain-col'>
                        <div className='cus-card chain-item'>
                          <div className='chain-img'>
                            <img className='img-fluid' src="../../assets/images/wid-dashboard.png" alt="" />
                          </div>
                          <div className="chain-content">
                            <div className="cus-hr primary-bg2"></div>
                            <h3 className='mb-2 fwb'>Widget Dashboard</h3>
                            <p>
                              Manage all your Shibarium wallet widgets at one place
                            </p>
                          </div>
                        </div>
                    </div> */}
                </div>
              </div>
            </div>
          </section>
          {/* chain  end */}
        </div>
      </main>
      {/* main header closed */}
      <footer className="main-footer">
        <div className="container">
          <div className="my-3 my-4 copyright">
            <h3 className="mb-0 text-center fwb">Powered by xFund.</h3>
          </div>
        </div>
      </footer>
    </>
  );
}

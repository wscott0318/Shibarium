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
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'

import Web3Status from "app/components/Web3Status";
import { useActiveWeb3React } from "app/services/web3";

import { useMoralis } from "react-moralis";

export default function Login() {
  const router = useRouter()
  // const { authenticate, isAuthenticated, user,} = useMoralis();

  // const {handleAccount}=useContext(ProjectContext)
  const [showInsModal, setShowInsModal] = useState(false);
 
  const { account } = useActiveWeb3React()
  // const account = useAccount()
   
  const connectToMetamask=()=>{
    // authenticate()
    // activate(walletConnector)
  }

  
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
    if(account){
      // handleAccount(account)
      router.push('/home')
    }
    },[account]);
    // useEffect(() => {
    //   // if(error){
    //   //   const errorMsg = getErrorMessage(error)
    //   //  alert(errorMsg)
    //   //  }
    // },[error]);
  
    function getErrorMessage(error) {
      if (error instanceof NoEthereumProviderError) {
        return 'Please install metamask and try again.'
      } else if (error instanceof UnsupportedChainIdError) {
        return "You're connected to an unsupported network."
      } else if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorWalletConnect
      ) {
        return 'Please authorize this website to access your Ethereum account.'
      } 
      else {
        console.error(error)
        return ''
      }
    }
    

  return (
    <>
      <Popup show={showInsModal} setShow={setShowInsModal} title="Metamask" />
      <header className="main-header">
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
          </nav>
        </div>
      </header>
      <main className="pt-0 wrapper">
        <div className="login-wrap">
          <div className="float-shib">
            <img
              className="img-fluid"
              src="../../assets/images/shi-left.png"
              alt=""
            />
          </div>
          <div className="main-content">
            <div className="login-data w-100">
              <h1 className="mb-4 hdr-before">Login</h1>
              <div className="row login-row">
                <div className="col-sm-6 login-col" onClick={connectToMetamask}>
                  <a
                    className="text-center card-100 card-link"
                    href="#!"
                  >
                    <div className="arrow-icon">
                      <img
                        className="img-fluid"
                        src="../../assets/images/arrow-right.png"
                        alt="arrow-icons"
                      />
                    </div>
                    <div className="mb-3 image-wrap">
                      <img
                        className="img-fluid"
                        src="../../assets/images/metamask.png"
                        alt="meta-mask"
                      />
                    </div>
                    <h5 className="fwb">Metamask</h5>
                    <p className="mb-0" style={{display:'flex', justifyContent:'center'}}>
                      <Web3Status />
                    </p>
                  </a>
                </div>
                {/* <div className="col-sm-6 login-col">
                      <a className='text-center card-100 card-link' href="#!">
                        <div className='arrow-icon'>
                          <img className='img-fluid' src="../../assets/images/arrow-right.png" alt="arrow-icons" />
                        </div>
                        <div className='mb-3 image-wrap'>
                          <img className='img-fluid' src="../../assets/images/coin-base.png" alt="meta-mask" />
                        </div>
                        <h5 className='fwb'>Coinbase Wallet</h5>
                        <p className='mb-0'>
                          Connect using Coinbase wallet
                        </p>
                      </a>
                  </div>
                  <div className="col-sm-6 login-col">
                      <a className='text-center card-100 card-link' href="#!">
                        <div className='arrow-icon'>
                          <img className='img-fluid' src="../../assets/images/arrow-right.png" alt="arrow-icons" />
                        </div>
                        <div className='mb-3 image-wrap'>
                          <img className='img-fluid' src="../../assets/images/bitski.png" alt="meta-mask" />
                        </div>
                        <h5 className='fwb'>Bitski Wallet</h5>
                        <p className='mb-0'>
                          Connect using Bitski wallet
                        </p>
                      </a>
                  </div>
                  <div className="col-sm-6 login-col">
                      <a className='text-center card-100 card-link' href="#!">
                        <div className='arrow-icon'>
                          <img className='img-fluid' src="../../assets/images/arrow-right.png" alt="arrow-icons" />
                        </div>
                        <div className='mb-3 image-wrap'>
                          <img className='img-fluid' src="../../assets/images/venly.png" alt="meta-mask" />
                        </div>
                        <h5 className='fwb'>Venly</h5>
                        <p className='mb-0'>
                          Connect using Venly wallet
                        </p>
                      </a>
                  </div>
                  <div className="col-sm-6 login-col">
                      <a className='text-center card-100 card-link' href="#!">
                        <div className='arrow-icon'>
                          <img className='img-fluid' src="../../assets/images/arrow-right.png" alt="arrow-icons" />
                        </div>
                        <div className='mb-3 image-wrap'>
                          <img className='img-fluid' src="../../assets/images/wallet-connect.png" alt="meta-mask" />
                        </div>
                        <h5 className='fwb'>WalletConnect</h5>
                        <p className='mb-0'>
                          WalletConnect
                        </p>
                      </a>
                  </div> */}
                <div className="col-sm-6 login-col dwnld_optn">
                  <a
                    className="text-center card-100 card-link d-flex justify-content-center align-items-center"
                    href="#!"
                  >
                    <div className="arrow-icon">
                      <img
                        className="img-fluid"
                        src="../../assets/images/arrow-right-white.png"
                        alt="arrow-icons"
                      />
                    </div>
                    <div className="walet-blk">
                      <h5 className="fwb">Don&apos;t have wallet?</h5>
                      <p className="mb-0">Download here.</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

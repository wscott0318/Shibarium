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

export default function Assets() {
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
      router.push('/assets')
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
      <main className="main-content">
        
        <section className="assets-section">
            <div className="container cmn_dashbord_main_outr">
                {/* assets section start */}
                <div className="assets_outr">
                    <h2>My Balance</h2>
                    <div className="assets_top_area">
                        <div className="main_net_amnt">
                            <h1>20.000$</h1>
                            <p>shibarium mainnet</p>
                        </div>
                        <div className="btns_area">
                            <a href="#" className="btn grey-btn w-100 d-block"><span><img src="../../images/recive-icon.png" alt="recive"/></span>Receive</a>
                            <a href="#" className="btn grey-btn w-100 d-block"><span><img src="../../images/send-icon.png" alt="recive"/></span>Send</a>
                        </div>
                        <div className="lrg_btns_area">
                            <a href="#" className="btn white-btn w-100 d-block">Move funds from Ethereum to Shibarium</a>
                            <a href="#" className="btn white-btn w-100 d-block">How Shibarium works</a>
                        </div>
                    </div>

                    <div className="assets_btm_area">
                        <h2>Assets on Shibarium</h2>
                        <div className="cmn_dasdrd_table">
                            <div class="table-responsive">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Balance</th>
                                            <th>Actions</th>
                                            <th colSpan="2"><input type="search" placeholder="Search"/></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span><img src="../../images/shiba-round-icon.png"/></span><b>SHIB</b> - Shibatoken</td>
                                            <td>0.0000 - 0.00$</td>
                                            <td>Deposit</td>
                                            <td>Whitdraw</td>
                                            <td>Send</td>
                                        </tr>
                                        <tr>
                                            <td><span><img src="../../images/shiba-round-icon.png"/></span><b>SHIB</b> - Shibatoken</td>
                                            <td>0.0000 - 0.00$</td>
                                            <td>Deposit</td>
                                            <td>Whitdraw</td>
                                            <td>Send</td>
                                        </tr>
                                        <tr>
                                            <td><span><img src="../../images/shiba-round-icon.png"/></span><b>SHIB</b> - Shibatoken</td>
                                            <td>0.0000 - 0.00$</td>
                                            <td>Deposit</td>
                                            <td>Whitdraw</td>
                                            <td>Send</td>
                                        </tr>
                                        <tr>
                                            <td><span><img src="../../images/shiba-round-icon.png"/></span><b>SHIB</b> - Shibatoken</td>
                                            <td>0.0000 - 0.00$</td>
                                            <td>Deposit</td>
                                            <td>Whitdraw</td>
                                            <td>Send</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* assets section end */}
            </div>
        </section> 
        
      </main>
   </>
  );
}

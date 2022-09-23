/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";

import { Button, Container, Nav, Navbar, NavDropdown,Dropdown } from 'react-bootstrap';

import { useRouter } from "next/dist/client/router";
import Popup from "../components/PopUp";
// import { useWeb3React } from '@web3-react/core'
// import { Web3Provider } from '@ethersproject/providers'
// import  ProjectContext  from "../../context/ProjectContext";
// import { useAccount } from "../../../hooks/web3hooks";
// import { walletConnector } from "../../utils/connectors";
// import Web3 from "web3";
import Link from 'next/link'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import Sidebar  from "../layout/sidebar"
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
      
        <Sidebar/>

        <section className="assets-section">
            <div className="cmn_dashbord_main_outr">
                <div className="inner-header">
                <Navbar className='py-0' expand="lg">
                  <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="ms-auto">
                        <Dropdown className="d-flex align-items-center">
                        <div className="" id="basic-nav-dropdown">
                          <img src="../../images/menu-icon.png" alt="" />
                        </div>
                        <NavDropdown className="me-3" title="App">
                          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">
                            Another action
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.4">
                            Separated link
                          </NavDropdown.Item>
                        </NavDropdown>
                        </Dropdown>
                        <Nav.Item>
                          <Link href={'javascript:void(0)'}>
                            <a className='btn primary-btn d-flex align-items-center' href="javascript:void(0)">
                              <img className="img-fluid me-2" src="../../images/meta-icon.png" alt="meta-img"/>
                              <span>0x21A...48A5</span>
                            </a>
                          </Link>
                        </Nav.Item>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
                </div>
                {/* assets section start */}
                <div className="assets_outr">
                    <h2>My Balance</h2>
                    <div className="assets_top_area">
                        <div className="main_net_amnt t_a_clm">
                            <h1>20.000$</h1>
                            <p>shibarium mainnet</p>
                        </div>
                        <div className="btns_area t_a_clm">
                            <a href="#" className="btn grey-btn w-100 d-block"><span><img src="../../images/recive-icon.png" alt="recive"/></span>Receive</a>
                            <a href="#" className="btn grey-btn w-100 d-block"><span><img src="../../images/send-icon.png" alt="recive"/></span>Send</a>
                        </div>
                        <div className="lrg_btns_area t_a_clm">
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
                                            <th colSpan="2" className="text-end"><input type="search" placeholder="Search"/></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span><img src="../../images/shiba-round-icon.png"/></span><b>SHIB</b> - Shibatoken</td>
                                            <td>0.0000 - 0.00$</td>
                                            <td><a href="#">Deposit</a></td>
                                            <td><a href="#">Whitdraw</a></td>
                                            <td><a href="#">Send</a></td>
                                        </tr>
                                        <tr>
                                            <td><span><img src="../../images/matic-round-icon.png"/></span><b>MATIC</b> - Polygon</td>
                                            <td>0.0000 - 0.00$</td>
                                            <td><a href="#">Deposit</a></td>
                                            <td><a href="#">Whitdraw</a></td>
                                            <td><a href="#">Send</a></td>                                            
                                        </tr>
                                        <tr>
                                            <td><span><img src="../../images/bnb-round-icon.png"/></span><b>BNB</b> - BNB</td>
                                            <td>0.0000 - 0.00$</td>
                                            <td><a href="#">Deposit</a></td>
                                            <td><a href="#">Whitdraw</a></td>
                                            <td><a href="#">Send</a></td>                                            
                                        </tr>
                                        <tr>
                                            <td><span><img src="../../images/shiba-round-icon.png"/></span><b>SHIB</b> - Shibatoken</td>
                                            <td>0.0000 - 0.00$</td>
                                            <td><a href="#">Deposit</a></td>
                                            <td><a href="#">Whitdraw</a></td>
                                            <td><a href="#">Send</a></td>                                        
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

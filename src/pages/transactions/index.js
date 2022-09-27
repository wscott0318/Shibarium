/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";

import { Button, Container, Nav, Navbar, NavDropdown,Dropdown ,Modal} from 'react-bootstrap';

import { useRouter } from "next/dist/client/router";
import Popup from "../components/PopUp";
// import { useWeb3React } from '@web3-react/core'
// import { Web3Provider } from '@ethersproject/providers'
// import  ProjectContext  from "../../context/ProjectContext";
// import { useAccount } from "../../../hooks/web3hooks";
// import { walletConnector } from "../../utils/connectors";
// import Web3 from "web3";
import  CommonModal from "../components/CommonModel";
import Link from 'next/link'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import Sidebar  from "../layout/sidebar"
import Web3Status from "app/components/Web3Status";
import { useActiveWeb3React } from "app/services/web3";
import { useMoralis } from "react-moralis";
// import Web3Status from "app/components/Web3Status";  

export default function Transaction() {
  const router = useRouter()
  // const { authenticate, isAuthenticated, user,} = useMoralis();

  // const {handleAccount}=useContext(ProjectContext)
  const [showSendModal, setSendModal] = useState(false);
  const [menuState, setMenuState] = useState(false);
 
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
      // router.push('/assets')
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


    const handleMenuState = () => {
      setMenuState(false)
    }

  return (
   <>
      <main className="main-content">
        <Sidebar handleMenuState={handleMenuState} menuState={menuState}/>
        
          <section className="assets-section">
              <div className="cmn_dashbord_main_outr">
                  <div className="inner-header">
                  <Navbar className='py-0'>
                    <Container>
                      <Navbar.Brand onClick={() => setMenuState(true)} className="menu-btn">
                        <img className="img-fluid" src="../../images/menu.svg" alt="" />
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Dropdown className="d-flex align-items-center cus-dd mob-drop">
                            <div className="" id="basic-nav-dropdown">
                              <img src="../../images/menu-icon.png" alt="" />
                            </div>
                            <NavDropdown className="me-3" title="App">
                              <div className="drop-head">
                                <div className="head-brand">
                                  <img src="../../images/Shib-Logo.png" alt="" />
                                </div>
                                <div className="head-txt">
                                  <div className="top-txt">
                                    <div>
                                      <span>Account 0xe78</span>
                                    </div>
                                    <div>
                                      <span className="grey-txt">Shibarium Mainnet</span>
                                    </div>
                                  </div>
                                  <div className="botom-txt">
                                    <div className="code-txt">
                                      <span className="key">0xe7832a34576B9A23b98B7cE8ef83B1a8D9D229f0</span>
                                    </div>
                                    <div className="copy-blk">
                                      <a href="javascript:void(0);" title="Copy"><img src="../../images/copy.png" alt="" /></a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <NavDropdown.Item href="#action/3.1">
                                <div className="custum-row">
                                  <div className="lft-img">
                                    <img src="../../images/recive-icon.png" alt="" />
                                  </div>
                                  <div className="center-txt">
                                    <span>Recive Funds</span>
                                  </div>
                                  <div className="rt-image">
                                    <img src="../../images/rt-arow.png" alt="" />  
                                  </div>
                                </div>
                              </NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.2">
                                <div className="custum-row">
                                  <div className="lft-img">
                                    <img src="../../images/graph.png" alt="" />
                                  </div>
                                  <div className="center-txt">
                                    <span>View on Etherscan</span>
                                  </div>
                                  <div className="rt-image">
                                    <img src="../../images/rt-arow.png" alt="" />  
                                  </div>
                                </div>
                              </NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.3">
                                <div className="custum-row">
                                  <div className="lft-img">
                                    <img src="../../images/graph.png" alt="" />
                                  </div>
                                  <div className="center-txt">
                                    <span>View on Shibariumscan</span>
                                  </div>
                                  <div className="rt-image">
                                    <img src="../../images/rt-arow.png" alt="" />  
                                  </div>
                                </div>
                              </NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.3">
                                <div className="custum-row pb-0">
                                  <div className="lft-img ps-2">
                                    <img src="../../images/back.png" alt="" />
                                  </div>
                                  <div className="center-txt">
                                    <span>Logout</span>
                                  </div>
                                  <div className="rt-image">
                                    <img src="../../images/rt-arow.png" alt="" />  
                                  </div>
                                </div>
                              </NavDropdown.Item>
                              {/* <NavDropdown.Divider />
                              <NavDropdown.Item href="#action/3.4">
                                Separated link
                              </NavDropdown.Item> */}
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
                          <Nav.Item>
                            <Web3Status/>
                          </Nav.Item>
                        </Nav>
                      </Navbar.Collapse>
                    </Container>
                  </Navbar>
                  </div>
                  {/* assets section start */}
                  <div className="assets_outr">
                      <h2>Transactions history</h2>
                     

                </div>   
                {/* assets section end */}                                 

            </div>
        </section> 
        
      </main>
   </>
  );
}

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

export default function Assets() {
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
        <CommonModal
          title={"Transferring funds"}
          show={showSendModal}
          setShow={setSendModal}
          
          >
          {/* step 1 */}
          <>
            {/* transferring funds popop start */}
                
                {/* <div className="cmn_modal">
                    <p>Sending funds to exchanges:</p>
                    <div className="exchng_msg_box">
                        <p>Exchanges supported from Shibarium network</p>
                        <p className="sprdt_txt">Supported Excanges</p>
                    </div>
                    <p className="alert_msg"><img src="../../images/i-info-icon.png"/> Sending funds to unsupported exchanges will lead to permanent loss of funds.</p>
                    <div className="pop_btns_area row">
                          <div className="col-6"><a className='btn blue-btn w-100' href="javascript:void(0)">Cancel</a>  </div>
                          <div className="col-6"><a className='btn primary-btn w-100' href="javascript:void(0)">Continue</a>  </div>
                    </div>
                    <p className="pop_btm_txt text-center">If you want to send funds between chains visit <a href="#" >Shibarium Bridge</a></p>
                </div> */}

             {/* transferring funds popop ends */}

             {/* send popop start */}
                {/*<div className="cmn_modal">
                     <h4 className="pop_main_h text-center">Send</h4> 
                     <form>
                        <div class="form-group">                        
                          <input type="text" class="form-control cmn_inpt_fld"  placeholder="Reciver address"/>
                        </div>
                        <div class="form-group">  
                          <label>Enter a valid reciver address on Shibarium Mainnet</label>                      
                          <input type="text" class="form-control cmn_inpt_fld"  placeholder="0.00"/>
                          <p className="inpt_fld_hlpr_txt">
                            <span>0.00$</span>
                            <b>Available balance: 0.00 SHIB</b>
                          </p>
                        </div>
                        <div className="pop_btns_area mr-top-50 row">
                            <div className="col-6"><a className='btn blue-btn w-100' href="javascript:void(0)">Back</a>  </div>
                            <div className="col-6"><a className='btn primary-btn w-100' href="javascript:void(0)">Send</a>  </div>
                        </div>
                        
                     </form>
                     <p className="pop_btm_txt text-center">If you want to send funds between chains visit <a href="#" >Shibarium Bridge</a></p>
                </div>*/}
                {/* send popop ends */}

                {/* confirm send popop start */}
                <div className="cmn_modal">
                    <div className="cnfrm_box">
                        <div className="top_overview col-12">
                              <span><img src="../../images/shib-borderd-icon.png"/></span>
                              <h6>1100.00 SHIB</h6>
                              <p>500.00$</p>
                        </div>
                        <div className="add_detail col-12">
                            <p><b>RECEIVER:</b></p>
                            <p>0x5c932BBe4485C24E1a779872362e990dEdf0D208</p>
                        </div>
                    </div>
                    <div className="cnfrm_check_box">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                          <label class="form-check-label" for="flexCheckChecked">
                            I’m not sending funds to an <a href="#">unsupported excange</a> or incorrect address
                          </label>
                        </div>
                        
                       
                    </div>
                      <div className="pop_btns_area row">
                          <div className="col-6"><a className='btn blue-btn w-100' href="javascript:void(0)">Back</a>  </div>
                          <div className="col-6"><a className='btn primary-btn w-100' href="javascript:void(0)">Send</a>  </div>
                      </div>
                         
                      <p className="pop_btm_txt text-center">If you want to send funds between chains visit <a href="#" >Shibarium Bridge</a></p>
                </div>
                {/* confirm send popop ends */}

                {/* submitted popop start */}
                {/* <div className="cmn_modal">
                    <div className="cnfrm_box">
                        <div className="top_overview col-12">
                              <span><img src="../../images/shib-borderd-icon.png"/></span>
                              <h6>1100.00 SHIB</h6>
                              <p>500.00$</p>
                        </div>
                        <div className="add_detail col-12">
                            <p><b>TRANSACTION SUBMITTED TO:</b></p>
                            <p>0x5c932BBe4485C24E1a779872362e990dEdf0D208</p>
                        </div>
                    </div>
                    <div className="cnfrm_check_box text-center">
                        Check your wallet activity to see the status of the transaction
                    </div>
                      <div className="pop_btns_area row">
                          <div className="col-12"><a className='btn primary-btn w-100' href="javascript:void(0)">Close</a>  </div>
                      </div> 
                </div> */}
                {/* submitted popop ends */}

          </>
          {/* step 1 end */}
          </CommonModal>
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
                      <h2>My Balance</h2>
                      <div className="assets_top_area">
                          <div className="main_net_amnt t_a_clm">
                              <h1>20.000$</h1>
                              <p>shibarium mainnet</p>
                          </div>
                          <div className="btns_area t_a_clm">
                              <a href="#" className="btn grey-btn w-100 d-block">
                                <span><img src="../../images/recive-icon.png" alt="recive"/></span>
                                Receive
                              </a>
                              <button onClick={() => setSendModal(true)} className="btn grey-btn w-100 d-block"><span><img src="../../images/send-icon.png" alt="recive"/></span>Send</button>
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

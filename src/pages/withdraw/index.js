/* eslint-disable @next/next/no-img-element */
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

export default function Withdraw() {
  const [menuState, setMenuState] = useState(false);
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
                  {/* withdraw main section start */}
                  <div className="box-wrap">
                    {/* Left section start */}
                    <div className="left-box">
                      <div className="custum-card">
                        <div className="box-top">
                          <h1 className="heading-main">Shibarium Bridge</h1>
                          <div className="txt-row">
                             <div className="row-hd">Transfer Overview:</div>
                             <div className="row-description">The deposit process consists of a single transaction.</div>   
                          </div>
                          <div className="txt-row">
                             <div className="row-hd">Transfer Time:</div>
                             <div className="row-description">Moving your funds from Ethereum to Polygon take up to 10 - 15 Minutes.</div>   
                          </div>
                          <div className="txt-row">
                             <div className="row-hd">
                                <span className="icon-image">
                                  <img className="img-fluid" src="../../images/i-info-icon.png" alt="" />
                                </span>
                                <span className="alignment">Delegation/Staking Advice:</span>
                              </div>
                             <div className="row-description">
                                Delegation/Staking takes place on Ethereum. Do not deposit funds to Shibarium for this purpose. 
                                To delegate or stake please visit the <a className="orange-txt" href="javascript:void(0);">Staking UI</a>
                              </div>   
                          </div>
                        </div>
                        
                        <div className="box-bottom">
                          <div className="amt-section position-relative">
                            <div className="coin-blk">
                              <div className="coin-sec"><img className="img-fluid" src="../../images/eth.png" alt="" /></div>
                              <p className="lite-color">Estimation of GAS fee required</p>
                            </div>
                            <div>
                              <div className="lite-color fw-bold">$10.00</div>
                            </div>
                          </div>
                          <div className="sub-buttons-sec row">
                              <div className="col-md-6">
                                <button type="button" className="btn white-btn w-100">How Shibarium Works</button>
                              </div>
                              <div className="col-md-6">
                                <button type="button w-100" className="btn white-btn w-100">FAQs</button>
                              </div>
                          </div>
                        </div>
                      </div>          
                    </div>
                     {/* Left section end */}
                      {/* Right section start */}
                    <div className="right-box">
                      <div className="custum-card">
                        <form>
                          <div className="botom-spcing">
                            <div className="tab-sec">
                              <ul className="tab-links">
                                <li><a className="tb-link tab-active" href="javascript:void(0);">Deposit</a></li>
                                <li><a className="tb-link" href="javascript:void(0);">Withdraw</a></li>
                              </ul>
                            </div>
                          </div>
                          <div className="">
                            <div>
                              <label>From</label>
                              <div className="form-field position-relative">
                                <div className="icon-chain">
                                  <div><img className="img-fluid" src="../../images/eth.png" alt="" /></div>
                                </div>
                                <div className="mid-chain">
                                  <input type="text" placeholder="Ethereum chain"/>
                                </div>
                                <div className="rt-chain">
                                  <span className="fld-head lite-color">Balance:</span>
                                  <span className="fld-txt lite-color">100.00ETH</span>
                                </div>
                              </div>
                            </div>
                            <div className="field-grid row">
                              <div className="col-md-4">
                                <div className="form-field position-relative">
                                  <div className="">
                                    <div><img className="img-fluid" src="../../images/eth.png" alt="" /></div>
                                  </div>
                                  <div className="lite-color">
                                    <span className="lite-color fw-bold">ETH</span>
                                  </div>
                                  <div className="">
                                    <div className="arow-outer"><span className="arrow-down"></span></div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className="form-field position-relative">

                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div> 
                    </div>
                     {/* Left section start */}
                  </div>
                  {/* withdraw main section end */}
              </div>
            </section>
         </main>
    </>
  )
}

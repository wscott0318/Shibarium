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
import InnerHeader from "../../pages/inner-header";
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
  const [showDepositModal, setDepositModal] = useState(false);
  const [showWithdrawModal, setWithdrawModal] = useState(false);
  const [showTokenModal, setTokenModal] = useState(false);
 
  const handleMenuState = () => {
    setMenuState(false)
  }
  return (
    <>
         <main className="main-content">
          <Sidebar handleMenuState={handleMenuState} menuState={menuState}/>
          {/* modal code start */}
          <CommonModal
          title={"Deposit"}
          show={showDepositModal}
          setShow={setDepositModal}
          
          >
          {/* Deposit popups start */}
          <>
            

              {/* confirm deposit popop starts */}
                <div className="popmodal-body">
                  <div className="pop-block">
                    <div className="pop-top">
                      <div className="cnfrm_box">
                          <div className="top_overview col-12">
                                <span><img class="img-fluid" src="../../images/etharium.png" alt="" /></span>
                                <h6>100 ETH</h6>
                                <p>500.00$</p>
                          </div>
                      </div>
                      <div className="pop-grid">
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/etharium.png" alt="" /></div>
                          <p>ETHEREUM MAINNET</p>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/white-arrow.png" alt="" /></div>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/shib-borderd-icon.png" alt="" /></div>
                          <p>SHIBARIUM MAINNET</p>
                        </div>
                      </div>
                      <div className="amt-section position-relative">
                        <div className="coin-blk">
                          <div className="coin-sec"><img className="img-fluid" src="../../images/eth.png" alt="" /></div>
                          <p>Estimation of GAS fee required</p>
                        </div>
                        <div>
                          <p className="fw-bold">$10.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="pop-bottom">
                      <div>
                            <a className='btn primary-btn w-100' href="javascript:void(0)">Continue</a>
                          </div>
                    </div>
                  </div>
                </div>
                {/* confirm deposit popop ends */}

                {/* Transaction pending popup start */}
                {/* <div className="popmodal-body">
                  <div className="pop-block">
                    <div className="pop-top">
                      <div className="cnfrm_box">
                          <div className="top_overview col-12">
                                <span><img class="img-fluid" src="../../images/etharium.png" alt="" /></span>
                                <h6>100 ETH</h6>
                                <p>500.00$</p>
                          </div>
                      </div>
                      <div className="pop-grid">
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/etharium.png" alt="" /></div>
                          <p>ETHEREUM MAINNET</p>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/white-arrow.png" alt="" /></div>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/shib-borderd-icon.png" alt="" /></div>
                          <p>SHIBARIUM MAINNET</p>
                        </div>
                      </div>
                      <div className="amt-section position-relative">
                        <div className="coin-blk">
                          <div className="coin-sec"><img className="img-fluid" src="../../images/eth.png" alt="" /></div>
                          <p>Estimation of GAS fee required</p>
                        </div>
                        <div>
                          <p className="fw-bold">$10.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="pop-bottom">
                        <div className="text-section">
                          <h4 className="pop-hd-md">Moving funds</h4>
                          <p>It will take up to 10 - 15 minutes to move the funds on Shibarium Mainnet</p>
                        </div>
                        <div>
                          <a className='btn grey-btn w-100' href="javascript:void(0)"><span className="spinner-border text-secondary pop-spiner"></span><span>Continue</span></a>
                        </div>
                    </div>
                  </div>
                </div> */}
                {/* Transaction pending popup end */}

                {/* Transaction completed popup start */}
                {/* <div className="popmodal-body">
                  <div className="pop-block">
                    <div className="pop-top">
                      <div className="cnfrm_box">
                          <div className="top_overview col-12">
                                <span><img class="img-fluid" src="../../images/etharium.png" alt="" /></span>
                                <h6>100 ETH</h6>
                                <p>500.00$</p>
                          </div>
                      </div>
                      <div className="pop-action">
                        <a className='btn primary-btn w-100 w-100' href="javascript:void(0)">SHIBARIUM MAINNET</a>
                      </div>
                    </div>
                    <div className="pop-bottom">
                        <div className="text-section">
                          <h4 className="pop-hd-md">Transaction Completed</h4>
                          <p>Transaction completed succesfully.</p>
                        </div>
                        <div>
                          <a className='btn primary-btn w-100' href="javascript:void(0)">View on Shibascan</a>
                        </div>
                    </div>
                  </div>
                </div> */}
                {/* Transaction completed popup end */}

                

          </>
          {/* Deposit popups end */}
          </CommonModal>
          <CommonModal
          title={"Withdraw"}
          show={showWithdrawModal}
          setShow={setWithdrawModal}
          
          >
          {/* Withdraw tab popups start */}
          <>
            

              {/* Initialize withdraw popup start */}
                <div className="popmodal-body">
                  <div className="pop-block">
                    <div className="pop-top">
                      <div className="cnfrm_box">
                          <div className="top_overview col-12">
                                <span><img class="img-fluid" src="../../images/red-bone.png" alt="" /></span>
                                <h6>100 BONE</h6>
                                <p>500.00$</p>
                          </div>
                      </div>
                      <div className="pop-grid">
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/shib-borderd-icon.png" alt="" /></div>
                          <p>SHIBARIUM MAINNET</p>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/white-arrow.png" alt="" /></div>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/etharium.png" alt="" /></div>
                          <p>ETHERIUM MAINNET</p>
                        </div>
                      </div>
                      <div className="amt-section position-relative">
                        <div className="coin-blk">
                          <div className="coin-sec"><img width="24" height="24" className="img-fluid" src="../../images/shib-borderd-icon.png" alt="" /></div>
                          <p>Estimation of GAS fee required</p>
                        </div>
                        <div>
                          <p className="fw-bold">$10.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="pop-bottom">
                      <div className="text-section">
                        <h4 className="pop-hd-md">Initialize Whitdraw</h4>
                        <p>It will take up to 60 mins to 3 hours to reach the checkpoint. </p>
                      </div>
                      <div>
                          <a className='btn primary-btn w-100' href="javascript:void(0)">Continue</a>
                        </div>
                    </div>
                  </div>
                </div>

                {/* Initialize withdraw popup end */}

                {/* Reaching checkpoint popup start */}
                {/* <div className="popmodal-body">
                  <div className="pop-block">
                    <div className="pop-top">
                      <div className="cnfrm_box">
                          <div className="top_overview col-12">
                                <span><img class="img-fluid" src="../../images/red-bone.png" alt="" /></span>
                                <h6>100 BONE</h6>
                                <p>500.00$</p>
                          </div>
                      </div>
                      <div className="pop-grid">
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/shib-borderd-icon.png" alt="" /></div>
                          <p>SHIBARIUM MAINNET</p>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/white-arrow.png" alt="" /></div>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/etharium.png" alt="" /></div>
                          <p>ETHEREUM MAINNET</p>
                        </div>
                      </div>
                      <div className="amt-section position-relative">
                        <div className="coin-blk">
                          <div className="coin-sec"><img width="24" height="24" className="img-fluid" src="../../images/shib-borderd-icon.png" alt="" /></div>
                          <p>Estimation of GAS fee required</p>
                        </div>
                        <div>
                          <p className="fw-bold">$20.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="pop-bottom">
                      <div className="text-section">
                        <h4 className="pop-hd-md">Moving funds to Ethereum</h4>
                        <p>It will take up to 60 mins to 3 hours to reach the checkpoint I.</p>
                      </div>
                      <div>
                          <a className='btn grey-btn w-100' href="javascript:void(0)">
                            <span className="spinner-border text-secondary pop-spiner"></span><span>Moving funds</span>
                          </a>
                        </div>
                    </div>
                  </div>
                </div> */}
                {/* Reaching checkpoint  popup end */}


                {/* checkpoint Reached popup start */}
                  {/* <div className="popmodal-body">
                  <div className="pop-block">
                    <div className="pop-top">
                      <div className="cnfrm_box">
                          <div className="top_overview col-12">
                                <span><img class="img-fluid" src="../../images/red-bone.png" alt="" /></span>
                                <h6>100 SHIB</h6>
                                <p>500.00$</p>
                          </div>
                      </div>
                      <div className="pop-action">
                        <a className='btn primary-btn w-100 w-100' href="javascript:void(0)">ETHEREUM MAINNET</a>
                      </div>
                    </div>
                    <div className="pop-bottom">
                        <div className="text-section">
                          <h4 className="pop-hd-md">Complete Withdraw</h4>
                          <p>You need to confirm one more transaction to get your funds in your Ethereum Account.</p>
                        </div>
                        <div>
                          <a className='btn primary-btn w-100' href="javascript:void(0)">Confirm</a>
                        </div>
                    </div>
                  </div>
                </div> */}
                {/* checkpoint Reached popup end */}

                {/* Complete withdraw popup start */}
                {/* <div className="popmodal-body">
                  <div className="pop-block">
                    <div className="pop-top">
                      <div className="cnfrm_box">
                          <div className="top_overview col-12">
                                <span><img class="img-fluid" src="../../images/red-bone.png" alt="" /></span>
                                <h6>100 ETH</h6>
                                <p>500.00$</p>
                          </div>
                      </div>
                      <div className="pop-grid">
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/etharium.png" alt="" /></div>
                          <p>ETHEREUM MAINNET</p>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/white-arrow.png" alt="" /></div>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block"><img class="img-fluid" src="../../images/etharium.png" alt="" /></div>
                          <p>WALLET X25654a5</p>
                        </div>
                      </div>
                      <div className="amt-section position-relative">
                        <div className="coin-blk">
                          <div className="coin-sec"><img className="img-fluid" src="../../images/eth.png" alt="" /></div>
                          <p>Estimation of GAS fee required</p>
                        </div>
                        <div>
                          <p className="fw-bold">$20.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="pop-bottom">
                      <div className="text-section">
                          <h4 className="pop-hd-md">Withdrawing funds</h4>
                          <p>Moving funds to your Ethereum Account</p>
                      </div>
                      <div>
                        <a className='btn grey-btn w-100' href="javascript:void(0)">
                          <span className="spinner-border text-secondary pop-spiner"></span><span>Moving funds</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* Complete withdraw popup end */}

                {/* withdraw complete popup start */}
                 {/* <div className="popmodal-body">
                  <div className="pop-block">
                    <div className="pop-top">
                      <div className="cnfrm_box">
                          <div className="top_overview col-12">
                                <span><img class="img-fluid" src="../../images/red-bone.png" alt="" /></span>
                                <h6>100 SHIB</h6>
                                <p>500.00$</p>
                          </div>
                      </div>
                      <div className="pop-action">
                        <a className='btn primary-btn w-100 w-100' href="javascript:void(0)">TRANSFER COMPLETE</a>
                      </div>
                    </div>
                    <div className="pop-bottom">
                        <div className="text-section">
                          <h4 className="pop-hd-md">Transaction Completed</h4>
                          <p>Transaction completed succesfully. Your Ethereum wallet Balance will be updated in few minute. In case of problems contact our Support</p>
                        </div>
                        <div>
                          <a className='btn primary-btn w-100' href="javascript:void(0)">View on Shibascan</a>
                        </div>
                    </div>
                  </div>
                </div> */}
                {/* withdraw complete popup start */}

          </>
          {/* Withdraw tab popups end */}
          </CommonModal>
          <CommonModal
          title={"Select token"}
          show={showTokenModal}
          setShow={setTokenModal}
          
          >
          {/* Token popups start */}
          <>
            

              {/* Select token popop starts */}
                <div className="popmodal-body tokn-popup">
                  <div className="pop-block">
                    <div className="pop-top">
                    <div className="sec-search">
                      <div className="position-relative search-row">
                        <input type="text" className="w-100" placeholder="Search token or token address" />
                        <div className="search-icon"><img width="20" height="21" class="img-fluid" src="../../images/search.png" alt="" /></div>
                      </div>
                    </div>
                    <div className="token-sec">
                      <div className="info-grid">
                        <div>
                          <p>Token List</p>
                        </div>
                        <div className="token-btn-sec">
                          <button type="button" className="btn primary-btn w-100">Manage Tokens</button>
                        </div>
                      </div>
                    </div>
                    <div className="token-listwrap">
                        <div className="tokn-row">
                          <div className="cryoto-box">
                            <img class="img-fluid" src="../../images/shib-borderd-icon.png" alt="" />
                          </div>
                          <div className="tkn-grid">
                            <div>
                              <h6 className="fw-bold">SHIB</h6>
                              <p>Shibatoken</p>
                            </div>
                            <div>
                              <h6 className="fw-bold">1000</h6>
                            </div>
                          </div>
                        </div>
                        <div className="tokn-row">
                          <div className="cryoto-box">
                            <img class="img-fluid" src="../../images/red-bone.png" alt="" />
                          </div>
                          <div className="tkn-grid">
                            <div>
                              <h6 className="fw-bold">BONE</h6>
                              <p>Bone Token</p>
                            </div>
                            <div>
                              <h6 className="fw-bold">1000</h6>
                            </div>
                          </div>
                        </div>
                        <div className="tokn-row">
                          <div className="cryoto-box">
                            <img class="img-fluid" src="../../images/etharium.png" alt="" />
                          </div>
                          <div className="tkn-grid">
                            <div>
                              <h6 className="fw-bold">ETH</h6>
                              <p>Ethereum</p>
                            </div>
                            <div>
                              <h6 className="fw-bold">1000</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
                {/* Select token popop ends */}


                {/* Manage token popop starts */}
                {/* <div className="popmodal-body tokn-popup">
                  <div className="pop-block">
                    <div className="pop-top">
                    <div className="black-bg-sec">
                      <div className="token-btn-sec pop-btns-grid"> 
                        <div className="blk-width">
                          <button type="button" className="btn btn-active w-100">Token Lists</button>
                        </div>
                        <div className="blk-width">
                          <button type="button" className="btn w-100">Add token</button>
                        </div>
                      </div>
                    </div>
                    <div className="sec-search sec-search-secondry">
                      <div className="position-relative search-row">
                        <input type="text" className="w-100" placeholder="Add list by https://" />
                        <div className="search-icon"><img width="20" height="21" class="img-fluid" src="../../images/search.png" alt="" /></div>
                      </div>
                    </div>
                    </div>
                    <div className="pop-bottom">
                      <div className="">
                        <div className="token-listwrap">
                          <div className="tokn-row">
                            <div className="cryoto-box">
                              <img class="img-fluid" src="../../images/shib-borderd-icon.png" alt="" />
                            </div>
                            <div className="tkn-grid">
                              <div>
                                <h6 className="fw-bold">SHIB</h6>
                                <p>Shibatoken</p>
                              </div>
                              <div>
                                <h6 className="fw-bold">
                                  <label class="toggle">
                                    <input type="checkbox" />
                                    <span class="slider"></span>
                                    <span class="labels" data-on="ON" data-off="OFF"></span>
                                  </label>
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className="tokn-row">
                            <div className="cryoto-box">
                              <img class="img-fluid" src="../../images/red-bone.png" alt="" />
                            </div>
                            <div className="tkn-grid">
                              <div>
                                <h6 className="fw-bold">BONE</h6>
                                <p>Bone Token</p>
                              </div>
                              <div>
                                <h6 className="fw-bold">
                                  <label class="toggle">
                                    <input type="checkbox" />
                                    <span class="slider"></span>
                                    <span class="labels" data-on="ON" data-off="OFF"></span>
                                  </label>
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className="tokn-row">
                            <div className="cryoto-box">
                              <img class="img-fluid" src="../../images/etharium.png" alt="" />
                            </div>
                            <div className="tkn-grid">
                              <div>
                                <h6 className="fw-bold">ETH</h6>
                                <p>Ethereum</p>
                              </div>
                              <div>
                                <h6 className="fw-bold">
                                  <label class="toggle">
                                    <input type="checkbox" />
                                    <span class="slider"></span>
                                    <span class="labels" data-on="ON" data-off="OFF"></span>
                                  </label>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* Manage token popop ends */}

                 {/* Add token popop starts */}
                 {/* <div className="popmodal-body tokn-popup">
                  <div className="pop-block">
                    <div className="pop-top">
                    <div className="black-bg-sec">
                      <div className="token-btn-sec pop-btns-grid"> 
                        <div className="blk-width">
                          <button type="button" className="btn btn-active w-100">Token Lists</button>
                        </div>
                        <div className="blk-width">
                          <button type="button" className="btn w-100">Add token</button>
                        </div>
                      </div>
                    </div>
                    <div className="sec-search sec-search-secondry">
                      <div className="position-relative search-row">
                        <input type="text" className="w-100" placeholder="Enter Token Address" />
                        <div className="search-icon"><img width="20" height="21" class="img-fluid" src="../../images/search.png" alt="" /></div>
                      </div>
                    </div>
                    </div>
                    <div className="pop-mid">
                        <div className="center-content">
                          <p>Custom token not found Add your first custom token</p>
                        </div>
                    </div>
                  </div>
                </div> */}
                {/* Add token popop ends */}

                {/* search popop starts */}
                 {/* <div className="popmodal-body tokn-popup">
                  <div className="pop-block">
                    <div className="pop-top">
                    <div className="black-bg-sec">
                      <div className="token-btn-sec pop-btns-grid"> 
                        <div className="blk-width">
                          <button type="button" className="btn btn-active w-100">Token Lists</button>
                        </div>
                        <div className="blk-width">
                          <button type="button" className="btn w-100">Add token</button>
                        </div>
                      </div>
                    </div>
                    <div className="sec-search sec-search-secondry">
                      <div className="position-relative search-row">
                        <input type="text" className="w-100" placeholder="Enter Token Address" />
                        <div className="search-icon"><img width="20" height="21" class="img-fluid" src="../../images/search.png" alt="" /></div>
                      </div>
                    </div>
                    </div>
                    <div className="h-100">
                        <div className="two-col position-relative">
                          <div className="left-sec-img">
                            <div><img  class="img-fluid" src="../../images/alert.png" alt="" /></div>
                          </div>
                          <p className="text-block">Anyone can create a token, including creating FAKE version of existing tokens. Interact with any new token carefully.</p>
                        </div>
                        <div className="row-wrap">
                          <div className="crypto-info">
                            <div className="left-side data">
                              <p className="lite-color">Token Address on Ethereum</p>
                            </div>
                            <div className="right-side data">
                              <p>0x95ad6...4c4ce</p>
                            </div>
                          </div>
                          <div className="crypto-info">
                            <div className="left-side data">
                              <p className="lite-color">Token Address on Shibarium</p>
                            </div>
                            <div className="right-side data">
                              <p>0x6f8a0...1d4ec</p>
                            </div>
                          </div>
                          
                          <div className="crypto-info">
                            <div className="left-side data">
                              <p className="lite-color">Project name</p>
                            </div>
                            <div className="right-side data">
                              <p>SHIBA INU</p>
                            </div>
                          </div>
                          <div className="crypto-info">
                            <div className="left-side data">
                              <p className="lite-color">Ticker name</p>
                            </div>
                            <div className="right-side data">
                              <p>SHIB</p>
                            </div>
                          </div>
                          <div className="crypto-info">
                            <div className="left-side data">
                              <p className="lite-color">Token Decimal</p>
                            </div>
                            <div className="right-side data">
                              <p>18</p>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="pop-bottom">
                      <div className="" >
                        <a className='btn primary-btn w-100' href="javascript:void(0)">Add Token</a>
                       </div>
                    </div>  
                  </div>
                </div> */}
                {/* Search popop ends */}

                {/* new added token with delete action starts */}
                 {/* <div className="popmodal-body tokn-popup">
                  <div className="pop-block">
                    <div className="pop-top">
                    <div className="black-bg-sec">
                      <div className="token-btn-sec pop-btns-grid"> 
                        <div className="blk-width">
                          <button type="button" className="btn btn-active w-100">Token Lists</button>
                        </div>
                        <div className="blk-width">
                          <button type="button" className="btn w-100">Add token</button>
                        </div>
                      </div>
                    </div>
                    <div className="sec-search sec-search-secondry">
                      <div className="position-relative search-row">
                        <input type="text" className="w-100" placeholder="Add list by https://" />
                        <div className="search-icon"><img width="20" height="21" class="img-fluid" src="../../images/search.png" alt="" /></div>
                      </div>
                    </div>
                    </div>
                    <div className="pop-bottom">
                      <div className="">
                        <div className="grid-block">
                          <div className="blk-width">
                            <div>1 Token Found</div>
                            <p className="lite-color">Token stored in your browser</p>
                          </div>
                          <div className="blk-width btn-sm">
                            <button type="button" className="btn primary-btn w-100">Clear All</button>
                          </div>
                        </div>
                        <div className="token-listwrap">
                          <div className="tokn-row">
                            <div className="cryoto-box">
                              <img class="img-fluid" src="../../images/shib-borderd-icon.png" alt="" />
                            </div>
                            <div className="tkn-grid">
                              <div>
                                <h6 className="fw-bold">SHIB</h6>
                                <p>Shibatoken</p>
                              </div>
                              <div>
                                <span className="me-4"><img class="img-fluid" src="../../images/del.png" alt="" /></span>
                                <span><img class="img-fluid" src="../../images/up.png" alt="" /></span>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* new added token with delete action ends */}

          </>
          {/* Token popups end */}
          </CommonModal>
          {/* modal code closed */}
            <section className="assets-section">
              <div className="cmn_dashbord_main_outr">
                <InnerHeader />
                  {/* withdraw main section start */}
                  <div className="box-wrap">
                    {/* Left section start */}
                    <div className="left-box">
                      <div className="block-card">
                        <div className="box-top">
                          <h1 className="heading-main">Shibarium Bridge</h1>
                          <div className="txt-row">
                             <div className="row-hd">Transfer Overview:</div>
                             <p className="row-description">The deposit process consists of a single transaction.</p>   
                          </div>
                          <div className="txt-row">
                             <div className="row-hd">Transfer Time:</div>
                             <p className="row-description">Moving your funds from Ethereum to Polygon take up to 10 - 15 Minutes.</p>   
                          </div>
                          <div className="txt-row">
                             <div className="row-hd">
                                <span className="icon-image">
                                  <img className="img-fluid" src="../../images/i-info-icon.png" alt="" />
                                </span>
                                <span className="alignment">Delegation/Staking Advice:</span>
                              </div>
                             <p className="row-description">
                                Delegation/Staking takes place on Ethereum. Do not deposit funds to Shibarium for this purpose. 
                                To delegate or stake please visit the <a className="orange-txt" href="javascript:void(0);">Staking UI</a>
                              </p>   
                          </div>
                        </div>
                        <div className="blank-box"></div>
                        <div className="box-bottom">
                          <div className="amt-section position-relative">
                            <div className="coin-blk">
                              <div className="coin-sec"><img className="img-fluid" src="../../images/eth.png" alt="" /></div>
                              <p className="lite-color">Estimation of GAS fee required</p>
                            </div>
                            <div>
                              <p className="lite-color fw-bold">$10.00</p>
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
                      <div className="block-card">
                            <div className="tab-sec botom-spcing">
                              <ul className="tab-links">
                                <li><a className="tb-link tab-active" href="javascript:void(0);">Deposit</a></li>
                                <li><a className="tb-link" href="javascript:void(0);">Withdraw</a></li>
                              </ul>
                            </div>
                            <div className="tab-content-sec">
                              <form className="height">
                                  <div className="sec-wrapper">
                                    <div className="wrap-top">
                                      <div className="botom-spcing">
                                        <div>
                                          <label>From</label>
                                          <div className="form-field position-relative">
                                            <div className="icon-chain">
                                              <div><img className="img-fluid" src="../../images/eth.png" alt="" /></div>
                                            </div>
                                            <div className="mid-chain">
                                              <input className="w-100" type="text" placeholder="Ethereum chain"/>
                                            </div>
                                            <div className="rt-chain">
                                              <span className="fld-head lite-color">Balance:</span>
                                              <span className="fld-txt lite-color">100.00ETH</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="field-grid row">
                                          <div className="col-md-4">
                                            <div className="form-field position-relative" onClick={() => setTokenModal(true)}>
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
                                              <div className="form-field position-relative two-fld">
                                                  <div className="mid-chain w-100">
                                                    <input className="w-100" type="text" placeholder="0.00"/>
                                                  </div>
                                                  <div className="rt-chain">
                                                    <span className="orange-txt fw-bold">MAX</span>
                                                  </div>
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="botom-spcing">
                                        <div>
                                          <label>To</label>
                                          <div className="form-field position-relative">
                                            <div className="icon-chain">
                                              <div><img className="img-fluid" src="../../images/eth.png" alt="" /></div>
                                            </div>
                                            <div className="mid-chain">
                                              <input className="w-100" type="text" placeholder="Ethereum chain"/>
                                            </div>
                                            <div className="rt-chain">
                                              <span className="fld-head lite-color">Balance:</span>
                                              <span className="fld-txt lite-color">100.00ETH</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="wrap-bottom">
                                      <div className="btn-modify">
                                        <button onClick={() => setDepositModal(true)} type="button" className="btn primary-btn w-100">Transfer</button>
                                      </div>
                                    </div>
                                  </div>
                              </form>
                            </div>
                      </div> 
                    </div>
                     {/* right section start */}
                  </div>
                  {/* withdraw main section end */}
              </div>
            </section>
         </main>
    </>
  )
}

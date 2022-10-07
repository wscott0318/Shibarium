/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
import Selection from './selection';
import Swap from './swap';
import Amount from './amount';
import Footer from '../footer/index';
import Web3Status from "app/components/Web3Status";
import CommonModal from "../components/CommonModel";
import InnerHeader from "../../pages/inner-header";

export default function differentchainbridge() {

    const [menuState, setMenuState] = useState(false);

    const handleMenuState = () => {
        setMenuState(false)
    }

    const [showSlippageModal, setSlippageModal] = useState(false);

    const [showSwapModal, setSwapModal] = useState(false);
    const [showTokenModal, setTokenModal] = useState(false);
    const [showToken2Modal, setToken2Modal] = useState(false);
    const [tokenState, setTokenState] = useState({
      step0: true,
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      title: "Select a Token",
    });
    const [token2State, setToken2State] = useState({
      step0: true,
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      title: "Select a Token",
    });
    const [approveReview,setApproveReview] = useState(true);
    return (
        <>
            <main className="main-content">
                <Sidebar handleMenuState={handleMenuState} menuState={menuState} />
                <div className="cmn_dashbord_main_outr">
                    <InnerHeader />
                    <div className="container px-0">
                        <div className='swap-card cus-card-800'>
                            <div className="swp-header">
                                <div className='swp-left-col mb-3 mb-lg-3 mb-xl-4'>
                                    <h3 className=''>
                                        Swap Tokens
                                    </h3>
                                </div>
                                <div className='swp-right-col mb-3 mb-lg-3 mb-xl-4'>
                                    <ul className='swp-icon'>
                                        <li>
                                            <a href="javascript:void(0)" onClick={() => setSlippageModal(true)}>
                                                <img className='img-fluid' src="../../images/setting.png" alt="icon-img" width={25} height="25" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">
                                                <img className='img-fluid' src="../../images/faq.png" alt="icon-img" width={25} height="25" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="swp-body">
                                <form action="" className='flex-form'>
                                    <div className="field-grid row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <div className="form-field position-relative dark-input" onClick={() => {
                                                  setTokenModal(true);
                                                  setTokenState({
                                                    step0: true,
                                                    step1: false,
                                                    step2: false,
                                                    step3: false,
                                                    step4: false,
                                                    title: "Select a Token",
                                                  });
                                                  }}>
                                                    <div className="coin-icon">
                                                        <div className='coin-img'>
                                                            <img className="img-fluid" src="../../images/eth.png" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="coin-name">
                                                        <span className="fw-bold">ETH</span>
                                                    </div>
                                                    <div className="drop-row">
                                                        <div className="arow-outer"><span className="arrow-down"></span></div>
                                                    </div>
                                                </div>
                                                <label className='lite-color mt-1' htmlFor="">Balance: 10 ETH</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="form-group">
                                                <div className="form-field position-relative two-fld dark-input">
                                                    <div className="mid-chain w-100">
                                                        <input className="w-100" type="text" placeholder="0.00" />
                                                    </div>
                                                    <div className="rt-chain">
                                                        <span className="orange-txt fw-bold">MAX</span>
                                                    </div>
                                                </div>
                                                <label htmlFor="" className='lite-color mt-1 text-end d-block'>Balance: 10 ETH</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field-grid row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <div className="form-field position-relative dark-input"  onClick={() => {
                                                  setToken2Modal(true);
                                                  setToken2State({
                                                    step0: true,
                                                    step1: false,
                                                    step2: false,
                                                    step3: false,
                                                    step4: false,
                                                    title: "Select a Token",
                                                  });
                                                  }}>
                                                    <div className="coin-icon">
                                                        <div className='coin-img'>
                                                            <img className="img-fluid" src="../../images/shiba-round-icon.png" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="coin-name">
                                                        <span className="fw-bold">SHIB</span>
                                                    </div>
                                                    <div className="drop-row">
                                                        <div className="arow-outer"><span className="arrow-down"></span></div>
                                                    </div>
                                                </div>
                                                <label htmlFor="" className='lite-color mt-1 d-block'>Balance: 0 BONE</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="form-group">
                                                <div className="form-field position-relative two-fld dark-input">
                                                    <div className="mid-chain w-100">
                                                        <input className="w-100" type="text" placeholder="0.00" />
                                                    </div>
                                                    <div className="rt-chain">
                                                        <span className="orange-txt fw-bold">MAX</span>
                                                    </div>
                                                </div>
                                                <label htmlFor="" className='lite-color mt-1 text-end d-block'>Balance: 10 ETH</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-btn">
                                        <div className="coin-text">
                                            1 ETH = 1 BONE
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <button type='button' className={`btn ${approveReview ? 'orangeButton' : 'blackButton'} w-100`} onClick={()=>setApproveReview(false)}>
                                                    Approve
                                                </button>
                                            </div>
                                            <div className="col-sm-6">
                                                <button type='button' className={`btn ${!approveReview ? 'orangeButton' : 'blackButton'} w-100`} onClick={() => {
                                                  if(!approveReview){setSwapModal(true)
                                                  setApproveReview(true)}
                                                  }}>
                                                    Review Swap
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* modal code start */}

            <CommonModal
                title={"Set Slippage"}
                show={showSlippageModal}
                setShow={setSlippageModal}
            >
                <div className='modal-body fix-vh d-flex flex-column justify-content-between mt-0'>
                    <div className="top-area">
                        <ul className='badges-list'>
                            <li className='badges-lst-item'>
                                <a href="javascript:void(0)" className="btn bage-bg d-block text-center">1 %</a>
                            </li>
                            <li className='badges-lst-item'>
                                <a href="javascript:void(0)" className="btn bage-bg d-block text-center active">2 %</a>
                            </li>
                            <li className='badges-lst-item'>
                                <a href="javascript:void(0)" className="btn bage-bg d-block text-center">5 %</a>
                            </li>
                            <li className='badges-lst-item'>
                                <a href="javascript:void(0)" className="btn bage-bg d-block text-center">Insert custom slippage</a>
                            </li>
                        </ul>
                    </div>
                    <div className='bottom-area'>
                        <button type='button' className='btn primary-btn w-100' onClick={()=>setSlippageModal(false)}>Set Slippage</button>
                    </div>
                </div>
            </CommonModal>

            {/* modal code closed */}

            {/* modal code start */}

            {/* Review model code start */}
            <CommonModal
                title={"Review Swap"}
                show={showSwapModal}
                setShow={setSwapModal}
            >
                {/* <div className="popmodal-body no-ht">
                    <div className="pop-block">
                        <div className="pop-top">
                            <div className="cnfrm_box dark-bg-800">
                                <div className="top_overview col-12">
                                    <div className='img-flexible'><img class="img-fluid d-inline-block" src="../../images/shib-borderd-icon.png" alt="" /></div>
                                    <h6>1000 SHIB</h6>
                                    <p>2000.00$</p>
                                </div>
                            </div>
                            <div className="pop-grid flex-grid">
                                <div className="text-center box-block">
                                    <button type='button' className='btn primary-btn w-100'>ETH</button>
                                </div>
                                <div className="text-center box-block">
                                    <div className="d-inline-block">
                                        <img class="img-fluid" src="../../images/white-arrow.png" alt="" />
                                    </div>
                                </div>
                                <div className="text-center box-block">
                                    <button type='button' className='btn primary-btn w-100'>BONE</button>
                                </div>
                            </div>
                            <p className='mb-0 text-center'>1 ETH = 10 SHIB</p>

                        </div>
                        <div className="pop-bottom">
                            <div className="amt-section position-relative ps-0">
                                <div className="coin-blk">
                                    <p className="lite-color">Slippage tollerance</p>
                                </div>
                                <div>
                                    <p className="fw-bold">2%</p>
                                </div>
                            </div>
                            <div className="amt-section position-relative ps-0">
                                <div className="coin-blk">
                                    <p className="lite-color">Powered By</p>
                                </div>
                                <div>
                                    <p className="fw-bold">X-Funds</p>
                                </div>
                            </div>
                            <div className='btn-wrap'>
                            <div>
                              <a className='btn primary-btn w-100' href="javascript:void(0)">Confirm Swap</a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Transaction Pending popup start*/}
                {/* <div className="popmodal-body tokn-popup no-ht trans-mod">
                  <div className="pop-block">
                    <div className="pop-top">
                        <div className='dark-bg-800 h-100 status-sec'>
                            <div>
                                <span className='spiner-lg' >
                                    <span className="spinner-border text-secondary pop-spiner"></span>
                                </span>
                            </div>
                            <p className='mt-5'>Sign the transaction in your wallet to complete the swap</p>
                        </div>
                    </div>
                    <div className="pop-bottom">
                      <div className='btns-sec mt-0'>
                        <button type='button' className='btn primary-btn w-100'>Sign the message</button>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* Transaction Pending popup start*/}

                {/* Transaction Pending popup version 2 start*/}
                <div className="popmodal-body tokn-popup no-ht trans-mod">
                  <div className="pop-block">
                    <div className="pop-top">
                        <div className='dark-bg-800 h-100 status-sec'>
                            <span>
                                <div><img width="272" height="272" className="img-fluid" src="../../images/Ellipse.png" alt="" /></div>
                            </span>
                            <p className='mt-5'>Swap of ETH to SHIB</p>
                        </div>
                    </div>
                    <div className="pop-bottom">
                      <div className='staus-btn'>
                        <button type='button' className='btn primary-btn w-100'>View on Shibascan</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Transaction Pending popup version 2 end*/}



            </CommonModal>
            {/* Review model code end */}

            {/* Token popup code start */}
            <CommonModal
                title={tokenState.title}
                show={showTokenModal}
                setShow={setTokenModal}
            >
               {/* Token popups start */}     

                {/* Select token popop starts */}
                {showTokenModal && tokenState.step0 && <div className="popmodal-body tokn-popup no-ht">
                  <div className="pop-block">
                    <div className="pop-top">
                    <div className="sec-search ng-16">
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
                          <button type="button" className="btn primary-btn w-100" onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: true,
                                step2: false,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}>Manage Tokens</button>
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
                </div> }
                {/* Select token popop ends */}


                {/* Manage token popop starts */}

                {showTokenModal && tokenState.step1 && <div className="popmodal-body tokn-popup no-ht">
                  <div className="pop-block">
                    <div className="pop-top">
                    <div className="black-bg-sec">
                      <div className="token-btn-sec pop-btns-grid"> 
                        <div className="blk-width">
                          <button type="button" className="btn btn-active w-100">Token Lists</button>
                        </div>
                        <div className="blk-width">
                          <button type="button" className="btn w-100" onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}>Add token</button>
                        </div>
                      </div>
                    </div>
                    <div className="sec-search sec-search-secondry">
                      <div className="position-relative search-row">
                        <input type="text" className="w-100" placeholder="Add list by https://" />
                        <div className="search-icon"><img width="20" height="21" class="img-fluid" src="../../images/search.png" alt="" /></div>
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
                </div> }

                {/* Manage token popop ends */}

                 {/* Add token popop starts */}

                 {showTokenModal && tokenState.step2 && <div className="popmodal-body tokn-popup no-ht">
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
                      <div className="position-relative search-row" onClick={() => {
                          setTokenState({
                            step0: false,
                            step1: false,
                            step2: false,
                            step3: true,
                            step4: false,
                            title: "Manage Token",
                          });
                        }}>
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
                </div>}
                {/* Add token popop ends */}

                {/* search popop starts */}

                 {showTokenModal && tokenState.step3 && <div className="popmodal-body tokn-popup no-ht">
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
                        <a className='btn primary-btn w-100' href="javascript:void(0)" onClick={() => {
                          setTokenState({
                            step0: false,
                            step1: false,
                            step2: false,
                            step3: false,
                            step4: true,
                            title: "Manage Token",
                          });
                        }}>Add Token</a>
                       </div>
                    </div>  
                  </div>
                </div> }
                {/* Search popop ends */}

                {/* new added token with delete action starts */}
                {showTokenModal && tokenState.step4 && <div className="popmodal-body tokn-popup no-ht">
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
                    <div className="pop-bottom pt-0">
                      <div className="">
                        <div className="grid-block">
                          <div className="blk-width">
                            <div>1 Token Found</div>
                            <p className="lite-color">Token stored in your browser</p>
                          </div>
                          <div className="blk-width btn-sm">
                            <button type="button" className="btn primary-btn w-100" onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}>Clear All</button>
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
                                <span className="me-4"  onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}><img class="img-fluid" src="../../images/del.png" alt="" /></span>
                                <span><img class="img-fluid" src="../../images/up.png" alt="" /></span>
                              </div>
                            </div>
                          </div>
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
                                <span className="me-4"  onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}><img class="img-fluid" src="../../images/del.png" alt="" /></span>
                                <span><img class="img-fluid" src="../../images/up.png" alt="" /></span>
                              </div>
                            </div>
                          </div>
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
                                <span className="me-4"  onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}><img class="img-fluid" src="../../images/del.png" alt="" /></span>
                                <span><img class="img-fluid" src="../../images/up.png" alt="" /></span>
                              </div>
                            </div>
                          </div>
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
                                <span className="me-4"  onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}><img class="img-fluid" src="../../images/del.png" alt="" /></span>
                                <span><img class="img-fluid" src="../../images/up.png" alt="" /></span>
                              </div>
                            </div>
                          </div>
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
                                <span className="me-4"  onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}><img class="img-fluid" src="../../images/del.png" alt="" /></span>
                                <span><img class="img-fluid" src="../../images/up.png" alt="" /></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
                {/* new added token with delete action ends */}
                

                {/* Token popups end */}
            </CommonModal>
            {/* Token popup code end */}

            {/* Token popup code start */}
            <CommonModal
                title={token2State.title}
                show={showToken2Modal}
                setShow={setToken2Modal}
            >
               {/* Token popups start */}     

                {/* Select token popop starts */}
                {showToken2Modal && token2State.step0 &&  <div className="popmodal-body tokn-popup no-ht">
                  <div className="pop-block">
                    <div className="pop-top">
                    <div className="sec-search ng-16">
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
                          <button type="button" className="btn primary-btn w-100" onClick={() => {
                              setToken2State({
                                step0: false,
                                step1: true,
                                step2: false,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}>Manage Tokens</button>
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
                </div>}
                {/* Select token popop ends */}


                {/* Manage token popop starts */}

                {showToken2Modal && token2State.step1 && <div className="popmodal-body tokn-popup no-ht">
                  <div className="pop-block">
                    <div className="pop-top">
                    <div className="black-bg-sec">
                      <div className="token-btn-sec pop-btns-grid"> 
                        <div className="blk-width">
                          <button type="button" className="btn btn-active w-100">Token Lists</button>
                        </div>
                        <div className="blk-width">
                          <button type="button" className="btn w-100" onClick={() => {
                              setToken2State({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}>Add token</button>
                        </div>
                      </div>
                    </div>
                    <div className="sec-search sec-search-secondry">
                      <div className="position-relative search-row">
                        <input type="text" className="w-100" placeholder="Add list by https://" />
                        <div className="search-icon"><img width="20" height="21" class="img-fluid" src="../../images/search.png" alt="" /></div>
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
                </div>}

                {/* Manage token popop ends */}

                 {/* Add token popop starts */}

                 {showToken2Modal && token2State.step2 && <div className="popmodal-body tokn-popup no-ht">
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
                      <div className="position-relative search-row"  onClick={() => {
                          setToken2State({
                            step0: false,
                            step1: false,
                            step2: false,
                            step3: true,
                            step4: false,
                            title: "Manage Token",
                          });
                        }}>
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
                </div>}
                {/* Add token popop ends */}

                {/* search popop starts */}

                 {showToken2Modal && token2State.step3 && <div className="popmodal-body tokn-popup no-ht">
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
                        <a className='btn primary-btn w-100' href="javascript:void(0)" onClick={() => {
                              setToken2State({
                                step0: false,
                                step1: false,
                                step2: false,
                                step3: false,
                                step4: true,
                                title: "Manage Token",
                              });
                            }}>Add Token</a>
                       </div>
                    </div>  
                  </div>
                </div>}
                {/* Search popop ends */}

                {/* new added token with delete action starts */}
                {showToken2Modal && token2State.step4 && <div className="popmodal-body tokn-popup no-ht">
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
                    <div className="pop-bottom pt-0">
                      <div className="">
                        <div className="grid-block">
                          <div className="blk-width">
                            <div>1 Token Found</div>
                            <p className="lite-color">Token stored in your browser</p>
                          </div>
                          <div className="blk-width btn-sm">
                            <button type="button" className="btn primary-btn w-100" onClick={() => {
                              setToken2State({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}>Clear All</button>
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
                                <span className="me-4" onClick={() => {
                              setToken2State({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}><img class="img-fluid" src="../../images/del.png" alt="" /></span>
                                <span><img class="img-fluid" src="../../images/up.png" alt="" /></span>
                              </div>
                            </div>
                          </div>
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
                                <span className="me-4" onClick={() => {
                              setToken2State({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}><img class="img-fluid" src="../../images/del.png" alt="" /></span>
                                <span><img class="img-fluid" src="../../images/up.png" alt="" /></span>
                              </div>
                            </div>
                          </div>
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
                                <span className="me-4" onClick={() => {
                              setToken2State({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}><img class="img-fluid" src="../../images/del.png" alt="" /></span>
                                <span><img class="img-fluid" src="../../images/up.png" alt="" /></span>
                              </div>
                            </div>
                          </div>
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
                                <span className="me-4" onClick={() => {
                              setToken2State({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}><img class="img-fluid" src="../../images/del.png" alt="" /></span>
                                <span><img class="img-fluid" src="../../images/up.png" alt="" /></span>
                              </div>
                            </div>
                          </div>
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
                                <span className="me-4" onClick={() => {
                              setToken2State({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}><img class="img-fluid" src="../../images/del.png" alt="" /></span>
                                <span><img class="img-fluid" src="../../images/up.png" alt="" /></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
                {/* new added token with delete action ends */}
                


                {/* Token popups end */}
            </CommonModal>
            {/* Token popup code end */}
            {/* modal code closed */}
        </>
    )
}

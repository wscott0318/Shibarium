import React, { useRef, useState, useEffect } from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
import GasToken from './bone';
import Swaptoken from './swap';
import Footer from '../../pages/footer/index';
import CommonModal from "../components/CommonModel";
import InnerHeader from "../../pages/inner-header";
export default function Gastoken() {

    const [menuState, setMenuState] = useState(false);

    const handleMenuState = () => {
        setMenuState(false)
    }

    const [showSlippageModal, setSlippageModal] = useState(false);

    const [showSwapModal, setSwapModal] = useState(false);

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
                                        Get Gas Token
                                    </h3>
                                    <p className='grey-txt'>BONE is used to pay the transaction fee</p>
                                </div>
                                <div className='swp-right-col mb-3 mb-lg-3 mb-xl-4'>
                                    <ul className='swp-icon'>
                                        <li>
                                            <a href="javascript:void(0)">
                                                <img className='img-fluid' src="../../images/faq.png" alt="icon-img" width={25} height="25" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="swp-body">
                                <form action="" className='flex-form gas_token_form'>
                                    <div className='flex-form-top'>
                                        <div className="field-grid row">
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <div className="form-field position-relative two-fld dark-input">
                                                        <div className="mid-chain w-100">
                                                            <input className="w-100" type="text" placeholder="1" />
                                                        </div> 
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <div className="form-field position-relative two-fld dark-input">
                                                        <div className="mid-chain w-100">
                                                            <input className="w-100" type="text" placeholder="5" />
                                                        </div> 
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <div className="form-field position-relative two-fld dark-input">
                                                        <div className="mid-chain w-100">
                                                            <input className="w-100" type="text" placeholder="10" />
                                                        </div> 
                                                    </div> 
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="field-grid row">                                        
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <div className="form-field dark-input">
                                                        <div className="mid-chain w-100">
                                                            <input className="w-100" type="text" placeholder="Insert a custom value" />
                                                        </div> 
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div className='down_arrow'> 
                                        <div className="scrolldown-container">
                                                <div className="scrolldown-btn">
                                                <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="80px" viewBox="0 0 50 80" enableBackground="new 0 0 50 80" xmlSpace="preserve">
                                                    <path className="first-path" fill="#FFFFFF" d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z" />
                                                    <path className="second-path" fill="#FFFFFF" d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z" />
                                                </svg>
                                                </div>
                                            </div> 
                                        </div>
                                        
                                    <div className="form-btn flex-form-btm">
                                        
                                    <div className="field-grid position-relative  row">
                                        <div className="col-md-4 col-sm-4 col-xs-12 ps_abs mb-3 mb-sm-0">
                                            <div className="form-group">
                                                <div className="form-field position-relative dark-input">
                                                    <div className="coin-icon">
                                                        <div className='coin-img'>
                                                            <img className="img-fluid" src="../../images/etharium.png" alt="eth" width={30} />
                                                        </div>
                                                    </div>
                                                    <div className="coin-name">
                                                        <span className="fw-bold">ETH</span>
                                                    </div>
                                                    <div className="drop-row">
                                                        <div className="arow-outer"><span className="arrow-down"></span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <div className="form-field two-fld dark-input">
                                                    <div className="mid-chain w-100 abs_prnt">
                                                        <input className="w-100" type="text" placeholder="0.00" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        <div className="mb-1">
                                            <label for="" className="lite-color mt-1 text-end d-block">Balance: 10 ETH</label>
                                        </div>
                                        <div className="mb-1">
                                             <label for="" className="lite-color mt-1 text-end d-block">Balance: 10 ETH</label>
                                        </div>
                                    </div>


                                        <div className="coin-text">
                                            1 ETH = 1 BONE
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <button type='button' className='btn primary-btn w-100'>
                                                    Approve
                                                </button>
                                            </div>
                                            <div className="col-sm-6">
                                                <button type='button' className='btn black-btn w-100' onClick={() => setSwapModal(true)}>
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

            {/* modal code closed */}
        </>
    )
}

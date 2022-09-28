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

export default function differentchainbridge() {

    const [menuState, setMenuState] = useState(false);

    const handleMenuState = () => {
        setMenuState(false)
    }

    const [showSendModal, setSendModal] = useState(false);

    return (
        <>
            <main className="main-content">
                <Sidebar handleMenuState={handleMenuState} menuState={menuState} />
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
                                            <div className="dot-icon" id="basic-nav-dropdown">
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

                                        {/* <Nav.Item>
                              <Link href={'javascript:void(0)'}>
                                <a className='btn primary-btn d-flex align-items-center' href="javascript:void(0)">
                                  <img className="img-fluid me-2" src="../../images/meta-icon.png" alt="meta-img"/>
                                  <span>0x21A...48A5</span>
                                </a>
                              </Link>
                            </Nav.Item> */}
                                        <Nav.Item className="btn-status">
                                            <Web3Status />
                                        </Nav.Item>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                    <div className="container">
                        <div className='swap-card cus-card-800'>
                            <div className="swp-header">
                                <div className='swp-left-col mb-3 mb-lg-4 mb-xl-5'>
                                    <h3 className=''>
                                        Swap Tokens
                                    </h3>
                                </div>
                                <div className='swp-right-col mb-3 mb-lg-4 mb-xl-5'>
                                    <ul className='swp-icon'>
                                        <li>
                                            <a href="javascript:void(0)" onClick={() => setSendModal(true)}>
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
                                <form action="" className='flex-column'>
                                    <div className="field-grid row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <div className="form-field position-relative dark-input">
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
                                        <div className="col-md-8">
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
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <div className="form-field position-relative dark-input">
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
                                        <div className="col-md-8">
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
                                            <div className="col-6">
                                                <button type='button' className='btn primary-btn w-100'>
                                                    Approve
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button type='button' className='btn black-btn w-100'>
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
                  <span><img src="../../images/shib-borderd-icon.png" /></span>
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

            {/* modal code closed */}
        </>
    )
}

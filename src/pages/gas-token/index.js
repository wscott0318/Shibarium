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
                    <div className="container">
                        <div className='swap-card cus-card-800'>
                            <div className="swp-header">
                                <div className='swp-left-col mb-3 mb-lg-4 mb-xl-5'>
                                    <h3 className=''>
                                        Get Gas Token
                                    </h3>
                                    <p className='grey-txt'>BONE is used to pay the transaction fee</p>
                                </div>
                                <div className='swp-right-col mb-3 mb-lg-4 mb-xl-5'>
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
                                <form action="" className='flex-form'>
                                    <div className="field-grid row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <div className="form-field position-relative two-fld dark-input">
                                                    <div className="mid-chain w-100">
                                                        <input className="w-100" type="text" placeholder="1" />
                                                    </div> 
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <div className="form-field position-relative two-fld dark-input">
                                                    <div className="mid-chain w-100">
                                                        <input className="w-100" type="text" placeholder="5" />
                                                    </div> 
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="col-md-4">
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
                title={"Set Slippage"}
                show={showSlippageModal}
                setShow={setSlippageModal}
            >
                <div className='modal-body fix-vh d-flex flex-column justify-content-between mt-3'>
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
                        <button type='button' className='btn primary-btn w-100'>Set Slippage</button>
                    </div>
                </div>
            </CommonModal>

            {/* modal code closed */}

            {/* modal code start */}

            <CommonModal
                title={"Review Swap"}
                show={showSwapModal}
                setShow={setSwapModal}
            >
                <div className="popmodal-body">
                    <div className="pop-block">
                        <div className="pop-top">
                            <div className="cnfrm_box dark-bg-800">
                                <div className="top_overview col-12">
                                    <span><img class="img-fluid" src="../../images/shib-borderd-icon.png" alt="" /></span>
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
                                <a className='btn grey-btn w-100' href="javascript:void(0)"><span className="spinner-border text-secondary pop-spiner"></span><span>Confirm Swap</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </CommonModal>

            {/* modal code closed */}
        </>
    )
}

import React, { useRef, useState, useEffect } from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
export default function Gastoken() {



    return (
        <>
            {/* <Header /> */}
        <div className="page-wrapper">
            <Sidebar />
            <div className='main-content'>
                <div className="wrapper" >
                    <section className='chain-sec'>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-8 mx-auto gas_token">
                                    <div className="heading-sec">
                                        <h3 className="fw-700 mb-2">Swap for Gas Token</h3>
                                        <div className="fs-23">BONE is used to pay the transaction fee.</div>
                                    </div>
                                    <div className="cus-tabs nav-wrap tab-50 darkBg p-4 rad-10">
                                       
                                        {/* Deposit tab start */}
                                        <div className="tab-content-wrap">
                                            <div className="swap-area">

                                            <div className="form-group">
                                            <label htmlFor="" className="form-label fwb">How many $MATIC do you want to get?</label>
                                                <div className="swap-flex p-0 row">
                                                    <div className='cstm_values col-sm-6'>
                                                        <span className='outr_span'><span className="trs-3">1 BONE</span></span>
                                                        <span className='outr_span'><span className="trs-3">5 BONE</span></span>
                                                        <span className='outr_span'><span className="trs-3">10 BONE</span></span>
                                                    </div>
                                                    <div className=" swap-control col-sm-6">
                                                        <input type="text" className='swap-input' placeholder='Custom' />
                                                        <span className='primary-text over-text fw-600'>BONE</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="" className="form-label fwb">Swap From</label>
                                                <div className="swap-control swap-flex p-0">
                                                    <div className='swap-modal'> 
                                                        <span className='fw-600 trs-2'>
                                                        Select Token
                                                        </span>
                                                    </div>
                                                    <div className="swap-col">
                                                        <input type="text" className='swap-input' placeholder='0.00' />                                                    </div>
                                                    </div>
                                                </div> 
                                                 
                                            </div>
                                        </div>
                                        {/* Deposit tab end */}

                                        {/* Withdraw tab start */}
                                        <div className="btn-wrap pt-3 row">
                                            <div className='d-flex align-items-center justify-content-center mt-4 flex-column flex-sm-row'>
                                                <div className='me-0 me-sm-4 mb-3 mb-sm-0 col-sm-6 cstm_btn'><button type="button" className='btn bordered-btn light-text w-100'><span>Approve</span></button></div>
                                                <div className='col-sm-6 cstm_btn'><a href="./delegator"  className='btn warning-btn border-btn light-text w-100' title=''><span>Swap</span></a></div>
                                            </div>
                                        </div>
                                        {/* Withdraw tab end */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <footer className='main-footer'>
                    <div className="container">
                        <div className="copyright mt-4 mt-lg-5">
                            <h3 className='mb-0 text-center fwb'>Powered by xFund.</h3>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        </>
    )
}

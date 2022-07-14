/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
import Selection from './selection';
import Swap from './swap';
import Amount from './amount';

export default function differentchainbridge() {



    return (
        <>
            {/* <Header /> */}
            <div className="page-wrapper">
                <Sidebar />
                <div className='main-content'>
                    <div className="wrapper pt-0" >
                        <section className='chain-sec'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 col-xl-6 mx-auto px-0">
                                        <div className="cus-tabs nav-wrap tab-50 darkBg p-4 rad-10">
                                            <div className='text-center'>
                                                <h3 className='fw-700'>Send</h3>
                                                <div className='coin-sec position-relative'>
                                                    <div className='orange-dropdown'>
                                                        <Dropdown className='cus-dropdown dark-dd position-relative d-inline-block'>
                                                            <i className="arrow down"></i>
                                                            <Dropdown.Toggle id="dropdown-basic" className=' text-start'>
                                                                <span>WORMHOLE</span>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className='w-100'>
                                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                    <div className=''>
                                                        <Selection />
                                                        <div className='coinbtn-sec'>
                                                            <div className='mb-sm-0 mb-3'>
                                                                <div className='black-dropdown'>
                                                                    <Dropdown className='cus-dropdown dark-dd position-relative d-inline-block'>
                                                                        <i className="arrow down"></i>
                                                                        <Dropdown.Toggle id="dropdown-basic" className=' text-start'>
                                                                            <span className='d-flex align-items-center'><img className='img-fluid me-2' src="../../assets/images/sth.svg" width="18" height="18" alt="" />BSC</span>
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu className='w-100'>
                                                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className='black-dropdown'>

                                                                    <Dropdown className='cus-dropdown dark-dd position-relative d-inline-block'>
                                                                        <i className="arrow down"></i>
                                                                        <Dropdown.Toggle id="dropdown-basic" className=' text-start'>
                                                                            <span className='d-flex align-items-center'><img className='img-fluid me-2' src="../../assets/images/bear.png" width="18" height="18" alt="" />Shibarium</span>
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu className='w-100'>
                                                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='cus-alert d-inline-block w-100'>
                                                <div className='d-flex'>
                                                    <div className='pe-2'><img width="23" height="23" className='img-fluid' src="../../assets/images/alert-icon.png" alt="" /></div>
                                                    <div><span className='fw-800 align'>Important Note:</span></div>
                                                </div>
                                                <div className='w-100 mt-3'>Do not use Wormhole transfer to send funds to exchanges (coinbase, Gemini, etc.) <span className='fw-800'>use shuttle</span> instead</div>
                                            </div>
                                            {/* Deposit tab start */}

                                            <div className="tab-content-wrap">
                                                <div className="swap-area">
                                                    <Swap />
                                                    <div className="row">
                                                        <Amount />
                                                        <div className='form-group mb-4 col-sm-6'>
                                                            <label htmlFor="" className="form-label fwb">Destinaion Address</label>
                                                            <div className="swap-control swap-flex p-0">
                                                                <div className="swap-col full-col">
                                                                    <input type="text" className='swap-input' />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='cus-alert d-inline-block w-100 mt-3 mb-4'>
                                                        <div className='d-flex'>
                                                            <div className='pe-2'><img width="23" height="23" className='img-fluid' src="../../assets/images/alert-icon.png" alt="" /></div>
                                                            <div><span className='fw-800 align'>Important Note:</span></div>
                                                        </div>
                                                        <div className='w-100 mt-3'>Do not use exchange addresses for cross chain transfers. Make sure that the token type is correct before making transfer to the exchange.</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Deposit tab end */}

                                            {/* Withdraw tab start */}
                                            <div className="btn-wrap pt-3">
                                                <button type='button' className='btn gradient_btn w-100'>
                                                    <span>CONNECT WALLET</span>
                                                </button>
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

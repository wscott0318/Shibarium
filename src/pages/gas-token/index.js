import React, { useRef, useState, useEffect } from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
import GasToken from './bone';
import Swaptoken from './swap';
import Footer from '../../pages/footer/index'
export default function Gastoken() {

    return (
        <>
            {/* <Header /> */}
            <div className="page-wrapper">
                <Sidebar />
                <div className='main-content'>
                    <div className="" >
                        <section className='chain-sec'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-10 col-xl-9 mx-auto gas_token">
                                        <div className="heading-sec">
                                            <h3 className="fw-700 mb-2">Swap for Gas Token</h3>
                                            <div className="fs-23">BONE is used to pay the transaction fee.</div>
                                        </div>
                                        <div className="cus-tabs nav-wrap tab-50 darkBg p-3 p-md-4 rad-10">
                                            {/* Deposit tab start */}
                                            <div className="tab-content-wrap">
                                                <div className="swap-area">
                                                    <GasToken />
                                                    <Swaptoken />
                                                </div>
                                            </div>
                                            {/* Deposit tab end */}

                                            {/* Withdraw tab start */}
                                            <div className="btn-wrap pt-3 row">
                                                <div className='d-flex align-items-center justify-content-center mt-4 flex-column flex-sm-row'>
                                                    <div className='me-0 me-sm-4 mb-3 mb-sm-0 col-sm-6 cstm_btn'><button type="button" className='btn bordered-btn light-text w-100'><span>Approve</span></button></div>
                                                    <div className='col-sm-6 cstm_btn'><a href="./delegator" className='btn warning-btn border-btn light-text w-100' title=''><span>Swap</span></a></div>
                                                </div>
                                            </div>
                                            {/* Withdraw tab end */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

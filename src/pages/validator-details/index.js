/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import InnerHeader from '../inner-header';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Link from 'next/link';

export default function validatorDetails() {
    return (
        <>
            <div className='page-content'>
                <InnerHeader />
                <section className='banner-section darkBg py-4 py-lg-5'>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 col-lg-5 col-xl-4 mb-4 mb-sm-0">
                                <div className="shib-card card text-center h-100">
                                    <div className='image-wrap'>
                                        <img className='img-fluid' src="../../assets/images/fundbaron.png" alt="fundborn-img" width={120} />
                                    </div>
                                    <h4 className='py-2 mt-2'><span className='trs-3'>FUNDBaron</span></h4>
                                    <Link href="https://linktr.ee/DeFiMatic">
                                        <a className='primary-text'>
                                        https://linktr.ee/DeFiMatic
                                        </a>
                                    </Link>
                                    <p className='d-flex align-items-center justify-content-center'>
                                        {/* <span className='me-2 trs-3'>49962E94F099AFA4 </span>
                                        <span className="tick-round">
                                            <img className='img-fluid' src="../../assets/images/light-tick.png" alt="tick-ico" width={10} />
                                        </span> */}
                                    </p>
                                </div>
                            </div>
                            <div className='col-sm-7 col-lg-7 col-xl-8'>
                                <div className="cus-panel h-100 mb-4">
                                    <div className="panel-header">
                                        <h4 className='mb-0 fwb trs-3'>Validator Info</h4>
                                        <div className='badge-md success-bg'>
                                            <span className='trs-1'>active</span>
                                        </div>
                                    </div>
                                    <div className="panel-body pb-0">
                                        <ul className='info-list list-unstyled mb-0'>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Supply</h6>
                                                <p className='mb-0 trs-3'>
                                                    124,143,682.17 FUND
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Community Pool</h6>
                                                <p className='mb-0 trs-3'>
                                                    83,248.37 FUND
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Owner address</h6>
                                                <p className='mb-0 trs-3'>
                                                    undvaloper1yj09s0tngccqc6sf0v92nmcemr7zjhvpn9702p
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Signer address</h6>
                                                <p className='mb-0 trs-3 primary-text'>
                                                    undvaloper1yj09s0tngccqc6sf0v92nmcemr7zjhvpn9702p
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Commission Rate</h6>
                                                <p className='mb-0 trs-3'>
                                                    0.00% (Updated a year ago)
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Condition</h6>
                                                <p className='mb-0 trs-3'>
                                                    <span className='up-text fw-600'>Good</span>
                                                </p>
                                            </li>
                                            
                                            {/* <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Max Rate</h6>
                                                <p className='mb-0 trs-3'>
                                                    40.00%
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Max Change Rate</h6>
                                                <p className='mb-0 trs-3'>
                                                    3.00%
                                                </p>
                                            </li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='py-4 py-md-5 d-none'>
                    <div className="container"> 
                        <div className="tabl-row cus-panel darkBg">
                            <div className="tabl-head darkbg-3">
                                <div className="row mx-0">
                                    <div className="col-md-6 px-0">
                                        <div className="tbl-item p-2 p-sm-3">
                                            <h4>Owner address</h4>
                                            <p className='d-inline-flex txt-light fw-600 align-items-center flex-wrap'>
                                                <span className='me-2 primary-text break-word'>undvaloper1yj09s0tngccqc6sf0v92nmcemr7zjhvpn9702p</span>
                                                    <img className='img-fluid' src="../../assets/images/copy-wht-icon.png" alt="copy-img" width={14} />    
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 tbl-item px-0">
                                        <div className='p-2 p-sm-3'>
                                            <h4>Signer address</h4>
                                            <p className='d-inline-flex txt-light fw-600 align-items-center flex-wrap'>
                                                <span className='me-2 primary-text break-word'>undvaloper1yj09s0tngccqc6sf0v92nmcemr7zjhvpn9702p</span>
                                                    <img className='img-fluid' src="../../assets/images/copy-wht-icon.png" alt="copy-img" width={14} />    
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tabl panel-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className='mute-text-2 fs-16 fw-600'>
                                            Status
                                        </div>
                                        <div class="badge-md success-bg d-inline-block">
                                            <span class="trs-1">active</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className='mute-text-2 fs-16 fw-600'>
                                            Commission
                                        </div>
                                        <div class="badg mute-text-2 fw-600">
                                            0.00%
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className='mute-text-2 fs-16 fw-600'>
                                            Condition
                                        </div>
                                        <div className='up-text fw-600'>
                                            Good
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="darkbg-2 py-4 py-lg-5">
                    <div className="container">
                        <div className="row">
                            {/* hide col start */}
                            <div className="col-lg-4 mb-4 mb-lg-0 d-none">
                                <div className="cus-panel darkBg">
                                    <div className="panel-header">
                                        <p className='mb-0'>Uptime</p>
                                        <a href="javascript:void(0)" className='primary-text '>
                                            More...
                                        </a>
                                    </div>
                                    <div className="panel-body">
                                        <div className="d-flex flex-wrap justify-content-between">
                                            <p className='mb-0 me-2  mb-3'>Last 250 blocks</p>
                                            <p className='mb-0 trs-3 mb-3'>
                                                100%
                                            </p>
                                        </div>
                                        <ul className='blocks'>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* hide col end */}

                            <div className="col-lg-12">
                                <div className="cus-panel darkBg mb-4 mb-lg-5">
                                    <div className="panel-header">
                                        <h4 className='fwb trs-3'>Voting Power</h4>
                                    </div>
                                    <div className="panel-body">
                                        <div className='d-flex align-items-center mb-4 flex-wrap'>
                                            <div className='data-btn me-3'>
                                                <span className='trs-6'>6,928,509,556</span>
                                            </div>
                                            <div className='text'>
                                                <span>(~13.17%)</span>
                                            </div>
                                        </div>
                                        <div className="progress-line mb-3">
                                            <ProgressBar now={60} />
                                        </div>
                                        <ul className='info-list list-unstyled mb-0'>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Check point</h6>
                                                <p className='mb-0 trs-3'>
                                                    446,608
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Voting Power</h6>
                                                <p className='mb-0 trs-3'>
                                                    4,257,652,654
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Voting Power %</h6>
                                                <p className='mb-0 trs-3 primary-text'>
                                                    10.84%
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Delegation tabs start */}
                                <div className="cus-card p-4 h-auto mb-4 mb-lg-5">
                                    <div className="table-data-tab">
                                        <div className="btn-nav">
                                            <Nav variant="pills" defaultActiveKey="/firts-tab">
                                                <Nav.Item>
                                                    <Nav.Link className='active'><span className='trs-2'>Delegator</span></Nav.Link>
                                                </Nav.Item>
                                                {/* <Nav.Item>
                                                    <Nav.Link eventKey="link-1"><span className='trs-2'>Polygon</span></Nav.Link>
                                                </Nav.Item> */}
                                            </Nav>
                                        </div>
                                        <div className="border-table outer-table mb-4 mb-lg-5">
                                            <table className="data-table">
                                                <thead>
                                                    <tr className="table-header">
                                                        <th>Accounts</th>
                                                        <th>Bone Staked</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="coin-wrap">
                                                                    <img
                                                                        width="30"
                                                                        height="30"
                                                                        className="img-fluid me-3"
                                                                        src="../../assets/images/bear.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <span className="tb-data align">0xbf1b1d2c0105323c301294a0038438f23a15b1c5</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">101020 BONE</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="coin-wrap">
                                                                    <img
                                                                        width="30"
                                                                        height="30"
                                                                        className="img-fluid me-3"
                                                                        src="../../assets/images/bear.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <span className="tb-data align">0xbf1b1d2c0105323c301294a0038438f23a15b1c5</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align ">101020 BONE</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="coin-wrap">
                                                                    <img
                                                                        width="30"
                                                                        height="30"
                                                                        className="img-fluid me-3"
                                                                        src="../../assets/images/bear.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <span className="tb-data align">0xbf1b1d2c0105323c301294a0038438f23a15b1c5</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align fw-600">101020 BONE</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="coin-wrap">
                                                                    <img
                                                                        width="30"
                                                                        height="30"
                                                                        className="img-fluid me-3"
                                                                        src="../../assets/images/bear.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <span className="tb-data align">0xbf1b1d2c0105323c301294a0038438f23a15b1c5</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align fs-16 fw-600">101020 BONE</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="coin-wrap">
                                                                    <img
                                                                        width="30"
                                                                        height="30"
                                                                        className="img-fluid me-3"
                                                                        src="../../assets/images/bear.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <span className="tb-data align">0xbf1b1d2c0105323c301294a0038438f23a15b1c5</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">101020 BONE</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="coin-wrap">
                                                                    <img
                                                                        width="30"
                                                                        height="30"
                                                                        className="img-fluid me-3"
                                                                        src="../../assets/images/bear.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <span className="tb-data align">0xbf1b1d2c0105323c301294a0038438f23a15b1c5</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align ">101020 BONE</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="coin-wrap">
                                                                    <img
                                                                        width="30"
                                                                        height="30"
                                                                        className="img-fluid me-3"
                                                                        src="../../assets/images/bear.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <span className="tb-data align">0xbf1b1d2c0105323c301294a0038438f23a15b1c5</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align fw-600">101020 BONE</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="coin-wrap">
                                                                    <img
                                                                        width="30"
                                                                        height="30"
                                                                        className="img-fluid me-3"
                                                                        src="../../assets/images/bear.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <span className="tb-data align">0xbf1b1d2c0105323c301294a0038438f23a15b1c5</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align fs-16 fw-600">101020 BONE</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 d-flex align-items-center">
                                                <span class="fw-700">Showing 1-8 of 300</span>
                                            </div>
                                            <div className="col-md-8">
                                                <div class="cus-pagination">
                                                    <ul class="pagination justify-content-end">
                                                        <li class="page-item"><a class="page-link" href="#"><span>Previous</span></a></li>
                                                        <li class="page-item"><a class="page-link" href="#"><span>1</span></a></li>
                                                        <li class="page-item"><a class="page-link" href="#"><span>2</span></a></li>
                                                        <li class="page-item"><a class="page-link" href="#"><span>3</span></a></li>
                                                        <li class="page-item"><a class="page-link" href="#"><span>Next</span></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* deligation tab  end */}

                                {/* transactions tabs start */}
                                <div className="cus-card p-4 h-auto">
                                    <div className="table-data-tab">
                                        <h3 className='mb-3 mb-lg-4'>Transactions</h3>
                                        <div className="btn-nav">
                                            <Nav variant="pills" defaultActiveKey="/firts-tab">
                                                <Nav.Item>
                                                    <Nav.Link className='active'><span className='trs-2'>Transactions L1</span></Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="link-1"><span className='trs-2'>Transactions L2</span></Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>
                                        <div className="border-table outer-table mb-4 mb-lg-5">
                                            <table className="data-table">
                                                <thead>
                                                    <tr className="table-header">
                                                        <th>Checkoint</th>
                                                        <th>Start block number</th>
                                                        <th>End block number</th>
                                                        <th>Result</th>
                                                        <th>Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            443,032
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align d-flex align-items-center">
                                                                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" color="#999999" aria-hidden="true">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                                                    </path>
                                                                </svg>
                                                                <span>Success</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">8hr ago</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="tb-data align">234,332</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align d-flex align-items-center">
                                                                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" color="#999999" aria-hidden="true">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                                                    </path>
                                                                </svg>
                                                                <span>Success</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">8hr ago</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            443,032
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align d-flex align-items-center">
                                                                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" color="#999999" aria-hidden="true">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                                                    </path>
                                                                </svg>
                                                                <span>Success</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">8hr ago</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="tb-data align">234,332</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align d-flex align-items-center">
                                                                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" color="#999999" aria-hidden="true">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                                                    </path>
                                                                </svg>
                                                                <span>Success</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">8hr ago</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            443,032
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align d-flex align-items-center">
                                                                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" color="#999999" aria-hidden="true">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                                                    </path>
                                                                </svg>
                                                                <span>Success</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">8hr ago</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="tb-data align">234,332</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align d-flex align-items-center">
                                                                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" color="#999999" aria-hidden="true">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                                                    </path>
                                                                </svg>
                                                                <span>Success</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">8hr ago</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            443,032
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align d-flex align-items-center">
                                                                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" color="#999999" aria-hidden="true">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                                                    </path>
                                                                </svg>
                                                                <span>Success</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">8hr ago</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="tb-data align">234,332</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align d-flex align-items-center">
                                                                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" color="#999999" aria-hidden="true">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                                                    </path>
                                                                </svg>
                                                                <span>Success</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">8hr ago</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 d-flex align-items-center">
                                                <span class="fw-700">Showing 1-8 of 300</span>
                                            </div>
                                            <div className="col-md-8">
                                                <div class="cus-pagination">
                                                    <ul class="pagination justify-content-end">
                                                        <li class="page-item"><a class="page-link" href="#"><span>Previous</span></a></li>
                                                        <li class="page-item"><a class="page-link" href="#"><span>1</span></a></li>
                                                        <li class="page-item"><a class="page-link" href="#"><span>2</span></a></li>
                                                        <li class="page-item"><a class="page-link" href="#"><span>3</span></a></li>
                                                        <li class="page-item"><a class="page-link" href="#"><span>Next</span></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* transactions tab  end */}

                                {/* voting tabs start , currently hide */}
                                <div className="table-data-tab mb-4 mb-lg-5 d-none">
                                    <div className="btn-nav">
                                        <Nav variant="pills" defaultActiveKey="/firts-tab">
                                            <Nav.Item>
                                                <Nav.Link className='active'><span className='trs-2'>Power Change</span></Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="link-1"><span className='trs-2'>Polygon</span></Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="disabled">
                                                    <span className='trs-2'>Transactions</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </div>
                                {/* votign tabs end */}

                                <div className='table-data darkBg rad-10 py-3 d-none'>
                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round down'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc down-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>                                                <tr>
                                                    <td>
                                                        <div className='arrow-round down'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc down-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

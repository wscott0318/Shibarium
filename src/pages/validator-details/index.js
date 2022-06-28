/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import InnerHeader from '../inner-header';

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
                                    <h4 className='py-2 mt-2'><span className='trs-3 primary-text'>FUNDBaron</span></h4>
                                    <p className='d-flex align-items-center justify-content-center'>
                                        <span className='me-2 trs-3'>49962E94F099AFA4 </span>
                                        <span className="tick-round">
                                            <img className='img-fluid' src="../../assets/images/light-tick.png" alt="tick-ico" width={10} />
                                        </span>
                                    </p>
                                    <p className='mb-0'>
                                        100% FUND reward and 100% xFUND reward for all delegators.
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
                                    <div className="panel-body">
                                        <ul className='info-list list-unstyled mb-0'>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Operator Address</h6>
                                                <p className='mb-0 trs-3'>
                                                    undvaloper1yj09s0tngccqc6sf0v92nmcemr7zjhvpn9702p
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Self-Delegate Address</h6>
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
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="darkbg-2 py-4 py-lg-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 mb-4 mb-lg-0">
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
                            <div className="col-lg-8">
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
                                        <ul className='info-list list-unstyled mb-0'>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Self Delegation Ratio</h6>
                                                <p className='mb-0 trs-3'>
                                                    2.81% (~194,924.659 FUND)
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Proposer Priority</h6>
                                                <p className='mb-0 trs-3 primary-text'>
                                                    651,677,567
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Delegator Shares</h6>
                                                <p className='mb-0 trs-3'>
                                                    6,929,895,466,312,268.00
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Tokens</h6>
                                                <p className='mb-0 trs-3'>
                                                    6,928,509,556,518,179.00
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Max Change Rate</h6>
                                                <p className='mb-0 trs-3'>
                                                    3.00%\
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* voting tabs start */}
                                <div className="table-data-tab mb-4 mb-lg-5">
                                    <div className="btn-nav">
                                        <Nav variant="pills" defaultActiveKey="/firts-tab">
                                            <Nav.Item>
                                                <Nav.Link className='active'><span className='trs-2'>Power Change</span></Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="link-1"><span className='trs-2'>Delegations</span></Nav.Link>
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
                                <div className='table-data darkBg rad-10 py-3'>
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

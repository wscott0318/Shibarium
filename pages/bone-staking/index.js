import React,{useState} from 'react';
import { Dropdown,Navbar,Container,Nav } from 'react-bootstrap';
import { useRouter } from "next/router";
import InnerHeader from '../inner-header';
import DelegatePopup from '../delegate-popup';

const BoneStaking = () => {
    const [modalShow, setModalShow] = useState(false);
    const router = useRouter();
    const [show, setShow] = React.useState();
    return (
        <div>
          <InnerHeader />
          <DelegatePopup  show={modalShow}
             onHide={() => setModalShow(false)}/>
            <section className="banner-section card-banner dark_bg">
                <div className="container">
                    <div className='row'>
                        <div className='col-lg-8'>
                            <h1 className='title-2 text-white mb-4 mb-lg-5'>
                                <span className='sub-title d-block mb-1 mb-md-2 mb-lg-3 trs-6'>Start Earning Rewards With</span>
                                <div className="d-inline-block bg-white px-2">
                                    <span className='grad-text trs-6'>Shibarium Staking</span>
                                </div>
                            </h1>
                            <div className="d-flex align-items-centeer flex-wrap">
                                <div className="mb-2 me-3">
                                    <a href="./become-validator" className="btn bordered-btn light-text">
                                        <span>Become A Validator</span>
                                    </a>
                                </div>
                                <div className="mb-2">
                                    <a href="./delegator" className="btn warning-btn w-100">
                                        <span>Become A Delegator</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <img className='img-fluid' src="../../assets/images/shiba-img.png" alt="shiba-img" />
                        </div>
                    </div>
                </div>
            </section>
            {/* banner section end */}
            <section className='buy-sell-section mb-4 mb-lg-5'>
                <div className="container">
                    <div className="baner-card">
                        <div className="row">
                            <div className="col-sm-10 mx-auto mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                                <div className="bs-card card primary-bg2 d-flex align-items-center h-100 justify-content-center p-2">
                                    <h3 className='mb-0 text-white fwb'>Network Overview</h3>
                                </div>
                            </div>
                            <div className="col-sm-10 mx-auto mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                                <div className="bs-card card">
                                    <h3 className="fwb">13</h3>
                                    <span className='mb-0 trs-3'>Total Validators</span>
                                </div>
                            </div>
                            <div className="col-sm-10 mx-auto mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                                <div className="bs-card card">
                                    <h3 className="fwb">155,554,455 Shiba</h3>
                                    <p className='d-block mb-0 fw-600'>$12365977.36</p>
                                    <div className="card-hr"></div>
                                    <span className='mb-0'>Total Validators</span>
                                </div>
                            </div>
                            <div className="col-sm-10 mx-auto mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                                <div className="bs-card card">
                                    <h3 className="fwb">569,554,455 Shiba</h3>
                                    <p className='d-block mb-0 fw-600'>$12365977.36</p>
                                    <div className="card-hr"></div>
                                    <span className='mb-0'>Total Reward Distributed</span>
                                </div>
                            </div>
                            <div className="col-sm-10 mx-auto mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                                <div className="bs-card card">
                                    <h3 className="fwb">25,599,69</h3>
                                    <div className="card-hr"></div>
                                    <span className='mb-0 trs-3'>Bor Block Height</span>
                                </div>
                            </div>
                            <div className="col-sm-10 mx-auto mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                                <div className="bs-card card">
                                    <h3 className="fwb">9,554,455 </h3>
                                    <div className="card-hr"></div>
                                    <span className='mb-0 trs-3'>Heimdall Block Height</span>
                                </div>
                            </div>
                            <div className="col-sm-10 mx-auto mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                                <div className="bs-card card">
                                    <h3 className="fwb d-flex align-items-center">
                                        <span>71,582</span>
                                        <span className='ms-2 primary-badge  trsn-3 badge-md fs-12'>
                                            <span className='trs-2'>28 minutes ago</span>
                                        </span>
                                    </h3>
                                    <div className="card-hr"></div>
                                    <span className='mb-0 trs-3'>Last Checkpoint</span>
                                </div>
                            </div>
                            <div className="col-sm-10 mx-auto mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                                <div className="bs-card card">
                                    <h3 className="fwb d-flex align-items-center">
                                        <span>25 Minutes</span>
                                    </h3>
                                    <div className="card-hr"></div>
                                    <span className='mb-0 trs-3'>Checkpoint Interval</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='mb-4 mb-lg-5'>
                <div className='container'>
                    <div className='filter-sec'>
                        <div className='row align-items-center'>
                            <div className='col-lg-5 col-12 mb-sm-4 mb-lg-0 mb-4'>
                                <div className='search-box d-inline-block position-relative w-100'>
                                    <input className="cus-search w-100" type="text" placeholder="Search by validator name, Id, owner or signer address"></input>
                                    <img width="15" height="15" className='img-fluid' src="../../assets/images/search.png" alt="" />
                                </div>
                            </div>
                            <div className='col-lg-7 col-12 text-end mob-filter'>
                                <div className='d-inline-block pe-0 pe-sm-4 mob-filter'>
                                    <label className="head-xsm fw-600" for="Auction"><span className='top-low-spc pe-2 align'>Show Auction Only</span></label>
                                    <label class="switch align">
                                        <input type="checkbox" />
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                                <div className='d-inline-block pe-4 pe-sm-4'>
                                    <label className="head-xsm fw-600" for="Auction"><span className='top-low-spc pe-2 align'>Sort by</span></label>
                                    <Dropdown className='cus-dropdown position-relative d-inline-block'>
                                        <i class="arrow down"></i>
                                        <Dropdown.Toggle id="dropdown-basic">
                                            <span>Random</span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className='d-inline-block'>
                                    <a href="javascript:void(0);" title="" className='view-blk me-2 view-active'>
                                        <img className="grey-image" src="../../assets/images/grid-grey.png" width={26} height={19} alt=""></img>
                                        <img className="white-image" src="../../assets/images/grid-white.png" width={26} height={19} alt=""></img>
                                    </a>
                                    <a href="javascript:void(0);" title="" className='view-blk'>
                                        <img className="grey-image" src="../../assets/images/list-grey.png" width={26} height={19} alt=""></img>
                                        <img className="white-image" src="../../assets/images/list-white.png" width={26} height={19} alt=""></img>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='outer-table mb-4 mb-lg-5'>
                        <table className='data-table'>
                            <thead>
                                <tr className='table-header'>
                                    <th>Name</th>
                                    <th>Stake</th>
                                    <th>Checkpoints Signed</th>
                                    <th>Commission</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span className='tb-data align'><i className='user-icon'></i>Anonymous 18</span>
                                        {/* <span className='tb-data-sm'>Matic</span> */}
                                    </td>
                                    <td>
                                        <span className='tb-data align'>13,861</span>
                                        <span className='tb-data-sm align'>SHIBA</span>
                                    </td>
                                    <td>
                                        <span className='tb-data warning-color align'>100%</span>
                                    </td>
                                    <td>
                                        <span className='tb-data success-color align'>10%</span>
                                    </td>
                                    <td className='user-action'>
                                        <a href="javascript:void(0)" onClick={() => setModalShow(true)} title='' className='btn-small uppercase-txt warning-btn'><span>Delegate</span></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className='tb-data align'><i className='user-icon'></i>Anonymous 18</span>
                                        {/* <span className='tb-data-sm'>Matic</span> */}
                                    </td>
                                    <td>
                                        <span className='tb-data align'>13,861</span>
                                        <span className='tb-data-sm align'>SHIBA</span>
                                    </td>
                                    <td>
                                        <span className='tb-data warning-color align'>100%</span>
                                    </td>
                                    <td>
                                        <span className='tb-data success-color align'>10%</span>
                                    </td>
                                    <td className='user-action'>
                                        <a href="javascript:void(0)" onClick={() => setModalShow(true)} title='' className='btn-small uppercase-txt warning-btn'><span>Delegate</span></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className='tb-data align'><i className='user-icon'></i>Anonymous 18</span>
                                        {/* <span className='tb-data-sm'>Matic</span> */}
                                    </td>
                                    <td>
                                        <span className='tb-data align'>13,861</span>
                                        <span className='tb-data-sm align'>SHIBA</span>
                                    </td>
                                    <td>
                                        <span className='tb-data warning-color align'>100%</span>
                                    </td>
                                    <td>
                                        <span className='tb-data success-color align'>10%</span>
                                    </td>
                                    <td>
                                        <span className='warning-color lnht fw-600'>Offline since<br /> <em className='tbsm-txt '>289633 checkpoints</em></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <footer className='main-footer'>
                <div className="container">
                    <div className="copyright mt-4 mt-lg-5">
                        <h3 className='mb-0 text-center fwb'>Powered by xFund.</h3>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default BoneStaking;

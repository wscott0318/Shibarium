/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from "react";
import Header from "../layout/header";
import CommonModal from "../../pages/components/CommonModel";
import { TailSpin } from "react-loader-spinner";
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from "react-bootstrap";
import Sidebar from "../layout/sidebar";

export default function Dashboard() {
  const [isDeposit, setIsDeposit] = useState(true);
  const [isWithdrw, setIsWithdrw] = useState(false);
  const [showImportantModal, setImportantModal] = useState(false);
  const [showtransferOverviewModal, setTransferOverviewModal] = useState(false);
  const [showProgressModal, setProgressModal] = useState(false);
  const [showProgressTwoModal, setProgressTwoModal] = useState(false);
  const [showProgressFourStepsModal, setProgressFourStepsModal] = useState(false);
  // below is the same as componentDidMount and componentDidUnmount

  const handleDeposit = () => {
    setIsDeposit(true)
    setIsWithdrw(false)
  };
  const handleWithdrw = () => {
    setIsDeposit(false)
    setIsWithdrw(true)
  };
 

  return (
    <>
      {/* <Header /> */}
      <div className="page-wrapper">
        <Sidebar />
        <main className="main-content">
          <div className="page-card col-xl-10 mb-5">
            <div className="row">
              <div className="col-md-4 card-side darkbg pb-0 order-2 order-md-1">
                <div className="left-col d-flex flex-column h-100 justify-content-between">
                  <div className="content-wrap mb-3 mb-md-4">
                    <h3 className="text-white mb-3 fwb">Shibarium Bridge</h3>
                    <p className="text-white">
                      It is a long established fact that a reader will be
                      distracted by the readable content.
                    </p>
                  </div>
                  <div className="page-nav d-none">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#!"
                        >
                          Fast Withdraw / Deposits
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#!">
                          On Ramp Transfers
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#!">
                          How it Works?
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#!" className="nav-link">
                          FAQ
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#!">
                          User Guide
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="shib-image-wrap">
                    <img
                      src="../../assets/images/shiba-tab.png"
                      alt=""
                      className="img-fluid"
                      width={302}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-8 tab-card p-30 order-md-2 order-md-2 order-1">
                <div className="cus-tabs nav-wrap tab-50">
                  <Nav
                    className=" mb-4 mb-lg-5"
                    variant="pills"
                    defaultActiveKey="/tab-1"
                  >
                    <Nav.Item onClick={handleDeposit}>
                      <Nav.Link href="#!" className={`${isDeposit?"active":""}`}>
                        <span className="trs-2">Deposit</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={handleWithdrw}>
                      <Nav.Link eventKey="link-1">
                        <span className="trs-2">Withdraw</span>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  {/* Deposit tab start */}
                  {isDeposit && (
                    <div className="tab-content-wrap">
                      <div className="swap-area">
                        <div className="form-group">
                          <label htmlFor="" className="form-label fwb">
                            From
                          </label>
                          <div className="swap-control swap-flex">
                            <div className="label-left">
                              <span className="coin-img me-2">
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/eth.png"
                                  alt="coin-icon"
                                />
                              </span>
                              <span className="coin-title fw-600 trs-2">
                                Ethereum chain
                              </span>
                            </div>
                            <div className="label-right">
                              <span className="fw-600 trs-2 me-2">
                                Balance:
                              </span>
                              <a
                                className="primary-badge badge-md"
                                href="#!"
                              >
                                <span className="trs-2">0 PUSH</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="swap-control swap-flex p-0">
                            <div className="swap-modal label-left">
                              <span className="coin-img me-2">
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/eth.png"
                                  alt="coin-icon"
                                />
                              </span>
                              <span className="fw-600 trs-2">
                                Ethe (PoS-...
                              </span>
                            </div>
                            <div className="swap-col">
                              <input
                                type="text"
                                className="swap-input"
                                placeholder="0.00"
                              />
                              <span className="primary-text over-text fw-600">
                                MAX
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swap-icons">
                        <img
                          className="img-fluid"
                          src="../../assets/images/arrow-down.png"
                          alt=""
                        />
                      </div>
                      <div className="swap-area">
                        <div className="form-group">
                          <label htmlFor="" className="form-label fwb">
                            To
                          </label>
                          <div className="swap-control swap-flex">
                            <div className="label-left">
                              <span className="coin-img me-2">
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/file-ico.png"
                                  alt="coin-icon"
                                />
                              </span>
                              <span className="coin-title fw-600 trs-2">
                                Shibarium chain
                              </span>
                            </div>
                            <div className="label-right">
                              <span className="trs-2 me-2 fw-600">
                                Balance:
                              </span>
                              <a
                                className="primary-badge badge-md"
                                href="#!"
                              >
                                <span className="fw-600 trs-2">0 PUSH</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="btn-wrap pt-3">
                        <button type="button" onClick={() => setProgressFourStepsModal(true)} className="btn warning-btn w-100">
                          <span>Transfer</span>
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Deposit tab end */}

                  {/* Withdraw tab start */}
                  {isWithdrw && (
                    <div className="tab-content-wrap">
                      <div className="swap-area">
                        <div className="form-group">
                          <label htmlFor="" className="form-label fwb">
                            From
                          </label>
                          <div className="swap-control swap-flex">
                            <div className="label-left">
                              <span className="coin-img me-2">
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/file-ico.png"
                                  alt="coin-icon"
                                />
                              </span>
                              <span className="coin-title fw-600 trs-2">
                                Mumbai chain
                              </span>
                            </div>
                            <div className="label-right">
                              <span className="fw-600 trs-2 me-2">
                                Balance:
                              </span>
                              <a
                                className="primary-badge badge-md"
                                href="#!"
                              >
                                <span className="trs-2">0 ETH</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="swap-control swap-flex p-0">
                            <div className="swap-modal">
                              <span className="coin-img me-2">
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/eth.png"
                                  alt="coin-icon"
                                />
                              </span>
                              <span className="fw-600 trs-2">
                                Ethe (PoS-...
                              </span>
                            </div>
                            <div className="swap-col">
                              <input
                                type="text"
                                className="swap-input"
                                placeholder="0.00"
                              />
                              <span className="primary-text over-text fw-600">
                                MAX
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swap-icons">
                        <img
                          className="img-fluid"
                          src="../../assets/images/arrow-down.png"
                          alt=""
                        />
                      </div>
                      <div className="swap-area">
                        <div className="form-group">
                          <label htmlFor="" className="form-label fwb">
                            To
                          </label>
                          <div className="swap-control swap-flex">
                            <div className="label-left">
                              <span className="coin-img me-2">
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/file-ico.png"
                                  alt="coin-icon"
                                />
                              </span>
                              <span className="coin-title fw-600 trs-2">
                                Goerli chain
                              </span>
                            </div>
                            <div className="label-right">
                              <span className="trs-2 me-2 fw-600">
                                Balance:
                              </span>
                              <a
                                className="primary-badge badge-md"
                                href="#!"
                              >
                                <span className="fw-600 trs-2">0 ETH</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="btn-wrap pt-3">
                        <button
                          type="button"
                          className="btn gradient_btn w-100"
                        >
                          <span>Transfer</span>
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Withdraw tab end */}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-4 mb-xl-0">
              <div className="card-shade text-center darkbg">
                <div className="card-icon">
                  <img
                    className="img-fluid"
                    src="../../assets/images/ftrs-icon.png"
                    alt=""
                  />
                </div>
                <div className="card-ftr darkbg">
                  <h5 className="text-white mb-0">
                    Approved in seconds for pennies
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-4 mb-xl-0">
              <div className="card-shade text-center darkbg">
                <div className="card-icon">
                  <img
                    className="img-fluid"
                    src="../../assets/images/ftrs-icon-2.png"
                    alt=""
                  />
                </div>
                <div className="card-ftr darkbg">
                  <h5 className="mb-0 text-white">
                    Easily bridge any token to Shibarium
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-4 mb-xl-0">
              <div className="card-shade text-center darkbg">
                <div className="card-icon darkbg">
                  <img
                    className="img-fluid"
                    src="../../assets/images/ftrs-icon-3.png"
                    alt=""
                  />
                </div>
                <div className="card-ftr darkbg">
                  <h5 className="mb-0 text-white">Works with Shibaswap</h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-4 mb-xl-0">
              <div className="card-shade text-center darkbg">
                <div className="card-icon">
                  <img
                    className="img-fluid"
                    src="../../assets/images/ftrs-icon-4.png"
                    alt=""
                  />
                </div>
                <div className="card-ftr darkbg">
                  <h5 className="mb-0 text-white">Use Bone + Earn Bone</h5>
                </div>
              </div>
            </div>
          </div>
        </main>
        <CommonModal
        title={"Important"}
        show={showImportantModal}
        setShow={setImportantModal} 
         >
          <div className="pop-row">
            <h3 className="bold-hd">What's supported</h3>
            <div className="box-wrap">
              <div class="image-box">
                <div><img src="../../assets/images/green-tick2.png" alt="" className="img-fluid" width={28} height={28}  /></div>
              </div>
              <div>
                <h4 className="head-sm">Moving funds from Ethereum to Polygon</h4>
                <p>Deposits of funds taks place ~ 7-8 minutes</p>
              </div>
            </div>
            
          </div>
          <div className="pop-row">
            <h3 className="bold-hd">What's not supported</h3>
            <div className="box-wrap">
              <div class="image-box">
                <div><img src="../../assets/images/red-cross.png" alt="" className="img-fluid" width={28} height={28}  /></div>
              </div>
              <div>
                <h4 className="head-sm">Delegation to validators</h4>
                <p>Delegation/Staking takes place on Ethereum. Do not deposit funds to Polygon for this purpose. To delegate or stake please visit staking ui.</p>
              </div>
            </div>
            
          </div>
          <div className="mt-4 d-flex align-items-center justify-content-center flex-column flex-sm-row mob-btns">
              <div className="mb-3 me-0 me-sm-5 mb-sm-0 btn-box">
                <button type="button" className="btn bordered-btn light-text w-100">
                  <span>CANCEL</span>
                </button>
              </div>
              <div className="btn-box">
                <button type="button" className="btn gradient_btn light-text w-100">
                  <span>CONTINUE</span>
                </button>
              </div>
            </div>
        </CommonModal>
        <CommonModal
        title={"Transfer Overview"}
        show={showtransferOverviewModal}
        setShow={setTransferOverviewModal} 
         >
          <div>
            <div className="center-align">
                <span className="mb-3"><img src="../../assets/images/transfer.png" alt="" className="img-fluid" width={60} height={60}  /></span>
                <p>Deposit process for Ether consists of a single transaction.</p>
                <p>Estimation of total gas required for this transaction</p>
            </div>
            <div className="scroll-blk">
              <div className="coin-box">
                <div className="coin-img">
                  <img src="../../assets/images/eth.png" alt="" className="img-fluid" width={14} height={12}  />
                </div>
                <div className="middle-blk">Complete Deposit</div>
                <div className="right-blk">~$3.34</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 d-flex align-items-center justify-content-center flex-column flex-sm-row mob-btns">
              <div className="mb-3 me-0 me-sm-5 mb-sm-0 btn-box">
                <button type="button" className="btn bordered-btn light-text w-100">
                  <span>CANCEL</span>
                </button>
              </div>
              <div className="btn-box">
                <button type="button" className="btn gradient_btn light-text w-100">
                  <span>CONTINUE</span>
                </button>
              </div>
            </div>
        </CommonModal>
        <CommonModal
        title={"Confirm Transfer"}
        show={showtransferOverviewModal}
        setShow={setTransferOverviewModal} 
         >
          <div>
            <div className="center-align mb-4">
                <span className="">
                  <img src="../../assets/images/coin-matic.png" alt="" className="img-fluid" width={69} height={70}  />
                </span>
                <p className="fw-bold amt-name">10 Matic token</p>
                <p className="amt-value">$ 7.95</p>
            </div>
            <div className="block-box mob-box">
              <div className="">
                <button type="button" className="btn gradient_btn light-text w-100 mb-3 mb-sm-0">ETHEREUM NETWORK</button>                 
              </div>
              <div className="arrow-box">
                <div><img src="../../assets/images/arrow.png" alt="" className="img-fluid" width={12} height={21}  /></div>
              </div>
              <div className="">
                <button type="button" className="btn gradient_btn light-text w-100 mb-3 mb-sm-0">POLYGON NETWORK</button> 
              </div>
            </div>
            <div className="txt-block">
              <div className="block-box">
                <div>
                  <span className="fw-bold">Transfer Mode</span>
                </div>
                <div>
                  <span>Plasma Bridge</span>
                </div>
              </div>  
              <p>Plasma provides advanced security with plasma exit mechanism. It will take approximately 3 hours when you have to transfer your funds back to Ethereum.</p>                   
            </div>
          </div>
          
          <div className="mt-4  mob-btns">
              <div className="block-box">
                <div>
                  <span className="fw-bold">Estimated Transaction fees</span>
                </div>
                <div>
                  <span>~$1.51</span>
                </div>
              </div>                   
              <div className="btn-box w-100">
                <button type="button" className="btn gradient_btn light-text w-100">
                  <span>CONTINUE</span>
                </button>
              </div>
            </div>
        </CommonModal>
        <CommonModal
        title={"Transfer in Progress"}
        show={showProgressModal}
        setShow={setProgressModal} 
         >
          <div>
            <div className="block-box">
                <div>
                  <span >Transfer Amount</span>
                </div>
                <div>
                  <span className="fw-bold">0.01 ETH</span>
                </div>
              </div>  
          </div>
          <div>
          <div className="small-step">
            <ul className="steps">
              <li className="step">
                <div className="step-blk step-active">
                  <span className="fw-700">1</span>
                  {/* <span className="fw-700">
                      <img src="../../assets/images/white-tick.png" alt="" />
                    </span> */}
                </div>
                <p className="light-text fw-700">Approve</p>
              </li>
              <li className="step-line"></li>
              <li className="step">
                <div className="step-blk">
                  <span className="fw-700">2</span>
                  {/* <span className="fw-700">
                      <img src="../../assets/images/white-tick.png" alt="" />
                    </span> */}
                </div>
                <p className="light-text fw-700">Delegate</p>
              </li>
              <li className="step-line"></li>
              <li className="step">
                <div className="step-blk">
                  <span className="fw-700">3</span>
                </div>
                <p className="light-text fw-700">Completed</p>
              </li>
            </ul>
          </div>
          <div className="spinner-outer position-relative spiner-blk">
            <div className="loading-spinner">
              <TailSpin color="#f06500" height={80} width={80} />
            </div>
          </div>
          <div className="center-align">
                <p className="fw-bold fs-18">Transaaction in process</p>
                <p>Ethereum transactions can take longer time to complete based upon network congestion. Please wait or increase the gas price of the transaction</p>
                <a href="javascript:void(0);" title="">View on Etherscan</a>
            </div>
          </div>
        </CommonModal>
        <CommonModal
        title={"Transfer in Progress"}
        show={showProgressTwoModal}
        setShow={setProgressTwoModal} 
         >
          <div>
            <div className="block-box">
                <div>
                  <span >Transfer Amount</span>
                </div>
                <div>
                  <span className="fw-bold">10 MATIC</span>
                </div>
              </div>  
          </div>
          <div>
          <div className="small-step">
            <ul className="steps">
              <li className="step">
                <div className="step-blk step-active">
                  <span className="fw-700">1</span>
                  {/* <span className="fw-700">
                      <img src="../../assets/images/white-tick.png" alt="" />
                    </span> */}
                </div>
                <p className="light-text fw-700">Approve</p>
              </li>
              <li className="step-line"></li>
              <li className="step">
                <div className="step-blk">
                  <span className="fw-700">2</span>
                  {/* <span className="fw-700">
                      <img src="../../assets/images/white-tick.png" alt="" />
                    </span> */}
                </div>
                <p className="light-text fw-700">Delegate</p>
              </li>
              <li className="step-line"></li>
              <li className="step">
                <div className="step-blk">
                  <span className="fw-700">3</span>
                </div>
                <p className="light-text fw-700">Completed</p>
              </li>
            </ul>
          </div>
          <div className="center-align">
            <span className="mb-3"><img src="../../assets/images/like.png" alt="" className="img-fluid" width={60} height={60}  /></span>
          </div>
          <div className="center-align">
                <p className="fw-bold fs-18">Transfer en route.</p>
                <p>Ethereum transactions can take longer time to complete based upon network congestion. Please wait or increase the gas price of the transaction</p>
                <a href="javascript:void(0);" title="">View on Etherscan</a>
            </div>
          </div>
        </CommonModal>

        {/* kk */}
        <CommonModal
        title={"Transfer in Progress"}
        show={showProgressFourStepsModal}
        setShow={setProgressFourStepsModal} 
         >
          <div>
            <div className="block-box">
                <div>
                  <span >Transfer Amount</span>
                </div>
                <div>
                  <span className="fw-bold">5 MATIC</span>
                </div>
              </div>  
          </div>
          <div>
          <div className="small-step">
            <ul className="steps">
              <li className="step">
                <div className="step-blk step-active">
                  <span className="fw-700">1</span>
                  {/* <span className="fw-700">
                      <img src="../../assets/images/white-tick.png" alt="" />
                    </span> */}
                </div>
                <p className="light-text fw-700">Initialized</p>
              </li>
              <li className="step-line"></li>
              <li className="step">
                <div className="step-blk step-active">
                  <span className="fw-700">2</span>
                  {/* <span className="fw-700">
                      <img src="../../assets/images/white-tick.png" alt="" />
                    </span> */}
                </div>
                <p className="light-text fw-700">Checkpoint</p>
              </li>
              <li className="step-line"></li>
              <li className="step">
                <div className="step-blk step-active">
                  <span className="fw-700">3</span>
                </div>
                <p className="light-text fw-700">Challange Period</p>
              </li> 
              <li className="step-line"></li>
              <li className="step">
                <div className="step-blk">
                  <span className="fw-700">4</span>
                </div>
                <p className="light-text fw-700">Completed</p>
              </li>
            </ul>
          </div>
          <div className="center-align">
            <span className="mb-3"><img src="../../assets/images/like.png" alt="" className="img-fluid" width={60} height={60}  /></span>
          </div>
          <div className="center-align">
                <p className="fw-bold fs-18">Challange period completed.</p>
                <p>Your token is ready to move from Polygon to Ethereum Network. Complete the last transaction and you're done. In case of any issue, please reach out to support</p>
                <a href="javascript:void(0);" title="">View on Etherscan</a>
            </div>
          </div>
        </CommonModal>
      </div>
    </>
  );
}

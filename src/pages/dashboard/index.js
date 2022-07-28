/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from "react";
import Header from "../layout/header";
import CommonModal from "../../pages/components/CommonModel";
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
                        <button type="button" onClick={() => setImportantModal(true)} className="btn warning-btn w-100">
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
                <p className="sm-txt">Deposits of funds taks place ~ 7-8 minutes</p>
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
                <p className="sm-txt">Delegation/Staking takes place on Ethereum. Do not deposit funds to Polygon for this purpose. To delegate or stake please visit staking ui.</p>
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
      </div>
    </>
  );
}

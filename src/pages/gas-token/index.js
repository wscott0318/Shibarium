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
        setMenuState(!menuState);
    }
    const [swapState, setSwapState] = useState({
    step0: true,
    step1: false,
    step2: false,
    title: "Review Swap",
    });
    const [showSlippageModal, setSlippageModal] = useState(false);
    const [showSwapModal, setSwapModal] = useState(false);
    const [approveReview, setApproveReview] = useState(true);
    return (
      <>
        <main className="main-content">
          <Sidebar
            handleMenuState={handleMenuState}
            onClickOutside={() => {
              setMenuState(false);
            }}
            menuState={menuState}
          />
          <div className="cmn_dashbord_main_outr">
            <InnerHeader />
            <div className="container px-0">
              <div className="swap-card cus-card-800">
                <div className="swp-header">
                  <div className="swp-left-col mb-3 mb-lg-3 mb-xl-4">
                    <h3 className="">Get Gas Token</h3>
                    <p className="grey-txt">
                      BONE is used to pay the transaction fee
                    </p>
                  </div>
                  <div className="swp-right-col mb-3 mb-lg-3 mb-xl-4">
                    <ul className="swp-icon">
                      <li>
                        <a href="javascript:void(0)">
                          <img
                            className="img-fluid"
                            src="../../images/faq.png"
                            alt="icon-img"
                            width={25}
                            height="25"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="swp-body">
                  <form action="" className="flex-form gas_token_form">
                    <div className="flex-form-top">
                      <div className="field-grid row">
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <div className="form-field position-relative two-fld dark-input">
                              <div className="mid-chain w-100">
                                <input
                                  className="w-100"
                                  type="text"
                                  placeholder="1"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <div className="form-field position-relative two-fld dark-input">
                              <div className="mid-chain w-100">
                                <input
                                  className="w-100"
                                  type="text"
                                  placeholder="5"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <div className="form-field position-relative two-fld dark-input">
                              <div className="mid-chain w-100">
                                <input
                                  className="w-100"
                                  type="text"
                                  placeholder="10"
                                />
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
                                <input
                                  className="w-100"
                                  type="text"
                                  placeholder="Insert a custom value"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="down_arrow">
                        <img src="../../images/chev-drop.png" alt="icon-img" />
                      </div>
                    </div>
                    <div className="form-btn flex-form-btm">
                      <div className="field-grid position-relative  row">
                        <div className="col-md-4 col-sm-4 col-xs-12 ps_abs mb-3 mb-sm-0">
                          <div className="form-group">
                            <div className="form-field position-relative dark-input">
                              <div className="coin-icon">
                                <div className="coin-img">
                                  <img
                                    className="img-fluid"
                                    src="../../images/etharium.png"
                                    alt="eth"
                                    width={30}
                                  />
                                </div>
                              </div>
                              <div className="coin-name">
                                <span className="fw-bold">ETH</span>
                              </div>
                              <div className="drop-row">
                                <div className="arow-outer">
                                  <span className="arrow-down"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <div className="form-field two-fld dark-input">
                              <div className="mid-chain w-100 abs_prnt">
                                <input
                                  className="w-100"
                                  type="text"
                                  placeholder="0.00"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="mb-1">
                          <label
                            for=""
                            className="lite-color mt-1 text-end d-block"
                          >
                            Balance: 10 ETH
                          </label>
                        </div>
                        <div className="mb-1">
                          <label
                            for=""
                            className="lite-color mt-1 text-end d-block"
                          >
                            Balance: 10 ETH
                          </label>
                        </div>
                      </div>

                      <div className="coin-text">1 ETH = 1 BONE</div>
                      <div className="row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <button
                            type="button"
                            className={`btn ${
                              approveReview ? "orangeButton" : "blackButton"
                            } w-100`}
                            onClick={() => setApproveReview(false)}
                          >
                            Approve
                          </button>
                        </div>
                        <div className="col-sm-6">
                          <button
                            type="button"
                            className={`btn ${
                              !approveReview ? "orangeButton" : "blackButton"
                            } w-100`}
                            onClick={() => {
                              if (!approveReview) {
                                setSwapModal(true);
                                setSwapState({
                                  step0: true,
                                  step1: false,
                                  step2: false,
                                  title: "Review Swap",
                                });
                                setApproveReview(true);
                              }
                            }}
                          >
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
          title={"Review Swap"}
          show={showSwapModal}
          setShow={setSwapModal}
          externalCls="review-ht"
        >
          {showSwapModal && swapState.step0 && (
            <div className="popmodal-body no-ht">
              <div className="pop-block">
                <div className="pop-top">
                  <div className="cnfrm_box dark-bg-800">
                    <div className="top_overview col-12">
                      <div className="img-flexible">
                        <img
                          class="img-fluid d-inline-block"
                          src="../../images/shib-borderd-icon.png"
                          alt=""
                        />
                      </div>
                      <h6>1000 SHIB</h6>
                      <p>2000.00$</p>
                    </div>
                  </div>
                  <div className="pop-grid flex-grid">
                    <div className="text-center box-block">
                      <button type="button" className="btn primary-btn w-100">
                        ETH
                      </button>
                    </div>
                    <div className="text-center box-block">
                      <div className="d-inline-block">
                        <img
                          class="img-fluid"
                          src="../../images/white-arrow.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="text-center box-block">
                      <button type="button" className="btn primary-btn w-100">
                        BONE
                      </button>
                    </div>
                  </div>
                  <p className="mb-0 text-center">1 ETH = 10 SHIB</p>
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
                  <div className="btn-wrap">
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        href="javascript:void(0)"
                        onClick={() => {
                          setSwapState({
                            step0: false,
                            step1: true,
                            step2: false,
                            title: "Transaction Pending",
                          });
                          setTimeout(() => {
                            setSwapState({
                              step0: false,
                              step1: false,
                              step2: true,
                              title: "Transaction Pending",
                            });
                          }, 2000);
                        }}
                      >
                        Confirm Swap
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transaction Pending popup start*/}
          {showSwapModal && swapState.step1 && (
            <div className="popmodal-body tokn-popup no-ht trans-mod">
              <div className="pop-block">
                <div className="pop-top">
                  <div className="dark-bg-800 h-100 status-sec">
                    <div>
                      <span className="spiner-lg">
                        <span className="spinner-border text-secondary pop-spiner"></span>
                      </span>
                    </div>
                    <p className="mt-5">
                      Sign the transaction in your wallet to complete the swap
                    </p>
                  </div>
                </div>
                <div className="pop-bottom">
                  <div className="btns-sec mt-0">
                    <button type="button" className="btn primary-btn w-100">
                      Sign the message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Transaction Pending popup start*/}

          {/* Transaction Pending popup version 2 start*/}
          {showSwapModal && swapState.step2 && (
            <div className="popmodal-body tokn-popup no-ht trans-mod">
              <div className="pop-block">
                <div className="pop-top">
                  <div className="dark-bg-800 h-100 status-sec">
                    <span>
                      <div>
                        <img
                          width="272"
                          height="272"
                          className="img-fluid"
                          src="../../images/Ellipse.png"
                          alt=""
                        />
                      </div>
                    </span>
                    <p className="mt-5">Swap of ETH to SHIB</p>
                  </div>
                </div>
                <div className="pop-bottom">
                  <div className="staus-btn">
                    <button
                      type="button"
                      className="btn primary-btn w-100"
                      onClick={() => {
                        setSwapModal(false);
                      }}
                    >
                      View on Shibascan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Transaction Pending popup version 2 end*/}
        </CommonModal>

        {/* modal code closed */}

        





      </>
    );
}

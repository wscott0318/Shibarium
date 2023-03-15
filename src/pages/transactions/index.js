/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Sidebar from "../layout/sidebar";
import { useActiveWeb3React } from "app/services/web3";
import InnerHeader from "../inner-header";
import useLocalStorageState from "use-local-storage-state";
import WithdrawModal from "../components/withdraw/Withdraw";
import { BONE_ID } from "app/config/constant";
import { getBoneUSDValue } from "web3/commonFunctions";
export default function Transaction() {
  const [onlyPending, setOnlyPending] = useState(false);
  const [txState, setTxState] = useLocalStorageState("txState"); //NOSONAR
  const {account} = useActiveWeb3React();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const [boneUSDValue, setBoneUSDValue] = useState(0); //NOSONAR
  const handleMenuState = () => {
    setMenuState(!menuState);
  };
  useEffect(() => {
    getBoneUSDValue().then((res) => {
      setBoneUSDValue(res);
    });
  }, [account]);
  console.log("txState", txState?.amount);
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

        {showWithdrawModal && (
          <WithdrawModal
            page="tx"
            dWState={true}
            setWithdrawModalOpen={setShowWithdrawModal}
            show={showWithdrawModal}
            withdrawTokenInput={txState?.amount}
            selectedToken={txState?.token}
          />
        )}

        <section className="assets-section">
          <div className="cmn_dashbord_main_outr">
            <InnerHeader />
            {/* transactions section start */}
            <div className="trnsc_outr">
              <h2>Transactions history</h2>
              <div className="trnsc_inr_cont">
                <div className="trns_top_btns_area row">
                  <div className="col-md-3 col-sm-4 col-xs-12">
                    <button
                      onClick={() => setOnlyPending(false)}
                      className="w-full"
                    >
                      <a
                        href="#"
                        className={`${
                          !onlyPending ? "primary-btn" : "white-btn"
                        } btn w-100`}
                      >
                        All Transactions
                      </a>
                    </button>
                  </div>
                  <div className="col-md-3 col-sm-4 col-xs-12">
                    <button
                      onClick={() => setOnlyPending(true)}
                      className="w-full"
                    >
                      <a
                        href="#"
                        className={`${
                          onlyPending ? "primary-btn" : "white-btn"
                        } btn w-100`}
                      >
                        Pending
                      </a>
                    </button>
                  </div>
                </div>
                <div className="overview_sec">
                  <div className="overview_top_area ">
                    <div className="row">
                      <div className="col-md-4  col-sm-6 col-xs-12 step_no">
                        <span>
                          <span className="spinner-border text-secondary pop-spiner"></span>
                        </span>
                        <div>
                          <b>Withdraw</b>
                          <b>Step 1/2</b>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-12 bone_count">
                        <span>
                          <img
                            src="../../assets/images/red-bone.png"
                            alt="bones"
                            className="img-fluid"
                          />
                        </span>
                        <div>
                          <b>100 BONE</b>
                          <p>500.00$</p>
                        </div>
                      </div>
                      <div className="col-md-4  col-sm-6 col-xs-12 bone_count">
                        <div>
                          <b>Transaction hash</b>
                          <p>0x1a95....ba496</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cont_sec">
                    <div className="row">
                      <div className="col-md-6 col-lg-9 col-xs-12">
                        You are 1 step away, click continue to complete the
                        transaction
                      </div>
                      <div className="col-md-3 col-lg-3 col-xs-12">
                        <button
                          onClick={() => {
                           
                            setShowWithdrawModal(true);
                          }}
                          disabled={txState ? false : true}
                          className="btn primary-btn w-100"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* all transactions table start */}
                <div className="transac-data">
                  {!onlyPending && (
                    <div className="transactions_list_outr">
                      <div className="single_trns_row">
                        <div className="row trns_date">
                          <div className="col-12">19/07/2022</div>
                        </div>
                        <div className="row trns_data">
                          <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
                            <span>
                              <img
                                className="img-fluid me-2"
                                src="../../assets/images/down-arrow.png"
                                alt="meta-img"
                              />
                            </span>
                            <div>
                              <b>Receive</b>
                              <b className="grey_txt">10:30 AM</b>
                            </div>
                          </div>
                          <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
                            <span>
                              <img
                                className="img-fluid me-2"
                                src="../../assets/images/red-bone.png"
                                alt="meta-img"
                              />
                            </span>
                            <div>
                              <b>100 BONE</b>
                              <b className="grey_txt">1000$</b>
                            </div>
                          </div>
                          <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
                            <div>
                              <b>Transaction hash</b>
                              <p className="grey_txt trns_has_add">
                                <span>0x1a95....ba496</span>
                                <a href="#">
                                  <img
                                    src="../../assets/images/grey-arrow.png"
                                    className="img-fluid"
                                  />
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="single_trns_row">
                        <div className="row trns_date">
                          <div className="col-12">19/07/2022</div>
                        </div>
                        <div className="row trns_data">
                          <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
                            <span>
                              <img
                                className="img-fluid me-2"
                                src="../../assets/images/down-arrow.png"
                                alt="meta-img"
                              />
                            </span>
                            <div>
                              <b>Receive</b>
                              <b className="grey_txt">10:30 AM</b>
                            </div>
                          </div>
                          <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
                            <span>
                              <img
                                className="img-fluid me-2"
                                src="../../assets/images/red-bone.png"
                                alt="meta-img"
                              />
                            </span>
                            <div>
                              <b>100 BONE</b>
                              <b className="grey_txt">1000$</b>
                            </div>
                          </div>
                          <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
                            <div>
                              <b>Transaction hash</b>
                              <p className="grey_txt trns_has_add">
                                <span>0x1a95....ba496</span>
                                <a href="#">
                                  <img
                                    src="../../assets/images/grey-arrow.png"
                                    className="img-fluid"
                                  />
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="single_trns_row">
                        <div className="row trns_date">
                          <div className="col-12">19/07/2022</div>
                        </div>
                        <div className="row trns_data">
                          <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
                            <span>
                              <img
                                className="img-fluid me-2"
                                src="../../assets/images/down-arrow.png"
                                alt="meta-img"
                              />
                            </span>
                            <div>
                              <b>Receive</b>
                              <b className="grey_txt">10:30 AM</b>
                            </div>
                          </div>
                          <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
                            <span>
                              <img
                                className="img-fluid me-2"
                                src="../../assets/images/red-bone.png"
                                alt="meta-img"
                              />
                            </span>
                            <div>
                              <b>100 BONE</b>
                              <b className="grey_txt">1000$</b>
                            </div>
                          </div>
                          <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
                            <div>
                              <b>Transaction hash</b>
                              <p className="grey_txt trns_has_add">
                                <span>0x1a95....ba496</span>
                                <a href="#">
                                  <img
                                    src="../../assets/images/grey-arrow.png"
                                    className="img-fluid"
                                  />
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* all transactions table ends */}

                {/* pending transactions table start */}
                {/* <div className="transactions_list_outr">
                                  
                            </div> */}
                {/* pending transactions table ends */}

                <div className="cstm_pagination">
                  <div className="pag_con">
                    <div className="left_block">
                      <span>
                        <img
                          src="../../assets/images/download-icon.png"
                          className="img-fluid"
                        />
                      </span>
                      <b>Download CSV</b>
                    </div>
                    <div className="right_block">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Previous
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              3
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Next
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* transactions section end */}
          </div>
        </section>
      </main>
    </>
  );
}

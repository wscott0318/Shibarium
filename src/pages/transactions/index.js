/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import CommonModal from "../components/CommonModel";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import Sidebar from "../layout/sidebar";
import { useActiveWeb3React } from "app/services/web3";
import InnerHeader from "../../pages/inner-header";
import useLocalStorageState from "use-local-storage-state";
import WithdrawModal from "../components/Withdraw";
export default function Transaction() {
  const router = useRouter();
  const [onlyPending, setOnlyPending] = useState(false);
  const [txState, setTxState] = useLocalStorageState("txState");
  const [showSendModal, setSendModal] = useState({
    step0: true,
    step1: false,
    step2: false,
    step3: false,
    title: "Reaching Checkpoint",
  });
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [menuState, setMenuState] = useState(false);

  const { account } = useActiveWeb3React();
  // const account = useAccount()

  const connectToMetamask = () => {
    // authenticate()
    // activate(walletConnector)
  };

  const [showModal, setShowModal] = useState(false);

  function getErrorMessage(error) {
    if (error instanceof NoEthereumProviderError) {
      return "Please install metamask and try again.";
    } else if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect
    ) {
      return "Please authorize this website to access your Ethereum account.";
    } else {
      console.error(error);
      return "";
    }
  }

  const handleMenuState = () => {
    setMenuState(!menuState);
  };
  console.log("txState", txState);
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

        {showWithdrawModal && <WithdrawModal
          page="tx"
          dWState={true}
          setWithdrawModalOpen={setShowWithdrawModal}
          show={showWithdrawModal}
          withdrawTokenInput={txState?.amount}
        />}

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
                            setSendModal({
                              step0: true,
                              step1: false,
                              step2: false,
                              step3: false,
                              title: txState?.checkpointSigned
                                ? "Reached Checkpoint"
                                : "Signing Checkpoints",
                            });
                            setShowWithdrawModal(true);
                          }}
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";

import { Button, Container, Nav, Navbar, NavDropdown, Dropdown, Modal } from 'react-bootstrap';

import { useRouter } from "next/dist/client/router";
import Popup from "../components/PopUp";
// import { useWeb3React } from '@web3-react/core'
// import { Web3Provider } from '@ethersproject/providers'
// import  ProjectContext  from "../../context/ProjectContext";
// import { useAccount } from "../../../hooks/web3hooks";
// import { walletConnector } from "../../utils/connectors";
// import Web3 from "web3";
import CommonModal from "../components/CommonModel";
import Link from 'next/link'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import Sidebar from "../layout/sidebar"
import Web3Status from "app/components/Web3Status";
import { useActiveWeb3React } from "app/services/web3";
import { useMoralis } from "react-moralis";
// import Web3Status from "app/components/Web3Status";  
import InnerHeader from "../../pages/inner-header";

export default function Transaction() {
  const router = useRouter()
  // const { authenticate, isAuthenticated, user,} = useMoralis();

  // const {handleAccount}=useContext(ProjectContext)
  const [showSendModal, setSendModal] = useState(false);
  const [menuState, setMenuState] = useState(false);

  const { account } = useActiveWeb3React()
  // const account = useAccount()

  const connectToMetamask = () => {
    // authenticate()
    // activate(walletConnector)
  }


  // useEffect(() => {
  //   if (library) {
  //    let web3 =  new Web3(library?.provider)
  //    const publicAddress = account;
  //    if ( publicAddress && web3 && web3.eth &&  web3.eth.personal) {
  //      web3.eth.personal.sign(
  //       'Welcome to Shibarium',
  //       publicAddress,
  //       ()=>{}
  //     )
  //    }
  //   }
  // }, [library,account])


  // useEffect(()=>{
  //  const isLoggedIn =  localStorage.getItem('isLoggedIn')
  //  if (isLoggedIn) {
  //    connectToMetamask()
  //  }
  // },[])
  useEffect(() => {
    if (account) {
      // handleAccount(account)
      // router.push('/assets')
    }
  }, [account]);
  // useEffect(() => {
  //   // if(error){
  //   //   const errorMsg = getErrorMessage(error)
  //   //  alert(errorMsg)
  //   //  }
  // },[error]);

  function getErrorMessage(error) {
    if (error instanceof NoEthereumProviderError) {
      return 'Please install metamask and try again.'
    } else if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network."
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect
    ) {
      return 'Please authorize this website to access your Ethereum account.'
    }
    else {
      console.error(error)
      return ''
    }
  }


  const handleMenuState = () => {
    setMenuState(false)
  }


  return (
    <>
      <main className="main-content">
        <Sidebar handleMenuState={handleMenuState} menuState={menuState} />


        <CommonModal
          title={"Reaching Checkpoint"}
          show={showSendModal}
          setShow={setSendModal}
        >
          <>
            {/* Reaching Checkpoint popop start  */}
            <div className="cmn_modal trans_popups">
              <ul className="stepper mt-3">
                <li className="step active">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Reaching Checkpoint
                  </div>
                </li>
                <li className="step">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Checkpoint I
                  </div>
                </li>
                <li className="step">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Withdrawing Funds
                  </div>
                </li>
                <li className="step">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Withdraw Completed
                  </div>
                </li>
              </ul>
              <div className="image_area row">
                <div className="col-12 text-center">
                  <img className="img-fluid" src="../../images/watch.png" />
                </div>
              </div>
              <div className="mid_text row">
                <div className="col-12 text-center"><h4>Bridging funds</h4></div>
                <div className="col-12 text-center"><p>Bridging funds from Shibarium Chain to Ethereum Chain the transaction will take from 60 min to 3 hrs</p></div>
              </div>
              <div className="fees_text">
                <div className="icon_name">
                  <img src="../../images/eth-icon.png" /><span>Estimation of GAS fee required</span>
                </div>
                <div className="">
                  <p>$10.00</p>
                </div>
              </div>
              <div className="pop_btns_area row form-control">
                <div className="col-12">
                  <a className='btn grey-btn d-flex align-items-center' href="javascript:void(0)">
                    <img src="../../images/track-small.png" />
                    <span>Close</span>
                  </a>
                </div>
              </div>
            </div>
            {/* Reaching Checkpoint popop end  */}


            {/* Checkpoint reached popop start  */}  
            {/* <div className="cmn_modal trans_popups">
              <ul className="stepper mt-3">
                <li className="step active">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Reaching Checkpoint
                  </div>
                </li>
                <li className="step active">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Checkpoint I
                  </div>
                </li>
                <li className="step">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Withdrawing Funds
                  </div>
                </li>
                <li className="step">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Withdraw Completed
                  </div>
                </li>
              </ul>
              <div className="image_area row">
                <div className="col-12 text-center">
                  <img className="img-fluid" src="../../images/funds-coin.png" />
                </div>
              </div>
              <div className="mid_text row">
                <div className="col-12 text-center"><h4>Move Funds to your account</h4></div>
                <div className="col-12 text-center"><p>Moving funds from Ethereum Mainnet to Wallet: 0x21a...48a5</p></div>
              </div>
              <div className="fees_text">
                <div className="icon_name">
                  <img src="../../images/eth-icon.png" /><span>Estimation of GAS fee required</span>
                </div>
                <div className="">
                  <p>$10.00</p>
                </div>
              </div>
              <div className="pop_btns_area row form-control">
                <div className="col-12">
                  <a className='btn primary-btn d-flex align-items-center' href="javascript:void(0)">
                    <span>Confirm</span>
                  </a>
                </div>
              </div>
            </div> */}
            {/* Checkpoint reached popop ends  */}  

             {/* Checkpoint reached popop 2 start  */}  
             {/* <div className="cmn_modal trans_popups">
              <ul className="stepper mt-3">
                <li className="step active">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Reaching Checkpoint
                  </div>
                </li>
                <li className="step active">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Checkpoint I
                  </div>
                </li>
                <li className="step active">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Withdrawing Funds
                  </div>
                </li>
                <li className="step">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Withdraw Completed
                  </div>
                </li>
              </ul>
              <div className="image_area row">
                <div className="col-12 text-center">
                  <img className="img-fluid" src="../../images/watch.png" />
                </div>
              </div>
              <div className="mid_text row">
                <div className="col-12 text-center"><h4>Move Funds to your account</h4></div>
                <div className="col-12 text-center"><p>Moving funds from Ethereum Mainnet to Wallet: 0x21a...48a5</p></div>
              </div>
              <div className="fees_text">
                <div className="icon_name">
                  <img src="../../images/eth-icon.png" /><span>Estimation of GAS fee required</span>
                </div>
                <div className="">
                  <p>$10.00</p>
                </div>
              </div>
              <div className="pop_btns_area row form-control">
                <div className="col-12">
                  <a className='btn grey-btn d-flex align-items-center' href="javascript:void(0)">
                    <img src="../../images/track-small.png" />
                    <span>Moving funds</span>
                  </a>
                </div>
              </div>
            </div> */}
            {/* Checkpoint reached popop 2 ends  */}  


              {/* Checkpoint reached popop 3 start  */}  
             {/* <div className="cmn_modal trans_popups">
              <ul className="stepper mt-3">
                <li className="step active">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Reaching Checkpoint
                  </div>
                </li>
                <li className="step active">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Checkpoint I
                  </div>
                </li>
                <li className="step active">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Withdrawing Funds
                  </div>
                </li>
                <li className="step active">
                  <div className="step-ico">
                    <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                  </div>
                  <div className="step-title">
                    Withdraw Completed
                  </div>
                </li>
              </ul>
              <div className="image_area row">
                <div className="col-12 text-center">
                  <img className="img-fluid" src="../../images/thumb-up-icon.png" />
                </div>
              </div>
              <div className="mid_text row">
                <div className="col-12 text-center"><h4>Move Funds to your account</h4></div>
                <div className="col-12 text-center"><p>Moving funds from Ethereum Mainnet to Wallet: 0x21a...48a5</p></div>
              </div>
              <div className="fees_text">
                <div className="icon_name">
                  <img src="../../images/eth-icon.png" /><span>Estimation of GAS fee required</span>
                </div>
                <div className="">
                  <p>$10.00</p>
                </div>
              </div>
              <div className="pop_btns_area row form-control">
                <div className="col-12">
                  <a className='btn primary-btn d-flex align-items-center' href="javascript:void(0)">
                    <span>Confirm</span>
                  </a>
                </div>
              </div>
            </div> */}
            {/* Checkpoint reached popop 3 ends  */}   

          </>
        </CommonModal >

        <section className="assets-section">
          <div className="cmn_dashbord_main_outr">
            <InnerHeader />
            {/* transactions section start */}
            <div className="trnsc_outr">
              <h2>Transactions history</h2>
              <div className="trnsc_inr_cont">
                <div className="trns_top_btns_area row">
                  <div className="col-md-3 col-sm-4 col-xs-12"><a href="#" className="primary-btn btn w-100">All Transactions</a></div>
                  <div className="col-md-3 col-sm-4 col-xs-12"><a href="#" className="white-btn btn w-100">Pending</a></div>
                </div>
                <div className="overview_sec">
                  <div className="overview_top_area ">
                    <div className="row">
                      <div className="col-md-4  col-sm-6 col-xs-12 step_no">
                        <span><img src="../../images/track.png" alt="loading" /></span>
                        <div>
                          <b>Whitdraw</b>
                          <b>Step 1/2</b>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-12 bone_count">
                        <span><img src="../../images/red-bone.png" alt="bones" /></span>
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
                      <div className="col-md-6 col-xs-12">You are 1 step away, click continue to complete the transaction</div>
                      <div className="col-md-3 col-xs-12"><button onClick={() => setSendModal(true)} className="btn primary-btn w-100">Continue</button></div>
                    </div>
                  </div>
                </div>
                {/* all transactions table start */}
                <div className="transactions_list_outr">
                  <div className="single_trns_row">
                    <div className="row trns_date">
                      <div className="col-12">19/07/2022</div>
                    </div>
                    <div className="row trns_data">
                      <div className="col-4 cmn_data">
                        <span><img className="img-fluid me-2" src="../../images/down-arrow.png" alt="meta-img" /></span>
                        <div>
                          <b>Recive</b>
                          <b className="grey_txt">10:30 AM</b>
                        </div>
                      </div>
                      <div className="col-4 cmn_data">
                        <span><img className="img-fluid me-2" src="../../images/red-bone.png" alt="meta-img" /></span>
                        <div>
                          <b>100 BONE</b>
                          <b className="grey_txt">1000$</b>
                        </div>
                      </div>
                      <div className="col-4 cmn_data">
                        <div>
                          <b>Transaction hash</b>
                          <p className="grey_txt trns_has_add"><span>0x1a95....ba496</span><a href="#"><img src="../../images/grey-arrow.png" /></a></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="single_trns_row">
                    <div className="row trns_date">
                      <div className="col-12">19/07/2022</div>
                    </div>
                    <div className="row trns_data">
                      <div className="col-4 cmn_data">
                        <span><img className="img-fluid me-2" src="../../images/down-arrow.png" alt="meta-img" /></span>
                        <div>
                          <b>Recive</b>
                          <b className="grey_txt">10:30 AM</b>
                        </div>
                      </div>
                      <div className="col-4 cmn_data">
                        <span><img className="img-fluid me-2" src="../../images/red-bone.png" alt="meta-img" /></span>
                        <div>
                          <b>100 BONE</b>
                          <b className="grey_txt">1000$</b>
                        </div>
                      </div>
                      <div className="col-4 cmn_data">
                        <div>
                          <b>Transaction hash</b>
                          <p className="grey_txt trns_has_add"><span>0x1a95....ba496</span><a href="#"><img src="../../images/grey-arrow.png" /></a></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="single_trns_row">
                    <div className="row trns_date">
                      <div className="col-12">19/07/2022</div>
                    </div>
                    <div className="row trns_data">
                      <div className="col-4 cmn_data">
                        <span><img className="img-fluid me-2" src="../../images/down-arrow.png" alt="meta-img" /></span>
                        <div>
                          <b>Recive</b>
                          <b className="grey_txt">10:30 AM</b>
                        </div>
                      </div>
                      <div className="col-4 cmn_data">
                        <span><img className="img-fluid me-2" src="../../images/red-bone.png" alt="meta-img" /></span>
                        <div>
                          <b>100 BONE</b>
                          <b className="grey_txt">1000$</b>
                        </div>
                      </div>
                      <div className="col-4 cmn_data">
                        <div>
                          <b>Transaction hash</b>
                          <p className="grey_txt trns_has_add"><span>0x1a95....ba496</span><a href="#"><img src="../../images/grey-arrow.png" /></a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* all transactions table ends */}


                {/* pending transactions table start */}
                {/* <div className="transactions_list_outr">
                                  
                            </div> */}
                {/* pending transactions table ends */}

                <div className="cstm_pagination">
                  <div className="pag_con">
                    <div className="left_block">
                      <span><img src="../../images/download-icon.png" /></span>
                      <b>Download CSV</b>
                    </div>
                    <div className="right_block">
                      <nav aria-label="Page navigation example">
                        <ul class="pagination">
                          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                          <li class="page-item"><a class="page-link" href="#">1</a></li>
                          <li class="page-item"><a class="page-link" href="#">2</a></li>
                          <li class="page-item"><a class="page-link" href="#">3</a></li>
                          <li class="page-item"><a class="page-link" href="#">Next</a></li>
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

      </main >
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Nav} from "react-bootstrap";
import DogTab from './dogTabfirst';
import DogTabfirst from './dogTabsecond';
import Footer from "../../pages/footer/index"
import  CommonModal from "../components/CommonModel";
import Header from "../layout/header";
import StakingHeader from '../staking-header'


export default function faucet() {
  const [isTopdoG, setIsTopdoG] = useState(true);
  const [isPuppyDog, setIsPuppyDog] = useState(false);
  const [showSwapModal, setSwapModal] = useState(false);
  const handleTopdoG = () => {
      // console.log("handleTopdoG");
    setIsTopdoG(true);
    setIsPuppyDog(false);
  };
  const handlePuppyDog = () => {
      // console.log("handlePuppyDog");
    setIsTopdoG(false);
    setIsPuppyDog(true);
  };

  // console.log("isTopdoG",isTopdoG);
  // console.log("isPuppyDog",isPuppyDog);
  return (
    <>
     <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh top-space">
          <Header />
          {/* <StakingHeader /> */}
    {/* Form section start */}
        <div className="container">

              <div className='swap-card cus-card-800'>
                  <div className="swp-header">
                      <div className='swp-left-col mb-3 mb-lg-3 mb-xl-4'>
                          <h3 className=''>
                              Get Test Tokens
                          </h3>       
                          <p className='grey-txt'>This faucet transfers TestToken on Matic testnets and parent chain. Confirms details before submitting.</p>
                      </div>
                  </div>

                  <div className="fau_tabs_area">
                    {/* <div className="tab-sec botom-spcing">
                      <ul className="tab-links">
                        <li><a className="tb-link tab-active" href="javascript:void(0);">Topdog</a></li>
                        <li><a className="tb-link" href="javascript:void(0);">Puppydog</a></li>
                      </ul>
                    </div> */}
                    <div className="tab-content-sec h-100">
                        <div className="faucet-form">
                              <div className="form-section">
                                <div className="">
                                  <div className=" "> 
                                    <form>
                                      <div className="form-field dark-input botom-spc">
                                        <div className="cus-sel ms-0 position-relative">
                                          <select class="form-select" >
                                            <option selected>Select Token</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                          </select>
                                          <i className="arrow-down"></i>
                                        </div>
                                      </div>
                                      <div className="botom-spc">                         
                                        <div className="form-group">
                                            <div className="form-field dark-input">
                                                <div className="mid-chain w-100 position-relative">
                                                    <input className="w-100" type="text" placeholder="Insert a custom value" />
                                                    <a href="javascript:void(0);" className="orange-btn">Paste</a>
                                                </div> 
                                            </div> 
                                        </div>
                                      </div>
                                      <div>
                                        <button onClick={()=>setSwapModal(true)} type="button" className="btn primary-btn w-100">Submit</button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            
                        </div>
                    </div>
                  </div>
              </div>
        </div> 
      {/* Form section end */}
      </main> 
      {/* Review model code start */}
      <CommonModal
                title={"Review Swap"}
                show={showSwapModal}
                setShow={setSwapModal}
                externalCls="review-ht"
            >
                   {/* Review model code start */}              
                  <div className="popmodal-body no-ht">
                    <div className="pop-block">
                        <div className="pop-top">
                            <div className="cnfrm_box dark-bg-800">
                                <div className="top_overview col-12">
                                    <div className='img-flexible'><img class="img-fluid d-inline-block" src="../../images/shib-borderd-icon.png" alt="" /></div>
                                    <h6>1000 SHIB</h6>
                                    <p>2000.00$</p>
                                </div>
                            </div>
                            <div className="pop-grid flex-grid">
                                <div className="text-center box-block">
                                    <button type='button' className='btn primary-btn w-100'>ETH</button>
                                </div>
                                <div className="text-center box-block">
                                    <div className="d-inline-block">
                                        <img class="img-fluid" src="../../images/white-arrow.png" alt="" />
                                    </div>
                                </div>
                                <div className="text-center box-block">
                                    <button type='button' className='btn primary-btn w-100'>BONE</button>
                                </div>
                            </div>
                            <p className='mb-0 text-center'>1 ETH = 10 SHIB</p>

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
                            <div className='btn-wrap'>
                            <div>
                              <a className='btn primary-btn w-100' href="javascript:void(0)" onClick={()=>{
                                setSwapState({
                                    step0:false,
                                    step1:true,
                                    step2:false,
                                    title:"Transaction Pending"
                                })
                                setTimeout(()=>{
                                  setSwapState({
                                    step0: false,
                                    step1: false,
                                    step2: true,
                                    title: "Transaction Pending",
                                  });
                                },2000)
                              }}>Confirm Swap</a>
                            </div>
                            </div>
                        </div>
                    </div>
                  </div>
                {/* Review model code start */}

                {/* Transaction Pending popup start*/}
                 {/* <div className="popmodal-body tokn-popup no-ht trans-mod">
                  <div className="pop-block">
                    <div className="pop-top">
                        <div className='dark-bg-800 h-100 status-sec'>
                            <div>
                                <span className='spiner-lg' >
                                    <span className="spinner-border text-secondary pop-spiner"></span>
                                </span>
                            </div>
                            <p className='mt-5'>Sign the transaction in your wallet to complete the swap</p>
                        </div>
                    </div>
                    <div className="pop-bottom">
                      <div className='btns-sec mt-0'>
                        <button type='button' className='btn primary-btn w-100'>Sign the message</button>
                      </div>
                    </div>
                  </div>
                </div>  */}
                {/* Transaction Pending popup start*/}

                {/* Transaction Pending popup version 2 start*/}
                 {/* <div className="popmodal-body tokn-popup no-ht trans-mod">
                  <div className="pop-block">
                    <div className="pop-top">
                        <div className='dark-bg-800 h-100 status-sec'>
                            <span>
                                <div><img width="272" height="272" className="img-fluid" src="../../images/Ellipse.png" alt="" /></div>
                            </span>
                            <p className='mt-5'>Swap of ETH to SHIB</p>
                        </div>
                    </div>
                    <div className="pop-bottom">
                      <div className='staus-btn'>
                        <button type='button' className='btn primary-btn w-100' }}>
                        View on Shibascan</button>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* Transaction Pending popup version 2 end*/}



            </CommonModal>
            {/* Review model code end */}
    </>
  );

  
}
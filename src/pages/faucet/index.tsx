/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import DogTab from './dogTabfirst';
import DogTabfirst from './dogTabsecond';
import Footer from "../footer/index"
import CommonModal from "../components/CommonModel";
import Header from "../layout/header";
import StakingHeader from '../staking-header'
import InnerHeader from "../../pages/inner-header";
import Sidebar from "../layout/sidebar"


export default function faucet() {
  const [isTopdoG, setIsTopdoG] = useState(true);
  const [isPuppyDog, setIsPuppyDog] = useState(false);
  const [showSwapModal, setSwapModal] = useState(false);
  const [menuState, setMenuState] = useState(false);

  const handleMenuState = () => {
    console.log("called click")
    setMenuState(!menuState);
  }

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

  const callFaucetAPI = async () => {
    setSwapModal(true)
    setModalState({
      pending: true,
      done:false,
      hash:''
    })
    await axios.get(`http://3.17.79.146:5000/faucet/${account}`)
    .then((res:any ) => {
      console.log(res.data)
      setModalState({
        pending: false,
        done:true,
        hash:res.data.transectionHash
      })
    }).catch((err) => {
      console.log(err)
      setModalState({
        pending: false,
        done:true,
        hash:''
      })
    })
  }

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
        {/* Form section start */}
        <div className="cmn_dashbord_main_outr">
          <InnerHeader />

          <h2 className="mb-4">Faucet</h2>
          <div className='swap-card cus-card-800'>
            <div className="swp-header">
              <div className='swp-left-col mb-3 mb-lg-3 mb-xl-4'>
                <h3 className='mb-3'>
                  Get Gas Coin
                </h3>
                <p className='grey-txt'>This faucet transfers Gas Coin on Shibarium testnet. Confirms details before submitting.</p>
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
                          <div className="botom-spc">
                            <div className="form-group">
                              <div className="form-field dark-input">
                                <div className="mid-chain w-100 position-relative">
                                  <input
                                   className="w-100"
                                    type="text"
                                    placeholder="Insert a custom value"
                                    disabled
                                    // @ts-ignore
                                    value={account}
                                     />
                                  {/* <a href="javascript:void(0);" className="orange-btn">Paste</a> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button onClick={() => callFaucetAPI()} type="button" className="btn primary-btn w-100">Submit</button>
                          </div>
                          <button
                              type="button"
                              onClick={() => {
                                throw new Error("Sentry Frontend Error");
                              }}
                            >
                              Throw error
                            </button>
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
        title={modalState.pending ? "Pending" : 'Done'}
        show={showSwapModal}
        setShow={setSwapModal}
        externalCls="review-ht"
      >
        {/* Transaction Pending popup start*/}
       {modalState.pending && <div className="popmodal-body tokn-popup no-ht trans-mod">
          <div className="pop-block">
            <div className="pop-top">
              <div className='dark-bg-800 h-100 status-sec'>
                <div>
                  <span className='spiner-lg' >
                    <span className="spinner-border text-secondary pop-spiner"></span>
                  </span>
                </div>
                {/* <p className='mt-5'>Lorem ipsum dolor sit amet.</p> */}
              </div>
            </div>
            {/* <div className="pop-bottom">
              <div className='btns-sec mt-0'>
                <button type='button' className='btn primary-btn w-100'>Sign the message</button>
              </div>
            </div> */}
          </div>
        </div>}

        {/* Transaction Pending popup end*/}

        {/* Transaction Pending popup version 2 start*/}

        {modalState.done && <div className="popmodal-body tokn-popup no-ht trans-mod">
          <div className="pop-block">
            <div className="pop-top">
              <div className='dark-bg-800 h-100 status-sec'>
                <span>
                  <div><img width="224" height="224" className="img-fluid" src="../../images/Ellipse.png" alt="" /></div>
                </span>
              </div>
            </div>
            <div className="pop-bottom">
            <p className='mt-5'>{modalState.hash}</p>
              <div className='staus-btn'>
                <button type='button' className='btn primary-btn w-100'>
                  View on Shibascan</button>
                  <button
  type="button"
  onClick={() => {
    throw new Error("Sentry Frontend Error");
  }}
>
  Throw error
</button>
              </div>
            </div>
          </div>
        </div>}
        {/* Transaction Pending popup version 2 end*/}
      </CommonModal>
      {/* Review model code end */}
    </>
  );


}
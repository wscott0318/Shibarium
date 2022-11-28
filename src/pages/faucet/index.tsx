/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState,useEffect, useRef } from "react";
import { Nav } from "react-bootstrap";
import DogTab from './dogTabfirst';
import DogTabfirst from './dogTabsecond';
import Footer from "../footer/index"
import CommonModal from "../components/CommonModel";
import Header from "../layout/header";
import StakingHeader from '../staking-header'
import InnerHeader from "../../pages/inner-header";
import Sidebar from "../layout/sidebar"
import axios from "axios";
import { useActiveWeb3React } from "app/services/web3";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";

export default function faucet() {
  const [isTopdoG, setIsTopdoG] = useState(true);
  const [isPuppyDog, setIsPuppyDog] = useState(false);
  const [showSwapModal, setSwapModal] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const router = useRouter()
  const captchaRef = useRef<any>(null)
  const [modalState, setModalState] = useState({
    pending: true,
    done: false,
    hash: ''
  })
  const { chainId = 1, account, library } = useActiveWeb3React();

  const handleMenuState = () => {
    console.log("called click")
    setMenuState(!menuState);
  }

  useEffect(() => {
    if(!account){
      router.back()
    }
  }, [account])
  

  console.log(chainId, account, library)
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
      done: false,
      hash: ''
    })
    await axios.get(`https://dev-faucet.hailshiba.com/api/faucet/${account}`)
      .then((res: any) => {
        console.log(res.data)
        setModalState({
          pending: false,
          done: true,
          hash: res.data.transectionHash
        })
      }).catch((err) => {
        console.log(err)
        setModalState({
          pending: false,
          done: true,
          hash: ''
        })
      })
  }

  const [clickedCaptcha, setClickedCaptcha] = useState(false)

  const handleCaptcha = (e: any) => {
  
    console.log("receptcha event ", e)
    setClickedCaptcha(true);
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

          <div className='swap-card cus-card-800'>
            <div className="swp-header">
              <div className='swp-left-col mb-3 mb-lg-3 mb-xl-4'>
                <h2 className="mb-4">Faucet</h2>
                <h6 className='mb-2'>
                  Get Gas Coin
                </h6>
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
                            <button disabled={!clickedCaptcha} onClick={() => callFaucetAPI()} type="button" className="btn primary-btn w-100">Submit</button>
                          </div>

                          <div className="captcha-wrap mt-3 mt-sm-4" >
                            <ReCAPTCHA
                              sitekey='6LdDZXQiAAAAAPUZI155WAGKKhM1vACSu05hOLGP'
                              onChange={handleCaptcha}
                              onExpired={()=>setClickedCaptcha(false)}
                            />
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
        title={modalState.pending ? "Pending" : 'Done'}
        show={showSwapModal}
        setshow={setSwapModal}
        externalCls="faucet-pop">
        <div className="popmodal-body tokn-popup no-ht trans-mod">
          <div className="pop-block">
            <div className="pop-top">
              <div className='dark-bg-800 h-100 status-sec'>
                <span>
                  <div><img width="224" height="224" className="img-fluid" src="../../assets/images/Ellipse.png" alt="" /></div>
                </span>
              </div>
            </div>
            <div className="pop-bottom">
              <p className='elip-text mt-3'>{modalState.hash}</p>
              <div className='staus-btn'>
                <button
                  type='button'
                  className='btn primary-btn w-100'
                  disabled={modalState.hash ? false : true}
                >
                  View on Shibascan</button>
              </div>
            </div>
          </div>
        </div>
        {/* Transaction Pending popup version 2 end*/}
      </CommonModal>
      {/* Review model code end */}
    </>
  );


}
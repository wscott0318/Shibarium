/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import  CommonModal from "../components/CommonModel";
import Header from "../layout/header";
import StakingHeader from '../staking-header'
export default function DelegatorAccount() {
  // const {account}=useContext(ProjectContext)

  // const { active,deactivate } = useWeb3React()
  // const [accountsAddress, setAccountsAddress] = useState("");
  // useEffect(() => {
  //   setAccountsAddress(localStorage.getItem("accounts"));
  //   console.log('chainId',chainId)
  //   console.log('account-home',account)
  // },[account]);
  const { account, chainId = 1 } = useActiveWeb3React();
  const [showvalidatorpop, setvalidatorpop] = useState(false);
  const [showcommissionpop, setcommissionpop] = useState(false);
  const [showwithdrawpop, setwithdrawpop] = useState(false);
  const [showunboundpop, setunboundpop] = useState(false);
  const [showallinonepop, setallinonepop] = useState(false);
  
  /**
   * 
    useEffect(()=>{
      let userDetails = localStorage.getItem('ShibariumUser');
      userDetails = userDetails ? JSON.parse(userDetails)?.objectId: ''
      if (!userDetails && active) {
        deactivate()
      }

    },[active])
  */

 

  //  console.log('account---------------', account)
  return (
    <>
      <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh top-space">
          <Header />
          <StakingHeader />

{/* retake popop start */}
      <CommonModal
          title={"Retake"}
          show={showvalidatorpop}
          setShow={setvalidatorpop}
          
          >
          <>

                
                <div className="cmn_modal val_popups">              
                    <form>
                        <div className="cmn_inpt_row">
                            <div className="form-control">
                                <input type="text" placeholder="Enter validator address" className="w-100"/>
                            </div>
                        </div>
                        <div className="cmn_inpt_row">
                            <div className="form-control">
                                <input type="text" placeholder="Enter delegator address" className="w-100"/>
                            </div>
                        </div>
                        <div className="cmn_inpt_row">
                            <div className="form-control">
                                <input type="text" placeholder="Enter amount" className="w-100"/>
                            </div>
                        </div>
                        <div className="pop_btns_area">
                            <div className="form-control"><a className='btn primary-btn w-100' href="javascript:void(0)">Submit</a>  </div>
                        </div>                         
                    </form>      
                </div>
                
                </> 
          </CommonModal>
{/* retake popop ends */} 

{/* withdraw popop start */}
<CommonModal
          title={"Withdraw Rewards"}
          show={showwithdrawpop}
          setShow={setwithdrawpop}
          
          >
          <>                
                <div className="cmn_modal val_popups">              
                    <form>
                        <div className="cmn_inpt_row">
                            <div className="form-control">
                                <input type="text" placeholder="Enter validator address" className="w-100"/>
                            </div>
                        </div> 
                        <div className="cmn_inpt_row">
                            <div className="form-control">
                                <input type="text" placeholder="Enter delegator address" className="w-100"/>
                            </div>
                        </div> 
                        <div className="pop_btns_area">
                            <div className="form-control"><a className='btn primary-btn w-100' href="javascript:void(0)">Submit</a>  </div>
                        </div>                         
                    </form>      
                </div>
                
                </> 
          </CommonModal>
{/* withdraw popop ends */} 


{/* unbound popop start */}
<CommonModal
          title={"Unbound"}
          show={showunboundpop}
          setShow={setunboundpop}
          
          >
          <>                
                <div className="cmn_modal val_popups">              
                    <form>
                        <div className="">
                             <p className="text-center">Are you sure you want to unbound?</p>
                        </div> 
                        <div className="pop_btns_area row mr-top-50 form-control">
                            <div className="col-6"><a className='btn dark-bg-800 text-white w-100' href="javascript:void(0)">Cancel</a>  </div>
                            <div className="col-6"><a className='btn primary-btn w-100' href="javascript:void(0)">Confirm</a>  </div>
                        </div>                         
                    </form>      
                </div>
                
                </>   
          </CommonModal>
{/* unbound popop ends */} 


{/* all in one popop start */}
<CommonModal
          title={"Delegate"}
          show={showallinonepop}
          setShow={setallinonepop}
          
          >
          <>                
                <div className="cmn_modal vali_deli_popups">              
                    <ul className="stepper mt-3">
                        <li className="step active">
                        <div className="step-ico">
                            <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                        </div>
                        <div className="step-title">
                            Approve
                        </div>
                        </li>
                        <li className="step">
                        <div className="step-ico">
                            <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                        </div>
                        <div className="step-title">
                            Delegate
                        </div>
                        </li>
                        <li className="step">
                        <div className="step-ico">
                            <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                        </div>
                        <div className="step-title">
                            Completed
                        </div>
                        </li>
                        {/* <li className="step">
                        <div className="step-ico">
                            <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                        </div>
                        <div className="step-title">
                            Withdraw Completed
                        </div>
                        </li> */}
                    </ul> 
                    <div className="step_content">
                        <div className="image_area row">
                            <div className="col-12 text-center watch-img-sec">
                                {/* <img className="img-fluid" src="../../images/progrs-img-2.png" /> */}
                                {/* <img className="img-fluid" src="../../images/progrs-img.png" /> */}
                                <img className="img-fluid" src="../../images/cmpete-step.png" />
                            </div>
                        </div>
                        <div className="mid_text row">
                            {/* <div className="col-12 text-center"><h4>Transaction in progress</h4></div> */}
                            {/* <div className="col-12 text-center"><h4>Buy Voucher</h4></div> */}
                            {/* <div className="col-12 text-center"><p>Completing this transaction will stake your Burn tokens and you will start earning rewards for the upcoming checkpoints.</p></div> */}
                            {/* <div className="col-12 text-center"><h4>Transaction in progress</h4></div>
                            <div className="col-12 text-center"><p>Ethereum transactions can take longer time to complete based  upon network congestion. Please wait for increase the gas price of the transaction</p></div> */}
                            <div className="col-12 text-center"><h4>Delegation completed</h4></div>
                            <div className="col-12 text-center"><p>Your SHIBA tokens are staked successfully on validator Tarus Validator. Your delegation will take-1 mintue to reflect in your account.</p></div>
                        </div>
                        <div className="fees_text">
                            <div className="icon_name">
                                <span>Estimated transaction fee</span>
                            </div>
                            <div className="">
                            <p>$10.00</p>
                            </div>
                        </div>
                        <div className="pop_btns_area row form-control">
                            <div className="col-12">
                                {/* <a className='btn primary-btn d-flex align-items-center' href="javascript:void(0)">                             
                                    <span>Buy voucher</span>
                                </a> */}
                                <a className='btn primary-btn d-flex align-items-center' href="javascript:void(0)">                             
                                    <span>View on Etherscan</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                </>   
          </CommonModal>
{/* all in one popop ends */} 



            <section className="top_bnr_area dark-bg">
                <div className="container">
                    <h1>My Account</h1>
                </div>                
            </section> 

            <section className="mid_cnt_area">
                <div className="container">
                    <div className="col-xl-11 col-lg-12 side-auto">
                        <h4>Ethereum Wallet Balance</h4>
                        <h3><b>0 Bone</b></h3>
                        <h4>$0.00</h4>        
                        <div className="btns_sec val_all_bts row">
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space"> 
                                <button  className="btn grey-btn w-100 d-block">
                                    Become a Validator
                                </button>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">                        
                                <button onClick={() =>setvalidatorpop(true)} className="btn grey-btn w-100 d-block">
                                    Restake
                                </button> 
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">                        
                                <button onClick={() =>setwithdrawpop(true)} className="btn grey-btn w-100 d-block">
                                    Withdraw Rewards
                                </button>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">                        
                                <button onClick={() =>setunboundpop(true)} className="btn grey-btn w-100 d-block">
                                    Unbound
                                </button>    
                            </div>
                             <br/>   <br/>   <br/>   
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">                        
                                <button onClick={() =>setallinonepop(true)} className="btn grey-btn w-100 d-block">
                                    All in one popup btn
                                </button>    
                            </div>
                            
                        </div>
                    </div>
                </div>                
            </section>

      </main> 
    </>
  );

  
}

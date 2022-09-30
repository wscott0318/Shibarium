/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import  CommonModal from "../components/CommonModel";
import Header from "../layout/header"
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
      <main className="main-content val_account_outr cmn-input-bg">
          <Header />
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



            <section className="top_bnr_area">
                <div className="container">
                    <h1>My Account</h1>
                </div>                
            </section> 

            <section className="mid_cnt_area">
                <div className="container">
                    <div className="col-xl-8 mx-auto">
                        <h4>Ethereum Wallet Balance</h4>
                        <h3><b>0 Bone</b></h3>
                        <h4>$0.00</h4>        
                        <div className="btns_sec val_all_bts row">
                            <div className="col-md-3 col-sm-4"> 
                                <button  className="btn grey-btn w-100 d-block">
                                    Become a Validator
                                </button>
                            </div>
                            <div className="col-md-3 col-sm-4">                        
                                <button onClick={() =>setvalidatorpop(true)} className="btn grey-btn w-100 d-block">
                                    Restake
                                </button> 
                            </div>
                            <div className="col-md-3 col-sm-4">                        
                                <button onClick={() =>setwithdrawpop(true)} className="btn grey-btn w-100 d-block">
                                    Withdraw Rewards
                                </button>
                            </div>
                            <div className="col-md-3 col-sm-4">                        
                                <button onClick={() =>setunboundpop(true)} className="btn grey-btn w-100 d-block">
                                    Unbound
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

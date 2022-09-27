/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import  CommonModal from "../components/CommonModel";
export default function ValidatorAccount() {
  // const {account}=useContext(ProjectContext)

  // const { active,deactivate } = useWeb3React()
  // const [accountsAddress, setAccountsAddress] = useState("");
  // useEffect(() => {
  //   setAccountsAddress(localStorage.getItem("accounts"));
  //   console.log('chainId',chainId)
  //   console.log('account-home',account)
  // },[account]);
  const { account, chainId = 1 } = useActiveWeb3React();
  const [showretakepop, setretakepop] = useState(false);
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
      <main className="main-content val_account_outr">
{/* retake popop start */}
      <CommonModal
          title={"Retake"}
          show={showretakepop}
          setShow={setretakepop}
          
          >
          <>

                
                <div className="cmn_modal val_popups">              
                    <form>
                        <div className="row cmn_inpt_row">
                            <div className="col-md-12">
                                <input type="text" placeholder="Enter validator address" className="w-100"/>
                            </div>
                        </div>
                        <div className="row cmn_inpt_row">
                            <div className="col-md-12">
                                <input type="text" placeholder="Enter amount" className="w-100"/>
                            </div>
                        </div>
                        <div className="row cmn_inpt_row">
                            <div className="col-md-12">
                                <input type="text" placeholder="Enter stakereward" className="w-100"/>
                            </div>
                        </div>
                        <div className="pop_btns_area row">
                            <div className="col-12"><a className='btn primary-btn w-100' href="javascript:void(0)">Submit</a>  </div>
                        </div>                         
                    </form>      
                </div>
                
                </> 
          </CommonModal>
{/* retake popop ends */} 


{/* commission popop start */}
<CommonModal
          title={"Commission"}
          show={showcommissionpop}
          setShow={setcommissionpop}
          
          >
          <>                
                <div className="cmn_modal val_popups">              
                    <form>
                        <div className="row cmn_inpt_row">
                            <div className="col-md-12">
                                <input type="text" placeholder="Enter validator address" className="w-100"/>
                            </div>
                        </div>
                        <div className="row cmn_inpt_row">
                            <div className="col-md-12">
                                <input type="text" placeholder="Enter new commission" className="w-100"/>
                            </div>
                        </div> 
                        <div className="pop_btns_area row">
                            <div className="col-12"><a className='btn primary-btn w-100' href="javascript:void(0)">Submit</a>  </div>
                        </div>                         
                    </form>      
                </div>
                
                </> 
          </CommonModal>
{/* commission popop ends */} 


{/* withdraw popop start */}
<CommonModal
          title={"Withdraw rewards"}
          show={showwithdrawpop}
          setShow={setwithdrawpop}
          
          >
          <>                
                <div className="cmn_modal val_popups">              
                    <form>
                        <div className="row cmn_inpt_row">
                            <div className="col-md-12">
                                <input type="text" placeholder="Enter validator address" className="w-100"/>
                            </div>
                        </div> 
                        <div className="pop_btns_area row">
                            <div className="col-12"><a className='btn primary-btn w-100' href="javascript:void(0)">Submit</a>  </div>
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
                        <div className="row">
                             <p className="text-center">Are you sure you want to unbound?</p>
                        </div> 
                        <div className="pop_btns_area row mr-top-50">
                            <div className="col-6"><a className='btn blue-btn w-100' href="javascript:void(0)">Cancel</a>  </div>
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
                    <h4>Ethereum Wallet Balance</h4>
                    <h3><b>0 Bone</b></h3>
                    <h4>$0.00</h4>        
                    <div className="btns_sec val_all_bts row">
                        <div className="col-md-3 col-sm-4"> 
                            <button onClick={() =>setretakepop(true)} className="btn grey-btn w-100 d-block">
                                Restake
                            </button>
                        </div>
                        <div className="col-md-3 col-sm-4">                        
                            <button onClick={() =>setcommissionpop(true)} className="btn grey-btn w-100 d-block">
                                Change Comission Rate
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
            </section>

      </main> 
    </>
  );

  
}

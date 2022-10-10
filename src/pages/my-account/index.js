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
export default function MyAcount() {
  // const {account}=useContext(ProjectContext)

  // const { active,deactivate } = useWeb3React()
  // const [accountsAddress, setAccountsAddress] = useState("");
  // useEffect(() => {
  //   setAccountsAddress(localStorage.getItem("accounts"));
  //   console.log('chainId',chainId)
  //   console.log('account-home',account)
  // },[account]);
  const { account, chainId = 1 } = useActiveWeb3React();
//   const [showvalidatorpop, setvalidatorpop] = useState(false);
//   const [showcommissionpop, setcommissionpop] = useState(false);
//   const [showwithdrawpop, setwithdrawpop] = useState(false);
//   const [showunboundpop, setunboundpop] = useState(false);
//   const [showallinonepop, setallinonepop] = useState(false);
  
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
                                <button onClick={() =>setvalidatorpop(true)} className="btn primary-btn w-100 d-block">
                                    Become a Delegator
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

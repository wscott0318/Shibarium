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
import { useRouter } from "next/router";
import {getUserType} from "../../services/apis/user/userApi";
import UserAccount from "./UserAccount";
import DelegatorAccount from "./DelegatorAccount";
import ValidatorAccount from "./ValidatorAccount";
import LoadingSpinner from 'pages/components/Loading';

export default function MyAcount() {
  const { account, chainId = 1 } = useActiveWeb3React();

  const [userType, setUserType] = useState('')
  const [loading, setLoading] = useState(true)

  const getUsertypeAPI = (accountAddress) => {
    try {
      getUserType(accountAddress.toLowerCase()).then(res => {
        if (res.data && res.data.data) {
          let ut = res.data.data.userType;
          console.log(ut)
          setUserType(ut) 
          setLoading(false)
        }
      }).catch(e => {
        // console.log(e);
        setUserType('NA') 
        setLoading(false)
      })
    } catch (error) {
      setLoading(false)
    }
  }


  useEffect(() => {
    if(account) {
      getUsertypeAPI(account)
    }
  },[account])



  

  const router = useRouter();
  return (
    <>
      <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh top-space">
          <Header />
          <StakingHeader />

            <section className="top_bnr_area dark-bg">
                <div className="container">
                    <h1 className="ff-mos">My Account</h1>
                </div>                
            </section> 
            {
              userType === 'Delegator' ?
              <DelegatorAccount /> :
              userType === 'NA' ? 
              <UserAccount /> :
              <ValidatorAccount />
            }

       

      </main> 
    </>
  );

  
}

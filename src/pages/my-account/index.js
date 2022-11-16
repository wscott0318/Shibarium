/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { useActiveWeb3React } from "../../services/web3"
import  CommonModal from "../components/CommonModel";
import Header from "../layout/header";
import StakingHeader from '../staking-header'
import { useRouter } from "next/router";
import { useUserType } from "../../state/user/hooks";
import UserAccount from "./UserAccount";
import DelegatorAccount from "./DelegatorAccount";
import ValidatorAccount from "./ValidatorAccount";
import LoadingSpinner from 'pages/components/Loading';
import { getBoneUSDValue } from "../../services/apis/validator/index";
import { ChainId } from "@shibarium/core-sdk";
import { BONE_ID } from '../../config/constant';
import {useEthBalance} from '../../hooks/useEthBalance';
import {useTokenBalance} from '../../hooks/useTokenBalance';
import { dynamicChaining } from "web3/DynamicChaining";


export default function MyAcount() {
  const { account, chainId = 1 } = useActiveWeb3React();
  const [userType, setUserType] = useUserType();
  const [boneUSDValue,setBoneUSDValue] = useState(0);
  const router = useRouter();
  const availBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(dynamicChaining[chainId].BONE);


  useEffect(() => {
    getBoneUSDValue(BONE_ID).then(res=>{
      setBoneUSDValue(res.data.data.price);
    })
  },[account])

  return (
    <>
      <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh staking-main">
          {/* <Header /> */}
          {/* <StakingHeader /> */}
            <section className="top_bnr_area dark-bg mn-ht">
                <div className="container">
                    <div className="section-info"><h1 className="ff-mos">My Account</h1></div>
                </div>                
            </section> 
            {userType === 'NA' ? 
              <UserAccount boneUSDValue={boneUSDValue} availBalance={availBalance}/>
               :
              <ValidatorAccount userType={userType} boneUSDValue={boneUSDValue} availBalance={availBalance}/>
            }
      </main> 
    </>
  );

  
}

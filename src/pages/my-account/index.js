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
import { ChainId } from "shibarium-chains";
import { BONE_ID } from '../../config/constant';
import {useEthBalance} from '../../hooks/useEthBalance';
import {useTokenBalance} from '../../hooks/useTokenBalance';
import { dynamicChaining } from "web3/DynamicChaining";
import { addDecimalValue } from "web3/commonFunctions"


export default function MyAcount() {
  const { account, chainId = 1 } = useActiveWeb3React();
  const [userType, setUserType] = useUserType();
  const [boneUSDValue,setBoneUSDValue] = useState(0);
  const router = useRouter();
  const [delegatorData, setDelegatorData] = useState({});
  var availBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(dynamicChaining[chainId].BONE);


  useEffect(() => {
    if(account){
      getBoneUSDValue(BONE_ID).then(res=>{
        setBoneUSDValue(res.data.data.price);
      })
    } else {
      router.push('/')
    }
  },[account])

  const getDelegatorAmount = (data) => {
    console.log(data)
    setDelegatorData({stakes: (data.totalStake) / 10 ** 18, rewards: data.totalReward / 10 ** 18})
  }
  

  return (
    <>
      <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh staking-main">
        {/* <Header /> */}
        {/* <StakingHeader /> */}
        <section className="dark-bg mn-ht">
          <div className="container">
            <div className="section-info">
              <div className="row align-items-center">
                <div className="col-md-7 col-sm-12 ff-mos">
                  <h1 className="ff-mos">My Account</h1>
                  {userType === "Delegator" && (
                    <div className="balance_wrapper">
                      <div className="balance_card">
                        <span>{availBalance} BONES</span>
                        <h4 className="heading-sm">Wallet Balance</h4>
                      </div>
                      <div className="balance_card">
                        <span>{addDecimalValue(delegatorData.stakes)} BONES</span>
                        <h4 className="heading-sm">Total Staked</h4>
                      </div>
                      <div className="balance_card">
                        <span>{addDecimalValue(delegatorData.rewards)} BONES</span>
                        <h4 className="heading-sm">Total reward</h4>
                      </div>
                      {/* <div className="balance_card">
                        <span>{boneUSDValue} BONES</span>
                        <h4 className="heading-sm">Self Stake</h4>
                      </div>
                      <div className="balance_card">
                        <span>{availBalance} BONES</span>
                        <h4 className="heading-sm">Total Delegator Reward</h4>
                      </div> */}
                    </div>
                  )}
                </div>
                <div className="col-md-5 col-sm-12 ff-mos m-hide">
                  <div className="shib-img-sec text-end">
                    <img
                      className="img-fluid d-inline-block"
                      width="423"
                      height="266"
                      src="../../assets/images/my-account.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {userType === "NA" ? (
          <UserAccount
            boneUSDValue={boneUSDValue}
            availBalance={availBalance}
          />
        ) : (
          <ValidatorAccount
            userType={userType}
            boneUSDValue={boneUSDValue}
            availBalance={availBalance}
            getDelegatorAmount={getDelegatorAmount}
          />
        )}
      </main>
    </>
  );

  
}

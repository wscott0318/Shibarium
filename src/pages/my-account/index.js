/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useActiveWeb3React } from "../../services/web3"
import { useRouter } from "next/router";
import { useUserType, useValId } from "../../state/user/hooks";
import UserAccount from "./UserAccount";
import ValidatorAccount from "./ValidatorAccount";
import { getBoneUSDValue } from "../../services/apis/validator/index";
import { BONE_ID } from '../../config/constant';
import {useTokenBalance} from '../../hooks/useTokenBalance';
import { dynamicChaining } from "web3/DynamicChaining";
import {web3Decimals} from "../../web3/commonFunctions"


export default function MyAcount() {
  const { account, chainId = 1 } = useActiveWeb3React();
  const [userType, setUserType] = useUserType(); //NOSONAR
  const [boneUSDValue,setBoneUSDValue] = useState(0);
  const [valId, setValId] = useValId(); //NOSONAR
  const router = useRouter();
  const [delegatorData, setDelegatorData] = useState({});
  const tokenBal = useTokenBalance(dynamicChaining[chainId].BONE);
  const availBalance = tokenBal ;
  let isloading = availBalance == -1;
  useEffect(() => {
    if(account){
      if(userType === 'Validator' && valId <= 0){
        router.back()   
      } else {
        getBoneUSDValue(BONE_ID).then(res=>{
          setBoneUSDValue(res.data.data.price);
          console.log("userAccount " , res)
        })
      }
    } else {
      router.back()
    }
  },[account])

  const getDelegatorAmount = (data) => {
    setDelegatorData({stakes: (data.totalStake) / 10 ** web3Decimals, rewards: data.totalReward / 10 ** web3Decimals})
  }
  

  return (
    <>
      <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh staking-main">
        <section className="dark-bg mn-ht">
          <div className="container">
            <div className="section-info">
              <div className="row align-items-center">
                <div className="col-md-7 col-sm-12 ff-mos">
                  <h1 className="ff-mos">My Account</h1>
                  {userType === "Delegator" && (
                    <div className="balance_wrapper">
                      <div className="balance_card">
                        <span>{isloading ? 0.00 : availBalance} BONES</span>
                        <h4 className="heading-sm">Wallet Balance</h4>
                      </div>
                      <div className="balance_card">
                        <span>{delegatorData.stakes ? +(delegatorData.stakes).toFixed(2) : "0.00"} BONES</span>
                        <h4 className="heading-sm">Total Staked</h4>
                      </div>
                      <div className="balance_card">
                        <span>{delegatorData.rewards ? +(delegatorData.rewards).toFixed(2) : "0.00"} BONES</span>
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
                      src="../../assets/images/shib-bg.png"
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
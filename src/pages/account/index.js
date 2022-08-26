/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import  WalletBalance  from "../components/WalletBalance";
import InnerHeader from "../inner-header";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { getBoneUSDValue } from "../../services/apis/validator/index";
import { useActiveWeb3React } from "app/services/web3";
import {UserType} from '../../enums/UserType'
import { BONE_ID, ENV_CONFIGS } from '../../config/constant';
import {useEthBalance} from '../../hooks/useEthBalance';
import {useTokenBalance} from '../../hooks/useTokenBalance';
import { useERC20Balances } from "react-moralis";
import { ChainId } from "@shibarium/core-sdk";
import { getDelegatorData } from "../../services/apis/user/userApi";

export default function Account() {
  // const [availBalance, setAvailBalance] = useState(0);
  const [userType, setUserType] = useState('Anonymous');
  const [boneUSDValue,setBoneUSDValue] = useState(0);
  const [cardsData, setCardsData] = useState({});
  const { chainId , account} = useActiveWeb3React();
  const availBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(ENV_CONFIGS[chainId].BONE);
  // const boneBalance = useTokenBalance(ENV_CONFIGS[chainId].BONE);

  // useEffect(() => {
  //   if (library&&account) {
  //     const web3 = new Web3(library?.provider);
  //     web3.eth.getBalance(account).then((res) => {
  //       setAvailBalance((res / Math.pow(10, 18)));
  //     });
  //   }
  // },[library,account]);
  // const { chainId, account, active, error, library, activate, deactivate } = useWeb3React()

console.log(availBalance, chainId)

  const getCardsData = (data) => {
    if(Object.keys(data).length) {
      // console.log(Object.keys(data).length)
      setCardsData(data)
    }
  } 


  useEffect(() => {
    getBoneUSDValue(BONE_ID).then(res=>{
      setBoneUSDValue(res.data.data.price);
    })
    if(account){
      // getDelegatorCardData(account)
    }
  },[account])



  return (
    <>
      <InnerHeader />
      <div className="page-wrapper">
        <main className="delegatorgrid-sec">
          <div className="botom-space-lg">
            <div className="darkBg position-relative sec-spc-high">
              <div className="container">
                <div className="row">
                  <div className="text-center col-sm-8 text-sm-start">
                    <h1 className="light-text fnt-58 fnt-100">Your Account</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container acct-sec">

            
            {/* overview section start */}
            <div className="baner-card top-margin">
            <h3 className="mb-0 mb-3 text-white fwb">Staking Overview</h3>
            <div className="row">
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <div className="data-box">
                    <div>
                      <h3 className="fwb upertxt font-xs">{chainId == 7352 ? "BONE" : "ETHEREUM"} WALLET BALANCE</h3>
                      <p className="mb-0 d-block fw-600 upertxt">{availBalance.toFixed(4)}</p>
                    </div>
                    <div>
                      <div className="card-hr"></div>
                      <span className="mb-0 mt-2">$null</span>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                <div className="data-box">
                    <div>
                      <h3 className="fwb upertxt font-xs">Your Stake</h3>
                      <p className="mb-0 d-block fw-600 upertxt">{cardsData?.totalStake}</p>
                      
                    </div>
                    <div>
                      <div className="card-hr"></div>
                      <span className="mb-0 mt-2">$null</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                <div className="data-box">
                    <div>
                      <h3 className="fwb upertxt font-xs">Delegation</h3>
                      <p className="mb-0 d-block fw-600 upertxt">{cardsData?.numOfValidators} Validator</p>
                      
                    </div>
                    <div>
                      <div className="card-hr"></div>
                      <span className="mb-0 mt-2">$null</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                <div className="data-box">
                    <div>
                      <h3 className="fwb upertxt font-xs">Unclaimed Rewards</h3>
                      <p className="mb-0 d-block fw-600 upertxt">{cardsData?.unclaimedRewards}</p>
                      
                    </div>
                    <div>
                      <div className="card-hr"></div>
                      <span className="mb-0 mt-2">$null</span>
                    </div>
                  </div>
                </div>
              </div>
              {/*<div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb upertxt">Your stake</h3>
                  <p className="mb-0 d-block fw-600">10 Matic</p>
                  <div className="card-hr"></div>
                  <span className="mb-0">$null</span>
                </div>
              </div>
               <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb upertxt">Your stake</h3>
                  <p className="mb-0 d-block fw-600">10 Matic</p>
                  <div className="card-hr"></div>
                  <span className="mb-0">$null</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb upertxt">Your stake</h3>
                  <p className="mb-0 d-block fw-600">10 Matic</p>
                  <div className="card-hr"></div>
                  <span className="mb-0">$null</span>
                </div>
              </div> */}
            </div>
            </div>
            {/* overview section end */}
            {/* btns section start */}
            <div className="text-center center-sec button-block">
              <WalletBalance
                balance={ availBalance}
                boneUSDValue={boneUSDValue}
                isDelegator={userType === UserType.Delegator}
                isValidator={userType  === UserType.Validator}
                getCardsData={getCardsData}

              />
            </div>
            {/* btns section end */}
          
          </div>
        </main>

         
      </div>
    </>
  );
}

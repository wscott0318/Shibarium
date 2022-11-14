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
import { ChainId } from "@shibarium/core-sdk";
import { getDelegatorData } from "../../services/apis/user/userApi";
import fromExponential from 'from-exponential';
// @ts-ignore
import { ShimmerTitle, ShimmerTable } from "react-shimmer-effects";
import NumberFormat from 'react-number-format';
import { useUserType } from '../../state/user/hooks';
import { User } from "react-feather";
import { dynamicChaining } from "web3/DynamicChaining";
import { tokenDecimal } from 'web3/commonFunctions';

export default function Account() {
  // const [availBalance, setAvailBalance] = useState(0);
  const [userType, setUserType] = useUserType();
  const [boneUSDValue,setBoneUSDValue] = useState(0);
  const [cardsData, setCardsData] = useState({});
  const { chainId , account} = useActiveWeb3React();
  const [ topCardsShimmer, setTopCardShimmer] = useState(false);
  const availBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(dynamicChaining[chainId].BONE);


  // useEffect(() => {
  //   if (library&&account) {
  //     const web3 = new Web3(library?.provider);
  //     web3.eth.getBalance(account).then((res) => {
  //       setAvailBalance((res / Math.pow(10, 18)));
  //     });
  //   }
  // },[library,account]);
  // const { chainId, account, active, error, library, activate, deactivate } = useWeb3React()

// console.log(availBalance, chainId)

  const getCardsData = (data) => {
    setTopCardShimmer(true)
    if(Object.keys(data).length) {
      // console.log(Object.keys(data).length)
      setCardsData(data)
      setTopCardShimmer(false)
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


  const cardShimmerEffects = (lines, gaps) => {
    return (
      <ShimmerTitle line={lines} gap={gaps} variant="primary" />
    )
  }

  // console.log(topCardsShimmer)

  const renderTopCards = () => {
    if(userType  === UserType.Validator  || userType  === UserType.NA ) {
      return (
      <div className="cardMain text-center cardUser">
            <h5 className="mb-2">Wallet balance</h5>
            <h3 className="fw-700">{availBalance.toFixed(tokenDecimal)} {chainId == 7352 ? "Bone" : "Ethereum"}</h3>
            <h6 className="fw-600 primary-text"><NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={((availBalance || 0) * boneUSDValue).toFixed(tokenDecimal)} /></h6>
      </div>
      )
    } else if (userType === UserType.Delegator){
      if(topCardsShimmer) {
        <div className="row justify-content-center">
        {
          [...Array(4)].map(x => 
          <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
            <div className="bs-card card">
              <div className="data-box">
              {cardShimmerEffects(2, 10)}
                <div>
                </div>
              </div>
            </div>
          </div>
          )
        }
        </div>
      } else if (Object.keys(cardsData).length){
          return (
          <div className="row justify-content-center networkCard ">
              <div className="col-lg-12 mb-3">
                <h3 className="mb-0 ,mb-3 text-white fwb">Staking Overview</h3>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                  <div className="bs-card card">
                      <div className="bs-data-col">
                        <h3 className="fwb upertxt font-xs">{chainId == 7352 ? "BONE" : "ETHEREUM"} WALLET BALANCE</h3>
                        <p className="mb-0 d-block fw-600 upertxt">{availBalance.toFixed(tokenDecimal)}</p>
                      </div>
                      <div className="bs-data-col">
                        <p className="mb-0 d-block fw-600  border_before"><NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={((availBalance || 0) * boneUSDValue).toFixed(tokenDecimal)} /></p>
                      </div>
                  </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <div className="bs-data-col">
                    <h4 className="fwb font-xs upertxt height-fx">Your Stake </h4>
                    <p className="mb-0 d-block fw-600 upertxt">{(fromExponential(cardsData?.totalStake)/Math.pow(10,18)).toFixed(tokenDecimal)}</p>
                  </div>
                  <div className="bs-data-col">
                    <p className="mb-0 d-block fw-600 border_before"><NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={(((cardsData?.totalStake)/Math.pow(10,18) || 0) * boneUSDValue).toFixed(tokenDecimal)} /></p>
                  </div>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                    <div className="bs-data-col">
                      <h4 className="fwb upertxt font-xs height-fx">Delegation</h4>
                      <p className="mb-0 d-block fw-600 upertxt">{cardsData?.validators.filter(x => x !== '0').length} Validator</p>
                    </div>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                  <div className="bs-card card">
                      <div className="bs-data-col">
                        <h4 className="fwb upertxt font-xs height-fx">Unclaimed Rewards</h4>
                        <p className="mb-0 d-block fw-600 upertxt">{(fromExponential(cardsData?.unclaimedRewards)/Math.pow(10,18)).toFixed(tokenDecimal)}</p>
                      </div>
                      <div className="bs-data-col">
                        <p className="mb-0 d-block fw-600 border_before"><NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={(((cardsData?.unclaimedRewards)/Math.pow(10,18) || 0) * boneUSDValue).toFixed(tokenDecimal)} /></p>
                        {/* <span className="mb-0 mt-2">$null</span> */}
                      </div>
                  </div>
              </div>
            </div>
          )
      } else {
        return (
          <div className="row justify-content-center">
        {
          [...Array(4)].map(x => 
          <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
            <div className="bs-card card">
              <div className="data-box">
              {cardShimmerEffects(2, 10)}
                <div>
                </div>
              </div>
            </div>
          </div>
          )
        }
        </div>
        )
      }
    }
  }

  return (
    <>
     <h1>account</h1>
    </>
  );
}

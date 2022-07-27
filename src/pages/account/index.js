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

export default function Account() {
  // const [availBalance, setAvailBalance] = useState(0);
  const [userType, setUserType] = useState('Anonymous');
  const [boneUSDValue,setBoneUSDValue] = useState(0);

  const { chainId } = useActiveWeb3React();
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

  useEffect(() => {
    getBoneUSDValue(BONE_ID).then(res=>{
      setBoneUSDValue(res.data.data.price);
    })
  },[])
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
          <div className="container">
            <div className="text-center center-sec">
              <WalletBalance
                balance={ availBalance}
                boneUSDValue={boneUSDValue}
                isDelegator={userType === UserType.Delegator}
                isValidator={userType  === UserType.Validator}
               

              />
            </div>
          </div>
        </main>

         
      </div>
    </>
  );
}

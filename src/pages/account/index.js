/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import  WalletBalance  from "../components/WalletBalance";
import InnerHeader from "../inner-header";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { getUserType } from "../../services/apis/user/userApi";
import { useActiveWeb3React } from "app/services/web3";
import {UserType} from '../../enums/UserType'

export default function Account() {
  const [availBalance, setAvailBalance] = useState("0");
  const [userType, setUserType] = useState('Anonymous');

  const { library, chainId, account } = useActiveWeb3React();
  useEffect(() => {
    if (library&&account) {
      const web3 = new Web3(library?.provider);
      web3.eth.getBalance(account).then((res) => {
        setAvailBalance(res);
      });
    }
  },[library,account]);

  console.log("availBalance", availBalance);
  useEffect(()=>{
    getUserType(account).then( res =>{
      console.log(res.data)
      if (res.data && res.data.data) {
        let tt = UserType[res.data.data.userType]
        setUserType(UserType[res.data.data.userType])
      }
    })
  },[account])

  return (
    <>
      <InnerHeader />
      <div className="page-wrapper">
        <main className="delegatorgrid-sec">
          <div className="botom-space-lg">
            <div className="darkBg  position-relative sec-spc-high">
              <div className="container">
                <div className="row">
                  <div className="col-sm-8 text-sm-start text-center">
                    <h1 className="light-text fnt-58 fnt-100">Your Account</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="center-sec text-center">
              <WalletBalance
                balance={availBalance}
                isDelegator={userType === UserType.Deligator}
                isValidator={userType  === UserType.Validator}
               

              />
            </div>
          </div>
        </main>

         
      </div>
    </>
  );
}

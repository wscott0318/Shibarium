/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { useActiveWeb3React } from "../../services/web3";
import CommonModal from "../components/CommonModel";
import Header from "../layout/header";
import StakingHeader from "../staking-header";
import { useRouter } from "next/router";
import { useUserType } from "../../state/user/hooks";
import UserAccount from "../my-account/UserAccount";
import DelegatorAccount from "../my-account/DelegatorAccount";
import ValidatorAccount from "../my-account/ValidatorAccount";
import LoadingSpinner from "pages/components/Loading";
import { getBoneUSDValue } from "../../services/apis/validator/index";
import { ChainId } from "shibarium-get-chains";
import { BONE_ID } from "../../config/constant";
import ListData from "./ListData"

export default function MyAcount() {
  const { account, chainId = 1 } = useActiveWeb3React();
  const [userType, setUserType] = useUserType();
  const [boneUSDValue, setBoneUSDValue] = useState(0);
  const router = useRouter();

    const myRef = useRef<any>(null);
    
  useEffect(() => {
    if (account) {
      getBoneUSDValue(BONE_ID).then((res) => {
        setBoneUSDValue(res.data.data.price);
      });
    } else {
      router.push("/");
    }
  }, [account]);

  return (
    <>
      <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh staking-main">
        <Header />
        {/* <StakingHeader /> */}
      
        {/* banner section closed */}

        <div id="all-validators-section" ref={myRef} className=" ffms-inherit">
          <ListData withStatusFilter={true} />
        </div>
      </main>
    </>
  );
}

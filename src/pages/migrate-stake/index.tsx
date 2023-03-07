/* eslint-disable @next/next/no-img-element */
import React, {  useEffect, useRef } from "react";
import { useActiveWeb3React } from "../../services/web3";
import Header from "../layout/header";
import { useRouter } from "next/router";
import { getBoneUSDValue } from "../../services/apis/validator/index";
import { BONE_ID } from "../../config/constant";
import ListData from "./ListData"

export default function MyAcount() {
  const { account, chainId = 1 } = useActiveWeb3React();
  const router = useRouter();

    const myRef = useRef<any>(null);
    
  useEffect(() => {
    if (account) {
      getBoneUSDValue(BONE_ID).then((res) => {
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

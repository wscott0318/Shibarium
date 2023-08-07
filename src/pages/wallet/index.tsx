/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import InnerHeader from "../inner-header";
// @ts-ignore
import  { useRouter } from "next/router";
import Sidebar from "../layout/sidebar"
import { useActiveWeb3React } from "app/services/web3";
import { BONE_ID } from '../../config/constant';
import { getWalletTokenList } from "../../services/apis/validator/index";
import * as Sentry from "@sentry/nextjs";
import Comingsoon from "app/components/coming-soon";



export const SortData = (a: any, b: any) => {
  if (a > b) return 1;
  else if (b > a) return -1;
  else return 0;
}

export default function Wallet() {

  const router = useRouter()
  const { chainId = 1, account } = useActiveWeb3React();
  // console.log(dynamicChaining[id].BONE)
  const [menuState, setMenuState] = useState(false);
  const [tokenList, setTokenList] = useState<any>([]);
  const [tokenFilteredList, setTokenFilteredList] = useState<any>([]);
  const [tokenModalList, setTokenModalList] = useState<any>([]);
  const [selectedToken, setSelectedToken] = useState<any>({})


  useEffect(() => {
    if (tokenFilteredList.length) {
      let obj = tokenFilteredList.filter((x: any) => x.parentName === 'BONE').map((y: any) => y)[0]
      setSelectedToken(obj)
    }
  }, [tokenFilteredList, tokenList])

  console.log(tokenModalList,selectedToken)


  const getTokensList = () => {
    try { //NOSONAR
      getWalletTokenList().then(res => {
        let list = res.data.message.tokens
        // .sort((a: any, b: any) => {
        //   return (parseInt(b.balance) - parseInt(a.balance));
        // });
        list.forEach(async (x: any) => {
          x.balance = 0 //await getTokenBalance(lib, account, x.parentContract)
        })
        setTokenList(list)
        setTokenFilteredList(list)
        setTokenModalList(list)
      })
    }
    catch (err: any) {
      Sentry.captureException("getTokensList ", err);
    }
  }


  // console.log(tokenList)

  useEffect(() => {
    if (account) {
      getTokensList()
    } else {
      router.push('/')
    }

  }, [account])




  


  const handleMenuState = () => {
    // console.log("called click")
    setMenuState(!menuState);
  }


  // transactionCounts()

  return (
    <>
       <main className="main-content">
        <Sidebar
          handleMenuState={handleMenuState}
          onClickOutside={() => {
            setMenuState(false);
          }}
          menuState={menuState}
        />

        <section className="assets-section">
          <div className="cmn_dashbord_main_outr">
            <InnerHeader />
            <Comingsoon />
          </div>
        </section>
      </main>
    </>
  );
}
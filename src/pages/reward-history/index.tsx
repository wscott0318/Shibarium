/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InnerHeader from "../inner-header";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import {unbondRewards} from "../../services/apis/delegator";
import { useActiveWeb3React } from '../../services/web3'

export default function Unbond() {

    const { account, chainId=1 , library} = useActiveWeb3React();
    const [list, setList] = useState([])
    const [listLoader, setListLoader] = useState(true);

    const getRewardsList = (account :any) => {
        unbondRewards(account).then((res: any) => {
            if(res.status == 200) {
                console.log(res.data.data.result)
                setList(res.data.data.result)
                setListLoader(false)
            }
        }).catch((err : any) => {
            console.log(err);
            setListLoader(false)
        })
    }

    useEffect(() => {
        if(account){
            getRewardsList(account)
        }
    },[account])

    return (
      <>
      <h1>reward-history index.tsx</h1>
      </>
    );
}

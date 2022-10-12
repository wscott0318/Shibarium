/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InnerHeader from "../inner-header";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { unbondsHistory, unboundClaim } from "../../services/apis/delegator";
import { useActiveWeb3React } from '../../services/web3'
import { parse } from "path";
import { getExplorerLink } from 'app/functions'
import ConfirmPopUp from "../components/ConfirmPopUp";
import LoadingSpinner from "../components/Loading";
import { CommonModalNew } from "../components/CommonModel";
import { TailSpin } from "react-loader-spinner";
import { PROXY_MANAGER } from "web3/contractAddresses";
import proxyManagerABI from "../../ABI/StakeManagerProxy.json";
import ValidatorShareABI from "../../ABI/ValidatorShareABI.json";
import fromExponential from "from-exponential";


export default function Unbond() {

    const [list, setList] = useState([]);
    const [listLoader, setListLoader] = useState(true);
    const { account, chainId=1 , library} = useActiveWeb3React();
    const [ confirm, setConfirm] = useState(false);
    const [transactionLink, setTransactionLink] = useState('')
    // const {account,chainId=1} = useActiveWeb3React()

    const lib: any = library
    const web3: any = new Web3(lib?.provider)

    const getValidatorContractAddress = async (validatorID:any) => {
        let user = account;
        if(account){
          const instance = new web3.eth.Contract(proxyManagerABI, PROXY_MANAGER);
          const ID = await instance.methods.getValidatorContract(validatorID).call({ from: account });
          console.log(ID)
          return ID
        } else {
          console.log("account addres not found")
        }
      }

    const [claimNowModals, setClamNowModals] = useState<any>({
        data: {},
        confirm: false,
        progress: false,
        completed: false,
    })

    const getUnboundHistory = (account : any) => {
        unbondsHistory(account).then(res => {
            if(res.status == 200) {
                console.log(res.data.data.result)
                setList(res.data.data.result)
                setListLoader(false)
            }
        }).catch(err => {
            console.log(err);
            setListLoader(false)
        })
    }
    // console.log(claimNowModals)
    const unboundClaimAPI = async () => {
        setClamNowModals((pre:any) => ({...pre, progress: true, confirm: false}))
        let data = {
            delegatorAddress: account,
            validatorId: claimNowModals?.data?.validatorId,
            unbondNonce: claimNowModals?.data?.nonce
        }
        console.log(data)
        let validatorContract = await getValidatorContractAddress(data.validatorId)
        if(account){
            let walletAddress = account
            let instance = new web3.eth.Contract(ValidatorShareABI, validatorContract);
            await instance.methods.unstakeClaimTokens_new(data.unbondNonce).send({ from: walletAddress }).then((res:any) => {
              console.log(res)
              const link = getExplorerLink(chainId , res.transactionHash,'transaction')
            setTransactionLink(link)
            console.log(link)
            setClamNowModals({
                data:{},
                confirm: false,
                progress:false,
                completed:true
            })
            getUnboundHistory(account)
            }).catch((err:any) => {
              console.log(err)
              setClamNowModals({
                        data:{},
                        confirm: false,
                        progress:false,
                        completed:true
                    })
              if(err.code === 4001){
                console.log("User desined this transaction! ")
              }
               
            })
          }
        console.log(validatorContract)
    }

    useEffect(() => {
        if(account){
            getUnboundHistory(account)
        }
    },[])

    const handleModalClosing = () => {
        setClamNowModals((pre:any) => ({...pre,
            confirm: false,
            progress: false,
            completed: false,
        }))
    }


    return (
       <>
        <h1>unbound history</h1>
       </>
    );
}

import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useEthBalance } from "../../hooks/useEthBalance";
import { BONE_ID, ENV_CONFIGS } from 'app/config/constant';
import { getBoneUSDValue } from 'app/services/apis/validator';
import NumberFormat from 'react-number-format';
import { useActiveWeb3React, useLocalWeb3 } from 'app/services/web3';
import boneAbi from '../../constants/shibariumABIs/BONE_ABI.json'
// @ts-ignore
import { useSnackbar } from 'react-simple-snackbar';

import { buyVoucher } from 'app/services/apis/delegator/delegator';
import { parseUnits } from '@ethersproject/units';

import { getExplorerLink } from 'app/functions';
import { ChainId } from '@shibarium/core-sdk';
import ToastNotify from 'pages/components/ToastNotify';
import { useTokenBalance } from 'app/hooks/useTokenBalance';
import {L1Block} from "app/hooks/L1Block";
import Web3 from "web3";
import ValidatorShareABI from "../../ABI/ValidatorShareABI.json";
import fromExponential from 'from-exponential';
import { getAllowanceAmount } from "../../web3/commonFunctions";
import { BONE, PROXY_MANAGER } from 'web3/contractAddresses';
import ERC20 from "../../ABI/ERC20Abi.json"


const DelegatePopup:React.FC<any> =({data,onHide,...props}:any)=> {
  const [step, setStep] = useState<number>(1)
  const [amount, setAmount] = useState<number|string>('');
  const [tnxCompleted, setTnxCompleted] = useState(false)
 const [boneUSDValue, setBoneUSDValue] = useState<number>(0);
 const [expectedGas, setExpectedGas] = useState<number>(0);
 const [explorerLink, setExplorerLink] = useState<string>('')
 const [msgType, setMsgType] = useState<'error'|'success'|undefined>()
 const [toastMassage, setToastMassage] = useState('')
 const {account,chainId=1, library} = useActiveWeb3React()
 const web3  = useLocalWeb3()

  const walletBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(ENV_CONFIGS[chainId].BONE);
  

  const getBalanceG = () => {
    web3?.eth?.getBalance().then((lastBlock: number) => {
      console.log(lastBlock)
    })
  }


  useEffect(() => {
    getBoneUSDValue(BONE_ID).then(res=>{
      setBoneUSDValue(res.data.data.price);
    })
    if(account){
      // getBalanceG()
    }

  },[account])

  useEffect(() => {
    const url = 'https://ethgasstation.info/api/ethgasAPI.json?api-key=b1a28ddf8de1f32ead44643566e38dba07687ea6e456e3d9a7d1de290466';
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setExpectedGas((data.fastest * 21000)*Math.pow(10,-9))});
  }, [])

  const useMax = ()=>{
    setAmount(walletBalance)
  }
  const closeModal =(e:any)=>{
    setStep(1);
    setAmount('')
    setTnxCompleted(false)
    onHide()
  }
  const approveHandler = ()=>{
    if (!amount || !(amount > 0)) {
      setToastMassage('Amount must be greater than 0');
      setMsgType('error')
      return;
    }
    // if ((amount > walletBalance)) {
    //   setToastMassage(`Enter smaller amount, max allowed: ${walletBalance.toFixed(4)} BONE`);
    //   setMsgType('error')
    //   return;
    // }
    setTnxCompleted(false)
    // if (web3) {
    //   const currentChain: ChainId = chainId || ChainId.SHIBARIUM;
    //   const bone = new web3.eth.Contract(boneAbi, ENV_CONFIGS[currentChain].BONE);
    //   //  const val = web3.utils.toBN(amount*Math.pow(10,18))
    //   const val = parseUnits(amount.toString(), 18)
    //   web3.eth.sendTransaction({
    //     from: account,
    //     to: ENV_CONFIGS[currentChain].BONE,
    //     data: bone.methods.approve(ENV_CONFIGS[currentChain].STAKE_MANAGER, val).encodeABI()
    //   }).then((res: any) => {
    //     // setStep(2)
    //     setTnxCompleted(true)
    //   }).catch((e: any) => { console.log(e); setStep(1); })
    // }
    setTimeout(() => {
      setTnxCompleted(true)
    }, 1000);
    setStep(2)
  }
  const buyVouchers = async () => {
   const requestBody = {
      validatorAddress: data.owner,
      delegatorAddress: account,
      amount:amount
      
    }
    setTnxCompleted(false)
    console.log(requestBody)
    if(account){
      let lib: any =  library
      let web3: any = new Web3(lib?.provider)
      let walletAddress = account
      let _minSharesToMint = 1
      let allowance = await getAllowanceAmount(lib, BONE, account, PROXY_MANAGER) || 0
      let amount = web3.utils.toBN(fromExponential(+requestBody.amount * Math.pow(10, 18)));
      if(+requestBody.amount > allowance){
        console.log("need Approval")
        let approvalAmount = web3.utils.toBN(fromExponential(1000 * Math.pow(10, 18)));
      let approvalInstance = new web3.eth.Contract(ERC20, BONE);
      approvalInstance.methods.approve(PROXY_MANAGER,approvalAmount).send({ from: walletAddress })
          .then(async (res: any) => {
            console.log(res)
            let instance = new web3.eth.Contract(ValidatorShareABI, requestBody.validatorAddress);
            await instance.methods.buyVoucher(amount, _minSharesToMint).send({ from: walletAddress }).then((res:any) => {
                setTnxCompleted(true)
                setToastMassage(res?.data?.message);
                setMsgType('success')
                const link = getExplorerLink(chainId,res.transactionHash,'transaction')
                setExplorerLink(link)
            }).catch((err:any) => {
              console.log(err)
              setToastMassage("Something went wrong");
              setMsgType('error')
              setTnxCompleted(true);setStep(2)
              if(err.code === 4001){
                console.log("User desined this transaction! ")
              }
            })
          }).catch((err: any) => {
            console.log(err)
            setToastMassage("Something went wrong");
            setMsgType('error')
            setTnxCompleted(true);setStep(2)
          })
      }else {
        console.log("No approval needed")
      let instance = new web3.eth.Contract(ValidatorShareABI, requestBody.validatorAddress);
      await instance.methods.buyVoucher(amount, _minSharesToMint).send({ from: walletAddress }).then((res:any) => {
        console.log(res)
      setTnxCompleted(true)
      setToastMassage(res?.data?.message);
      setMsgType('success')
      const link = getExplorerLink(chainId,res.transactionHash,'transaction')
      setExplorerLink(link)
      }).catch((err:any) => {
        console.log(err)
        setToastMassage("Something went wrong");
      setMsgType('error')
      setTnxCompleted(true);setStep(2)
        if(err.code === 4001){
          console.log("User desined this transaction! ")
        }
      })
      }
  
    }
    // buyVoucher(requestBody).then(res =>{
    //   setTnxCompleted(true)
    //   setToastMassage(res?.data?.message);
    //   setMsgType('success')
    //   const link = getExplorerLink(chainId,res?.data?.data?.transactionHash,'transaction')
    //   setExplorerLink(link)
    // }).catch((e)=>{
    //   setToastMassage(e?.response?.data?.message);
    //   setMsgType('error')
    //   setTnxCompleted(true);setStep(2)})
  }

  console.log(data)

    return (
      <>
      <h1>DelegatePopup</h1>
      </>
    );
}

export default DelegatePopup;

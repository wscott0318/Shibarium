/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ENV_CONFIGS, SHIBARIUM_CHAIN_ID } from "app/config/constant";
import { useActiveWeb3React } from "app/services/web3";
import { useTokenBalance } from "app/hooks/useTokenBalance";
// import { useTokenPrice } from "app/hooks/useTokenPrice";
import { ERC20_ABI } from "app/constants/abis/erc20";
import Web3 from 'web3'
import LoadingSpinner from "pages/components/Loading";
import ConfirmPopUp from "pages/components/ConfirmPopUp";
import { dynamicChaining } from "web3/DynamicChaining";
import { tokenDecimal } from "web3/commonFunctions";


export default function ImportantPopup(props) {

  const {modalSend,handleContinueToSend,onHide}=props
 const {chainId = SHIBARIUM_CHAIN_ID, account,library} = useActiveWeb3React()
  // const [modaltitle, setModaltitle] = useState("Important");

  const [loading, setLoading] = useState(false)
  const [recieverAddress, setRecieverAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState(dynamicChaining[chainId].BONE);
  const [amount, setAmount] = useState();
  const [confirm, setConfirm] = useState(false)
const [tranHashCode, setTranHashCode] = useState('')
 const tokenBal =  useTokenBalance(tokenAddress)
//  const price = useTokenPrice(tokenAddress);
//  console.log(price)


const transferToken = () => {
  try {
    setLoading(true)
    const web3 = new Web3(library?.provider);
    const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    const amt = web3.utils.toBN((+amount).toFixed(tokenDecimal) * Math.pow(10, 18));
    const txData = {
      from: account,
      to: tokenAddress,
      data: contract.methods.transfer(recieverAddress,amt).encodeABI(),
    };
    web3.eth
      .sendTransaction(txData)
      .on("transactionHash", (res) => {
        setLoading(false);
        setConfirm(true)
        setTranHashCode(res)
        onHide()
      })
      .on("receipt", async (res) => {})
      .on("error", (err) => {setLoading(false)});
  } catch (error) {setLoading(false)}
};
  return (
    <>
      <h1>index ImportantPopup</h1>
    </>
  );
}

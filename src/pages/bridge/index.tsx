/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown,Dropdown ,Modal} from 'react-bootstrap';
import {useRouter} from "next/router";
import Popup from "../components/PopUp";
import NumberFormat from 'react-number-format';
import  CommonModal from "../components/CommonModel";
import InnerHeader from "../inner-header";
import Link from 'next/link'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import Sidebar  from "../layout/sidebar"
import Web3Status from "app/components/Web3Status";
import {
  getWalletTokenList
} from "../../services/apis/validator/index";
import {getTokenBalance } from "../../hooks/useTokenBalance";
import {getBoneUSDValue} from "../../services/apis/validator/index";
import { useActiveWeb3React } from "../../services/web3"
import { BONE_ID } from '../../config/constant';
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import depositManagerABI from "../../ABI/depositManagerABI.json"
import { DEPOSIT_MANAGER_PROXY } from "web3/contractAddresses";
import Web3 from "web3";
import { addTransaction, finalizeTransaction } from 'app/state/transactions/actions';
import { useAppDispatch } from "../../state/hooks";
import fromExponential from 'from-exponential';
import { getExplorerLink } from 'app/functions';
import { getAllowanceAmount } from "web3/commonFunctions";
import ERC20 from "../../ABI/ERC20Abi.json"
import Comingsoon from "app/components/coming-soon";
import * as Sentry from "@sentry/nextjs";
export default function Withdraw() {


  const { chainId = 1, account, library } = useActiveWeb3React();
  const lib : any = library;
  const web3: any = new Web3(lib?.provider)
  const dispatch = useAppDispatch();

  const bridgeType : string = localStorage.getItem("bridgeType") || "deposit"

  const [menuState, setMenuState] = useState(false);
   const [selectedToken, setSelectedToken] = useState(
     JSON.parse(localStorage.getItem("depositToken") || "{}")
   );
  const [showDepositModal, setDepositModal] = useState(false);
  const [showWithdrawModal, setWithdrawModal] = useState(false);
  const [showTokenModal, setTokenModal] = useState(false);
  const [depositTokenInput, setDepositTokenInput] = useState('');
  const [dWState,setDWState] = useState(bridgeType === "deposit" ? true : false);
  const [boneUSDValue,setBoneUSDValue] = useState(0);
  const [hashLink, setHashLink] = useState('')

  const handleMenuState = () => {
    setMenuState(!menuState);
  }
  const router = useRouter();

  


  
  const [withModalState, setWidModState] = useState({
    step0: true,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    title:"Initialize Withdraw"
  });
  const [depModalState, setDepModState] = useState({
    step0: true,
    step1: false,
    step2: false,
    title:"Confirm deposit"
  });
  const [tokenState, setTokenState] = useState({
    step0: true,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    title: "Select a Token",
  });
    const [tokenModalList, setTokenModalList] = useState ([]);
    const [tokenList, setTokenList] = useState([]);
    const [modalKeyword, setmodalKeyword] = useState("");

  const getTokensList = () => {
    try {
      getWalletTokenList().then((res) => {
      let list = res.data.message.tokens;
      list.forEach(async (x :any) => {
        x.balance = await getTokenBalance(lib, account, x.parentContract);
      });
      setTokenList(list);
      // setTokenFilteredList(list);
      setTokenModalList(list);
    });
  }
  catch(err:any){
    Sentry.captureMessage("New Error " , err);
  }
  };

  
const handleSearchList = (key :any) => {
  try{
    setmodalKeyword(key);
    if (key.length) {
      let newData = tokenList.filter((name) => {
        return Object.values(name)
          .join(" ")
          .toLowerCase()
          .includes(key.toLowerCase());
      });
        setTokenModalList(newData);
    } else {
        setTokenModalList(tokenList);
      }
  }
  catch(err:any){
    Sentry.captureMessage("New Error " , err);
  }
      }


      const handleTokenSelect = (token:any) => {
        // console.log(token)
        setSelectedToken(token)
        setTokenModal(false)
      }

      const handleMax = () => {
        setDepositTokenInput(selectedToken.balance)
      }

      const depositValidations: any = Yup.object({
        amount: Yup.number().typeError("only digits are allowed").min(0).max(selectedToken.balance).typeError("amount must be less or equal to you current balance").required("amount is required"), 
      })


      const approvalForDeposit = (amount : any, token : any, contract:any) => {
       try {
        let user: any = account
        const amountWei = web3.utils.toBN(fromExponential((1000 * Math.pow(10, 18))));
        let instance = new web3.eth.Contract(ERC20, token);
        instance.methods.approve(contract ,amountWei).send({ from: user })
        .on('transactionHash', (res: any) => {
          console.log(res, "hash")
          dispatch(
            addTransaction({
              hash: res,
              from: user,
              chainId,
              summary: `${res}`,
            })
          )
        }).on('receipt', (res: any) => {
          console.log(res, "receipt")
          dispatch(
            finalizeTransaction({
              hash: res.transactionHash,
              chainId,
              receipt: {
                to: res.to,
                from: res.from,
                contractAddress: res.contractAddress,
                transactionIndex: res.transactionIndex,
                blockHash: res.blockHash,
                transactionHash: res.transactionHash,
                blockNumber: res.blockNumber,
                status: 1
              }
            })
          )
          // call deposit contract 
          let instance = new web3.eth.Contract(depositManagerABI, DEPOSIT_MANAGER_PROXY);
          instance.methods.depositERC20(selectedToken.parentContract, amount).send({ from: account })
          .on('transactionHash', (res: any) => {
            console.log(res, "hash")
            dispatch(
              addTransaction({
                hash: res,
                from: user,
                chainId,
                summary: `${res}`,
              })
            )
            let link = getExplorerLink(chainId, res, 'transaction')
                setHashLink(link)
                setDepModState({
                  step0: false,
                  step1: false,
                  step2: true,
                  title: "Transaction Submitted",
                });
                setDepositTokenInput('');
          }).on('receipt', (res: any) => {
            console.log(res, "receipt")
            dispatch(
              finalizeTransaction({
                hash: res.transactionHash,
                chainId,
                receipt: {
                  to: res.to,
                  from: res.from,
                  contractAddress: res.contractAddress,
                  transactionIndex: res.transactionIndex,
                  blockHash: res.blockHash,
                  transactionHash: res.transactionHash,
                  blockNumber: res.blockNumber,
                  status: 1
                }
              })
            )
            setDepositModal(false);
          }).on('error', (res: any) => {
            console.log(res, "error")
            if (res.code === 4001) {
              setDepModState({
                step0: true,
                step1: false,
                step2: false,
                title: "Confirm deposit",
              });
              setDepositModal(false);
            }
          })
          //deposit contract ends


        }).on('error', (res: any) => {
          console.log(res, "error")
          if (res.code === 4001) {
            setDepModState({
              step0: true,
              step1: false,
              step2: false,
              title: "Confirm deposit",
            });
            setDepositModal(false);
          }
        })
       } 
       catch(err:any){
        Sentry.captureMessage("New Error " , err);
      }
      }

      const callDepositModal = (values:any) => {
        try{
          setDepositTokenInput(values.amount)
          {
            setDepModState({
              step0: true,
              step1: false,
              step2: false,
              title: "Confirm deposit",
            });
            setDepositModal(true);
          }
        }
        catch(err:any){
          Sentry.captureMessage("New Error " , err);
        }
      }

      const callDepositContract = async () => {
        try {
          if(account){
        setDepModState({
          step0: false,
          step1: true,
          step2: false,
          title: "Transaction Pending",
        });
        let user :any = account
        const amountWei = web3.utils.toBN(fromExponential((+depositTokenInput * Math.pow(10, 18))));
        let allowance = await getAllowanceAmount(library,selectedToken.parentContract, account, DEPOSIT_MANAGER_PROXY) || 0

        if(+depositTokenInput > +allowance) {
          console.log("need approval")
          approvalForDeposit(amountWei, selectedToken.parentContract , DEPOSIT_MANAGER_PROXY)
        } else {
          console.log("no approval needed")
          let instance = new web3.eth.Contract(depositManagerABI, DEPOSIT_MANAGER_PROXY);
          instance.methods.depositERC20(selectedToken.parentContract, amountWei).send({ from: account })
          .on('transactionHash', (res: any) => {
            console.log(res, "hash")
            dispatch(
              addTransaction({
                hash: res,
                from: user,
                chainId,
                summary: `${res}`,
              })
            )
            let link = getExplorerLink(chainId, res, 'transaction')
                setHashLink(link)
                setDepModState({
                  step0: false,
                  step1: false,
                  step2: true,
                  title: "Transaction Submitted",
                });
                setDepositTokenInput('');
          }).on('receipt', (res: any) => {
            console.log(res, "receipt")
            dispatch(
              finalizeTransaction({
                hash: res.transactionHash,
                chainId,
                receipt: {
                  to: res.to,
                  from: res.from,
                  contractAddress: res.contractAddress,
                  transactionIndex: res.transactionIndex,
                  blockHash: res.blockHash,
                  transactionHash: res.transactionHash,
                  blockNumber: res.blockNumber,
                  status: 1
                }
              })
            )
            setDepositModal(false);
          }).on('error', (res: any) => {
            console.log(res, "error")
            if (res.code === 4001) {
              setDepModState({
                step0: true,
                step1: false,
                step2: false,
                title: "Confirm deposit",
              });
              setDepositModal(false);
            }
          })
        }

      } else {
        console.log("account not found")
      }
      }
      catch(err:any){
        Sentry.captureMessage("New Error " , err);
      }
    }
      
  
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

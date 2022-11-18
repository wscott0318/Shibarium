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
import { tokenDecimal } from "web3/commonFunctions";
import { useWeb3React } from "@web3-react/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addTokenAbi from "../../ABI/custom-token-abi.json"
import { AbiItem } from "web3-utils";

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
  const [hashLink, setHashLink] = useState('');
  const [newToken,addNewToken] = useState('');

  const handleMenuState = () => {
    setMenuState(!menuState);
  }
  const router = useRouter();

  

  useEffect(() => {
    getBoneUSDValue(BONE_ID).then(res=>{
      setBoneUSDValue(res.data.data.price);
    })
  },[account])
  
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
    const [tokenModalList, setTokenModalList] = useState<any>([]);
    const [tokenList, setTokenList] = useState([]);
    const [modalKeyword, setmodalKeyword] = useState("");
  const [localTokens,setLocalTokens]=useState<any>([]);
  const getTokensList = () => {
    getWalletTokenList().then((res) => {
      let list = res.data.message.tokens;
      list.forEach(async (x :any) => {
        x.balance = await getTokenBalance(lib, account, x.parentContract);
      });
      setTokenList(list);
      // setTokenFilteredList(list);
      setTokenModalList(list);
    });
  };
  useEffect(() => {
    if(account) {
      getTokensList();
    } 
    // else {
    //   router.push('/')
    // }
  }, [account])

  
const handleSearchList = (key :any) => {
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

      const callDepositModal = (values:any) => {
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

      const callDepositContract = async () => {
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

        const addTokenHandler = async () => {           
          const isValidAddress = await web3.utils.isAddress(String(newToken));
          if (isValidAddress) {
            const checkArray = tokenModalList.map(
              (st: any) => st?.parentContract
            );
            let localtoken = JSON.parse(localStorage.getItem("newToken") || "[]");
            let localtokenarray = localtoken.map((st:any)=>st.parentContract);
            const isalreadypresent = checkArray.some((item : any) => localtokenarray.includes(item));
            if (isalreadypresent) {
              toast.error("Address already exists !", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
              });
            } else {
              const contractInstance = new web3.eth.Contract(
                addTokenAbi,
                String(newToken)
              );
              let symbol = await contractInstance.methods
                .symbol()
                .call({ from: String(account) })
                .then((token: any) => token)
                .catch((err: any) => console.log(err));
              let name = await contractInstance.methods
                .name()
                .call({ from: String(account) })
                .then((token: any) => token)
                .catch((err: any) => console.log(err));
              const obj = {
                parentContract: String(newToken),
                childContract: String(newToken),
                parentName: name,
                parentSymbol: symbol,
              };
              localStorage.setItem("newToken", JSON.stringify([obj]));
              let newAddedToken = JSON.parse(
                localStorage.getItem("newToken") || "[]"
              );
              let updatedArray = [
                ...tokenModalList,
                newAddedToken[newAddedToken.length - 1],
              ];
              setTokenModalList(updatedArray);
              setLocalTokens([
                ...localTokens,
                newAddedToken[newAddedToken.length - 1],
              ]);
              toast.success(`${name} successfully added.`, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
              });
              setTokenState({
                step0: false,
                step1: false,
                step2: false,
                step3: false,
                step4: true,
                title: "Manage Token",
              });
            }
          } else { 
          }
        };

      useEffect(() => {
        if(!showTokenModal)
        {
          addNewToken('');
        }
      }, [showTokenModal])
      useEffect(() => {
        const isValidAddress = web3.utils.isAddress(String(newToken));
        if(tokenState.step2 && isValidAddress)
        {
            toast.success("Address is valid", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 600,
            });
          setTokenState({
            step0: false,
            step1: false,
            step2: false,
            step3: true,
            step4: false,
            title: "Manage Token",
          });
        }
        else if (!isValidAddress && newToken.length > 0)
        {
            toast.error("Address is Invalid", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 600,
            });
          setTokenState({
            step0: false,
            step1: false,
            step2: true,
            step3: false,
            step4: false,
            title: "Manage Token",
          });
        }
      }, [newToken])

    
   const clearAllCustomTokens = () => {
    setLocalTokens([]);
    localStorage.setItem("newToken","[]");
   }
   console.log("tokenmodallist",tokenModalList)
   const spliceCustomToken = (index:any) => {
    let incomingObject = localTokens[index];
    const filteredModallist = tokenModalList.filter((ss:any)=>{
      return ss.parentContract !== incomingObject.parentContract
    });
    setTokenModalList([...filteredModallist]);
    const spliced = localTokens.splice(0,index);
    setLocalTokens(spliced);
    localStorage.setItem("newToken",JSON.stringify(spliced))
    
    
   }
   useEffect(() => {
    // let checkToken = JSON.parse(localStorage.getItem("newToken") || "[]");
    // code below is to check whether the local token is already present in the tokenModallist
    // const isalready = arrayContainsObject(tokenModalList, checkToken);
    // const localindexes = checkToken && checkToken.map((st:any)=>st.parentContract);
    const checkArray = tokenModalList.map((st: any) => st?.parentContract);
    let localtoken : any = JSON.parse(localStorage.getItem("newToken") || "[]");
    let localtokenarray = localtoken.map((st: any) => st.parentContract);
    const isalreadypresent = checkArray.some((item :any) =>
      localtokenarray.includes(item)
    );
    // let isalready = JSON.stringify(tokenModalList).includes(
    //   JSON.stringify(checkToken)
    // );
    if (
      showTokenModal &&
    !isalreadypresent &&
      localtoken !== null 
    ) {
      let updatedArray = [...tokenModalList, ...localtoken];
      const uniqueTokenArray = [
        ...updatedArray
          .reduce((map, obj) => map.set(map.parentContract, obj), new Map())
          .values(),
      ];
      setTokenModalList([...tokenModalList, ...uniqueTokenArray]);
    }
   }, [localTokens,tokenModalList])
   
      
  console.log('localToken',localTokens)
  return (
    <>
      <ToastContainer />
      <main className="main-content">
        <Sidebar
          handleMenuState={handleMenuState}
          onClickOutside={() => {
            setMenuState(false);
          }}
          menuState={menuState}
        />
        {/* modal code start */}
        {/* Deposit popup start */}
        <CommonModal
          title={depModalState.title}
          show={showDepositModal}
          setshow={setDepositModal}
          externalCls="dark-modal-100 bridge-ht"
        >
          {/* Deposit popups start */}
          <>
            {/* confirm deposit popop starts */}

            {dWState && depModalState.step0 && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg mt-0">
                      <div className="top_overview col-12">
                        <div className="img-flexible">
                          <img
                            className="img-fluid d-inline-block"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <h6>
                          {depositTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={(
                              (+depositTokenInput || 0) * boneUSDValue
                            ).toFixed(tokenDecimal)}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <p>Ethereum Mainnet</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block arow-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            src="../../images/shib-borderd-icon.png"
                            alt=""
                          />
                        </div>
                        <p>Shibarium Mainnet</p>
                      </div>
                    </div>
                    <div className="amt-section position-relative">
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            src="../../images/eth.png"
                            alt=""
                          />
                        </div>
                        <p>Estimation of GAS fee required</p>
                      </div>
                      <div>
                        <p className="fw-bold">$10.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() => callDepositContract()}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* confirm deposit popop ends */}

            {/* Transaction pending popup start */}

            {dWState && depModalState.step1 && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg mt-0">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </span>
                        <h6>
                          {depositTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={(
                              (+depositTokenInput || 0) * boneUSDValue
                            ).toFixed(tokenDecimal)}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <p>Ethereum Mainnet</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block">
                          <img
                            className="img-fluid"
                            src="../../images/shib-borderd-icon.png"
                            alt=""
                          />
                        </div>
                        <p>Shibarium Mainnet</p>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-section">
                      <h4 className="pop-hd-md">Moving funds</h4>
                      <p>
                        It will take up to 10 - 15 minutes to move the funds on
                        Shibarium Mainnet.
                      </p>
                    </div>
                    <div>
                      <a
                        onClick={() => {
                          setDepModState({
                            step0: false,
                            step1: false,
                            step2: true,
                            title: "Transaction Completed",
                          });
                        }}
                        className="btn grey-btn w-100"
                        href="javascript:void(0)"
                      >
                        <span className="spinner-border text-secondary pop-spiner"></span>
                        <span>Continue</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction pending popup end */}

            {/* Transaction completed popup start */}

            {dWState && depModalState.step2 && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg mt-0">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </span>
                        <h6>
                          {depositTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={(
                              (+depositTokenInput || 0) * boneUSDValue
                            ).toFixed(tokenDecimal)}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="pop-action">
                      <a
                        className="btn primary-btn w-100 w-100"
                        href="javascript:void(0)"
                      >
                        ETHEREUM MAINNET
                      </a>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-section complete-modal">
                      <h4 className="pop-hd-md">Transaction Completed</h4>
                      <p>Transaction completed succesfully.</p>
                    </div>
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() => window.open(hashLink)}
                      >
                        View on Block Explorer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction completed popup end */}
          </>
        </CommonModal>

        {/* Deposit popup end */}

        {/* Withdraw popups start */}
        <CommonModal
          title={withModalState.title}
          show={showWithdrawModal}
          setshow={setWithdrawModal}
          externalCls="dark-modal-100 bridge-ht2"
        >
          {/* Withdraw tab popups start */}
          <>
            {/* Initialize withdraw popup start */}
            {withModalState.step0 && !dWState && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg mt-0">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../images/red-bone.png"
                            alt=""
                          />
                        </span>
                        <h6>100 BONE</h6>
                        <p>500.00$</p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block">
                          <img
                            className="img-fluid"
                            src="../../images/shib-borderd-icon.png"
                            alt=""
                          />
                        </div>
                        <p>Shibarium Mainnet</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <p>Ethereum Mainnet</p>
                      </div>
                    </div>
                    <div className="amt-section position-relative">
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            width="24"
                            height="24"
                            className="img-fluid"
                            src="../../images/red-bone.png"
                            alt=""
                          />
                        </div>
                        <p>Estimation of GAS fee required</p>
                      </div>
                      <div>
                        <p className="fw-bold">$10.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-section">
                      <h4 className="pop-hd-md">Initialize Whitdraw</h4>
                      <p>
                        It will take up to 60 mins to 3 hours to reach the
                        checkpoint.{" "}
                      </p>
                    </div>
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() =>
                          setWidModState({
                            step0: false,
                            step1: true,
                            step2: false,
                            step3: false,
                            step4: false,
                            title: "Reaching Checkpoint",
                          })
                        }
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Initialize withdraw popup end */}

            {/* Reaching checkpoint popup start */}
            {withModalState.step1 && !dWState && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../images/red-bone.png"
                            alt=""
                          />
                        </span>
                        <h6>100 BONE</h6>
                        <p>500.00$</p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block">
                          <img
                            className="img-fluid"
                            src="../../images/shib-borderd-icon.png"
                            alt=""
                          />
                        </div>
                        <p>Shibarium Mainnet</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <p>Ethereum Mainnet</p>
                      </div>
                    </div>
                    <div className="amt-section position-relative">
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            src="../../images/eth.png"
                            alt=""
                          />
                        </div>
                        <p>Estimation of GAS fee required</p>
                      </div>
                      <div>
                        <p className="fw-bold">$20.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-section">
                      <h4 className="pop-hd-md">Moving funds to Ethereum</h4>
                      <p>
                        It will take up to 60 mins to 3 hours to reach the
                        checkpoint.
                      </p>
                    </div>
                    <div>
                      <a
                        onClick={() =>
                          setWidModState({
                            step0: false,
                            step1: false,
                            step2: true,
                            step3: false,
                            step4: false,
                            title: "Checkpoint reached",
                          })
                        }
                        className="btn grey-btn w-100"
                        href="javascript:void(0)"
                      >
                        <span className="spinner-border text-secondary pop-spiner"></span>
                        <span>Moving funds</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Reaching checkpoint  popup end */}

            {/* checkpoint Reached popup start */}
            {withModalState.step2 && !dWState && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../images/red-bone.png"
                            alt=""
                          />
                        </span>
                        <h6>100 SHIB</h6>
                        <p>500.00$</p>
                      </div>
                    </div>
                    <div className="pop-action">
                      <a
                        className="btn primary-btn w-100 w-100"
                        href="javascript:void(0)"
                      >
                        ETHEREUM MAINNET
                      </a>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-section">
                      <h4 className="pop-hd-md">Complete Withdraw</h4>
                      <p>
                        You need to confirm one more transaction to get your
                        funds in your Ethereum Account.
                      </p>
                    </div>
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() =>
                          setWidModState({
                            step0: false,
                            step1: false,
                            step2: false,
                            step3: true,
                            step4: false,
                            title: "Complete Withdraw",
                          })
                        }
                      >
                        Confirm
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* checkpoint Reached popup end */}

            {/* Complete withdraw popup start */}
            {withModalState.step3 && !dWState && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../images/red-bone.png"
                            alt=""
                          />
                        </span>
                        <h6>100 ETH</h6>
                        <p>500.00$</p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <p>Ethereum Mainnet</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <p>Wallet X25654a5</p>
                      </div>
                    </div>
                    <div className="amt-section position-relative">
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            src="../../images/eth.png"
                            alt=""
                          />
                        </div>
                        <p>Estimation of GAS fee required</p>
                      </div>
                      <div>
                        <p className="fw-bold">$20.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-section">
                      <h4 className="pop-hd-md">Withdrawing funds</h4>
                      <p>Moving funds to your Ethereum Account.</p>
                    </div>
                    <div>
                      <a
                        onClick={() =>
                          setWidModState({
                            step0: false,
                            step1: false,
                            step2: false,
                            step3: false,
                            step4: true,
                            title: "Withdraw Complete",
                          })
                        }
                        className="btn grey-btn w-100"
                        href="javascript:void(0)"
                      >
                        <span className="spinner-border text-secondary pop-spiner"></span>
                        <span>Moving funds</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Complete withdraw popup end */}

            {/* withdraw complete popup start */}
            {withModalState.step4 && !dWState && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../images/red-bone.png"
                            alt=""
                          />
                        </span>
                        <h6>100 SHIB</h6>
                        <p>500.00$</p>
                      </div>
                    </div>
                    <div className="pop-action">
                      <a
                        className="btn primary-btn w-100 w-100"
                        href="javascript:void(0)"
                      >
                        TRANSFER COMPLETE
                      </a>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-section">
                      <h4 className="pop-hd-md">Transaction Completed</h4>
                      <p className="lite-color">
                        Transaction completed succesfully. Your Ethereum wallet
                        Balance will be updated in few minute. In case of
                        problems contact our{" "}
                        <a
                          title="Support"
                          href="javascript:void(0);"
                          className="orange-txt"
                        >
                          Support.
                        </a>
                      </p>
                    </div>
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() => setWithdrawModal(false)}
                      >
                        View on Shibascan
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* withdraw complete popup start */}
          </>
          {/* Withdraw tab popups end */}
        </CommonModal>
        {/* Withdraw tab popups end */}

        {/* Token popups start */}
        <CommonModal
          title={"Select token"}
          show={showTokenModal}
          setshow={setTokenModal}
          externalCls="tkn-ht"
        >
          {/* Token popups start */}
          <>
            {/* Select token popop starts */}
            {showTokenModal && tokenState.step0 && (
              <div className="popmodal-body tokn-popup no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="sec-search ng-16">
                      <div className="position-relative search-row">
                        <input
                          type="text"
                          className="w-100"
                          placeholder="Search token or token address"
                          onChange={(e) => {
                            handleSearchList(e.target.value);
                          }}
                        />
                        <div className="search-icon">
                          <img
                            width="20"
                            height="21"
                            className="img-fluid"
                            src="../../images/search.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="token-sec">
                      <div className="info-grid">
                        <div>
                          <p>Token List</p>
                        </div>
                        <div className="token-btn-sec">
                          <button
                            type="button"
                            className="btn primary-btn w-100"
                            onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: true,
                                step2: false,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}
                          >
                            Manage Tokens
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="token-listwrap">
                      {tokenModalList.length
                        ? tokenModalList.map((x: any) => (
                            <div
                              className="tokn-row"
                              key={x?.parentName}
                              onClick={() => handleTokenSelect(x)}
                            >
                              <div className="cryoto-box">
                                <img
                                  className="img-fluid"
                                  src={
                                    x?.logo
                                      ? x.logo
                                      : "../../images/shib-borderd-icon.png"
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="tkn-grid">
                                <div>
                                  <h6 className="fw-bold">{x?.parentSymbol}</h6>
                                  <p>{x?.parentName}</p>
                                </div>
                                <div>
                                  <h6 className="fw-bold">
                                    {x?.balance ? x.balance : "00.00"}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                      {!tokenModalList.length && modalKeyword ? (
                        <p className="py-3 py-md-4 py-lg-5 text-center">
                          no record found
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Select token popop ends */}

            {/* Manage token popop starts */}

            {showTokenModal && tokenState.step1 && (
              <div className="popmodal-body tokn-popup no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="black-bg-sec">
                      <div className="token-btn-sec pop-btns-grid">
                        <div className="blk-width">
                          <button
                            type="button"
                            className="btn btn-active w-100"
                          >
                            Token Lists
                          </button>
                        </div>
                        <div className="blk-width">
                          <button
                            type="button"
                            className="btn w-100"
                            onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}
                          >
                            Add token
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="sec-search sec-search-secondry">
                      <div className="position-relative search-row">
                        <input
                          type="text"
                          className="w-100"
                          placeholder="Add list by https://"
                        />
                        <div className="search-icon">
                          <img
                            width="20"
                            height="21"
                            className="img-fluid"
                            src="../../images/search.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="token-listwrap list-ht">
                      <div className="tokn-row">
                        <div className="cryoto-box">
                          <img
                            className="img-fluid"
                            src="../../images/shib-borderd-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="tkn-grid">
                          <div>
                            <h6 className="fw-bold">SHIB</h6>
                            <p>Shibatoken</p>
                          </div>
                          <div>
                            <h6 className="fw-bold">
                              <label className="toggle">
                                <input type="checkbox" />
                                <span className="slider"></span>
                                <span
                                  className="labels"
                                  data-on="ON"
                                  data-off="OFF"
                                ></span>
                              </label>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="tokn-row">
                        <div className="cryoto-box">
                          <img
                            className="img-fluid"
                            src="../../images/red-bone.png"
                            alt=""
                          />
                        </div>
                        <div className="tkn-grid">
                          <div>
                            <h6 className="fw-bold">BONE</h6>
                            <p>Bone Token</p>
                          </div>
                          <div>
                            <h6 className="fw-bold">
                              <label className="toggle">
                                <input type="checkbox" />
                                <span className="slider"></span>
                                <span
                                  className="labels"
                                  data-on="ON"
                                  data-off="OFF"
                                ></span>
                              </label>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="tokn-row">
                        <div className="cryoto-box">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <div className="tkn-grid">
                          <div>
                            <h6 className="fw-bold">ETH</h6>
                            <p>Ethereum</p>
                          </div>
                          <div>
                            <h6 className="fw-bold">
                              <label className="toggle">
                                <input type="checkbox" />
                                <span className="slider"></span>
                                <span
                                  className="labels"
                                  data-on="ON"
                                  data-off="OFF"
                                ></span>
                              </label>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="tokn-row">
                        <div className="cryoto-box">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <div className="tkn-grid">
                          <div>
                            <h6 className="fw-bold">ETH</h6>
                            <p>Ethereum</p>
                          </div>
                          <div>
                            <h6 className="fw-bold">
                              <label className="toggle">
                                <input type="checkbox" />
                                <span className="slider"></span>
                                <span
                                  className="labels"
                                  data-on="ON"
                                  data-off="OFF"
                                ></span>
                              </label>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="tokn-row">
                        <div className="cryoto-box">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <div className="tkn-grid">
                          <div>
                            <h6 className="fw-bold">ETH</h6>
                            <p>Ethereum</p>
                          </div>
                          <div>
                            <h6 className="fw-bold">
                              <label className="toggle">
                                <input type="checkbox" />
                                <span className="slider"></span>
                                <span
                                  className="labels"
                                  data-on="ON"
                                  data-off="OFF"
                                ></span>
                              </label>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="tokn-row">
                        <div className="cryoto-box">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <div className="tkn-grid">
                          <div>
                            <h6 className="fw-bold">ETH</h6>
                            <p>Ethereum</p>
                          </div>
                          <div>
                            <h6 className="fw-bold">
                              <label className="toggle">
                                <input type="checkbox" />
                                <span className="slider"></span>
                                <span
                                  className="labels"
                                  data-on="ON"
                                  data-off="OFF"
                                ></span>
                              </label>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="tokn-row">
                        <div className="cryoto-box">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <div className="tkn-grid">
                          <div>
                            <h6 className="fw-bold">ETH</h6>
                            <p>Ethereum</p>
                          </div>
                          <div>
                            <h6 className="fw-bold">
                              <label className="toggle">
                                <input type="checkbox" />
                                <span className="slider"></span>
                                <span
                                  className="labels"
                                  data-on="ON"
                                  data-off="OFF"
                                ></span>
                              </label>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="tokn-row">
                        <div className="cryoto-box">
                          <img
                            className="img-fluid"
                            src="../../images/etharium.png"
                            alt=""
                          />
                        </div>
                        <div className="tkn-grid">
                          <div>
                            <h6 className="fw-bold">ETH</h6>
                            <p>Ethereum</p>
                          </div>
                          <div>
                            <h6 className="fw-bold">
                              <label className="toggle">
                                <input type="checkbox" />
                                <span className="slider"></span>
                                <span
                                  className="labels"
                                  data-on="ON"
                                  data-off="OFF"
                                ></span>
                              </label>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Manage token popop ends */}

            {/* Add token popop starts */}

            {showTokenModal && tokenState.step2 && (
              <div className="popmodal-body tokn-popup no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="black-bg-sec">
                      <div className="token-btn-sec pop-btns-grid">
                        <div className="blk-width">
                          <button
                            type="button"
                            className="btn btn-active w-100"
                            onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: true,
                                step2: false,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}
                          >
                            Token Lists
                          </button>
                        </div>
                        <div className="blk-width">
                          <button
                            type="button"
                            className="btn w-100"
                            onClick={() => {
                              addTokenHandler();
                            }}
                          >
                            Add token
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="sec-search sec-search-secondry">
                      <div
                        className="position-relative search-row"
                        // onClick={() => {
                        //   if(newToken !== '')
                        //   setTokenState({
                        //     step0: false,
                        //     step1: false,
                        //     step2: false,
                        //     step3: true,
                        //     step4: false,
                        //     title: "Manage Token",
                        //   });
                        // }}
                        // onClick={() => {
                        //   addTokenHandler();
                        // }}
                      >
                        <input
                          type="text"
                          className="w-100"
                          placeholder="Enter Token Address"
                          autoFocus={newToken.length > 0}
                          value={newToken}
                          onChange={(e: any) => {
                            addNewToken(e.target.value);
                            // addTokenHandler();
                          }}
                        />
                        <div className="search-icon">
                          <img
                            width="20"
                            height="21"
                            className="img-fluid"
                            src="../../images/search.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pop-mid">
                    <div className="center-content">
                      <p>Custom token not found Add your first custom token</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Add token popop ends */}

            {/* search popop starts */}

            {showTokenModal && tokenState.step3 && (
              <div className="popmodal-body tokn-popup no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="black-bg-sec">
                      <div className="token-btn-sec pop-btns-grid">
                        <div className="blk-width">
                          <button
                            type="button"
                            className="btn btn-active w-100"
                            onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: true,
                                step2: false,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}
                          >
                            Token Lists
                          </button>
                        </div>
                        <div className="blk-width">
                          <button type="button" className="btn w-100">
                            Add token
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="sec-search sec-search-secondry">
                      <div className="position-relative search-row">
                        <input
                          type="text"
                          className="w-100"
                          placeholder="Enter Token Address"
                          onChange={(e) => addNewToken(e.target.value)}
                          autoFocus={newToken.length > 0}
                          value={newToken ? newToken : ""}
                        />
                        <div className="search-icon">
                          <img
                            width="20"
                            height="21"
                            className="img-fluid"
                            src="../../images/search.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-100">
                    <div className="two-col position-relative">
                      <div className="left-sec-img">
                        <div>
                          <img
                            className="img-fluid"
                            src="../../images/alert.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <p className="text-block">
                        Anyone can create a token, including creating FAKE
                        version of existing tokens. Interact with any new token
                        carefully.
                      </p>
                    </div>
                    <div className="row-wrap">
                      <div className="crypto-info">
                        <div className="left-side data">
                          <p className="lite-color">
                            Token Address on Ethereum
                          </p>
                        </div>
                        <div className="right-side data">
                          <p>0x95ad6...4c4ce</p>
                        </div>
                      </div>
                      <div className="crypto-info">
                        <div className="left-side data">
                          <p className="lite-color">
                            Token Address on Shibarium
                          </p>
                        </div>
                        <div className="right-side data">
                          <p>0x6f8a0...1d4ec</p>
                        </div>
                      </div>

                      <div className="crypto-info">
                        <div className="left-side data">
                          <p className="lite-color">Project name</p>
                        </div>
                        <div className="right-side data">
                          <p>SHIBA INU</p>
                        </div>
                      </div>
                      <div className="crypto-info">
                        <div className="left-side data">
                          <p className="lite-color">Ticker name</p>
                        </div>
                        <div className="right-side data">
                          <p>SHIB</p>
                        </div>
                      </div>
                      <div className="crypto-info">
                        <div className="left-side data">
                          <p className="lite-color">Token Decimal</p>
                        </div>
                        <div className="right-side data">
                          <p>18</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="">
                      <a
                        className="btn primary-btn w-100"
                        href="javascript:void(0)"
                        onClick={() => {
                          // setTokenState({
                          //   step0: false,
                          //   step1: false,
                          //   step2: false,
                          //   step3: false,
                          //   step4: true,
                          //   title: "Manage Token",
                          // });
                          addTokenHandler();
                        }}
                      >
                        Add Token
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Search popop ends */}

            {/* new added token with delete action starts */}
            {showTokenModal && tokenState.step4 && (
              <div className="popmodal-body tokn-popup no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="black-bg-sec">
                      <div className="token-btn-sec pop-btns-grid">
                        <div className="blk-width">
                          <button
                            type="button"
                            className="btn btn-active w-100"
                            onClick={() => {
                              setTokenState({
                                step0: false,
                                step1: true,
                                step2: false,
                                step3: false,
                                step4: false,
                                title: "Manage Token",
                              });
                            }}
                          >
                            Token Lists
                          </button>
                        </div>
                        <div className="blk-width">
                          <button type="button" className="btn w-100">
                            Add token
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="sec-search sec-search-secondry">
                      <div className="position-relative search-row">
                        <input
                          type="text"
                          className="w-100"
                          placeholder="Add list by https://"
                        />
                        <div className="search-icon">
                          <img
                            width="20"
                            height="21"
                            className="img-fluid"
                            src="../../images/search.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom pt-0">
                    <div className="">
                      <div className="grid-block">
                        <div className="blk-width">
                          <div>{localTokens.length} Token Found</div>
                          <p className="lite-color">
                            Token stored in your browser
                          </p>
                        </div>
                        <div className="blk-width btn-sm">
                          <button
                            type="button"
                            className="btn primary-btn w-100"
                            onClick={clearAllCustomTokens}
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                      <div className="token-listwrap usr-listht">
                        {localTokens.map((x: any,index:any) => (
                          <div className="tokn-row" key={x.parentContract}>
                            <div className="cryoto-box">
                              <img
                                className="img-fluid"
                                src={
                                  x.logo
                                    ? x.logo
                                    : "../../images/shib-borderd-icon.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className="tkn-grid">
                              <div>
                                <h6 className="fw-bold">{x.parentSymbol}</h6>
                                <p>{x.parentName}</p>
                              </div>
                              <div>
                                <span className="me-4" onClick={()=>spliceCustomToken(index)}>
                                  <img
                                    className="img-fluid"
                                    src="../../images/del.png"
                                    alt=""
                                  />
                                </span>
                                <span>
                                  <img
                                    className="img-fluid"
                                    src="../../images/up.png"
                                    alt=""
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* <div className="tokn-row">
                          <div className="cryoto-box">
                            <img
                              className="img-fluid"
                              src="../../images/shib-borderd-icon.png"
                              alt=""
                            />
                          </div>
                          <div className="tkn-grid">
                            <div>
                              <h6 className="fw-bold">SHIB</h6>
                              <p>Shibatoken</p>
                            </div>
                            <div>
                              <span
                                className="me-4"
                                onClick={() => {
                                  setTokenState({
                                    step0: false,
                                    step1: false,
                                    step2: true,
                                    step3: false,
                                    step4: false,
                                    title: "Manage Token",
                                  });
                                }}
                              >
                                <img
                                  className="img-fluid"
                                  src="../../images/del.png"
                                  alt=""
                                />
                              </span>
                              <span>
                                <img
                                  className="img-fluid"
                                  src="../../images/up.png"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* new added token with delete action ends */}
          </>
          {/* Token popups end */}
        </CommonModal>
        {/* Token popups end */}
        {/* modal code closed */}
        <section className="assets-section">
          <div className="cmn_dashbord_main_outr">
            <InnerHeader />
            {/* withdraw main section start */}
            <div className="box-wrap">
              {/* Left section start */}
              <div className="left-box">
                <div className="block-card">
                  <div className="box-top">
                    <h3 className="mb-3">Shibarium Bridge</h3>
                    {dWState ? (
                      <div className="txt-row">
                        <div className="row-hd">Transfer Overview:</div>
                        <p className="row-description">
                          The deposit process consists of a single transaction.
                        </p>
                      </div>
                    ) : (
                      <div className="txt-row">
                        <div className="row-hd">Withdraw Overview:</div>
                        <p className="row-description">
                          The Withdraw process consists of three transactions.
                        </p>
                      </div>
                    )}
                    {dWState ? (
                      <div className="txt-row">
                        <div className="row-hd">Transfer Time:</div>
                        <p className="row-description">
                          Moving your funds from Ethereum to Shibarium take up
                          to 10 - 15 Minutes.
                        </p>
                      </div>
                    ) : (
                      <div className="txt-row">
                        <div className="row-hd">Withdraw Time:</div>
                        <p className="row-description">
                          Moving your funds from Ethereum to Shibarium take up
                          to 60 mins to 3 hours.
                        </p>
                      </div>
                    )}
                    {
                      <div
                        className={`txt-row ${
                          dWState ? "visVisible" : "visInvisible"
                        }`}
                      >
                        <div className="row-hd">
                          <span className="icon-image">
                            <img
                              className="img-fluid"
                              src="../../images/i-info-icon.png"
                              alt=""
                            />
                          </span>
                          <span className="alignment">
                            Delegation/Staking Advice:
                          </span>
                        </div>
                        <p className="row-description">
                          Delegation/Staking takes place on Ethereum. Do not
                          deposit funds to Shibarium for this purpose.{" "}
                          {/* <a className="orange-txt" href="javascript:void(0);">
                            Staking UI
                          </a> */}
                        </p>
                      </div>
                    }
                  </div>
                  <div className="blank-box"></div>
                  <div className="box-bottom d-flex flex-column justify-content-end">
                    <div
                      className={`amt-section position-relative ${
                        !dWState ? "visVisible" : "visInvisible"
                      }`}
                    >
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            width="20"
                            height="20"
                            src="../../images/red-bone.png"
                            alt=""
                          />
                        </div>
                        <p className="lite-color">
                          Estimation of GAS fee required
                        </p>
                      </div>
                      <div>
                        <p className="lite-color fw-bold">$10.00</p>
                      </div>
                    </div>
                    <div className="amt-section position-relative">
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            src="../../images/eth.png"
                            alt=""
                          />
                        </div>
                        <p className="lite-color">
                          Estimation of GAS fee required
                        </p>
                      </div>
                      <div>
                        <p className="lite-color fw-bold">$10.00</p>
                      </div>
                    </div>
                    <div className="sub-buttons-sec row buttons-fix">
                      <div className="col-lg-6 mb-3 mb-lg-0">
                        {/* <button type="button" className="btn white-btn w-100">
                          How Shibarium Works
                        </button> */}
                        <Link href="how-it-works" passHref>
                          <a target="_blank" className="btn white-btn w-100">
                            How Shibarium Works
                          </a>
                        </Link>
                      </div>
                      <div className="col-lg-6">
                        <button
                          // type="button w-100"
                          className="btn white-btn w-100"
                        >
                          FAQs
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Left section end */}
              {/* Right section start */}
              <div className="right-box">
                <div className="block-card d-flex flex-column justify-content-between">
                  <div className="tab-sec botom-spcing">
                    <ul className="tab-links">
                      <li>
                        <a
                          className={`tb-link ${dWState && "tab-active"}`}
                          onClick={() => setDWState(true)}
                        >
                          Deposit
                        </a>
                      </li>
                      <li>
                        <a
                          className={`tb-link ${!dWState && "tab-active"}`}
                          onClick={() => setDWState(false)}
                        >
                          Withdraw
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* Deposit tab content section start */}
                  {dWState && (
                    <div className="tab-content-sec h-100">
                      <Formik
                        initialValues={{
                          amount: "",
                        }}
                        validationSchema={depositValidations}
                        onSubmit={(values, actions) => {
                          console.log(values);
                          callDepositModal(values);
                        }}
                      >
                        {({
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          values,
                          handleSubmit,
                        }) => (
                          <div className="h-100">
                            <div className="sec-wrapper">
                              <div className="wrap-top">
                                <div className="botom-spcing">
                                  <div>
                                    <label className="mb-2 mb-xxl-3 mb-md-2">
                                      From
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div>
                                          <img
                                            className="img-fluid"
                                            src="../../images/eth.png"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <div className="mid-chain">
                                        <input
                                          className="w-100"
                                          type="text"
                                          placeholder="Ethereum chain"
                                        />
                                      </div>
                                      <div className="rt-chain">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        <span className="fld-txt lite-800">
                                          {selectedToken.balance
                                            ? selectedToken?.balance
                                            : "00.00"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="field-grid row">
                                    <div className="col-lg-6 col-xxl-5 col-sm-12 mb-sm-3 mb-3 mb-lg-0  res-align">
                                      <div
                                        className="form-field position-relative fix-coin-field"
                                        onClick={() => {
                                          setTokenModal(true);
                                          setTokenState({
                                            step0: true,
                                            step1: false,
                                            step2: false,
                                            step3: false,
                                            step4: false,
                                            title: "Select a Token",
                                          });
                                        }}
                                      >
                                        <div className="right-spacing">
                                          <div>
                                            <img
                                              className="img-fluid"
                                              src="../../images/eth.png"
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="lite-800">
                                          <span className="lite-800 fw-bold">
                                            {selectedToken.parentName
                                              ? selectedToken.parentName
                                              : "Select Token"}
                                          </span>
                                        </div>
                                        <div className="lft-spc">
                                          <div className="arow-outer">
                                            <span className="arrow-down"></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-xxl-7 col-sm-12 field-col">
                                      <div className="form-field position-relative two-fld">
                                        <div className="mid-chain w-100">
                                          <input
                                            className="w-100"
                                            type="text"
                                            placeholder="0.00"
                                            value={values.amount}
                                            onChange={handleChange("amount")}
                                          />
                                        </div>
                                        <div
                                          className="rt-chain"
                                          onClick={() => handleMax()}
                                        >
                                          <span className="orange-txt fw-bold">
                                            MAX
                                          </span>
                                        </div>
                                      </div>
                                      {touched.amount && errors.amount ? (
                                        <p className="primary-text pt-0 pl-2">
                                          {errors.amount}
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="botom-spcing">
                                  <div>
                                    <label className="mb-2 mb-xxl-3 mb-md-2">
                                      To
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div>
                                          <img
                                            width="22"
                                            height="22"
                                            className="img-fluid"
                                            src="../../images/shiba-round-icon.png"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <div className="mid-chain">
                                        <input
                                          className="w-100"
                                          type="text"
                                          placeholder="Shibarium chain"
                                        />
                                      </div>
                                      <div className="rt-chain">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        <span className="fld-txt lite-800">
                                          00.00
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="wrap-bottom">
                                <div className="btn-modify">
                                  <button
                                    onClick={() => handleSubmit()}
                                    type="button"
                                    className="btn primary-btn w-100"
                                  >
                                    Transfer
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Formik>
                    </div>
                  )}
                  {/* Deposit tab content section end */}

                  {/* Withdraw tab content section start */}
                  {!dWState && (
                    <div className="tab-content-sec h-100">
                      <form className="h-100">
                        <div className="sec-wrapper">
                          <div className="wrap-top">
                            <div className="botom-spcing">
                              <div>
                                <label className="mb-2 mb-xxl-3 mb-md-2">
                                  From
                                </label>
                                <div className="form-field position-relative txt-fix">
                                  <div className="icon-chain">
                                    <div>
                                      <img
                                        width="22"
                                        height="22"
                                        className="img-fluid"
                                        src="../../images/shiba-round-icon.png"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="mid-chain">
                                    <input
                                      className="w-100"
                                      type="text"
                                      placeholder="Shibarium Mainnet"
                                    />
                                  </div>
                                  <div className="rt-chain">
                                    <span className="fld-head lite-800">
                                      Balance:
                                    </span>
                                    <span className="fld-txt lite-800">
                                      {selectedToken.balance
                                        ? selectedToken?.balance
                                        : "00.00"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="field-grid row">
                                <div className="col-lg-6 col-xxl-5 col-sm-12 mb-sm-3 mb-3 mb-lg-0  res-align">
                                  <div
                                    className="form-field position-relative fix-coin-field h-100"
                                    onClick={() => {
                                      setTokenModal(true);
                                      setTokenState({
                                        step0: true,
                                        step1: false,
                                        step2: false,
                                        step3: false,
                                        step4: false,
                                        title: "Select a Token",
                                      });
                                    }}
                                  >
                                    <div className="right-spacing">
                                      <div>
                                        <img
                                          width="24"
                                          height="24"
                                          className="img-fluid"
                                          src="../../images/red-bone.png"
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                    <div className="lite-800">
                                      <span className="lite-800 fw-bold">
                                        {selectedToken.parentName
                                          ? selectedToken.parentName
                                          : "Select Token"}
                                      </span>
                                    </div>
                                    <div className="lft-spc">
                                      <div className="arow-outer">
                                        <span className="arrow-down"></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-xxl-7 col-sm-12 field-col h-100">
                                  <div className="form-field position-relative two-fld">
                                    <div className="mid-chain w-100">
                                      <input
                                        className="w-100"
                                        type="text"
                                        placeholder="0.00"
                                      />
                                    </div>
                                    <div className="rt-chain">
                                      <span className="orange-txt fw-bold">
                                        MAX
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="botom-spcing">
                              <div>
                                <label className="mb-2 mb-xxl-3 mb-md-2">
                                  To
                                </label>
                                <div className="form-field position-relative txt-fix">
                                  <div className="icon-chain">
                                    <div>
                                      <img
                                        className="img-fluid"
                                        src="../../images/eth.png"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="mid-chain">
                                    <input
                                      className="w-100"
                                      type="text"
                                      placeholder="Ethereum chain"
                                    />
                                  </div>
                                  <div className="rt-chain">
                                    <span className="fld-head lite-800">
                                      Balance:
                                    </span>
                                    <span className="fld-txt lite-800">
                                      00.00
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="wrap-bottom">
                            <div className="btn-modify">
                              <button
                                onClick={() => {
                                  setWithdrawModal(true);
                                  setWidModState({
                                    step0: true,
                                    step1: false,
                                    step2: false,
                                    step3: false,
                                    step4: false,
                                    title: "Initialize Withdraw",
                                  });
                                }}
                                type="button"
                                className="btn primary-btn w-100"
                              >
                                Transfer
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                  {/* Withdraw   tab content section end */}
                </div>
              </div>
              {/* right section start */}
            </div>
            {/* withdraw main section end */}
          </div>
        </section>
      </main>
    </>
  );
}

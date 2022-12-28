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
import { STAKE_MANAGER_PROXY } from "web3/contractAddresses";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import ValidatorShareABI from "../../ABI/ValidatorShareABI.json";
import fromExponential from "from-exponential";
import Header from "pages/layout/header";
import StakingHeader from "pages/staking-header";
import Pagination from "app/components/Pagination";
import DynamicShimmer from "app/components/Shimmer/DynamicShimmer";
import CommonModal from "../components/CommonModel";
import { useUserType } from "../../state/user/hooks";
import { useRouter } from "next/router";
import { addTransaction, finalizeTransaction } from 'app/state/transactions/actions';
import { useAppDispatch } from "../../state/hooks"
import { currentGasPrice, getUserTimeZone, tokenDecimal, USER_REJECTED_TX, web3Decimals } from "web3/commonFunctions";
import * as Sentry from "@sentry/nextjs";
import { dynamicChaining } from "web3/DynamicChaining";
import { CircularProgress } from "@material-ui/core";
const initialModalState = {
  show: false,
  onHash: false,
  onReceipt: false,
  title: ""
}
export default function Unbond() {

  const [list, setList] = useState([]);
  const [listLoader, setListLoader] = useState(true);
  const { account, chainId = 1, library } = useActiveWeb3React();
  const [slicedList, setSlicedList] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [transactionLink, setTransactionLink] = useState('')
  const dispatch = useAppDispatch();
  // const {account,chainId=1} = useActiveWeb3React()
  const [transactionState, setTransactionState] = useState(initialModalState);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const lib: any = library
  const web3: any = new Web3(lib?.provider)
  const [userType, setUserType] = useUserType();
  const [loader, setLoader] = useState(false);
  const [amntTransfer,setAmntTransfer]=useState(false);
  const getValidatorContractAddress = async (validatorID: any) => {
    try {
      let user = account;
      if (account) {
        const instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
        const ID = await instance.methods.getValidatorContract(validatorID).call({ from: account });
        // console.log(ID)
        return ID
      } else {
        // console.log("account addres not found")
      }
    }
    catch (err: any) {
      Sentry.captureException("getValidatorContractAddress ", err);
    }
  }

  const [claimNowModals, setClamNowModals] = useState<any>({
    data: {},
    confirm: false,
    progress: false,
    completed: false,
  })

  const getUnboundHistory = async (account: any) => {
    try {
      await unbondsHistory(account).then(res => {
        if (res.status == 200) {
          const decOrder = res.data.data.result.sort((a: any, b: any) => Date.parse(b.unbondStartedTimeStampFormatted) - Date.parse(a.unbondStartedTimeStampFormatted));
          console.log("decorder => " ,decOrder);
          setList(decOrder)
          updateListFunc()
          // let newL = decOrder.slice(0, pageSize);
          // setSlicedList(newL);
          setListLoader(false)
          // setAmntTransfer(false)
          
        }
      })
    }
    catch (err: any) {
      Sentry.captureException("getUnboundHistory ", err);
    }
  }

  const updateListFunc = () =>{
    console.log("check state")
    if (list.length) {
      const newList  = list.slice(0, pageSize);
      setSlicedList(newList);
      console.log("list updated" , newList, list);
    } else if (list.length === 0) {
      setSlicedList([]);
    } else {
      // console.log("check state");
    }
  }

  useEffect(() => {
    updateListFunc()
  }, [list]);

  // useEffect(()=>{
  //   getUnboundHistory(account)
  // },[])

  // console.log(claimNowModals)
  const unboundClaimAPI = async () => {
    setLoader(true)
    // setAmntTransfer(true)
    // router.push(
    //   `/unbond-history`,
    //   `/unbond-history`,
    //   { shallow: true }
    // )
    
    try {
      setTransactionState({ show: true, onHash: false, onReceipt: false, title: "Pending" });
      setTransactionLink("");
      let data = {
        delegatorAddress: account,
        validatorId: claimNowModals?.data?.validatorId,
        unbondNonce: claimNowModals?.data?.nonce
      }
      let validatorContract = await getValidatorContractAddress((parseInt(data.validatorId)))
      // console.log(data, validatorContract)
      if (account) {
        let walletAddress = account
        let instance = new web3.eth.Contract(ValidatorShareABI, validatorContract);
        let gasFee = await instance.methods.unstakeClaimTokens_new(data.unbondNonce).estimateGas({ from: walletAddress })
        let encodedAbi = await instance.methods.unstakeClaimTokens_new(data.unbondNonce).encodeABI()
        let CurrentgasPrice: any = await currentGasPrice(web3)
        // console.log((parseInt(gasFee) + 30000) * CurrentgasPrice, " valiuee ==> ")
        await web3.eth.sendTransaction({
          from: walletAddress,
          to: validatorContract,
          gas: (parseInt(gasFee) + 30000).toString(),
          gasPrice: CurrentgasPrice,
          // value : web3.utils.toHex(combinedFees),
          data: encodedAbi
        })
          .on('transactionHash', (res: any) => {
            // console.log(res, "hash")
            dispatch(
              addTransaction({
                hash: res,
                from: walletAddress,
                chainId,
                summary: `${res}`,
              })
            )
            const link = getExplorerLink(chainId, res.transactionHash, 'transaction')
            setTransactionLink(link)
            // console.log(link)
            setClamNowModals((pre: any) => ({ ...pre, progress: true, confirm: true }))
            setTransactionState({ show: true, onHash: true, onReceipt: false, title: "Submitted" });
            
          }).on('receipt', (res: any) => {
            // console.log(res, "receipt")
            setTimeout(() => {
              router.push(
                `/unbond-history`,
                `/unbond-history`,
                { shallow: true }
              )
              getUnboundHistory(account);
            },100);
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
            
            setTransactionState({ show: true, onHash: true, onReceipt: true, title: "Completed" });
            setLoader(false)
            setClamNowModals({
              data: {},
              confirm: false,
              progress: false,
              completed: false
            })
            // getUnboundHistory(account);
            setTransactionState(initialModalState);
            
            // setAmntTransfer(!amntTransfer)
            // router.push("/unbond-history" , "/unbond-history" , {shallow:true})
          }).on('error', (res: any) => {
            // console.log(res, "error")
            setTransactionState(initialModalState);
            setClamNowModals({
              data: {},
              confirm: false,
              progress: false,
              completed: false
            })
            setLoader(false)
          })
      }
    }
    catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureException("unboundClaimAPI ", err);
      }
      setTransactionState(initialModalState);
    }
    // console.log(validatorContract)
  }
  const pageChangeHandler = (index: number) => {
    const slicedList = list.slice((index - 1) * pageSize, index * pageSize);
    setSlicedList(slicedList);
    setCurrentPage(index);
  };



  const handleModalClosing = () => {
    setClamNowModals((pre: any) => ({
      ...pre,
      confirm: false,
      progress: false,
      completed: false,
    }))
  }
  const router = useRouter();

  useEffect(() => {
    if (account) {
      getUnboundHistory(account)
    } else {
      router.back();
    }
  }, [userType, account]);

  const removeGMT = (x: any) => {
    let lastIndex = x.lastIndexOf(" ");
    return x.substring(0, lastIndex);
  };


  var countDecimals = function (value: any) {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
  };
  const fixedDecimals = (num: any) => {
    try {
      if (countDecimals(num) > 3) {
        return (Math.round(num * 100) / 100).toFixed(tokenDecimal);
      }
      else {
        return num
      }
    }
    catch (err: any) {
      Sentry.captureException("fixedDecimals ", err);
    }
  };

  useEffect(() => {
    if (userType != "Delegator") {
      router.push('/bone-staking')
    }
  }, [userType])

  const reloadOnHash = () => {
    if (transactionState.onHash) {
      // window.location.reload()
      getUnboundHistory(account)
      router.push(
        `/unbond-history`,
        `/unbond-history`,
        { shallow: true }
      )
    }
  }

  return (
    <>
      <CommonModal
        title={"Withdraw Rewards"}
        show={claimNowModals.confirm}
        setshow={() => {
          setTransactionState(initialModalState);
          setClamNowModals(false);
          reloadOnHash();
        }}
        externalCls="stak-pop del-pop ffms-inherit"
      >
        <div className="popmodal-body tokn-popup no-ht trans-mod">
          <div className="pop-block">
            <ul className="stepper mt-3 del-step">
              <li className="step active">
                <div className="step-ico">
                  <img
                    className="img-fluid"
                    src="../../assets/images/tick-yes.png"
                    alt="check-icon"
                  />
                </div>
                <div className="step-title">Approved</div>
              </li>
              <li className={`step ${(transactionState.onHash) && "active"}`}>
                <div className="step-ico">
                  <img
                    className="img-fluid"
                    src="../../assets/images/tick-yes.png"
                    alt="check-icon"
                  />
                </div>
                <div className="step-title">Submitted</div>
              </li>
              <li className={`step ${(transactionState.onReceipt) && "active"}`}>
                <div className="step-ico">
                  <img
                    className="img-fluid"
                    src="../../assets/images/tick-yes.png"
                    alt="check-icon"
                  />
                </div>
                <div className="step-title">Completed</div>
              </li>
            </ul>
            {
              transactionState.show && transactionState.title == "Pending" && (
                <div className="del-tab-content" style={{ height: "80%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div className="pb-3 pb-sm-4">
                    <h5 className="mb-3 text-center">
                      Your unbounding period is complete. you can claim your stake
                      now.
                    </h5>
                    <p className="lite-text text-center lite-color fw-600">
                      Your stake will be transferred to
                      <span className="d-block txt-wrp">{account}</span>
                    </p>
                  </div>
                  <div className="dark-bg-800 p-2 p-sm-3 text-center">
                    <p className="lite-color fw-600">Stake to claim</p>
                    <h3>{claimNowModals?.data?.amount ? parseInt(claimNowModals?.data?.amount) / 10 ** web3Decimals + " BONE " : null} </h3>
                    {/* <p className="lite-color fw-600">$8.17</p> */}
                  </div>
                  {/* <div className="arrow-block mt-2 mt-sm-3">
                  <p>$3.359 Gas Fee</p>
                  <div className="arrow-float">
                      <img className="img-fluid" src="../../assets/images/rt-arow.png" alt="arrow" width={8} />
                  </div>
              </div> */}
                  <div className="button-wrap mt-3">
                    <button
                      type="button"
                      disabled={loader}
                      className="btn primary-btn w-100"
                      onClick={() => unboundClaimAPI()}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )
            }
            {transactionState.onHash && transactionState.title == "Submitted" && (
              <div className="step_content fl-box">
                <div className="ax-top">
                  <div className="image_area row">
                    <div className="col-12 text-center watch-img-sec">
                      <CircularProgress color="inherit" size={120} style={{ color: "#f06500" }} />
                    </div>
                  </div>
                  <div className="mid_text row">
                    <div className="col-12 text-center">
                      <h4 className="ff-mos">Transaction Processing</h4>
                    </div>
                    <div className="col-12 text-center">
                      <p className="ff-mos">
                        BONE transactions can take longer time to complete
                        based upon network congestion. Please wait or increase
                        the gas price of the transaction.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ax-bottom">
                  <div className="pop_btns_area row form-control mt-3">
                    <div className="col-12">
                      <button
                        className={`btn primary-btn d-flex align-items-center justify-content-center w-100`}
                        // target="_blank"
                        disabled={transactionLink == "" ? false : true}
                        onClick={() => window.open(transactionLink)}
                      // href={hashLink}
                      >
                        <span>View on Block Explorer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {
              transactionState.onReceipt && transactionState.title == "Completed" && (
                <div className="step_content fl-box">
                  <div className="ax-top">
                    <div className="image_area row">
                      <div className="col-12 text-center watch-img-sec">
                        <img
                          className="img-fluid img-wdth"
                          src="../../assets/images/cmpete-step.png"
                          width="150"
                          height="150"
                        />
                      </div>
                    </div>
                    <div className="mid_text row">
                      <div className="col-12 text-center">
                        <h4 className="ff-mos">Transaction Completed</h4>
                      </div>
                      <div className="col-12 text-center">
                        <p className="ff-mos">
                          Transaction is completed. Visit link to see details.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ax-bottom">
                    <div className="pop_btns_area row form-control mt-3">
                      <div className="col-12">
                        <button className="w-100">
                          <a
                            className="btn primary-btn d-flex align-items-center justify-content-center"
                            target="_blank"
                            href={transactionLink}
                          >
                            <span>View on Block Explorer</span>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </CommonModal>
      <Header />
      <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh ffms-inherit staking-main">
        {/* <StakingHeader /> */}
        <section className="top_bnr_area dark-bg">
          <div className="container">
            <h1 className="ff-mos">Your Unbound History</h1>
          </div>
        </section>

        <section className="mid_cnt_area">
          <div className="container">
            <div className="cmn_dasdrd_table block-fix tb-ubd">
              <div className="table-responsive">
                <table className="table table-borderless fix-tabl-layout text-start">
                  <thead>
                    <tr>
                      <th>Validator Name</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th className="text-center time-th"><span className="fix-ele">Timestamp</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedList.length ? (
                      slicedList.map((value: any) => (
                        <tr key={value.unbondStartedTxHash}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="coin-img me-2">
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/bear.png"
                                  alt="coin"
                                  width={50}
                                  height={50}
                                />
                              </div>
                              <div>
                                <span className="tb-data ">
                                  {value.validatorName}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="tb-data align">
                              {fixedDecimals(parseInt(value.amount) / 10 ** 18)} Bone
                            </span>
                            {/* <p className="mb-0 fs-12 mute-text">$8.2</p> */}
                          </td>
                          <td>
                            {value.completed ? (
                              <>
                                <div className="align-items-center claim_btn_wrapper">
                                  <span className="tb-data align up-text">
                                    Success
                                  </span>
                                  <button className="mb-0 fs-12 mt-1 hd-sel disabled block">
                                    Claimed
                                  </button>
                                  <div className="tool-desc">You have already claimed this reward.</div>
                                </div>
                              </>
                            ) : value.remainingEpoch > 0 ? (
                              <>
                                <div className="claim_btn_wrapper">
                                  <span className="d-block align up-text mb-1">
                                    Wait for <b>{value.remainingEpoch}</b>{" "}
                                    checkpoints
                                  </span>
                                  <button
                                    className="primary-badge px-2 hd-sel disabled block"
                                    type="button"
                                    disabled={true}
                                    onClick={() => {
                                      setClamNowModals({
                                        data: value,
                                        confirm: true,
                                        progress: false,
                                        completed: false,
                                      });
                                    }
                                    }
                                  //  className="mb-0 fs-12 "
                                  >
                                    Claim Now
                                  </button>
                                  <div className="tool-desc">This reward cannot be claimed at the moment.</div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="claim_btn_wrapper">
                                  <span className="d-block align up-text mb-1">
                                    Unbound period completed
                                  </span>
                                  <button
                                    className="primary-badge px-2 hd-sel block"
                                    type="button"
                                    onClick={() => {
                                      // console.log("called ===> " , value);
                                      {
                                        setClamNowModals({
                                          data: value,
                                          confirm: true,
                                          progress: false,
                                          completed: false,
                                        });
                                        setTransactionState({
                                          show: true,
                                          onHash: false,
                                          onReceipt: false,
                                          title: "Pending"
                                        })
                                      }
                                    }}
                                  //  className="mb-0 fs-12 "
                                  >
                                    Claim Now
                                  </button>
                                  <div className="tool-desc">Click here to claim your reward.</div>
                                </div>
                              </>
                            )}

                          </td>
                          <td className="text-start">
                            <span className="tb-data align">
                              {getUserTimeZone(value.unbondStartedTimeStampFormatted)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : !list.length && !slicedList.length && listLoader ? (
                      <tr>
                        <td colSpan={4}>
                          <DynamicShimmer type={"table"} rows={13} cols={4} />
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
              {!listLoader && !list.length && !slicedList.length ? (
                <div className="no-found">
                  <div>
                    <div className="text-center">
                      <img src="../../assets/images/no-record.png" />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="mt-sm-4 mt-3">
              {slicedList.length ? (
                <Pagination
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalCount={list.length}
                  onPageChange={pageChangeHandler}
                />
              ) : null}
            </div>
          </div>
        </section>
      </main>
      {/* modal started  */}
    </>
  );
}

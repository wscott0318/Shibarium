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
import Header from "pages/layout/header";
import StakingHeader from "pages/staking-header";
import Pagination from "app/components/Pagination";
import DynamicShimmer from "app/components/Shimmer/DynamicShimmer";
import CommonModal from "../components/CommonModel";
import { useUserType } from "../../state/user/hooks";
import { useRouter } from "next/router";
import { addTransaction, finalizeTransaction } from 'app/state/transactions/actions';
import { useAppDispatch } from "../../state/hooks"


export default function Unbond() {

    const [list, setList] = useState([]);
    const [listLoader, setListLoader] = useState(true);
    const { account, chainId=1 , library} = useActiveWeb3React();
    const [slicedList, setSlicedList] = useState([]);
    const [ confirm, setConfirm] = useState(false);
    const [transactionLink, setTransactionLink] = useState('')
    const dispatch = useAppDispatch();
    // const {account,chainId=1} = useActiveWeb3React()
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const lib: any = library
    const web3: any = new Web3(lib?.provider)
    const [userType, setUserType] = useUserType();
    
    const getValidatorContractAddress = async (validatorID:any) => {
        let user = account;
        if(account){
          const instance = new web3.eth.Contract(proxyManagerABI, PROXY_MANAGER);
          const ID = await instance.methods.getValidatorContract(validatorID).call({ from: account });
          // console.log(ID)
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
                // console.log(res.data.data.result)
                const decOrder = res.data.data.result.sort((a:any,b:any) => Date.parse(b.unbondStartedTimeStampFormatted) - Date.parse(a.unbondStartedTimeStampFormatted));
                setList(decOrder)
                setListLoader(false)
            }
        }).catch(err => {
            // console.log(err);
            setListLoader(false)
        })
    }
    // console.log(claimNowModals)
    const unboundClaimAPI = async () => {
        let data = {
            delegatorAddress: account,
            validatorId: claimNowModals?.data?.validatorId,
            unbondNonce: claimNowModals?.data?.nonce
        }
        // console.log(data)
        let validatorContract = await getValidatorContractAddress(data.validatorId)
        if(account){
            let walletAddress = account
            let instance = new web3.eth.Contract(ValidatorShareABI, validatorContract);
            let gasLimit = await instance.methods.unstakeClaimTokens_new(data.unbondNonce).estimateGas({ from: walletAddress })
            // console.log(gasLimit + 30000, "gas limit === >")
            await instance.methods.unstakeClaimTokens_new(data.unbondNonce).send({ from: walletAddress })
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
              const link = getExplorerLink(chainId , res.transactionHash,'transaction')
              setTransactionLink(link)
              // console.log(link)
              setClamNowModals((pre:any) => ({...pre, progress: true, confirm: false}))
            }).on('receipt', (res: any) => {
              // console.log(res, "receipt")
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
              getUnboundHistory(account)
            }).on('error', (res: any) => {
              // console.log(res, "error")
              setClamNowModals({
                data:{},
                confirm: false,
                progress:false,
                completed:true
            })
              if (res.code === 4001) {
                // console.log("User desined this transaction! ")
              }
            })
          }
        // console.log(validatorContract)
    }
    const pageChangeHandler = (index: number) => {
      const slicedList = list.slice((index - 1) * pageSize, index * pageSize);
      setSlicedList(slicedList);
      setCurrentPage(index);
    };
    useEffect(() => {
      if (list.length) {
        const slicedList = list.slice(0, pageSize);
        setSlicedList(slicedList);
      } else if (list.length === 0) {
        setSlicedList([]);
      } else {
        // console.log("check state");
      }
    }, [list]);
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
    const router = useRouter();
    useEffect(() => {
      if (userType !== "Delegator") {
        router.back();
      }
    }, [userType]);

    const removeGMT = (x:any) => {
      let lastIndex = x.lastIndexOf(" ");
      return x.substring(0, lastIndex);
    };
    var countDecimals = function (value:any) {
      if (Math.floor(value) === value) return 0;
      return value.toString().split(".")[1].length || 0;
    };
    const fixedDecimals = (num: any) => {
      if(countDecimals(num) > 3)
      {
        return (Math.round(num * 100) / 100).toFixed(6);
      }
      else {
        return num
      }
      
    };

    return (
      <>
        <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh top-space ffms-inherit">
          <Header />
          <StakingHeader />
          <section className="top_bnr_area dark-bg">
            <div className="container">
              <h1 className="ff-mos">Your Unbound History</h1>
            </div>
          </section>

          <section className="mid_cnt_area">
            <div className="container">
              <div className="cmn_dasdrd_table block-fix">
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
                        slicedList.reverse().map((value: any) => (
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
                                  <div className="align-items-center">
                                    <span className="tb-data align up-text">
                                      Success
                                    </span>
                                    <p className="mb-0 fs-12 primary-text mt-1">
                                      Claimed
                                    </p>
                                  </div>
                                </>
                              ) : value.remainingEpoch > 0 ? (
                                <>
                                  <div className="">
                                    <span className="d-block align up-text mb-1">
                                      Wait for <b>{value.remainingEpoch}</b>{" "}
                                      checkpoints
                                    </span>
                                    <button
                                      className="primary-badge px-2"
                                      type="button"
                                      disabled={true}
                                      onClick={() =>
                                        setClamNowModals({
                                          data: value,
                                          confirm: true,
                                          progress: false,
                                          completed: false,
                                        })
                                      }
                                      //  className="mb-0 fs-12 "
                                    >
                                      Claim Now
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="">
                                    <span className="d-block align up-text mb-1">
                                      Unbound period completed
                                    </span>
                                    <button
                                      className="primary-badge px-2"
                                      type="button"
                                      onClick={() => {
                                        // console.log("called ===> ");
                                        setClamNowModals({
                                          data: value,
                                          confirm: true,
                                          progress: false,
                                          completed: false,
                                        });
                                      }}
                                      //  className="mb-0 fs-12 "
                                    >
                                      Claim Now
                                    </button>
                                  </div>
                                </>
                              )}
                            </td>
                            <td className="text-start">
                              <span className="tb-data align">
                                {removeGMT(value.unbondStartedTimeStampFormatted)}
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
                        <img src="../../images/no-record.png" />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="mt-sm-4 mt-3">
                {slicedList.length ?(
                  <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={list.length}
                    onPageChange={pageChangeHandler}
                  />
                ):null}
              </div>
            </div>
          </section>
        </main>

        {/* modal started  */}
        <CommonModal
          title={"Restake"}
          show={claimNowModals.confirm}
          setShow={setClamNowModals}
          externalCls=""
        >
          <div className="del-tab-content">
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
              <h3>{parseInt(claimNowModals?.data?.amount) / 10 ** 18} Bone</h3>
              {/* <p className="lite-color fw-600">$8.17</p> */}
            </div>
            {/* <div className="arrow-block mt-2 mt-sm-3">
                  <p>$3.359 Gas Fee</p>
                  <div className="arrow-float">
                      <img className="img-fluid" src="../../images/rt-arow.png" alt="arrow" width={8} />
                  </div>
              </div> */}
            <div className="button-wrap mt-3">
              <button
                type="button"
                className="btn primary-btn w-100"
                onClick={() => unboundClaimAPI()}
              >
                Confirm Unbond
              </button>
            </div>
          </div>
        </CommonModal>
      </>
    );
}

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


export default function Unbond() {

    const [list, setList] = useState([]);
    const [listLoader, setListLoader] = useState(true);
    const { account, chainId=1 , library} = useActiveWeb3React();
    const [slicedList, setSlicedList] = useState([]);
    const [ confirm, setConfirm] = useState(false);
    const [transactionLink, setTransactionLink] = useState('')
    // const {account,chainId=1} = useActiveWeb3React()
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);
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
        console.log("check state");
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
    console.log("List",list)

    return (
      <>
        <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh top-space">
          <Header />
          <StakingHeader />

          <section className="top_bnr_area dark-bg">
            <div className="container">
              <h1>Your Unbound History</h1>
            </div>
          </section>

          <section className="mid_cnt_area">
            <div className="container">
              <div className="cmn_dasdrd_table block-fix table-fix">
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Validator Name</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Timestamp</th>
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
                                <span className="tb-data align">
                                  {value.validatorName}
                                </span>
                              </div>
                            </td>
                            <td>
                              <span className="tb-data align">
                                {parseInt(value.amount) / 10 ** 18} Bone
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
                                      onClick={() => setClamNowModals({})}
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
                              )}
                            </td>
                            <td className="text-start">
                              <span className="tb-data align">
                                {value.unbondStartedTimeStampFormatted}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : !list.length && !slicedList.length && listLoader ? (
                        <tr>
                          <td colSpan={6}>
                            <DynamicShimmer type={"table"} rows={3} cols={4} />
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
                {!list.length ? (
                  <div className="no-found">
                    <div>
                      <div className="text-center">
                        <img src="../../images/no-record.png"/>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={list.length}
                onPageChange={pageChangeHandler}
              />
            </div>
          </section>
        </main>
      </>
    );
}

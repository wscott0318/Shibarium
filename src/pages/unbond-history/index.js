/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InnerHeader from "../inner-header";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { unbondsHistory, unboundClaim } from "../../services/apis/delegator";
import { useActiveWeb3React } from '../../services/web3'
import { parse } from "path";
import { getExplorerLink } from 'app/functions'
import ConfirmPopUp from "../../pages/components/ConfirmPopUp";
import LoadingSpinner from "../../pages/components/Loading";
import { CommonModalNew } from "../components/CommonModel";
import { TailSpin } from "react-loader-spinner";


export default function Unbond() {

    const [list, setList] = useState([]);
    const [listLoader, setListLoader] = useState(true);
    const { account, chainId=1 } = useActiveWeb3React();
    const [ confirm, setConfirm] = useState(false);
    const [transactionLink, setTransactionLink] = useState('')
    // const {account,chainId=1} = useActiveWeb3React()

    const [claimNowModals, setClamNowModals] = useState({
        data: {},
        confirm: false,
        progress: false,
        completed: false,
    })

    const getUnboundHistory = (account) => {
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
    const unboundClaimAPI = () => {
        setClamNowModals(pre => ({...pre, progress: true, confirm: false}))
        let data = {
            delegatorAddress: account,
            validatorId: claimNowModals?.data?.validatorId,
            unbondNonce: claimNowModals?.data?.nonce
        }
        console.log(data)
        unboundClaim(data).then(res => {
            if(res.status == 200){
            console.log(res.data.data)
            const link = getExplorerLink(chainId , res?.data?.data?.transactionHash,'transaction')
            setTransactionLink(link)
            console.log(link)
            }
            setClamNowModals({
                data:{},
                confirm: false,
                progress:false,
                completed:true
            })
            getUnboundHistory(account)
        }).catch(err => {
            console.log(err)
            setClamNowModals({
                data:{},
                confirm: false,
                progress:false,
                completed:true
            })
        })
    }

    useEffect(() => {
        if(account){
            getUnboundHistory(account)
        }
    },[])

    const handleModalClosing = () => {
        setClamNowModals({
            data: {},
            confirm: false,
            progress: false,
            completed: false,
        })
    }


    return (
        <>
         {listLoader && <LoadingSpinner />}
            <InnerHeader />
            <div className="page-wrapper">
                <main className="delegatorgrid-sec">
                    <div className="botom-space-lg">
                        <div className="darkBg position-relative sec-spc-high">
                            <div className="container">
                                <div className="row">
                                    <div className="text-center col-sm-8 text-sm-start">
                                        <h1 className="light-text fnt-58 fnt-100">Your Unbound History</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container acct-sec">
                        <div className="baner-card top-margin">
                            <h3 className="mb-0 mb-3 text-white fwb">History</h3>
                            <div className="mb-4 table-wrap table-responsive mb-lg-5">
                                <table className="table">
                                    <thead>
                                        <tr className="table-header">
                                            <th className="cell-width-lg">Validator Name</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th className="text-start">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        list.length ? 
                                        list.map(value => 
                                            <tr key={value.unbondStartedTxHash}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="coin-img me-2">
                                                        <img className="img-fluid" src="../../assets/images/bear.png" alt="coin" width={50} height={50} />
                                                    </div>
                                                    <span className="tb-data align">{value.validatorName}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="tb-data align">{parseInt(value.amount) / 10 ** 18} Bone</span>
                                                <p className="mb-0 fs-12 mute-text">$8.2</p>
                                            </td>
                                            <td>
                                            {
                                                value.completed ? 
                                                <>
                                                <div className="align-items-center">
                                                    <span className="tb-data align up-text">Success</span>
                                                    <p className="mb-0 fs-12 primary-text mt-1">Claimed</p>
                                                </div>
                                                </> :
                                                value.remainingEpoch > 0 ? 
                                                <>
                                                    <div className="">
                                                        <span className="d-block align up-text mb-1">Wait for <b>{value.remainingEpoch}</b> checkpoints</span>
                                                        <button className="primary-badge px-2"
                                                    type="button"
                                                    disabled={true}
                                                    onClick={() => setClamNowModals({
                                                        
                                                    })}
                                                    //  className="mb-0 fs-12 "
                                                    >
                                                    Claim Now
                                                    </button>                                                       
                                                    </div>
                                                </>
                                                :
                                                <>
                                                <div className="">
                                                    <span className="d-block align up-text mb-1">Unbound period completed</span>
                                                    <button className="primary-badge px-2"
                                                    type="button"
                                                    onClick={() => setClamNowModals({
                                                        data: value,
                                                        confirm: true,
                                                        progress: false,
                                                        completed: false,
                                                    })}
                                                    //  className="mb-0 fs-12 "
                                                    >
                                                    Claim Now
                                                    </button> 
                                                </div>
                                                </>
                                            }
                                                
                                            </td>
                                            <td className="text-start">
                                                <span className="tb-data align">{value.unbondStartedTimeStampFormatted}</span>
                                            </td>
                                        </tr>
                                        ) : null
                                    }
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
                


 {/* ======================== Claim stake modals =================================*/}

                {/* 1st screen */}
                <CommonModalNew
                    title={"Claim Stake"}
                    show={claimNowModals.confirm}
                    setShow={handleModalClosing}
                    >
                    <div>
                        <div className="center-align">
                        <p className="fw-bold fs-18">Your unbounding period is complete. You can claim your stake now.</p>
                        <p className="mute-text fs-12 fw-600 mb-3"> Your stake will be transferred to <br/>
                        {account}</p>
                        </div>
                        <div className="card">
                        <div className="text-center">
                            <h6 className="mute-text mb-2">Stake to claim</h6>
                            <h3>{parseInt(claimNowModals.data.amount) / 10**18 } Bone</h3>
                            {/* <h6 className="mute-text">$8.17</h6> */}
                        </div>
                        </div>
                        {/* <div className="d-flex justify-content-between align-items-center">
                        <div className="mt-2">
                            $3.359 Gas Fee
                        </div>
                        <div className="mt-2 text-end">
                            <img className="img-fluid" src="../../assets/images/arrow-right-white.png" alt="img-fluid" width={6} />
                        </div>
                        </div> */}
                        <button type="button" 
                        onClick={() => unboundClaimAPI()}
                        className="btn warning-btn mt-3 mt-sm-4 w-100">Withdraw to Wallet</button>
                    </div>
                </CommonModalNew>


                {/* progress modal  */}
                <CommonModalNew
                    title={"Claim Stake"}
                    show={claimNowModals.progress}
                    setShow={handleModalClosing}
                    >
                    <div>
                        <div className="spin-outer position-relative">
                        <div className="loading-spinner">
                            <TailSpin color="#f06500" height={80} width={80} />
                        </div>
                        </div>
                        <div className="center-align mt-4">
                        <p className="fw-bold fs-18">Transaction in progress</p>
                        <p>Bone Transaction can take upto 5 minute to complete. Please wait or increase the gas in metamask.</p>
                        {/* <a href="javascript:void(0);" title="">View on Etherscan</a> */}
                        </div>
                    </div>
                    </CommonModalNew>

                    {/* complete transaction popup   */}
                    <CommonModalNew
                        title={"Claim Stake"}
                        show={claimNowModals.completed}
                        setShow={handleModalClosing}
                        >
                        <div>
                            
                            <div className="center-align ">
                            <p className="fw-bold fs-18">Stake Claimed</p>
                            <p>Your Claim stake Transaction is successful. The transaction might take 1-2 minutes to be updated in your account.</p>
                            <a href={transactionLink} target='_blank' title="">View on Block Explorer</a>
                            </div>
                        </div>
                        </CommonModalNew>
            </div>
        </>
    );
}

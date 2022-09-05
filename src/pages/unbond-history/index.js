/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InnerHeader from "../inner-header";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { unbondsHistory, unboundClaim } from "../../services/apis/delegator";
import { useActiveWeb3React } from '../../services/web3'
import { parse } from "path";


export default function Unbond() {

    const [list, setList] = useState([]);
    const { account } = useActiveWeb3React();

    const getUnboundHistory = (account) => {
        unbondsHistory(account).then(res => {
            if(res.status == 200) {
                console.log(res.data.data.result)
                setList(res.data.data.result)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const unboundClaimAPI = (item) => {
        console.log(data, " called api ")
        let data = {
            delegatorAddress: account,
            validatorId: item.validatorId,
            unbondNonce: item.nonce
        }
        unboundClaim(data).then(res => {
            if(res.status == 200){
                console.log(res.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }


    useEffect(() => {
        if(account){
            getUnboundHistory(account)
        }
    },[])

    return (
        <>
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
                                            <th>Timestamp</th>
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
                                                <div className="d-flex align-items-center">
                                                    <span className="tb-data align up-text">Success</span>
                                                    <p className="mb-0 fs-12 ms-2 primary-text mt-1">claimed</p>
                                                </div>
                                                </> :
                                                value.remainingEpoch > 0 ? 
                                                <>
                                                    <div className="d-flex align-items-center">
                                                        <span className="tb-data align up-text">wait for <b>{value.remainingEpoch}</b> checkpoints</span>
                                                        <p className="mb-0 fs-12 primary-badge px-2 ms-2 mt-1">claim now</p>                                                        
                                                    </div>
                                                </>
                                                :
                                                <>
                                                <div className="d-flex align-items-center">
                                                    <span className="tb-data align up-text">unbound period completed</span>
                                                    <button className="primary-badge px-2"
                                                    type="submit"
                                                    onChange={() => unboundClaimAPI(value)}
                                                    //  className="mb-0 fs-12 "
                                                    >
                                                    claim now
                                                    </button> 
                                                </div>
                                                </>
                                            }
                                                
                                            </td>
                                            <td>
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


            </div>
        </>
    );
}

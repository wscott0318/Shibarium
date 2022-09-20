/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InnerHeader from "../inner-header";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import {unbondRewards} from "../../services/apis/delegator";
import { useActiveWeb3React } from '../../services/web3'

export default function Unbond() {

    const { account, chainId=1 , library} = useActiveWeb3React();
    const [list, setList] = useState([])
    const [listLoader, setListLoader] = useState(true);

    const getRewardsList = (account :any) => {
        unbondRewards(account).then((res: any) => {
            if(res.status == 200) {
                console.log(res.data.data.result)
                setList(res.data.data.result)
                setListLoader(false)
            }
        }).catch((err : any) => {
            console.log(err);
            setListLoader(false)
        })
    }

    useEffect(() => {
        if(account){
            getRewardsList(account)
        }
    },[account])

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
                                        <h1 className="light-text fnt-58 fnt-100">Your Reward History</h1>
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
                                            list.length && list.map((value:any) => 
                                                <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="coin-img me-2">
                                                            <img className="img-fluid" src="../../assets/images/bear.png" alt="coin" width={50} height={50} />
                                                        </div>
                                                        <span className="tb-data align">{value.validatorId}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="tb-data align">{parseInt(value.rewards) / Math.pow(10, 18)} Bone</span>
                                                    {/* <p className="mb-0 fs-12 mute-text">$8.2</p> */}
                                                </td>
                                                <td>
                                                    <div className="">
                                                    <span className="d-block align up-text">Success</span>
                                                    <p className="mb-0 fs-12 mt-1 primary-text">claimed</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="tb-data align">{value.timestampFormatted}</span>
                                                </td>
                                            </tr>         
                                                )
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

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InnerHeader from "../inner-header";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import {unbondRewards} from "../../services/apis/delegator";
import { useActiveWeb3React } from '../../services/web3'
import Header from "pages/layout/header";
import StakingHeader from "pages/staking-header";
import Pagination from "app/components/Pagination";
import DynamicShimmer from "app/components/Shimmer/DynamicShimmer";
import { useRouter } from "next/router";
import { useUserType } from "../../state/user/hooks";

export default function Unbond() {

    const { account, chainId=1 , library} = useActiveWeb3React();
    const [list, setList] = useState([])
    const [slicedList, setSlicedList] = useState([]);
    const [listLoader, setListLoader] = useState(true);
    const pageSize = 10;
    const [userType, setUserType] = useUserType();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const getRewardsList = (account :any) => {
        unbondRewards(account).then((res: any) => {
            if(res.status == 200) {
                console.log(res.data.result);
                
                const decOrder = res.data.result.sort(
                  (a: any, b: any) =>
                    Date.parse(b.unbondStartedTimeStampFormatted) -
                    Date.parse(a.unbondStartedTimeStampFormatted)
                );
                setList(decOrder);
                setListLoader(false)
            }
        }).catch((err : any) => {
            console.log(err);
            setListLoader(false)
        })
    }

    const pageChangeHandler = (index: number) => {
      const slicedList = list.slice(
        (index - 1) * pageSize,
        index * pageSize
      );
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
            getRewardsList(account)
        }
    },[account])
    
    const formatTimeStamp = (val:any) => {
      return new Date(Number(val*1000)).toLocaleString();
    }
     const router = useRouter();
     useEffect(() => {
       if (userType !== "Delegator") {
         router.back();
       }
     }, [userType]);

    return (
      <>
        <Header />
        <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh font-up ffms-inherit staking-main">
          
          {/* <StakingHeader /> */}

          <section className="top_bnr_area dark-bg">
            <div className="container">
              <h1 className="ff-mos">Your Reward History</h1>
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
                        <th className="text-center">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slicedList.length ? (
                        slicedList.reverse().map((value: any) => (
                        <tr>
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
                                <span className="tb-data">
                                  {value.validatorId}
                                </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="tb-data align">
                                {parseInt(value.rewards) / Math.pow(10, 18)}{" "}
                                Bone
                              </span>
                              {/* <p className="mb-0 fs-12 mute-text">$8.2</p> */}
                            </td>
                            <td>
                              <div className="">
                                <span className="d-block align up-text">
                                  Success
                                </span>
                                <p className="mb-0 fs-12 mt-1 primary-text">
                                  claimed
                                </p>
                              </div>
                            </td>
                            <td>
                              <span className="tb-data align">
                                {formatTimeStamp(value.timestamp)}
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
              { slicedList.length ?
                <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={list.length}
                onPageChange={pageChangeHandler}
              /> : null
              }
              </div>
            </div>
          </section>
        </main>
      </>
    );
}

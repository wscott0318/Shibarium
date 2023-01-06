/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InnerHeader from "../inner-header";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { unbondRewards } from "../../services/apis/delegator";
import { useActiveWeb3React } from '../../services/web3'
import Header from "pages/layout/header";
import StakingHeader from "pages/staking-header";
import Pagination from "app/components/Pagination";
import DynamicShimmer from "app/components/Shimmer/DynamicShimmer";
import { useRouter } from "next/router";
import { useUserType } from "../../state/user/hooks";
import { addDecimalValue, getUserTimeZone, tokenDecimal, web3Decimals } from "web3/commonFunctions";
import { dynamicChaining } from 'web3/DynamicChaining';
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { queryProvider } from "Apollo/client";
import { validatorRewardHistory } from "Apollo/queries";
import * as Sentry from "@sentry/nextjs";

export default function Unbond() {

  const { account, chainId = 1, library } = useActiveWeb3React();
  const lib: any = library
  const web3: any = new Web3(lib?.provider)
  const [list, setList] = useState([])
  const [slicedList, setSlicedList] = useState([]);
  const [listLoader, setListLoader] = useState(true);
  const pageSize = 10;
  const [userType, setUserType] = useUserType();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [validatorData, setValidatorData] = useState<any>([])

  const getRewardsList = (account: any) => {
    try {
      unbondRewards(account).then((res: any) => {
        if (res.status == 200) {
          // console.log(res.data.result);

          const decOrder = res.data.result.sort(
            (a: any, b: any) =>
              Date.parse(b.unbondStartedTimeStampFormatted) -
              Date.parse(a.unbondStartedTimeStampFormatted)
          );
          setList(decOrder);
          setValidatorData(decOrder)
          setListLoader(false)
        }
      })
    }
    catch (err: any) {
      setListLoader(false);
      Sentry.captureException("getRewardsList ", err);
    }
  }

  const getValidatorId = async () => {
    try {
      let user = account;
      if (account) {
        const instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
        const ID = await instance.methods.getValidatorId(user).call({ from: account }); // read
        // console.log(ID)
        return ID
      } else {
        // console.log("account addres not found")
      }
    }
    catch (err: any) {
      Sentry.captureException("getValidatorId ", err);
    }
  }


  const validatorReward = async () => {
    try {
      setListLoader(true)
      let valID = await getValidatorId()
      const validators = await queryProvider.query({
        query: validatorRewardHistory(valID),
      })
      console.log(validators.data.validatorClaimRewards, valID, "added ===> ")
      // return validators.data
      setValidatorData(validators.data.validatorClaimRewards)
      setListLoader(false)
    }
    catch (err: any) {
      Sentry.captureException("validatorReward ", err);
    }
  }

  const pageChangeHandler = (index: number) => {
    try {
      const slicedList = validatorData.slice(
        (index - 1) * pageSize,
        index * pageSize
      );
      setSlicedList(slicedList);
      setCurrentPage(index);
    }
    catch (err: any) {
      Sentry.captureException("pageChangeHandler ", err);
    }
  };
  useEffect(() => {
    if (validatorData.length) {
      let slicedList = validatorData.slice(0, pageSize);
      setSlicedList(slicedList);
    } else if (validatorData.length === 0) {
      setSlicedList([]);
    } else {
      // console.log("check state");
    }
  }, [validatorData]);

  useEffect(() => {
    if (account) {
      if (userType === 'Validator') {
        validatorReward()
      } else {
        getRewardsList(account)
      }

    } else {
      router.push('/')
    }
  }, [account])

  const router = useRouter();

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

        {userType === 'Validator' ? <section className="mid_cnt_area">
          <div className="container reward_table">
            <div className="cmn_dasdrd_table block-fix">
              <div className="table-responsive">
                <table className="table table-borderless fix-tabl-layout text-start">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Amount</th>
                      <th className="text-center">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedList.length ? (
                      slicedList.map((value: any, index: any) => (
                        <tr key={index}>
                          <td>
                            <span className="tb-data">
                              {index + 1}
                            </span>
                          </td>
                          <td>
                            <span className="tb-data align">
                              {addDecimalValue(
                                +(value?.amount) / Math.pow(10, web3Decimals)
                              )}{" "}
                              Bone
                            </span>
                            {/* <p className="mb-0 fs-12 mute-text">$8.2</p> */}
                          </td>
                          <td>
                            <span className="tb-data align">
                              {getUserTimeZone(+(value.timestamp) * 1000)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : !validatorData.length && !validatorData.length && listLoader ? (
                      <tr>
                        <td colSpan={3}>
                          <DynamicShimmer type={"table"} rows={13} cols={3} />
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>

              {!listLoader && !validatorData.length && !validatorData.length ? (
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
              {slicedList.length > 0 ? (
                <Pagination
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalCount={validatorData.length}
                  onPageChange={pageChangeHandler}
                />
              ) : null}
            </div>
          </div>
        </section>
          :
          <section className="mid_cnt_area">
            <div className="container reward_table">
              <div className="cmn_dasdrd_table block-fix">
                <div className="table-responsive">
                  <table className="table table-borderless fix-tabl-layout text-start">
                    <thead>
                      <tr>
                        <th>Validator Name</th>
                        <th>Amount</th>
                        <th className="text-center">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slicedList.length ? (
                        slicedList.map((value: any, index: any) => (
                          <tr key={index}>
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
                                    {value.valName}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="tb-data align">
                                {addDecimalValue(
                                  parseInt(value?.rewards) / Math.pow(10, 18)
                                )}{" "}
                                Bone
                              </span>
                            </td>
                            <td>
                              <span className="tb-data align">
                                {getUserTimeZone(parseInt(value.timestamp) * 1000)}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : null}
                      {!list.length && !slicedList.length && listLoader && (
                        <tr>
                          <td colSpan={3}> 
                            <DynamicShimmer type={"table"} rows={13} cols={3} />
                          </td>
                        </tr>
                        )}
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
                {slicedList.length > 0 ? (
                  <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={validatorData.length}
                    onPageChange={pageChangeHandler}
                  />
                ) : null}
              </div>
            </div>
          </section>}
      </main>
    </>
  );
}

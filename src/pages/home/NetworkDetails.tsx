import { BONE_ID } from "app/config/constant";
import { getNetworkOverviewData } from "app/services/apis/network-details/networkOverview";
import { L1Block, ChainId, PUPPYNET517 } from "app/hooks/L1Block";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
// @ts-ignore
import { ShimmerTitle } from "react-shimmer-effects";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { addDecimalValue, getBoneUSDValue } from "web3/commonFunctions";
import { useWeb3React } from "@web3-react/core";
import { dynamicChaining } from "web3/DynamicChaining";
import * as Sentry from "@sentry/nextjs";
import { queryProvider } from "Apollo/client";
import { validators } from "Apollo/queries";

function NetworkDetails({ valCount }: any) {
  const [boneUSDValue, setBoneUSDValue] = useState<number>(0);
  const [latestBlock, setLatestBlock] = useState<number>(0);
  const [totalStake, setTotalStake] = useState(0);
  const [networkDetails, setNetworkDetails] = useState<any>({});
  const { account, chainId = 1 } = useWeb3React();
  const web3test = PUPPYNET517();
  const web3test2 = L1Block();
  // console.log("validator count ", valCount);

  useEffect(() => {
    try {
      getNetworkOverviewData().then((res: any) => {
        setNetworkDetails(
          res.data && res.data.data && res.data.data.networkDetail
            ? res.data.data.networkDetail
            : {}
        );
        // console.log("network details  => ", res);
      });
      getBoneUSDValue().then((res: any) => {
        setBoneUSDValue(res);
      });
      // console.log(boneUSDValue, "boneUSDValue");

      web3test?.eth?.getBlockNumber().then((lastBlock: number) => {
        setLatestBlock(lastBlock);
      });
    } catch (error: any) {
      Sentry.captureException("getNetworkOverviewData", error);
    }
    getTotalStakes();
  }, [account]);

  const cardShimmerEffects = () => {
    let number = Math.random();
    return (
      <ShimmerTitle
        key={number}
        line={3}
        gap={10}
        className="cus-shimer"
        variant="primary"
      />
    );
  };
  // console.log("chain id ", chainId);

  // GET VALIDATOR ID
  const getTotalStakes = async () => {
    try {
      let Chain_ID = await ChainId();
      const instance = new web3test2.eth.Contract(
        stakeManagerProxyABI,
        dynamicChaining[Chain_ID]?.STAKE_MANAGER_PROXY
      );
      const ID = await instance.methods.validatorState().call();
      const totVals = await queryProvider.query({
        query: validators(),
      });
      let vals = totVals.data.validators;
      let initialVal: any = 0;
      vals.forEach((element: any) => {
        let a = +web3test.utils.fromWei(element.delegatedStake, "ether");
        let b = +web3test.utils.fromWei(element.selfStake, "ether");
        initialVal = initialVal + a + b;
      });
      setTotalStake(initialVal);
      return ID;
    } catch (err: any) {
      Sentry.captureMessage("getTotalStakes ", err);
    }
  };

  return (
    <>
      {/* card-section */}

      <section className="card-section">
        <div className="container">
          <div className="heading-sec">
            <h2 className="sub-head ff-mos">Network Overview</h2>
          </div>
          <div className="grid-contain">
            {Object.keys(networkDetails).length ? (
              <div className="row ff-mos">
                <div className="col-md-6 col-xl-4 col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>{valCount}</span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Total Validators</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            value={addDecimalValue(+totalStake || 0)}
                          />{" "}
                          BONE
                        </span>
                      </div>
                      <div className="mid-head">
                        <span>
                          {/* <NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={+(((+totalStake) * boneUSDValue).toFixed(tokenDecimal))} /> */}
                        </span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Total Stake</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            value={addDecimalValue(
                              +networkDetails?.totalReward || 0
                            )}
                          />{" "}
                          BONE
                        </span>
                      </div>
                      <div className="mid-head">
                        <span>
                          {/* <NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={addDecimalValue((networkDetails?.totalReward || 0) * boneUSDValue)} /> */}
                        </span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Total Reward Distributed</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 mob-margin col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            value={latestBlock}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Shibarium Block Height</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 mob-margin col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            value={networkDetails?.heimdallHeight}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Heimdall Block Height</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 mob-margin col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            value={networkDetails?.lastCheckpointId || 0}
                          />
                        </span>
                      </div>
                      <div className="mid-head">
                        <span>
                          {networkDetails?.lastCheckpointInterval || "0"} ago
                        </span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Last Checkpoint</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 mob-margin col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>{networkDetails?.averageInterval}</span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Checkpoint Interval</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                {[...Array(7)].map((x: any, index: any) => (
                  <div
                    className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col"
                    key={x?.val}
                  >
                    <div className="bs-card card">{cardShimmerEffects()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* card section  end */}
    </>
  );
}

export default NetworkDetails;

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Header from "../layout/header";
import { ProgressBar } from "react-bootstrap";
import { Slider } from "@material-ui/core";
import { ChainId, L1Block } from "app/hooks/L1Block";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { dynamicChaining } from "web3/DynamicChaining";
import { ERC20_ABI } from "app/constants/abis/erc20";
import { useActiveWeb3React } from "app/services/web3";
import Web3 from "web3";
import { tokenDecimal } from "web3/commonFunctions";
import LoadingSpinner from "pages/components/Loading";
import { queryProvider } from "Apollo/client";
const Rewards = () => {
  const { library, account, chainId = 1, }: any = useActiveWeb3React()
  const web3: any = new Web3(library?.provider)
  const [proVal, setProVal] = useState(70);
  const [bonePercent, setBonePercent] = useState<any>(1);
  const [duration, setDuration] = useState<any>(365);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [myStake, setMyStake] = useState<any>(10000);
  const [currentStake,setCurrentStake] = useState(90527);
  const rewardPerCheckpoint = 505;
  const checkpointPerDay = 48;
  const dailyReward = rewardPerCheckpoint*checkpointPerDay;
  const [myDailyReward,setMyDailyReward] = useState<any>(dailyReward*(myStake/currentStake));
  const [totalStaked,setTotalStaked] = useState<any>(myStake+currentStake);
  const [dpr,setDpr] = useState(myDailyReward/dailyReward*100);
  const [apr,setApr] = useState((myDailyReward*duration)/(totalStaked)*100);
  console.log(apr," dpr" ,dpr)

  const getTotalSupply = async () => {
    const web3: any = new Web3(library?.provider);
    const contract = new web3.eth.Contract(ERC20_ABI, dynamicChaining[chainId].BONE);
    contract.methods.totalSupply().call().then((res: any) => {
      contract.methods.decimals().call().then((d: number) => {
        setTotalSupply(+(+res / Math.pow(10, d)).toFixed(tokenDecimal));
        setLoading(false);
      })
    }).catch((err: any) => {
      console.log(err);
    })
  }

  const updateValues = () => {
    setMyDailyReward(dailyReward*(myStake/currentStake));
    setTotalStaked(myStake+currentStake);
    setDpr(myDailyReward/dailyReward*100);
    setApr((myDailyReward*duration)/(totalStaked)*100);
  }

  useEffect(() => {
    getTotalSupply();
  }, []);
  
  useEffect(() => {
    updateValues();
  },[bonePercent,myStake,duration,myDailyReward]);
  return (
    <>
      <Header />
      <main className="main-content dark-bg-800 full-vh  cmn-input-bg ffms-inherit staking-main">
        {/* <StakingHeader /> */}
        <section className="top_bnr_area dark-bg darkbg py-4 py-md-5">
          <div className="container">
            <h1 className="text-white trs-6 fw-500 ff-mos">
              Rewards Calculator
            </h1>
          </div>
        </section>
        <section className="rewards-section-cal">
          {loading ? <LoadingSpinner /> :
            (<div className="container">
              <div className="row">
                <div className="col-xl-7 col-lg-7 col-md-10 mx-auto me-md-auto order-2 order-lg-1 mb-4 mb-lg-0">
                  <h4 className="fw-600 mb-4 ff-mos">
                    Calculate Your Delegation Rewards With BONE Staking
                  </h4>
                  <div className="input-wrap mb-4">
                    <p className="mb-2 light-text fw-600 ff-mos">
                      How much BONE will you delegate?
                    </p>
                    <div className="input-box">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="10000"
                        onChange={(e) => setMyStake(e.target.value)}
                        defaultValue={myStake}
                      />
                      <span className="over-text primary-text trs-3">BONE</span>
                    </div>
                  </div>
                  <div className="dark-bg low-radius sec-spc-low position-relative mb-4 stat">
                    <div className="image-section mb-0">
                      <img
                        width="189"
                        height="147"
                        className="img-fluid"
                        src="../../assets/images/shadow-img.png"
                        alt=""
                      />
                    </div>
                    <div className="row ff-mos">
                      <div className="col-sm-6 col-12 text-sm-start text-center rt-border">
                        <h6 className="fw-600 light-text mb-2 mb-sm-4 ff-mos">
                          <span className="ms-2 align ff-mos">
                            Current Shiba Tokens Staked %
                          </span>
                        </h6>
                        <h2 className="light-text low-font-wt mb-2 mb-sm-0 ff-mos">
                          <span className="ff-mos">{parseInt('' + ((currentStake*100)/totalSupply * 100)) / 100} %</span>
                        </h2>
                      </div>
                      <div className="col-sm-6 col-12 text-sm-start text-center left-space">
                        <h6 className="fw-600 light-text mb-2 mb-sm-4">
                          <span className="ms-2 align ff-mos">
                            Projected Shiba Tokens Staked
                          </span>
                        </h6>
                        <h2 className="light-text low-font-wt mb-2 mb-sm-0">
                          <span className="ff-mos">{(totalSupply * bonePercent) / 100}</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="progresbar-wrap ps-2 pe-2">
                    <div className="prog-group">
                      <label
                        htmlFor=""
                        className="prog-label"
                        style={{
                          left: `calc(${bonePercent}% - 27px)`,
                        }}
                      >
                        {bonePercent}%
                      </label>
                      <Slider
                        defaultValue={proVal}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        value={bonePercent}
                        style={{ color: "#F06700" }}
                        min={1}
                        onChange={(e, val) => setBonePercent(val)}
                      />
                    </div>
                  </div>
                  <div className="input-wrap mb-4">
                    <p className="mb-2 light-text fw-600 ff-mos">
                      How many days do you want to delegate BONE for?
                    </p>
                    <div className="input-box">
                      <input
                        type="number"
                        name="duration"
                        className="form-control"
                        placeholder="365"
                        value={duration}
                        defaultValue={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        max="365"
                      />
                      <span className="over-text primary-text trs-3">DAYS</span>
                    </div>
                  </div>
                  <div className="whitebg content-card">
                    <div className="d-flex mb-4">
                      <div className="icon-note me-2">
                        <span className="trs-3">!</span>
                      </div>
                      <div className="fwb dark-text">
                        <span className="trs-2 ff-mos">Important Note:</span>
                      </div>
                    </div>
                    <div className="content-wrap">
                      <p className="dark-text mb-sm-3 mb-2 ff-mos">
                        All reward figures given here are indicative. Actual
                        rewards earned will depend on the actual total locked
                        supply in the network at each checkpoint. This is expected
                        to vary significantly as more BONE tokens get locked in
                        the staking contracts.
                      </p>
                      <p className="dark-text mb-sm-3 mb-2 ff-mos">
                        Please refer to this article for more details on the
                        staking economics. Broadly speaking, the target locked
                        supply in 30% of the BONE token circulating supply.
                      </p>
                      <p className="dark-text mb-sm-3 mb-2 ff-mos">
                        Rewards will be higher to begin with, and will keep
                        decreasing as the locked supply % goes up. This change in
                        locked supply is captured at every checkpoint, and rewards
                        are calculated based on this. The presented results are
                        based on prediction formulae and we cannot guarantee any
                        kind of accuracy.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-5 col-md-10 mx-auto ms-md-auto order-1 order-lg-2 mb-4 mb-lg-0">
                  <div className="side-card">
                    <div className="sid-card-header primary-bg2">
                      <div className="imgae-wrap">
                        <img
                          className="img-fluid"
                          src="../../assets/images/reward-calculator.png"
                          alt="reward-img"
                        />
                      </div>
                      <h4 className="mb-0 fwb-600 text-white">
                        <span className="trs-3 ff-mos">Project Rewards</span>
                      </h4>
                    </div>
                    <div className="shib-img text-center pt-4">
                      <img
                        className="img-fluid m-auto"
                        src="../../assets/images/shib-img-2.png"
                        alt="shiba-img"
                        width={200}
                      />
                    </div>
                    <ul className="side-card-lst">
                      <li className="card-list-item">
                        <div className="card-icon lightBg lightbg">
                          <div className="icon-wrap">
                            <div className="icon-dott">
                              <div className="icon-ball"></div>
                            </div>
                          </div>
                        </div>
                        <div className="card-content">
                          <h2 className="fwb mb-0 trs-6">
                            <span className="trs-3 ff-mos">~{parseInt('' + (dpr * 100)) / 100}</span>
                          </h2>
                          <div className="hr"></div>
                          <span className="light-text ff-mos">
                            Absolute Reward (for 365 days)
                          </span>
                        </div>
                      </li>
                      <li className="card-list-item">
                        <div className="card-icon green-50">
                          <div className="icon-wrap">
                            <img
                              className="img-fluid"
                              src="../../assets/images/reward-green.png"
                              alt="reward-img"
                            />
                          </div>
                        </div>
                        <div className="card-content">
                          <h2 className="fwb mb-0 trs-6">
                            <span className="trs-3 ff-mos">~{parseInt('' + ((dpr) * 100)) / 100} %</span>
                          </h2>
                          <div className="hr"></div>
                          <span className="light-text ff-mos">
                            Absolute Reward %
                          </span>
                        </div>
                      </li>
                      <li className="card-list-item">
                        <div className="card-icon blue-50">
                          <div className="icon-wrap">
                            <img
                              className="img-fluid"
                              src="../../assets/images/reward-blue.png"
                              alt="reward-img"
                            />
                          </div>
                        </div>
                        <div className="card-content">
                          <h2 className="fwb mb-0 trs-6">
                            <span className="trs-3 ff-mos">~{parseInt('' + (apr * 100)) / 100}%</span>
                          </h2>
                          <div className="hr"></div>
                          <span className="light-text ff-mos">
                            Annual Reward % (APR)
                          </span>
                        </div>
                      </li>
                      <li className="card-list-item">
                        <div className="card-icon shades-50">
                          <div className="icon-wrap">
                            <img
                              className="img-fluid"
                              src="../../assets/images/watch-clk.png"
                              alt="reward-img"
                            />
                          </div>
                        </div>
                        <div className="card-content">
                          <h2 className="fwb mb-0 trs-6">
                            <span className="trs-3 ff-mos">~25 Mins</span>
                          </h2>
                          <div className="hr"></div>
                          <span className="light-text ff-mos">
                            Reward Frequency
                          </span>
                        </div>
                      </li>
                      <li className="card-list-item">
                        <div className="card-icon purple-50">
                          <div className="icon-wrap">
                            <img
                              className="img-fluid"
                              src="../../assets/images/watch-clk.png"
                              alt="reward-img"
                            />
                          </div>
                        </div>
                        <div className="card-content">
                          <h2 className="fwb mb-0 trs-6">
                            <span className="trs-3 ff-mos">0.03658% </span>
                          </h2>
                          <div className="hr"></div>
                          <span className="light-text ff-mos">
                            Your Network Share
                          </span>
                        </div>
                      </li>
                    </ul>
                    <div className="sid-card-footer primary-bg2">
                      <h2 className="text-white">
                        <span className="trs-6 ff-mos">
                          {totalSupply}
                          <span className="text-100 fw-600 ff-mos">
                            Shiba Tokens
                          </span>
                        </span>
                      </h2>
                      <span className="text-100 text-white ff-mos">
                        Calculating Supply
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
          }
        </section>
      </main>
    </>
  );
};

export default Rewards;

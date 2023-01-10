/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Header from "../layout/header";
import { ProgressBar } from "react-bootstrap";
import { Slider } from "@material-ui/core";

const Rewards = () => {
  const [proVal, setProVal] = useState(70);
  const [bonePercent, setBonePercent] = useState<any>(0);
  // console.log(bonePercent);
  return (
    <>
      <Header />
      <main className="main-content dark-bg-800 full-vh  cmn-input-bg ffms-inherit staking-main">
        {/* <StakingHeader /> */}
        <section className="rewards-section-cal">
          <div className="container">
            <h4 className="fw-600 mb-4 ff-mos">
              Calculate Your Delegation Rewards With BONE Staking
            </h4>
            <hr />
            <div className="row">
              <div className="col-xl-7 col-lg-7 col-md-10 mx-auto me-md-auto order-2 order-lg-1 mb-4 mb-lg-0">
                <div className="input-wrap mb-4">
                  <p className="mb-2 light-text fw-600 ff-mos">
                    How much BONE will you delegate?
                  </p>
                  <div className="input-box">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="10000"
                    />
                    <span className="over-text primary-text trs-3">BONE</span>
                  </div>
                </div>
                <div className="low-radius position-relative text-end pt-4 pb-4 mt-3 mb-3">
                  <div className="row ff-mos">
                    <div className="col-6">
                      <p className="text-sm">Drag Slider below to increase BONE tokens staked %</p>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center justify-content-end">
                        <p className="fw-600 light-text ff-mos">
                          <span className="align ff-mos text-sm">
                            Current Shiba Tokens Staked % :
                          </span>
                        </p>
                        <p className="light-text low-font-wt ff-mos ms-2">
                          <span className="ff-mos text-sm">101233%</span>
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-end">
                        <p className="fw-600 light-text">
                          <span className=" align ff-mos text-sm">
                            Projected Shiba Tokens Staked :
                          </span>
                        </p>
                        <p className="light-text low-font-wt ms-2">
                          <span className="ff-mos text-sm">2936975.6985</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="progresbar-wrap mb-4">
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
                    <Slider defaultValue={proVal} aria-label="Default" valueLabelDisplay="auto" value={bonePercent} style={{color:"#F06700"}}
                    onChange={(e,val) => setBonePercent(val)}
                    />
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
                      All reward figures given here are indicative. Actual rewards
                      earned will depend on the actual total locked supply in the
                      network at each checkpoint. This is expected to vary
                      significantly as more BONE tokens get locked in the staking
                      contracts.
                    </p>
                    <p className="dark-text mb-sm-3 mb-2 ff-mos">
                      Please refer to this article for more details on the staking
                      economics. Broadly speaking, the target locked supply in 30%
                      of the BONE token circulating supply.
                    </p>
                    <p className="dark-text mb-sm-3 mb-2 ff-mos">
                      Rewards will be higher to begin with, and will keep
                      decreasing as the locked supply % goes up. This change in
                      locked supply is captured at every checkpoint, and rewards
                      are calculated based on this. The presented results are
                      based on prediction formulae and we cannot guarantee any kind
                      of accuracy.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-10 mx-auto ms-md-auto order-1 order-lg-2 mb-4 mb-lg-0">
                <div className="side-card">
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
                          <span className="trs-3 ff-mos">1363952.0236</span>
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
                          <span className="trs-3 ff-mos">~5639.26585%</span>
                        </h2>
                        <div className="hr"></div>
                        <span className="light-text ff-mos">Absolute Reward %</span>
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
                          <span className="trs-3 ff-mos">~253.69358%</span>
                        </h2>
                        <div className="hr"></div>
                        <span className="light-text ff-mos">Annual Reward % (APR)</span>
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
                        <span className="light-text ff-mos">Reward Frequency</span>
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
                        <span className="light-text ff-mos">Your Network Share</span>
                      </div>
                    </li>
                  </ul>
                  <div className="sid-card-footer primary-bg2">
                    <h2 className="text-white">
                      <span className="trs-6 ff-mos">
                        6,698,789,231{" "}
                        <span className="text-100 fw-600 ff-mos">Shiba Tokens</span>
                      </span>
                    </h2>
                    <span className="text-100 text-white ff-mos">
                      Calculating Supply
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Rewards;

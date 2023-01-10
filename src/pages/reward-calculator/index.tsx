/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Header from "../layout/header";
import { ProgressBar } from "react-bootstrap";
import { Slider } from "@material-ui/core";

const Rewards = () => {
  const [proVal, setProVal] = useState(70);
  const [bonePercent, setBonePercent] = useState<any>(0);
  const [duration, setDuration] = useState<any>(365);
  // console.log(bonePercent);
  return (
    <>
      <Header />
      <main className="main-content dark-bg-800 full-vh  cmn-input-bg ffms-inherit staking-main reward-calculator">
        {/* <StakingHeader /> */}
        <section className="rewards-section-cal">
          <div className="container reward-container-wrapper">
            <div className="container">
              <h4 className="fw-600 ff-mos main-heading">
                Calculate Your Delegation Rewards With BONE Staking
              </h4>
              <div className="row main-container">
                <div className="col-xl-7 col-lg-7 col-md-12 mx-auto me-md-auto order-2 order-lg-1 mb-4 mb-lg-0 custom-column">
                  <div className="input-wrap mb-4">
                    <p className="mb-2 light-text text-sm fw-600 ff-mos">
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
                        <p className="text-sm text-start">Drag Slider below to increase BONE tokens staked %</p>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center justify-content-end mb-2">
                          <p className="light-text low-font-wt ff-mos ms-2">
                            <span className="ff-mos text-sm">Current Shiba Tokens Staked %: 36.3820%</span>
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                          <p className="light-text low-font-wt ms-2">
                            <span className="ff-mos text-sm">Projected Shiba Tokens Staked: 2936975.6985</span>
                          </p>
                        </div>
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
                      <Slider defaultValue={proVal} aria-label="Default" valueLabelDisplay="auto" value={bonePercent} style={{ color: "#F06700" }}
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
                  {duration > 365 && <div className="error primary-text">Maximum 365 days allowed for calculation.</div>}
                </div>
                <div className="col-xl-5 col-lg-5 col-md-12 mx-auto ms-md-auto order-1 order-lg-2 mb-4 mb-lg-0 custom-column">
                  <div className="side-card">
                    <div className="side-card-lst-new row p-0">
                      <div className="card-list-item col-12">
                        <div className="card-icon-new">
                          <div className="icon-wrap">
                            <img src="../../assets/images/shib-logo.png" alt="" />
                          </div>
                        </div>
                        <div className="card-content-new">
                          <h2 className="fwb mb-0 trs-6">
                            <span className="trs-3 ff-mos">1363952.0236</span>
                          </h2>
                          <span className="light-text text-sm ff-mos">
                            Absolute Reward (for {duration} days)
                          </span>
                        </div>
                      </div>
                      <div className="card-list-item col-lg-6 col-md-3 col-sm-6 col-12">
                        <div className="card-icon-new">
                          <div className="icon-wrap">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                            </svg>

                          </div>
                        </div>
                        <div className="card-content-new">
                          <h2 className="fwb mb-0 trs-6">
                            <span className="trs-3 ff-mos">~5639.26585%</span>
                          </h2>
                          <span className="light-text text-sm  ff-mos">Absolute Reward %</span>
                        </div>
                      </div>
                      <div className="card-list-item col-lg-6 col-md-3 col-sm-6 col-12">
                        <div className="card-icon-new">
                          <div className="icon-wrap">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                            </svg>

                          </div>
                        </div>
                        <div className="card-content-new">
                          <h2 className="fwb mb-0 trs-6">
                            <span className="trs-3 ff-mos">~253.69358%</span>
                          </h2>
                          <span className="light-text text-sm  ff-mos">Annual Reward % (APR)</span>
                        </div>
                      </div>
                      <div className="card-list-item col-lg-6 col-md-3 col-sm-6 col-12">
                        <div className="card-icon-new">
                          <div className="icon-wrap">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                          </div>
                        </div>
                        <div className="card-content-new">
                          <h2 className="fwb mb-0 trs-6">
                            <span className="trs-3 ff-mos">~25 Mins</span>
                          </h2>
                          <span className="light-text text-sm  ff-mos">Reward Frequency</span>
                        </div>
                      </div>
                      <div className="card-list-item col-lg-6 col-md-3 col-sm-6 col-12">
                        <div className="card-icon-new ">
                          <div className="icon-wrap">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="card-content-new">
                          <h2 className="fwb mb-0 trs-6">
                            <span className="trs-3 ff-mos">0.03658% </span>
                          </h2>
                          <span className="light-text text-sm  ff-mos">Your Network Share</span>
                        </div>
                      </div>
                    </div>
                    <div className="sid-card-footer-new text-center row">
                      <span className="text-100 text-white ff-mos">
                        Calculating Supply = 6,698,789,231 Shiba Tokens
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="content-card">
                <div className="d-flex mb-4">
                  <div className="icon-note me-2">
                    <span className="trs-3">!</span>
                  </div>
                  <div className="fwb">
                    <span className="trs-2 text-light">Important Note:</span>
                  </div>
                </div>
                <div className="content-wrap">
                  <p className=" mb-sm-3 mb-2 ff-mos">
                    All reward figures given here are indicative. Actual rewards
                    earned will depend on the actual total locked supply in the
                    network at each checkpoint. This is expected to vary
                    significantly as more BONE tokens get locked in the staking
                    contracts.
                  </p>
                  <p className=" mb-sm-3 mb-2 ff-mos">
                    Please refer to this article for more details on the staking
                    economics. Broadly speaking, the target locked supply in 30%
                    of the BONE token circulating supply.
                  </p>
                  <p className=" mb-sm-3 mb-2 ff-mos">
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
          </div>
        </section>
      </main>
    </>
  );
};

export default Rewards;

/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";

import Link from "next/link";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import CommonModal from "../components/CommonModel";
import StakingHeader from '../staking-header';
import Header from "../layout/header";
import { Dropdown, Navbar, Container, Nav, ProgressBar } from "react-bootstrap";

const Rewards = () => {
  const [proVal, setProVal] = useState(70);
  return (
    <>
      <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg ffms-inherit">
      <Header />
      <StakingHeader />
        <section className="top_bnr_area dark-bg darkbg py-4 py-md-5">
            <div className="container">
                <h1 className="text-white trs-6 fw-500 ff-mos">Rewards Calculator</h1>
            </div>
        </section>
        <section className="rewards-section-cal">
          <div className="container">
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
                        <span className="ff-mos">101233%</span>
                      </h2>
                    </div>
                    <div className="col-sm-6 col-12 text-sm-start text-center left-space">
                      <h6 className="fw-600 light-text mb-2 mb-sm-4">
                        <span className="ms-2 align ff-mos">
                          Projected Shiba Tokens Staked
                        </span>
                      </h6>
                      <h2 className="light-text low-font-wt mb-2 mb-sm-0">
                        <span className="ff-mos">2936975.6985</span>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="input-wrap mb-4">
                  <p className="mb-2 light-text fw-600  ff-mos">
                    How much BONE will you delegate?
                  </p>
                  <div className="input-box">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="10000"
                    />
                    <span className="over-text primary-text">BONE</span>
                  </div>
                </div>
                <div className="progresbar-wrap mb-4">
                  <div className="prog-group">
                    <label
                      htmlFor=""
                      className="prog-label"
                      style={{
                        left: `calc(${proVal}% - 27px)`,
                      }}
                    >
                      {proVal}%
                    </label>
                    <ProgressBar now={proVal} />
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
                      significantly as more SHIBA tokens get locked in the staking
                      contracts.
                    </p>
                    <p className="dark-text mb-sm-3 mb-2 ff-mos">
                      Please refer to this article for more details on the staking
                      economics. Broadly speaking, the target locked supply in 30%
                      of the SHIBA token circulating supply.
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
              <div className="col-xl-4 col-lg-5 col-md-10 mx-auto ms-md-auto order-1 order-lg-2 mb-4 mb-lg-0">
                <div className="side-card">
                  <div className="sid-card-header primary-bg2">
                    <div className="imgae-wrap">
                      <img
                        className="img-fluid"
                        src="../../images/reward-calculator.png"
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
                      src="../../images/shib-img-2.png"
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
                            src="../../assets/images/watch.png"
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
                            src="../../assets/images/watch.png"
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

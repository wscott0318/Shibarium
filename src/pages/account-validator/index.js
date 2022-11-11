/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import CommonModal from "../components/CommonModel";
import StakingHeader from '../staking-header';
import Header from "../layout/header";
import InnerHeader from '../inner-header'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { NavLink } from "react-bootstrap";

export default function Account() {
  const [show, setShow] = useState(false);
  const [showm, showModal] = useState(false);
  const [com, comShow] = useState(false);
  const [bond, bondShow] = useState(false);

  const { account, chainId = 1 } = useActiveWeb3React();
  const [showretakepop, setretakepop] = useState(false);
  const [showcommissionpop, setcommissionpop] = useState(false);
  const [showwithdrawpop, setwithdrawpop] = useState(false);
  const [showunboundpop, setunboundpop] = useState(false);

  return (
    <>
{/* <<<<<<< HEAD */}
    <Header />
      <main className="main-content dark-bg-800 full-vh  cmn-input-bg staking-main">
                {/* <CommonModal
                    title={"Restake"}
                    show={showretakepop}
                    setShow={setretakepop}
                    externalCls="stak-pop"
                > */}

                    
      {/* <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg">
        <Header />
        <StakingHeader /> */}
        {/* retake popop start */}
        <CommonModal
          title={"Restake"}
          show={showretakepop}
          setShow={setretakepop}
          externalCls="stak-pop"
        >
          <>
            <div className="cmn_modal val_popups">
              <form>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 mb-md-2 text-white">
                      Enter validator address
                    </label>
                    <input
                      type="text"
                      placeholder="Validator address"
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 mb-md-2 text-white">
                      Enter amount
                    </label>
                    <input type="text" placeholder="Amount" className="w-100" />
                  </div>
                </div>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 mb-md-2 text-white">
                      Enter stakereward
                    </label>
                    <input
                      type="text"
                      placeholder="Stakereward"
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="pop_btns_area">
                  <div className="form-control">
                    {/* <a
                      className="btn primary-btn w-100"
                      href="javascript:void(0)"
                    >
                      Submit
                    </a> */}
                    <NavLink
                      className="btn primary-btn w-100"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Submit
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          </>
        </CommonModal>
        {/* retake popop ends */}
{/* >>>>>>> dadcbbdaacded023c6b568e6504a9297bfef5589 */}

        {/* commission popop start */}
        <CommonModal
          title={"Commission"}
          show={showcommissionpop}
          setShow={setcommissionpop}
          externalCls="stak-pop"
        >
          <>
            <div className="cmn_modal val_popups">
              <form>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 mb-md-2 text-white">
                      Enter validator address
                    </label>
                    <input
                      type="text"
                      placeholder="Validator address"
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 mb-md-2 text-white">
                      Enter new commission
                    </label>
                    <input
                      type="text"
                      placeholder="New commission"
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="pop_btns_area">
                  <div className="form-control">
                    {/* <a
                      className="btn primary-btn w-100"
                      href="javascript:void(0)"
                    >
                      Submit
                    </a>{" "} */}
                    <NavLink
                      className="btn primary-btn w-100"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Submit
                    </NavLink>{" "}
                  </div>
                </div>
              </form>
            </div>
          </>
        </CommonModal>
        {/* commission popop ends */}

        {/* withdraw popop start */}
        <CommonModal
          title={"Withdraw rewards"}
          show={showwithdrawpop}
          setShow={setwithdrawpop}
          externalCls="stak-pop"
        >
          <>
            <div className="cmn_modal val_popups">
              <form>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 mb-md-2 text-white">
                      Enter validator address
                    </label>
                    <input
                      type="text"
                      placeholder="Validator address"
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="pop_btns_area">
                  <div className="form-control">
                    {/* <a
                      className="btn primary-btn w-100"
                      href="javascript:void(0)"
                    >
                      Submit
                    </a>{" "} */}
                    <NavLink
                      className="btn primary-btn w-100"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Submit
                    </NavLink>{" "}
                  </div>
                </div>
              </form>
            </div>
          </>
        </CommonModal>
        {/* withdraw popop ends */}

        {/* unbound popop start */}
        <CommonModal
          title={"Unbound"}
          show={showunboundpop}
          setShow={setunboundpop}
          externalCls="stak-pop"
        >
          <>
            <div className="cmn_modal val_popups">
              <form>
                <div className="only_text">
                  <p className="text-center">
                    Are you sure you want to unbound?
                  </p>
                </div>
                <div className="pop_btns_area row mr-top-50 form-control">
                  <div className="col-6">
                    {/* <a
                      className="btn blue-btn w-100 dark-bg-800 text-white"
                      href="javascript:void(0)"
                    >
                      Cancel
                    </a>{" "} */}
                    <NavLink
                      className="btn blue-btn w-100 dark-bg-800 text-white"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Cancel
                    </NavLink>{" "}
                  </div>
                  <div className="col-6">
                    {/* <a
                      className="btn primary-btn w-100"
                      href="javascript:void(0)"
                    >
                      Confirm
                    </a>{" "} */}
                    <NavLink
                      className="btn primary-btn w-100"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Confirm
                    </NavLink>{" "}
                  </div>
                </div>
              </form>
            </div>
          </>
        </CommonModal>
        {/* unbound popop ends */}

        <section className="top_bnr_area dark-bg">
          <div className="container">
            <h1>My Account</h1>
          </div>
        </section>

        <section className="mid_cnt_area">
          <div className="container">
            <div className="col-xl-12 col-lg-12 side-auto">
              <div className="val_del_outr">
                <h4>Ethereum Wallet Balance</h4>
                <h3>
                  <b>0 Bone</b>
                </h3>
                <h4>$0.00</h4>
                <div className="btns_sec val_all_bts row">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                    <button
                      onClick={() => setretakepop(true)}
                      className="btn black-btn w-100 d-block"
                    >
                      Restake
                    </button>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                    <button
                      onClick={() => setcommissionpop(true)}
                      className="btn black-btn w-100 d-block"
                    >
                      Change Commission Rate
                    </button>
                  </div>
                  <div className="col-xl-3  col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                    <button
                      onClick={() => setwithdrawpop(true)}
                      className="btn black-btn w-100 d-block"
                    >
                      Withdraw Rewards
                    </button>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                    <button
                      onClick={() => setunboundpop(true)}
                      className="btn black-btn w-100 d-block"
                    >
                      Unbound
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
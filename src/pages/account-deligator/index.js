import InnerHeader from '../inner-header'
import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import CommonModal from "../components/CommonModel";
import Header from "../layout/header";
import StakingHeader from '../staking-header';

export default function Account() {

    const [show, setShow] = useState(false);
    const [showm, showModal] = useState(false);
    const [com, comShow] = useState(false);
    const [bond, bondShow] = useState(false);

    const { account, chainId = 1 } = useActiveWeb3React();
    const [showvalidatorpop, setvalidatorpop] = useState(false);
    const [showcommissionpop, setcommissionpop] = useState(false);
    const [showwithdrawpop, setwithdrawpop] = useState(false);
    const [showunboundpop, setunboundpop] = useState(false);
    const [showallinonepop, setallinonepop] = useState(false);
    const [showUnboundpop, setUnboundpop] = useState(false);
    const [showClaimpop, setClaimpop] = useState(false);
    return (
        <>
            <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh top-space">
                <Header />
                <StakingHeader />

                {/** unbound popups start */}
                <CommonModal
                    title={"Unbound"}
                    show={showUnboundpop}
                    setShow={setUnboundpop}

                >
                    <>
                        <div className="cmn_modal">
                            <form action="">
                                {/* Unbond popup first start */}
                                <div className="del-tab-content d-none">
                                    <div className="pb-3 pb-sm-4">
                                        <h3>Are your sure you want to unbond?</h3>
                                    </div>
                                    <div className="dark-bg-800 p-2 p-sm-3">
                                        <div className="row">
                                            <div className="col-sm-8 del-lft-col mb-2 mb-sm-3">
                                                <h6>Rewards</h6>
                                                <p>
                                                    You'll receive reward immediately.
                                                </p>
                                            </div>
                                            <div className="col-sm-4 del-rtl-col text-sm-end mb-2 mb-sm-3">
                                                <h6>0.04 Bone</h6>
                                            </div>
                                        </div>
                                        <div className="form-group mb-0">
                                            <div className="d-flex justify-content-between flex-wrap">
                                                <h6 className="mb-1">Withdraw Stake</h6>
                                                <h6 className="mb-1">10 Bone</h6>
                                            </div>
                                            <div className="cmn_inpt_row">
                                                <div className="form-control">
                                                    <input type="text" placeholder="Enter validator address" className="w-100 dark-bg" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="white-label p-2">
                                            <p className="mb-0 text-primary">
                                                Your fund be locked for checkpoints
                                            </p>
                                        </div>
                                    </div>
                                    <div className="arrow-block mt-2 mt-sm-3">
                                        <p>$3.359 Gas Fee</p>
                                        <div className="arrow-float">
                                            <img className="img-fluid" src="../../images/rt-arow.png" alt="arrow" width={8} />
                                        </div>
                                    </div>
                                    <div className="button-wrap mt-3">
                                        <button type="button" className="btn primary-btn w-100">Confirm Unbond</button>
                                    </div>
                                </div>
                                {/* Unbond popup first end */}

                                {/* Unbond popup second start */}
                                <div className="del-tab-content text-center del-height d-none">
                                    <div className="del-flex h-100">
                                        <div className="del-top">
                                            <div className="del-img">
                                                <img className="img-fluid" src="../../images/thumb-up-icon.png" alt="thumb" width={170} />
                                            </div>
                                        </div>
                                        <div className="del-bott">
                                            <h4 className="mb-3">Unbond Initiated </h4>
                                            <p>
                                                The Inbonding process has been initiated. Please come back after
                                                checkpoints and click on "Claim Stake".
                                            </p>
                                            <Link href="javascript:void(0)">
                                                <a className="btn primary-text">
                                                    View on Ethersacan
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Unbond popup second end */}

                                {/* Unbond popup third start */}
                                <div className="del-tab-content text-center del-height d-none">
                                    <div className="del-flex h-100">
                                        <div className="del-top">
                                            <div className="del-img">
                                                <span>
                                                    <span className="spinner-border text-secondary pop-spiner"></span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="del-bott">
                                            <h4 className="mb-3">Transaction in progress </h4>
                                            <p>
                                                Ethereum transaction can take upto 5 minute to complete.
                                                Please wait or increase the gas in meta mask.
                                            </p>
                                            <Link href="javascript:void(0)">
                                                <a className="btn primary-text">
                                                    View on Ethersacan
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Unbond popup third end */}

                                {/* Unbond popup fourth start */}
                                <div className="del-tab-content">
                                    <div className="pb-3 pb-sm-4">
                                        <h3 className="mb-3 text-center">Your unbonding period is complete. you claim your stake now .</h3>
                                        <p className="lite-text text-center lite-color fw-600">
                                            Your stake will be transferred to
                                            <span className="d-block">0x804879077878887hshcbdb8799989hdh2</span>
                                        </p>
                                    </div>
                                    <div className="dark-bg-800 p-2 p-sm-3 text-center">
                                        <p className="lite-color fw-600">Stake to claim</p>
                                        <h3>10 Bone</h3>
                                        <p className="lite-color fw-600">$8.17</p>
                                    </div>
                                    <div className="arrow-block mt-2 mt-sm-3">
                                        <p>$3.359 Gas Fee</p>
                                        <div className="arrow-float">
                                            <img className="img-fluid" src="../../images/rt-arow.png" alt="arrow" width={8} />
                                        </div>
                                    </div>
                                    <div className="button-wrap mt-3">
                                        <button type="button" className="btn primary-btn w-100">Confirm Unbond</button>
                                    </div>
                                </div>
                                {/* Unbond popup fourth end */}
                            </form>
                        </div>
                    </>
                </CommonModal>
                {/** unbound popups start */}

                {/* retake popop start */}
                <CommonModal
                    title={"Retake"}
                    show={showvalidatorpop}
                    setShow={setvalidatorpop}

                >
                    <>


                        <div className="cmn_modal val_popups">
                            <form>
                                <div className="cmn_inpt_row">
                                    <div className="form-control">
                                        <input type="text" placeholder="Enter validator address" className="w-100" />
                                    </div>
                                </div>
                                <div className="cmn_inpt_row">
                                    <div className="form-control">
                                        <input type="text" placeholder="Enter delegator address" className="w-100" />
                                    </div>
                                </div>
                                <div className="cmn_inpt_row">
                                    <div className="form-control">
                                        <input type="text" placeholder="Enter amount" className="w-100" />
                                    </div>
                                </div>
                                <div className="pop_btns_area">
                                    <div className="form-control"><a className='btn primary-btn w-100' href="javascript:void(0)">Submit</a>  </div>
                                </div>
                            </form>
                        </div>

                    </>
                </CommonModal>
                {/* retake popop ends */}

                {/* withdraw popop start */}
                <CommonModal
                    title={"Withdraw Rewards"}
                    show={showwithdrawpop}
                    setShow={setwithdrawpop}

                >
                    <>
                        <div className="cmn_modal val_popups">
                            <form>
                                <div className="cmn_inpt_row">
                                    <div className="form-control">
                                        <input type="text" placeholder="Enter validator address" className="w-100" />
                                    </div>
                                </div>
                                <div className="cmn_inpt_row">
                                    <div className="form-control">
                                        <input type="text" placeholder="Enter delegator address" className="w-100" />
                                    </div>
                                </div>
                                <div className="pop_btns_area">
                                    <div className="form-control"><a className='btn primary-btn w-100' href="javascript:void(0)">Submit</a>  </div>
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

                >
                    <>
                        <div className="cmn_modal val_popups">
                            <form>
                                <div className="only_text">
                                    <p className="text-center">Are you sure you want to unbound?</p>
                                </div>
                                <div className="pop_btns_area row mr-top-50 form-control">
                                    <div className="col-6"><a className='btn dark-bg-800 text-white w-100' href="javascript:void(0)">Cancel</a>  </div>
                                    <div className="col-6"><a className='btn primary-btn w-100' href="javascript:void(0)">Confirm</a>  </div>
                                </div>
                            </form>
                        </div>

                    </>
                </CommonModal>
                {/* unbound popop ends */}


                {/* all in one popop start */}
                <CommonModal
                    title={"Delegate"}
                    show={showallinonepop}
                    setShow={setallinonepop}

                >
                    <>
                        <div className="cmn_modal vali_deli_popups">
                            <ul className="stepper mt-3 del-step">
                                <li className="step active">
                                    <div className="step-ico">
                                        <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon" />
                                    </div>
                                    <div className="step-title">
                                        Approve
                                    </div>
                                </li>
                                <li className="step">
                                    <div className="step-ico">
                                        <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon" />
                                    </div>
                                    <div className="step-title">
                                        Delegate
                                    </div>
                                </li>
                                <li className="step">
                                    <div className="step-ico">
                                        <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon" />
                                    </div>
                                    <div className="step-title">
                                        Completed
                                    </div>
                                </li>
                                {/* <li className="step">
                        <div className="step-ico">
                            <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                        </div>
                        <div className="step-title">
                            Withdraw Completed
                        </div>
                        </li> */}
                            </ul>
                            <div className="step_content d-none">
                                <div className="image_area row">
                                    <div className="col-12 text-center watch-img-sec">
                                        {/* <img className="img-fluid" src="../../images/progrs-img-2.png" /> */}
                                        {/* <img className="img-fluid" src="../../images/progrs-img.png" /> */}
                                        <img className="img-fluid" src="../../images/cmpete-step.png" />
                                    </div>
                                </div>
                                <div className="mid_text row">
                                    {/* <div className="col-12 text-center"><h4>Transaction in progress</h4></div> */}
                                    {/* <div className="col-12 text-center"><h4>Buy Voucher</h4></div> */}
                                    {/* <div className="col-12 text-center"><p>Completing this transaction will stake your Burn tokens and you will start earning rewards for the upcoming checkpoints.</p></div> */}
                                    {/* <div className="col-12 text-center"><h4>Transaction in progress</h4></div>
                            <div className="col-12 text-center"><p>Ethereum transactions can take longer time to complete based  upon network congestion. Please wait for increase the gas price of the transaction</p></div> */}
                                    <div className="col-12 text-center"><h4>Delegation completed</h4></div>
                                    <div className="col-12 text-center"><p>Your SHIBA tokens are staked successfully on validator Tarus Validator. Your delegation will take-1 mintue to reflect in your account.</p></div>
                                </div>
                                <div className="fees_text">
                                    <div className="icon_name">
                                        <span>Estimated transaction fee</span>
                                    </div>
                                    <div className="">
                                        <p>$10.00</p>
                                    </div>
                                </div>
                                <div className="pop_btns_area row form-control">
                                    <div className="col-12">
                                        {/* <a className='btn primary-btn d-flex align-items-center' href="javascript:void(0)">                             
                                    <span>Buy voucher</span>
                                </a> */}
                                        <a className='btn primary-btn d-flex align-items-center' href="javascript:void(0)">
                                            <span>View on Etherscan</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </>
                </CommonModal>
                {/* all in one popop ends */}

                {/* claim stake popop start */}
                <CommonModal
                    title={"claim Stake"}
                    show={showClaimpop}
                    setShow={setClaimpop}

                >
                    <>
                        <div className="cmn_modal">
                            <div className="del-tab-content text-center del-height">
                                <div className="del-flex h-100">
                                    <div className="del-top">
                                        <div className="del-img">
                                            {/* <span>
                                                <span className="spinner-border text-secondary pop-spiner"></span>
                                            </span> */}
                                        </div>
                                    </div>
                                    <div className="del-bott">
                                        <h4 className="mb-3">Stake Claimed </h4>
                                        <p>
                                            Your claim stake Transaction is successful. The Transaction might
                                            take 1-2 minutes to be updated in your account.
                                        </p>
                                        <Link href="javascript:void(0)">
                                            <a className="btn primary-text">
                                                View on Ethersacan
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                </CommonModal>
                {/* claim stake popop ends
                 */}

                <section className="top_bnr_area dark-bg">
                    <div className="container">
                        <h1>My Account</h1>
                    </div>
                </section>

                <section className="mid_cnt_area">
                    <div className="container">
                        <div className="col-xl-9 col-lg-12 side-auto">
                            <h4>Ethereum Wallet Balance</h4>
                            <h3><b>0 Bone</b></h3>
                            <h4>$0.00</h4>
                            <div className="btns_sec val_all_bts row">
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                                    <button className="btn grey-btn w-100 d-block">
                                        Become a Validator
                                    </button>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                                    <button onClick={() => setvalidatorpop(true)} className="btn grey-btn w-100 d-block">
                                        Restake
                                    </button>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                                    <button onClick={() => setwithdrawpop(true)} className="btn grey-btn w-100 d-block">
                                        Withdraw Rewards
                                    </button>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <button onClick={() => setunboundpop(true)} className="btn grey-btn w-100 d-block">
                                        Unbound
                                    </button>
                                </div>
                                <br />   <br />   <br />
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <button onClick={() => setallinonepop(true)} className="btn grey-btn w-100 d-block">
                                        All in one popup btn
                                    </button>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <button onClick={() => setUnboundpop(true)} className="btn grey-btn w-100 d-block">
                                        Unbound Popup 2
                                    </button>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <button onClick={() => setClaimpop(true)} className="btn grey-btn w-100 d-block">
                                        Stake Claim
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

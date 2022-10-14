/* eslint-disable @next/next/no-img-element */
import { UserType } from 'app/enums/UserType';
import { enableList } from 'app/state/lists/actions';
import { useUserType } from 'app/state/user/hooks';
import Link from 'next/link';
import CommonModal from 'pages/components/CommonModel';
import DelegatePopup from 'pages/delegate-popup';
import React, { useState } from 'react';
// @ts-ignore
import { ShimmerTitle, ShimmerTable } from "react-shimmer-effects";

export default function ListView({ validatorsList, searchKey, loading }: { validatorsList: any , searchKey: string , loading : boolean }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState({})
    const [userType, setUserType] = useUserType()

    const tableShimmerEffects = () => {
      return (
        <ShimmerTable row={5} col={5} />
      )
    }
    const [showdelegatepop, setdelegatepop] = useState(false);
    const [delegateState, setdelegateState] = useState({
      step0: true,
      step1: false,
      step2: false,
      step3: false,
      step4:false,
      title: "Delegate",
    });
    console.log(validatorsList)

    return (
      <>
        {/* <DelegatePopup show={modalShow} data={selectedRow}
                onHide={() => setModalShow(false)} /> */}
        <CommonModal
          title={delegateState.title}
          show={showdelegatepop}
          setShow={setdelegatepop}
          externalCls="stak-pop del-pop"
        >
          <>
            <div className="cmn_modal vali_deli_popups">
              <ul className="stepper mt-3 del-step">
                <li className="step active">
                  <div className="step-ico">
                    <img
                      className="img-fluid"
                      src="../../images/tick-yes.png"
                      alt="check-icon"
                    />
                  </div>
                  <div className="step-title">Approve</div>
                </li>
                <li className="step">
                  <div className="step-ico">
                    <img
                      className="img-fluid"
                      src="../../images/tick-yes.png"
                      alt="check-icon"
                    />
                  </div>
                  <div className="step-title">Delegate</div>
                </li>
                <li className="step">
                  <div className="step-ico">
                    <img
                      className="img-fluid"
                      src="../../images/tick-yes.png"
                      alt="check-icon"
                    />
                  </div>
                  <div className="step-title">Completed</div>
                </li>
              </ul>
              {/* added by vivek */}
              {delegateState.step0 && (
                <div className="step_content fl-box">
                  
                  
                    <div className='ax-top'>
                      <div className="info-box my-3">
                    <div className="d-flex align-items-center justify-content-start">
                      <div>
                        <span className="user-icon"></span>
                      </div>
                      <div className="fw-700">
                        <span className="vertical-align ft-22">Val 3</span>
                        <p>
                          <span className="light-text">
                            100% Performance - 13% Commission
                          </span>
                        </p>
                      </div>
                    </div>
                      </div>
                      <div className="form-field position-relative two-fld max-group extr_pd_remove">
                        <div className="mid-chain w-100">
                          <input className="w-100" type="text" placeholder="0.00" />
                        </div>
                        <div className="rt-chain">
                          <span className="orange-txt fw-bold">MAX</span>
                        </div>
                      </div>
                      <p className="inpt_fld_hlpr_txt mt-3 text-pop-right">
                        <span>$ 0.00 </span>
                        <span className="text-right">
                          Available Balance: 00.00 BONE
                        </span>
                      </p>
                    </div>
                    <div className='ax-bottom'>
                      <div className="pop_btns_area row form-control mt-5">
                      <div className="col-12">
                        <button
                          className='w-100'
                          onClick={() => {
                            setdelegateState({
                              ...delegateState,
                              step0: false,
                              step1: true,
                            });
                            setTimeout(() => {
                              setdelegateState({
                                step0: false,
                                step1: false,
                                step2: true,
                                step3: false,
                                step4: false,
                                title: "Delegate",
                              });
                            }, 2000);
                          }}
                        >
                          <a
                            className="btn primary-btn d-flex align-items-center"
                            href="javascript:void(0)"
                          >
                            <span>View on Etherscan</span>
                          </a>
                        </button>
                      </div>
                      </div>
                    </div>
                 
                  
                </div>
              )}
              {/* added by vivek */}

              {/* step 1 */}
              {delegateState.step1 && (
                <div className="step_content fl-box">
                  <div className='ax-top'>
                    <div className="image_area row">
                      <div className="col-12 text-center watch-img-sec">
                        <img
                          className="img-fluid img-wdth"
                          src="../../images/progrs-img-2.png"
                        />
                      </div>
                    </div>
                    <div className="mid_text row">
                      <div className="col-12 text-center">
                        <h4>Transaction in progress</h4>
                      </div>
                      <div className="col-12 text-center">
                        <p>
                          Ethereum transactions can take longer time to complete
                          based upon network congestion. Please wait for increase
                          the gas price of the transaction
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='ax-bottom'>
                    <div className="pop_btns_area row form-control mt-3">
                      <div className="col-12">
                        <a
                          className="btn primary-btn d-flex align-items-center"
                          href="javascript:void(0)"
                        >
                          <span>View on Etherscan</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  

                  
                </div>
              )}

              {/* step 2 */}
              {delegateState.step2 && (
                <div className="step_content fl-box">
                  <div className='ax-top'>
                    <div className="image_area row">
                      <div className="col-12 text-center watch-img-sec">
                        <img
                          className="img-fluid img-wdth"
                          src="../../images/progrs-img.png"
                        />
                      </div>
                    </div>
                    <div className="mid_text row">
                      <div className="col-12 text-center">
                        <h4>Buy Voucher</h4>
                      </div>
                      <div className="col-12 text-center">
                        <p>
                          Completing this transaction will stake your Burn tokens
                          and you will start earning rewards for the upcoming
                          checkpoints.
                        </p>
                      </div>
                    </div>
                    <div className="fees_text">
                      <div className="icon_name">
                        <span>Estimated transaction fee</span>
                      </div>
                      <div className="">
                        <p>$10.00</p>
                      </div>
                    </div>
                  </div>
                  <div className='ax-bottom'>
                    <div className="pop_btns_area row form-control">
                      <div className="col-12">
                        <button
                          className='w-100'
                          onClick={() => {
                            setdelegateState({
                              step0: false,
                              step1: false,
                              step2: false,
                              step3: true,
                              step4: false,
                              title: "Delegate",
                            });
                            setTimeout(() => {
                              setdelegateState({
                                step0: false,
                                step1: false,
                                step2: false,
                                step3: false,
                                step4: true,
                                title: "Delegate",
                              });
                            }, 2000);
                          }}
                        >
                          <a
                            className="btn primary-btn d-flex align-items-center"
                            href="javascript:void(0)"
                          >
                            <span>Buy Voucher</span>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  
                </div>
              )}

              {/* step 3 */}
              {delegateState.step3 && (
                <div className="step_content fl-box">
                  <div className='ax-top'>
                    <div className="image_area row">
                      <div className="col-12 text-center watch-img-sec">
                        <img
                          className="img-fluid img-wdth"
                          src="../../images/progrs-img-2.png"
                        />
                      </div>
                    </div>
                    <div className="mid_text row">
                      <div className="col-12 text-center">
                        <h4>Transaction in progress</h4>
                      </div>
                      <div className="col-12 text-center">
                        <p>
                          Ethereum transactions can take longer time to complete
                          based upon network congestion. Please wait for increase
                          the gas price of the transaction
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='ax-bottom'>
                    <div className="pop_btns_area row form-control mt-3">
                      <div className="col-12">
                        {/* <button onClick={()=>{
                          setdelegateState({
                            step0: false,
                            step1: false,
                            step2: false,
                            step3: false,
                            step4: true,
                            title: "Delegate",
                          });
                          
                        }}> */}
                        <a
                          className="btn primary-btn d-flex align-items-center"
                          href="javascript:void(0)"
                        >
                          <span>View on Ethereum</span>
                        </a>
                        {/* </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* step 4 */}
              {delegateState.step4 && (
                <div className="step_content fl-box">
                  <div className='ax-top'>
                    <div className="image_area row">
                      <div className="col-12 text-center watch-img-sec">
                        <img
                          className="img-fluid img-wdth"
                          src="../../images/cmpete-step.png"
                        />
                      </div>
                    </div>
                    <div className="mid_text row">
                      <div className="col-12 text-center">
                        <h4>Delegation completed</h4>
                      </div>
                      <div className="col-12 text-center">
                        <p>
                          Your SHIBA tokens are staked successfully on validator
                          Tarus Validator. Your delegation will take-1 mintue to
                          reflect in your account.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='ax-bottom'>
                    <div className="pop_btns_area row form-control mt-3">
                      <div className="col-12">
                        <button className='w-100' onClick={()=>setdelegatepop(false)}>
                          <a
                            className="btn primary-btn d-flex align-items-center"
                            href="javascript:void(0)"
                          >
                            <span>View on Ethereum</span>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        </CommonModal>
        <div className="cmn_dasdrd_table">
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Voting Power</th>
                  <th>Self</th>
                  <th className="text-center">Commission</th>
                  <th>Uptime</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {validatorsList.map((x: any, y: any) => (
                  <tr>
                    <td>
                      <span>
                        <img
                          style={{ height: 24 }}
                          src={
                            x.logoUrl
                              ? x.logoUrl
                              : "../../images/shiba-round-icon.png"
                          }
                        />
                      </span>
                      <Link href={`/all-validator/${x.signer}`}>
                        <a>{x.name}</a>
                      </Link>
                    </td>
                    <td>
                      {(x.totalStaked / Math.pow(10, 18)).toFixed(8)} (
                      {(+x.votingPowerPercent || 0).toFixed(2)}%)
                    </td>
                    <td>{+x.selfPercent.toFixed(2)}%</td>
                    <td>{x.commissionPercent}%</td>
                    <td>{x.uptimePercent.toFixed(2)}%</td>
                    <td>
                      <button
                        onClick={() => {
                          setdelegatepop(true);
                          setdelegateState({
                            step0: true,
                            step1: false,
                            step2: false,
                            step3: false,
                            step4: false,
                            title: "Delegate",
                          });
                        }}
                      >
                        DELEGATE
                      </button>
                    </td>
                  </tr>
                ))}
                {validatorsList.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "3rem",
                        }}
                      >
                        No Record Found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
}

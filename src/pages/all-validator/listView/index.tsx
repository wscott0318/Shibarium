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
      step0:true,
      step1:false,
      step2:false,
      title:"Delegate"
    })
    console.log(validatorsList)

    return (
      <>
        {/* <DelegatePopup show={modalShow} data={selectedRow}
                onHide={() => setModalShow(false)} /> */}
        <CommonModal
          title={delegateState.title}
          show={showdelegatepop}
          setShow={setdelegatepop}
          externalCls="stak-pop"
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
                {/* <li className="step">
                        <div className="step-ico">
                            <img className="img-fluid" src="../../images/tick-yes.png" alt="check-icon"/>
                        </div>
                        <div className="step-title">
                            Withdraw Completed
                        </div>
                        </li> */}
              </ul>
              <div className="step_content">
                <div className="image_area row">
                  <div className="col-12 text-center watch-img-sec">
                    {/* <img className="img-fluid" src="../../images/progrs-img-2.png" /> */}
                    {/* <img className="img-fluid" src="../../images/progrs-img.png" /> */}
                    <img
                      className="img-fluid"
                      src="../../images/cmpete-step.png"
                    />
                  </div>
                </div>
                <div className="mid_text row">
                  {/* <div className="col-12 text-center"><h4>Transaction in progress</h4></div> */}
                  {/* <div className="col-12 text-center"><h4>Buy Voucher</h4></div> */}
                  {/* <div className="col-12 text-center"><p>Completing this transaction will stake your Burn tokens and you will start earning rewards for the upcoming checkpoints.</p></div> */}
                  {/* <div className="col-12 text-center"><h4>Transaction in progress</h4></div>
                            <div className="col-12 text-center"><p>Ethereum transactions can take longer time to complete based  upon network congestion. Please wait for increase the gas price of the transaction</p></div> */}
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
                      <button onClick={() => setdelegatepop(true)}>
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

import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEthBalance } from "../../hooks/useEthBalance";
import { BONE_ID } from 'app/config/constant';
import { getBoneUSDValue } from 'app/services/apis/validator';
import NumberFormat from 'react-number-format';

export default function DelegatePopup({data,onHide,...props}) {

  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState('');
  const [tnxCompleted, setTnxCompleted] = useState(false)
 const [boneUSDValue, setBoneUSDValue] = useState(0)

  const walletBalance = useEthBalance();
  useEffect(() => {
    getBoneUSDValue(BONE_ID).then(res=>{
      setBoneUSDValue(res.data.data.price);
    })
  },[])
  const useMax = ()=>{
    setAmount(walletBalance)
  }
  const closeModal =(e)=>{
    setStep(1);
    onHide()
  }

    return (
      <Modal
        {...props}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="shib-popup">
        <Modal.Header closeButton className="text-center">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="d-inline-block fw-800 trs-3">
            Delegate
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="steps">
            <li className="step">
              <div className={`step-blk ${step >= 1 ? "step-active" : ""}`}>
                {step === 1 ? (
                  <span className="fw-700">1</span>
                ) : (
                  <span className="fw-700">
                    <img src="../../assets/images/white-tick.png" alt="" />
                  </span>
                )}
              </div>
              <p className="light-text fw-700">Approve</p>
            </li>
            <li className={`step-line ${step >= 2 ? "step-active" : ""}`}></li>
            <li className="step">
              <div className={`step-blk ${step >= 2 ? "step-active" : ""}`}>
                {step <= 2 ? (
                  <span className="fw-700">2</span>
                ) : (
                  <span className="fw-700">
                    <img src="../../assets/images/white-tick.png" alt="" />
                  </span>
                )}
              </div>
              <p className="light-text fw-700">Delegate</p>
            </li>
            <li
              className={`step-line ${
                step >= 3 && tnxCompleted ? "step-active" : ""
              }`}></li>
            <li className="step">
              <div
                className={`step-blk ${
                  step >= 3 && tnxCompleted ? "step-active" : ""
                }`}>
                <span className="fw-700">3</span>
              </div>
              <p className="light-text fw-700">Completed</p>
            </li>
          </ul>
          {step === 1 ? (
            <>
              <div className="info-box">
                <div className="d-flex align-items-center justify-content-start">
                  <div>
                    <span className="user-icon"></span>
                  </div>
                  <div className="fw-700">
                    <span className="vertical-align ft-22">{data?.name}</span>
                    <p>
                      <span className="light-text">
                        100% Performace - {data?.commissionRate}% Commission
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-4 form-group field-modify my-lg-5 my-md-4">
                <div className="p-0 swap-control swap-flex">
                  <div className="swap-col">
                    <input
                      type="text"
                      className="swap-input"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                    />
                    <span
                      className="primary-text over-text fw-600"
                      style={{ cursor: "pointer" }}
                      onClick={useMax}>
                      MAX
                    </span>
                  </div>
                </div>
                <div className="flex-wrap mt-2 d-flex align-items-center justify-content-between helper-txt fw-600 ft-14">
                  <div>
                    <NumberFormat
                      value={(walletBalance * boneUSDValue).toFixed(4)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />                    
                  </div>
                  <div>Avilable Balance: {walletBalance?.toFixed(8)} BONE</div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn warning-btn w-100"
                  onClick={() => setStep(2)}>
                  <span>Continue</span>
                </button>
              </div>
            </>
          ) : step === 2 ? (
            <div className="top-space-lg">
              <div className="step_prog_img">
                <div className="d-flex align-items-center justify-content-start">
                  <img src="../../assets/images/progrs-img.png" alt="" />
                </div>
              </div>
              <div className="my-4 steps_data my-md-4">
                <div className="flex-wrap mt-2 d-flex align-items-center justify-content-between helper-txt fw-600 ft-14">
                  <h4 className="fw-700 top-space-lg">Buy Voucher</h4>
                  <p className="ft-16 top-space-lg">
                    Completing this transaction will stake your BURN tokens and
                    you will start earning rewards for the upcoming checkpoints
                  </p>
                </div>
                <div className="flex-wrap d-flex align-items-center justify-content-between helper-txt fw-600 ft-14 top-space-lg">
                  <div>Estimated Transaction Fee</div>
                  <div className="warning-color fw-700 ">$26.66</div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn warning-btn w-100"
                  onClick={() => {
                    setStep(3);
                  }}>
                  <span>Buy Voucher</span>
                </button>
              </div>
            </div>
          ) : step === 3 && !tnxCompleted ? (
            <>
              <div className="step_prog_img">
                <div className="d-flex align-items-center justify-content-start">
                  <img src="../../assets/images/progrs-img-2.png" alt="" />
                </div>
              </div>
              <div className="my-4 steps_data my-md-4">
                <div className="flex-wrap mt-2 d-flex align-items-center justify-content-between helper-txt fw-600 ft-14">
                  <h4 className="fw-700 top-space-lg">
                    Transaction in process
                  </h4>
                  <p className="ft-16 top-space-lg">
                    Ethereum transactions can take longer time to complete based
                    upon network congestion. Please wait for increase the gas
                    price of the transation
                  </p>
                </div>
              </div>
              <div>
                <button type="button" className="btn warning-btn w-100">
                  <span>View On Etherscan</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="step_prog_img">
                <div className="d-flex align-items-center justify-content-start">
                  <img src="../../assets/images/cmpete-step.png" alt="" />
                </div>
              </div>
              <div className="my-4 steps_data my-md-4">
                <div className="flex-wrap mt-2 d-flex align-items-center justify-content-between helper-txt fw-600 ft-14">
                  <h4 className="fw-700 top-space-lg">Delegation Completed</h4>
                  <p className="ft-16 top-space-lg">
                    Your SHIBA tokens are staked successfully on validator Tarus
                    Validator. Your delegation will take -1 minute to reflect in
                    your account
                  </p>
                </div>
              </div>
              <div>
                <button type="button" className="btn warning-btn w-100">
                  <span>View On Etherscan</span>
                </button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    );
}



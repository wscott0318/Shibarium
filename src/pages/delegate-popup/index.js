import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEthBalance } from "../../hooks/useEthBalance";

export default function DelegatePopup({data,...props}) {

  const [amount, setAmount] = useState('')
  const walletBalance = useEthBalance();

  const useMax = ()=>{
    setAmount(walletBalance)
  }
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className='shib-popup'
        >
          <Modal.Header closeButton className='text-center'>
            <Modal.Title id="contained-modal-title-vcenter" className='d-inline-block fw-800 trs-3'>
              Delegate
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className='steps'>
              <li className='step'>
                <div className='step-blk step-active'>
                  <span className='fw-700'>1</span>
                </div>
                <p className='light-text fw-700'>
                  Approve
                </p>
              </li>
              <li className='step-line step-active'></li>
              <li className='step'>
                <div className='step-blk'>
                  <span className='fw-700'>2</span>
                </div>
                <p className='light-text fw-700'>
                  Delegate
                </p>
              </li>
              <li className='step-line'></li>
              <li className='step'>
                <div className='step-blk'>
                  <span className='fw-700'>3</span>
                </div>
                <p className='light-text fw-700'>
                  Completed
                </p>
              </li>
            </ul>
            <div className='info-box'>
              <div className="d-flex align-items-center justify-content-start">
                  <div>
                    <span className="user-icon"></span>
                  </div>
                  <div className="fw-700">
                    <span className="vertical-align ft-22">{data?.name}</span>
                    <p><span className="light-text">100% Performace - {data?.commissionRate}% Commission</span></p>
                  </div>
              </div>
            </div>
            <div className="my-4 form-group field-modify my-lg-5 my-md-4">
              <div className="p-0 swap-control swap-flex">
                  <div className="swap-col">
                    <input type="text" className="swap-input" value={amount} onChange={(e)=> setAmount(e.target.value)} placeholder="0.00"/>
                    <span className="primary-text over-text fw-600" onClick={useMax}>MAX</span>
                  </div>
                </div>
                <div className='flex-wrap mt-2 d-flex align-items-center justify-content-between helper-txt fw-600 ft-14'>
                    <div>$0</div>
                    <div>Avilable Balance: {walletBalance?.toFixed(8)}  BONE</div>
                  </div>
              </div>
              <div>
                <button type="button" className="btn warning-btn w-100"><span>Continue</span></button>
              </div>
          </Modal.Body>
        </Modal>
      );
}



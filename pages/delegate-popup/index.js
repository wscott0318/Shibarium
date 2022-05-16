import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
export default function DelegatePopup(props) {
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
                <p className='black-color fw-700'>
                  Approve
                </p>
              </li>
              <li className='step-line step-active'></li>
              <li className='step'>
                <div className='step-blk'>
                  <span className='fw-700'>2</span>
                </div>
                <p className='black-color fw-700'>
                  Delegate
                </p>
              </li>
              <li className='step-line'></li>
              <li className='step'>
                <div className='step-blk'>
                  <span className='fw-700'>3</span>
                </div>
                <p className='black-color fw-700'>
                  Completed
                </p>
              </li>
            </ul>
            <div className='info-box'>
              <div class="d-flex align-items-center justify-content-start">
                  <div>
                    <span class="user-icon"></span>
                  </div>
                  <div class="fw-700">
                    <span class="vertical-align ft-22">Anonymous 18</span>
                    <p><span class="grey-color">100% Performace - 10% Commission</span></p>
                  </div>
              </div>
            </div>
            <div class="form-group field-modify my-lg-5 my-md-4 my-4">
              <div class="swap-control swap-flex p-0">
                  <div class="swap-col">
                    <input type="text" class="swap-input" placeholder="0.00"/><span class="primary-text over-text fw-600">MAX</span>
                  </div>
                </div>
                <div className='d-flex align-items-center justify-content-between helper-txt flex-wrap fw-600 mt-2 ft-14'>
                    <div>$0</div>
                    <div>Avilable Balance: 0.000  SHIBA</div>
                  </div>
              </div>
              <div>
                <button type="button" class="btn warning-btn w-100"><span>Continue</span></button>
              </div>
          </Modal.Body>
        </Modal>
      );
}



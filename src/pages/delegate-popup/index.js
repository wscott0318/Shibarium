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
                    <span className="vertical-align ft-22">Anonymous 18</span>
                    <p><span className="light-text">100% Performace - 10% Commission</span></p>
                  </div>
              </div>
            </div>
            <div className="form-group field-modify my-lg-5 my-md-4 my-4">
              <div className="swap-control swap-flex p-0">
                  <div className="swap-col">
                    <input type="text" className="swap-input" placeholder="0.00"/><span className="primary-text over-text fw-600">MAX</span>
                  </div>
                </div>
                <div className='d-flex align-items-center justify-content-between helper-txt flex-wrap fw-600 mt-2 ft-14'>
                    <div>$0</div>
                    <div>Avilable Balance: 0.000  SHIBA</div>
                  </div>
              </div>
              <div>
                <button type="button" className="btn warning-btn w-100"><span>Continue</span></button>
              </div>

              {/* step 2 start */}

              <div className='top-space-lg dis_none'>
                <ul className='steps'>
                  <li className='step'>
                    <div className='step-blk step-active'>
                      <span className='fw-700'><img src="../../assets/images/white-tick.png" alt=""/></span>
                    </div>
                    <p className='light-text fw-700'>
                      Approve
                    </p>
                  </li>
                  <li className='step-line step-active'></li>
                  <li className='step'>
                    <div className='step-blk step-active'>
                      <span className='fw-700'>2</span>
                    </div>
                    <p className='light-text fw-700'>
                      Delegate
                    </p>
                  </li>
                  <li className='step-line'></li>
                  <li className='step'>
                    <div className='step-blk '>
                      <span className='fw-700'>3</span>
                    </div>
                    <p className='light-text fw-700'>
                      Completed
                    </p>
                  </li>
                </ul>
                <div className='step_prog_img'>
                  <div className="d-flex align-items-center justify-content-start">
                    <img src="../../assets/images/progrs-img.png" alt=""/>
                  </div>
                </div>
                <div className="steps_data my-md-4 my-4">
                    <div className='d-flex align-items-center justify-content-between helper-txt flex-wrap fw-600 mt-2 ft-14'>
                      <h4 className='fw-700 top-space-lg'>Buy Voucher</h4>
                      <p className='ft-16 top-space-lg'>Completing this transaction will stake your BURN tokens and you will start earning rewards for the upcoming checkpoints</p>
                    </div>
                    <div className='d-flex align-items-center justify-content-between helper-txt flex-wrap fw-600 ft-14 top-space-lg'>
                        <div>Estimated Transaction Fee</div>
                        <div className='warning-color fw-700 '>$26.66</div>
                    </div>
                </div>
                <div>
                  <button type="button" className="btn warning-btn w-100"><span>Buy Voucher</span></button>
                </div>
                </div>
              {/* step 2 end */}




          </Modal.Body>
        </Modal>
      );
}



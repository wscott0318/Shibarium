import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
export default function SendPopup(props) {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className='shib-popup'
        >
          <Modal.Header closeButton className='text-center position-relative'>
              <div className='back-blk'>
                  <a href="javascript:void(0);" title=''><img clasName="img-fluid" src="../../assets/images/left-icon.png" width="45" height="78" alt=""></img></a>
              </div>
            <Modal.Title id="contained-modal-title-vcenter" className='d-inline-block fw-800 trs-3 '>
              Send
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            <div>
                <label for="" class="form-label fwb">From</label>
                <div class="form-group field-modify mb-4">
              <div class="swap-control swap-flex p-0">
                  <div class="swap-col">
                    <input className="pe-0 swap-input" type="text" placeholder="Enter receiver address"/>
                  </div>
                </div>
                <div className='helper-txt flex-wrap fw-600 mt-2 ft-14'>
                    <div>Enter vaild address existing on the Shibarium Network.</div>
                  </div>
              </div>
            </div>
            <div class="form-group drop-field mt-2 mb-4">
              <div class="swap-control swap-flex p-0">
                  <div class="swap-col">
                    <input type="text" class="swap-input" placeholder="0.00"/><span class="primary-text over-text fw-600">MAX</span>
                  </div>
                  <div className='coin-btn position-relative'>
                    <i class="arrow down"></i>
                    <div className='movable-block'><img clasName="img-fluid" src="../../assets/images/shiba-coin.png" width="25" height="25" alt=""></img></div>
                    <button className="btn warning-btn w-100 text-start" type='button'><span className='d-inline-block btn-txt'>Shiba</span></button>
                  </div>
                </div>
                <div className='d-flex align-items-center justify-content-between helper-txt flex-wrap fw-600 mt-2 ft-14'>
                    <div>$0</div>
                    <div>Avilable Balance: 0.000  SHIBA</div>
                  </div>
              </div>
              <div>
                <button type="button" class="btn gradient_btn w-100"><span>SEND</span></button>
              </div>
          </Modal.Body>
        </Modal>
      );
}



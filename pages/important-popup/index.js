import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
export default function ImportantPopup(props) {
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
              Important
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='notify-poup'>
                <div className='block-wrap'>
                    <h1 className='ft-20 lft-strip mb-3 mb-sm-4'><span className='align text-hd'>What’s supported</span></h1>
                    <div className="form-check cus-chkbox d-inline-block me-0">
                      <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                      <label className="form-check-label fw-600" for="check2"><span className='top-low-spc'>Sending funds to any address on the Shibarium Network.</span></label>
                    </div>
                    <div className='cus-alert d-inline-block w-100 mt-0 mt-2'>
                      If you want to move your funds from Shibarium mainnet to Ethereum mainnet, Please visit <b>Shibarium Bridge.</b>
                    </div>
                  </div>
                  <div className='block-wrap'>
                    <h1 className='ft-20 lft-strip mb-3 mb-sm-4'><span className='align text-hd'>Sending funds to exchanges</span></h1>
                    <div className='d-flex align-items-top '>
                      <div class="pe-2"><img width="23" height="23" className='img-fluid' src="../../assets/images/alert-icon.png" alt="" /></div>
                      <p className="fw-600">Please click <b><a href="javascript:void(0);" title="">here</a></b> to see all the exchanges that support Shibarium Network</p>
                    </div>
                    <div className='cus-alert d-inline-block w-100 mt-0 mt-2'>
                      Sending funds to any unsupported exchanges will lead to permanent loss of funds.
                    </div>
                  </div>
                  <div className='d-flex align-items-center justify-content-center mt-4 flex-column flex-sm-row mob-btns'>
                    <div className='me-0 me-sm-5 mb-3 mb-sm-0 btn-box'><button type="button" className='btn bordered-btn light-text w-100'><span>CANCEL</span></button></div>
                    <div className="btn-box"><button type="button" className='btn gradient_btn light-text w-100'><span>CONTINUE TO SEND</span></button></div>
                </div>
            </div>
           
          </Modal.Body>
        </Modal>
      );
}



import InnerHeader from '../inner-header'
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Link from "next/link";
export default function Account() {
  
  const [show, setShow] = useState(false);
  const [showm, showModal] = useState(false);
  const [com, comShow] = useState(false);
  const [bond, bondShow] = useState(false);

  return (
    <>
     <InnerHeader />
    <div className="page-wrapper">
      <main className='delegatorgrid-sec'>
        <div className='botom-space-lg'>
            <div className='darkBg  position-relative sec-spc-high'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-8 text-sm-start text-center'>
                            <h1 className='light-text fnt-58 fnt-100'>My Account As A Delegator</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='container'> 
            <div className='center-sec text-center d-none'>
                <h2 className='low-font-wt mb-3'>Ethereum Wallet Balance</h2>
                <h1 className='fw-700 light-text'>0 BONE</h1>
                <h2 className='low-font-wt'>$0.00</h2>
            </div>
            <div className="btn-group-row pt-3 pt-sm-4">
              <div className="btn-col">
                <a href="javascript:void(0)" className='btn warning-btn border-btn light-text w-100'>
                  <span>Become A Validator</span>
                </a>
              </div>
              <div className='btn-col'>
                <a href="javascript:void(0)" onClick={() => setShow(true)} className='btn bordered-btn light-text w-100'>
                  <span>Retake</span>
                </a>
              </div>
              <div className='btn-col'>
                <a href="javascript:void(0)" onClick={() => comShow(true)} className='btn bordered-btn light-text w-100'>
                  <span>Withdraw Rewards</span>
                </a>
              </div>
              <div className='btn-col'>
                <a href="javascript:void(0)" onClick={() => bondShow(true)} className='btn bordered-btn light-text w-100'>
                  <span>Unbound</span>
                </a>
              </div>
            </div>
      </div>
      </main>
        {/* Modal group start */}

        {/* Retake modal start */}
        <div className="modal-wrap">
          <Modal className='shib-popup'
            show={show}
            onHide={() => setShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter "
            centered>
            <Modal.Header closeButton className='text-center'>
              <Modal.Title id="example-custom-modal-styling-title">
                Retake
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="" className="modal-form">
                <div className='form-group'>
                  <label htmlFor="" className="form-label">Validator address</label>
                  <input type="text" className="form-control form-bg" placeholder='Enter Validator address' />
                </div>
                <div className='form-group'>
                  <label htmlFor="" className="form-label">Delegator address</label>
                  <input type="text" className="form-control form-bg" placeholder='Enter Delegator address' />
                </div>
                
                <div className='form-group'>
                  <label htmlFor="" className="form-label">Amount</label>
                  <input type="text" className="form-control form-bg" placeholder='Enter amount' />
                </div>

                <div className='form-group pt-3 pt-md-4'>
                  <button type='buttton' className='btn warning-btn border-btn light-text w-100'><span>Submit</span></button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
        {/* retake modal end */}

        {/* Withdrawl address start */}
        <div className="modal-wrap">
          <Modal className='shib-popup'
            show={showm}
            onHide={() => showModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter "
            centered>
            <Modal.Header closeButton className='text-center'>
              <h4><span>Commission</span></h4>
            </Modal.Header>
            <Modal.Body>
              <form action="" className="modal-form">
                <div className='form-group'>
                  <label htmlFor="" className="form-label">Validator address</label>
                  <input type="text" className="form-control form-bg" placeholder='Enter Validator address' />
                </div>
                <div className='form-group'>
                  <label htmlFor="" className="form-label">new commission</label>
                  <input type="text" className="form-control form-bg" placeholder='Enter amount' />
                </div>
                <div className='form-group pt-3 pt-md-4'>
                  <button type='buttton' className='btn warning-btn border-btn light-text w-100'><span>Submit</span></button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
        {/* widthdrawl modal end */}

        {/* Withdrawl address */}
        <div className="modal-wrap">
          <Modal className='shib-popup'
            show={com}
            onHide={() => comShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter "
            centered>
            <Modal.Header closeButton className='text-center'>
              <h4 className='mb-0'><span className='trs-3'>Withdraws rewards</span></h4>
            </Modal.Header>
            <Modal.Body>
              <form action="" className="modal-form">
                <div className='form-group'>
                  <label htmlFor="" className="form-label">Validator address</label>
                  <input type="text" className="form-control form-bg" placeholder='Enter Validator address' />
                </div>
                <div className='form-group'>
                  <label htmlFor="" className="form-label">Delegator address</label>
                  <input type="text" className="form-control form-bg" placeholder='Enter Delegator address' />
                </div>
                <div className='form-group pt-3 pt-md-4'>
                  <button type='buttton' className='btn warning-btn border-btn light-text w-100'><span>Submit</span></button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
        {/* Withdrawl address */}

        {/* Unbound start */}
        <div className="modal-wrap">
          <Modal className='shib-popup'
            show={bond}
            onHide={() => bondShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter "
            centered>
            <Modal.Header closeButton className='text-center'>
              <h4 className='mb-0'><span className='trs-3'>Unbound</span></h4>
            </Modal.Header>
            <Modal.Body>
                <h3 className='mb-4 px-4 text-center'><span className='trs-3'>Are you sure you want to unbound?</span></h3>
                <div className="row pt-4">
                  <div className="col-sm-6">
                    <a href="javascript:void(0)" className="btn bordered-btn light-text w-100"><span>Cancel</span></a>
                  </div>
                  <div className="col-sm-6">
                    <a href="javascript:void(0)" className="btn warning-btn border-btn light-text w-100"><span>Confirm</span></a>
                  </div>
                </div>
            </Modal.Body>
          </Modal>
        </div>
        {/* Unbound modal end */}

        {/* Modal group clsoed */}
    </div>
    </>
  )
}

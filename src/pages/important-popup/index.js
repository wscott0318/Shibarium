/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export default function ImportantPopup(props) {
  const {modalSend,handleContinueToSend}=props
  const [modaltitle, setModaltitle] = useState("Important");

  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="shib-popup"
    >
      <Modal.Header closeButton  className="text-center">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="d-inline-block fw-800 trs-3"
        >
          {modalSend?"Send":"Important"}
        </Modal.Title>
      </Modal.Header>
      {/* <Modal.Header
        closeButton
        className="text-center position-relative d-none"
      >
        <div className="back-blk">
          <a href="#!;" title="">
            <img
              clasName="img-fluid"
              src="../../assets/images/left-icon.png"
              width="45"
              height="78"
              alt=""
            ></img>
          </a>
        </div>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="d-inline-block fw-800 trs-3 "
        >
          Send
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        {!modalSend ? (
          <div className="notify-poup">
            <div className="block-wrap">
              <h1 className="ft-20 lft-strip mb-3 mb-sm-4">
                <span className="align text-hd">What’s supported</span>
              </h1>
              <div className="form-check cus-chkbox d-inline-block me-0">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="check2"
                  name="option2"
                  value="something"
                />
                <label className="form-check-label fw-600" htmlFor="check2">
                  <span className="top-low-spc">
                    Sending funds to any address on the Shibarium Network.
                  </span>
                </label>
              </div>
              <div className="cus-alert d-inline-block w-100 mt-0 mt-2">
                If you want to move your funds from Shibarium mainnet to
                Ethereum mainnet, Please visit <b>Shibarium Bridge.</b>
              </div>
            </div>
            <div className="block-wrap">
              <h1 className="ft-20 lft-strip mb-3 mb-sm-4">
                <span className="align text-hd">
                  Sending funds to exchanges
                </span>
              </h1>
              <div className="d-flex align-items-top ">
                <div className="pe-2">
                  <img
                    width="23"
                    height="23"
                    className="img-fluid"
                    src="../../assets/images/alert-icon.png"
                    alt=""
                  />
                </div>
                <p className="fw-600">
                  Please click{" "}
                  <b>
                    <a href="#!;" title="">
                      here
                    </a>
                  </b>{" "}
                  to see all the exchanges that support Shibarium Network
                </p>
              </div>
              <div className="cus-alert d-inline-block w-100 mt-0 mt-2">
                Sending funds to any unsupported exchanges will lead to
                permanent loss of funds.
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4 flex-column flex-sm-row mob-btns">
              <div className="me-0 me-sm-5 mb-3 mb-sm-0 btn-box">
                <button
                  type="button"
                  className="btn bordered-btn light-text w-100"
                >
                  <span>CANCEL</span>
                </button>
              </div>
              <div className="btn-box" onClick={handleContinueToSend}>
                <button
                  type="button"
                  className="btn gradient_btn light-text w-100"
                >
                  <span>CONTINUE TO SEND</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="send-block">
              <div>
                <label htmlFor="" className="form-label fwb">
                  From
                </label>
                <div className="form-group field-modify mb-4">
                  <div className="swap-control swap-flex p-0">
                    <div className="swap-col">
                      <input
                        className="pe-0 swap-input"
                        type="text"
                        placeholder="Enter receiver address"
                      />
                    </div>
                  </div>
                  <div className="helper-txt flex-wrap fw-600 mt-2 ft-14">
                    <div>
                      Enter vaild address existing on the Shibarium Network.
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group drop-field mt-2 mb-4">
                <div className="swap-control swap-flex p-0">
                  <div className="swap-col">
                    <input type="text" className="swap-input" placeholder="0.00" />
                    <span className="primary-text over-text fw-600">MAX</span>
                  </div>
                  <div className="coin-btn position-relative">
                    <i className="arrow down"></i>
                    <div className="movable-block">
                      <img
                        clasName="img-fluid"
                        src="../../assets/images/shiba-coin.png"
                        width="25"
                        height="25"
                        alt=""
                      ></img>
                    </div>
                    <button
                      className="btn warning-btn w-100 text-start"
                      type="button"
                    >
                      <span className="d-inline-block btn-txt">Shiba</span>
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between helper-txt flex-wrap fw-600 mt-2 ft-14">
                  <div>$0</div>
                  <div>Available Balance: 0.000 SHIBA</div>
                </div>
              </div>
              <div>
                <button type="button" className="btn gradient_btn w-100">
                  <span>SEND</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect,useState } from "react";
import Header from "../layout/header";
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from "react-bootstrap";
import Sidebar from "../layout/sidebar";
import ImportantPopup from "../important-popup";
import SendPopup from "../send-popup";
import BalanceTable from "./balance-table"
export default function Balance() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalSend, setModalSend] = React.useState(false);
  const [availBalance, setAvailBalance] = useState("0")

  const handleOnHide = () => {
    setModalShow(false);
    setModalSend(false);
  };
  const handleContinueToSend = () => {
    setModalSend(true);
  };
  useEffect(()=>{
    setAvailBalance(localStorage.getItem('balance'))
  })
  return (
    <>
      <ImportantPopup
        show={modalShow}
        onHide={handleOnHide}
        modalSend={modalSend}
        handleContinueToSend={handleContinueToSend}
      />
      {/* <SendPopup show={modalSend} onHide={() => setModalSend(false)} /> */}
      {/* <Header /> */}
      <div className="page-wrapper">
        <Sidebar />
        <main className="main-content">
          <div className="botom-space-md">
            <div className="row">
              <div className="col-lg-7">
                <div className="black_clr_box low-radius sec-spc-low position-relative">
                  <div className="image-section">
                    <img
                      width="189"
                      height="147"
                      className="img-fluid"
                      src="../../assets/images/shadow-img.png"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-8 text-sm-start text-center">
                      <h3 className="fw-700 light-text mb-2 mb-sm-4">
                        Shibarium Testnet
                      </h3>
                      <h2 className="light-text low-font-wt mb-2 mb-sm-0">
                        <span>{` ${(availBalance/Math.pow(10,18)).toFixed(4)}`}</span>
                      </h2>
                    </div>
                    <div className="col-sm-4 balance-btns">
                      <div className="mb-3">
                        <button
                          type="button"
                          className="btn gradient_btn border-btn light-text uppercase-txt w-100"
                        >
                          <span>Recive</span>
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => setModalShow(true)}
                          type="button"
                          className="btn bordered-btn light-text w-100"
                        >
                          <span>Send</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-sec">
            <div className="row align-items-center">
              <div className="col-sm-5 col-12">
                <h4 className="fw-700 trs-1">Balance On Shibarium Testnet</h4>
              </div>
              <div className="col-sm-7 col-12 text-end">
                <div className="d-inline-block">
                  <div className="form-check cus-chkbox d-inline-block">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="check2"
                      name="option2"
                      value="something"
                    />
                    <label
                      className="form-check-label head-xsm fw-600"
                      htmlFor="check2"
                    >
                      <span className="top-low-spc">Hide Zero Balances</span>
                    </label>
                  </div>
                  <div className="form-check cus-chkbox d-inline-block">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="check2"
                      name="option2"
                      value="something"
                    />
                    <label
                      className="form-check-label head-xsm fw-600"
                      htmlFclsor="check2"
                    >
                      <span className="top-low-spc">Plasma Only</span>
                    </label>
                  </div>
                </div>
                <div className="search-box d-inline-block position-relative">
                  <input
                    className="cus-search w-100"
                    type="text"
                    placeholder="Search"
                  ></input>
                  <img
                    width="15"
                    height="15"
                    className="img-fluid"
                    src="../../assets/images/search.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <BalanceTable />
          <div className="text-center pagination-sec">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-12 cus-pagination ms-auto">
                <div className="d-inline-block">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        <span>Previous</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        <span>1</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        <span>2</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        <span>3</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        <span>Next</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-12 text-center text-lg-end mt-3 mt-lg-0">
                <span className="fw-700">Showing 1-8 of 300</span>
              </div>
            </div>
          </div>
          <footer className="main-footer">
            <div className="container">
              <div className="copyright mt-4 mt-lg-5">
                <h3 className="mb-0 text-center fwb">Powered by xFund.</h3>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

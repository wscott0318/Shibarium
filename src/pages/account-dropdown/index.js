/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

export default function ConnectWallet() {
  <>
  <div className="cus-dd">
    <NavDropdown title="Account 5d45" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">
        <div className="detail-col">
          <div className="d-flex align-items-center">
            <div className="img-wrap me-2 d-flex align-items-center justify-content-center">
              <div className="shp-sqr"></div>
            </div>
            <div className="item-wrap">
              <div className="d-flex justify-content-between">
                <span className="light-text trs-3">
                  Account 5d45
                </span>
                <span className="light-text fw-500 trs-3">Mumbai</span>
              </div>
              <div className="label-btn badge-sm">
                0H2T6362YDC8H5VLUW4S8T1X4W8DT5J4U8V2Z5W8F4J
              </div>
            </div>
          </div>
        </div>
      </NavDropdown.Item>
      <NavDropdown.Item className="px-2 arrow-after" href="#action/3.2">
        <div className="d-flex">
          <div className="img-wrap me-3">
            <img src="../../assets/images/scaner.png" alt="" className="img-fluid" />
          </div>
          <span className="light-text">Show QR Code</span>
        </div>
      </NavDropdown.Item>
      <NavDropdown.Item className="px-2 arrow-after" href="#action/3.2">
        <div className="d-flex">
          <div className="img-wrap me-3">
            <img src="../../assets/images/logout.png" alt="" className="img-fluid" />
          </div>
          <span className="light-text">Logout</span>
        </div>
      </NavDropdown.Item>
    </NavDropdown>
  </div>
  </>
                  
}
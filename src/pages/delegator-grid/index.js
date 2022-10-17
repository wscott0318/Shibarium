/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";

import Link from "next/link";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import CommonModal from "../components/CommonModel";
import StakingHeader from '../staking-header';
import Header from "../layout/header";
import { Dropdown } from 'react-bootstrap';
export default function DelegatorGrid() {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
    <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg delegatorgrid-sec">
      <Header />
      <StakingHeader />
        <section className="top_bnr_area dark-bg darkbg py-4 py-md-5">
            <div className="container">
                <h1 className="text-white trs-6 fw-500 ff-mos">All Validators</h1>
            </div>
        </section>
        <section className="mt-lg-5 mt-sm-4 mt-3">
          <div className="container">
            <div className='filter-sec ff-mos'>
                <div className='row align-items-center'>
                    <div className='col-md-5 col-12 mb-sm-4 mb-lg-0 mb-4'>
                        <div className='search-box d-inline-block position-relative w-100'>
                            {/* <input className="cus-search w-100" type="text" placeholder="Search by validator name, Id, owner or signer address"></input> */}
                            <input className="w-search w-100" type="search" placeholder="Search by validator name, Id, owner or signer address" value=""></input>
                            {/* <img width="15" height="15" className='img-fluid' src="../../assets/images/search.png" alt="" /> */}
                        </div>
                    </div>
                    <div className='col-md-7 col-12 text-end mob-filter'>
                        <div className='d-inline-block pe-4 pe-sm-4 mob-filter mob-swtch'>
                            <label className="head-xsm fw-600" htmlFor="Auction"><span className='top-low-spc pe-2 align ff-mos'>Show Auction Only</span></label>
                            <label className="switch align">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className='d-inline-block pe-4 pe-sm-4 mob-drop'>
                            <label className="head-xsm fw-600" htmlFor="Auction"><span className='top-low-spc pe-2 align ff-mos'>Sort by</span></label>
                            <Dropdown className='dark-dd cus-dropdown position-relative d-inline-block'>
                                <i className="arrow down"></i>
                                <Dropdown.Toggle  id="dropdown-basic">
                                    <span>Random</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='d-inline-flex mob-btns'>
                            <div className='view-blk me-2 view-active'>
                                <img className="grey-image" src="../../images/grid-grey-2.png" width={26} height={19} alt=""></img>
                                <img className="white-image" src="../../images/grid-white-2.png" width={26} height={19} alt=""></img>
                            </div>
                            <div className='view-blk'>
                                <img className="grey-image" src="../../images/list-grey-2.png" width={26} height={19} alt=""></img>
                                <img className="white-image" src="../../images/list-white-2.png" width={26} height={19} alt=""></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className='grid-sec ff-mos'>
                  <div className='row side-cover ff-mos'>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-3 col-sm-6 col-12 side-space'>
                          <div className='box'>
                              <div className='box-head'>
                                  <div className='d-flex align-items-center justify-content-start'>
                                      <div>
                                          <span className='user-icon'></span>
                                      </div>
                                      <div className='fw-600'>
                                          <span className='vertical-align'>Anonymous 18</span>
                                          <p><span className='ft-14 light-text'>13,861 SHIBA Staked</span></p>
                                      </div>
                                  </div>
                              </div>
                              <div className='box-body'>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Performance</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>100%</span>
                                      </div>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-between'>
                                      <div className='fw-600 ft-14'>Comission</div>
                                      <div>
                                          <span className='warning-color fw-600 ft-14'>10%</span>
                                      </div>
                                  </div>
                                  <div className='text-center mt-3'>
                                      <button type="button" onClick={() => setModalShow(true)} className='btn primary-btn  light-text w-100'><span>Delegate</span></button> 
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  
            </div>
          </div>
        </section>
    </main>
        
    </>
  )
}

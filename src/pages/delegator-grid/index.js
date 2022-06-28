/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Dropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import DelegatePopup from '../delegate-popup'
import InnerHeader from '../inner-header';
export default function DelegatorGrid() {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
    <DelegatePopup  show={modalShow}
        onHide={() => setModalShow(false)}/>
    <div className="page-wrapper">
    <InnerHeader />
      <main className='delegatorgrid-sec'>
        <div className='botom-space-lg'>
            <div className='black_clr_box position-relative sec-spc-high'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-8 text-sm-start text-center'>
                        <h1 className='light-text mb-2 mb-sm-3 fnt-58 fnt-100'>All Validators</h1>
                        <div className=''><button type="button" className='btn warning-btn light-text'><span>Become A Validator</span></button></div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div className='container'> 
            <div className='filter-sec'>
                <div className='row align-items-center'>
                    <div className='col-lg-5 col-12 mb-sm-4 mb-lg-0 mb-4'>
                        <div className='search-box d-inline-block position-relative w-100'>
                            <input className="cus-search w-100" type="text" placeholder="Search by validator name, Id, owner or signer address"></input>
                            <img width="15" height="15" className='img-fluid' src="../../assets/images/search.png" alt="" />
                        </div>
                    </div>
                    <div className='col-lg-7 col-12 text-end mob-filter'>
                        <div className='d-inline-block pe-0 pe-sm-4 mob-filter'>
                            <label className="head-xsm fw-600" htmlFor="Auction"><span className='top-low-spc pe-2 align'>Show Auction Only</span></label>
                            <label className="switch align">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className='d-inline-block pe-4 pe-sm-4'>
                            <label className="head-xsm fw-600" htmlFor="Auction"><span className='top-low-spc pe-2 align'>Sort by</span></label>
                            <Dropdown className='cus-dropdown position-relative d-inline-block'>
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
                        <div className='d-inline-block'>
                            <a href="javascript:void(0);" title="" className='view-blk me-2 view-active'>
                                <img className="grey-image" src="../../assets/images/grid-grey.png" width={26} height={19} alt=""></img>
                                <img className="white-image" src="../../assets/images/grid-white.png" width={26} height={19} alt=""></img>
                            </a>
                            <a href="javascript:void(0);" title="" className='view-blk'>
                                <img className="grey-image" src="../../assets/images/list-grey.png" width={26} height={19} alt=""></img>
                                <img className="white-image" src="../../assets/images/list-white.png" width={26} height={19} alt=""></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      <div className='container'>
        <div className='grid-sec'>
                <div className='row side-cover'>
                    <div className='col-xl-3 col-sm-6 col-12 side-space'>
                        <div className='box'>
                            <div className='box-head'>
                                <div className='d-flex align-items-center justify-content-start'>
                                    <div>
                                        <span className='user-icon'></span>
                                    </div>
                                    <div className='fw-700'>
                                        <span className='vertical-align'>Anonymous 18</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" onClick={() => setModalShow(true)} className='btn warning-btn  light-text w-100'><span>Delegate</span></button> 
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
                                    <div className='fw-700'>
                                        <span className='vertical-align'>Infosysy validator</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" className='btn warning-btn  light-text w-100'><span>Delegate</span></button> 
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
                                    <div className='fw-700'>
                                        <span className='vertical-align'>Ploy Two</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" className='btn warning-btn  light-text w-100'><span>Delegate</span></button> 
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
                                    <div className='fw-700'>
                                        <span className='vertical-align'>RADAR Staking</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" className='btn warning-btn  light-text w-100'><span>Delegate</span></button> 
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
                                    <div className='fw-700'>
                                        <span className='vertical-align'>Anonymous 18</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" onClick={() => setModalShow(true)} className='btn warning-btn  light-text w-100'><span>Delegate</span></button> 
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
                                    <div className='fw-700'>
                                        <span className='vertical-align'>Infosysy validator</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" className='btn warning-btn  light-text w-100'><span>Delegate</span></button> 
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
                                    <div className='fw-700'>
                                        <span className='vertical-align'>Ploy Two</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" className='btn warning-btn  light-text w-100'><span>Delegate</span></button> 
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
                                    <div className='fw-700'>
                                        <span className='vertical-align'>RADAR Staking</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" className='btn warning-btn  light-text w-100'><span>Delegate</span></button> 
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
                                    <div className='fw-700'>
                                        <span className='vertical-align'>Anonymous 18</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" onClick={() => setModalShow(true)} className='btn warning-btn  light-text w-100'><span>Delegate</span></button> 
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
                                    <div className='fw-700'>
                                        <span className='vertical-align'>Infosysy validator</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" className='btn warning-btn  light-text w-100'><span>Delegate</span></button> 
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
                                    <div className='fw-700'>
                                        <span className='vertical-align'>Ploy Two</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" className='btn warning-btn  light-text w-100'><span>Delegate</span></button> 
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
                                    <div className='fw-700'>
                                        <span className='vertical-align'>RADAR Staking</span>
                                        <p><span className='ft-16 light-text'>13,861 SHIBA Staked</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='box-body'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Performance</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>100%</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='fw-600 ft-16'>Comission</div>
                                    <div>
                                        <span className='warning-color fw-600 ft-14'>10%</span>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button type="button" className='btn warning-btn light-text w-100'><span>Delegate</span></button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
        </div>
       </div>
       </main>
    </div>
    </>
  )
}

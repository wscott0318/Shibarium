/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Dropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import DelegatePopup from '../delegate-popup'
export default function ValidatorGrid() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <DelegatePopup show={modalShow}
                onHide={() => setModalShow(false)} />
            <div className='ValidatorGrid-sec'>
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
            </div>
        </>
    )
}

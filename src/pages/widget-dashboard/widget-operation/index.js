/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Dropdown } from 'react-bootstrap';
import InnerHeader from '../../inner-header';

export default function Widgetoperation() {
    return (
        <>
            <div className="page-wrapper widget">
                <InnerHeader />
                <main className=''>
                    <div className='left-section'>
                        <div className='header-secondary'>
                            <div className='bar-inner'>
                                <div>
                                    <a href="javascript:void(0);" title=''>
                                        <img src="../../assets/images/back-icon.png" width='17' height='14'></img>
                                    </a>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-end'>
                                        <div className='me-4'><button type="button" className="btn  bordered-btn light-text"><span>Preview Widget</span></button></div>
                                        <div className='me-4'><button type="button" className="btn warning-btn border-btn light-text"><span>Get Code Snippet</span></button></div>
                                        <a href="javascript:void(0);" title="" className='white-box'>
                                            <img src="../../assets/images/delete.png" width='17' height='22'></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-section'>
                        <div className='side-header py-3'>
                            <div className="px-4 py-2">
                                <p className='mb-0 trs-2 fwb '>
                                    Settings
                                </p>
                            </div>
                            <div className="px-4 py-2">
                                <a href="javascript:void(0)" className='btn black-btn'>
                                    <span className='trs-2'>Add Collaborators</span>
                                </a>
                            </div>
                        </div>
                        <div className='side-body'>
                            <p className='trs-2 fwb px-4 edge-spacing mb-0'>Basic Information</p>
                            <form action="" className="side-form px-4">
                                <div className='form-group'>
                                    <div className='labe-justify'>
                                        <label htmlFor="">Widget Name *</label>
                                        <label htmlFor="">Tips</label>
                                    </div>
                                    <input type="text" className="form-control" placeholder='Alphanumeric value with - and _ allowed' />
                                </div>
                                <div className='form-group'>
                                    <div className='labe-justify'>
                                        <label htmlFor="">Default Token</label>
                                        <label htmlFor="">Tips</label>
                                    </div>
                                    <input type="text" className="form-control token" placeholder='Tokens' />
                                </div>
                            </form>
                            <div className="hr-line"></div>
                            <div className='py-3'>
                                <div className='labe-justify px-4 mt-2'>
                                    <label htmlFor="">Token Support (1)</label>
                                    <label htmlFor="">
                                        <img className='img-fluid' src="../../assets/images/plus-btn.png" alt="plus-icon" width={10} />
                                    </label>
                                </div>
                                <div className='pb-3 px-4 pt-0 mb-2'>
                                    <img className='img-fluid' src="../../assets/images/bear.png" alt="shib-img" width={25} />
                                </div>
                                <div className="hr-line"></div>
                            </div>
                            <div className="py-3 row side-form px-4 g-2 mb-2">
                                <p className='trs-2 fwb mb-3 mt-0'>Layout Configs</p>
                                <div className="col-sm-6">
                                    <label htmlFor="" className='fw-600'>Width *</label>
                                    <input type="text" className='form-control' placeholder='540' />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="" className='fw-600'>Height *</label>
                                    <input type="text" className='form-control' placeholder='540' />
                                </div>
                            </div>
                            <div className='form-group side-form px-4 position-relative timer mb-4'>
                                <div className='clock'><img src="../../assets/images/clock.png" width="16" height="16"></img></div>
                                <div className='labe-justify '>
                                    <label htmlFor="">Auto Show Time</label>
                                </div>
                                <input type="text" className="form-control" placeholder='0'/>
                            </div>
                            <div className='form-group side-form px-4 mb-4'>
                                <div className='labe-justify'>
                                    <label htmlFor="">Target</label>
                                </div>
                                <input type="text" className="form-control" placeholder='id of element'/>
                            </div>
                            <div className='form-group side-form px-4 mb-4'>
                                <div className='labe-justify'>
                                    <label htmlFor="">Widget Position</label>
                                </div>
                                <div className='d-flex'>
                                    <a href="javascript:void(0);" className='position-blk left-position me-3 brick-active'>
                                        <span className='position-brick'></span>
                                    </a>
                                    <a href="javascript:void(0);" className='position-blk botom-position me-3'>
                                        <span className='position-brick'></span>
                                    </a>
                                    <a href="javascript:void(0);" className='position-blk center-position me-3'>
                                        <span className='position-brick'></span>
                                    </a>
                                    <a href="javascript:void(0);" className='position-blk right-botom-position'>
                                        <span className='position-brick'></span>
                                    </a>
                                </div>
                            </div>
                            <div className='form-group side-form px-4'>
                                <div className='labe-justify'>
                                    <label htmlFor="">Widget Overlay</label>
                                </div>
                                <div>
                                    <label className="radio-container ft-16 fw-700 d-inline-block me-4">Show
                                    <input type="radio" checked="checked" name="radio"/>
                                    <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-container ft-16 fw-700 d-inline-block">Hide
                                    <input type="radio" name="radio"/>
                                    <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className='form-group side-form px-4'>
                                <div className='labe-justify'>
                                    <label htmlFor="">Closeable Widget</label>
                                </div>
                                <div>
                                    <label className="radio-container ft-16 fw-700 d-inline-block me-4">True
                                    <input type="radio" checked="checked" name="radio-two"/>
                                    <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-container ft-16 fw-700 d-inline-block">False
                                    <input type="radio" name="radio-two"/>
                                    <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                
            </div>
        </>
    )
}

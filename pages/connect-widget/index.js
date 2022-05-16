import React from 'react'
import { Dropdown } from 'react-bootstrap';
import InnerHeader from '../inner-header';

export default function Connectwidget() {
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
                                        <div className='me-4'><button type="button" class="btn info-btn light-text"><span>Preview Widget</span></button></div>
                                        <div className='me-4'><button type="button" class="btn warning-btn border-btn light-text"><span>Get Code Snippet</span></button></div>
                                        <a href="javascript:void(0);" title="" className='white-box'>
                                            <img src="../../assets/images/delete.png" width='17' height='22'></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='body-wraper'>
                            <div className='notification-box bridge-sec'>
                                <div className='notify-header d-flex align-items-center justify-content-between'>
                                    <h1 className='align fw-700'>Shiba Bridge</h1>
                                    <h2 className='align'>Need help?</h2>
                                </div>
                                <div className='notify-body'>
                                    <div className='fw-700 text-center mb-4'>Login to your account</div>
                                    <div class="form-group field-modify mb-4">
                                        <div class="swap-control swap-flex p-0">
                                            <div class="swap-col">
                                                {/* <input className="pe-0 swap-input" type="text"/> */}
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <div className='align'>
                                                        <div className='d-inline-block me-2'><img src="../../assets/images/meta.png" width='21' height='19'></img></div><span className='fw-700 ft-16'>Metamask</span>
                                                    </div>
                                                    <div className='align position-relative wiget-field'>
                                                        <span className='ft-16 fw-700'>Recomended</span><i class="arrow down"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-section'>
                        <div className='side-header'>
                            <div className="px-3 py-2">
                                <p className='mb-0 trs-2 fwb '>
                                    Settings
                                </p>
                            </div>
                            <div className="px-3 py-2">
                                <a href="javascript:void(0)" className='btn white-btn'>
                                    <span className='trs-2'>Add Collaborators</span>
                                </a>
                            </div>
                        </div>
                        <div className='side-body'>
                            <p className='trs-2 fwb px-3 mt-3 mb-3'>Basic Information</p>
                            <form action="" className="side-form px-3">
                                <div className='form-group'>
                                    <div className='labe-justify'>
                                        <label htmlFor="">Widget Name *</label>
                                        <label htmlFor="">Tips</label>
                                    </div>
                                    <input type="text" className="form-control" placeholder='Alphanumeric value with - and _ allowed' />
                                </div>
                                <div className='form-group'>
                                    <div className='label-justify'>
                                        <label htmlFor="">Default Token</label>
                                        <label htmlFor="">Tips</label>
                                    </div>
                                    <input type="text" className="form-control" placeholder='Tokens' />
                                </div>
                            </form>
                            <div className="hr-line"></div>
                            <div className='py-3'>
                                <div className='labe-justify px-3'>
                                    <label htmlFor="">Token Support (1)</label>
                                    <label htmlFor="">
                                        <img className='img-fluid' src="../../assets/images/plus-btn.png" alt="plus-icon" width={10} />
                                    </label>
                                </div>
                                <div className='p-3 pt-0'>
                                    <img className='img-fluid' src="../../assets/images/bear.png" alt="shib-img" width={25} />
                                </div>
                                <div className="hr-line"></div>
                            </div>
                            <div className="py-3 row side-form px-3 g-2">
                                <div className="col-sm-6">
                                    <label htmlFor="" className='fw-600'>Layout Configs</label>
                                    <input type="text" className='form-control' placeholder='540' />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="" className='fw-600'>Layout Configs</label>
                                    <input type="text" className='form-control' placeholder='540' />
                                </div>
                            </div>
                            <div className='form-group side-form px-3 position-relative timer'>
                                <div className='clock'><img src="../../assets/images/clock.png" width="16" height="16"></img></div>
                                <div className='labe-justify '>
                                    <label htmlFor="">Auto Show Time</label>
                                </div>
                                <input type="text" className="form-control" placeholder='0'/>
                            </div>
                            <div className='form-group side-form px-3'>
                                <div className='labe-justify'>
                                    <label htmlFor="">Target</label>
                                </div>
                                <input type="text" className="form-control" placeholder='id of element'/>
                            </div>
                            <div className='form-group side-form px-3'>
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
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

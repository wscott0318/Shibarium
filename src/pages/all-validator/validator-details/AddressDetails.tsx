import CopyHelper from 'app/components/AccountDetails/Copy'
import React from 'react'

const AddressDetails:React.FC<any> =({validatorInfo})=> {
  return (
    <section className='py-4 py-md-5'>
                    <div className="container">
                        <div className="tabl-row cus-panel darkBg">
                            <div className="tabl-head darkbg-3">
                                <div className="mx-0 row">
                                    <div className="px-0 col-md-6">
                                        <div className="p-2 tbl-item p-sm-3">
                                            <h4>Owner address</h4>
                                            <p className='flex-wrap d-inline-flex txt-light fw-600 align-items-center'>
                                                <span className='me-2 primary-text break-word'>{validatorInfo?.owner}</span>
                                                <CopyHelper toCopy={validatorInfo?.owner}>
                                                    <img className='img-fluid' src="../../assets/images/copy-wht-icon.png" alt="copy-img" width={14} />    
                                                    </CopyHelper>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-0 col-md-6 tbl-item">
                                        <div className='p-2 p-sm-3'>
                                            <h4>Signer address</h4>
                                            <p className='flex-wrap d-inline-flex txt-light fw-600 align-items-center'>
                                                <span className='me-2 primary-text break-word'>{validatorInfo?.signer}</span>
                                                <CopyHelper toCopy={validatorInfo?.signer}>
                                                    <img className='img-fluid' src="../../assets/images/copy-wht-icon.png" alt="copy-img" width={14} />    
                                                </CopyHelper>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tabl panel-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className='mute-text-2 fs-16 fw-600'>
                                            Status
                                        </div>
                                        <div className="badge-md success-bg d-inline-block">
                                            <span className="trs-1">active</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className='mute-text-2 fs-16 fw-600'>
                                            Commission
                                        </div>
                                        <div className="badg mute-text-2 fw-600">
                                            {validatorInfo?.commissionPercent}%
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className='mute-text-2 fs-16 fw-600'>
                                            Condition
                                        </div>
                                        <div className='up-text fw-600'>
                                            Good
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
  )
}

export default AddressDetails
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import DelegatePopup from '../../delegate-popup';

export default function ValidatorGrid({ validatorsList }: { validatorsList: any }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState({})
    return (
        <>
            <DelegatePopup show={modalShow} data={selectedRow}
                onHide={() => setModalShow(false)} />
            <div className='ValidatorGrid-sec'>
                <div className='container'>
                    <div className='grid-sec'>
                        <div className='row side-cover'>
                            {validatorsList.map((validator: any) => {
                                return (
                                    <div className='col-xl-3 col-sm-6 col-12 side-space'>
                                        <div className='box'>
                                            <div className='box-head'>
                                                <div className='d-flex align-items-center justify-content-start'>
                                                    <div>
                                                        <span className='user-icon'></span>
                                                    </div>
                                                    <div className='fw-700'>
                                                        <span className='vertical-align'>{validator.name}</span>
                                                        <p><span className='ft-16 light-text'>{validator.stakeAmount} BONE Staked</span></p>
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
                                                        <span className='warning-color fw-600 ft-14'>{validator.commissionRate}%</span>
                                                    </div>
                                                </div>
                                                <div className='text-center mt-3'>
                                                    <button type="button" onClick={() => {setModalShow(true);setSelectedRow(validator)}} className='btn warning-btn  light-text w-100'><span>Delegate</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

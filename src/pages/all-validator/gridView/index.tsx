/* eslint-disable @next/next/no-img-element */
import { UserType } from 'app/enums/UserType';
import { useUserType } from 'app/state/user/hooks';
import Link from 'next/link';
import React, { useState } from 'react'
import NumberFormat from 'react-number-format';
import DelegatePopup from '../../delegate-popup';

export default function ValidatorGrid({ validatorsList }: { validatorsList: any }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [userType, setUserType] = useUserType()
    return (
        <>
            <DelegatePopup show={modalShow} data={selectedRow}
                onHide={() => setModalShow(false)} />
            <div className='ValidatorGrid-sec'>
                    <div className='grid-sec'>
                        {validatorsList && validatorsList.length ?
                            <div className='row side-cover'>
                                {validatorsList.map((validator: any) => {
                                    return (
                                        <>
                                            <div className='col-xl-3 col-sm-6 col-12 side-space'>
                                                <div className='box'>
                                                    <div className='box-head'>
                                                        <div className='d-flex align-items-center justify-content-start'>
                                                            <div>
                                                                <span > <img  style={{height:50, width:50}} src={!validator.logoUrl || validator.logoUrl === 'PLACEHOLDER'? "../../assets/images/fundbaron.png":validator.logoUrl} alt="logo" className='me-3'/></span>
                                                            </div>
                                                            <div className='fw-700'>
                                                                <span className='vertical-align'>
                                                                    <Link href={`/all-validator/${validator.signer}`}>
                                                                        {validator.name}
                                                                    </Link>
                                                                </span>
                                                                <p><span className='ft-16 light-text'><NumberFormat displayType='text'  thousandSeparator value={(validator.totalStaked/Math.pow(10,18)).toFixed(8)} /> BONE Staked</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='box-body'>
                                                        <div className='d-flex align-items-center justify-content-between'>
                                                            <div className='fw-600 ft-16'>Performance</div>
                                                            <div>
                                                                <span className='warning-color fw-600 ft-14'>{validator.uptimePercent}%</span>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex align-items-center justify-content-between'>
                                                            <div className='fw-600 ft-16'>Commission</div>
                                                            <div>
                                                                <span className='warning-color fw-600 ft-14'>{validator.commissionPercent}%</span>
                                                            </div>
                                                        </div>
                                                        <div className='mt-3 text-center'>
                                                            <button disabled={validator.uptimePercent === 0 || userType === UserType.Validator} type="button" onClick={() => { setModalShow(true); setSelectedRow(validator) }} className='btn warning-btn light-text w-100'><span>Delegate</span></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div>
                            :
                            <div style={{display:'flex',justifyContent:'center',padding: '3rem'}}>No Records Found.</div>
                        }
                    </div>
            </div>
        </>
    )
}

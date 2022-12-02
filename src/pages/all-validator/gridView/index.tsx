/* eslint-disable @next/next/no-img-element */
import { UserType } from 'app/enums/UserType';
import { useUserType } from 'app/state/user/hooks';
import Link from 'next/link';
import React, { useState } from 'react'
import NumberFormat from 'react-number-format';
import DelegatePopup from '../../delegate-popup';
import { addDecimalValue, inActiveCount, toFixedPrecent, tokenDecimal, web3Decimals } from 'web3/commonFunctions';

export default function ValidatorGrid({ validatorsList, searchKey }: { validatorsList: any, searchKey: any }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [userType, setUserType] = useUserType()
  const [showdelegatepop, setdelegatepop] = useState(false);

  return (
    <>
      <DelegatePopup
        showdelegatepop={showdelegatepop}
        setdelegatepop={setdelegatepop}
        data={selectedRow}
      />
      <div className="ffms-inherit">
        <div className='grid-sec'>
          {validatorsList && validatorsList.length ?
            <div className='row side-cover'>
              {validatorsList.map((validator: any) =>
                <div className='col-xl-3 col-sm-6 col-12 side-space mb-sm-4 mb-4'>
                  <div className='box'>
                    <div className='box-head'>
                      <div className='d-flex align-items-center justify-content-start'>
                        <div>
                          <span><img style={{ height: 50, width: 50 }} src={validator.logoUrl?.startsWith("http") ? validator.logoUrl : "../../assets/images/shiba-round-icon.png"} alt="logo" className='me-3' /></span>
                        </div>
                        <div className='fw-600'>
                          <span className='vertical-align'>
                            <Link href={`/all-validator/${validator.signer}`} passHref>
                              <p>
                                {validator?.name}
                              </p>
                            </Link>
                          </span>
                          <p><span className='ft-14 light-text'>
                            <NumberFormat displayType='text' thousandSeparator value={addDecimalValue(+validator.totalstaked)} /> BONE</span></p>
                        </div>
                      </div>
                    </div>
                    <div className='box-body'>
                      <div className='d-flex align-items-center justify-content-between'>
                        <div className='fw-600 ft-14'>Uptime</div>
                        <div>
                          <span className='warning-color fw-600 ft-14'>{(+validator.uptimePercent).toFixed(toFixedPrecent)}%</span>
                        </div>
                      </div>
                      <div className='d-flex align-items-center justify-content-between'>
                        <div className='fw-600 ft-14'>Commission</div>
                        <div>
                          <span className='warning-color fw-600 ft-14'>{validator?.commissionrate}%</span>
                        </div>
                      </div>
                      <div className='text-center mt-3'>
                        {
                          userType === 'Validator' ?
                            <Link href={`/all-validator/${validator.signer}`} passHref>
                              <p className='btn primary-btn  light-text w-100'>View</p>
                            </Link>
                            :
                            <button
                              disabled={validator.fundamental === 1 ? true : validator.uptimePercent <= inActiveCount ? true : false}
                              type="button"
                              onClick={() => { setdelegatepop(true); setSelectedRow(validator) }}
                              className='btn primary-btn  light-text w-100'>
                              <span>Delegate</span></button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            //   : <div className='no-record' style={{display:'flex',justifyContent:'center',padding: '3rem'}}>No Record Found.</div>
            : <div className='no-found'>
              <div>
                <div><img src="../../assets/images/no-record.png" /></div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

import React from 'react'
import InnerHeader from '../inner-header'
export default function Account() {
  return (
    <>
     <InnerHeader />
    <div className="page-wrapper">
      <main className='delegatorgrid-sec'>
        <div className='botom-space-lg'>
            <div className='blue-bg position-relative sec-spc-high'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-8 text-sm-start text-center'>
                        <h1 className='light-text fnt-58 fnt-100'>Your Account</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='container'> 
            <div className='center-sec text-center'>
                <h2 className='low-font-wt mb-3'>Ethereum Wallet Balance</h2>
                <h1 className='fw-700 black-color'>0 SHIBA</h1>
                <h2 className='low-font-wt'>$0.00</h2>
                <div className='d-flex align-items-center justify-content-center mt-4 flex-column flex-sm-row'>
                    <div className='me-0 me-sm-4 mb-3 mb-sm-0'><button type="button" className='btn info-btn light-text'><span>Become A Validator</span></button></div>
                    <div><button type="button" className='btn warning-btn border-btn light-text'><span>Become A Delegator</span></button></div>
                </div>
            </div>
      </div>
      </main>
    </div>
    </>
  )
}

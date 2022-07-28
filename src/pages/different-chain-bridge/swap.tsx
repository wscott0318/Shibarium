import React, { useRef, useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap';

function Swap() {
    return (
        <>
            <div className='form-group'>
                <label htmlFor="" className="form-label fwb">Asset</label>
                <Dropdown className='cus-dropdown dark-dd position-relative'>
                    <i className="arrow down"></i>
                    <Dropdown.Toggle id="dropdown-basic" className='w-100 text-start'>
                        <div className='d-flex'><div className='d-inline-block me-2'><img width="20" height="20" className='img-fluid' src="../../assets/images/ust.png" alt="" /></div> UST</div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='w-100'>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                    {/* <div>lorem</div> */}
                    <div className='mt-2 help-txt'>Copy UST token address
                        <span className="primary-badge badge-md ms-2">
                            <span className="fw-600 d-flex align-items-center">
                                <img width="9" height="11" className='img-fluid' src="../../assets/images/copy-icon.png" alt="" />
                                <span className='trs-2 ms-1'>Terra</span>
                            </span>
                        </span>
                        <span className="primary-badge badge-md ms-2">
                            <span className="fw-600  d-flex align-items-center">
                                <img width="9" height="11" className='img-fluid' src="../../assets/images/copy-icon.png" alt="" />
                                <span className='trs-2 ms-1'>BSC</span>
                            </span>
                        </span>
                    </div>
                </Dropdown>
            </div>
        </>
    )
}
export default Swap
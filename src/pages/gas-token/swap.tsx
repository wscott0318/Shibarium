
import { Dropdown } from "react-bootstrap";

function Swaptoken() {

    return (
        <>
            <div className="form-group">
                <label htmlFor="" className="form-label fwb">Swap From</label>
                <div className="swap-control swap-flex p-0">
                    <div className='swap-modal'>
                        {/* <span className='fw-600 trs-2'>
                                                                    
                                                                </span> */}
                        <Dropdown className="cus-dropdown dd-token position-relative dark-dd">
                            <i className="arrow down"></i>
                            <Dropdown.Toggle
                                id="dropdown-basic"
                                className="w-100 text-start"
                            >
                                <span>Select Token</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="w-100">
                                <Dropdown.Item href="#/action-1">
                                    Token
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">
                                    Token
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                    Token                                                                        </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="swap-col">
                        <input type="text" className='swap-input' placeholder='0.00' />                                                    </div>
                </div>
            </div>
        </>
    )
}
export default Swaptoken
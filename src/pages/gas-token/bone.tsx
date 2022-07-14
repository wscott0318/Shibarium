
import { Dropdown } from "react-bootstrap";

function GasToken() {

    return (
        <>
            <div className="form-group">
                <label htmlFor="" className="form-label fwb">How many BONE do you want to get?</label>
                <div className="swap-flex p-0 row">
                    <div className='cstm_values col-sm-6'>
                        <span className='outr_span'><span className="trs-3">1 BONE</span></span>
                        <span className='outr_span'><span className="trs-3">5 BONE</span></span>
                        <span className='outr_span'><span className="trs-3">10 BONE</span></span>
                    </div>
                    <div className=" swap-control col-sm-6">
                        <input type="text" className='swap-input' placeholder='Custom' />
                        <span className='primary-text over-text fw-600'>BONE</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default GasToken
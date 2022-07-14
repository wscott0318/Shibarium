
function Amount() {
    return (
        <>
            <div className='form-group col-sm-6 mb-4'>
                <label htmlFor="" className="form-label fwb">Amount</label>
                <div className="swap-control swap-flex p-0">
                    <div className="swap-col full-col">
                        <input type="text" className='swap-input' />
                        <span className='primary-text over-text fw-600'>
                            <span className='trs-2'>MAX</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Amount
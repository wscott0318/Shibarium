function StepThree() {
    return (
        <>
            {/* step 3 start */}
            <div className="progress-tab d-none">
                <div className="mb-4 mb-xl-5">
                    <h5 className="fwb">Add your stake amount</h5>
                    <p>Please provide your stake amount detail here</p>
                </div>
                <div className="row">
                    <div className="col-sm-6 form-grid">
                        <div className="form-group">
                            <label htmlFor="" className="form-label">
                                Enter the stake amount
                            </label>
                            <input
                                type="text"
                                className="mb-3 form-control"
                                placeholder="i.e Dark Knight Ventures"
                            />
                            <label htmlFor="" className="form-label">
                                Minimum: 1000 BONE
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/* step 3 end */}
        </>
    )
}

export default StepThree
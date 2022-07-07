
function StepFour({activInput,handleEdit}:any) {
        
    return (
        <>
            {/* step 4 start */}
            <div className="progress-tab d-none">
                <div className="mb-4 mb-xl-5">
                    <h5 className="fwb">Check complete detail</h5>
                    <p>Please confirm your details and submit</p>
                </div>
                <div className="row">

                    <div className="col-sm-6 form-grid">
                        <div className="form-group">
                            <label htmlFor="" className="form-label d-block">
                                Validator logo
                            </label>
                            <div className="icon-wrap">
                                <img className="img-fluid" src="../../assets/images/logo-icon.png" alt="logo" width={20} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 form-grid">
                        <div className="form-group">
                            <label htmlFor="" className="form-label d-block">
                                Signer’s address
                            </label>
                            <label htmlFor="" className="form-value">
                                01d2tyke2866633dlpwqs3900371
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-6 form-grid">
                        <div className="form-group">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="" className="form-label">
                                    Validator name
                                </label>
                                <a
                                    className="primary-text trs-3"
                                    href="javascript:void(0)"
                                    onClick={() => handleEdit("name")}
                                >
                                    Edit
                                </a>
                            </div>
                            <div className="input-wrap">
                                <label htmlFor="" className="form-value">
                                    Dark Knight Ventures
                                </label>
                                {activInput.name ? (
                                    <input
                                        type="text"
                                        className="form-control edit-input show"
                                        placeholder="i.e Dark Knight Ventures"
                                    />
                                ) : (
                                    ""
                                )}
                                {/* <input
                          ref={ref}
                          type="text"
                          className="form-control edit-input show"
                          //   className={`form-control edit-input ${
                          //     activInput.name ? "show" : ""
                          //   }`}
                          placeholder="i.e Dark Knight Ventures"
                        /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 form-grid">
                        <div className="form-group">
                            <label htmlFor="" className="form-label d-block">
                                Signer’s public key
                            </label>
                            <label htmlFor="" className="form-value">
                                01d2tyke2866633dlpwqs3900371
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-6 form-grid">
                        <div className="form-group">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="" className="form-label">
                                    Website
                                </label>
                                <a
                                    className="primary-text trs-3"
                                    href="javascript:void(0)"
                                    onClick={() => handleEdit("website")}
                                >
                                    Edit
                                </a>
                            </div>
                            <div className="input-wrap">
                                <label htmlFor="" className="form-value">
                                    https://knightventures.com
                                </label>
                                {activInput.website ? (
                                    <input
                                        type="text"
                                        className="form-control edit-input show"
                                        placeholder="i.e Dark Knight Ventures"
                                    />
                                ) : (
                                    ""
                                )}
                                {/* <input
                          type="text"
                          //   className={`form-control edit-input ${
                          //     activInput.website ? "show" : ""
                          //   }`}
                          className="form-control edit-input show"
                          placeholder="i.e Dark Knight Ventures"
                        /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 form-grid">
                        <div className="form-group">
                            <label htmlFor="" className="form-label d-block">
                                Stake amount
                            </label>
                            <label htmlFor="" className="form-value">
                                1269.36
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-6 form-grid">
                        <div className="form-group">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="" className="form-label">
                                    Comission in %
                                </label>
                                <a
                                    className="primary-text trs-3"
                                    href="javascript:void(0)"
                                    onClick={() => handleEdit("comission")}
                                >
                                    Edit
                                </a>
                            </div>
                            <div className="input-wrap">
                                <label htmlFor="" className="form-value">
                                    10
                                </label>
                                {activInput.comission ? (
                                    <input
                                        type="text"
                                        className="form-control edit-input show"
                                        placeholder="i.e Dark Knight Ventures"
                                    />
                                ) : (
                                    ""
                                )}
                                {/* <input
                          type="text"
                          className="form-control edit-input show"
                        //   className={`form-control edit-input ${
                        //     activInput.comission ? "show" : ""
                        //   }`}
                          placeholder="i.e Dark Knight Ventures"
                        /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* step 4 end */}
        </>
    )
}

export default StepFour
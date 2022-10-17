
function StepFour({activInput,handleEdit,stepState,stepHandler}:any) {
        
    return (
      <>
        <div className="progress-tab">
          <div className="mb-4 mb-xl-5">
            <h5 className="fw-700 mb-2 ff-mos">Check complete detail</h5>
            <p className="ff-mos">Please confirm your details and submit</p>
          </div>
          <div className="row">
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <label htmlFor="" className="form-label d-block ff-mos">
                  Validator logo
                </label>
                <div className="icon-wrap">
                  <img
                    className="img-fluid"
                    src="../../images/logo-icon.png"
                    alt="logo"
                    width={20}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <label htmlFor="" className="form-label d-block ff-mos">
                  Signer’s address
                </label>
                <label htmlFor="" className="form-value ff-mos">
                  01d2tyke2866633dlpwqs3900371
                </label>
              </div>
            </div>
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <div className="d-flex justify-content-between">
                  <label htmlFor="" className="form-label ff-mos">
                    Validator name
                  </label>
                  <a
                    className="primary-text trs-3 ff-mos"
                    href="#!"
                    onClick={() => handleEdit("name")}
                  >
                    Edit
                  </a>
                </div>
                <div className="input-wrap">
                  <label htmlFor="" className="form-value ff-mos">
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
                <label htmlFor="" className="form-label d-block ff-mos">
                  Signer’s public key
                </label>
                <label htmlFor="" className="form-value ff-mos">
                  01d2tyke2866633dlpwqs3900371
                </label>
              </div>
            </div>
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <div className="d-flex justify-content-between">
                  <label htmlFor="" className="form-label ff-mos">
                    Website
                  </label>
                  <a
                    className="primary-text trs-3 ff-mos"
                    href="#!"
                    onClick={() => handleEdit("website")}
                  >
                    Edit
                  </a>
                </div>
                <div className="input-wrap">
                  <label htmlFor="" className="form-value ff-mos">
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
                <label htmlFor="" className="form-label d-block ff-mos">
                  Stake amount
                </label>
                <label htmlFor="" className="form-value ff-mos">
                  1269.36
                </label>
              </div>
            </div>
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <div className="d-flex justify-content-between">
                  <label htmlFor="" className="form-label ff-mos">
                    Comission in %
                  </label>
                  <a
                    className="primary-text trs-3 ff-mos"
                    href="#!"
                    onClick={() => handleEdit("comission")}
                  >
                    Edit
                  </a>
                </div>
                <div className="input-wrap">
                  <label htmlFor="" className="form-value ff-mos">
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
          <div className="btn-wrap col-sm-3 mt-4 ">
            <button
              type="button"
              className="btn primary-btn w-100 ff-mos"
              onClick={stepHandler}
            >
              <span className="ff-mos">
                Save
              </span>
            </button>
          </div>
        </div>
      </>
    );
}

export default StepFour
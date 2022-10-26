function StepThree({stepState,stepHandler}:any) {
    return (
      <>
        <div className="progress-tab">
          <div className="mb-4 mb-xl-5">
            <h5 className="fw-700 mb-2 ff-mos">Add your stake amount</h5>
            <p className="ff-mos">
              Please provide your stake amount detail here
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <label htmlFor="" className="form-label ff-mos">
                  Enter the stake amount
                </label>
                <input
                  type="text"
                  className="mb-3 form-control"
                  placeholder="i.e Dark Knight Ventures"
                />
                <label htmlFor="" className="form-label ff-mos">
                  Minimum: 1000 BONE
                </label>
              </div>
            </div>
          </div>
          <div className="btn-wrap col-sm-5 mt-4 flx">
            <button
              type="button"
              className="btn grey-btn w-100"
              onClick={()=>stepHandler("back")}
            >
              <span className="ff-mos">
                Back
              </span>
            </button>
            <button
              type="button"
              className="btn primary-btn w-100"
              onClick={()=>stepHandler("next")}
            >
              <span className="ff-mos">
                Next
              </span>
            </button>
          </div>
        </div>
      </>
    );
}

export default StepThree
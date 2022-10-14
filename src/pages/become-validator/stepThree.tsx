function StepThree() {
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
                <label htmlFor="" className="form-label">
                  Minimum: 1000 BONE
                </label>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default StepThree
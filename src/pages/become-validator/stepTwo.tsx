function StepTwo() {
  return (
    <>

      {/* step 2 start start */}
      <div className="progress-tab d-none">
        <div className="mb-4 mb-xl-5">
          <h5 className="fwb">Add node details</h5>
          <p>
            Please provide your node details for better recognizability
          </p>
        </div>
        <div className="row">
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Validator logo
              </label>
              <div className="file-wrap">
                <div className="file-icons">
                  <img
                    src="../../assets/images/file-icon.png"
                    alt=""
                    className="img-fluid"
                    width={22}
                  />
                </div>
                <div className="file-input">
                  <input type="file" className="input-file" />
                  <a href="#!" className="form-control">
                    Upload
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Validator name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="i.e Dark Knight Ventures"
              />
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Website
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="https://knightventures.com"
              />
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Signer’s address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx"
              />
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Signer’s Public key
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx"
              />
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Comission in %
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="10"
              />
            </div>
          </div>
        </div>
      </div>
      {/* step 2 end */}
    </>
  )
}

export default StepTwo
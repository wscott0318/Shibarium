
function StepOne({stepHandler,stepState}:any) {
  return (
    <>
      <div className="progress-tab">
        <h5 className="mb-2 fw-700 ff-mos">Setup a node</h5>
        <p className="mb-0 fw-700 ff-mos">
          You can setup your node using any of the options from below
        </p>
        <div className="box-alert top-space-lg">
          <div className="d-flex align-items-center">
            <div>
              <div className="circle-box lt-warning me-3">
                <img
                  className="img-fluid"
                  width="26"
                  height="30"
                  src="../../images/ansible.png"
                  alt=""
                />
              </div>
            </div>
            <div className="trs-3">
              <h6 className="fw-600 ff-mos">Ansible</h6>
              <p className="ft-14 fw-600 ff-mos">
                Your Ansible playbooks for setting up Shiba Validator node
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 box-alert box-active">
          <div className="d-flex align-items-center">
            <div>
              <div className="circle-box lt-white me-3">
                <img
                  className="img-fluid"
                  width="26"
                  height="30"
                  src="../../images/binaries.png"
                  alt=""
                />
              </div>
            </div>
            <div className="trs-3">
              <h6 className="fw-600 ff-mos">Binaries</h6>
              <p className="ft-14 fw-600 ff-mos">
                Build from Source to setup your validator node.
              </p>
            </div>
          </div>
        </div>
        <p className="ft-14 fw-600 top-btm-spacelg ff-mos">
          Queries? If you face any trouble during installation or syncing, do
          share your queries in this{" "}
          <a href="#!;" className="fw-600 link-color ff-mos" title="">
            forum
          </a>{" "}
          or on our{" "}
          <a href="#!;" className="fw-600 link-color ff-mos" title="">
            Validator Discord channel.
          </a>
        </p>
        <div className="btn-wrap col-sm-5 mt-4 flx">
          <button type="button" className="btn grey-btn w-100 btn-disble">
            <span className="ff-mos">{!stepState.step4 ? "Back" : "Save"}</span>
          </button>
          <button
            type="button"
            className="btn primary-btn w-100 ff-mos"
            onClick={stepHandler}
          >
            <span className="ff-mos">{!stepState.step4 ? "Next" : "Save"}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default StepOne
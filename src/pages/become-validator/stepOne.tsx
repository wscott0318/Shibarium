
function StepOne() {
  return (
    <>
      {/* step 1 start*/}
      <div className="progress-tab">
        <h5 className="mb-2 fw-800">Setup a node</h5>
        <p className="mb-0 fw-700">
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
                  src="../../assets/images/ansible.png"
                  alt=""
                />
              </div>
            </div>
            <div className="trs-3">
              <h6 className="fw-600">Ansible</h6>
              <p className="ft-16 fw-600">
                Your Ansible playbooks for setting up Shiba Validator
                node
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
                  src="../../assets/images/binaries.png"
                  alt=""
                />
              </div>
            </div>
            <div className="trs-3">
            <h6 className="fw-600">Binaries</h6>
              <p className="ft-16 fw-600">
                Build from Source to setup your validator node.
              </p>
            </div>
          </div>
        </div>
        <p className="ft-16 fw-700 top-btm-spacelg">
          Queries? If you face any trouble during installation or
          syncing, do share your queries in this{" "}
          <a
            href="javascript:void(0);"
            className="fw-700 link-color"
            title=""
          >
            forum
          </a>{" "}
          or on our{" "}
          <a
            href="javascript:void(0);"
            className="fw-700 link-color"
            title=""
          >
            Validator Discord channcel.
          </a>
        </p>
      </div>
      {/* step 1 end */}
    </>
  )
}

export default StepOne
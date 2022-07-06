function bannerCard() {
    return (
        <>
            <div className="baner-card">
                <h3 className="mb-0 mb-3 text-white fwb">Network Overview</h3>
                <div className="row">
                    <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                        <div className="bs-card card">
                            <h3 className="fwb">13</h3>
                            <span className="mb-0 trs-3">Total Validators</span>
                        </div>
                    </div>
                    <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                        <div className="bs-card card">
                            <h3 className="fwb">155,554,455 BONE</h3>
                            <p className="mb-0 d-block fw-600">$12365977.36</p>
                            <div className="card-hr"></div>
                            <span className="mb-0">Total Validators</span>
                        </div>
                    </div>
                    <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                        <div className="bs-card card">
                            <h3 className="fwb">569,554,455 BONE</h3>
                            <p className="mb-0 d-block fw-600">$12365977.36</p>
                            <div className="card-hr"></div>
                            <span className="mb-0">Total Reward Distributed</span>
                        </div>
                    </div>
                    <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                        <div className="bs-card card">
                            <h3 className="fwb">25,599,69</h3>
                            <div className="card-hr"></div>
                            <span className="mb-0 trs-3">Bor Block Height</span>
                        </div>
                    </div>
                    <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                        <div className="bs-card card">
                            <h3 className="fwb">9,554,455 </h3>
                            <div className="card-hr"></div>
                            <span className="mb-0 trs-3">Heimdall Block Height</span>
                        </div>
                    </div>
                    <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                        <div className="bs-card card">
                            <h3 className="fwb d-flex align-items-center">
                                <span>71,582</span>
                                <span className="ms-2 primary-badge trsn-3 badge-md fs-12">
                                    <span className="trs-2">28 minutes ago</span>
                                </span>
                            </h3>
                            <div className="card-hr"></div>
                            <span className="mb-0 trs-3">Last Checkpoint</span>
                        </div>
                    </div>
                    <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                        <div className="bs-card card">
                            <h3 className="fwb d-flex align-items-center">
                                <span>25 Minutes</span>
                            </h3>
                            <div className="card-hr"></div>
                            <span className="mb-0 trs-3">Checkpoint Interval</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default bannerCard
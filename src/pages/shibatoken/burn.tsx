import React from "react";

function Burn() {
    return (
        <>
            <div className='pt-4 botom-spacing'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <h4 className='fw-700 mb-4'>Initiate Burn On Shibarium</h4>
                        <div className='card-box'>
                            <div className='stats-blk'>
                                <div className='burn-image'>
                                    <img width="36" height="63" className='img-fluid mx-auto' src="../../assets/images/burn-lg.png" alt="" />
                                </div>
                                <div>
                                    <h6 className='mb-2'>Amount of BONE waiting to be burned</h6>
                                    <h2 className='fw-700'>4.56<span className='txt-light'>9026</span> BONE</h2>
                                </div>
                            </div>
                            <div className='btn-sec'>
                                <button type="button" className="btn primary-btn uppercase-txt"><span>Initiate burn</span></button>
                            </div>
                            <div className='cus-alert'>
                                <div className='pe-2'><img width="23" height="23" className='img-fluid' src="../../assets/images/alert-icon.png" alt="" /></div>
                                <div>You will be able to initiate burn once the amount of BONE ready to be burned is greater than 10 BONE</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <h4 className='fw-700 mb-4 pt-sm-5 pt-md-0 pt-4'>Complete Burn On Ethereum</h4>
                        <div className='card-box'>
                            <div className='stats-blk'>
                                <div className='burn-image'>
                                    <img width="36" height="63" className='img-fluid' src="../../assets/images/burn-lg.png" alt="" />
                                </div>
                                <div>
                                    <h6 className='mb-2'>Amount of BONE waiting to be burned</h6>
                                    <h2 className='fw-700'>4.56<span className='txt-light'>9026</span> BONE</h2>
                                </div>
                            </div>
                            <div className='btn-sec'>
                                <button type="button" className="btn primary-btn uppercase-txt"><span>Complete burn</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='filter-sec'>
                <div className='row align-items-center'>
                    <div className='col-sm-6 col-12 mb-3 mb-md-4'>
                        <h4 className='fw-800'>Continue And Complete Burn On Ethereum</h4>
                    </div>
                    <div className='col-sm-6 col-12 text-end mb-3 mb-md-4'>
                        <div className='fs-16 fw-600'>0 transactions left</div>
                    </div>
                </div>
            </div>
            <div className="cmn_dasdrd_table">
                <div className="table-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>Burn</th>
                                <th>#Block</th>
                                <th>Transaction Hash</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={4}>
                                    <div className="image-wrap mb-3">
                                        <img className="img-fluid mx-auto" src="../../assets/images/shib-borderd-icon.png" />
                                    </div>
                                    <p className="mb-0 text-center">No Ongoing Transactions</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Burn
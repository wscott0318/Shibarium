import React from "react";

function Map() {
    return (
        <>
            <div className="main-content dark-bg-800 full-vh font-up ffms-inherit">
                <div className="map-card bottom-pad top-pad">
                    <div className="container">
                        <h3 className="d-flex align-items-end mb-3 mb-md-4">
                            Add details of the token you are mapping
                            <a className="primary-text fs-12 ms-2" href="javascript:void(0)">
                                Learn more
                            </a>
                        </h3>

                        {/* choose network card start */}
                        <div className="cus-card-800 rad-4 card-lst">
                            <h5 className="mb-4">Choose network</h5>
                            <div className="d-flex flex-column cus-label">
                                <label className="mb-2 mb-md-3">
                                    <input type="radio" name="radio-button-1" value="css" checked />
                                    <span>Goerli Testnet - Mumbai Testnet </span>
                                </label>
                                <label>
                                    <input type="radio" name="radio-button-1" value="no" />
                                    <span>Ethereum mainnet - Polygon PoS </span>
                                </label>
                            </div>
                        </div>
                        {/* chooes network card end */}

                        {/* token details card start */}
                        <div className="cus-card-800 rad-4 card-lst">
                            <h5 className="mb-4">Token Details
                                <span className="ms-3 lite-color fs-14">Standard tokens are mapped via <a className="fs-14 primary-text" href="javascript:void(0)">fx portal</a>. Like any transaction, this will incur a standard cost or fee.</span>
                            </h5>
                            <div className="col-lg-8">
                                <div className="label-row row gx-3 gy-3 align-items-center">
                                    <div className="label-left-col col-sp col-sm-4">
                                        <span className="lite-color fs-14">Choose token</span>
                                    </div>
                                    <div className="label-right-col col-sp col-sm-8">
                                        <div className="d-flex cus-label">
                                            <label className="label-horiz">
                                                <input type="radio" name="radio-button" value="1" checked />
                                                <span> ERC20</span>
                                            </label>
                                            <label className="label-horiz">
                                                <input type="radio" name="radio-button" value="2" />
                                                <span>ERC20 </span>
                                            </label>
                                            <label className="label-horiz">
                                                <input type="radio" name="radio-button" value="3" />
                                                <span>ERC20 </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="label-row row gx-3 gy-3 align-items-center">
                                    <div className="label-left-col col-sp col-sm-4">
                                        <span className="lite-color fs-14">Ethereum token address</span>
                                    </div>
                                    <div className="label-right-col col-sp col-sm-8">
                                        <input type="text" className="form-control label-control" placeholder="i.e 0xdd974d5c2e2928dea5f71b9825b8b646686bd200" />
                                    </div>
                                </div>
                                <div className="label-row row gx-3 gy-3 align-items-center">
                                    <div className="label-left-col col-sp col-sm-4">
                                        <span className="lite-color fs-14">Token Symbol</span>
                                    </div>
                                    <div className="label-right-col col-sp col-sm-8">
                                        <input type="text" disabled className="form-control label-control disabled" placeholder="" />
                                    </div>
                                </div>
                                <div className="label-row row gx-3 gy-3 align-items-center">
                                    <div className="label-left-col col-sp col-sm-4">
                                        <span className="lite-color fs-14">Token name</span>
                                    </div>
                                    <div className="label-right-col col-sp col-sm-8">
                                        <input type="text" disabled className="form-control label-control disabled" placeholder="" />
                                    </div>
                                </div>
                                <div className="label-row row gx-3 gy-3 align-items-center">
                                    <div className="label-left-col col-sp col-sm-4">
                                        <span className="lite-color fs-14">Choose token</span>
                                    </div>
                                    <div className="label-right-col col-sp col-sm-8">
                                        <input type="text" disabled className="form-control label-control disabled" placeholder="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* token details card end */}
                        <div className="row">
                            <div className="col-lg-9">
                                <p className="mb-0 fs-14">
                                    We encourage all innovation so you can use the resources on our <a href="javascript:void(0)" className="primary-text"></a> to build custom tokens. However, custom tokens will not be supported on the Polygon bridge. If you are remapping a token, please reach out to support. They will help with our internal process for remapped tokens.
                                </p>
                            </div>
                            <div className="col-lg-3 text-end">
                                <button type="button" className="btn primary-btn" disabled> Connect Wallet To Map</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Map
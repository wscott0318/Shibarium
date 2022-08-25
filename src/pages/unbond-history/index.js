/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InnerHeader from "../inner-header";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
export default function Unbond() {

    return (
        <>
            <InnerHeader />
            <div className="page-wrapper">
                <main className="delegatorgrid-sec">
                    <div className="botom-space-lg">
                        <div className="darkBg position-relative sec-spc-high">
                            <div className="container">
                                <div className="row">
                                    <div className="text-center col-sm-8 text-sm-start">
                                        <h1 className="light-text fnt-58 fnt-100">Your Unbond History</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container acct-sec">
                        <div className="baner-card top-margin">
                            <h3 className="mb-0 mb-3 text-white fwb">History</h3>
                            <div className="mb-4 table-wrap table-responsive mb-lg-5">
                                <table className="table">
                                    <thead>
                                        <tr className="table-header">
                                            <th className="cell-width-lg">Validator Name</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="coin-img me-2">
                                                        <img className="img-fluid" src="../../assets/images/bear.png" alt="coin" width={50} height={50} />
                                                    </div>
                                                    <span className="tb-data align">DeFIMatic</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="tb-data align">10 Bone</span>
                                                <p className="mb-0 fs-12 mute-text">$8.2</p>
                                            </td>
                                            <td>
                                                <span className="tb-data align up-text">Success</span>
                                                <p className="mb-0 fs-12 ">claimed</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="coin-img me-2">
                                                        <img className="img-fluid" src="../../assets/images/bear.png" alt="coin" width={50} height={50} />
                                                    </div>
                                                    <span className="tb-data align">DeFIMatic</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="tb-data align">10 Bone</span>
                                                <p className="mb-0 fs-12 mute-text">$8.2</p>
                                            </td>
                                            <td>
                                                <span className="tb-data align up-text">Success</span>
                                                <p className="mb-0 fs-12 ">claimed</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="coin-img me-2">
                                                        <img className="img-fluid" src="../../assets/images/bear.png" alt="coin" width={50} height={50} />
                                                    </div>
                                                    <span className="tb-data align">DeFIMatic</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="tb-data align">10 Bone</span>
                                                <p className="mb-0 fs-12 mute-text">$8.2</p>
                                            </td>
                                            <td>
                                                <span className="tb-data align up-text">Success</span>
                                                <p className="mb-0 fs-12 ">claimed</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="coin-img me-2">
                                                        <img className="img-fluid" src="../../assets/images/bear.png" alt="coin" width={50} height={50} />
                                                    </div>
                                                    <span className="tb-data align">DeFIMatic</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="tb-data align">10 Bone</span>
                                                <p className="mb-0 fs-12 mute-text">$8.2</p>
                                            </td>
                                            <td>
                                                <span className="tb-data align up-text">Success</span>
                                                <p className="mb-0 fs-12 ">claimed</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="coin-img me-2">
                                                        <img className="img-fluid" src="../../assets/images/bear.png" alt="coin" width={50} height={50} />
                                                    </div>
                                                    <span className="tb-data align">DeFIMatic</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="tb-data align">10 Bone</span>
                                                <p className="mb-0 fs-12 mute-text">$8.2</p>
                                            </td>
                                            <td>
                                                <span className="tb-data align up-text">Success</span>
                                                <p className="mb-0 fs-12 ">claimed</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="coin-img me-2">
                                                        <img className="img-fluid" src="../../assets/images/bear.png" alt="coin" width={50} height={50} />
                                                    </div>
                                                    <span className="tb-data align">DeFIMatic</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="tb-data align">10 Bone</span>
                                                <p className="mb-0 fs-12 mute-text">$8.2</p>
                                            </td>
                                            <td>
                                                <span className="tb-data align up-text">Success</span>
                                                <p className="mb-0 fs-12 ">claimed</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="coin-img me-2">
                                                        <img className="img-fluid" src="../../assets/images/bear.png" alt="coin" width={50} height={50} />
                                                    </div>
                                                    <span className="tb-data align">DeFIMatic</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="tb-data align">10 Bone</span>
                                                <p className="mb-0 fs-12 mute-text">$8.2</p>
                                            </td>
                                            <td>
                                                <span className="tb-data align up-text">Success</span>
                                                <p className="mb-0 fs-12 ">claimed</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>


            </div>
        </>
    );
}

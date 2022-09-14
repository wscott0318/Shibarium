import React from "react";

import PerfectScrollbar from 'react-perfect-scrollbar';

function BalanceTable() {
    return (
        <>
            <div className="table-wrap table-responsive mb-4 mb-lg-5 mt-3">
                <table className="table">
                    <thead>
                        <tr className="table-header">
                            <th>Name</th>
                            <th>Balance</th>
                            <th className="text-center">
                                <span className="center-head">Action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img
                                    width="25"
                                    height="25"
                                    className="img-fluid me-3"
                                    src="../../assets/images/coin.png"
                                    alt=""
                                />
                                <span className="tb-data align">BONE .</span>
                                <span className="tb-data-sm align">BONE</span>
                            </td>
                            <td>
                                <span className="tb-data align">0.0000 .</span>
                                <span className="tb-data-sm align">$0.00</span>
                            </td>
                            <td className="user-action">
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt gradient_btn"
                                >
                                    <span>Deposit</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt primary-btn"
                                >
                                    <span>Withdraw</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt success-btn"
                                >
                                    <span>Send</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    width="25"
                                    height="25"
                                    className="img-fluid me-3"
                                    src="../../assets/images/blue-coin.png"
                                    alt=""
                                />
                                <span className="tb-data align">ETH .</span>
                                <span className="tb-data-sm align">
                                    ETH . Ether (Plasma - WETH)
                                </span>
                                <span className="badge-sm align ms-1">PLASMA</span>
                            </td>
                            <td>
                                <span className="tb-data align">0.0000 .</span>
                                <span className="tb-data-sm align">$0.00</span>
                            </td>
                            <td className="user-action">
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt gradient_btn"
                                >
                                    <span>Deposit</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt primary-btn"
                                >
                                    <span>Withdraw</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt success-btn"
                                >
                                    <span>Send</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    width="25"
                                    height="25"
                                    className="img-fluid me-3"
                                    src="../../assets/images/dolar.png"
                                    alt=""
                                />
                                <span className="tb-data align">USDC .</span>
                                <span className="tb-data-sm align">(PoS) USD Coin</span>
                            </td>
                            <td>
                                <span className="tb-data align">0.0000 .</span>
                                <span className="tb-data-sm align">$0.00</span>
                            </td>
                            <td className="user-action">
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt gradient_btn"
                                >
                                    <span>Deposit</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt primary-btn"
                                >
                                    <span>Withdraw</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt success-btn"
                                >
                                    <span>Send</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    width="25"
                                    height="25"
                                    className="img-fluid me-3"
                                    src="../../assets/images/blue-coin.png"
                                    alt=""
                                />
                                <span className="tb-data align">ETH .</span>
                                <span className="tb-data-sm align">
                                    ETH . Ether (Plasma - WETH)
                                </span>
                                <span className="badge-sm align ms-1">PLASMA</span>
                            </td>
                            <td>
                                <span className="tb-data align">0.0000 .</span>
                                <span className="tb-data-sm align">$0.00</span>
                            </td>
                            <td className="user-action">
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt gradient_btn"
                                >
                                    <span>Deposit</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt primary-btn"
                                >
                                    <span>Withdraw</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt success-btn"
                                >
                                    <span>Send</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    width="25"
                                    height="25"
                                    className="img-fluid me-3"
                                    src="../../assets/images/coin.png"
                                    alt=""
                                />
                                <span className="tb-data align">BONE .</span>
                                <span className="tb-data-sm align">BONE</span>
                            </td>
                            <td>
                                <span className="tb-data align">0.0000 .</span>
                                <span className="tb-data-sm align">$0.00</span>
                            </td>
                            <td className="user-action">
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt gradient_btn"
                                >
                                    <span>Deposit</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt primary-btn"
                                >
                                    <span>Withdraw</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt success-btn"
                                >
                                    <span>Send</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    width="25"
                                    height="25"
                                    className="img-fluid me-3"
                                    src="../../assets/images/blue-coin.png"
                                    alt=""
                                />
                                <span className="tb-data align">ETH .</span>
                                <span className="tb-data-sm align">
                                    ETH . Ether (Plasma - WETH)
                                </span>
                                <span className="badge-sm align ms-1">PLASMA</span>
                            </td>
                            <td>
                                <span className="tb-data align">0.0000 .</span>
                                <span className="tb-data-sm align">$0.00</span>
                            </td>
                            <td className="user-action">
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt gradient_btn"
                                >
                                    <span>Deposit</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt primary-btn"
                                >
                                    <span>Withdraw</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt success-btn"
                                >
                                    <span>Send</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    width="25"
                                    height="25"
                                    className="img-fluid me-3"
                                    src="../../assets/images/dolar.png"
                                    alt=""
                                />
                                <span className="tb-data align">USDC .</span>
                                <span className="tb-data-sm align">(PoS) USD Coin</span>
                            </td>
                            <td>
                                <span className="tb-data align">0.0000 .</span>
                                <span className="tb-data-sm align">$0.00</span>
                            </td>
                            <td className="user-action">
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt gradient_btn"
                                >
                                    <span>Deposit</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt primary-btn"
                                >
                                    <span>Withdraw</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt success-btn"
                                >
                                    <span>Send</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    width="25"
                                    height="25"
                                    className="img-fluid me-3"
                                    src="../../assets/images/blue-coin.png"
                                    alt=""
                                />
                                <span className="tb-data align">ETH .</span>
                                <span className="tb-data-sm align">
                                    ETH . Ether (Plasma - WETH)
                                </span>
                                <span className="badge-sm align ms-1">PLASMA</span>
                            </td>
                            <td>
                                <span className="tb-data align">0.0000 .</span>
                                <span className="tb-data-sm align">$0.00</span>
                            </td>
                            <td className="user-action">
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt gradient_btn"
                                >
                                    <span>Deposit</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt primary-btn"
                                >
                                    <span>Withdraw</span>
                                </a>
                                <a
                                    href="#!"
                                    title=""
                                    className="btn-small uppercase-txt success-btn"
                                >
                                    <span>Send</span>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default BalanceTable
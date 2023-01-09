import React from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';

function CompleteBurn() {

    return (
        <>
            <div className="cmn_dasdrd_table">
                <div className="table-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>Burned</th>
                                <th>Transaction Hash</th>
                                <th colSpan={3}>Date & Time(UTC)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    580.80 BONE
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img className="img-fluid me-2" src="../../assets/images/eth.png" alt="eth" width={14} />
                                        <span>Oxbe..4af0</span>
                                    </div>
                                </td>
                                <td>
                                    10 Mar 2022 , 3:14 am
                                </td>
                                <td className="text-end">
                                    <button type="button" className="btn success-btn">Burn Completed</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    580.80 BONE
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img className="img-fluid me-2" src="../../assets/images/eth.png" alt="eth" width={14} />
                                        <span>Oxbe..4af0</span>
                                    </div>
                                </td>
                                <td>
                                    10 Mar 2022 , 3:14 am
                                </td>
                                <td className="text-end">
                                    <button type="button" className="btn success-btn">Burn Completed</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    580.80 BONE
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img className="img-fluid me-2" src="../../assets/images/eth.png" alt="eth" width={14} />
                                        <span>Oxbe..4af0</span>
                                    </div>
                                </td>
                                <td>
                                    10 Mar 2022 , 3:14 am
                                </td>
                                <td className="text-end">
                                    <button type="button" className="btn success-btn">Burn Completed</button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default CompleteBurn
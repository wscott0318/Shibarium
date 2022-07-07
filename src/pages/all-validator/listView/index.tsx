/* eslint-disable @next/next/no-img-element */
<<<<<<< HEAD
=======
import { UserType } from 'app/enums/UserType';
import { useUserType } from 'app/state/user/hooks';
>>>>>>> 5950c253af96671849793b05619cb21f0ef7bb83
import DelegatePopup from 'pages/delegate-popup';
import React, { useState } from 'react';

export default function ListView({ validatorsList }: { validatorsList: any }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState({})
<<<<<<< HEAD
=======
    const [userType, setUserType] = useUserType()
>>>>>>> 5950c253af96671849793b05619cb21f0ef7bb83
    return (
        <>
            <DelegatePopup show={modalShow} data={selectedRow}
                onHide={() => setModalShow(false)} />
            <div className="mb-4 outer-table mb-lg-5">
              <table className="data-table">
                <thead>
                  <tr className="table-header">
                    <th className="cell-width-lg">Name</th>
                    {/* <th className="cell-width">Stake</th>
                    <th className="cell-width">Checkpoints Signed</th> */}
                    <th>Voting Power</th>
                    <th>Self</th>
                    <th>Commission</th>
                    <th>Uptime</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {validatorsList.map((elm:any,i:number)=>{
                  return(
                    <tr key={'q4n432+'+i}>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>{elm.name}
                      </span>
                      
                    </td>
                    {/* <td>
                      <span className="tb-data align">{parseInt(elm.stakeAmount).toFixed(0)}</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">100%</span>
                    </td> */}
                    <td>
                      <span className="tb-data align">
                        {(+elm.stakeAmount).toFixed(8)} (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">{elm.commissionRate}%</span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td className="user-action">
<<<<<<< HEAD
                      <button disabled={elm.upTime === 0}
                        onClick={() => {setModalShow(true);setSelectedRow(elm)}}
                        title=""
                        className="btn-small uppercase-txt warning-btn"
=======
                      <button disabled={elm.upTime === 0 || userType === UserType.Validator}
                        onClick={() => {setModalShow(true);setSelectedRow(elm)}}
                        title=""
                        className="btn-small uppercase-txt warning-btn"
                        
>>>>>>> 5950c253af96671849793b05619cb21f0ef7bb83
                      >
                        <span>Delegate</span>
                      </button>
                    </td>
                  </tr>
                  )
                })}
                  {!validatorsList || validatorsList.length ===0 ? 
                  <tr>
                    <td colSpan={10}><div style={{display:'flex',justifyContent:'center',padding: '3rem'}}>No Records Found.</div></td>
                  </tr>
                  :null}
                </tbody>
              </table>
            </div>
        </>
    )
}

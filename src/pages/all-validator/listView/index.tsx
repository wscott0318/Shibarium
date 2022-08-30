/* eslint-disable @next/next/no-img-element */
import { UserType } from 'app/enums/UserType';
import { enableList } from 'app/state/lists/actions';
import { useUserType } from 'app/state/user/hooks';
import Link from 'next/link';
import DelegatePopup from 'pages/delegate-popup';
import React, { useState } from 'react';
// @ts-ignore
import { ShimmerTitle, ShimmerTable } from "react-shimmer-effects";

export default function ListView({ validatorsList, searchKey }: { validatorsList: any , searchKey: string}) {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState({})
    const [userType, setUserType] = useUserType()

    const tableShimmerEffects = () => {
      return (
        <ShimmerTable row={5} col={5} />
      )
    }

    return (
        <>
            <DelegatePopup show={modalShow} data={selectedRow}
                onHide={() => setModalShow(false)} />
            <div className="mb-4 table-wrap table-responsive mb-lg-5">

              {
                !validatorsList.length && !searchKey.length ?
                tableShimmerEffects() :
                !validatorsList.length && searchKey.length ?
                <table className="table">
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
             <tr>
                 <td colSpan={10}><div style={{display:'flex',justifyContent:'center',padding: '3rem'}}>No Record Found.</div></td>
               </tr>
             </tbody>
           </table>
              : 
              <table className="table">
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
                    <span className="tb-data align d-flex" >
                    {/* <Link href="./become-validator"> */}
                      <i>
                        <img style={{height:24}} src={!elm.logoUrl || elm.logoUrl === 'PLACEHOLDER'? "../../assets/images/fundbaron.png":elm.logoUrl} alt="logo" className='me-3 mobile-image'/>
                      </i>
                    <Link href={`/all-validator/${elm.signer}`}>
                      <a >
                      {elm.name}
                      </a>
                      </Link>
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
                      {(elm.totalStaked/Math.pow(10,18)).toFixed(8)} ({(+elm.votingPowerPercent || 0).toFixed(2)}%)
                    </span>
                  </td>
                  <td>
                    <span className="tb-data align">{+elm.selfPercent.toFixed(2)}%</span>
                  </td>
                  <td>
                    <span className="tb-data success-color align">{elm.commissionPercent}%</span>
                  </td>
                  <td>
                    <span className="tb-data align">{(elm.uptimePercent).toFixed(2)}%</span>
                  </td>
                  <td className="user-action">
                      <button
                        disabled={elm.uptimePercent === 0 || userType === UserType.Validator}
                        onClick={() => { setModalShow(true); setSelectedRow(elm) }}
                        title=""
                        className="btn-small uppercase-txt warning-btn"
 
                      >
                      <span>Delegate</span>
                    </button>
                  </td>
                </tr>
                )
              })}
              </tbody>
            </table> 
              }
            </div>
        </>
    )
}

/* eslint-disable @next/next/no-img-element */
import { UserType } from 'app/enums/UserType';
import { enableList } from 'app/state/lists/actions';
import { useUserType } from 'app/state/user/hooks';
import Link from 'next/link';
import DelegatePopup from 'pages/delegate-popup';
import React, { useState } from 'react';
// @ts-ignore
import { ShimmerTitle, ShimmerTable } from "react-shimmer-effects";

export default function ListView({ validatorsList, searchKey, loading }: { validatorsList: any , searchKey: string , loading : boolean }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState({})
    const [userType, setUserType] = useUserType()

    const tableShimmerEffects = () => {
      return (
        <ShimmerTable row={5} col={5} />
      )
    }

    console.log(validatorsList)

    return (
        <>
               {/* <DelegatePopup show={modalShow} data={selectedRow}
                onHide={() => setModalShow(false)} /> */}
                <div className="cmn_dasdrd_table">
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Voting Power</th>
                        <th>Self</th>
                        <th className='text-center'>Commission</th>
                        <th>Uptime</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        validatorsList.map((x:any,  y:any) => 
                        <tr>
                        <td><span><img style={{height:24}} src={x.logoUrl ? x.logoUrl : "../../images/shiba-round-icon.png"} /></span>
                        <Link href={`/all-validator/${x.signer}`}>
                      <a >
                      {x.name}
                      </a>
                      </Link>
                        </td>
                        <td>{(x.totalStaked/Math.pow(10,18)).toFixed(8)} ({(+x.votingPowerPercent || 0).toFixed(2)}%)</td>
                        <td>{+x.selfPercent.toFixed(2)}%</td>
                        <td>{x.commissionPercent}%</td>
                        <td>{(x.uptimePercent).toFixed(2)}%</td>
                        <td><button>DELEGATE</button></td>
                      </tr>  
                         )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
        </>
    )
}

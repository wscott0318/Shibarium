/* eslint-disable @next/next/no-img-element */
import { UserType } from 'app/enums/UserType';
import { enableList } from 'app/state/lists/actions';
import { useUserType } from 'app/state/user/hooks';
import Link from 'next/link';
import DelegatePopup from 'pages/delegate-popup';
import React, { useState } from 'react';
import { addDecimalValue, inActiveCount, toFixedPrecent, tokenDecimal, web3Decimals } from 'web3/commonFunctions';
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
    const [showdelegatepop, setdelegatepop] = useState(false);
    // console.log(validatorsList);
    
    return (
      <>
        <DelegatePopup
          showdelegatepop={showdelegatepop}
          setdelegatepop={setdelegatepop}
          data={selectedRow}
        />
        <div className="cmn_dasdrd_table ffms-inherit table-fix block-fix">
          <div className="table-responsive">
            <table className="table table-borderless fxd-layout tbl-mob">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className='fx-wdth'>Staked Amount</th>
                  <th>Self</th>
                  <th className="">Commission</th>
                  <th>Uptime</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {validatorsList.map((x: any, y: any) => (
                  <tr key={y}>
                    <td>
                      <div className='self-align'>
                      <span>
                        <img
                          style={{ height: 24 }}
                          src={
                            x.logoUrl
                              ? x.logoUrl
                              : "../../assets/images/shiba-round-icon.png"
                          }
                        />
                      </span>
                      <Link href={`/all-validator/${x.signer}`} passHref>
                        <p className='tb-value'>{x.name}</p>
                      </Link>
                      </div>
                    </td>
                    <td>
                      {addDecimalValue(+x.totalstaked)} 
                      {/* ({(+x.votingpowerpercent || 0).toFixed(toFixedPrecent)}%) */}
                    </td>
                    <td>{ x.selfpercent ?  addDecimalValue(parseInt(x.selfpercent)) : "0" }%</td>
                    <td><span className='precent-td'>{x?.commissionrate} %</span></td>

                    <td>{x.uptimePercent?.toFixed(toFixedPrecent)}%</td>

                    <td className='text-start'>
                      {
                        userType === 'Validator' ?
                        <Link href={`/all-validator/${x.signer}`} passHref>
                        <p className='btn primary-btn w-100'>View</p>
                      </Link>
                      : 
                      <button className='btn primary-btn w-100'
                      disabled={ x.fundamental === 1 ? true : x.uptimePercent <= inActiveCount ? true : false}
                        onClick={() => {
                          setdelegatepop(true);
                          setSelectedRow(x)
                        }}
                      >
                        Delegate
                      </button>
                      }
                   
                      
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
          <div className='no-found'>
              {validatorsList.length === 0 && (
                  <div>
                    <div className='text-center'><img src="../../assets/images/no-record.png"/></div>
                    {/* <p className='text-center'>No Record Found.</p> */}
                  </div>
              )}
          </div>
        </div>
      </>
    );
}

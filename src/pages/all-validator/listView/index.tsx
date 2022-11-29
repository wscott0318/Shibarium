/* eslint-disable @next/next/no-img-element */
import { UserType } from 'app/enums/UserType';
import { enableList } from 'app/state/lists/actions';
import { useUserType } from 'app/state/user/hooks';
import Link from 'next/link';
import DelegatePopup from 'pages/delegate-popup';
import React, { useState } from 'react';
import { addDecimalValue, imagUrlChecking, inActiveCount, toFixedPrecent, tokenDecimal, web3Decimals } from 'web3/commonFunctions';
// @ts-ignore
import { ShimmerTitle, ShimmerTable } from "react-shimmer-effects";
import DynamicShimmer from 'app/components/Shimmer/DynamicShimmer';
import Scrollbar from "react-scrollbars-custom";

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

        <div className="cmn_dasdrd_table ffms-inherit table-fix block-fix scroll-cus">
          <div className="table-responsive">
            <table className="table table-borderless fxd-layout tbl-mob">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="fx-wdth">Staked Amount</th>
                  <th>Self</th>
                  <th className="">Commission</th>
                  <th>Uptime</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <Scrollbar>
                
              </Scrollbar>
              <tbody>
              {validatorsList.length ? validatorsList.map((x: any, y: any) => (
                  <tr key={y}>
                    <td>
                      <div className='self-align'>
                      <span>
                        <img
                          style={{ height: 24 }}
                          // src={
                          //   x.logoUrl
                          //     ? x.logoUrl
                          //     : "../../assets/images/shiba-round-icon.png"
                          // }
                          src={imagUrlChecking(x.logoUrl)}
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

                      <td className="text-start">
                        {userType === "Validator" ? (
                          <Link href={`/all-validator/${x.signer}`} passHref>
                            <p className="btn primary-btn w-100">View</p>
                          </Link>
                        ) : (
                          <button
                            className="btn primary-btn w-100"
                            disabled={
                              x.fundamental === 1
                                ? true
                                : x.uptimePercent <= inActiveCount
                                ? true
                                : false
                            }
                            onClick={() => {
                              setdelegatepop(true);
                              setSelectedRow(x);
                            }}
                          >
                            Delegate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                 : (
                  <tr>
                    <td colSpan={6}>
                      <DynamicShimmer type={"table"} rows={13} cols={6} />
                    </td>
                  </tr>
                )
                 }
              </tbody>
            </table>
          </div>
          
        </div>
      </>
    );
}

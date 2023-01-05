/* eslint-disable @next/next/no-img-element */
import { useUserType } from 'app/state/user/hooks';
import Link from 'next/link';
import DelegatePopup from 'pages/delegate-popup';
import React, { useState } from 'react';
import { addDecimalValue, imagUrlChecking, inActiveCount, toFixedPrecent, tokenDecimal, web3Decimals } from 'web3/commonFunctions';
import { useWeb3React } from "@web3-react/core";
import Scrollbar from "react-scrollbars-custom";
import { useRouter } from 'next/router';
import MigratePopup from 'pages/migrate-popup';

export default function ListView({ validatorsList, searchKey, loading, migrateData = {} }: { validatorsList: any, searchKey: string, loading: boolean, migrateData : any }) {
  const [selectedRow, setSelectedRow] = useState({})
  const { account, deactivate, active } = useWeb3React();
  const [userType, setUserType] = useUserType()
  const [showdelegatepop, setdelegatepop] = useState(false);
  const [showmigratepop, setmigratepop] = useState(false);
  
  console.log("validators list after searching " , validatorsList)
  
  // console.log(migrateData);
  const router = useRouter();

  return (
    <>
      <DelegatePopup
        showdelegatepop={showdelegatepop}
        setdelegatepop={setdelegatepop}
        data={selectedRow}
      />
      <MigratePopup
        showmigratepop={showmigratepop}
        setmigratepop={setmigratepop}
        data={selectedRow}
        migrateDataRow={migrateData}
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
            <Scrollbar></Scrollbar>
            <tbody>
              {validatorsList?.length ? (
                validatorsList.map((x: any, y: any) => (
                  <tr key={y}>
                    <td>
                      <div className="self-align">
                        <span>
                          <img
                            style={{ height: 24,width:24 }}
                            src={
                              x.logoUrl?.startsWith("http")
                                ? x.logoUrl
                                : "../../assets/images/shiba-round-icon.png"
                            }
                          // src={imagUrlChecking(x.logoUrl)}
                          />
                        </span>
                        <Link href={`/all-validator/${x.signer}`} passHref>
                          <p className="tb-value">{x.name}</p>
                        </Link>
                      </div>
                    </td>
                    <td>
                      {addDecimalValue(+(x.totalstaked))}
                      {/* ({(+x.votingpowerpercent || 0).toFixed(toFixedPrecent)}%) */}
                    </td>
                    <td>
                      {x.selfpercent
                        ? addDecimalValue(+(x.selfpercent))
                        : "0"}
                      %
                    </td>
                    <td>
                      <span className="precent-td">
                        {x?.commissionrate} %
                      </span>
                    </td>

                    <td>{x.uptimePercent?.toFixed(toFixedPrecent)}%</td>

                    <td className="text-start">
                      {userType === "Validator" ? (
                        <Link href={`/all-validator/${x.signer}`} passHref>
                          <div className='delegate_btn'>
                          <p className="btn primary-btn w-100">View</p>
                          <div className="tool-desc tool-desc-sm">View Validator Info.</div>
                          </div>
                        </Link>
                      ) : (
                        <div className="delegate_btn">
                          <button
                            className="btn primary-btn w-100"
                            disabled={
                              !account ? true : x.fundamental === 1
                                ? true
                                : x.uptimePercent <= inActiveCount
                                  ? true
                                  : x.contractAddress == migrateData.contractAddress ? true : false
                            }
                            // disabled={
                            //   !account || x.fundamental === 1 || x.uptimePercent <= inActiveCount || x.contractAddress == migrateData.contractAddress
                            // }
                            onClick={() => {
                              setSelectedRow(x);
                              if (
                                router.asPath.split("/")[1] === "migrate-stake"
                              ) {
                                setmigratepop(true);
                                setSelectedRow(x);
                              }
                              else {
                                setdelegatepop(true);
                              }
                            }}
                          >
                            {router.asPath.split("/")[1] === "migrate-stake"
                              ? "Stake here"
                              : "Delegate"}
                          </button>
                          {account && (x.fundamental === 1 || x.uptimePercent <= inActiveCount
                            ? (<div className="tool-desc">This is a fundamental node. <br /> Delegation is not enabled here.</div>)
                            : (router.asPath.split("/")[1] === "migrate-stake"
                              ? (<div className="tool-desc tool-desc-sm">{x.contractAddress == migrateData.contractAddress ? "Stakes cannot be migrated to same Validator." : "Migrate Your Stakes here."}</div>)
                              : (<div className="tool-desc tool-desc-sm">Delegation is enabled.</div>)))}
                          {!account && <div className="tool-desc tool-desc-sm">Login to enable delegation.</div>}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    {/* <DynamicShimmer type={"table"} rows={13} cols={6} /> */}
                    <div className="no-found">
                      <img src="../../assets/images/no-record.png" />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

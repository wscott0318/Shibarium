/* eslint-disable @next/next/no-img-element */
import { useUserType } from 'app/state/user/hooks';
import Link from 'next/link';
import DelegatePopup from 'pages/delegate-popup';
import React, { useState } from 'react';
import { addDecimalValue, inActiveCount, toFixedPrecent } from 'web3/commonFunctions';
import { useWeb3React } from "@web3-react/core";
import Scrollbar from "react-scrollbars-custom";
import { useRouter } from 'next/router';
import MigratePopup from 'pages/migrate-popup';
import DynamicShimmer from 'app/components/Shimmer/DynamicShimmer';

export default function ListView({ validatorsList, searchKey, loading, migrateData = {}, nodeSetup }: { validatorsList: any, searchKey: string, loading: boolean, migrateData: any,  nodeSetup:number }) {
  const [selectedRow, setSelectedRow] = useState({})
  const { account } = useWeb3React();
  const [userType, setUserType] = useUserType() //NOSONAR
  const [showdelegatepop, setdelegatepop] = useState(false);
  const [showmigratepop, setmigratepop] = useState(false);
  const router = useRouter();
  
  const tootlTipDesc = (x: any) => {
    if (account) {
      if (x.fundamental === 1) {
        return <div className="tool-desc">This is a fundamental node. <br /> Delegation is not enabled here.</div>;
      } else if (x.uptimePercent <= inActiveCount) {
        return <div className="tool-desc tool-desc-sm">Offline since {x.missedLatestCheckpointcount} checkpoints</div>
      }
      else if (router.asPath.split("/")[1] === "migrate-stake") {
        return <div className="tool-desc tool-desc-sm">{x.contractAddress == migrateData.contractAddress ? "Stakes cannot be migrated to same Validator." : "Migrate Your Stakes here."}</div>;
      }
      else {
        return <div className="tool-desc tool-desc-sm">Delegation is enabled.</div>
      }
    }
  }
  
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
    event.currentTarget.className = "error";
  };

  const buttonText = (x: any) => {
    if(router.asPath.split("/")[1] === "migrate-stake") {
      return "Stake here"
    } else {
      if(x.checkpointstatus === 0 && +(x.missedLatestCheckpointcount) >= 500 && x.fundamental === 2) {
        return <p style={{ fontSize: '12px'}}>Offline since<br/>{x.missedLatestCheckpointcount} checkpoints</p> 
      } else {
        return "Delegate"
      }
    }
  }
  
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
              {!loading && (validatorsList?.length ? (
                validatorsList.map((x: any, y: any) => (
                  <tr key={x?.signer}>
                    <td>
                      <div className="self-align">
                        <span>
                          <img
                            style={{ height: 24, width: 24 }}
                            src={
                              x.logoUrl?.startsWith("http")
                                ? x.logoUrl
                                : "../../assets/images/shiba-round-icon.png"
                            }
                            onError={imageOnErrorHandler}
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
                      {userType === "Validator" && nodeSetup === 1 ? (
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
                            disabled={!account || x.fundamental === 1 || x.uptimePercent <= inActiveCount || x.contractAddress == migrateData.contractAddress ? true : false}
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
                            {buttonText(x)}
                            
                          </button>
                          {tootlTipDesc(x)}
                          {!account && <div className="tool-desc tool-desc-sm">Login to enable delegation.</div>}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="no-found">
                      <img src="../../assets/images/no-record.png" />
                    </div>
                  </td>
                </tr>
              ))}
              {loading && (
                <tr>
                  <td colSpan={6}>
                    <DynamicShimmer type={"table"} rows={13} cols={6} />
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

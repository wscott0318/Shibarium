/* eslint-disable @next/next/no-img-element */
import { useUserType } from 'app/state/user/hooks';
import Link from 'next/link';
import React, { useState } from 'react'
import NumberFormat from 'react-number-format';
import DelegatePopup from '../../delegate-popup';
import { useWeb3React } from "@web3-react/core";
import { addDecimalValue, inActiveCount, toFixedPrecent } from 'web3/commonFunctions';
import MigratePopup from 'pages/migrate-popup';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';

export default function ValidatorGrid({ validatorsList, loading, searchKey, migrateData = {} }: { validatorsList: any, loading: boolean, searchKey: any, migrateData: any }) {
  const { account } = useWeb3React();
  const [selectedRow, setSelectedRow] = useState({});
  const [userType, setUserType] = useUserType()
  const [showdelegatepop, setdelegatepop] = useState(false);
  const router = useRouter();
  const [showmigratepop, setmigratepop] = useState(false);
  
  const tootlTipDesc = (x: any) => {
    if (account) {
      if (x.fundamental === 1) {
        return <div className="tool-desc tool-desc-grid">This is a fundamental node. <br /> Delegation is not enabled here.</div>;
      } else if (x.uptimePercent <= inActiveCount) {
        return <div className="tool-desc tool-desc-grid">Offline since {x.missedLatestCheckpointcount} checkpoints</div>
      }
      else if (router.asPath.split("/")[1] === "migrate-stake") {
        return <div className="tool-desc tool-desc-grid">{x.contractAddress == migrateData.contractAddress ? "Stakes cannot be migrated to same Validator." : "Migrate Your Stakes here."}</div>;
      }
      else {
        return <div className="tool-desc tool-desc-grid">Delegation is enabled.</div>
      }
    }
  }
  
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
    event.currentTarget.className = "error me-3";
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
      <div className="ffms-inherit">
        <div className="grid-sec">
          {validatorsList && validatorsList.length ? (
            <div className="row side-cover">
              {validatorsList.map((validator: any) => (
                <div key={validator?.signer} className="mb-4 col-xl-3 col-sm-6 col-12 side-space mb-sm-4">
                  <div className="box">
                    <div className="box-head">
                      <div className="d-flex align-items-center justify-content-start">
                        <div>
                          <span>
                            {" "}
                            <img
                              style={{ height: 50, width: 50 }}
                              src={
                                validator.logoUrl?.startsWith("http")
                                  ? validator.logoUrl
                                  : "../../assets/images/shiba-round-icon.png"
                              }
                              onError={imageOnErrorHandler}
                              alt="logo"
                              className="me-3"
                            />
                          </span>
                        </div>
                        <div className="fw-600">
                          <span className="vertical-align">
                            <Link
                              href={`/all-validator/${validator.signer}`}
                              passHref
                            >
                              <p className="tb-value">{validator?.name}</p>
                            </Link>
                          </span>
                          <p>
                            <span className="ft-14 light-text">
                              <NumberFormat
                                displayType="text"
                                thousandSeparator
                                value={addDecimalValue(
                                  +validator.totalstaked
                                )}
                              />{" "}
                              BONE
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="box-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="fw-600 ft-14">Uptime</div>
                        <div>
                          <span className="warning-color fw-600 ft-14">
                            {(+validator.uptimePercent).toFixed(
                              toFixedPrecent
                            )}
                            %
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="fw-600 ft-14">Commission</div>
                        <div>
                          <span className="warning-color fw-600 ft-14">
                            {validator?.commissionrate}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        {userType === "Validator" ? (
                          <Link
                            href={`/all-validator/${validator.signer}`}
                            passHref
                          >
                            <div className="delegate_btn">
                              <p className="btn primary-btn light-text w-100">
                                View
                              </p>
                              <div className="tool-desc tool-desc-grid">View Validator Info.</div>
                            </div>
                          </Link>
                        ) : (
                          <div className="delegate_btn">
                            <button
                              disabled={!account || validator.fundamental === 1 || validator.uptimePercent <= inActiveCount || validator.contractAddress == migrateData.contractAddress ? true : false}
                              type="button"
                              onClick={() => {
                                setSelectedRow(validator);
                                if (
                                  router.asPath.split("/")[1] ===
                                  "migrate-stake"
                                ) {
                                  setmigratepop(true);
                                } else {
                                  setdelegatepop(true);
                                }
                              }}
                              className="btn primary-btn light-text w-100"
                            >
                              <span>
                                {buttonText(validator)}
                              </span>
                            </button>
                            {tootlTipDesc(validator)}
                            {!account && <div className="tool-desc tool-desc-grid">Login to enable delegation.</div>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>)
              )}
            </div>
          ) : loading && (
            //   : <div className='no-record' style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>No Record Found.</div>
              <div className='grid-view-shimmer'>
                {/* <DynamicShimmer type={"table"} rows={2} cols={2} /> */}
                <CircularProgress style={{color:" #F28B03"}} size={100} />
              </div>
          )}
          {!loading && !validatorsList?.length &&
            (<div className="no-found no-records-wrapper">
              <div>
                <div>
                  <img src="../../assets/images/no-record.png" />
                </div>
              </div>
            </div>)
          }
        </div>
      </div>
    </>
  )
}
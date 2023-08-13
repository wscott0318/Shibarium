/* eslint-disable @next/next/no-img-element */
import { useUserType } from "app/state/user/hooks";
import Link from "next/link";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import DelegatePopup from "../../delegate-popup";
import { useWeb3React } from "@web3-react/core";
import {
  addDecimalValue,
  inActiveCount,
  publicVal,
  toFixedPrecent,
} from "web3/commonFunctions";
import MigratePopup from "pages/migrate-popup";
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";

export default function ValidatorGrid({
  validatorsList,
  loading,
  searchKey,
  migrateData = {},
  nodeSetup,
}: {
  validatorsList: any;
  loading: boolean;
  searchKey: any;
  migrateData: any;
  nodeSetup: number;
}) {
  const { account } = useWeb3React();
  const [selectedRow, setSelectedRow] = useState({});
  const [userType, setUserType] = useUserType(); //NOSONAR
  const [showdelegatepop, setdelegatepop] = useState(false);
  const router = useRouter();
  const [showmigratepop, setmigratepop] = useState(false);

  const tootlTipDesc = (x: any) => {
    if (account) {
      if (
        x.checkpointstatus === 0 &&
        +x.missedLatestCheckpointcount >= 500 &&
        x.fundamental === publicVal
      ) {
        return (
          <div className="tool-desc tool-desc-grid">
            Offline since {x.missedLatestCheckpointcount} checkpoints
          </div>
        );
      } else if (x.lastcheckpointsigned === 0 && x.fundamental === publicVal) {
        return null;
      } else if (router.asPath.split("/")[1] === "migrate-stake") {
        return (
          <div className="tool-desc tool-desc-grid">
            {x.contractAddress == migrateData.contractAddress
              ? "Stakes cannot be migrated to same Validator."
              : "Migrate Your Stakes here."}
          </div>
        );
      } else if (x.uptimePercent <= inActiveCount) {
        return (
          <div className="tool-desc tool-desc-grid">
            Delegation is disabled.
          </div>
        );
      } else {
        return (
          <div className="tool-desc tool-desc-grid">Delegation is enabled.</div>
        );
      }
    } else {
      if (x.lastcheckpointsigned === 0 && x.fundamental === publicVal) {
        return null;
      } else {
        return (
          <div className="tool-desc tool-desc-grid">
            Login to enable delegation.
          </div>
        );
      }
    }
  };

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
    event.currentTarget.className = "error me-3";
  };

  const buttonText = (x: any) => {
    if (router.asPath.split("/")[1] === "migrate-stake") {
      return "Stake here";
    } else {
      if (
        x.checkpointstatus === 0 &&
        +x.missedLatestCheckpointcount >= 500 &&
        x.fundamental === publicVal
      ) {
        return (
          <p style={{ fontSize: "12px" }} className="no_btn">
            Offline since
            <br />
            {x.missedLatestCheckpointcount} checkpoints
          </p>
        );
      } else if (x.lastcheckpointsigned === 0 && x.fundamental === publicVal) {
        return (
          <p
            style={{ fontSize: "12px", whiteSpace: "pre-wrap" }}
            className="no_btn"
          >
            Not signing checkpoints.
          </p>
        );
      } else if (x.uptimePercent <= inActiveCount) {
        return "Delegation Disabled";
      } else {
        return "Delegate";
      }
    }
  };
  const getDelegatorCardData = (account: any) => {
    return true;
  };
  console.log("validatorsList ", validatorsList);
  return (
    <>
      <DelegatePopup
        showdelegatepop={showdelegatepop}
        setdelegatepop={setdelegatepop}
        data={selectedRow}
        getDelegatorCardData={getDelegatorCardData}
      />
      <MigratePopup
        showmigratepop={showmigratepop}
        setmigratepop={setmigratepop}
        data={selectedRow}
        migrateDataRow={migrateData}
      />
      <div className="ffms-inherit">
        <div className="grid-sec">
          {validatorsList.length ? (
            <div className="row side-cover">
              {validatorsList.map((validator: any) => (
                <div
                  key={validator?.signer}
                  className="mb-4 col-xl-3 col-sm-6 col-12 side-space mb-sm-4"
                >
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
                                  : "../../assets/images/American_Shib.png"
                              }
                              onError={imageOnErrorHandler}
                              className="valMiniImage me-3"
                              alt="logo"
                            />
                          </span>
                        </div>
                        <div className="fw-600">
                          <span className="vertical-align">
                            <Link
                              href={`/all-validator/${validator.signer}`}
                              passHref
                            >
                              <p className="tb-value">
                                {validator?.name ? validator?.name : "-"}
                              </p>
                            </Link>
                          </span>
                          <p>
                            <span className="ft-14 light-text">
                              <NumberFormat
                                displayType="text"
                                thousandSeparator
                                value={addDecimalValue(+validator.totalstaked)}
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
                            {(+validator.uptimePercent).toFixed(toFixedPrecent)}
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
                        {userType === "Validator" && nodeSetup === 1 ? (
                          <Link
                            href={`/all-validator/${validator.signer}`}
                            passHref
                          >
                            <div className="delegate_btn">
                              <p className="btn primary-btn light-text w-100">
                                View
                              </p>
                              <div className="tool-desc tool-desc-grid">
                                View Validator Info.
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div className="delegate_btn">
                            <button
                              disabled={
                                !account ||
                                validator.uptimePercent <= inActiveCount ||
                                validator.contractAddress ==
                                  migrateData.contractAddress ||
                                (validator.lastcheckpointsigned === 0 &&
                                  validator.fundamental === publicVal)
                                  ? true
                                  : false
                              }
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
                              {buttonText(validator)}
                            </button>
                            {tootlTipDesc(validator)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            loading && (
              //   : <div className='no-record' style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>No Record Found.</div>
              <div className="grid-view-shimmer">
                {/* <DynamicShimmer type={"table"} rows={2} cols={2} /> */}
                <CircularProgress style={{ color: " #F28B03" }} size={100} />
              </div>
            )
          )}
          {!loading && !validatorsList?.length && (
            <div className="no-found no-records-wrapper">
              <div>
                <div>
                  <img src="../../assets/images/no-record.png" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

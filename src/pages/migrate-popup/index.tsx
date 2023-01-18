import React, { useEffect, useState } from "react";
import { BONE_ID } from "app/config/constant";
import { getBoneUSDValue } from "app/services/apis/validator";
import NumberFormat from "react-number-format";
import { useActiveWeb3React, useLocalWeb3 } from "app/services/web3";
import { getExplorerLink } from "app/functions/explorer";
import fromExponential from "from-exponential";
import {
  toFixedPrecent,
  USER_REJECTED_TX,currentGasPrice,tokenDecimal, web3Decimals
} from "../../web3/commonFunctions";
import CommonModal from "pages/components/CommonModel";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  addTransaction,
  finalizeTransaction,
} from "../../state/transactions/actions";
import { useAppDispatch } from "../../state/hooks";
import { dynamicChaining } from "web3/DynamicChaining";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/router";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { useMigrateStake } from "app/state/user/hooks";
import { CircularProgress } from "@material-ui/core";
import { useWeb3Decimals } from "app/hooks/useTokenBalance";
const initialModalState = {
  step0: true,
  step1: false,
  step2: false,
  step3: false,
  title: "Migrate",
};

const MigratePopup: React.FC<any> = ({
  data,
  onHide,
  migrateDataRow,
  showmigratepop,
  setmigratepop,
  ...props
}: any) => {
  const [boneUSDValue, setBoneUSDValue] = useState<number>(0);
  const { account, chainId = 1, library } = useActiveWeb3React();
  const web3 = useLocalWeb3();
  const dispatch = useAppDispatch();
  const [migrateState, setmigrateState] = useState(initialModalState);
  const [loader, setLoader] = useState(false);
  const [transactionState, setTransactionState] = useState({
    state: false,
    title: "",
  });
  const [explorerLink, setExplorerLink] = useState<string>("");
  const [validatorID, setValidatorID] = useState<any>("");
  const [balance, setBalance] = useState(0);
  const [migrateData, setMigrateData] = useMigrateStake();
  const router = useRouter();
  const [processing, setProcessing] = useState("Migrate");
  // const decimal = useWeb3Decimals(dynamicChaining[chainId].BONE);
  useEffect(() => {
    getBoneUSDValue(BONE_ID).then((res) => {
      setBoneUSDValue(res.data.data.price);
    });
  }, [account]);

  const useMax = (e: any) => {
    e.preventDefault();
    setFieldValue("balance", balance);
  };
  const closeModal = (e: any) => {
    onHide();
  };

  const totalStake = (migrateData: any) => {
    let stakeAmount = migrateData?.data?.stake;
    setBalance(stakeAmount);
  }

  useEffect(() => {
    totalStake(migrateData);
  }, [migrateData]);


  const migrateStake = async (values: any, data: any, migrateData: any) => {
    try {
      if (account && migrateData?.data?.migrateData?.id != data.validatorContractId) {
        setTransactionState({ state: true, title: "Pending" });
        setProcessing("Processing");
        let walletAddress: any = account;
        let fromId = migrateData?.data?.migrateData?.id;
        let toId = data.validatorContractId;
        let totalAmount = (values.balance) * Math.pow(10, web3Decimals);
        let Amount = fromExponential(web3.utils.toBN(totalAmount));
        let instance = new web3.eth.Contract(
          stakeManagerProxyABI,
          dynamicChaining[chainId].STAKE_MANAGER_PROXY
        );
        let gasFee = await instance.methods
          .migrateDelegation(fromId, toId, Amount)
          .estimateGas({ from: walletAddress });
        let encodedAbi = await instance.methods.migrateDelegation(fromId, toId, Amount).encodeABI();
        let CurrentgasPrice: any = await currentGasPrice(web3);
        await web3.eth
          .sendTransaction({
            from: walletAddress,
            to: dynamicChaining[chainId].STAKE_MANAGER_PROXY,
            gas: (parseInt(gasFee) + 30000).toString(),
            gasPrice: CurrentgasPrice,
            data: encodedAbi,
          })
          .on("transactionHash", (res: any) => {
            dispatch(
              addTransaction({
                hash: res,
                from: walletAddress,
                chainId,
                summary: `${res}`,
              })
            );
            const link = getExplorerLink(
              chainId,
              res,
              "transaction"
            );
            setExplorerLink(link);
            setTransactionState({ state: true, title: "Submitted" });
            let newStake = (parseFloat(migrateData?.data?.stake) - values.balance);
            setMigrateData(migrateData?.data?.migrateData, newStake);
            setmigrateState(initialModalState);
            setFieldValue("balance", "");
            
          })
          .on("receipt", (res: any) => {
            dispatch(
              finalizeTransaction({
                hash: res.transactionHash,
                chainId,
                receipt: {
                  to: res.to,
                  from: res.from,
                  contractAddress: res.contractAddress,
                  transactionIndex: res.transactionIndex,
                  blockHash: res.blockHash,
                  transactionHash: res.transactionHash,
                  blockNumber: res.blockNumber,
                  status: 1,
                },
              })
            );
            setProcessing("Completed");
            setTransactionState({ state: false, title: "" });
            router.back();
            resetForm();
          })
          .on("error", (res: any) => {
            setmigrateState(initialModalState);
            setmigratepop(false);
            setProcessing("Migrate");
            setTransactionState({ state: false, title: "" });
            setFieldValue("balance", "");
            resetForm();
          });
      }
    }
    catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureMessage("migrateStake ", err);
      }
      setmigrateState(initialModalState);
      setmigratepop(false);
      setProcessing("Migrate");
      setTransactionState({ state: false, title: "" });
      handleClose()
      setFieldValue("balance", "");
      resetForm();
    }
  }

  let schema = yup.object().shape({
    balance: yup
      .number()
      .typeError("Only digits are allowed.")
      .max(
        balance,
        "Insufficient Balance"
      )
      .min(1, "Invalid amount.")
      .positive("Enter valid Balance.")
      .required("Balance is required."),
  });
  const initialValues = {
    balance: 0,
  };
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
    touched,
    setValues,
    resetForm
  } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
    },
  });

  const handleClose = () => {
    setmigrateState(initialModalState);
    setmigratepop(false);
    setProcessing("Migrate");
    setFieldValue("balance", "");
    resetForm();
  };

  return (
    <>
      <CommonModal
        title={processing}
        show={showmigratepop}
        setshow={() => { handleClose(); resetForm(); }}
        externalCls="stak-pop del-pop ffms-inherit mig-popup"
      >
        <ul className="stepper mt-3 del-step">
          <li className="step active">
            <div className="step-ico">
              <img
                className="img-fluid"
                src="../../assets/images/tick-yes.png"
                alt="check-icon"
              />
            </div>
            <div className="step-title">Migrate</div>
          </li>
          <li className={`step ${(processing != "Migrate") && "active"}`}>
            <div className="step-ico">
              <img
                className="img-fluid"
                src="../../assets/images/tick-yes.png"
                alt="check-icon"
              />
            </div>
            <div className="step-title">Processing</div>
          </li>
          <li className={`step ${(processing == "Completed") && "active"}`}>
            <div className="step-ico">
              <img
                className="img-fluid"
                src="../../assets/images/tick-yes.png"
                alt="check-icon"
              />
            </div>
            <div className="step-title">Completed</div>
          </li>
        </ul>
        {processing == "Processing" &&
          (
            <div className="step_content fl-box">
              <div className="ax-top">
                <div className="image_area row">
                  <div className="col-12 text-center watch-img-sec">
                    {/* <img
                      className="img-fluid img-wdth"
                      src="../../assets/images/progress-loading.gif"
                      height="150"
                      width="150"
                    /> */}
                    <CircularProgress color="inherit" size={120} style={{ color: "#f06500" }} />
                  </div>
                </div>
                <div className="mid_text row">
                  <div className="col-12 text-center">
                    <h4 className="ff-mos">Transaction in progress</h4>
                  </div>
                  <div className="col-12 text-center">
                    <p className="ff-mos">
                      BONE transactions can take longer time to complete
                      based upon network congestion. Please wait or increase
                      the gas price of the transaction.
                    </p>
                  </div>
                </div>
              </div>
              <div className="ax-bottom">
                <div className="pop_btns_area row form-control mt-3">
                  <div className="col-12">
                    <button
                      className="btn primary-btn d-flex align-items-center justify-content-center w-100"
                      // target="_blank"
                      disabled={explorerLink ? false : true}
                      onClick={() => window.open(explorerLink)}
                    // href={explorerLink}
                    >
                      <span>View on Block Explorer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {processing == "Completed" && (
          <div className="step_content fl-box">
            <div className="ax-top">
              <div className="image_area row">
                <div className="col-12 text-center watch-img-sec">
                  <img
                    className="img-fluid img-wdth"
                    src="../../assets/images/cmpete-step.png"
                    width="150"
                    height="150"
                  />
                </div>
              </div>
              <div className="mid_text row">
                <div className="col-12 text-center">
                  <h4 className="ff-mos">Stakes Migrated</h4>
                </div>
                <div className="col-12 text-center">
                  <p className="ff-mos">
                    Your stakes have been successfully migrated to another validator.
                  </p>
                </div>
              </div>
            </div>
            <div className="ax-bottom">
              <div className="pop_btns_area row form-control mt-3">
                <div className="col-12">
                  <button className="w-100">
                    <a
                      className="btn primary-btn d-flex align-items-center justify-content-center"
                      target="_blank"
                      href={explorerLink}
                    >
                      <span>View on Block Explorer</span>
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>

        )}
        {processing == "Error" &&
          (
            <div className="text-center">
              <img
                className={`img-fluid tick-img m-auto mb-2`}
                src="../../assets/images/alert-icon.png"
                alt=""
                width="24"
              />
              Error processing this transaction. <br /> Try Again</div>
          )}
        {processing == "Migrate" &&
          (
            <>
              <div className="cmn_modal vali_deli_popups ffms-inherit">
                <form className="h-100" onSubmit={handleSubmit}>
                  <div className="step_content fl-box">
                    <div className="ax-top">
                      <div className="pop-grid flex-grid">
                        <div className="text-center box-block">
                          <div className="d-inline-block img-flexible">
                            <img
                              className="img-fluid"
                              src="../../assets/images/etharium.png"
                              alt=""
                            />
                          </div>
                          <p>{migrateDataRow?.name}</p>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block arow-block right-arrow">
                            {/* <img className="img-fluid" src="../../assets/images/white-arrow.png" alt="" /> */}
                            <div className="scrolldown-container">
                              <div className="scrolldown-btn">
                                <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="80px" viewBox="0 0 50 80" enableBackground="new 0 0 50 80" xmlSpace="preserve">
                                  <path className="first-path" fill="#FFFFFF" d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z" />
                                  <path className="second-path" fill="#FFFFFF" d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center box-block">
                          <div className="d-inline-block img-flexible">
                            <img
                              className="img-fluid"
                              src="../../assets/images/shib-borderd-icon.png"
                              alt=""
                            />
                          </div>
                          <p>{data?.name}</p>
                        </div>
                      </div>
                      <div className="info-box my-3">
                        <div className="d-flex align-items-center justify-content-start">
                          <div className="migimg mr-4">
                            {data.logoUrl ? (
                              <img
                                src={data.logoUrl}
                                width="20"
                                height="20"
                                className="img-fluid"
                              />
                            ) : (
                              <img
                                src="../../assets/images/shiba-round-icon.png"
                                width="20"
                                height="20"
                                className="img-fluid"
                              />
                            )}
                          </div>
                          {/* <div>
                        <div>
                          <span className="user-icon"></span>
                        </div>
                      </div> */}
                          <div className="fw-700">
                            <span className="vertical-align ft-22">
                              {data.name}
                            </span>
                            <p>
                              <span className="light-text">
                                {data?.uptimePercent?.toFixed(toFixedPrecent)}%
                                Performance <br /> {data.commissionrate} % Commission
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="err-wrap">
                        <div className="form-field position-relative two-fld max-group extr_pd_remove bg-clr h-auto">
                          <div className="mid-chain w-100">
                            <input
                              className="w-100"
                              placeholder="0.00"
                              name="balance"
                              autoComplete="off"
                              value={values.balance}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <button
                            disabled={balance > 0 ? false : true}
                            onClick={(e) => useMax(e)}
                            className="rt-chain"
                          >
                            <span className="orange-txt fw-bold">MAX</span>
                          </button>
                        </div>
                        {errors.balance && touched.balance ? (
                          <p className="primary-text error">{errors.balance}</p>
                        ) : null}

                        <p className="inpt_fld_hlpr_txt mt-3 text-pop-right d-flex flex-wrap mt-4">
                          <span>
                            <NumberFormat
                              value={(Number(router.query.id) * boneUSDValue).toFixed(
                                tokenDecimal
                              )}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$ "}
                            />
                          </span>
                          <span className="text-right">
                            Balance: {balance}{" "}
                            BONE
                          </span>
                        </p>
                      </div>
                      {/* <p>
                    Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum{" "}
                  </p> */}
                    </div>
                    <div className="ax-bottom">
                      <div className="pop_btns_area row form-control mt-3">
                        <div className="col-12">
                          <button onClick={(e: any) => {
                            e.preventDefault();
                            migrateStake(values, data, migrateData);
                          }}
                            disabled={values.balance > 0 ? false : true}
                            className={`w-100 ${values.balance <= 0 && "disabled"}`} type="submit" value="submit">
                            <div className="btn primary-btn d-flex align-items-center justify-content-center" >
                              <button >Continue</button>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
      </CommonModal>
    </>
  );
};

export default MigratePopup;

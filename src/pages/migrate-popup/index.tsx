import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useEthBalance } from "../../hooks/useEthBalance";
import { BONE_ID } from "app/config/constant";
import { getBoneUSDValue } from "app/services/apis/validator";
import NumberFormat from "react-number-format";
import { useActiveWeb3React, useLocalWeb3 } from "app/services/web3";
import { getExplorerLink } from "app/functions/explorer";
import { ChainId } from "shibarium-chains";
import ToastNotify from "pages/components/ToastNotify";
import { useTokenBalance } from "app/hooks/useTokenBalance";
import Web3 from "web3";
import ValidatorShareABI from "../../ABI/ValidatorShareABI.json";
import fromExponential from "from-exponential";
import {
  getAllowanceAmount,
  MAXAMOUNT,
  toFixedPrecent,
} from "../../web3/commonFunctions";
import ERC20 from "../../ABI/ERC20Abi.json";
import CommonModal from "pages/components/CommonModel";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  addTransaction,
  finalizeTransaction,
} from "../../state/transactions/actions";
import { useAppDispatch } from "../../state/hooks";
import { VALIDATOR_SHARE } from "../../web3/contractAddresses";
import { dynamicChaining } from "web3/DynamicChaining";
import { Spinner } from "react-bootstrap";
import { currentGasPrice } from "../../web3/commonFunctions";
import { tokenDecimal } from "../../web3/commonFunctions";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/router";
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
  showmigratepop,
  setmigratepop,
  ...props
}: any) => {
  const [boneUSDValue, setBoneUSDValue] = useState<number>(0);
  const { account, chainId = 1, library } = useActiveWeb3React();
  const web3 = useLocalWeb3();
  // const [data, setData] = useState();
  const dispatch = useAppDispatch();

  const [migrateState, setmigrateState] = useState(initialModalState);
  const [loader, setLoader] = useState(false);
  const walletBalance =
    chainId === ChainId.SHIBARIUM
      ? useEthBalance()
      : useTokenBalance(dynamicChaining[chainId]?.BONE);

  const router = useRouter()  
  useEffect(() => {
    getBoneUSDValue(BONE_ID).then((res) => {
      setBoneUSDValue(res.data.data.price);
    });
    if (account) {
      // getBalanceG()
    }
  }, [account]);

  const useMax = (e: any) => {
    e.preventDefault();
    // setAmount(walletBalance);
    setFieldValue("balance", Number(router.query.id));
    // console.log("called");
  };
  const closeModal = (e: any) => {
    onHide();
  };


  let schema = yup.object().shape({
    balance: yup
      .number()
      .typeError("Only digits are allowed.")
      .max(
        parseFloat(Number(router.query.id)?.toFixed(tokenDecimal)),
        "Entered value cannot be greater than Balance."
      )
      .positive("Enter valid Balance.")
      .required("Balance is required."),
  });
const initialValues = {
  balance: "",
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
  } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("Value", values);
    },
  });

  const handleClose = () => {
    setmigrateState(initialModalState);
    setmigratepop(false);
  };

  return (
    <>
      <CommonModal
        title={migrateState.title}
        show={showmigratepop}
        setshow={handleClose}
        externalCls="stak-pop del-pop ffms-inherit"
      >
        <>
          <div className="cmn_modal vali_deli_popups ffms-inherit">
            <form className="h-100" onSubmit={handleSubmit}>
              <div className="step_content fl-box">
                <div className="ax-top">
                  <div className="info-box my-3">
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="migimg mr-4">
                        {data.logoUrl ? (
                          <img
                            src={data.logoUrl}
                            width="30"
                            height="30"
                            className="img-fluid"
                          />
                        ) : (
                          <img
                            src="../../assets/images/shiba-round-icon.png"
                            width="30"
                            height="30"
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
                            Performance - {data.commissionrate} % Commission
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
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
                      disabled={walletBalance > 0 ? false : true}
                      onClick={(e) => useMax(e)}
                      className="rt-chain"
                    >
                      <span className="orange-txt fw-bold">MAX</span>
                    </button>
                  </div>
                  {errors.balance && touched.balance ? (
                    <p className="primary-text error">{errors.balance}</p>
                  ) : null}

                  <p className="inpt_fld_hlpr_txt mt-3 text-pop-right d-flex flex-wrap">
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
                      Balance: {Number(router.query.id).toFixed(tokenDecimal)}{" "}
                      BONE
                    </span>
                  </p>
                  <div className="image_area row">
                    <div className="col-12 text-center">
                      <img
                        className="img-fluid img-wdth"
                        src="../../assets/images/imgpsh_fullsize_anim.png"
                      />
                    </div>
                  </div>
                  <p>
                    Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum{" "}
                  </p>
                </div>
                <div className="ax-bottom">
                  <div className="pop_btns_area row form-control mt-5">
                    <div className="col-12">
                      <button className="w-100" type="submit" value="submit">
                        <div className="btn primary-btn d-flex align-items-center justify-content-center">
                          <span>Continue</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      </CommonModal>
    </>
  );
};

export default MigratePopup;

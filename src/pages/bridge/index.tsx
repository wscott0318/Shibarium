/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from "react";
import { ChainId } from "shibarium-get-chains";
import { useRouter } from "next/router";
import InnerHeader from "../inner-header";
import Link from "next/link";
import Sidebar from "../layout/sidebar";
import { useActiveWeb3React } from "../../services/web3";
import {
  BONE_ID,
  GOERLI_CHAIN_ID,
  PUPPYNET_CHAIN_ID,
} from "../../config/constant";
import { Formik } from "formik";
import * as Yup from "yup";
import { getBoneUSDValue, tokenDecimal } from "web3/commonFunctions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Sentry from "@sentry/nextjs";
import { NETWORK_ICON, NETWORK_LABEL } from "../../config/networks";
import ManageToken from "../components/ManageToken";
import WithdrawModal from "pages/components/withdraw/Withdraw";
import { L1Block, PUPPYNET517 } from "app/hooks/L1Block";
import { ERC20_ABI } from "app/constants/abis/erc20";
import Deposit from "pages/components/deposit/Deposit";
import Loader from "app/components/Loader";

export default function Withdraw() {
  const { chainId = 1, account } = useActiveWeb3React();
  const web3L2 = PUPPYNET517();
  const web3 = L1Block();
  const bridgeType: string = localStorage.getItem("bridgeType") || "deposit";
  const [menuState, setMenuState] = useState(false);
  const [selectedToken, setSelectedToken] = useState(
    JSON.parse(localStorage.getItem("depositToken") || "{}")
  );
  const [showDepositModal, setDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositTokenInput, setDepositTokenInput] = useState("");
  const [withdrawTokenInput, setWithdrawTokenInput] = useState("");
  const [dWState, setDWState] = useState(
    bridgeType === "deposit" ? true : false
  );
  const [loader, setLoader] = useState(false);
  const [tokenBalanceL2, setTokenBalanceL2] = useState(0);
  const [boneUSDValue, setBoneUSDValue] = useState(0);
  const [hashLink, setHashLink] = useState("");
  const [openManageToken, setOpenManageToken] = useState(false);
  const handleMenuState = () => {
    setMenuState(!menuState);
  };
  const router = useRouter();
  useEffect(() => {
    getBoneUSDValue().then((res: any) => {
      setBoneUSDValue(res);
    });
  }, [account]);
  const depositValidations: any = Yup.object({
    fromChain: Yup.number().required("Required Field"),
    toChain: Yup.number().required("Required Field"),
    amount: Yup.number()
      .typeError("Only digits are allowed.")
      .min(0.001, "Invalid Amount.")
      .max(selectedToken?.balance, "Insufficient Balance")
      .required("Amount is required."),
  });
  const withdrawValidations: any = Yup.object({
    fromChain: Yup.number().required("Required Field"),
    toChain: Yup.number(),
    withdrawAmount: Yup.number()
      .typeError("Only digits are allowed.")
      .min(0.001, "Invalid Amount.")
      .max(tokenBalanceL2, "Insufficient Balance")
      .required("Amount is required."),
  });
  const callDepositModal = (values: any, resetForm: any) => {
    try {
      setDepositTokenInput(values.amount);
      setDepositModal(true);
    } catch (err: any) {
      Sentry.captureMessage("callDepositModal", err);
    }
  };
  const callWithdrawModal = (values: any, resetForm: any) => {
    try {
      setWithdrawTokenInput(values.withdrawAmount);
      setShowWithdrawModal(true);
    } catch (err: any) {
      Sentry.captureMessage("callWithdrawModal", err);
    }
  };

  useEffect(() => {
    if (Object.keys(selectedToken).length) {
      setLoader(true);
      depositChainTokenBalance();
    }
  }, [selectedToken]);
  const depositChainTokenBalance = async () => {
    if (Object.keys(selectedToken).length) {
      let address: any;
      let bal: any;
      let contract: any;
      if (chainId === GOERLI_CHAIN_ID) {
        address = selectedToken?.childContract || selectedToken?.address;
        contract = new web3L2.eth.Contract(ERC20_ABI, address);
        console.log("get l2 balance  => ", address);
      } else {
        address = selectedToken?.parentContract || selectedToken?.address;
        contract = new web3.eth.Contract(ERC20_ABI, address);
        console.log("get l1 balance  => ", address, contract);
      }
      await contract.methods
        .balanceOf(account)
        .call()
        .then(async (res: any) => {
          await contract.methods
            .decimals()
            .call()
            .then((d: number) => {
              console.log("l2 balance  => ", res, d);
              bal = +(+res / Math.pow(10, d)).toFixed(tokenDecimal);
              setLoader(false);
            });
        });
      setTokenBalanceL2(bal);
    }
  };

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src =
      chainId == GOERLI_CHAIN_ID
        ? "../../assets/images/eth_logo.png"
        : "../../assets/images/shib-borderd-icon.png";
    event.currentTarget.className = "error me-3";
  };

  const handleClickOutside = useCallback(() => setMenuState(false), []);

  return (
    <>
      <ToastContainer />
      <main className="main-content">
        <Sidebar
          handleMenuState={handleMenuState}
          onClickOutside={handleClickOutside}
          menuState={menuState}
        ></Sidebar>
        {/* modal code start */}
        {/* Deposit popup start */}
        {showDepositModal ? (
          <Deposit
            {...{
              depositTokenInput,
              boneUSDValue,
              showDepositModal,
              setDepositModal,
              dWState,
              selectedToken,
              hashLink,
              setHashLink,
            }}
          />
        ) : null}

        {/* Deposit popup end */}

        {/* Withdraw popups start */}
        {showWithdrawModal ? (
          <WithdrawModal
            page="bridge"
            show={showWithdrawModal}
            dWState={dWState}
            setWithdrawModalOpen={setShowWithdrawModal}
            selectedToken={selectedToken}
            withdrawTokenInput={withdrawTokenInput}
            boneUSDValue={boneUSDValue}
          />
        ) : null}
        {/* Withdraw tab popups end */}

        {/* Token popups start */}
        {openManageToken ? (
          <ManageToken
            setSelectedToken={setSelectedToken}
            setOpenManageToken={setOpenManageToken}
            setLoader={setLoader}
          />
        ) : null}
        {/* Token popups end */}

        {/* modal code closed */}
        <section className="assets-section">
          <div className="cmn_dashbord_main_outr">
            <InnerHeader />
            {/* withdraw main section start */}
            <div className="box-wrap">
              {/* Left section start */}
              <div className="left-box">
                <div className="block-card">
                  <div className="box-top">
                    <h3 className="mb-3">Shibarium Bridge</h3>
                    {dWState ? (
                      <div className="txt-row">
                        <div className="row-hd">Transfer Overview:</div>
                        <p className="row-description">
                          The deposit process consists of a single transaction.
                        </p>
                      </div>
                    ) : (
                      <div className="txt-row">
                        <div className="row-hd">Withdraw Overview:</div>
                        <p className="row-description">
                          The Withdraw process consists of three transactions.
                        </p>
                      </div>
                    )}
                    {dWState ? (
                      <div className="txt-row">
                        <div className="row-hd">Transfer Time:</div>
                        <p className="row-description">
                          Moving your funds from Ethereum to Shibarium take up
                          to 10 - 15 Minutes.
                        </p>
                      </div>
                    ) : (
                      <div className="txt-row">
                        <div className="row-hd">Withdraw Time:</div>
                        <p className="row-description">
                          Moving your funds from Ethereum to Shibarium take up
                          to 60 mins to 3 hours.
                        </p>
                      </div>
                    )}
                    {
                      <div
                        className={`txt-row ${
                          dWState ? "visVisible" : "visInvisible"
                        }`}
                      >
                        <div className="row-hd">
                          <span className="icon-image">
                            <img
                              className="img-fluid"
                              src="../../assets/images/i-info-icon.png"
                              alt=""
                              onError={imageOnErrorHandler}
                            />
                          </span>
                          <span className="alignment">
                            Delegation/Staking Advice:
                          </span>
                        </div>
                        <p className="row-description">
                          Delegation/Staking takes place on Ethereum. Do not
                          deposit funds to Shibarium for this purpose.{" "}
                        </p>
                      </div>
                    }
                  </div>
                  <div className="blank-box"></div>
                  <div className="box-bottom d-flex flex-column justify-content-end">
                    <div className="sub-buttons-sec row buttons-fix">
                      <div className="mb-3 col-lg-6 mb-lg-0">
                        <Link href="how-it-works" passHref>
                          <a target="_blank" className="btn white-btn w-100">
                            How Shibarium Works
                          </a>
                        </Link>
                      </div>
                      <div className="col-lg-6">
                        <button
                          onClick={() => router.push("/faq")}
                          className="btn white-btn w-100"
                        >
                          FAQs
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Left section end */}
              {/* Right section start */}

              <div className="right-box">
                <div className="block-card d-flex flex-column justify-content-between bridge_form_sec">
                  <div className="tab-sec botom-spcing">
                    <ul className="tab-links">
                      <li>
                        <a
                          className={`tb-link ${dWState && "tab-active"}`}
                          onClick={() => setDWState(true)}
                        >
                          Deposit
                        </a>
                      </li>
                      <li>
                        <a
                          className={`tb-link ${!dWState && "tab-active"}`}
                          onClick={() => setDWState(false)}
                        >
                          Withdraw
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* Deposit tab content section start */}
                  {dWState && (
                    <div className="tab-content-sec h-100">
                      <Formik
                        initialValues={{
                          amount: "",
                          fromChain: chainId,
                          toChain:
                            chainId == GOERLI_CHAIN_ID
                              ? PUPPYNET_CHAIN_ID
                              : GOERLI_CHAIN_ID,
                        }}
                        validationSchema={depositValidations}
                        onSubmit={(values, { resetForm }) => {
                          callDepositModal(values, resetForm);
                        }}
                      >
                        {({
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          values,
                          handleSubmit,
                          setFieldValue,
                        }) => (
                          <div className="h-100">
                            <div className="sec-wrapper">
                              <div className="wrap-top">
                                <div className="botom-spcing">
                                  <div>
                                    <label className="mb-2 mb-xxl-3 mb-md-2">
                                      From
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div className="network_Icon_Wrapper">
                                          {/* {selectedToken?.logo ||
                                          selectedToken?.logoURI ? (
                                            <img
                                              width="22"
                                              height="22"
                                              className="img-fluid"
                                              src={
                                                selectedToken?.logo
                                                  ? selectedToken?.logo
                                                  : selectedToken?.logoURI
                                              }
                                              alt=""
                                              onError={imageOnErrorHandler}
                                            />
                                          ) : ( */}
                                          <img
                                            className="img-fluid w-100"
                                            src={
                                              chainId == GOERLI_CHAIN_ID
                                                ? NETWORK_ICON[GOERLI_CHAIN_ID]
                                                : NETWORK_ICON[
                                                    PUPPYNET_CHAIN_ID
                                                  ]
                                              // ? "../../assets/images/eth_logo.png"
                                              // : "../../assets/images/shib-borderd-icon.png"
                                            }
                                            // src={
                                            //   NETWORK_ICON[
                                            //     chainId == GOERLI_CHAIN_ID
                                            //       ? PUPPYNET_CHAIN_ID
                                            //       : GOERLI_CHAIN_ID
                                            //   ]
                                            // }
                                            alt=""
                                            onError={imageOnErrorHandler}
                                          />
                                        </div>
                                      </div>
                                      <div className="mid-chain">
                                        <input
                                          className="w-100"
                                          type="text"
                                          value={NETWORK_LABEL[chainId]}
                                          disabled={true}
                                          // placeholder="Ethereum chain"
                                        />
                                      </div>
                                      <div className="rt-chain d-flex align-items-center">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        {loader && !selectedToken?.balance ? (
                                          <Loader stroke="orange" />
                                        ) : (
                                          <span className="fld-txt lite-800 wrap_txt">
                                            {selectedToken?.balance
                                              ? selectedToken?.balance
                                              : "00.00"}{" "}
                                            {selectedToken?.key ||
                                              selectedToken?.symbol}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="field-grid row">
                                    <div className="mb-3 col-lg-6 col-xxl-5 col-sm-12 mb-sm-3 mb-lg-0 res-align">
                                      <div
                                        className={`form-field position-relative fix-coin-field 
                                       
                                            `}
                                        onClick={() => {
                                          // if (chainId !== PUPPYNET_CHAIN_ID) {
                                          setOpenManageToken(!openManageToken);
                                          setTokenBalanceL2(0);
                                          setSelectedToken({});
                                          // }
                                        }}
                                      >
                                        <div className="right-spacing">
                                          <div>
                                            <img
                                              className="img-fluid"
                                              width={24}
                                              src={
                                                selectedToken?.logo ||
                                                selectedToken?.logoURI
                                                  ? selectedToken.logo ||
                                                    selectedToken?.logoURI
                                                  : "../../assets/images/eth_logo.png"
                                              }
                                              onError={imageOnErrorHandler}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="lite-800 w-100">
                                          <span className="lite-800 fw-bold wrap_selected_token">
                                            {selectedToken?.key
                                              ? selectedToken?.key
                                              : "Select Token"}
                                          </span>
                                        </div>
                                        <div className="lft-spc">
                                          <div className="arow-outer">
                                            <span className="arrow-down"></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-xxl-7 col-sm-12 field-col">
                                      <div className="form-field position-relative two-fld">
                                        <div
                                          className={`mid-chain w-100 ${
                                            selectedToken?.type == undefined &&
                                            "disabled"
                                          }`}
                                        >
                                          <input
                                            className={`w-100 ${
                                              selectedToken?.type ==
                                                undefined && "disabled"
                                            }`}
                                            type="text"
                                            placeholder="0.00"
                                            name="amount"
                                            disabled={
                                              selectedToken?.type == undefined
                                                ? true
                                                : false
                                            }
                                            value={values.amount}
                                            onChange={handleChange("amount")}
                                          />
                                        </div>
                                        <div
                                          className="rt-chain"
                                          onClick={(e) =>
                                            setFieldValue(
                                              "amount",
                                              selectedToken.balance
                                            )
                                          }
                                        >
                                          <span className="orange-txt fw-bold depositMax">
                                            MAX
                                          </span>
                                        </div>
                                      </div>
                                      {touched.amount && errors.amount ? (
                                        <p className="pt-0 pl-2 primary-text">
                                          {errors.amount}
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="botom-spcing">
                                  <div>
                                    <label className="mb-2 mb-xxl-3 mb-md-2 d-flex justify-content-between">
                                      To
                                      {selectedToken?.key && values.amount ? (
                                        <span className="grey-txts">
                                          You will receive {values.amount}{" "}
                                          {selectedToken.key} on the Puppy Net
                                          Chain.
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div className="network_Icon_Wrapper">
                                          <img
                                            className="img-fluid w-100"
                                            // src={
                                            //   NETWORK_ICON[
                                            //     chainId == GOERLI_CHAIN_ID
                                            //       ? PUPPYNET_CHAIN_ID
                                            //       : GOERLI_CHAIN_ID
                                            //   ]
                                            // }
                                            src={
                                              chainId == GOERLI_CHAIN_ID
                                                ? "../../assets/images/shib-borderd-icon.png"
                                                : "../../assets/images/eth_logo.png"
                                            }
                                            onError={imageOnErrorHandler}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <div className="mid-chain">
                                        <input
                                          className="w-100"
                                          type="text"
                                          disabled={true}
                                          placeholder="Shibarium chain"
                                          value={
                                            NETWORK_LABEL[
                                              chainId == GOERLI_CHAIN_ID
                                                ? PUPPYNET_CHAIN_ID
                                                : GOERLI_CHAIN_ID
                                            ]
                                          }
                                        />
                                      </div>
                                      <div className="rt-chain d-flex align-items-center">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        {loader ? (
                                          <Loader stroke="orange" />
                                        ) : (
                                          <span className="fld-txt lite-800 wrap_txt">
                                            {tokenBalanceL2
                                              ? tokenBalanceL2
                                              : "00.00"}{" "}
                                            {selectedToken?.key ||
                                              selectedToken?.symbol}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="wrap-bottom">
                                <div className="btn-modify">
                                  <button
                                    onClick={() => {
                                      handleSubmit();
                                    }}
                                    disabled={chainId == PUPPYNET_CHAIN_ID}
                                    type="button"
                                    className="btn primary-btn w-100"
                                  >
                                    Transfer
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Formik>
                    </div>
                  )}
                  {/* Deposit tab content section end */}

                  {/* Withdraw tab content section start */}
                  {!dWState && (
                    <Formik
                      validationSchema={withdrawValidations}
                      initialValues={{
                        withdrawAmount: "",
                        fromChain:
                          chainId == GOERLI_CHAIN_ID
                            ? PUPPYNET_CHAIN_ID
                            : GOERLI_CHAIN_ID,
                        toChain: chainId,
                      }}
                      onSubmit={(values, { resetForm }) => {
                        callWithdrawModal(values, resetForm);
                        // resetForm();
                        // setFieldValue("withdrawAmount", "0.00");
                      }}
                    >
                      {({
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        values,
                        handleSubmit,
                        setFieldValue,
                      }) => (
                        <div className="tab-content-sec h-100">
                          <form className="h-100" onSubmit={handleSubmit}>
                            <div className="sec-wrapper">
                              <div className="wrap-top">
                                <div className="botom-spcing">
                                  <div>
                                    <label className="mb-2 mb-xxl-3 mb-md-2">
                                      From
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div className="network_Icon_Wrapper">
                                          <img
                                            className="img-fluid w-100"
                                            // src={
                                            //   NETWORK_ICON[
                                            //     chainId == GOERLI_CHAIN_ID
                                            //       ? PUPPYNET_CHAIN_ID
                                            //       : GOERLI_CHAIN_ID
                                            //   ]
                                            // }
                                            src={
                                              chainId == GOERLI_CHAIN_ID
                                                ? "../../assets/images/shib-borderd-icon.png"
                                                : "../../assets/images/eth_logo.png"
                                            }
                                            onError={imageOnErrorHandler}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <div className="mid-chain">
                                        <input
                                          className="w-100"
                                          type="text"
                                          // placeholder="Shibarium Mainnet"
                                          value={
                                            NETWORK_LABEL[
                                              chainId == GOERLI_CHAIN_ID
                                                ? PUPPYNET_CHAIN_ID
                                                : GOERLI_CHAIN_ID
                                            ]
                                          }
                                          disabled={true}
                                        />
                                      </div>
                                      <div className="rt-chain d-flex align-items-center">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        {loader ? (
                                          <Loader stroke="orange" />
                                        ) : (
                                          <span className="fld-txt lite-800 wrap_txt">
                                            {tokenBalanceL2
                                              ? tokenBalanceL2
                                              : "00.00"}{" "}
                                            {selectedToken?.key ||
                                              selectedToken?.symbol}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="field-grid row">
                                    <div className="mb-3 col-lg-6 col-xxl-5 col-sm-12 mb-sm-3 mb-lg-0 res-align">
                                      <div
                                        className="form-field position-relative fix-coin-field h-100"
                                        onClick={() => {
                                          setOpenManageToken(!openManageToken);
                                          // setLoader(true);
                                          setTokenBalanceL2(0);
                                          setSelectedToken({});
                                        }}
                                      >
                                        <div className="right-spacing">
                                          <div>
                                            <img
                                              width="24"
                                              height="24"
                                              className="img-fluid"
                                              src={
                                                selectedToken?.logo ||
                                                selectedToken?.logoURI
                                                  ? selectedToken?.logo ||
                                                    selectedToken?.logoURI
                                                  : "../../assets/images/shiba-round-icon.png"
                                              }
                                              onError={imageOnErrorHandler}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="lite-800 w-100">
                                          <span className="lite-800 fw-bold  wrap_selected_token">
                                            {selectedToken?.key
                                              ? selectedToken?.key
                                              : "Select Token"}
                                          </span>
                                        </div>
                                        <div className="lft-spc">
                                          <div className="arow-outer">
                                            <span className="arrow-down"></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-xxl-7 col-sm-12 field-col h-100">
                                      <div className="form-field position-relative two-fld">
                                        <div className="mid-chain w-100">
                                          <input
                                            className="w-100"
                                            type="text"
                                            placeholder="0.00"
                                            name="withdrawAmount"
                                            disabled={
                                              selectedToken?.type == undefined
                                                ? true
                                                : false
                                            }
                                            value={values.withdrawAmount}
                                            onChange={handleChange(
                                              "withdrawAmount"
                                            )}
                                          />
                                        </div>
                                        <div
                                          className="rt-chain"
                                          onClick={(e) =>
                                            setFieldValue(
                                              "withdrawAmount",
                                              tokenBalanceL2
                                            )
                                          }
                                        >
                                          <span className="orange-txt fw-bold withdrawMax">
                                            MAX
                                          </span>
                                        </div>
                                      </div>
                                      {/* {touched.withdrawAmount &&
                                        errors.withdrawAmount ? (
                                        <p className="pt-0 pl-2 primary-text">
                                          {errors.withdrawAmount}
                                        </p>
                                      ) : null} */}
                                      {touched.withdrawAmount &&
                                      errors.withdrawAmount ? (
                                        <p className="pt-0 pl-2 primary-text">
                                          {errors.withdrawAmount}
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="botom-spcing">
                                  <div>
                                    <label className="mb-2 mb-xxl-3 mb-md-2 d-flex justify-content-between">
                                      To
                                      {selectedToken?.key &&
                                      values.withdrawAmount ? (
                                        <span className="grey-txts">
                                          You will receive{" "}
                                          {values.withdrawAmount}{" "}
                                          {selectedToken.key} on the Goerli Chain
                                          Chain.
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div className="network_Icon_Wrapper">
                                          {/* {selectedToken?.logo ||
                                          selectedToken?.logoURI ? (
                                            <img
                                              width="22"
                                              height="22"
                                              className="img-fluid"
                                              src={
                                                selectedToken.logo ||
                                                selectedToken?.logoURI
                                              }
                                              alt=""
                                              onError={imageOnErrorHandler}
                                            />
                                          ) : ( */}
                                          <img
                                            className="img-fluid w-100"
                                            // src={
                                            //   NETWORK_ICON[
                                            //     chainId == GOERLI_CHAIN_ID
                                            //       ? PUPPYNET_CHAIN_ID
                                            //       : GOERLI_CHAIN_ID
                                            //   ]
                                            // }
                                            src={
                                              chainId == GOERLI_CHAIN_ID
                                                ? "../../assets/images/eth_logo.png"
                                                : "../../assets/images/shib-borderd-icon.png"
                                            }
                                            alt=""
                                            onError={imageOnErrorHandler}
                                          />
                                          {/* )} */}
                                        </div>
                                      </div>
                                      <div className="mid-chain">
                                        <input
                                          className="w-100"
                                          type="text"
                                          value={NETWORK_LABEL[chainId]}
                                          disabled={true}
                                        />
                                      </div>
                                      <div className="rt-chain d-flex align-items-center">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        {loader && !selectedToken?.balance ? (
                                          <Loader stroke="orange" />
                                        ) : (
                                          <span className="fld-txt lite-800 wrap_txt">
                                            {selectedToken?.balance
                                              ? selectedToken?.balance
                                              : "00.00"}{" "}
                                            {selectedToken?.key ||
                                              selectedToken?.symbol}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="wrap-bottom">
                                <div className="btn-modify">
                                  <button
                                    onClick={() => handleSubmit()}
                                    type="submit"
                                    className="btn primary-btn w-100"
                                  >
                                    Transfer
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                    </Formik>
                  )}

                  {/* Withdraw   tab content section end */}
                </div>
              </div>
              {/* right section start */}
            </div>
            {/* withdraw main section end */}
          </div>
        </section>
      </main>
    </>
  );
}

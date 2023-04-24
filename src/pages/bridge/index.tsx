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
import { BONE_ID } from "../../config/constant";
import { Formik } from "formik";
import * as Yup from "yup";
import { getBoneUSDValue, tokenDecimal } from "web3/commonFunctions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Sentry from "@sentry/nextjs";
import { NETWORK_ICON, NETWORK_LABEL } from "../../config/networks";
import ManageToken from "../components/ManageToken"
import WithdrawModal from "pages/components/withdraw/Withdraw";
import { L1Block, PUPPYNET517 } from "app/hooks/L1Block";
import { ERC20_ABI } from "app/constants/abis/erc20";
import Deposit from "pages/components/deposit/Deposit";
import Loader from "app/components/Loader";
import Comingsoon from "app/components/coming-soon";

export default function Withdraw() {
  const { chainId = 1, account } = useActiveWeb3React();
  const web3L2 = PUPPYNET517();
  const web3 = L1Block();
  const bridgeType: string = localStorage.getItem("bridgeType") || "deposit";
  const [menuState, setMenuState] = useState(false);
  const [selectedToken, setSelectedToken] = useState(
    JSON.parse(localStorage.getItem("depositToken") || "{}"),
  );
  const [showDepositModal, setDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositTokenInput, setDepositTokenInput] = useState("");
  const [withdrawTokenInput, setWithdrawTokenInput] = useState("");
  const [dWState, setDWState] = useState(
    bridgeType === "deposit" ? true : false,
  );
  const [loader, setLoader] = useState(false);
  const [tokenBalanceL2, setTokenBalanceL2] = useState(0);
  const [boneUSDValue, setBoneUSDValue] = useState(0);
  const [hashLink, setHashLink] = useState("");
  const [openManageToken, setOpenManageToken] = useState(false)
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
    fromChain: Yup.number(),
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
      resetForm();
    } catch (err: any) {
      Sentry.captureMessage("callDepositModal", err);
    }
  };
  const callWithdrawModal = (values: any) => {
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
      // console.log("selected token" , selectedToken, chainId)
      if (chainId === ChainId.GÖRLI) {
        address = selectedToken?.childContract || selectedToken?.address;
        contract = new web3L2.eth.Contract(ERC20_ABI, address);
        console.log("get l2 balance  => ", chainId)
      }
      else {
        address = selectedToken?.parentContract || selectedToken?.address;
        contract = new web3.eth.Contract(ERC20_ABI, address);
        console.log("get l1 balance  => ", address, contract)
      }
      await contract.methods
        .balanceOf(account)
        .call()
        .then(async (res: any) => {
          await contract.methods
            .decimals()
            .call()
            .then((d: number) => {
              bal = +(+res / Math.pow(10, d)).toFixed(tokenDecimal);
              console.log("l2 balance  => ", bal)
              setLoader(false);
            });
        }).catch((err:any) => console.log("error fetching token bal" , err));
      setTokenBalanceL2(bal);
    }
  }
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
    event.currentTarget.className = "error me-3";
  };

  const handleClickOutside = useCallback(() => setMenuState(false), [])

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
        {showDepositModal ?
          <Deposit
            {...{
              depositTokenInput,
              boneUSDValue,
              showDepositModal,
              setDepositModal,
              dWState,
              selectedToken,
              hashLink,
              setHashLink
            }}
          /> :
          null}

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
           <Comingsoon/>
            {/* withdraw main section end */}
          </div>
        </section>
      </main>
    </>
  );
}

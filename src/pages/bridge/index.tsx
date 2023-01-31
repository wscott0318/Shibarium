/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from "react";
import { ChainId } from "shibarium-get-chains";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import CommonModal from "../components/CommonModel";
import InnerHeader from "../inner-header";
import Link from "next/link";
import Sidebar from "../layout/sidebar";
import {
  getWalletTokenList,
  getBoneUSDValue,
} from "../../services/apis/validator/index";
import { getTokenBalance } from "../../hooks/useTokenBalance";
import { useActiveWeb3React } from "../../services/web3";
import { BONE_ID } from "../../config/constant";
import { Formik } from "formik";
import * as Yup from "yup";
import depositManagerABI from "../../ABI/depositManagerABI.json";
import Web3 from "web3";
import {
  addTransaction,
  finalizeTransaction,
} from "app/state/transactions/actions";
import { useAppDispatch } from "../../state/hooks";
import fromExponential from "from-exponential";
import { getExplorerLink } from "app/functions";
import {
  currentGasPrice,
  getAllowanceAmount,
  USER_REJECTED_TX,
  tokenDecimal,
} from "web3/commonFunctions";
import ERC20 from "../../ABI/ERC20Abi.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addTokenAbi from "../../ABI/custom-token-abi.json";
import * as Sentry from "@sentry/nextjs";
import { NETWORK_ICON, NETWORK_LABEL } from "../../config/networks";
import { dynamicChaining } from "web3/DynamicChaining";
import ManageToken from "../components/ManageToken";
import { X, Check } from "react-feather";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import WithdrawModal from "pages/components/Withdraw";
import useLocalStorageState from "use-local-storage-state";

export default function Withdraw() {
  const { chainId = 1, account, library } = useActiveWeb3React();
  const lib: any = library;
  const web3: any = new Web3(lib?.provider);
  const dispatch = useAppDispatch();
  const [bridgeType] = useLocalStorageState('bridgeType')
  const [menuState, setMenuState] = useState(false);
  const [selectedToken, setSelectedToken] = useState(
    JSON.parse(localStorage.getItem("depositToken") || "{}"),
  );
  const [showDepositModal, setDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const showTokenModal = false;
  const [depositTokenInput, setDepositTokenInput] = useState("");
  const [withdrawTokenInput, setWithdrawTokenInput] = useState("");
  const [allowance, setAllowance] = useState<any>(0);
  const [dWState, setDWState] = useState(
    bridgeType === "deposit" ? true : false,
  );
  const [boneUSDValue, setBoneUSDValue] = useState(0);
  const [hashLink, setHashLink] = useState("");
  const [newToken, addNewToken] = useState("");
  const [estGas, setEstGas] = useState<any>(0);
  const [openManageToken, setOpenManageToken] = useState(false);
  const handleMenuState = useCallback(()=>{setMenuState(!menuState)},[])
  
  const router = useRouter();
  useEffect(() => {
    getBoneUSDValue(BONE_ID).then((res) => {
      setBoneUSDValue(res.data.data.price);
    });
  }, [account]);
  const [depModalState, setDepModState] = useState({
    step0: true,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    title: "Please Note",
  });
  const [tokenState, setTokenState] = useState({
    step0: true,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    title: "Select a Token",
  });
  const [tokenModalList, setTokenModalList] = useState<any>([]);
  const localTokens = useLocalStorageState('newToken')
  

  const [tempTokens, setTempTokens] = useState<any>({
    parentContract: "",
    childContract: "",
    parentName: "",
    parentSymbol: "",
    symbol: "",
    key: "",
    logoURI: "",
  });
  const getTokensList = async () => {
    try {
      await getWalletTokenList().then((res) => {
        let list = res.data.message.tokens;
        list.forEach(async (x: any) => {
          if (x.parentName === "BoneToken") {
            x.balance = await getTokenBalance(
              lib,
              account,
              dynamicChaining[chainId].BONE,
            );
          } else {
            x.balance = await getTokenBalance(lib, account, x.parentContract);
          }
        });
        setTokenModalList([...localTokens, ...list]);
      });
    } catch (err: any) {
      Sentry.captureMessage("getTokensList", err);
    }
  };
  useEffect(() => {
    if (account) {
      getTokensList();
    } else {
      router.push("/");
    }
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
      .max(selectedToken?.balance, "Insufficient Balance")
      .required("Amount is required."),
  });

  const approvalForDeposit = async (amount: any, token: any, contract: any) => {
    try {
      let user: any = account;
      const amountWei = web3.utils.toBN(
        fromExponential(1000 * Math.pow(10, 18)),
      );
      let instance = new web3.eth.Contract(ERC20, token);
      await instance.methods
        .approve(contract, amountWei)
        .send({ from: user })
        .on("transactionHash", (res: any) => {
          dispatch(
            addTransaction({
              hash: res,
              from: user,
              chainId,
              summary: `${res}`,
            }),
          );

          setAllowance(0);
        })
        .on("receipt", (res: any) => {
          // console.log(res, "receipt")
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
            }),
          );
        })
        .on("error", (res: any) => {
          if (res.code === 4001) {
            setDepModState({
              step0: true,
              step1: false,
              step2: false,
              step3: false,
              step4: false,
              title: "Please Note",
            });
            setDepositModal(false);
          }
        });
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureMessage("approvalForDeposit", err);
      }
      setDepModState({
        step0: true,
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        title: "Please Note",
      });
      setDepositModal(false);
    }
  };

  const callDepositModal = (values: any, resetForm: any) => {
    try {
      setDepositTokenInput(values.amount);
      {
        setDepModState({
          step0: true,
          step1: false,
          step2: false,
          step3: false,
          step4: false,
          title: "Please Note",
        });
        setDepositModal(true);
        resetForm();
      }
    } catch (err: any) {
      Sentry.captureMessage("callDepositModal", err);
    }
  };
  const callWithdrawModal = (values: any) => {
    try {
      setWithdrawTokenInput(values.withdrawAmount);
      console.log("withdraw values =>  ", values, showWithdrawModal);
      {
        setShowWithdrawModal(true);
      }
    } catch (err: any) {
      console.log("callWithdrawModal err", err);
      Sentry.captureMessage("callWithdrawModal", err);
    }
  };
  const estGasFee = async () => {
    setEstGas(0);
    let user: any = account;
    const amountWei = web3.utils.toBN(
      fromExponential(+depositTokenInput * Math.pow(10, 18)),
    );
    let currentprice: any = await currentGasPrice(web3);
    let allowance =
      (await getAllowanceAmount(
        library,
        dynamicChaining[chainId].BONE,
        account,
        dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY,
      )) || 0;
    console.log("allowance  ", allowance);
    if (+allowance < +depositTokenInput) {
      let approvalInstance = new web3.eth.Contract(
        ERC20,
        dynamicChaining[chainId].BONE,
      );
      await approvalInstance.methods
        .approve(dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY, amountWei)
        .estimateGas({ from: user })
        .then((gas: any) => {
          setAllowance(+(+gas * +currentprice) / Math.pow(10, 18));
        });
    }
    let instance = new web3.eth.Contract(
      depositManagerABI,
      dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY,
    );

    await instance.methods
      .depositERC20ForUser(dynamicChaining[chainId].BONE, user, amountWei)
      .estimateGas({ from: user })
      .then(async (gas: any) => {
        let gasFee = (+gas * +currentprice) / Math.pow(10, 18);
        setEstGas(+gasFee);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  console.log("est gas ", estGas);

  const depositContract = async (user: any, amount: any) => {
    // call deposit contract
    let instance = new web3.eth.Contract(
      depositManagerABI,
      dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY,
    );
    instance.methods
      .depositERC20ForUser(dynamicChaining[chainId].BONE, user, amount)
      .send({ from: account })
      .on("transactionHash", (res: any) => {
        dispatch(
          addTransaction({
            hash: res,
            from: user,
            chainId,
            summary: `${res}`,
          }),
        );
        let link = getExplorerLink(chainId, res, "transaction");
        setHashLink(link);
        setDepModState({
          step0: false,
          step1: false,
          step2: false,
          step3: false,
          step4: true,
          title: "Transaction Submitted",
        });
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
          }),
        );
        setDepositModal(false);
      })
      .on("error", (res: any) => {
        if (res.code === 4001) {
          setDepModState({
            step0: true,
            step1: false,
            step2: false,
            step3: false,
            step4: false,
            title: "Please Note",
          });
          setDepositModal(false);
        }
      });
  };
  const callDepositContract = async () => {
    try {
      if (account) {
        setDepModState({
          step0: false,
          step1: false,
          step2: false,
          step3: true,
          step4: false,
          title: "Transfer in Progress",
        });
        let user: any = account;
        const amountWei = web3.utils.toBN(
          fromExponential(+depositTokenInput * Math.pow(10, 18)),
        );
        let allowance =
          (await getAllowanceAmount(
            library,
            dynamicChaining[chainId].BONE,
            account,
            dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY,
          )) || 0;

        if (+depositTokenInput > +allowance) {
          approvalForDeposit(
            amountWei,
            dynamicChaining[chainId].BONE,
            dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY,
          );
        }
        depositContract(user, amountWei);
      }
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureMessage("callDepositContract", err);
      }
      setDepModState({
        step0: true,
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        title: "Please Note",
      });
      setDepositModal(false);
    }
  };

  useEffect(() => {
    if (!showTokenModal) {
      addNewToken("");
    }
  }, [showTokenModal]);
  useEffect(() => {
    const isValidAddress = web3.utils.isAddress(String(newToken));
    try {
      if (tokenState.step2 && isValidAddress) {
        toast.success("Address is valid", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600,
        });
        setTokenState({
          step0: false,
          step1: false,
          step2: false,
          step3: true,
          step4: false,
          title: "Manage Token",
        });
      } else if (!isValidAddress && newToken.length > 0) {
        toast.error("Address is Invalid", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600,
        });
        setTokenState({
          step0: false,
          step1: false,
          step2: true,
          step3: false,
          step4: false,
          title: "Manage Token",
        });
      }
      if (tokenState.step4 && isValidAddress) {
        toast.success("Address is valid", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600,
        });
        setTokenState({
          step0: false,
          step1: false,
          step2: false,
          step3: true,
          step4: false,
          title: "Manage Token",
        });
      }
      // code below is to check whether tokens are already present or not
      const checkArray = tokenModalList.map((st: any) => st?.parentContract);
      let localtokenarray = localTokens.map((st: any) => st.parentContract);
      const isalreadypresent = checkArray.some((item: any) =>
        localtokenarray.includes(newToken),
      );
      if (isalreadypresent && newToken.length > 0) {
        toast.error("Address is already present", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      }
    } catch (err: any) {
      Sentry.captureMessage("useEffect on line 449 in bridge > backup", err);
    }
  }, [newToken]);

  useEffect(() => {
    try {
      if (showTokenModal) {
        localStorage.setItem("newToken", JSON.stringify(localTokens));
        let uniqueObjArray = [
          ...new Map(
            localTokens.map((item: any) => [item["parentContract"], item]),
          ).values(),
        ];
        let uniqueObjArray2 = [
          ...new Map(
            tokenModalList.map((item: any) => [item["parentContract"], item]),
          ).values(),
        ];
        let combineArray = [...uniqueObjArray, ...uniqueObjArray2];
        let finalUniqueArray = [
          ...new Map(
            combineArray.map((item: any) => [item["parentContract"], item]),
          ).values(),
        ];
        setTokenModalList(finalUniqueArray);
      }
    } catch (err: any) {
      Sentry.captureMessage("UseEffect line 512 in bridge backup ", err);
    }
  }, [localTokens]);

  useEffect(() => {
    try {
      if (tokenModalList.length > 0) {
        let updatedArray = [...tokenModalList, ...localTokens];
        setTokenModalList(updatedArray);
      }
    } catch (err: any) {
      Sentry.captureMessage("UseEffect line 540", err);
    }
  }, []);

  const getTempTokens = async () => {
    try {
      const isValidAddress = web3.utils.isAddress(String(newToken));

      if (
        isValidAddress &&
        account &&
        (tokenState.step2 || tokenState.step3 || tokenState.step4)
      ) {
        const contractInstance = new web3.eth.Contract(
          addTokenAbi,
          String(newToken),
        );
        let symbol: any = await contractInstance.methods
          .symbol()
          .call({ from: String(account) })
          .then((token: any) => token)
          .catch((err: any) => console.log(err));
        let name: any = await contractInstance.methods
          .name()
          .call({ from: String(account) })
          .then((token: any) => token)
          .catch((err: any) => console.log(err));
        const obj = {
          parentContract: String(newToken),
          childContract: String(newToken),
          parentName: name,
          parentSymbol: symbol,
        };
        const isalreadypresent = localTokens
          .map((st: any) => st.parentContract)
          .includes(obj.parentContract);
        if (!isalreadypresent) {
          setTempTokens({
            parentContract: String(newToken),
            childContract: String(newToken),
            parentName: name,
            parentSymbol: symbol,
          });
        } else if (isalreadypresent) {
          setTempTokens({});
        }
        console.log(tempTokens, "tempTokens");
      }
    } catch (err: any) {
      Sentry.captureMessage("getTempTokens", err);
    }
  };

  useEffect(() => {
    getTempTokens();
  }, [newToken, tokenState]);

  useEffect(() => {
    depositChainTokenBalance();
  }, [selectedToken]);
  const depositChainTokenBalance = async () => {
    let chain = chainId == ChainId.GÖRLI ? ChainId.PUPPYNET517 : ChainId.GÖRLI;
    let bal: any;
    if (selectedToken?.parentName === "BoneToken") {
      bal = await getTokenBalance(lib, account, dynamicChaining[chain].BONE);
    } else {
      let address = selectedToken?.parentContract || selectedToken?.address;
      bal = await getTokenBalance(lib, account, address);
    }
    console.log(bal, "bal");
  };

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
  };

  const selectedTokenRender = () => {
    if (selectedToken?.logo || selectedToken?.logoURI) {
      return (
        <img
          width="22"
          height="22"
          className="img-fluid"
          src={
            selectedToken?.logo ? selectedToken?.logo : selectedToken?.logoURI
          }
          alt=""
        />
      );
    } else {
      return (
        <img className="img-fluid" src={"../../assets/images/eth.png"} alt="" />
      );
    }
  };
  const  handleClickOutside = useCallback(()=> setMenuState(false),[]) 

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
        <CommonModal
          title={depModalState.title}
          show={showDepositModal}
          setshow={setDepositModal}
          externalCls="dark-modal-100 bridge-ht"
        >
          {/* Deposit popups start */}
          <>
            {/* note popup start*/}
            {dWState && depModalState.step0 && (
              <div className="popmodal-body no-ht">
                <div className="pop-block withdraw_pop">
                  <div className="pop-top">
                    <div className="inner-top p-2">
                      <h4 className="text-md ff-mos pb-3">
                        What isn't possible
                      </h4>
                      <div className="row">
                        <div className="col-1">
                          <X
                            style={{
                              background: "red",
                              borderRadius: "50px",
                              padding: "2px",
                            }}
                          />{" "}
                        </div>
                        <div className="col-11">
                          <h6 className="text-sm ff-mos pb-1">
                            Delegation to Validators
                          </h6>
                          <p className="text-sm">
                            You cannot delegate or stake on the Puppy Net
                            Network. You may do that on the Goerli Network. You
                            can stake funds here.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="inner-top p-2">
                      <h4 className="text-md ff-mos pb-3">What's possible</h4>
                      <div className="row">
                        <div className="col-1">
                          <Check
                            style={{
                              background: "green",
                              borderRadius: "50px",
                              padding: "2px",
                            }}
                          />{" "}
                        </div>
                        <div className="col-11">
                          <h6 className="text-sm ff-mos pb-1">
                            Moving funds from Goerli to Puppy Net
                          </h6>
                          <p className="text-sm">
                            Here you can move frunds from the{" "}
                            {NETWORK_LABEL[chainId]} network to{" "}
                            {
                              NETWORK_LABEL[
                                chainId == ChainId.GÖRLI
                                  ? ChainId.PUPPYNET517
                                  : ChainId.GÖRLI
                              ]
                            }{" "}
                            network on the Puppy Net Chain. This will take 20-30
                            minutes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() => {
                          setDepModState({
                            ...depModalState,
                            step0: false,
                            step1: true,
                            title: "Transfer Overview",
                          });
                          estGasFee();
                        }}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* note popup end */}
            {/* confirm deposit popop starts */}
            {dWState && depModalState.step1 && (
              <div className="popmodal-body no-ht">
                <div
                  className="backDepState"
                  onClick={() => {
                    setDepModState({
                      ...depModalState,
                      step0: true,
                      step1: false,
                      title: "Please Note",
                    });
                    estGasFee();
                  }}
                >
                  <ArrowCircleLeftIcon />
                </div>
                <div className="pop-block">
                  <div className="pop-top">
                    <div
                      className="border-2 rounded-circle d-flex align-item-center justify-content-center p-3 w-25 m-auto"
                      style={{ borderColor: "#F28B03" }}
                    >
                      <img
                        width="80"
                        src="../../assets/images/gas-station.png"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="ff-mos fs-6 pt-4">
                        There are two transactions in the deposit process.
                      </h4>
                      <p className="text-sm pt-1">
                        Estimated total gas required for these transactions.
                      </p>
                    </div>
                    <div className="row pt-3">
                      <div className="col-7 d-flex align-items-center">
                        <img
                          className="img-fluid"
                          width="22"
                          height="22"
                          src={
                            selectedToken?.logo || selectedToken?.logoURI
                              ? selectedToken?.logo || selectedToken?.logoURI
                              : "../../assets/images/eth.png"
                          }
                          alt=""
                        />
                        <p className="ps-2">Approve Deposit</p>
                      </div>
                      <div className="col-5 text-end">
                        {allowance > 0 ? (
                          <>
                            <small className="text-lg">~ </small>
                            <NumberFormat
                              thousandSeparator
                              displayType={"text"}
                              prefix="$"
                              value={(allowance * boneUSDValue).toFixed(6)}
                            />
                          </>
                        ) : (
                          "Approved"
                        )}
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-7 d-flex align-items-center">
                        <img
                          className="img-fluid"
                          width="22"
                          height="22"
                          src={
                            selectedToken?.logo || selectedToken?.logoURI
                              ? selectedToken?.logo || selectedToken?.logoURI
                              : "../../assets/images/eth.png"
                          }
                          alt=""
                        />
                        <p className="ps-2">Complete Deposit</p>
                      </div>
                      <div className="col-5 text-end">
                        <small className="text-lg">~ </small>
                        <NumberFormat
                          thousandSeparator
                          displayType={"text"}
                          prefix="$"
                          value={(estGas * boneUSDValue).toFixed(6)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() =>
                          setDepModState({
                            ...depModalState,
                            step1: false,
                            step2: true,
                            title: "Confirm Transfer",
                          })
                        }
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {dWState && depModalState.step2 && (
              <div className="popmodal-body no-ht">
                <div
                  className="backDepState"
                  onClick={() => {
                    setDepModState({
                      ...depModalState,
                      step1: true,
                      step2: false,
                      title: "Transfer Overview",
                    });
                  }}
                >
                  <ArrowCircleLeftIcon />
                </div>
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="mt-0 cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <div className="img-flexible">
                          <img
                            className="img-fluid d-inline-block"
                            src="../../assets/images/etharium.png"
                            alt=""
                          />
                        </div>
                        <h6>
                          {depositTokenInput +
                            " " +
                            (selectedToken?.parentName
                              ? selectedToken?.parentName
                              : selectedToken?.symbol)}
                        </h6>
                        <p>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={(
                              (+depositTokenInput || 0) * boneUSDValue
                            ).toFixed(tokenDecimal)}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            width="22"
                            height="22"
                            src={
                              selectedToken?.logo || selectedToken?.logoURI
                                ? selectedToken?.logo || selectedToken?.logoURI
                                : "../../assets/images/eth.png"
                            }
                            onError={imageOnErrorHandler}
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[chainId]} Network</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block arow-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            src={
                              NETWORK_ICON[
                                chainId == ChainId.GÖRLI
                                  ? ChainId.PUPPYNET517
                                  : ChainId.GÖRLI
                              ]
                            }
                            onError={imageOnErrorHandler}
                            alt=""
                          />
                        </div>
                        <p>
                          {
                            NETWORK_LABEL[
                              chainId == ChainId.GÖRLI
                                ? ChainId.PUPPYNET517
                                : ChainId.GÖRLI
                            ]
                          }{" "}
                          Network
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="position-relative d-flex justify-content-between align-items-center">
                      <div className="coin-blk">
                        <p className="fs-6 ff-mos">Estimated Time</p>
                      </div>
                      <div>
                        <p className="fw-bold">Est. 20-30 mins</p>
                      </div>
                    </div>
                    <hr />
                    <div className="position-relative d-flex justify-content-between align-items-center">
                      <div className="coin-blk">
                        <p className="fs-6 ff-mos">Estimated fee</p>
                      </div>
                      <div>
                        <p className="fw-bold">
                          <small className="text-lg">~ </small>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$"
                            value={(estGas * boneUSDValue).toFixed(6)}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() => callDepositContract()}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* confirm deposit popop ends */}

            {/* Transaction pending popup start */}

            {dWState && depModalState.step3 && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="mt-0 cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../assets/images/etharium.png"
                            alt=""
                          />
                        </span>
                        <h6>
                          {depositTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={(
                              (+depositTokenInput || 0) * boneUSDValue
                            ).toFixed(tokenDecimal)}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            width="22"
                            height="22"
                            src={
                              selectedToken.logo
                                ? selectedToken.logo
                                : "../../assets/images/eth.png"
                            }
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[chainId]}</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            src={
                              NETWORK_ICON[
                                chainId == ChainId.GÖRLI
                                  ? ChainId.PUPPYNET517
                                  : ChainId.GÖRLI
                              ]
                            }
                            alt=""
                          />
                        </div>
                        <p>
                          {
                            NETWORK_LABEL[
                              chainId == ChainId.GÖRLI
                                ? ChainId.PUPPYNET517
                                : ChainId.GÖRLI
                            ]
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-center text-section">
                      <h4
                        className="pop-hd-md"
                        style={{ color: "var(--bs-orange)" }}
                      >
                        Moving funds
                      </h4>
                      <p>
                        It will take up to 20 - 30 minutes to move the funds on{" "}
                        {
                          NETWORK_LABEL[
                            chainId == ChainId.GÖRLI
                              ? ChainId.PUPPYNET517
                              : ChainId.GÖRLI
                          ]
                        }{" "}
                        Mainnet.
                      </p>
                    </div>
                    <div>
                      <a
                        onClick={() => {
                          setDepModState({
                            step0: false,
                            step1: false,
                            step2: false,
                            step3: false,
                            step4: true,
                            title: "Transaction Submitted",
                          });
                        }}
                        className={`btn grey-btn w-100 relative ${
                          depModalState.step1 && "disabled btn-disabled"
                        }`}
                        href="javascript:void(0)"
                      >
                        <span className="spinner-border text-secondary pop-spiner fix_spinner"></span>
                        <span>Continue</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction pending popup end */}

            {/* Transaction completed popup start */}

            {dWState && depModalState.step4 && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="mt-0 cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../assets/images/etharium.png"
                            alt=""
                          />
                        </span>
                        <h6>
                          {depositTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={(
                              (+depositTokenInput || 0) * boneUSDValue
                            ).toFixed(tokenDecimal)}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="image_area row h-75">
                      <div className="flex text-center col-12 watch-img-sec align-items-center justify-content-center">
                        <img
                          className="img-fluid img-wdth"
                          src="../../assets/images/cmpete-step.png"
                          width="150"
                          height="150"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-section complete-modal">
                      {/* <h4 className="pop-hd-md">Transaction Completed</h4>
                      <p>Transaction completed succesfully.</p> */}
                    </div>
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() => window.open(hashLink)}
                      >
                        View on Block Explorer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction completed popup end */}
          </>
        </CommonModal>

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
                            />
                          </span>
                          <span className="alignment">
                            Delegation/Staking Advice:
                          </span>
                        </div>
                        <p className="row-description">
                          Delegation/Staking takes place on Ethereum. Do not
                          deposit funds to Shibarium for this purpose.{" "}
                          {/* <a className="orange-txt" href="javascript:void(0);">
                            Staking UI
                          </a> */}
                        </p>
                      </div>
                    }
                  </div>
                  <div className="blank-box"></div>
                  <div className="box-bottom d-flex flex-column justify-content-end">
                    {/* <div
                      className={`amt-section position-relative ${!dWState ? "visVisible" : "visInvisible"
                        }`}
                    >
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            width="20"
                            height="20"
                            src="../../assets/images/red-bone.png"
                            alt=""
                          />
                        </div>
                        <p className="lite-color">
                          Estimation of GAS fee required
                        </p>
                      </div>
                      <div>
                        <p className="lite-color fw-bold">$10.00</p>
                      </div>
                    </div> */}
                    {/* <div className="amt-section position-relative">
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            src="../../assets/images/eth.png"
                            alt=""
                          />
                        </div>
                        <p className="lite-color">
                          Estimation of GAS fee required
                        </p>
                      </div>
                      <div>
                        <p className="lite-color fw-bold">$10.00</p>
                      </div>
                    </div> */}
                    <div className="sub-buttons-sec row buttons-fix">
                      <div className="mb-3 col-lg-6 mb-lg-0">
                        {/* <button type="button" className="btn white-btn w-100">
                          How Shibarium Works
                        </button> */}
                        <Link href="how-it-works" passHref>
                          <a target="_blank" className="btn white-btn w-100">
                            How Shibarium Works
                          </a>
                        </Link>
                      </div>
                      <div className="col-lg-6">
                        <button
                          // type="button w-100"
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
                            chainId == ChainId.GÖRLI
                              ? ChainId.PUPPYNET517
                              : ChainId.GÖRLI,
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
                                        <div>{selectedTokenRender()}</div>
                                      </div>
                                      <div className="mid-chain">
                                        {/* <Form.Select
                                        name="fromChain"
                                        defaultValue={`${chainId}`}
                                        value={values.fromChain}
                                        onChange={(e) => {handleChange(e)}}>
                                        {[
                                          ChainId.SHIBARIUM,
                                          ChainId.GÖRLI,
                                          ChainId.ETHEREUM,
                                          ChainId.PUPPYNET517, */}
                                        {/* //  @ts-ignore
                                        ].map((key: ChainId, i: number) => {
                                          return (
                                            <> */}
                                        {/* @ts-ignore TYPE NEEDS FIXING */}
                                        {/* <Image src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md" width="32px" height="32px" />
                                              <option value={key}> */}
                                        {/*@ts-ignore TYPE NEEDS FIXING*/}
                                        {/* {NETWORK_LABEL[key]}
                                              </option>
                                            </>
                                          )

                                        })}
                                      </Form.Select> */}
                                        <input
                                          className="w-100"
                                          type="text"
                                          value={NETWORK_LABEL[chainId]}
                                          disabled={true}
                                          // placeholder="Ethereum chain"
                                        />
                                      </div>
                                      <div className="rt-chain">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        <span className="fld-txt lite-800">
                                          {selectedToken?.balance
                                            ? selectedToken?.balance
                                            : "00.00"}{" "}
                                          {selectedToken?.key ||
                                            selectedToken?.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="field-grid row">
                                    <div className="mb-3 col-lg-6 col-xxl-5 col-sm-12 mb-sm-3 mb-lg-0 res-align">
                                      <div
                                        className="form-field position-relative fix-coin-field"
                                        onClick={() => {
                                          setOpenManageToken(!openManageToken);
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
                                                  : "../../assets/images/eth.png"
                                              }
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="lite-800">
                                          <span className="lite-800 fw-bold">
                                            {selectedToken?.parentName ||
                                            selectedToken?.symbol
                                              ? selectedToken?.parentName ||
                                                selectedToken?.symbol
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
                                            // defaultValue={depositTokenInput}
                                            value={values.amount}
                                            onChange={handleChange("amount")}
                                          />
                                        </div>
                                        <div
                                          className="rt-chain"
                                          onClick={(e) =>
                                            setFieldValue(
                                              "amount",
                                              selectedToken.balance,
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
                                    <label className="mb-2 mb-xxl-3 mb-md-2">
                                      To
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div>
                                          <img
                                            width="22"
                                            height="22"
                                            className="img-fluid"
                                            src={
                                              NETWORK_ICON[
                                                chainId == ChainId.GÖRLI
                                                  ? ChainId.PUPPYNET517
                                                  : ChainId.GÖRLI
                                              ]
                                            }
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
                                              chainId == ChainId.GÖRLI
                                                ? ChainId.PUPPYNET517
                                                : ChainId.GÖRLI
                                            ]
                                          }
                                        />
                                      </div>
                                      {/* <Form.Select
                                        name="toChain"
                                        defaultValue={`${chainId}`}
                                        value={values.toChain}
                                        onChange={(e) => {handleChange(e)}}
                                      >
                                        {[
                                          ChainId.SHIBARIUM,
                                          ChainId.GÖRLI,
                                          ChainId.ETHEREUM,
                                          ChainId.PUPPYNET517, */}
                                      {/* //  @ts-ignore
                                        ].map((key: ChainId, i: number) => {
                                          // console.log(values);
                                          return (
                                            <> */}
                                      {/* @ts-ignore TYPE NEEDS FIXING */}
                                      {/* <Image src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md" width="32px" height="32px" />

                                              <option value={key} disabled={values.fromChain == key ? true : false}> */}
                                      {/*@ts-ignore TYPE NEEDS FIXING*/}
                                      {/* {NETWORK_LABEL[key]}
                                              </option>
                                            </>
                                          )

                                        })}
                                      </Form.Select> */}
                                      <div className="rt-chain">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        <span className="fld-txt lite-800">
                                          00.00{" "}
                                          {selectedToken?.key ||
                                            selectedToken?.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="wrap-bottom">
                                <div className="btn-modify">
                                  <button
                                    onClick={() => handleSubmit()}
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
                      initialValues={{
                        withdrawAmount: "",
                        fromChain:
                          chainId == ChainId.GÖRLI
                            ? ChainId.PUPPYNET517
                            : ChainId.GÖRLI,
                        toChain: chainId,
                      }}
                      validationSchema={withdrawValidations}
                      onSubmit={(values, { resetForm }) => {
                        callWithdrawModal(values);
                        resetForm();
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
                                        <div>
                                          <img
                                            width="22"
                                            height="22"
                                            className="img-fluid"
                                            src={
                                              NETWORK_ICON[
                                                chainId == ChainId.GÖRLI
                                                  ? ChainId.PUPPYNET517
                                                  : ChainId.GÖRLI
                                              ]
                                            }
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
                                              chainId == ChainId.GÖRLI
                                                ? ChainId.PUPPYNET517
                                                : ChainId.GÖRLI
                                            ]
                                          }
                                          disabled={true}
                                        />
                                      </div>
                                      {/* <Form.Select
                                        name="fromChain"
                                        defaultValue={`${chainId}`}
                                        value={values.fromChain}
                                        onChange={handleChange}
                                      >
                                        {[
                                          ChainId.SHIBARIUM,
                                          ChainId.GÖRLI,
                                          ChainId.ETHEREUM,
                                          ChainId.PUPPYNET517, */}
                                      {/* //  @ts-ignore
                                        ].map((key: ChainId, i: number) => {
                                          // console.log(values);
                                          return (
                                            <> */}
                                      {/* @ts-ignore TYPE NEEDS FIXING */}
                                      {/* <Image src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md" width="32px" height="32px" />

                                              <option value={key}> */}
                                      {/*@ts-ignore TYPE NEEDS FIXING*/}
                                      {/* {NETWORK_LABEL[key]}
                                              </option>
                                            </>
                                          )

                                        })}
                                      </Form.Select> */}
                                      <div className="rt-chain">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        <span className="fld-txt lite-800">
                                          {selectedToken?.balance
                                            ? selectedToken?.balance
                                            : "00.00"}{" "}
                                          {selectedToken?.key ||
                                            selectedToken?.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="field-grid row">
                                    <div className="mb-3 col-lg-6 col-xxl-5 col-sm-12 mb-sm-3 mb-lg-0 res-align">
                                      <div
                                        className="form-field position-relative fix-coin-field h-100"
                                        onClick={() => {
                                          setOpenManageToken(!openManageToken);
                                          // onClick={() => {
                                          //   setTokenModal(true);
                                          //   setTokenState({
                                          //     step0: true,
                                          //     step1: false,
                                          //     step2: false,
                                          //     step3: false,
                                          //     step4: false,
                                          //     title: "Select a Token",
                                          //   });
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
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="lite-800">
                                          <span className="lite-800 fw-bold">
                                            {selectedToken?.parentName ||
                                            selectedToken?.symbol
                                              ? selectedToken?.parentName ||
                                                selectedToken?.symbol
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
                                              "withdrawAmount",
                                            )}
                                          />
                                        </div>
                                        <div
                                          className="rt-chain"
                                          onClick={(e) =>
                                            setFieldValue(
                                              "withdrawAmount",
                                              selectedToken?.balance,
                                            )
                                          }
                                        >
                                          <span className="orange-txt fw-bold withdrawMax">
                                            MAX
                                          </span>
                                        </div>
                                      </div>
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
                                    <label className="mb-2 mb-xxl-3 mb-md-2">
                                      To
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div>
                                          {selectedToken?.logo ||
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
                                            />
                                          ) : (
                                            <img
                                              className="img-fluid"
                                              src={
                                                "../../assets/images/eth.png"
                                              }
                                              alt=""
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div className="mid-chain">
                                        <input
                                          className="w-100"
                                          type="text"
                                          // placeholder="Shibarium Mainnet"
                                          value={NETWORK_LABEL[chainId]}
                                          disabled={true}
                                        />
                                      </div>
                                      {/* <Form.Select
                                        name="toChain"
                                        defaultValue={`${chainId}`}
                                        value={values.toChain}
                                        onChange={handleChange}
                                      >
                                        {[
                                          ChainId.SHIBARIUM,
                                          ChainId.GÖRLI,
                                          ChainId.ETHEREUM,
                                          ChainId.PUPPYNET517, */}
                                      {/* //  @ts-ignore
                                        ].map((key: ChainId, i: number) => {
                                          // console.log(values);
                                          return (
                                            <> */}
                                      {/* @ts-ignore TYPE NEEDS FIXING */}
                                      {/* <Image src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md" width="32px" height="32px" />

                                              <option value={key} disabled={values.fromChain == key ? true : false}> */}
                                      {/*@ts-ignore TYPE NEEDS FIXING*/}
                                      {/* {NETWORK_LABEL[key]}
                                              </option>
                                            </>
                                          )

                                        })}
                                      </Form.Select> */}
                                      <div className="rt-chain">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        <span className="fld-txt lite-800">
                                          00.00{" "}
                                          {selectedToken?.key ||
                                            selectedToken?.symbol}
                                        </span>
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

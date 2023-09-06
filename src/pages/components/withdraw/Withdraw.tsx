import { NETWORK_ICON, NETWORK_LABEL } from "app/config/networks";
import { useActiveWeb3React } from "app/services/web3";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { ChainId } from "shibarium-get-chains";
import {
  currentGasPrice,
  tokenDecimal,
  USER_REJECTED_TX,
} from "web3/commonFunctions";
import { useABI } from "app/hooks/useABI";
import { contractAddress, dynamicChaining } from "web3/DynamicChaining";
import CommonModal from "../CommonModel";
import * as Sentry from "@sentry/nextjs";
import Web3 from "web3";
import MRC20 from "../../../ABI/MRC20ABI.json";
import childERC20abi from "../../../ABI/childERC20.json";
import { useAppDispatch } from "app/state/hooks";
import fromExponential from "from-exponential";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import { Check, X } from "react-feather";
import Loader from "app/components/Loader";
import { L1Block, PUPPYNET517 } from "app/hooks/L1Block";
import useLocalStorageState from "use-local-storage-state";
import StepThree from "./StepThree";
import { SUPPORTED_NETWORKS } from "app/modals/NetworkModal";
// @ts-ignore TYPE NEEDS FIXING
import cookie from "cookie-cutter";
import {
  addTransaction,
  finalizeTransaction,
} from "app/state/transactions/actions";
import { getExplorerLink } from "app/functions";
import postTransactions, { putTransactions } from "../BridgeCalls";
import { toast } from "react-toastify";
import {
  BONE_ID,
  GOERLI_CHAIN_ID,
  PUPPYNET_CHAIN_ID,
} from "app/config/constant";
import { getToWeiUnitFromDecimal } from "utils/weiDecimal";
import useTransactionCount from "app/hooks/useTransactionCount";
import ERC20 from "../../../ABI/ERC20Abi.json";
import axios from "axios";
const WithdrawModal: React.FC<any> = ({
  page,
  dWState,
  setWithdrawModalOpen,
  selectedToken,
  withdrawTokenInput,
  boneUSDValue,
  show,
  reset,
  EthValue,
}) => {
  const { chainId = 1, account, library } = useActiveWeb3React();
  const lib: any = library;
  const web3: any = new Web3(lib?.provider);
  const webL2: any = PUPPYNET517();
  const webL1 = L1Block();
  // console.log("library ", library);
  console.log("chainId ", chainId);

  const { getTransactionsCount } = useTransactionCount();
  const dispatch = useAppDispatch();
  const [hashLink, setHashLink] = useState("");
  const [allowance, setAllowance] = useState(0);
  const [txState, setTxState] = useLocalStorageState<any>("txState");
  const [loader, setLoader] = useState(true);
  const [estGas, setEstGas] = useState<any>(0);
  const [processing, setProcessing] = useState<any>([]);
  const [step, setStep] = useState<any>();
  const [checkpointSigned, setCheckpointSigned] = useState(false);
  const [challengePeriodCompleted, setChallengePeriodCompleted] =
    useState(false);
  const [buttonloader, setButtonLoader] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [inclusion, setInclusion] = useState({});
  const [error, setError] = useState<any>(null);
  const [decimalformat, setDecimalformat] = useState<any>(18);
  const [withModalState, setWidModState] = useState({
    step0: true,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    title: "Please Note",
  });
  // const childERC20abi = useABI("abis/plasma/ChildERC20.json");
  // const ERC20 = useABI("abis/pos/ERC20.json");
  // const ERC20PLASMA = useABI("abis/plasma/ERC20.json");
  const withdrawManagerABI = useABI("abis/plasma/WithdrawManager.json");
  // const MRC20 = useABI("abis/plasma/MRC20.json");
  const [usdValue, setusdValue] = useState(0);
  useEffect(() => {
    getTokenUsdValue(selectedToken?.parentContract);
  }, [selectedToken]);

  const getTokenUsdValue = (token: string) => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${token}&vs_currencies=usd`
      )
      .then((res: any) => {
        console.log("token ", token);
        let usdValue = 1;
        Object.keys(res.data).map((key) => {
          if (key.toLowerCase() == token.toLowerCase()) {
            usdValue = res.data[key].usd;
          }
        });
        console.log("coingecko respo ", res.data[token.toLowerCase()]);
        setusdValue(usdValue);
      })
      .catch((err) => console.log(err));
  };
  const switchNetwork = async (key: ChainId) => {
    if (error === null) {
      // let key =
      //   chainId == GOERLI_CHAIN_ID ? PUPPYNET_CHAIN_ID : GOERLI_CHAIN_ID;
      console.debug(`Switching to chain ${key}`, SUPPORTED_NETWORKS[key]);
      const params = SUPPORTED_NETWORKS[key];
      console.log("add chain ", key);
      cookie.set("chainId", key, params);
      try {
        await library?.send("wallet_switchEthereumChain", [
          { chainId: `0x${key.toString(16)}` },
          account,
        ]);
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        // @ts-ignore TYPE NEEDS FIXING
        if (switchError.code === 4902) {
          try {
            console.log({ params, account });
            await library?.send("wallet_addEthereumChain", [params, account]);
          } catch (addError) {
            // handle "add" error
            console.error(`Add chain error ${addError}`);
          }
        }
        console.error(`Switch chain error ${switchError}`);
        // handle other "switch" errors
        setButtonLoader(false);
      }
    }
  };

  const callWithdrawContract = async () => {
    try {
      if (account) {
        setButtonLoader(true);
        let isAllowed = false;
        if (chainId !== PUPPYNET_CHAIN_ID) {
          await switchNetwork(PUPPYNET_CHAIN_ID);
          setButtonLoader(false);
        }
        if (chainId === GOERLI_CHAIN_ID) {
          if (+allowance != 0) {
            await approveWithdraw();
            isAllowed = true;
          }
          if (error === null && !isAllowed) {
            console.log("entered switch network", error);
            await switchNetwork(PUPPYNET_CHAIN_ID);
          }
          setButtonLoader(false);
        }
        if (chainId === PUPPYNET_CHAIN_ID) {
          if (+allowance != 0) {
            await switchNetwork(GOERLI_CHAIN_ID);
            await approveWithdraw();
          }
          setButtonLoader(true);
          if (error === null) {
            setWidModState({
              ...withModalState,
              step2: false,
              step3: true,
              title: "Transaction Pending",
            });
            setStep("Initialized");
            if (allowance == 0) {
              submitWithdraw();
            }
            setTimeout(() => {
              console.log("called");
            }, 2000);
          }
        }
      }
    } catch (err: any) {
      console.log("entered catch block");
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureMessage("callDepositContract", err);
      }
    }
  };

  const approveWithdraw = async () => {
    try {
      if (account) {
        let user = account;
        let instance = new web3.eth.Contract(
          ERC20,
          selectedToken?.parentContract
        );
        let decimal = await instance.methods.decimals().call();
        console.log("get decimal", decimal);
        const format = getToWeiUnitFromDecimal(decimal);
        let amount = web3.utils.toWei(String(withdrawTokenInput), format);
        let amountwei = web3.utils.toBN(amount);
        await instance.methods
          .approve(contractAddress.WITHDRAW_MANAGER_PROXY, amountwei)
          .send({ from: account })
          .on("transactionHash", (res: any) => {
            dispatch(
              addTransaction({
                hash: res,
                from: user,
                chainId,
                summary: `${res}`,
              })
            );
            let link = getExplorerLink(chainId, res, "transaction");
            setHashLink(link);
            setError(null);
          })
          .on("receipt", async (res: any) => {
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
            setAllowance(0);
            await switchNetwork(PUPPYNET_CHAIN_ID);
          })
          .on("error", (res: any) => {
            if (res.code == 4001) {
              setError("You need to give approval first.");
              setWidModState({
                ...withModalState,
                step2: true,
                step3: false,
                title: "Transfer Overview",
              });
            } else {
              setWithdrawModalOpen(false);
            }
            setButtonLoader(false);
          });
      }
    } catch (err: any) {
      Sentry.captureMessage("approvewithdraw ", err);
      if (err.code == 4001) {
        setWidModState({
          ...withModalState,
          step2: true,
          step3: false,
          title: "Transfer Overview",
        });
        setError("You need to give approval first.");
      }
    }
  };

  const submitWithdraw = async () => {
    try {
      if (error === null) {
        setHashLink("");
        setButtonLoader(false);
        let user: any = account;
        let amount = web3.utils.toBN(
          fromExponential(+withdrawTokenInput * Math.pow(10, decimalformat))
        );
        let abi: any;
        let sendData;
        if (selectedToken?.parentName === BONE_ID) {
          abi = MRC20;
          sendData = { from: user, gas: 100000, value: amount };
        } else {
          abi = childERC20abi;
          sendData = { from: user };
        }
        let hash: any;
        const instance = new web3.eth.Contract(
          abi,
          selectedToken?.childContract
        );
        await instance.methods
          .withdraw(amount)
          .send(sendData)
          .on("transactionHash", async (res: any) => {
            dispatch(
              addTransaction({
                hash: res,
                from: user,
                chainId,
                summary: `${res}`,
              })
            );
            console.log("transaction hash ", res);
            let link = getExplorerLink(PUPPYNET_CHAIN_ID, res, "transaction");
            setHashLink(link);
            hash = res;
            let body = {
              transactionType: 2,
              bridgeType: selectedToken.bridgetype,
              stepPoint: "",
              from: user,
              to: "",
              amount: +withdrawTokenInput,
              usdValue: +withdrawTokenInput * usdValue,
              txHash: res,
              status: 0,
              walletAddress: account,
              token: selectedToken,
              checkpointSigned: false,
              challengePeriod: false,
              processExit: false,
              txData: "",
              fromChain: PUPPYNET_CHAIN_ID,
              toChain: GOERLI_CHAIN_ID,
              checkChallengePeriodStatus: false,
              checkProcessExitStatus: false,
            };
            await postTransactions(body);
          })
          .on("receipt", async (res: any) => {
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
            getTransactionsCount();
            setProcessing((processing: any) => [...processing, "Initialized"]);
            setStep("Checkpoint");
            setTxState({
              checkpointSigned: false,
              challengePeriod: false,
              processExit: false,
              amount: withdrawTokenInput,
              token: selectedToken,
              txHash: res,
            });
            let step =
              selectedToken.bridgetype == "plasma" ? "2 steps" : "1 step";
            let body = {
              stepPoint: step,
              to: res.to,
              txHash: res.transactionHash,
              txData: res.events,
            };
            await putTransactions(body);
          })
          .on("error", async (res: any) => {
            if (res.code === 4001) {
              setWithdrawModalOpen(false);
              setWidModState({
                step0: true,
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
                title: "Initialize Withdraw",
              });
              setStep("Initialized");
              setProcessing([]);
            }
            if (res.code != 4001) {
              let body = {
                stepPoint: "Failed",
                status: -1,
                txHash: hash,
              };
              await putTransactions(body);
            }
            console.log("error ", res);
          });
      }
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureMessage("submitWithdraw ", err);
      }
      console.log("error => ", err);
      setWithdrawModalOpen(false);
      setWidModState({
        step0: true,
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
        title: "Initialize Withdraw",
      });
      setStep("Initialized");
      setProcessing([]);
    }
  };

  const getBurnStatus = async (txHash: any) => {
    if (txState?.checkpointSigned) {
      setProcessing((processing: any) => [...processing, "Checkpoint"]);
      setTxState({ ...txState, checkpointSigned: true });
      setCheckpointSigned(true);
    }
  };

  useEffect(() => {
    estGasFee();
  }, [withdrawManagerABI]);

  const estGasFee = async () => {
    if (!withdrawManagerABI) return;
    setLoader(true);
    setEstGas(0);
    let user: any = account;
    if (selectedToken.parentName !== "Ether") {
      let instance = new webL1.eth.Contract(
        ERC20,
        selectedToken?.parentContract
      );
      let decimal = await instance.methods.decimals().call();
      let format = getToWeiUnitFromDecimal(decimal);
      setDecimalformat(decimal);
      let amount = web3.utils.toWei(String(withdrawTokenInput), format);
      const amountWei = web3.utils.toBN(amount);
      let currentprice: any = await currentGasPrice(web3);

      let allowance = await instance.methods
        .allowance(account, contractAddress.WITHDRAW_MANAGER_PROXY)
        .call({ from: account });
      let allowanceForExit = +allowance / Math.pow(10, decimal);
      let approvalInstance = new webL1.eth.Contract(
        ERC20,
        selectedToken?.parentContract
      );
      console.log("allowance ", allowanceForExit);
      let processExitAllowance: any = 0;
      if (+allowanceForExit < +withdrawTokenInput) {
        await approvalInstance.methods
          .approve(contractAddress.WITHDRAW_MANAGER_PROXY, amountWei)
          .estimateGas({ from: user })
          .then((gas: any) => {
            processExitAllowance = (+gas * +currentprice) / Math.pow(10, 18);
            console.log(
              "allowance processExitAllowance,",
              processExitAllowance
            );
            // web3.eth.toWei(String(+gas * +currentprice), "ether");
            setAllowance(+processExitAllowance);
            setLoader(false);
          })
          .catch((err: any) => console.log(err));
      }
      if (selectedToken?.bridgetype === "plasma") {
        let instance = new webL1.eth.Contract(
          withdrawManagerABI,
          dynamicChaining[GOERLI_CHAIN_ID].WITHDRAW_MANAGER_PROXY
        );
        await instance.methods
          .processExits(selectedToken?.parentContract)
          .estimateGas({ from: user })
          .then((gas: any) => {
            console.log("gas 2,", (+gas * +currentprice) / Math.pow(10, 18));
            let gasFee = (+gas * +currentprice) / Math.pow(10, 18);
            setEstGas(+gasFee);
            setLoader(false);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
      setLoader(false);
    } else {
      setAllowance(0);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (page == "tx") {
      let tempStep: any;
      let process: any;
      if (txState?.token?.bridgetype == "plasma") {
        tempStep = txState?.processExit
          ? "Completed"
          : txState?.challengePeriod //NOSONAR
          ? "Challenge Period" //NOSONAR
          : "Checkpoint"; //NOSONAR
        process = [
          "Initialized",
          "Checkpoint",
          "Challenge Period",
          "Completed",
        ];
      } else {
        tempStep = txState?.processExit ? "Completed" : "Checkpoint";
        process = ["Initialized", "Checkpoint", "Completed"];
      }
      setStep(tempStep);
      process.splice(
        process.indexOf(tempStep),
        process.length - 1 - process.indexOf(tempStep) + 1
      );
      setProcessing(process);
      console.log("processing", process, tempStep);
      if (tempStep == "Checkpoint") {
        getBurnStatus(txState?.txHash);
        if (txState.withdrawHash != null) {
          setStep("Challenge Period");
        }
      } else if (tempStep == "Challenge Period") {
        setProcessing((processing: any) => [...processing, "Challenge Period"]);
        setChallengePeriodCompleted(true);
      } else if (tempStep == "Completed") {
        setCompleted(true);
        setProcessing((processing: any) => [...processing, "Completed"]);
      }
    } else {
      setTxState({});
    }
  }, []);

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
    event.currentTarget.className = "error";
  };

  return (
    <CommonModal
      title={withModalState.title}
      show={show}
      setshow={() => {
        setWithdrawModalOpen(false);
        if (page != "tx") reset.method();
      }}
      externalCls="dark-modal-100 bridge-ht2"
    >
      {/* Withdraw tab popups start */}
      <>
        {/* note popup start*/}
        {page == "bridge" ? (
          <>
            {!dWState && withModalState.step0 && (
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
                            Cancelling any withdraw
                          </h6>
                          <p className="text-sm">
                            You cannot cancel a withdrawal once you have begun
                            the process.
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
                            Moving funds from Shibarium to Ethereum
                          </h6>
                          <p className="text-sm">
                            Here you can move funds from the Shibarium to
                            Ethereum Mainnet. This will take 60 minutes - 3
                            hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div>
                      <a
                        className="btn primary-btn w-100 d-flex align-items-center justify-content-center"
                        onClick={() => {
                          setWidModState({
                            ...withModalState,
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
            {!dWState && withModalState.step1 && (
              <div className="popmodal-body no-ht">
                <div
                  className="backDepState"
                  onClick={() => {
                    setWidModState({
                      ...withModalState,
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
                        Withdrawal process for Proof of Stake consists of 2
                        transactions
                      </h4>
                      <p className="text-sm pt-1">
                        Estimated total gas required for these transactions.
                      </p>
                    </div>
                    <div className="row pt-3">
                      <div className="col-7 d-flex align-items-center">
                        <img
                          className="img-fluid"
                          width="30"
                          src="../../assets/images/shib-logo.png"
                          alt=""
                          onError={imageOnErrorHandler}
                        />
                        <p className="ps-2">Withdrawal Initialized</p>
                      </div>
                      <div className="col-5 text-end">
                        {/* <small className="text-lg">~ </small> */}
                        <NumberFormat
                          thousandSeparator
                          displayType={"text"}
                          prefix="$"
                          value={0}
                        />
                      </div>
                    </div>

                    <div className="row pt-3">
                      <div className="col-7 d-flex align-items-center">
                        <img
                          className="img-fluid"
                          width="30"
                          src={
                            selectedToken?.logo || selectedToken?.logoURI
                              ? selectedToken?.logo || selectedToken?.logoURI
                              : "../../assets/images/eth_logo.png"
                          }
                          onError={imageOnErrorHandler}
                          alt=""
                        />
                        <p className="ps-2">Approve Withdrawal</p>
                      </div>
                      <div className="col-5 d-flex align-items-center justify-content-end">
                        {loader ? (
                          <Loader />
                        ) : (
                          <>
                            {allowance > 0 ? (
                              <>
                                {/* <small className="text-lg">~ </small> */}
                                <NumberFormat
                                  thousandSeparator
                                  displayType={"text"}
                                  prefix="$"
                                  value={(allowance * EthValue).toFixed(8)}
                                />
                              </>
                            ) : (
                              "Approved"
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {selectedToken?.bridgetype === "plasma" && (
                      <div className="row pt-3">
                        <div className="col-7 d-flex align-items-center">
                          <img
                            className="img-fluid"
                            width="30"
                            src={
                              selectedToken?.logo || selectedToken?.logoURI
                                ? selectedToken?.logo || selectedToken?.logoURI
                                : "../../assets/images/eth_logo.png"
                            }
                            onError={imageOnErrorHandler}
                            alt=""
                          />
                          <p className="ps-2">Withdrawal Complete</p>
                        </div>
                        <div className="col-5 d-flex align-items-center justify-content-end">
                          {loader ? (
                            <Loader />
                          ) : (
                            <>
                              {/* <small className="text-lg">~ </small> */}
                              <NumberFormat
                                thousandSeparator
                                displayType={"text"}
                                prefix="$"
                                value={(
                                  (allowance ? +estGas + +allowance : +estGas) *
                                  EthValue
                                ).toFixed(8)}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="pop-bottom">
                    <div>
                      <a
                        className="btn primary-btn w-100 d-flex align-items-center justify-content-center"
                        onClick={() => {
                          setWidModState({
                            ...withModalState,
                            step1: false,
                            step2: true,
                            title: "Confirm Transfer",
                          });
                          setError(null);
                          setButtonLoader(false);
                        }}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Initialize withdraw popup start */}
            {withModalState.step2 && !dWState && (
              <div className="popmodal-body no-ht">
                <div
                  className="backDepState"
                  onClick={() => {
                    setWidModState({
                      ...withModalState,
                      step1: true,
                      step2: false,
                      title: "Transfer Overview",
                    });
                    estGasFee();
                  }}
                >
                  <ArrowCircleLeftIcon />
                </div>
                <div className="pop-block withdraw_pop">
                  <div className="pop-top">
                    <div className="mt-0 cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src={
                              selectedToken.logo
                                ? selectedToken.logo
                                : "../../assets/images/red-bone.png"
                            }
                            onError={imageOnErrorHandler}
                            alt=""
                          />
                        </span>
                        <h6>
                          {withdrawTokenInput}{" "}
                          {chainId == GOERLI_CHAIN_ID
                            ? selectedToken.parentName
                            : selectedToken.childName}
                        </h6>
                        <p>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={(
                              (+withdrawTokenInput || 0) * usdValue
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
                            src={NETWORK_ICON[PUPPYNET_CHAIN_ID]}
                            onError={imageOnErrorHandler}
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[PUPPYNET_CHAIN_ID]}</p>
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
                            width="50"
                            src={"../../assets/images/eth_logo.png"}
                            onError={imageOnErrorHandler}
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[GOERLI_CHAIN_ID]}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="position-relative d-flex justify-content-between align-items-center">
                      <div className="coin-blk">
                        <p className="fs-6 ff-mos">Estimated Time</p>
                      </div>
                      <div>
                        <p className="fw-bold">Est. 3 hours</p>
                      </div>
                    </div>
                    <hr />
                    <div className="position-relative d-flex justify-content-between align-items-center">
                      <div className="coin-blk">
                        <p className="fs-6 ff-mos">Estimated fee</p>
                      </div>
                      <div>
                        <p className="fw-bold">
                          {/* <small className="text-lg">~ </small> */}
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$"
                            value={(
                              (allowance > 0 ? +estGas + +allowance : +estGas) *
                              EthValue
                            ).toFixed(8)}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    {error ? <small className="errorMsg">{error}</small> : ""}
                    <div>
                      <a
                        className={` d-flex align-items-center justify-content-center btn primary-btn w-100 relative ${
                          buttonloader && "disabled btn-disabled"
                        }`}
                        onClick={() => {
                          callWithdrawContract();
                        }}
                      >
                        {buttonloader && (
                          <span className="spinner-border text-secondary pop-spiner fix_spinner"></span>
                        )}
                        <span>Continue</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {withModalState.step3 && !dWState && (
              <>
                <StepThree
                  {...{
                    challengePeriodCompleted,
                    checkpointSigned,
                    hashLink,
                    processing,
                    selectedToken,
                    switchNetwork,
                    setProcessing,
                    setStep,
                    step,
                    withdrawTokenInput,
                    page,
                    inclusion,
                  }}
                />
              </>
            )}
          </>
        ) : (
          <>
            <StepThree
              {...{
                challengePeriodCompleted,
                checkpointSigned,
                hashLink,
                processing,
                selectedToken,
                setProcessing,
                setStep,
                switchNetwork,
                step,
                withdrawTokenInput,
                setChallengePeriodCompleted,
                setHashLink,
                completed,
                setCompleted,
                page,
                inclusion,
              }}
            />
          </>
        )}

        {/* Initialize withdraw popup end */}

        {/* Reaching checkpoint popup start */}

        {/* Reaching checkpoint  popup end */}
      </>
      {/* Withdraw tab popups end */}
    </CommonModal>
  );
};

export default WithdrawModal;

import { CircularProgress } from "@material-ui/core";
import { getExplorerLink } from "app/functions";
import { useActiveWeb3React } from "app/services/web3";
import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import Web3 from "web3";
import {
  addTransaction,
  finalizeTransaction,
} from "app/state/transactions/actions";
import { useAppDispatch } from "app/state/hooks";
import { dynamicChaining } from "web3/DynamicChaining";
import { currentGasPrice } from "web3/commonFunctions";
import { useABI } from "app/hooks/useABI";
import { getClient } from "client/shibarium";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { putTransactions } from "../BridgeCalls";
import { GOERLI_CHAIN_ID, PUPPYNET_CHAIN_ID } from "app/config/constant";
import useTransactionCount from "app/hooks/useTransactionCount";
import dayjs from "dayjs";
const StepThree: React.FC<any> = ({
  withdrawTokenInput,
  selectedToken,
  processing,
  step,
  hashLink,
  checkpointSigned,
  challengePeriodCompleted = true,
  setProcessing,
  switchNetwork,
  setStep,
  setHashLink,
  setChallengePeriodCompleted,
  completed,
  setCompleted,
  page,
  inclusion,
}) => {
  const [txState, setTxState] = useLocalStorageState<any>("txState");
  const { getTransactionsCount } = useTransactionCount();
  const { account, chainId = 1, library } = useActiveWeb3React();
  const lib: any = library;
  const web3: any = new Web3(lib?.provider);
  const POSExitABI = useABI("abis/pos/RootChainManager.json");
  const PlasmaExitABI = useABI("abis/plasma/ERC20PredicateBurnOnly.json");
  const withdrawManagerABI = useABI("abis/plasma/WithdrawManager.json");
  const dispatch: any = useAppDispatch();
  const today = dayjs();
  const updatedAt = dayjs(txState?.updatedAt);
  useEffect(() => {
    if (txState && page == "tx") {
      let link = getExplorerLink(chainId, txState?.txHash, "transaction");
      setHashLink(link);
    }
  }, []);

  const processExit = async (e: any) => {
    try {
      e.preventDefault();
      if (chainId === PUPPYNET_CHAIN_ID) {
        await switchNetwork(GOERLI_CHAIN_ID);
      }
      setStep("Completed");
      let user: any = account;
      let instance = new web3.eth.Contract(
        withdrawManagerABI,
        dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY
      );
      let token =
        selectedToken?.parentContract || txState?.token?.parentContract;
      console.log("token ", instance);
      await instance.methods
        .processExits(token)
        .estimateGas({ from: user })
        .then((res: any) => {
          console.log("gas fee calculated =>", res);
        })
        .catch((err: any) => {
          console.log("error calculating gas fee", err);
        });
      await instance.methods
        .processExits(token)
        .send({ from: account })
        .on("transactionHash", async (res: any) => {
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
          let body = {
            txHash: txState.txHash,
            finalHash: res,
          };
          await putTransactions(body);
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
          setProcessing((processing: any) => [...processing, "Completed"]);
          setCompleted(true);
          let body = {
            stepPoint: "0",
            processExit: true,
            status: 1,
            txHash: txState.txHash,
            checkProcessExitStatus: true,
          };
          let postResp = await putTransactions(body);
          console.log("post resp", postResp);

          setTxState({ ...txState, processExit: true, finalHash: res });
        })
        .on("error", (res: any) => {
          console.log("processExit ", res);
          setStep("Challenge Period");
        });
    } catch (err: any) {
      console.log("processExit ", err);
      setStep("Challenge Period");
      toast.error("Something went wrong. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      if (err?.code === 4001) {
        toast.error("User denied transaction.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    }
  };

  const startExitWithBurntTokens = async () => {
    try {
      if (chainId === PUPPYNET_CHAIN_ID) {
        await switchNetwork(GOERLI_CHAIN_ID);
      }
      let contract = process.env.NEXT_PUBLIC_WITHDRAW_PLASMA_EXIT_CONTRACT;
      let type = selectedToken?.bridgetype || txState?.token?.bridgetype;
      setStep("Challenge Period");
      let user: any = account;
      const client = await getClient(type);
      let erc20Token: any;
      const instance = new web3.eth.Contract(PlasmaExitABI, contract);
      const data = txState?.txData?.Withdraw?.signature;
      if (client) {
        erc20Token = await client.exitUtil.buildPayloadForExit(
          txState?.txHash,
          data.toLowerCase(),
          false,
          0
        );
      }

      console.log("step erc 20  ", erc20Token);
      let gasFee = await instance.methods
        .startExitWithBurntTokens(erc20Token)
        .estimateGas({ from: account });
      console.log("step erc20 token=>", gasFee, user, account);
      let encodedAbi = await instance.methods
        .startExitWithBurntTokens(erc20Token)
        .encodeABI();
      let CurrentgasPrice: any = await currentGasPrice(web3);
      await web3.eth
        .sendTransaction({
          from: account,
          to: contract,
          gas: parseInt(gasFee).toString(),
          gasPrice: CurrentgasPrice,
          data: encodedAbi,
        })
        .on("transactionHash", async (res: any) => {
          dispatch(
            addTransaction({
              hash: res,
              from: user,
              chainId,
              summary: `${res}`,
            })
          );
          let body = {
            txHash: txState.txHash,
            withdrawHash: res,
          };
          await putTransactions(body);
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
          setChallengePeriodCompleted(true);
          setProcessing((processing: any) => [
            ...processing,
            "Challenge Period",
          ]);
          let body = {
            stepPoint: "1 step",
            challengePeriod: true,
            txHash: txState.txHash,
            checkChallengePeriodStatus: true,
          };
          let postResp = await putTransactions(body);
          console.log("post resp", postResp);

          setTxState({
            ...txState,
            checkpointSigned: true,
            challengePeriod: true,
            withdrawHash: res,
          });
        })
        .on("error", async (res: any) => {
          setStep("Checkpoint");
          if (res.code === 4001) {
            console.log("user denied transaction");
            setChallengePeriodCompleted(false);
          }
        });
    } catch (err: any) {
      console.log("startExitWithBurntTokens ", err);
      setStep("Checkpoint");
      toast.error("Something went wrong. Try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      if (err?.code === 4001) {
        toast.error("User denied transaction.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        console.log("user denied transaction");
        setChallengePeriodCompleted(false);
      }
    }
  };
  const posExit = async () => {
    try {
      if (chainId === PUPPYNET_CHAIN_ID) {
        await switchNetwork(GOERLI_CHAIN_ID);
      }
      console.log("entered pos exit");
      setStep("Completed");
      const user: any = account;
      const type = selectedToken?.bridgetype || txState?.token?.bridgetype;
      const client = await getClient(type);
      console.log("client done", client);
      let contract = process.env.NEXT_PUBLIC_WITHDRAW_POS_EXIT_CONTRACT;
      const instance = new web3.eth.Contract(POSExitABI, contract);
      console.log("instance done", instance);
      const data = txState?.txData?.Transfer?.signature;
      console.log("data -> ", txState);
      let erc20Token: any;
      if (client) {
        erc20Token = await client.exitUtil.buildPayloadForExit(
          txState?.txHash,
          data.toLowerCase(),
          false,
          0
        );
      }
      console.log("erx 20 token data ", erc20Token);
      let gasFee = await instance.methods
        .exit(erc20Token)
        .estimateGas({ from: user });
      let encodedAbi = await instance.methods.exit(erc20Token).encodeABI();
      let CurrentgasPrice: any = await currentGasPrice(web3);
      await web3.eth
        .sendTransaction({
          from: user,
          to: contract,
          gas: (parseInt(gasFee) + 30000).toString(),
          gasPrice: CurrentgasPrice,
          data: encodedAbi,
        })
        .on("transactionHash", async (res: any) => {
          dispatch(
            addTransaction({
              hash: res,
              from: user,
              chainId,
              summary: `${res}`,
            })
          );
          let body = {
            txHash: txState.txHash,
            withdrawHash: res,
            finalHash: res,
          };
          await putTransactions(body);
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
          setProcessing((processing: any) => [...processing, "Completed"]);
          setStep("Completed");
          setCompleted(true);
          let body = {
            stepPoint: "0",
            challengePeriod: true,
            processExit: true,
            status: 1,
            txHash: txState.txHash,
            checkProcessExitStatus: true,
            checkChallengePeriodStatus: true,
          };
          let postResp = await putTransactions(body);
          console.log("post resp", postResp);

          setTxState({
            ...txState,
            checkpointSigned: true,
            challengePeriod: true,
            processExit: true,
            withdrawHash: res,
          });
        })
        .on("error", (res: any) => {
          console.log("posExit ", res);
          setStep("Checkpoint");
          if (res.code === 4001) {
            console.log("user denied transaction");
            setChallengePeriodCompleted(false);
          }
        });
    } catch (err: any) {
      console.log("posExit error ", err);
      setStep("Checkpoint");
      setChallengePeriodCompleted(false);
      toast.error("Something went wrong. Try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const handleStepTwo = async () => {
    if (txState?.token?.bridgetype === "pos") {
      await posExit();
    } else {
      startExitWithBurntTokens();
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="popmodal-body no-ht">
        <div className="pop-block withdraw_pop">
          <div className="pop-top">
            <hr />
            <div className="row">
              <div className="col-6">Transfer Amount</div>
              <div className="col-6 text-end">
                {+withdrawTokenInput}{" "}
                {selectedToken?.symbol ||
                  selectedToken?.key ||
                  txState?.token?.symbol ||
                  txState?.token?.key}
              </div>
            </div>
            <hr />
            <ul
              className={`stepper mt-3 del-step withdraw_steps ${
                (selectedToken && selectedToken?.bridgetype == "pos") ||
                (txState && txState?.token?.bridgetype == "pos")
                  ? "pos_view"
                  : ""
              }`}
            >
              <li
                className={`step ${
                  processing.includes("Initialized") && "active"
                }`}
              >
                <div className="step-ico">
                  <img
                    className="img-fluid"
                    src="../../assets/images/tick-yes.png"
                    alt="check-icon"
                  />
                </div>
                <div className="step-title">Initialized</div>
              </li>
              <li
                className={`step ${
                  (processing.includes("Checkpoint") ||
                    txState?.checkpointSigned) &&
                  "active"
                }`}
              >
                <div className="step-ico">
                  <img
                    className="img-fluid"
                    src="../../assets/images/tick-yes.png"
                    alt="check-icon"
                  />
                </div>
                <div className="step-title">Checkpoint</div>
              </li>
              {page === "bridge"
                ? selectedToken &&
                  selectedToken?.bridgetype === "plasma" && (
                    <li
                      className={`step ${
                        (processing.includes("Challenge Period") ||
                          txState?.challengePeriod) &&
                        "active"
                      }`}
                    >
                      <div className="step-ico">
                        <img
                          className="img-fluid"
                          src="../../assets/images/tick-yes.png"
                          alt="check-icon"
                        />
                      </div>
                      <div className="step-title">Challenge Period</div>
                    </li>
                  )
                : txState &&
                  txState?.token?.bridgetype === "plasma" && (
                    <li
                      className={`step ${
                        (processing.includes("Challenge Period") ||
                          txState?.challengePeriod) &&
                        "active"
                      }`}
                    >
                      <div className="step-ico">
                        <img
                          className="img-fluid"
                          src="../../assets/images/tick-yes.png"
                          alt="check-icon"
                        />
                      </div>
                      <div className="step-title">Challenge Period</div>
                    </li>
                  )}
              <li
                className={`step ${
                  (processing.includes("Completed") || txState?.processExit) &&
                  "active"
                }`}
              >
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
            {step == "Initialized" && (
              <>
                <div className="pop-grid flex-column align-items-center justify-content-center text-center h-75">
                  <div className="text-center ">
                    <CircularProgress
                      style={{ color: " #F28B03" }}
                      size={100}
                    />
                  </div>
                  <h5 className="pt-4 pb-2">Processing your request</h5>
                  <p className="pb-3">
                    Your transaction will be confirmed in a few seconds.
                  </p>
                  {hashLink && (
                    <a
                      href={
                        hashLink ? hashLink : txState?.txHash?.transactionHash
                      }
                      className="primary-text"
                    >
                      View on Block Explorer
                    </a>
                  )}
                </div>
              </>
            )}
            {step == "Checkpoint" && (
              <>
                {/* when checkpoints are signed */}
                {txState?.checkpointSigned || checkpointSigned ? (
                  <>
                    <div className="align-items-center flex-column justify-content-center m-3 pop-grid text-center">
                      <img
                        src="../../assets/images/check.png"
                        alt=""
                        className="img-fluid"
                        height="120"
                        width="120"
                      />
                      <h5 className="pt-4 pb-2">Checkpoint Arrived</h5>
                      <p className="pb-3">
                        Your transaction has been checkpointed on the Ethereum
                        Mainnet. Please proceed to the next transaction.
                      </p>
                      <a
                        href={getExplorerLink(
                          txState?.fromChain || chainId,
                          txState.txHash,
                          "transaction"
                        )}
                        target="_blank"
                        className="primary-text"
                      >
                        View on Block Explorer
                      </a>
                    </div>
                    <div className="pop-bottom">
                      <div>
                        <a
                          onClick={() => {
                            handleStepTwo();
                          }}
                          className={`btn primary w-100 primary-btn`}
                        >
                          Continue
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="pop-grid flex-column align-items-center justify-content-center text-center">
                    <img
                      src="../../assets/images/waiting-small.png"
                      alt=""
                      className="img-fluid"
                      height="100"
                      width="100"
                    />
                    <h5 className="pt-4 pb-2">Waiting for Checkpoint</h5>
                    <p className="pb-3 ps-2 pe-2">
                      Checkpointing creates better security on the chain.
                      Checkpointing will take from 45 minutes to 3 hours.{" "}
                    </p>
                    <a
                      href={getExplorerLink(
                        txState?.fromChain || chainId,
                        txState.txHash,
                        "transaction"
                      )}
                      target="_blank"
                      className="primary-text"
                    >
                      View on Block Explorer
                    </a>
                  </div>
                )}
              </>
            )}
            {step == "Challenge Period" && (
              <>
                {txState?.challengePeriod || challengePeriodCompleted ? (
                  <>
                    <div className="pop-grid flex-column align-items-center justify-content-center text-center">
                      <img
                        src="../../assets/images/check.png"
                        alt=""
                        className="img-fluid"
                        height="120"
                        width="120"
                      />
                      <h5 className="pt-3 pb-2">Challenge period completed</h5>
                      <p className="pb-2 ps-2 pe-2">
                        Your token is ready to move from Shibarium to Ethereum
                        Mainnet. Complete the last transaction and you're done.
                      </p>
                      <a
                        href={
                          hashLink ? hashLink : txState?.txHash?.transactionHash
                        }
                        className="primary-text"
                      >
                        View on Block Explorer
                      </a>
                    </div>
                    <div className="pop-bottom">
                      {today.isBefore(updatedAt.add(7, "days")) && (
                        <p
                          className="text-center d-flex w-100 justify-content-center align-items-center primary-text"
                          style={{ fontSize: "13px" }}
                        >
                          Your plasma bridge{" "}
                          {/* <p
                            className="primary-text ps-1 pe-1 mb-0"
                            style={{ fontSize: "14px" }}
                          > */}
                          BONE token unlocks after{" "}
                          {/* <p
                            className="primary-text ps-1 pe-1"
                            style={{ fontSize: "14px" }}
                          > */}
                          {updatedAt.add(7, "days").format("DD MMMM YYYY")}
                          {/* </p> */}
                        </p>
                      )}
                      <div>
                        <button
                          disabled={today.isBefore(updatedAt.add(7, "days"))}
                          onClick={(e) => {
                            processExit(e);
                          }}
                          className={`btn primary w-100 primary-btn`}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="pop-grid flex-column align-items-center justify-content-center text-center">
                    <div className="text-center">
                      <CircularProgress
                        style={{ color: " #F28B03" }}
                        size={100}
                      />
                    </div>
                    <div className="text-center">
                      <h5 className="pt-4 pb-2">Transaction in process</h5>
                      <p className="pb-3 ps-2 pe-2">
                        Ethereum transactions can take longer time to complete
                        based upon network congestion. Please wait or increase
                        the gas price of the transaction.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
            {step == "Completed" && (
              <>
                {txState?.processExit || completed ? (
                  <div className="pop-grid flex-column align-items-center justify-content-center text-center">
                    <img src="../../assets/images/cmpete-step.png" alt="" />
                    <h5 className="pt-4 pb-2">Transfer Is In Progress</h5>
                    <p className="pb-3 ps-2 pe-2">
                      Your transfer is in Progress and in the Queue, It will
                      take Up To 7 Days to get Completed.
                    </p>
                    <a
                      href={
                        hashLink ? hashLink : txState?.txHash?.transactionHash
                      }
                      className="primary-text"
                    >
                      View on Block Explorer
                    </a>
                  </div>
                ) : (
                  <div className="pop-grid flex-column align-items-center justify-content-center text-center">
                    <div className="text-center">
                      <CircularProgress
                        style={{ color: " #F28B03" }}
                        size={100}
                      />
                    </div>
                    <div className="text-center">
                      <h5 className="pt-4 pb-2">Transaction in process</h5>
                      <p className="pb-3 ps-2 pe-2">
                        Ethereum transactions can take longer time to complete
                        based upon network congestion. Please wait or increase
                        the gas price of the transaction.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StepThree;

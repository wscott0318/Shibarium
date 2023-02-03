import { NETWORK_ICON, NETWORK_LABEL } from "app/config/networks";
import { useActiveWeb3React } from "app/services/web3";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { ChainId } from "shibarium-get-chains";
import {
    currentGasPrice,
    getAllowanceAmount,
    tokenDecimal,
    USER_REJECTED_TX,
} from "web3/commonFunctions";
import { dynamicChaining } from "web3/DynamicChaining";
import CommonModal from "../CommonModel";
import ERC20 from "../../../ABI/ERC20Abi.json";
import * as Sentry from "@sentry/nextjs";
import Web3 from "web3";
import { useAppDispatch } from "app/state/hooks";
import fromExponential from "from-exponential";
import withdrawManagerABI from "../../../ABI/withdrawManagerABI.json";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import { Check, X } from "react-feather";
import Loader from "app/components/Loader";
import { PUPPYNET517 } from "app/hooks/L1Block";
import { startBurn, burnStatus } from "../../../exit/burn";
import useLocalStorageState from "use-local-storage-state";
import StepThree from "./StepThree";

const WithdrawModal: React.FC<{
    page: string;
    dWState: boolean;
    setWithdrawModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedToken: any;
    withdrawTokenInput: any;
    boneUSDValue: any;
    show: any;
}> = ({
    page,
    dWState,
    setWithdrawModalOpen,
    selectedToken,
    withdrawTokenInput,
    boneUSDValue,
    show,
}) => {
        const { chainId = 1, account, library } = useActiveWeb3React();
        const lib: any = library;
        const web3: any = new Web3(lib?.provider);
        const webL2: any = PUPPYNET517();
        const dispatch = useAppDispatch();
        const [showWithdrawModal, setWithdrawModal] = useState(true);
        const [hashLink, setHashLink] = useState("");
        const [amountApproval, setAmountApproval] = useState(false);
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

        const callWithdrawContract = async () => {
            try {
                if (account) {
                    setButtonLoader(true);
                    setWidModState({
                        ...withModalState,
                        step2: false,
                        step3: true,
                        title: "Transaction Pending",
                    });
                    setStep("Initialized");
                    submitWithdraw();
                }
            } catch (err: any) {
                if (err.code !== USER_REJECTED_TX) {
                    Sentry.captureMessage("callDepositContract", err);
                }
            }
        };

        const submitWithdraw = async () => {
            try {
                setHashLink("");
                setButtonLoader(false);
                let user: any = account;
                let burn = await startBurn(
                    selectedToken?.bridgetype,
                    selectedToken?.childContract,
                    user,
                    withdrawTokenInput
                );
                // let burn: boolean = false;
                // setTimeout(() => {
                //     burn = true;
                if (burn) {
                    setProcessing((processing: any) => [...processing, "Initialized"]);
                    let link = `https://shibascan-517.hailshiba.com/tx/${burn}`;
                    setHashLink(link);
                    setStep("Checkpoint");
                    setTxState({
                        checkpointSigned: false,
                        challengePeriod: false,
                        processExit: false,
                        amount: withdrawTokenInput,
                        token: selectedToken,
                        txHash: burn,
                    });
                }
                // }, 3000);

            } catch (err: any) {
                if (err.code !== USER_REJECTED_TX) {
                    Sentry.captureMessage("submitWithdraw ", err);
                }
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
                setWithdrawModal(false);
                setStep("Initialized");
                setProcessing([]);
                // console.log("error =>> ", err);
            }
        };

        const getBurnStatus = async (txHash: any) => {
            let status = await burnStatus(txState?.token?.bridgetype, txHash);
            console.log("status ", status);
            if (status) {
                setProcessing((processing: any) => [...processing, "Checkpoint"]);
                setTxState({ ...txState, checkpointSigned: true });
                setCheckpointSigned(true);
            }
        };

        const estGasFee = async () => {
            setAmountApproval(false);
            setEstGas(0);
            let user: any = account;
            const amountWei = web3.utils.toBN(
                fromExponential(+withdrawTokenInput * Math.pow(10, 18))
            );
            let allowance =
                (await getAllowanceAmount(
                    library,
                    dynamicChaining[chainId].BONE,
                    account,
                    dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY
                )) || 0;
            let currentprice: any = await currentGasPrice(web3);
            // console.log("allowance", allowance);
            if (+allowance < +withdrawTokenInput) {
                let approvalInstance = new web3.eth.Contract(
                    ERC20,
                    dynamicChaining[chainId].BONE
                );
                await approvalInstance.methods
                    .approve(dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY, amountWei)
                    .estimateGas({ from: user })
                    .then((gas: any) => {
                        setAllowance(+(+gas * +currentprice) / Math.pow(10, 18));
                    }).catch((err:any)=>console.log(err));
            }
            let instance = new web3.eth.Contract(
                withdrawManagerABI,
                dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY
            );

            await instance.methods
                .processExits(dynamicChaining[chainId].BONE)
                .estimateGas({ from: user })
                .then((gas: any) => {
                    let gasFee = (+gas * +currentprice) / Math.pow(10, 18);
                    setEstGas(+gasFee);
                    setLoader(false);
                })
                .catch((err: any) => {
                    console.log(err);
                });
        };

        useEffect(() => {
            if (page == "tx") {
                let tempStep: any;
                let process: any;
                if (txState?.token?.bridgetype == "plasma") {
                    tempStep = txState?.processExit
                        ? "Completed"
                        : txState?.challengePeriod
                            ? "Challenge Period"
                            : "Checkpoint";
                    process = ["Initialized", "Checkpoint", "Challenge Period", "Completed"];
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
                if (tempStep == "Checkpoint") {
                    getBurnStatus(txState?.txHash);
                } else if (tempStep == "Challenge Period") {
                    setChallengePeriodCompleted(true);
                }
            }
        }, []);

        const imageOnErrorHandler = (
            event: React.SyntheticEvent<HTMLImageElement, Event>
        ) => {
            event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
            event.currentTarget.className = "error me-3";
        };

        return (
            <CommonModal
                title={withModalState.title}
                show={show}
                setshow={() => {
                    setWithdrawModal(false);
                    setWithdrawModalOpen(false);
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
                                                            Moving funds from Puppy Net to Goerli
                                                        </h6>
                                                        <p className="text-sm">
                                                            Here you can move frunds from the Puppy Net network
                                                            to Goerli network on the Puppy Net Chain. This will
                                                            take 20-30 minutes.
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
                                                        width="22"
                                                        height="22"
                                                        src="../../assets/images/shib-logo.png"
                                                        alt=""
                                                    />
                                                    <p className="ps-2">Withdrawal Initialized</p>
                                                </div>
                                                <div className="col-5 text-end">
                                                    <small className="text-lg">~ </small>
                                                    <NumberFormat
                                                        thousandSeparator
                                                        displayType={"text"}
                                                        prefix="$"
                                                        value={0}
                                                    />
                                                </div>
                                            </div>
                                            {allowance > 0 && (
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
                                                            onError={imageOnErrorHandler}
                                                            alt=""
                                                        />
                                                        <p className="ps-2">Confirm Withdrawal</p>
                                                    </div>
                                                    <div className="col-5 d-flex align-items-center justify-content-end">
                                                        {loader ? (
                                                            <Loader />
                                                        ) : (
                                                            <>
                                                                <small className="text-lg">~ </small>
                                                                <NumberFormat
                                                                    thousandSeparator
                                                                    displayType={"text"}
                                                                    prefix="$"
                                                                    value={(allowance * boneUSDValue).toFixed(3)}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
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
                                                            <small className="text-lg">~ </small>
                                                            <NumberFormat
                                                                thousandSeparator
                                                                displayType={"text"}
                                                                prefix="$"
                                                                value={(estGas * boneUSDValue).toFixed(3)}
                                                            />
                                                        </>
                                                    )}
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
                                                            step1: false,
                                                            step2: true,
                                                            title: "Confirm Transfer",
                                                        });
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
                                                        {withdrawTokenInput + " " + selectedToken.parentName}
                                                    </h6>
                                                    <p>
                                                        <NumberFormat
                                                            thousandSeparator
                                                            displayType={"text"}
                                                            prefix="$ "
                                                            value={(
                                                                (+withdrawTokenInput || 0) * boneUSDValue
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
                                                        }
                                                    </p>
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
                                                            width="22"
                                                            height="22"
                                                            src={
                                                                selectedToken.logo
                                                                    ? selectedToken.logo
                                                                    : "../../assets/images/eth.png"
                                                            }
                                                            onError={imageOnErrorHandler}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p>{NETWORK_LABEL[chainId]}</p>
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
                                                    className={` d-flex align-items-center justify-content-center btn primary-btn w-100 relative ${buttonloader && "disabled btn-disabled"
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
                                            setProcessing,
                                            setStep,
                                            step,
                                            withdrawTokenInput,
                                            page,
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
                                    step,
                                    withdrawTokenInput,
                                    setChallengePeriodCompleted,
                                    setHashLink,
                                    completed,
                                    setCompleted,
                                    page,
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

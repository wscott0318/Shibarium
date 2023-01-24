import { NETWORK_ICON, NETWORK_LABEL } from 'app/config/networks';
import { useActiveWeb3React } from 'app/services/web3';
import React, { useState } from 'react'
import NumberFormat from 'react-number-format';
import { ChainId } from 'shibarium-get-chains';
import { currentGasPrice, getAllowanceAmount, tokenDecimal, USER_REJECTED_TX } from 'web3/commonFunctions';
import { dynamicChaining } from 'web3/DynamicChaining';
import CommonModal from './CommonModel'
import ERC20 from "../../ABI/ERC20Abi.json";
import * as Sentry from "@sentry/nextjs";
import Web3 from 'web3';
import { SUPPORTED_NETWORKS } from "app/modals/NetworkModal";
import { useAppDispatch } from 'app/state/hooks';
import fromExponential from 'from-exponential';
import { addTransaction, finalizeTransaction } from 'app/state/transactions/actions';
import { getExplorerLink } from 'app/functions';
import withdrawManagerABI from "../../ABI/withdrawManagerABI.json";
import l2withdrawABI from "../../ABI/l2withdrawABI.json";
import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import { Check, X } from 'react-feather';
import Loader from 'app/components/Loader';
import { PUPPYNET517 } from 'app/hooks/L1Block';
import { Spinner } from 'react-bootstrap';
import { CircularProgress } from '@material-ui/core';
// @ts-ignore TYPE NEEDS FIXING
import cookie from 'cookie-cutter'
import {startBurn} from "../../exit/burn";

const WithdrawModal: React.FC<{
    dWState: boolean,
    setWithdrawModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedToken: any,
    withdrawTokenInput: any,
    boneUSDValue: any,
    show: any
}> = ({
    dWState,
    setWithdrawModalOpen,
    selectedToken,
    withdrawTokenInput,
    boneUSDValue, show }) => {
        const { chainId = 1, account, library } = useActiveWeb3React();
        const lib: any = library;
        const web3: any = new Web3(lib?.provider);
        const webL2: any = PUPPYNET517();
        const dispatch = useAppDispatch();
        const [showWithdrawModal, setWithdrawModal] = useState(true);
        const [hashLink, setHashLink] = useState("");
        const [amountApproval, setAmountApproval] = useState(false);
        const [allowance, setAllowance] = useState(0);
        const [loader, setLoader] = useState(true);
        const [estGas, setEstGas] = useState<any>(0);
        const [processing, setProcessing] = useState<any>([]);
        const [step, setStep] = useState<any>();
        const [checkpointSigned, setCheckpointSigned] = useState(true);
        const [challengePeriodCompleted, setChallengePeriodCompleted] = useState(true);
        const [buttonloader, setButtonLoader] = useState(false);
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
        
        const switchNetwork = async () => {
            let key = chainId == ChainId.GÖRLI ? ChainId.PUPPYNET517 : ChainId.GÖRLI;
            console.debug(`Switching to chain ${key}`, SUPPORTED_NETWORKS[key])
            const params = SUPPORTED_NETWORKS[key]
            cookie.set('chainId', key, params)
            try {
                await library?.send('wallet_switchEthereumChain', [{ chainId: `0x${key.toString(16)}` }, account])
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                // @ts-ignore TYPE NEEDS FIXING
                if (switchError.code === 4902) {
                    try {
                        console.log({ params, account });
                        await library?.send('wallet_addEthereumChain', [params, account])
                    } catch (addError) {
                        // handle "add" error
                        console.error(`Add chain error ${addError}`)
                    }
                }
                console.error(`Switch chain error ${switchError}`)
                // handle other "switch" errors
            }
        }

        const callWithdrawContract = async () => {
            try {
                if (account) {
                    setButtonLoader(true);
                    console.log("approve amount entered");
                    let allowance =
                        (await getAllowanceAmount(
                            library,
                            dynamicChaining[chainId].BONE,
                            account,
                            dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY
                        )) || 0;
                    console.log("step 2");
                    if (+withdrawTokenInput > +allowance) {
                        console.log("step 3");
                        approveWithdraw();
                    }
                    else {
                        await switchNetwork();
                        setWidModState({ ...withModalState, step2: false, step3: true, title: "Transaction Pending" });
                        setStep("Initialized");
                        setProcessing((processing: any) => [...processing, "Initialized"])
                        // setTimeout(() => { 
                            submitWithdraw() 
                        // }, 3000);
                        
                    }
                }
            } catch (err: any) {
                if (err.code !== USER_REJECTED_TX) {
                    Sentry.captureMessage("callDepositContract", err);
                }

            }
        };
        console.log("selected token" , selectedToken)
        const approveWithdraw = async () => {
            try {
                console.log("step 5");
                if (account) {
                    let user = account;
                    let amount = web3.utils.toBN(fromExponential(+withdrawTokenInput * Math.pow(10, 18)));
                    let instance = new web3.eth.Contract(ERC20, dynamicChaining[chainId].BONE);
                    let gasFee = await instance.methods.approve(dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY, amount).estimateGas({ from: user })
                    let encodedAbi = await instance.methods.approve(dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY, amount).encodeABI()
                    let CurrentgasPrice: any = await currentGasPrice(web3)
                    await web3.eth.sendTransaction({
                        from: user,
                        to: dynamicChaining[chainId].BONE,
                        gas: (parseInt(gasFee) + 30000).toString(),
                        gasPrice: CurrentgasPrice,
                        data: encodedAbi
                    })
                        .on('transactionHash', (res: any) => {
                            dispatch(
                                addTransaction({
                                    hash: res,
                                    from: user,
                                    chainId,
                                    summary: `${res}`,
                                })
                            )
                            let link = getExplorerLink(chainId, res, 'transaction')
                            setHashLink(link)
                        }).on('receipt', async (res: any) => {
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
                                        status: 1
                                    }
                                })
                            )
                            submitWithdraw();
                        })
                }
            } catch (err: any) {
                Sentry.captureMessage("approvewithdraw ", err);
            }

        }
        const contract = "0x0000000000000000000000000000000000001010";
        const submitWithdraw = async () => {
            try {
                setHashLink("");
                setButtonLoader(false);
                console.log("step 6");
                let user: any = account;
                const amountWei = web3.utils.toBN(
                    fromExponential(+withdrawTokenInput * Math.pow(10, 18))
                );
                // startBurn(selectedToken?.type , selectedToken?.parentContract, user, amountWei);
                let instance = new webL2.eth.Contract(
                    l2withdrawABI,
                    contract
                );
                console.log("submit Withdraw ", instance);
                // setTimeout(() => {
                // setStep("Checkpoint");
                // setProcessing((processing:any) => [...processing, "Checkpoint"])
                // }, 4000);
                // instance.methods
                //     .withdraw(amountWei)
                //     .send({ from: account })
                //     .on("transactionHash", (res: any) => {
                //         dispatch(
                //             addTransaction({
                //                 hash: res,
                //                 from: user,
                //                 chainId,
                //                 summary: `${res}`,
                //             })
                //         );
                //         let link = getExplorerLink(chainId, res, "transaction");
                //         setHashLink(link);
                //         setStep("Checkpoint");
                //         setProcessing((processing: any) => [...processing, "Checkpoint"])
                //     })
                //     .on("receipt", (res: any) => {
                //         dispatch(
                //             finalizeTransaction({
                //                 hash: res.transactionHash,
                //                 chainId,
                //                 receipt: {
                //                     to: res.to,
                //                     from: res.from,
                //                     contractAddress: res.contractAddress,
                //                     transactionIndex: res.transactionIndex,
                //                     blockHash: res.blockHash,
                //                     transactionHash: res.transactionHash,
                //                     blockNumber: res.blockNumber,
                //                     status: 1,
                //                 },
                //             })
                //         );
                //         setWidModState({
                //             step0: false,
                //             step1: false,
                //             step2: false,
                //             step3: false,
                //             step4: false,
                //             step5: true,
                //             step6: false,
                //             title: "Processing Transfer",
                //         });
                //     })
                //     .on("error", (res: any) => {
                //         if (res.code === 4001) {
                //             setWidModState({
                //                 step0: true,
                //                 step1: false,
                //                 step2: false,
                //                 step3: false,
                //                 step4: false,
                //                 step5: false,
                //                 step6: false,
                //                 title: "Initialize Withdraw",
                //             });
                //             setWithdrawModal(false);
                //         }
                //     });

            }
            catch (err: any) {
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
                console.log("error =>> ", err)
            }
        }

        const startExitWillBuntTokens = async () => {
            // switch network to Goerli chain
            await switchNetwork();
            setTimeout(() => {
                setProcessing((processing: any) => [...processing, "Challenge Period"])
                setStep("Challenge Period");
            }, 4000);
        }

        const processExit = () => {
            setTimeout(() => {
                setProcessing((processing: any) => [...processing, "Completed"])
                setStep("Completed");
            }, 4000);
        }

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
            console.log("allowance", allowance);
            if (+allowance < +withdrawTokenInput) {
                let approvalInstance = new web3.eth.Contract(ERC20, dynamicChaining[chainId].BONE);
                await approvalInstance.methods.approve(dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY, amountWei).estimateGas({ from: user }).then((gas: any) => {
                    setAllowance(+(+gas * +currentprice) / Math.pow(10, 18));
                })
            }
            let instance = new web3.eth.Contract(
                withdrawManagerABI,
                dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY
            )

            await instance.methods.processExits(dynamicChaining[chainId].BONE).estimateGas({ from: user })
                .then(async (gas: any) => {
                    let gasFee = (+gas * +currentprice) / Math.pow(10, 18);
                    setEstGas(+gasFee);
                    setLoader(false);
                }).catch((err: any) => {
                    console.log(err);
                })
        }

        const imageOnErrorHandler = (
            event: React.SyntheticEvent<HTMLImageElement, Event>
        ) => {
            event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
            event.currentTarget.className = "error me-3";
        };
        console.log("processing array", processing);
        console.log("step", step);
        return (
            <CommonModal
                title={withModalState.title}
                show={show}
                setshow={() => { setWithdrawModal(false); setWithdrawModalOpen(false) }}
                externalCls="dark-modal-100 bridge-ht2"
            >
                {/* Withdraw tab popups start */}
                <>
                    {/* note popup start*/}
                    {!dWState && withModalState.step0 && (
                        <div className="popmodal-body no-ht">
                            <div className="pop-block withdraw_pop">
                                <div className="pop-top">
                                    <div className="inner-top p-2">
                                        <h4 className="text-md ff-mos pb-3">What isn't possible</h4>
                                        <div className="row">
                                            <div className="col-1"><X style={{ background: "red", borderRadius: "50px", padding: "2px" }} /> </div>
                                            <div className="col-11">
                                                <h6 className="text-sm ff-mos pb-1">Cancelling any withdraw</h6>
                                                <p className="text-sm">You cannot cancel a withdrawal once you have begun the process.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inner-top p-2">
                                        <h4 className="text-md ff-mos pb-3">What's possible</h4>
                                        <div className="row">
                                            <div className="col-1"><Check style={{ background: "green", borderRadius: "50px", padding: "2px" }} /> </div>
                                            <div className="col-11">
                                                <h6 className="text-sm ff-mos pb-1">Moving funds from Puppy Net to Goerli</h6>
                                                <p className="text-sm">Here you can move frunds from the Puppy Net network to Goerli network on the Puppy Net Chain. This will take 20-30 minutes.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pop-bottom">
                                    <div>
                                        <a
                                            className="btn primary-btn w-100"
                                            onClick={() => { setWidModState({ ...withModalState, step0: false, step1: true, title: "Transfer Overview" }); estGasFee(); }}
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
                            <div className="backDepState" onClick={() => {
                                setWidModState({ ...withModalState, step0: true, step1: false, title: "Please Note" }); estGasFee();
                            }}><ArrowCircleLeftIcon /></div>
                            <div className="pop-block">
                                <div className="pop-top">
                                    <div className="border-2 rounded-circle d-flex align-item-center justify-content-center p-3 w-25 m-auto" style={{ borderColor: "#F28B03" }}>
                                        <img width="80" src="../../assets/images/gas-station.png" alt="" />
                                    </div>
                                    <div className="text-center">
                                        <h4 className="ff-mos fs-6 pt-4">Withdrawal process for Proof of Stake consists of 2 transactions</h4>
                                        <p className="text-sm pt-1">Estimated total gas required for these transactions.</p>
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
                                        <div className="col-5 text-end"><small className="text-lg">~ </small><NumberFormat thousandSeparator displayType={"text"} prefix='$' value={0} />
                                        </div>
                                    </div>
                                    {allowance > 0 && <div className="row pt-3">
                                        <div className="col-7 d-flex align-items-center">
                                            <img
                                                className="img-fluid"
                                                width="22"
                                                height="22"
                                                src={
                                                    (selectedToken?.logo || selectedToken?.logoURI)
                                                        ? (selectedToken?.logo || selectedToken?.logoURI)
                                                        : "../../assets/images/eth.png"
                                                }
                                                onError={imageOnErrorHandler}
                                                alt=""
                                            />
                                            <p className="ps-2">Confirm Withdrawal</p>
                                        </div>
                                        <div className="col-5 d-flex align-items-center justify-content-end">
                                            {loader ? <Loader /> :
                                                <>
                                                    <small className="text-lg">~ </small>
                                                    <NumberFormat thousandSeparator displayType={"text"} prefix='$' value={(allowance * boneUSDValue).toFixed(6)} />
                                                </>
                                            }
                                        </div>
                                    </div>}
                                    <div className="row pt-2">
                                        <div className="col-7 d-flex align-items-center">
                                            <img
                                                className="img-fluid"
                                                width="22"
                                                height="22"
                                                src={
                                                    (selectedToken?.logo || selectedToken?.logoURI)
                                                        ? (selectedToken?.logo || selectedToken?.logoURI)
                                                        : "../../assets/images/eth.png"
                                                }
                                                onError={imageOnErrorHandler}
                                                alt=""
                                            />
                                            <p className="ps-2">Withdrawal Complete</p>
                                        </div>
                                        <div className="col-5 d-flex align-items-center justify-content-end">
                                            {loader ? <Loader /> :
                                                <>
                                                    <small className="text-lg">~ </small>
                                                    <NumberFormat thousandSeparator displayType={"text"} prefix='$' value={(estGas * boneUSDValue).toFixed(6)} />
                                                </>}
                                        </div>
                                    </div>
                                </div>
                                <div className="pop-bottom">
                                    <div>
                                        <a
                                            className="btn primary-btn w-100"
                                            onClick={() => { setWidModState({ ...withModalState, step1: false, step2: true, title: "Confirm Transfer" }); }}
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
                            <div className="backDepState" onClick={() => {
                                setWidModState({ ...withModalState, step1: true, step2: false, title: "Transfer Overview" });
                                estGasFee();
                            }}><ArrowCircleLeftIcon /></div>
                            <div className="pop-block withdraw_pop">
                                <div className="pop-top">
                                    <div className="mt-0 cnfrm_box dark-bg">
                                        <div className="top_overview col-12">
                                            <span>
                                                <img
                                                    className="img-fluid"
                                                    src={selectedToken.logo ? selectedToken.logo : "../../assets/images/red-bone.png"}
                                                    onError={imageOnErrorHandler}
                                                    alt=""
                                                />
                                            </span>
                                            <h6>
                                                {withdrawTokenInput + " " + selectedToken.parentName}
                                            </h6>
                                            <p><NumberFormat
                                                thousandSeparator
                                                displayType={"text"}
                                                prefix="$ "
                                                value={(
                                                    (+withdrawTokenInput || 0) * boneUSDValue
                                                ).toFixed(tokenDecimal)}
                                            /></p>
                                        </div>
                                    </div>
                                    <div className="pop-grid">
                                        <div className="text-center box-block">
                                            <div className="d-inline-block img-flexible">
                                                <img
                                                    className="img-fluid"
                                                    src={NETWORK_ICON[chainId == ChainId.GÖRLI ? ChainId.PUPPYNET517 : ChainId.GÖRLI]}
                                                    onError={imageOnErrorHandler}
                                                    alt=""
                                                />
                                            </div>
                                            <p>{NETWORK_LABEL[chainId == ChainId.GÖRLI ? ChainId.PUPPYNET517 : ChainId.GÖRLI]}</p>
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
                                                <NumberFormat thousandSeparator displayType={"text"} prefix='$' value={(estGas * boneUSDValue).toFixed(6)} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pop-bottom">
                                    <div>
                                        <a
                                            className={`btn primary-btn w-100 relative ${buttonloader && "disabled btn-disabled"}`}
                                            onClick={() => {
                                                callWithdrawContract();
                                            }}
                                        >
                                            {buttonloader && <span className="spinner-border text-secondary pop-spiner fix_spinner"></span>}
                                            <span>Continue</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Initialize withdraw popup end */}

                    {/* Reaching checkpoint popup start */}
                    {withModalState.step3 && !dWState && (
                        <>
                            <div className="popmodal-body no-ht">
                                <div className="pop-block withdraw_pop">
                                    <div className="pop-top">
                                        <hr />
                                        <div className='row'>
                                            <div className="col-6">Transfer Amount</div>
                                            <div className="col-6 text-end">{+withdrawTokenInput}{" "}{selectedToken?.symbol || selectedToken?.key}</div>
                                        </div>
                                        <hr />
                                        <ul className="stepper mt-3 del-step withdraw_steps">
                                            <li className={`step ${(processing.includes("Initialized")) && "active"}`}>
                                                <div className="step-ico">
                                                    <img
                                                        className="img-fluid"
                                                        src="../../assets/images/tick-yes.png"
                                                        alt="check-icon"
                                                    />
                                                </div>
                                                <div className="step-title">Initialized</div>
                                            </li>
                                            <li className={`step ${(processing.includes("Checkpoint")) && "active"}`}>
                                                <div className="step-ico">
                                                    <img
                                                        className="img-fluid"
                                                        src="../../assets/images/tick-yes.png"
                                                        alt="check-icon"
                                                    />
                                                </div>
                                                <div className="step-title">Checkpoint</div>
                                            </li>
                                            <li className={`step ${(processing.includes("Challenge Period")) && "active"}`}>
                                                <div className="step-ico">
                                                    <img
                                                        className="img-fluid"
                                                        src="../../assets/images/tick-yes.png"
                                                        alt="check-icon"
                                                    />
                                                </div>
                                                <div className="step-title">Challenge Period</div>
                                            </li>
                                            <li className={`step ${(processing.includes("Completed")) && "active"}`}>
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
                                        {step == "Initialized" &&
                                            <>
                                                <div className="pop-grid flex-column align-items-center justify-content-center text-center h-75">
                                                    <div className='text-center '>
                                                        <CircularProgress style={{ color: " #F28B03" }} size={100} />
                                                    </div>
                                                    <h5 className='pt-4 pb-2'>Processing your request</h5>
                                                    <p className='pb-3'>Your transaction will be confirmed in a few seconds.</p>
                                                    {hashLink &&
                                                        <a href={hashLink} className="primary-text">
                                                            View on Block Explorer
                                                        </a>}
                                                </div>
                                            </>
                                        }
                                        {step == "Checkpoint" &&
                                            <>
                                                {/* when checkpoints are signed */}
                                                {checkpointSigned ?
                                                    <>
                                                        <div className="align-items-center flex-column justify-content-center m-3 pop-grid text-center">
                                                            <img src="../../assets/images/check.png" alt="" className='img-fluid' height="120" width="120" />
                                                            <h5 className='pt-4 pb-2'>Checkpoint Arrived</h5>
                                                            <p className='pb-3'>Your transaction has been checkpointed on the Goerli network. Please proceed to the next transaction.</p>
                                                            <a href={hashLink} className="primary-text">
                                                                View on Block Explorer
                                                            </a>
                                                        </div>
                                                        <div className="pop-bottom">
                                                            <div>
                                                                <a onClick={() => { startExitWillBuntTokens() }}
                                                                    className={`btn primary w-100 primary-btn`}
                                                                    href="javascript:void(0)">Continue</a>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <div className="pop-grid flex-column align-items-center justify-content-center text-center">
                                                        <img src="../../assets/images/waiting-small.png" alt="" className='img-fluid' height="120" width="120" />
                                                        <h5 className='pt-4 pb-2'>Waiting for Checkpoint</h5>
                                                        <p className='pb-3 ps-2 pe-2'>Checkpointing creates better security on the chain. Checkpointing will take from 45 minutes to 3 hours. </p>
                                                        <a href={hashLink} className="primary-text">
                                                            View on Block Explorer
                                                        </a>
                                                    </div>
                                                }

                                            </>
                                        }
                                        {step == "Challenge Period" &&
                                            <>
                                                {challengePeriodCompleted ?
                                                    <>
                                                        <div className='pop-grid flex-column align-items-center justify-content-center text-center'>
                                                            <img src="../../assets/images/check.png" alt="" className='img-fluid' height="120" width="120" />
                                                            <h5 className='pt-3 pb-2'>Challenge period completed</h5>
                                                            <p className='pb-2 ps-2 pe-2'>Your token is ready to move from Puppy Net to Goerli Network. Complete the last transaction and you're done.</p>
                                                            <a href={hashLink} className="primary-text">
                                                                View on Block Explorer
                                                            </a>
                                                        </div>
                                                        <div className="pop-bottom">
                                                            <div>
                                                                <a onClick={() => { processExit() }}
                                                                    className={`btn primary w-100 primary-btn`}
                                                                    href="javascript:void(0)">Continue</a>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <div className='pop-grid flex-column align-items-center justify-content-center text-center'>
                                                        <div className='text-center'>
                                                            <CircularProgress style={{ color: " #F28B03" }} size={100} />
                                                        </div>
                                                        <div className='text-center'>
                                                            <h5 className='pt-4 pb-2'>Transaction in process</h5>
                                                            <p className='pb-3 ps-2 pe-2'>Goerli transactions can take longer time to complete based upon network congestion. Please wait or increase the gas price of the transaction.</p>
                                                        </div>
                                                    </div>}
                                            </>
                                        }
                                        {step == "Completed" &&
                                            <>
                                                <div className='pop-grid flex-column align-items-center justify-content-center text-center'>
                                                    <img src="../../assets/images/cmpete-step.png" alt="" />
                                                    <h5 className='pt-4 pb-2'>Transfer completed successfully</h5>
                                                    <p className='pb-3 ps-2 pe-2'>Your transfer is completed successfully.</p>
                                                    <a href={hashLink} className="primary-text">
                                                        View on Block Explorer
                                                    </a>
                                                </div>
                                            </>
                                        }


                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {/* Reaching checkpoint  popup end */}

                    {/* checkpoint Reached popup start */}
                    {withModalState.step4 && !dWState && (
                        <div className="popmodal-body no-ht">
                            <div className="pop-block withdraw_pop">
                                <div className="pop-top">
                                    <div className="cnfrm_box dark-bg">
                                        <div className="top_overview col-12">
                                            <span>
                                                <img
                                                    className="img-fluid"
                                                    src="../../assets/images/red-bone.png"
                                                    alt=""
                                                />
                                            </span>
                                            <h6>
                                                {withdrawTokenInput + " " + selectedToken.parentName}
                                            </h6>
                                            <p><NumberFormat
                                                thousandSeparator
                                                displayType={"text"}
                                                prefix="$ "
                                                value={(
                                                    (+withdrawTokenInput || 0) * boneUSDValue
                                                ).toFixed(tokenDecimal)}
                                            /></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pop-bottom">
                                    <div className="text-center text-section">
                                        <h4 className="pop-hd-md" style={{ color: "var(--bs-orange)" }}>Complete Withdraw</h4>
                                        <p>
                                            You need to confirm one more transaction to get your
                                            funds in your Ethereum Account.
                                        </p>
                                    </div>
                                    <div>
                                        <a
                                            className="btn primary-btn w-100"
                                            onClick={() =>
                                                setWidModState({
                                                    step0: false,
                                                    step1: false,
                                                    step2: false,
                                                    step3: false,
                                                    step4: false,
                                                    step5: true,
                                                    step6: false,
                                                    title: "Complete Withdraw",
                                                })
                                            }
                                        >
                                            Confirm
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* checkpoint Reached popup end */}

                    {/* Complete withdraw popup start */}
                    {withModalState.step5 && !dWState && (
                        <div className="popmodal-body no-ht">
                            <div className="pop-block withdraw_pop">
                                <div className="pop-top">
                                    <div className="cnfrm_box dark-bg">
                                        <div className="top_overview col-12">
                                            <span>
                                                <img
                                                    className="img-fluid"
                                                    src="../../assets/images/red-bone.png"
                                                    alt=""
                                                />
                                            </span>
                                            <h6>
                                                {withdrawTokenInput + " " + selectedToken.parentName}
                                            </h6>
                                            <p><NumberFormat
                                                thousandSeparator
                                                displayType={"text"}
                                                prefix="$ "
                                                value={(
                                                    (+withdrawTokenInput || 0) * boneUSDValue
                                                ).toFixed(tokenDecimal)}
                                            /></p>
                                        </div>
                                    </div>
                                    <div className="pop-grid">
                                        <div className="text-center box-block">
                                            <div className="d-inline-block">
                                                <img
                                                    className="img-fluid"
                                                    src="../../assets/images/etharium.png"
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
                                            <div className="d-inline-block">
                                                <img
                                                    className="img-fluid"
                                                    src="../../assets/images/etharium.png"
                                                    alt=""
                                                />
                                            </div>
                                            <p>Wallet X25654a5</p>
                                        </div>
                                    </div>
                                    {/* <div className="amt-section position-relative">
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            src="../../assets/images/eth.png"
                            alt=""
                          />
                        </div>
                        <p>Estimation of GAS fee required</p>
                      </div>
                      <div>
                        <p className="fw-bold">$20.00</p>
                      </div>
                    </div> */}
                                </div>
                                <div className="pop-bottom">
                                    <div className="text-section">
                                        <h4 className="pop-hd-md">Withdrawing funds</h4>
                                        <p>Moving funds to your {NETWORK_LABEL[chainId]} Account.</p>
                                    </div>
                                    <div>
                                        <a
                                            onClick={() =>
                                                setWidModState({
                                                    step0: false,
                                                    step1: false,
                                                    step2: false,
                                                    step3: false,
                                                    step4: true,
                                                    step5: false,
                                                    step6: false,
                                                    title: "Withdraw Complete",
                                                })
                                            }
                                            className="btn grey-btn w-100"
                                            href="javascript:void(0)"
                                        >
                                            <span className="spinner-border text-secondary pop-spiner"></span>
                                            <span>Moving funds</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Complete withdraw popup end */}

                    {/* withdraw complete popup start */}
                    {withModalState.step6 && !dWState && (
                        <div className="popmodal-body no-ht">
                            <div className="pop-block withdraw_pop">
                                <div className="pop-top">
                                    <div className="cnfrm_box dark-bg">
                                        <div className="top_overview col-12">
                                            <span>
                                                <img
                                                    className="img-fluid"
                                                    src="../../assets/images/red-bone.png"
                                                    alt=""
                                                />
                                            </span>
                                            <h6>100 SHIB</h6>
                                            <p>500.00$</p>
                                        </div>
                                    </div>
                                    <div className="pop-action">
                                        <a
                                            className="btn primary-btn w-100"
                                            href="javascript:void(0)"
                                        >
                                            TRANSFER COMPLETE
                                        </a>
                                    </div>
                                </div>

                                <div className="myTipsArea">Tip: Custom tokens are stored locally in your browser </div>

                            </div>
                            <div className="pop-bottom">
                                <div className="text-section">
                                    <h4 className="pop-hd-md">Transaction Completed</h4>
                                    <p className="lite-color">
                                        Transaction completed succesfully. Your Ethereum wallet
                                        Balance will be updated in few minute. In case of
                                        problems contact our{" "}
                                        <a
                                            title="Support"
                                            href="javascript:void(0);"
                                            className="orange-txt"
                                        >
                                            Support.
                                        </a>
                                    </p>
                                </div>
                                <div>
                                    <a
                                        className="btn primary-btn w-100"
                                        onClick={() => setWithdrawModal(false)}
                                    >
                                        View on Shibascan
                                    </a>
                                </div>
                            </div>
                        </div>

                    )}
                    {/* withdraw complete popup start */}
                </>
                {/* Withdraw tab popups end */}
            </CommonModal >
        )
    }

export default WithdrawModal
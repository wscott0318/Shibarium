import { useActiveWeb3React } from 'app/services/web3';
import fromExponential from 'from-exponential';
import React, { useState } from 'react'
import Web3 from 'web3';
import { currentGasPrice, getAllowanceAmount, tokenDecimal, USER_REJECTED_TX } from 'web3/commonFunctions';
import { dynamicChaining } from 'web3/DynamicChaining';
import CommonModal from '../CommonModel';
import ERC20 from "../../../ABI/ERC20Abi.json";
import depositManagerABI from "../../../ABI/depositManagerABI.json";
import { X, Check } from "react-feather";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import { NETWORK_ICON, NETWORK_LABEL } from 'app/config/networks';
import { ChainId } from 'shibarium-get-chains';
import NumberFormat from 'react-number-format';
import * as Sentry from "@sentry/nextjs";
import { addTransaction, finalizeTransaction } from 'app/state/transactions/actions';
import { useAppDispatch } from 'app/state/hooks';
import { getExplorerLink } from 'app/functions';
const Deposit: React.FC<any> =
    ({ depositTokenInput,
        boneUSDValue,
        showDepositModal,
        setDepositModal,
        dWState,
        selectedToken,
        hashLink,
        setHashLink,
    }) => {
        const [amountApproval, setAmountApproval] = useState(false);
        const { chainId = 1, account, library } = useActiveWeb3React();
        const lib: any = library;
        const web3: any = new Web3(lib?.provider);
        const [allowance, setAllowance] = useState<any>(0);
        const [estGas, setEstGas] = useState<any>(0);
        const dispatch = useAppDispatch();
        const [depModalState, setDepModState] = useState({
            step0: true,
            step1: false,
            step2: false,
            step3: false,
            step4: false,
            title: "Please Note",
        });

        const estGasFee = async () => {
            setAmountApproval(false);
            setEstGas(0);
            let user: any = account;
            const amountWei = web3.utils.toBN(
                fromExponential(+depositTokenInput * Math.pow(10, 18))
            );
            let currentprice: any = await currentGasPrice(web3);
            let allowance =
                (await getAllowanceAmount(
                    library,
                    dynamicChaining[chainId].BONE,
                    account,
                    dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY
                )) || 0;
            // console.log("allowance  ", allowance);
            let allowanceGas: any = 0;
            if (+allowance < +depositTokenInput) {
                let approvalInstance = new web3.eth.Contract(ERC20, dynamicChaining[chainId].BONE);
                await approvalInstance.methods.approve(dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY, amountWei).estimateGas({ from: user }).then((gas: any) => {
                    setAllowance(+(+gas * +currentprice) / Math.pow(10, 18));
                    allowanceGas = +(+gas * +currentprice) / Math.pow(10, 18);
                })
            }
            let instance = new web3.eth.Contract(
                depositManagerABI,
                dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY
            )

            await instance.methods.depositERC20ForUser(dynamicChaining[chainId].BONE, user, amountWei).estimateGas({ from: user })
                .then(async (gas: any) => {
                    let gasFee = (+gas * +currentprice) / Math.pow(10, 18);
                    // if(allowanceGas > 0) gasFee = (+gas * +currentprice) / Math.pow(10, 18) + +allowanceGas;
                    // else gasFee = (+gas * +currentprice) / Math.pow(10, 18);
                    setEstGas(+gasFee);
                }).catch((err: any) => {
                    console.log(err);
                })
        }
        const approvalForDeposit = async (amount: any, token: any, contract: any) => {
            try {
                let user: any = account;
                const amountWei = web3.utils.toBN(
                    fromExponential(1000 * Math.pow(10, 18))
                );
                let instance = new web3.eth.Contract(ERC20, token);
                await instance.methods
                    .approve(contract, amountWei)
                    .send({ from: user })
                    .on("transactionHash", (res: any) => {
                        // console.log(res, "hash")
                        dispatch(
                            addTransaction({
                                hash: res,
                                from: user,
                                chainId,
                                summary: `${res}`,
                            })
                        );
                        setAmountApproval(true);
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
                            })
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

        const depositContract = async (user: any, amount: any) => {
            // call deposit contract
            let instance = new web3.eth.Contract(
                depositManagerABI,
                dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY
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
                        })
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
                        })
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
        }

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
                        fromExponential(+depositTokenInput * Math.pow(10, 18))
                    );
                    let allowance =
                        (await getAllowanceAmount(
                            library,
                            dynamicChaining[chainId].BONE,
                            account,
                            dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY
                        )) || 0;

                    if (+depositTokenInput > +allowance) {
                        approvalForDeposit(
                            amountWei,
                            dynamicChaining[chainId].BONE,
                            dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY
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
        const imageOnErrorHandler = (
            event: React.SyntheticEvent<HTMLImageElement, Event>
        ) => {
            event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
        };
        return (
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
                                        <h4 className="text-md ff-mos pb-3">What isn't possible</h4>
                                        <div className="row">
                                            <div className="col-1"><X style={{ background: "red", borderRadius: "50px", padding: "2px" }} /> </div>
                                            <div className="col-11">
                                                <h6 className="text-sm ff-mos pb-1">Delegation to Validators</h6>
                                                <p className="text-sm">You cannot delegate or stake on the Puppy Net Network. You may do that on the Goerli Network. You can stake funds here.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inner-top p-2">
                                        <h4 className="text-md ff-mos pb-3">What's possible</h4>
                                        <div className="row">
                                            <div className="col-1"><Check style={{ background: "green", borderRadius: "50px", padding: "2px" }} /> </div>
                                            <div className="col-11">
                                                <h6 className="text-sm ff-mos pb-1">Moving funds from Goerli to Puppy Net</h6>
                                                <p className="text-sm">Here you can move frunds from the {NETWORK_LABEL[chainId]} network to {NETWORK_LABEL[chainId == ChainId.GÖRLI ? ChainId.PUPPYNET517 : ChainId.GÖRLI]} network on the Puppy Net Chain. This will take 20-30 minutes.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pop-bottom">
                                    <div>
                                        <a
                                            className="btn primary-btn w-100"
                                            onClick={() => { setDepModState({ ...depModalState, step0: false, step1: true, title: "Transfer Overview" }); estGasFee(); }}
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
                            <div className="backDepState" onClick={() => {
                                setDepModState({ ...depModalState, step0: true, step1: false, title: "Please Note" }); estGasFee();
                            }}><ArrowCircleLeftIcon /></div>
                            <div className="pop-block">
                                <div className="pop-top">
                                    <div className="border-2 rounded-circle d-flex align-item-center justify-content-center p-3 w-25 m-auto" style={{ borderColor: "#F28B03" }}>
                                        <img width="80" src="../../assets/images/gas-station.png" alt="" />
                                    </div>
                                    <div className="text-center">
                                        <h4 className="ff-mos fs-6 pt-4">There are two transactions in the deposit process.</h4>
                                        <p className="text-sm pt-1">Estimated total gas required for these transactions.</p>
                                    </div>
                                    <div className="row pt-3">
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
                                                alt=""
                                            />
                                            <p className="ps-2">Approve Deposit</p>
                                        </div>
                                        <div className="col-5 text-end">
                                            {allowance > 0 ?
                                                <>
                                                    <small className="text-lg">~ </small>
                                                    <NumberFormat thousandSeparator displayType={"text"} prefix='$' value={(allowance * boneUSDValue)} />
                                                </> : "Approved"}
                                        </div>
                                    </div>
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
                                                alt=""
                                            />
                                            <p className="ps-2">Complete Deposit</p>
                                        </div>
                                        <div className="col-5 text-end">
                                            <small className="text-lg">~ </small>
                                            <NumberFormat thousandSeparator displayType={"text"} prefix='$' value={(estGas * boneUSDValue)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="pop-bottom">
                                    <div>
                                        <a
                                            className="btn primary-btn w-100"
                                            onClick={() => setDepModState({ ...depModalState, step1: false, step2: true, title: "Confirm Transfer" })}
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
                            <div className="backDepState" onClick={() => {
                                setDepModState({ ...depModalState, step1: true, step2: false, title: "Transfer Overview" })
                            }}><ArrowCircleLeftIcon /></div>
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
                                                {depositTokenInput + " " + (selectedToken?.parentName ? selectedToken?.parentName : selectedToken?.symbol)}
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
                                                        (selectedToken?.logo || selectedToken?.logoURI)
                                                            ? (selectedToken?.logo || selectedToken?.logoURI)
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
                                                    src={NETWORK_ICON[chainId == ChainId.GÖRLI ? ChainId.PUPPYNET517 : ChainId.GÖRLI]}
                                                    onError={imageOnErrorHandler}
                                                    alt=""
                                                />
                                            </div>
                                            <p>{NETWORK_LABEL[chainId == ChainId.GÖRLI ? ChainId.PUPPYNET517 : ChainId.GÖRLI]} Network</p>
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
                                                <NumberFormat thousandSeparator displayType={"text"} prefix='$' value={(estGas * boneUSDValue).toFixed(6)} />
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
                                                    src={NETWORK_ICON[chainId == ChainId.GÖRLI ? ChainId.PUPPYNET517 : ChainId.GÖRLI]}
                                                    alt=""
                                                />
                                            </div>
                                            <p>{NETWORK_LABEL[chainId == ChainId.GÖRLI ? ChainId.PUPPYNET517 : ChainId.GÖRLI]}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pop-bottom">
                                    <div className="text-center text-section">
                                        <h4 className="pop-hd-md" style={{ color: "var(--bs-orange)" }}>Moving funds</h4>
                                        <p>
                                            It will take up to 20 - 30 minutes to move the funds on{" "}
                                            {NETWORK_LABEL[chainId == ChainId.GÖRLI ? ChainId.PUPPYNET517 : ChainId.GÖRLI]} Mainnet.
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
                                            className={`btn grey-btn w-100 relative ${depModalState.step1 && "disabled btn-disabled"}`}
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
        )
    }

export default Deposit;
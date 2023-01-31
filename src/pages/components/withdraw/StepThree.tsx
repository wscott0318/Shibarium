import { CircularProgress } from '@material-ui/core'
import { getExplorerLink } from 'app/functions';
import { useActiveWeb3React } from 'app/services/web3';
import React, { useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state';
import { finalise } from "../../../exit/finalise"
const StepThree: React.FC<any> = ({
    withdrawTokenInput,
    selectedToken,
    processing,
    step,
    hashLink,
    checkpointSigned,
    challengePeriodCompleted,
    setProcessing,
    setStep,
    setHashLink,
    switchNetwork,
    setChallengePeriodCompleted,
    completed,
    setCompleted}) => {
        
    const [txState, setTxState] = useLocalStorageState<any>("txState");
    const { account,chainId=1 } = useActiveWeb3React();
    
    useEffect(() => {
        if(txState){
            let link = getExplorerLink(chainId, txState?.txHash, 'transaction')
            setHashLink(link);
        }
    },[]);
    const startExitWithBurntTokens = async () => {
        console.log("step 6");
        // switch network to Goerli chain
        await switchNetwork();
        setProcessing((processing: any) => [...processing, "Challenge Period"])
        let exitWithBurn = await finalise("0x664456257bC8cfFc605C74Ab8Fea6bd04CCe3BB6", account);
        console.log("exitWithBurn => ", exitWithBurn);
        if (exitWithBurn) {
            setStep("Challenge Period");
            setTxState({ ...txState, "challengePeriod": true });
            setChallengePeriodCompleted(true);
            let link = getExplorerLink(chainId, exitWithBurn, 'transaction')
            setHashLink(link)
        }
    }

    const processExit = async() => {
        // let exit = startWithdraw(txState?.token?.bridgeType,hashLink,1);
        // let exit = await startWithdraw("plasma","0x6cf665ac6027bc35ac5cb82eda29c3b7a2881623712f8077128223f38c1852d0",0);
        // console.log("exit ==> " ,exit);
        // if(exit){
        //     setProcessing((processing: any) => [...processing, "Completed"])
        //     setTxState({ ...txState, "txHash": exit, "processExit": true });
        //     setStep("Completed");
        //     setCompleted(true);
        //     let link = getExplorerLink(chainId, exit, 'transaction')
        //     setHashLink(link)
        // }

    }
    return (
        <div className="popmodal-body no-ht">
            <div className="pop-block withdraw_pop">
                <div className="pop-top">
                    <hr />
                    <div className='row'>
                        <div className="col-6">Transfer Amount</div>
                        <div className="col-6 text-end">{+withdrawTokenInput}{" "}{selectedToken?.symbol || selectedToken?.key || txState?.token?.symbol || txState?.token?.key}</div>
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
                                    <a href={hashLink ? hashLink : txState?.txHash} className="primary-text">
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
                                            <a onClick={() => { startExitWithBurntTokens() }}
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
                                    <a href={hashLink ? hashLink : txState?.txHash} className="primary-text">
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
                                        <a href={hashLink ? hashLink : txState?.txHash} className="primary-text">
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
                           {completed ? <div className='pop-grid flex-column align-items-center justify-content-center text-center'>
                                <img src="../../assets/images/cmpete-step.png" alt="" />
                                <h5 className='pt-4 pb-2'>Transfer completed successfully</h5>
                                <p className='pb-3 ps-2 pe-2'>Your transfer is completed successfully.</p>
                                <a href={hashLink ? hashLink : txState?.txHash} className="primary-text">
                                    View on Block Explorer
                                </a>
                            </div>
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


                </div>
            </div>
        </div>
    )
}

export default StepThree
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { useActiveWeb3React } from "../../services/web3"
import Header from "../layout/header";
import { useRouter } from "next/router";
import { getBoneUSDValue, getValidatorsDetail } from 'app/services/apis/validator';
import { BONE_ID } from 'app/config/constant';
import NumberFormat from 'react-number-format';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Delegators from './validator-details/Delegators';
import Checkpoints from './validator-details/Checkpoints';
import { addDecimalValue, tokenDecimal, web3Decimals } from "web3/commonFunctions";
import Web3 from "web3";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { dynamicChaining } from "web3/DynamicChaining";
import LoadingSpinner from 'pages/components/Loading';
import * as Sentry from "@sentry/nextjs";

export default function ValidatorDetails() {
    const pageSize = 4;
    const { account, library, chainId = 1 } = useActiveWeb3React()
    const [validatorInfo, setValidatorInfo] = useState<any>();
    const [allDelegators, setAllDelegators] = useState([]);
    const [allCheckpoints, setAllCheckpoints] = useState<any>([]);
    const [boneUsdValue, setBoneUsdValue] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [msgType, setMsgType] = useState<'error' | 'success' | undefined>()
    const [toastMassage, setToastMassage] = useState('')

    const [lastBlock, setLastBlock] = useState<any>();
    const [totalSupply, setTotalSupply] = useState<number>(0)


    const router = useRouter()
    useEffect(() => {
        try {
            const { id } = router.query;
            if (id) {
                setLoading(true);
                getValidatorsDetail(id.toString()).then((res:any) => {
                    setValidatorInfo(res?.data?.data?.validatorSet.validatorInfo)
                    setAllDelegators(res?.data?.data?.validatorSet?.delegators || []);
                    setAllCheckpoints(res?.data?.data?.validatorSet?.checkpoints || [])
                    setLastBlock(res?.data?.data?.validatorSet?.lastBlock);


                    // console.log(res?.data?.data?.validatorSet)
                    setLoading(false);
                }).catch((error: any) => {
                    setToastMassage(error?.response?.data?.message);
                    setMsgType('error')
                    setLoading(false);
                })
            }
        }
        catch (err: any) {
            Sentry.captureMessage("UseEffect in all Validator [id].jsx",err);
        }
    }, [])
    useEffect(() => {
        getBoneUSDValue(BONE_ID).then((res:any) => {
            setBoneUsdValue(res.data.data.price);
        })

        if (validatorInfo) {
            getTotalSupply(validatorInfo?.id)
        }

    }, [validatorInfo, account])


    const getTotalSupply = async (id: any) => {
        try{
            const lib: any = library;
            const web3: any = new Web3(lib?.provider);
            let instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId]?.STAKE_MANAGER_PROXY);
            const valStake = await instance.methods.validators(id).call();
            let finalAMount = (+valStake.amount + +valStake.delegatedAmount) / Math.pow(10, web3Decimals)
            console.log(valStake, finalAMount, "data ==> ")
            setTotalSupply(finalAMount)
        }
        catch(err:any){
            Sentry.captureMessage("getTotalSupply", err);
        }

        // amount delegatedAmount
    }


    return (
        <>
            <Header />
            {loading && <LoadingSpinner />}
            <main className="main-content dark-bg-800 full-vh  cmn-input-bg font-up ffms-inherit staking-main">

                {/* <StakingHeader /> */}
                <section className='py-4 top_bnr_area dark-bg py-lg-5'>
                    <div className="container">
                        <div className="row">
                            <div className="mb-4 col-sm-5 col-lg-5 col-xl-4 mb-sm-0">
                                <div className="text-center shib-card card h-100 p-3">
                                    <div className='image-wrap'>
                                        <img className='img-fluid' src={validatorInfo?.logoUrl ? validatorInfo?.logoUrl : "../../assets/images/shiba-round-icon.png"} alt="fundborn-img" width={120} />
                                    </div>
                                    <h4 className='py-2 mt-2'>
                                        <span className='text-white trs-3 ff-mos'>{validatorInfo?.name}</span>
                                    </h4>
                                    {/* <Link href="https://linktr.ee/DeFiMatic"> */}
                                    {/* <a className='primary-text ff-mos'>
                                          https://linktr.ee/DeFiMatic
                                        </a> */}
                                    {/* </Link> */}
                                </div>
                            </div>
                            <div className='col-sm-7 col-lg-7 col-xl-8'>
                                <div className="mb-4 cus-panel h-100">
                                    <div className="panel-header">
                                        <h4 className='mb-0 fw-600 trs-3 ff-mos'>Validator Info</h4>
                                        {validatorInfo?.uptimePercent === 0 ?
                                            <div className='badge-md primary-bg'>
                                                <span className='trs-1 ff-mos'>Inactive</span>
                                            </div>
                                            :
                                            <div className='badge-md success-bg'>
                                                <span className='trs-1 ff-mos'>Active</span>
                                            </div>
                                        }
                                    </div>
                                    <div className="pb-0 panel-body">
                                        <ul className='mb-0 info-list list-unstyled'>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600 ff-mos'>Supply</h6>
                                                <p className='mb-0 trs-3 ff-mos'>
                                                    <NumberFormat displayType='text' thousandSeparator value={addDecimalValue(totalSupply)} /> BONE
                                                </p>
                                            </li>
                                            {/* <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Community Pool</h6>
                                                <p className='mb-0 trs-3'>
                                                    ... BONE
                                                </p>
                                            </li> */}
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600 ff-mos'>Owner address</h6>
                                                <p className='mb-0 trs-3 ff-mos'>
                                                    {validatorInfo?.owner}
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600 ff-mos'>Signer address</h6>
                                                <p className='mb-0 trs-3 primary-text ff-mos'>
                                                    {validatorInfo?.signer}
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600 ff-mos'>Commission Rate</h6>
                                                <p className='mb-0 trs-3 ff-mos'>
                                                    {validatorInfo?.commissionPercent}%
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600 ff-mos'>Condition</h6>
                                                <p className="mb-0 trs-3 fw-600 up-text ff-mos">
                                                    {validatorInfo?.uptimePercent >= 90 ? `Good` : validatorInfo?.uptimePercent < 90 && validatorInfo?.uptimePercent >= 70 ? `Okay` : 'Bad'}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <AddressDetails /> */}
                <section className="pt-5 pb-4 darkbg-2 pb-lg-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 detail">
                                <div className="mb-4 cus-panel dark-Bg mb-lg-5">
                                    <div className="panel-header">
                                        <h4 className='fwb trs-3 fw-600 ff-mos'>Voting Power</h4>
                                    </div>
                                    <div className="panel-body">
                                        <div className='flex-wrap mb-4 d-flex align-items-center'>
                                            <div className='data-btn me-3'>
                                                <span className='trs-6 ff-mos'>
                                                    <NumberFormat displayType='text' thousandSeparator value={addDecimalValue(+validatorInfo?.selfStake / Math.pow(10, web3Decimals))} />
                                                </span>
                                            </div>
                                            {/* <div className='text ff-mos'>
                                               {validatorInfo?.votingPower ? <span>(~{(+validatorInfo?.votingPower).toFixed(tokenDecimal) || 0}%)</span> : null }
                                            </div> */}
                                        </div>
                                        <div className="mb-3 progress-line">
                                            <ProgressBar now={+(+validatorInfo?.votingPower).toFixed(tokenDecimal) || 0} />
                                        </div>
                                        <ul className='mb-0 info-list list-unstyled'>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600 ff-mos'>Check point</h6>
                                                <p className='mb-0 trs-3 ff-mos'>
                                                    {lastBlock?.checkpointNumber}
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600 ff-mos'>Voting Power</h6>
                                                <p className='mb-0 trs-3 ff-mos'>
                                                    <NumberFormat displayType='text' thousandSeparator value={addDecimalValue(+validatorInfo?.selfStake / Math.pow(10, web3Decimals))} />
                                                </p>
                                            </li>
                                            {/* <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600 ff-mos'>Voting Power %</h6>
                                                {validatorInfo?.votingPower ? <p className='mb-0 trs-3 primary-text ff-mos'>
                                                   {(+validatorInfo?.votingPower).toFixed(tokenDecimal) || 0}%
                                                </p> : null }
                                            </li> */}
                                        </ul>
                                    </div>
                                </div>


                                {/* Delegation tabs start */}
                                <Delegators allDelegators={allDelegators} boneUsdValue={boneUsdValue} />
                                {/* deligation tab  end */}

                                {/* transactions tabs start */}
                                <Checkpoints allCheckpoints={allCheckpoints} boneUsdValue={boneUsdValue} />
                                {/* transactions tab  end */}

                                {/* <PowerChange /> */}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

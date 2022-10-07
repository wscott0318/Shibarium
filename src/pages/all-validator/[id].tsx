/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import CommonModal from "../components/CommonModel";
import StakingHeader from '../staking-header';
import Header from "../layout/header";


export default function ValidatorDetails() {
    // const pageSize = 4; 
    // const [validatorInfo, setValidatorInfo] = useState<any>();
    // const [allDelegators, setAllDelegators] = useState([]);
    // const [allCheckpoints, setAllCheckpoints] = useState<any>([]);
    // const [boneUsdValue, setBoneUsdValue] = useState(0);
    // const [loading, setLoading] = useState<boolean>(false);
    // const [msgType, setMsgType] = useState<'error'|'success'|undefined>()
    // const [toastMassage, setToastMassage] = useState('')

    // const [lastBlock, setLastBlock] = useState<any>();
    // const [totalSupply, setTotalSupply] = useState<number>(0)
   

    // const router = useRouter()
    // useEffect(() => {
    //     const { id } = router.query;
    //     if (id ) {
    //         setLoading(true);
    //         getValidatorsDetail(id.toString()).then((res)=>{
    //             setValidatorInfo(res?.data?.data?.validatorSet.validatorInfo)
    //             setAllDelegators(res?.data?.data?.validatorSet?.delegators || []);
    //             setAllCheckpoints(res?.data?.data?.validatorSet?.checkpoints || [])
    //             setLastBlock(res?.data?.data?.validatorSet?.lastBlock );
    //             setTotalSupply(+res?.data?.data?.validatorSet?.totalSupply );

    //             // console.log(res?.data?.data?.validatorSet)
    //             setLoading(false);
    //         }).catch((error:any)=> {
    //             setToastMassage(error?.response?.data?.message);
    //             setMsgType('error')
    //             setLoading(false);
    //         })
    //     }
    // }, [])
    // useEffect(() => {
    //     getBoneUSDValue(BONE_ID).then(res=>{
    //         setBoneUsdValue(res.data.data.price);
    //     })
    //   },[])
    
    
    return (
        <>
            <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg">
            <Header />
            <StakingHeader />
            <section className='py-4 top_bnr_area dark-bg py-lg-5'>
                    <div className="container">
                        <div className="row">
                            <div className="mb-4 col-sm-5 col-lg-5 col-xl-4 mb-sm-0">
                                <div className="text-center shib-card card h-100">
                                    <div className='image-wrap'>
                                        <img className='img-fluid' src="../../assets/images/fundbaron.png" alt="fundborn-img" width={120} />
                                    </div>
                                    <h4 className='py-2 mt-2'>
                                        <span className='text-white trs-3'>test</span>
                                    </h4>
                                    {/* <Link href="https://linktr.ee/DeFiMatic"> */}
                                        <a className='primary-text'>
                                          https://linktr.ee/DeFiMatic
                                        </a>
                                    {/* </Link> */}
                                </div>
                            </div>
                            <div className='col-sm-7 col-lg-7 col-xl-8'>
                                <div className="mb-4 cus-panel h-100">
                                    <div className="panel-header">
                                        <h4 className='mb-0 fw-600 trs-3'>Validator Info</h4>
                                        {/* <div className='badge-md primary-bg'>
                                            <span className='trs-1'>Inactive</span>
                                        </div> */}  
                                        
                                        <div className='badge-md success-bg'>
                                            <span className='trs-1'>Active</span>
                                        </div>
                                    </div>
                                    <div className="pb-0 panel-body">
                                        <ul className='mb-0 info-list list-unstyled'>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Supply</h6>
                                                <p className='mb-0 trs-3'>
                                                   158,763.37017936 BONE
                                                </p>
                                            </li>
                                            {/* <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Community Pool</h6>
                                                <p className='mb-0 trs-3'>
                                                    ... BONE
                                                </p>
                                            </li> */}
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Owner address</h6>
                                                <p className='mb-0 trs-3'>
                                                    0x9e958ee212d1ad242c8c173bdc4fcb191eb1c245
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Signer address</h6>
                                                <p className='mb-0 trs-3 primary-text'>
                                                   0x62939c59bba87e449884a1fd47ab3da57a652184
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Commission Rate</h6>
                                                <p className='mb-0 trs-3'>
                                                   13%
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Condition</h6>
                                                <p className="mb-0 trs-3 fw-600 up-text">
                                                  Good
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
                                        <h4 className='fwb trs-3 fw-600'>Voting Power test</h4>
                                    </div>
                                    <div className="panel-body">
                                        <div className='flex-wrap mb-4 d-flex align-items-center'>
                                            <div className='data-btn me-3'>
                                                <span className='trs-6'>
                                                {/* <NumberFormat displayType='text' thousandSeparator value={(validatorInfo?.selfStake/Math.pow(10,18)).toFixed(4)} />     */}
                                                79,351.5637
                                                </span>
                                            </div>
                                            <div className='text'>
                                               {/* {validatorInfo?.votingPower ? <span>(~{(+validatorInfo?.votingPower).toFixed(2) || 0}%)</span> : null } */}
                                               (~50.55%)
                                            </div>
                                        </div>
                                        <div className="mb-3 progress-line">
                                            {/* <ProgressBar now={+(+validatorInfo?.votingPower).toFixed(2) || 0}/> */}
                                            <div className="progress">
                                                <div className="progress-bar"  style={{ width: '55.55%' }}></div>
                                            </div>
                                        </div>
                                        <ul className='mb-0 info-list list-unstyled'>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Check point</h6>
                                                <p className='mb-0 trs-3'>
                                                  666
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Voting Power</h6>
                                                <p className='mb-0 trs-3'>
                                                {/* <NumberFormat displayType='text' thousandSeparator value={(validatorInfo?.selfStake/Math.pow(10,18)).toFixed(8)} /> */}
                                                Test
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Voting Power %</h6>
                                               <p className='mb-0 trs-3 primary-text'>
                                                   This is text.
                                                </p> 
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="h-auto p-4 mb-4 cus-card mb-lg-5">
                                    
                                    <h3 className="mb-2 mb-sm-4">Delegator</h3>
                                    <div className="cmn_dasdrd_table dt-table">
                                        <div className="table-responsive">
                                            <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                <th>Accounts</th>
                                                <th>Bone Staked</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><span><img src="../../images/shiba-round-icon.png" /></span><span className="word-br">0xc3E9adc34bFD50bB99E8D0fD4846360D2557c0cb</span></td>
                                                    <td><span className="amt-value pe-1">91.4512821127219</span><span className="amt-txt pe-1">$ 98.13</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span><img src="../../images/shiba-round-icon.png" /></span><span className="word-br">0xc3E9adc34bFD50bB99E8D0fD4846360D2557c0cb</span></td>
                                                    <td><span className="amt-value pe-1">91.4512821127219</span><span className="amt-txt pe-1">$ 98.13</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span><img src="../../images/shiba-round-icon.png" /></span><span className="word-br">0xc3E9adc34bFD50bB99E8D0fD4846360D2557c0cb</span></td>
                                                    <td><span className="amt-value pe-1">91.4512821127219</span><span className="amt-txt pe-1">$ 98.13</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span><img src="../../images/shiba-round-icon.png" /></span><span className="word-br">0xc3E9adc34bFD50bB99E8D0fD4846360D2557c0cb</span></td>
                                                    <td><span className="amt-value pe-1">91.4512821127219</span><span className="amt-txt pe-1">$ 98.13</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span><img src="../../images/shiba-round-icon.png" /></span><span className="word-br">0xc3E9adc34bFD50bB99E8D0fD4846360D2557c0cb</span></td>
                                                    <td><span className="amt-value pe-1">91.4512821127219</span><span className="amt-txt pe-1">$ 98.13</span></td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="cstm_pagination ">
                                        <div className="pag_con justify-content-end">
                                            <div className="right_block justify-content-end">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                    Previous
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                    1
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                    2
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                    3
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                    Next
                                                    </a>
                                                </li>
                                                </ul>
                                            </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-auto p-4 mb-4 cus-card mb-lg-5">
                                    
                                    <h3 className="mb-2 mb-sm-4">Checkpoints</h3>
                                    <div className="cmn_dasdrd_table">
                                        <div className="table-responsive">
                                            <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                <th>Checkpoint</th>
                                                <th>Start block number</th>
                                                <th>End block number</th>
                                                <th>Result</th>
                                                <th>Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td>4,848</td>
                                                <td>1407799</td>
                                                <td>1408054</td>
                                                <td><span><img src="../../images/green-tick2.png"></img></span><span>Not completed</span></td>
                                                <td>4 hours ago</td>
                                                </tr>
                                                <tr>
                                                <td>4,848</td>
                                                <td>1407799</td>
                                                <td>1408054</td>
                                                <td><span><img src="../../images/green-tick2.png"></img></span><span>Not completed</span></td>
                                                <td>4 hours ago</td>
                                                </tr>
                                                <tr>
                                                <td>4,848</td>
                                                <td>1407799</td>
                                                <td>1408054</td>
                                                <td><span><img src="../../images/green-tick2.png"></img></span><span>Not completed</span></td>
                                                <td>4 hours ago</td>
                                                </tr>
                                                <tr>
                                                <td>4,848</td>
                                                <td>1407799</td>
                                                <td>1408054</td>
                                                <td><span><img src="../../images/green-tick2.png"></img></span><span>Not completed</span></td>
                                                <td>4 hours ago</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="cstm_pagination ">
                                        <div className="pag_con justify-content-end">
                                            <div className="right_block justify-content-end">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                    Previous
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                    1
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                    2
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                    3
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                    Next
                                                    </a>
                                                </li>
                                                </ul>
                                            </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Delegation tabs start */}
                                {/* <Delegators allDelegators={allDelegators} boneUsdValue={boneUsdValue}/> */}
                                {/* deligation tab  end */}

                                {/* transactions tabs start */}
                              {/* <Checkpoints allCheckpoints={allCheckpoints} boneUsdValue={boneUsdValue}/> */}
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

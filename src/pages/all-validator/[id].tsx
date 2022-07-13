/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Header from '../layout/header'
import { Nav, Pagination, } from 'react-bootstrap';
import InnerHeader from '../inner-header';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useRouter } from 'next/router';
import { getBoneUSDValue, getValidatorsDetail } from 'app/services/apis/validator';
import NumberFormat from 'react-number-format';
import CopyHelper from 'app/components/AccountDetails/Copy';
import Delegators from './validator-details/Delegators';
import { BONE_ID } from 'app/config/constant';
import Checkpoints from './validator-details/Checkpoints';
import PowerChange from './validator-details/PowerChange';
import AddressDetails from './validator-details/AddressDetails';

export default function ValidatorDetails() {
    const pageSize = 4; 
    const [validatorInfo, setValidatorInfo] = useState<any>();
    const [allDelegators, setAllDelegators] = useState([]);
    const [allCheckpoints, setAllCheckpoints] = useState([]);
    const [boneUsdValue, setBoneUsdValue] = useState(0)
   

    const router = useRouter()
    useEffect(() => {
        const { id } = router.query;
        if (id ) {
            getValidatorsDetail(id.toString()).then((res)=>{
                setValidatorInfo(res?.data?.data?.validatorInfo)
                setAllDelegators(res?.data?.data?.validatorInfo?.delegators || []);
                setAllCheckpoints(res?.data?.data?.validatorInfo?.checkpoints || [])
                console.log(res?.data?.data?.validatorInfo)

            }).catch((error:any)=> {
                console.log(error)
            })
        }
    }, [])
    useEffect(() => {
        getBoneUSDValue(BONE_ID).then(res=>{
            setBoneUsdValue(res.data.data.price);
        })
      },[])
    
    
    return (
        <>
            <div className='page-content'>
                <InnerHeader />
                <section className='py-4 banner-section darkBg py-lg-5'>
                    <div className="container">
                        <div className="row">
                            <div className="mb-4 col-sm-5 col-lg-5 col-xl-4 mb-sm-0">
                                <div className="text-center shib-card card h-100">
                                    <div className='image-wrap'>
                                        <img className='img-fluid' src="../../assets/images/fundbaron.png" alt="fundborn-img" width={120} />
                                    </div>
                                    <h4 className='py-2 mt-2'><span className='trs-3 primary-text'>FUNDBaron</span></h4>
                                    <p className='d-flex align-items-center justify-content-center'>
                                        <span className='me-2 trs-3'>49962E94F099AFA4 </span>
                                        <span className="tick-round">
                                            <img className='img-fluid' src="../../assets/images/light-tick.png" alt="tick-ico" width={10} />
                                        </span>
                                    </p>
                                    <p className='mb-0'>
                                        100% FUND reward and 100% xFUND reward for all delegators.
                                    </p>
                                </div>
                            </div>
                            <div className='col-sm-7 col-lg-7 col-xl-8'>
                                <div className="mb-4 cus-panel h-100">
                                    <div className="panel-header">
                                        <h4 className='mb-0 fwb trs-3'>Validator Info</h4>
                                        <div className='badge-md success-bg'>
                                            <span className='trs-1'>active</span>
                                        </div>
                                    </div>
                                    <div className="pb-0 panel-body">
                                        <ul className='mb-0 info-list list-unstyled'>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Supply</h6>
                                                <p className='mb-0 trs-3'>
                                                   <NumberFormat displayType='text' thousandSeparator value={validatorInfo?.totalStaked} /> FUND
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Community Pool</h6>
                                                <p className='mb-0 trs-3'>
                                                    83,248.37 FUND
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Owner address</h6>
                                                <p className='mb-0 trs-3'>
                                                    {validatorInfo?.owner}
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Signer address</h6>
                                                <p className='mb-0 trs-3 primary-text'>
                                                    {validatorInfo?.signer}
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Commission Rate</h6>
                                                <p className='mb-0 trs-3'>
                                                   {validatorInfo?.commissionPercent}% (Updated a year ago)
                                                </p>
                                            </li>
                                            {/* <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Max Rate</h6>
                                                <p className='mb-0 trs-3'>
                                                    40.00%
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Max Change Rate</h6>
                                                <p className='mb-0 trs-3'>
                                                    3.00%
                                                </p>
                                            </li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <AddressDetails validatorInfo={validatorInfo} />
                <section className="pb-4 darkbg-2 pb-lg-5">
                    <div className="container">
                        <div className="row">
                            {/* hide col start */}
                            <div className="mb-4 col-lg-3 mb-lg-0">
                                <div className="cus-panel darkBg">
                                    <div className="panel-header">
                                        <p className='mb-0'>Uptime</p>
                                        <a href="javascript:void(0)" className='primary-text '>
                                            More...
                                        </a>
                                    </div>
                                    <div className="panel-body">
                                        <div className="flex-wrap d-flex justify-content-between">
                                            <p className='mb-0 mb-3 me-2'>Last 250 blocks</p>
                                            <p className='mb-0 mb-3 trs-3'>
                                                100%
                                            </p>
                                        </div>
                                        <ul className='blocks'>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                            <li className="blocks-list">
                                                <div className="block-sq"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* hide col end */}

                            <div className="col-lg-9">
                                <div className="mb-4 cus-panel darkBg mb-lg-5">
                                    <div className="panel-header">
                                        <h4 className='fwb trs-3'>Voting Power</h4>
                                    </div>
                                    <div className="panel-body">
                                        <div className='flex-wrap mb-4 d-flex align-items-center'>
                                            <div className='data-btn me-3'>
                                                <span className='trs-6'>
                                                <NumberFormat displayType='text' thousandSeparator value={validatorInfo?.selfStake} />    
                                                </span>
                                            </div>
                                            <div className='text'>
                                                <span>(~{(validatorInfo?.selfStake /validatorInfo?.totalStaked)*100 || 0 }%)</span>
                                            </div>
                                        </div>
                                        <div className="mb-3 progress-line">
                                            <ProgressBar now={(validatorInfo?.selfStake /validatorInfo?.totalStaked)*100 || 0} />
                                        </div>
                                        <ul className='mb-0 info-list list-unstyled'>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Check point</h6>
                                                <p className='mb-0 trs-3'>
                                                    446,608
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Voting Power</h6>
                                                <p className='mb-0 trs-3'>
                                                <NumberFormat displayType='text' thousandSeparator value={validatorInfo?.selfStake} />
                                                </p>
                                            </li>
                                            <li className='info-data-lst'>
                                                <h6 className='mb-0 trs-3 fix-wid fw-600'>Voting Power %</h6>
                                                <p className='mb-0 trs-3 primary-text'>
                                                   {(validatorInfo?.selfStake /validatorInfo?.totalStaked)*100 || 0}%
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Delegation tabs start */}
                                <Delegators allDelegators={allDelegators} boneUsdValue={boneUsdValue}/>
                                {/* deligation tab  end */}

                                {/* transactions tabs start */}
                              <Checkpoints allCheckpoints={allCheckpoints} boneUsdValue={boneUsdValue}/>
                                {/* transactions tab  end */}

                               <PowerChange />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

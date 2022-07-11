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

export default function ValidatorDetails() {
    const pageSize = 4; 
    const [validatorInfo, setValidatorInfo] = useState<any>();
    const [allDelegators, setAllDelegators] = useState([]);
    const [boneUsdValue, setBoneUsdValue] = useState(0)
   

    const router = useRouter()
    useEffect(() => {
        const { id } = router.query;
        if (id ) {
            getValidatorsDetail(id.toString()).then((res)=>{
                setValidatorInfo(res?.data?.data?.validatorInfo)
                setAllDelegators(res?.data?.data?.validatorInfo?.delegators || []);

                console.log(res?.data?.data?.validatorInfo)

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
                <section className='py-4 py-md-5'>
                    <div className="container">
                        <div className="tabl-row cus-panel darkBg">
                            <div className="tabl-head darkbg-3">
                                <div className="mx-0 row">
                                    <div className="px-0 col-md-6">
                                        <div className="p-2 tbl-item p-sm-3">
                                            <h4>Owner address</h4>
                                            <p className='flex-wrap d-inline-flex txt-light fw-600 align-items-center'>
                                                <span className='me-2 primary-text break-word'>{validatorInfo?.owner}</span>
                                                <CopyHelper toCopy={validatorInfo?.owner}>
                                                    <img className='img-fluid' src="../../assets/images/copy-wht-icon.png" alt="copy-img" width={14} />    
                                                    </CopyHelper>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-0 col-md-6 tbl-item">
                                        <div className='p-2 p-sm-3'>
                                            <h4>Signer address</h4>
                                            <p className='flex-wrap d-inline-flex txt-light fw-600 align-items-center'>
                                                <span className='me-2 primary-text break-word'>{validatorInfo?.signer}</span>
                                                <CopyHelper toCopy={validatorInfo?.signer}>
                                                    <img className='img-fluid' src="../../assets/images/copy-wht-icon.png" alt="copy-img" width={14} />    
                                                </CopyHelper>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tabl panel-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className='mute-text-2 fs-16 fw-600'>
                                            Status
                                        </div>
                                        <div className="badge-md success-bg d-inline-block">
                                            <span className="trs-1">active</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className='mute-text-2 fs-16 fw-600'>
                                            Commission
                                        </div>
                                        <div className="badg mute-text-2 fw-600">
                                            {validatorInfo?.commissionPercent}%
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className='mute-text-2 fs-16 fw-600'>
                                            Condition
                                        </div>
                                        <div className='up-text fw-600'>
                                            Good
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pb-4 darkbg-2 pb-lg-5">
                    <div className="container">
                        <div className="row">
                            {/* hide col start */}
                            <div className="mb-4 col-lg-4 mb-lg-0 d-none">
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

                            <div className="col-lg-12">
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
                                <div className="h-auto p-4 cus-card">
                                    <div className="table-data-tab">
                                        <h3 className='mb-3 mb-lg-4'>Transactions</h3>
                                        <div className="btn-nav">
                                            <Nav variant="pills" defaultActiveKey="/firts-tab">
                                                <Nav.Item>
                                                    <Nav.Link className='active'><span className='trs-2'>Transactions L1</span></Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="link-1"><span className='trs-2'>Transactions L2</span></Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>
                                        <div className="mb-4 border-table outer-table mb-lg-5">
                                            <table className="data-table">
                                                <thead>
                                                    <tr className="table-header">
                                                        <th>Checkoint</th>
                                                        <th>Start block number</th>
                                                        <th>End block number</th>
                                                        <th>Result</th>
                                                        <th>Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            443,032
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align d-flex align-items-center">
                                                                <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" color="#999999" aria-hidden="true">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                                                    </path>
                                                                </svg>
                                                                <span>Success</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">8hr ago</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="tb-data align">234,332</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">3020</span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align d-flex align-items-center">
                                                                <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" color="#999999" aria-hidden="true">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                                                    </path>
                                                                </svg>
                                                                <span>Success</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="tb-data align">8hr ago</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 d-flex align-items-center">
                                                <span className="fw-700">Showing 1-8 of 300</span>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="cus-pagination">
                                                    <ul className="pagination justify-content-end">
                                                        <li className="page-item"><a className="page-link" href="#"><span>Previous</span></a></li>
                                                        <li className="page-item"><a className="page-link" href="#"><span>1</span></a></li>
                                                        <li className="page-item"><a className="page-link" href="#"><span>2</span></a></li>
                                                        <li className="page-item"><a className="page-link" href="#"><span>3</span></a></li>
                                                        <li className="page-item"><a className="page-link" href="#"><span>Next</span></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* transactions tab  end */}

                                {/* voting tabs start , currently hide */}
                                <div className="mb-4 table-data-tab mb-lg-5 d-none">
                                    <div className="btn-nav">
                                        <Nav variant="pills" defaultActiveKey="/firts-tab">
                                            <Nav.Item>
                                                <Nav.Link className='active'><span className='trs-2'>Power Change</span></Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="link-1"><span className='trs-2'>Polygon</span></Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="disabled">
                                                    <span className='trs-2'>Transactions</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </div>
                                {/* votign tabs end */}

                                <div className='py-3 table-data darkBg rad-10 d-none'>
                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round down'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc down-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='arrow-round up'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc up-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>                                                <tr>
                                                    <td>
                                                        <div className='arrow-round down'>
                                                            <img className='img-fluid' src="../../assets/images/left-icon.png" alt="arrow-ico" width={10} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                            <div className='td-arrow'>
                                                                <img className='img-fluid' src="../../assets/images/arrow-down.png" alt="arrow-img" />
                                                            </div>
                                                            <div className='td-data'>
                                                                6,928,499,556
                                                            </div>
                                                        </div>
                                                        <div className="data-desc down-text">(+10,000)</div>
                                                    </td>
                                                    <td>
                                                        <div className="data-item">10,441,046</div>
                                                        <span className="no-break">29 Apr 2022, 5:18:22pm UTC</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

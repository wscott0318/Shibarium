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
import Link from "next/link";
import LoadingSpinner from 'pages/components/Loading';
import ToastNotify from 'pages/components/ToastNotify';

export default function ValidatorDetails() {
    const pageSize = 4; 
    const [validatorInfo, setValidatorInfo] = useState<any>();
    const [allDelegators, setAllDelegators] = useState([]);
    const [allCheckpoints, setAllCheckpoints] = useState<any>([]);
    const [boneUsdValue, setBoneUsdValue] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [msgType, setMsgType] = useState<'error'|'success'|undefined>()
    const [toastMassage, setToastMassage] = useState('')

    const [lastBlock, setLastBlock] = useState<any>();
    const [totalSupply, setTotalSupply] = useState<number>(0)
   

    const router = useRouter()
    useEffect(() => {
        const { id } = router.query;
        if (id ) {
            setLoading(true);
            getValidatorsDetail(id.toString()).then((res)=>{
                setValidatorInfo(res?.data?.data?.validatorSet.validatorInfo)
                setAllDelegators(res?.data?.data?.validatorSet?.delegators || []);
                setAllCheckpoints(res?.data?.data?.validatorSet?.checkpoints || [])
                setLastBlock(res?.data?.data?.validatorSet?.lastBlock );
                setTotalSupply(+res?.data?.data?.validatorSet?.totalSupply );

                // console.log(res?.data?.data?.validatorSet)
                setLoading(false);
            }).catch((error:any)=> {
                setToastMassage(error?.response?.data?.message);
                setMsgType('error')
                setLoading(false);
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
            <h1>all - validators dynamic</h1>
        </>
    )
}

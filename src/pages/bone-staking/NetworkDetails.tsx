import { BONE_ID } from 'app/config/constant'
import { getLastCheckpoint, getTotalRewardDistributed, getTotalStake, getValidatorCount } from 'app/services/apis/network-details/networkOverview'
import { getBoneUSDValue } from 'app/services/apis/validator'
import { useLocalWeb3 } from 'app/services/web3'
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'

function NetworkDetails() {
    const [totalValidators, setTotalValidators] = useState<number>(0)
    const [totalStake, setTotalStake] = useState<number>(0)
    const [totalRewardDistributed, setTotalRewardDistributed] = useState<number>(0)
    const [lastCheckpoint, setLastCheckpoint] = useState<number>(0);
    const [boneUSDValue, setBoneUSDValue] = useState<number>(0);
    const [latestBlock, setLatestBlock] = useState<number>(0)

    const web3 = useLocalWeb3();
    useEffect(() => {
        try {
            
      
        getBoneUSDValue(BONE_ID).then((res:any)=>{
            setBoneUSDValue(res.data.data.price);
          })
        getValidatorCount().then((res:any)=>{
            if(res &&  res.data && res.data.result){
                setTotalValidators(res.data.result.stakedCount);
            }
        }).catch((error:any)=>{
            console.log(error)
        })
        getTotalStake().then((res:any)=>{
            if(res &&  res.data && res.data.result){
                setTotalStake(res.data.result.totalStake);
            }
        }).catch((error:any)=>{
            console.log(error)
        })
        getTotalRewardDistributed().then((res:any)=>{
            if(res &&  res.data && res.data.result){
                setTotalRewardDistributed(res.data.result.totalReward);
            }
        }).catch((error:any)=>{
            console.log(error)
        })
        getLastCheckpoint().then((res:any)=>{
            if(res &&  res.data && res.data.result){
                setLastCheckpoint(res.data.result.totalStake);
            }
        }).catch((error:any)=>{
            console.log(error)
        })
        web3?.eth?.getBlockNumber().then((lastBlock:number)=>{
            setLatestBlock(lastBlock)
        })
    } catch (error) {
            console.log(error)
    }
    }, [])
    
  return (
    <div className="container">
          <div className="baner-card">
            <h3 className="mb-0 mb-3 text-white fwb">Network Overview</h3>
            <div className="row">
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb">{totalValidators}</h3>
                  <span className="mb-0 trs-3">Total Validators</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb"><NumberFormat thousandSeparator displayType={"text"} value={totalStake}/> BONE</h3>
                  <p className="mb-0 d-block fw-600"><NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={(totalStake * boneUSDValue).toFixed(4)}/></p>
                  <div className="card-hr"></div>
                  <span className="mb-0">Total Stake</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb"><NumberFormat thousandSeparator displayType={"text"} value={totalRewardDistributed}/> BONE</h3>
                  <p className="mb-0 d-block fw-600"><NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={(totalRewardDistributed * boneUSDValue).toFixed(4)}/></p>
                  <div className="card-hr"></div>
                  <span className="mb-0">Total Reward Distributed</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb"><NumberFormat thousandSeparator displayType={"text"} value={latestBlock}/></h3>
                  <div className="card-hr"></div>
                  <span className="mb-0 trs-3">Bor Block Height</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb">9,554,455 </h3>
                  <div className="card-hr"></div>
                  <span className="mb-0 trs-3">Heimdall Block Height</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb d-flex align-items-center">
                    <span>71,582</span>
                    <span className="ms-2 primary-badge trsn-3 badge-md fs-12">
                      <span className="trs-2">28 minutes ago</span>
                    </span>
                  </h3>
                  <div className="card-hr"></div>
                  <span className="mb-0 trs-3">Last Checkpoint</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb d-flex align-items-center">
                    <span>{lastCheckpoint} Minutes</span>
                  </h3>
                  <div className="card-hr"></div>
                  <span className="mb-0 trs-3">Checkpoint Interval</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default NetworkDetails
import { BONE_ID } from 'app/config/constant'
import { getCheckpointInterval, getHeimdallHeight, getLastCheckpoint, getTotalRewardDistributed, getTotalStake, getValidatorCount } from 'app/services/apis/network-details/networkOverview'
import { getBoneUSDValue } from 'app/services/apis/validator'
import { useLocalWeb3 } from 'app/services/web3'
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'

function NetworkDetails() {
    const [totalValidators, setTotalValidators] = useState<number>(0)
    const [totalStake, setTotalStake] = useState<number>(0)
    const [totalRewardDistributed, setTotalRewardDistributed] = useState<number>(0)
    const [lastCheckpoint, setLastCheckpoint] = useState<any>({});
    const [heimdallHeight, setHeimdallHeight] = useState<number>(0);
    // const [heimdallHeight, setHeimdallHeight] = useState<number>(0);
    const [boneUSDValue, setBoneUSDValue] = useState<number>(0);
    const [latestBlock, setLatestBlock] = useState<number>(0)
  const [checkpointInterval, setCheckpointInterval] = useState<string>('')

    const web3 = useLocalWeb3();
    useEffect(() => {
        try {
            
      
        getBoneUSDValue(BONE_ID).then((res:any)=>{
            setBoneUSDValue(res.data.data.price);
          })
        getValidatorCount().then((res:any)=>{
            if(res &&  res.data && res.data.data){
                setTotalValidators(res.data.data.validatorCount);
            }
        }).catch((error:any)=>{
            console.log(error)
        })
        getTotalStake().then((res:any)=>{
            if(res &&  res.data && res.data.data){
                setTotalStake(res.data.data.totalStake);
            }
        }).catch((error:any)=>{
            console.log(error)
        })
        getTotalRewardDistributed().then((res:any)=>{
            if(res &&  res.data && res.data.data){
                setTotalRewardDistributed(res.data.data.totalReward);
            }
        }).catch((error:any)=>{
            console.log(error)
        })
 
        getHeimdallHeight().then((res:any)=>{
          if(res &&  res.data && res.data.data){
            setHeimdallHeight(res.data.data.height);
          }
      }).catch((error:any)=>{
          console.log(error)
      })
      getLastCheckpoint().then((res:any)=>{
        if(res &&  res.data && res.data.data){
          setLastCheckpoint(res.data.data);
        }
    }).catch((error:any)=>{
        console.log(error)
    })
    getCheckpointInterval().then((res:any)=>{
      if(res &&  res.data && res.data.data){
          setCheckpointInterval(res.data.data.interval);
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
                  <h3 className="fwb"><NumberFormat thousandSeparator displayType={"text"} value={heimdallHeight}/> </h3>
                  <div className="card-hr"></div>
                  <span className="mb-0 trs-3">Heimdall Block Height</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb d-flex align-items-center">
                    <span>
                    <NumberFormat thousandSeparator displayType={"text"} value={lastCheckpoint?.checkpointId || 0}/>
                    </span>
                    <span className="ms-2 primary-badge trsn-3 badge-md fs-12">
                      <span className="trs-2">{lastCheckpoint?.interval || '0'} ago</span>
                    </span>
                  </h3>
                  <div className="card-hr"></div>
                  <span className="mb-0 trs-3">Last Checkpoint</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb d-flex align-items-center">
                    <span>{checkpointInterval}</span>
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
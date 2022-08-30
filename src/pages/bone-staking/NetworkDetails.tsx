import { BONE_ID } from 'app/config/constant'
import { getCheckpointInterval, getHeimdallHeight, getLastCheckpoint, getNetworkOverviewData, getTotalRewardDistributed, getTotalStake, getValidatorCount } from 'app/services/apis/network-details/networkOverview'
import { getBoneUSDValue } from 'app/services/apis/validator'
import { useActiveWeb3React, useLocalWeb3 } from 'app/services/web3'
import { L1Block } from 'app/hooks/L1Block';
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
// @ts-ignore
import { ShimmerTitle, ShimmerTable } from "react-shimmer-effects";

function NetworkDetails() {
  // const [totalValidators, setTotalValidators] = useState<number>(0)
  // const [totalStake, setTotalStake] = useState<number>(0)
  // const [totalRewardDistributed, setTotalRewardDistributed] = useState<number>(0)
  // const [lastCheckpoint, setLastCheckpoint] = useState<any>({});
  // const [heimdallHeight, setHeimdallHeight] = useState<number>(0);
  // const [heimdallHeight, setHeimdallHeight] = useState<number>(0);
  const [boneUSDValue, setBoneUSDValue] = useState<number>(0);
  const [latestBlock, setLatestBlock] = useState<number>(0)
  // const [checkpointInterval, setCheckpointInterval] = useState<string>('')
  const [networkDetails, setNetworkDetails] = useState<any>({})
  const { account } = useActiveWeb3React()
  //const web3 = useLocalWeb3();
  const web3 = L1Block();
  useEffect(() => {
    try {
      getNetworkOverviewData().then((res: any) => {

        setNetworkDetails(res.data && res.data.data && res.data.data.networkDetail ? res.data.data.networkDetail : {})
      }).catch((e) => {

      })

      getBoneUSDValue(BONE_ID).then((res: any) => {
        setBoneUSDValue(res.data.data.price);
      })
      //       getValidatorCount().then((res:any)=>{
      //           if(res &&  res.data && res.data.data){
      //               setTotalValidators(res.data.data.validatorCount);
      //           }
      //       }).catch((error:any)=>{
      //           console.log(error)
      //       })
      //       getTotalStake().then((res:any)=>{
      //           if(res &&  res.data && res.data.data){
      //               setTotalStake(res.data.data.totalStakeFormatted);
      //           }
      //       }).catch((error:any)=>{
      //           console.log(error)
      //       })
      //       getTotalRewardDistributed().then((res:any)=>{
      //           if(res &&  res.data && res.data.data){
      //               setTotalRewardDistributed(res.data.data.totalReward);
      //           }
      //       }).catch((error:any)=>{
      //           console.log(error)
      //       })

      //       getHeimdallHeight().then((res:any)=>{
      //         if(res &&  res.data && res.data.data){
      //           setHeimdallHeight(res.data.data.height);
      //         }
      //     }).catch((error:any)=>{
      //         console.log(error)
      //     })
      //     getLastCheckpoint().then((res:any)=>{
      //       if(res &&  res.data && res.data.data){
      //         setLastCheckpoint(res.data.data);
      //       }
      //   }).catch((error:any)=>{
      //       console.log(error)
      //   })
      //   getCheckpointInterval().then((res:any)=>{
      //     if(res &&  res.data && res.data.data){
      //         setCheckpointInterval(res.data.data.interval);
      //     }
      // }).catch((error:any)=>{
      //     console.log(error)
      // })
      web3?.eth?.getBlockNumber().then((lastBlock: number) => {
        setLatestBlock(lastBlock)
      })
    } catch (error) {
      console.log(error)
    }
  }, [account])

  const cardShimmerEffects = () => {
    return (
      <ShimmerTitle line={3} gap={10} variant="primary" />
    )
  }

  return (
    <div className="container">
      <div className="baner-card">
        <h3 className="mb-0 mb-3 text-white fwb">Network Overview</h3>
        {
          Object.keys(networkDetails).length ? 
        <div className="row">
          <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
            <div className="bs-card card">
              <h3 className="fwb font-xs height-fx">{networkDetails?.validatorCount}</h3>
              <span className="mb-0 trs-3">Total Validators</span>
            </div>
          </div>
          <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
            <div className="bs-card card">
              <h5 className="fwb font-xs height-fx"><NumberFormat thousandSeparator displayType={"text"} value={(+networkDetails?.totalStakeFormatted || 0).toFixed(8)} /> BONE
              </h5>
              <p className="mb-0 d-block fw-600"><NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={+(((+networkDetails?.totalStakeFormatted) * boneUSDValue).toFixed(2))} /></p>
              <div className="card-hr"></div>
              <span className="mb-0">Total Stake</span>
            </div>
          </div>
          <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
            <div className="bs-card card">
              <h5 className="fwb font-xs height-fx"><NumberFormat thousandSeparator displayType={"text"}
                value={(+networkDetails?.totalReward || 0).toFixed(8)} /> BONE</h5>
              <p className="mb-0 d-block fw-600"><NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={((networkDetails?.totalReward || 0) * boneUSDValue).toFixed(2)} /></p>
              <div className="card-hr"></div>
              <span className="mb-0">Total Reward Distributed</span>
            </div>
          </div>
          <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
            <div className="bs-card card">
              <h5 className="fwb font-xs height-fx"><NumberFormat thousandSeparator displayType={"text"} value={latestBlock} /></h5>
              <div className="card-hr"></div>
              <span className="mb-0 trs-3">Bor Block Height</span>
            </div>
          </div>
          <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
            <div className="bs-card card">
              <h5 className="fwb font-xs height-fx"><NumberFormat thousandSeparator displayType={"text"} value={networkDetails?.heimdallHeight} /> </h5>
              <div className="card-hr"></div>
              <span className="mb-0 trs-3">Heimdall Block Height</span>
            </div>
          </div>
          <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
            <div className="bs-card card">
              <h5 className="fwb d-flex align-items-center font-xs height-fx">
                <span>
                  <NumberFormat thousandSeparator displayType={"text"} value={networkDetails?.lastCheckpointId || 0} />
                </span>
                <span className="ms-2 primary-badge trsn-3 badge-md fs-12">
                  <span className="trs-2">{networkDetails?.lastCheckpointInterval || '0'} ago</span>
                </span>
              </h5>
              <div className="card-hr"></div>
              <span className="mb-0 trs-3">Last Checkpoint</span>
            </div>
          </div>
          <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
            <div className="bs-card card">
              <h5 className="fwb d-flex align-items-center font-xs height-fx">
                <span>{networkDetails?.averageInterval}</span>
              </h5>
              <div className="card-hr"></div>
              <span className="mb-0 trs-3">Checkpoint Interval</span>
            </div>
          </div>
        </div>
        :
        <div className="row">
          {
            [...Array(7)].map((x :any) => 
            <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
            <div className="bs-card card">
              {cardShimmerEffects()}
            </div>
          </div>        
            )
          }
    
        </div>
        }
      </div>
    </div>
  )
}

export default NetworkDetails
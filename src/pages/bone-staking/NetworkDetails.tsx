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
    <>
        {/* card-section */}

        <section className="card-section">
          <div className="container">
            <div className="heading-sec"><h2 className="sub-head">Network Overview</h2></div>
           <div className="grid-contain">
          {
          Object.keys(networkDetails).length ? 
           
              <div className="row">
                <div className="col-md-6 col-xl-4 col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>{networkDetails?.validatorCount}</span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Total Validators</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>
                        <NumberFormat thousandSeparator displayType={"text"} value={(+networkDetails?.totalStakeFormatted || 0).toFixed(8)} /> BONE
                        </span>
                      </div>
                      <div className="mid-head">
                        <span>
                        <NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={+(((+networkDetails?.totalStakeFormatted) * boneUSDValue).toFixed(2))} />
                        </span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Total Stake</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>
                        <NumberFormat thousandSeparator displayType={"text"}value={(+networkDetails?.totalReward || 0).toFixed(8)} /> BONE
                        </span>
                      </div>
                      <div className="mid-head">
                        <span>
                        <NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={((networkDetails?.totalReward || 0) * boneUSDValue).toFixed(2)} />
                        </span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Total Reward Distributed</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 mob-margin col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>
                        <NumberFormat thousandSeparator displayType={"text"} value={latestBlock} />
                        </span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Bor Block Height</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 mob-margin col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span><NumberFormat thousandSeparator displayType={"text"} value={networkDetails?.heimdallHeight} /></span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Heimdall Block Height</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 mob-margin col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>
                        <NumberFormat thousandSeparator displayType={"text"} value={networkDetails?.lastCheckpointId || 0} />
                        </span>
                      </div>
                      <div className="mid-head">
                        <span>{networkDetails?.lastCheckpointInterval || '0'} ago</span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Last Checkpoint</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 mob-margin col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>{networkDetails?.averageInterval}</span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span className="ff-mos">Checkpoint Interval</span>
                      </div>
                    </div>
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
        </section>
       
        {/* card section  end */}
    </>
  )
}

export default NetworkDetails
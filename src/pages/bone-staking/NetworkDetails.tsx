import { BONE_ID } from 'app/config/constant'
import { getCheckpointInterval, getHeimdallHeight, getLastCheckpoint, getNetworkOverviewData, getTotalRewardDistributed, getTotalStake, getValidatorCount } from 'app/services/apis/network-details/networkOverview'
import { getBoneUSDValue } from 'app/services/apis/validator'
import { useActiveWeb3React, useLocalWeb3 } from 'app/services/web3'
import { L1Block } from 'app/hooks/L1Block';
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
// @ts-ignore
import { ShimmerTitle, ShimmerTable } from "react-shimmer-effects";
import { PROXY_MANAGER } from 'web3/contractAddresses';
import proxyManagerABI from "../../ABI/StakeManagerProxy.json"
import axios from "axios";
import { tokenDecimal } from 'web3/commonFunctions';
import { useWeb3React } from '@web3-react/core'

function NetworkDetails() {

  const [boneUSDValue, setBoneUSDValue] = useState<number>(0);
  const [latestBlock, setLatestBlock] = useState<number>(0);

  const [totalStake, setTotalStake] = useState(0);
  const [networkDetails, setNetworkDetails] = useState<any>({})
  const { account , library, chainId } = useWeb3React()
  const web3 = L1Block();

  console.log(account,chainId, library, "web3 instance ===> ")

  useEffect(() => {
    try {
      getNetworkOverviewData().then((res: any) => {
        setNetworkDetails(res.data && res.data.data && res.data.data.networkDetail ? res.data.data.networkDetail : {})
      }).catch((e) => {
      })
      getBoneUSDValue(BONE_ID).then((res: any) => {
        setBoneUSDValue(res.data.data.price);
      })
      web3?.eth?.getBlockNumber().then((lastBlock: number) => {
        setLatestBlock(lastBlock)
      })
    } catch (error) {
      console.log(error)
    }

    if(account) {
      getTotalStakes()
    }

  }, [account])

  const cardShimmerEffects = () => {
    return (
      <ShimmerTitle line={3} gap={10} className="cus-shimer"  variant="primary" />
    )
  }

    // GET VALIDATOR ID 
    const getTotalStakes = async () => {
      let user = account;
      if (account) {
        const instance = new web3.eth.Contract(proxyManagerABI, PROXY_MANAGER);
        const ID = await instance.methods.validatorState().call({ from: account });
        let stake = +ID.amount / 10 ** 18
        setTotalStake(stake)
        return ID
      } else {
        console.log("account addres not found")
      }
    }

    const getHeimdallBlockHeight = async () => {
      let url = "http://3.145.82.137:26657/status"
      await axios.get(url).then((res :any) => {
        console.log(res, "getHeimdallBlockHeight")
      }).catch((error :any) => {
        console.log(error)
      })
    }

  return (
    <>
        {/* card-section */}

        <section className="card-section">
          <div className="container">
            <div className="heading-sec"><h2 className="sub-head ff-mos">Network Overview</h2></div>
           <div className="grid-contain">
          {
          Object.keys(networkDetails).length ? 
           
              <div className="row ff-mos">
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
                        <NumberFormat thousandSeparator displayType={"text"} value={(+totalStake || 0).toFixed(tokenDecimal)} /> BONE
                        </span>
                      </div>
                      <div className="mid-head">
                        <span>
                        <NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={+(((+totalStake) * boneUSDValue).toFixed(tokenDecimal))} />
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
                        <NumberFormat thousandSeparator displayType={"text"}value={(+networkDetails?.totalReward || 0).toFixed(tokenDecimal)} /> BONE
                        </span>
                      </div>
                      <div className="mid-head">
                        <span>
                        <NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={((networkDetails?.totalReward || 0) * boneUSDValue).toFixed(tokenDecimal)} />
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
                 [...Array(7)].map((x :any,index:any) => 
                 <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col" key={index}>
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
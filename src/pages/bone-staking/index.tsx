/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useContext } from "react";
import { Dropdown, Navbar, Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { useUserType, useValId } from "../../state/user/hooks";
import NetworkDetails from './NetworkDetails';
import ValidatorsCard from "../all-validator/valitotors";
import { useActiveWeb3React } from "../../services/web3"
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { dynamicChaining } from 'web3/DynamicChaining';
import Web3 from "web3";
import * as Sentry from "@sentry/nextjs";
import { getValidatorInfo } from "app/services/apis/network-details/networkOverview";
import { L1Block, ChainId} from 'app/hooks/L1Block';




const BoneStaking = () => {

  const [userType, setUserType] = useUserType();
  const { account , library, chainId = 1} = useActiveWeb3React()
  const router = useRouter();
  const [valCount, setValCount] = useState(0);
  const [valMaxCount, setValMaxCount] = useState(0);
  const [ nodeSetup, setNodeSetup] = useState<any>('')
  const [valId, setValId] = useValId();

  const web3test = L1Block();
    
  useEffect(() => {
    if(account) {
      getValInfo()
    }
    getValCount()
    checkEth()
  }, [account])

  const checkEth = () => {
    let lib : any = library
    let web3 : any = new Web3(lib?.provider)
     console.log(web3.eth, "account changes testing ")
  }


  const getValCount = async () => {
    try{
      const id = await ChainId()
      let instance = new web3test.eth.Contract(stakeManagerProxyABI, dynamicChaining[id]?.STAKE_MANAGER_PROXY);
        const valCount = await instance.methods.currentValidatorSetSize().call();
        const validatorThreshold = await  instance.methods.validatorThreshold().call();
        const valInfo = await  instance.methods.validators(9).call({from:account});
        const valStake = await  instance.methods.validatorStake(9).call({from:account});
        // console.log(valInfo,valStake,valCount, "val info ===> ")
        setValCount(valCount)
        setValMaxCount(validatorThreshold)
    }
    catch(err:any){
      Sentry.captureMessage("getValCount", err);
    }
  }

  const getValInfo = () => {
    try {
      const valData = JSON.parse(localStorage.getItem("valInfo") || '{}')
      // if(Object.keys(valData).length) {
      //   setNodeSetup(valData.status)
      // } else {
        let id : any = account
        getValidatorInfo(id.toLowerCase()).then((res : any) => {
          // console.log(res.data.message.val?.status, " vall status ===> ")
          setNodeSetup(res.data.message.val?.status ? res.data.message?.val.status : null)
          localStorage.setItem("valInfo", JSON.stringify(res.data.message.val))
        })
      // }
    } catch (err :any) {
        Sentry.captureMessage("getValCount", err);
    }
  }

  // console.log(nodeSetup)

  const renderButtons = () => {
    if (account) {
      if (userType === "Validator") {
        if (nodeSetup) {
          return null
        } else {
          return (
            <div className="btns-sec btn-width">
            <div className="btns-wrap ">
               <button disabled={+valCount <= +valMaxCount ?  false : true} onClick={()=>{
                router.push('/become-validator')
               }} className="btn primary-btn">Become a Validator</button>
            </div>
            <div className="btns-wrap">
              <button onClick={()=>{
                // router.push('/all-validator')
               }} className="btn  white-btn">Become a Delegator</button>
            </div>
            <div className="btns-wrap">
              <button onClick={()=>
                router.push('/choose-your-path')
               } className="btn grey-btn">Choose Your Path</button>
            </div>
          </div>
          );
        }
      } else if (userType === "Delegator") {
        return null
      } else {
        return (
        <div className="btns-sec btn-width">
                    <div className="btns-wrap ">
                       <button disabled={+valCount <= +valMaxCount ?  false : true} onClick={()=>{
                        router.push('/become-validator')
                       }} className="btn primary-btn">Become a Validator</button>
                    </div>
                    <div className="btns-wrap">
                      <button onClick={()=>
                        // router.push('/all-validator')
                       } className="btn  white-btn">Become a Delegator</button>
                    </div>
                    <div className="btns-wrap">
                      <button onClick={()=>
                        router.push('/choose-your-path')
                       } className="btn grey-btn">Choose Your Path</button>
                    </div>
              </div>
        )
      }
    } else {
      return null;
    }
  };
  
  return (
    <>
      <div className="main-content dark-bg-800 full-vh  font-up ffms-inherit staking-main">
        {/* <StakingHeader /> */}
        {/* banner section start */}
        <section className="inner-banner dark-bg">
          <div className="container">
            <div className="section-info">
              <div className="row align-items-center">
                <div className="col-md-7 col-sm-12 ff-mos">
                  <h1 className="ff-mos">Start Earning Rewards with <br /><span className="white-bg">Shibarium Staking</span></h1>
                 {renderButtons()}
                </div>
                <div className="col-md-5 col-sm-12 m-hide">
                  <div className="shib-img-sec text-end">
                    <img src="../../assets/images/shiba-img.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* banner section closed */}
        <NetworkDetails valCount={valCount} />
        {/* ValidatorsCard starts  */}
        <ValidatorsCard />
        {/* ValidatorsCard ends  */}
      </div>
    </>
  );
};

export default BoneStaking;

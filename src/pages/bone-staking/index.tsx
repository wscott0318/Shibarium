/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useContext } from "react";
import { Dropdown, Navbar, Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { useUserType, useUserOpenMev } from "../../state/user/hooks";
import { UserType } from "../../enums/UserType";
import NetworkDetails from './NetworkDetails';
import ValidatorsCard from "../all-validator/valitotors";
import { useActiveWeb3React } from "../../services/web3"
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { dynamicChaining } from 'web3/DynamicChaining';
import Web3 from "web3";
 
const BoneStaking = () => {

  const [userType, setUserType] = useUserType();
  const { account , library, chainId = 1} = useActiveWeb3React()
  const router = useRouter();
  const [valCount, setValCount] = useState(0);
  const [valMaxCount, setValMaxCount] = useState(0);
    
  useEffect(() => {
    if(account){
      getValCount()
    }

  }, [account])

  const getValCount = async () => {
    const lib: any = library;
    const web3: any = new Web3(lib?.provider);
    let instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId]?.STAKE_MANAGER_PROXY);
        const valCount = await instance.methods.currentValidatorSetSize().call({from:account});
        const validatorThreshold = await  instance.methods.validatorThreshold().call({from:account});
        setValCount(valCount)
        setValMaxCount(validatorThreshold)
  }
  
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
                  {userType === 'Validator' ? null : <div className="btns-sec btn-width">
                    <div className="btns-wrap ">
                       <button disabled={+valCount <= +valMaxCount ? false : true} onClick={()=>{
                        router.push('/become-validator')
                       }} className="btn primary-btn">Become a Validator</button>
                    </div>
                    <div className="btns-wrap">
                      <button onClick={()=>{
                        router.push('/all-validator')
                       }} className="btn  white-btn">Become a Delegator</button>
                    </div>
                   {userType === "Delegator" ? null : <div className="btns-wrap">
                      <button onClick={()=>{
                        router.push('/choose-your-path')
                       }} className="btn grey-btn">Choose Your Path</button>
                    </div>}
                  </div>}
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

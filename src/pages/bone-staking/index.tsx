/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useContext } from "react";
import { Dropdown, Navbar, Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import InnerHeader from "../inner-header";
import DelegatePopup from "../delegate-popup";
import Link from "next/link";
import BorderBtn from "../components/BorderBtn";
import WarningBtn from "../components/WarningBtn";
import Valitotors from "../all-validator/valitotors";
import { useUserType, useUserOpenMev } from "../../state/user/hooks";
import { UserType } from "../../enums/UserType";
import NetworkDetails from './NetworkDetails';
import Footer from "../footer/index";
// import { useMoralis } from "react-moralis";
// import BannerCard from './bannerCard'
import StakingHeader from '../staking-header'
import ValidatorsCard from "../all-validator/valitotors";
 
const BoneStaking = () => {
  // const [validators, setValidators] = useState([]);
  const [userType, setUserType] = useUserType();

  // const [isValidator, setIsValidator] = useState(false);
  // const [isDelegator, setIsDelegator] = useState(false);
  // useEffect(()=>{
  //   setTimeout(() => {
  //     usss('Delegator')
  //   }, 4000);
  //   let accounts=localStorage.getItem('accounts')
  //   if(accounts=="0x14d76811453183669C4561eF25f57401414DEEfB"){
  //     setIsDelegator(false)
  //     setIsValidator(true)
  //   }else if(accounts=="0xa9f576E15106eb5861ed4AC2793C010999ab0e7D"){
  //     setIsValidator(false)
  //     setIsDelegator(true)
  //   }else{
  //     setIsValidator(false)
  //     setIsDelegator(false)
  //   }
  // })

  // useEffect(() => {
  //   validatorsList()
  //     .then((res) => {
  //       if (res.status == 200) {
  //         setValidators(res.data.data.validatorsList);
  //       }
  //     })
  //     .catch((err) => {});
  // }, []);

  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();
  // const {user} = useMoralis();
  console.log(userType)

  const [show, setShow] = React.useState();
  return (
    <>
      <div className="main-content dark-bg-800 full-vh top-space font-up ffms-inherit">
        <StakingHeader />
        {/* banner section start */}
        <section className="inner-banner dark-bg">
          <div className="container">
            <div className="section-info">
              <div className="row align-items-center">
                <div className="col-md-7 col-sm-12 ff-mos">
                  <h1 className="ff-mos">Start Earning Rewards with <br /><span className="white-bg">Shibarium Staking</span></h1>
                  {userType === 'Validator' ? null : <div className="btns-sec btn-width">
                    <div className="btns-wrap ">
                       <button onClick={()=>{
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
                    <img src="../../images/shiba-img.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* banner section closed */}
        <NetworkDetails />
        {/* ValidatorsCard starts  */}
        <ValidatorsCard />
        {/* ValidatorsCard ends  */}
      </div>
    </>
  );
};

export default BoneStaking;

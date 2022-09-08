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
import Footer from "../../pages/footer/index";
// import { useMoralis } from "react-moralis";
// import BannerCard from './bannerCard'

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
  // console.log(user)
  const [show, setShow] = React.useState();
  return (
    <div>
      <InnerHeader />
      <DelegatePopup show={modalShow} onHide={() => setModalShow(false)} />
      <section className="banner-section card-banner dark_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="mb-4 text-white title-2 mb-lg-5">
                <span className="mb-2 sub-title d-block mb-md-3 mb-lg-3 trs-6">
                  Start Earning Rewards With
                </span>
                <div className="px-2 bg-white d-inline-block">
                  <span className="grad-text trs-6">Shibarium Staking</span>
                </div>
              </h1>
              {userType === UserType.Delegator && (
                <>
                <div className="flex-wrap d-flex align-items-centeer">
                  <WarningBtn
                    link="become-validator"
                    lable="Become A Validator"
                    handleModal={() => {}}
                  />
                  </div>
                <div className="flex-wrap d-flex align-items-centeer">
                  <WarningBtn
                    link="all-validator"
                    lable="Become A Delegator"
                    // handleModal={() => {}}
                  />
                  </div>
                </>
              )}
              {userType === UserType.NA && (
                <>
                  <div className="flex-wrap d-flex align-items-centeer">
                    <WarningBtn
                      link="./become-validator"
                      lable="Become A Validator"
                      handleModal={() => {}}
                    />
                    <WarningBtn
                      link="delegator"
                      lable="Become A Delegator"
                      handleModal={() => {}}
                    />{" "}
                    <BorderBtn
                      link="./delegator-validator"
                      lable="Choose Your Path"
                      handleModal={() => {}}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="col-lg-4 text-lg-end">
              <img
                className="img-fluid"
                src="../../assets/images/shiba-img.png"
                alt="shiba-img"
              />
            </div>
          </div>
        </div>
      </section>
      {/* banner section end */}
      <section className="mb-4 buy-sell-section mb-lg-5">
        <div className="container">
        <NetworkDetails />
          {/* <BannerCard /> */}
        </div>
      </section>
      <section className="mb-4 mb-lg-5">
        <div className="container">
          <Valitotors withStatusFilter={false} />
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default BoneStaking;

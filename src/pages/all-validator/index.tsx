/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import InnerHeader from "../inner-header";
import DelegatePopup from "../delegate-popup";
import Link from "next/link";
import LoadingSpinner from "../components/Loading";
// import { validatorsList } from "../../services/apis/validator";
// import { filter, orderBy } from "lodash";
// import ListView from "./listView";
// import ValidatorGrid from "./gridView";
// import Pagination from 'app/components/Pagination'
// import { useSearchFilter } from "app/hooks/useSearchFilter";
import Valitotors from "./valitotors";
import { useUserType } from "app/state/user/hooks";
import { UserType } from "app/enums/UserType";
import BorderBtn from "../components/BorderBtn";
import WarningBtn from "../components/WarningBtn";
import Footer from "../../pages/footer/index";
import StakingHeader from '../staking-header'
import { useRouter } from "next/router";
import { NodeNextRequest } from "next/dist/server/base-http/node";
export const Allvalidator: React.FC = () => {
  const [userType, setUserType] = useUserType();
  const myRef = useRef<any>(null)
  const router = useRouter();
  const executeScroll = () => myRef.current.scrollIntoView()

  // useEffect(() => {
  //   let filtered = []
  //   if (isActiveTab) {
  //     filtered = allValidators.filter(e => e.upTime !== 0)
  //   } else {
  //     filtered = allValidators.filter(e => e.upTime === 0)
  //   }
  //   setValidatorsByStatus(filtered)
  // }, [isActiveTab]);

  console.log(userType)

  const renderButtons = () => {
    if (userType === UserType.Delegator) {
      return (
        <div className="btns-wrap">
          <a href="#all-validators-section">
            <button
              className="btn primary-btn btn-rspc ff-mos"
            >
              Become a delegator
            </button>
          </a>
        </div>
      )
    } else if (userType === UserType.NA) {
      return (
        <div className="btns-wrap">
          <button
            onClick={() => {
              router.push("/become-validator");
            }}
            className="btn primary-btn btn-rspc ff-mos"
          >
            Become a Validator
          </button>
          <button
            onClick={() => {
              router.push("/choose-your-path");
            }}
            className="btn primary-btn btn-rspc ff-mos"
          >
            Choose Your Path
          </button>
        </div>
      )
    }
  }
  return (
    <>
      <div className="main-content dark-bg-800 full-vh font-up ffms-inherit">
        {/* <StakingHeader /> */}
        {/* banner section start */}
        <section className="inner-banner dark-bg">
          <div className="container">
            <div className="section-info">
              <div className="row align-items-center">
                <div className="col-md-7 col-sm-12">
                  <div className="lft-txt">
                    <h1 className="mb-2 mb-sm-3 mb-md-4 ff-mos">All Validators</h1>
                    <div className="btns-sec mt-2">
                      {renderButtons()}
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-sm-12 m-hide">
                  <div className="shib-img-sec text-end">
                    <img src="../../images/meaoth.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* banner section closed */}

        <div id="all-validators-section" ref={myRef} className=" ffms-inherit">
          <Valitotors withStatusFilter={true} />
        </div>
      </div>
    </>
  );
}

export default Allvalidator;
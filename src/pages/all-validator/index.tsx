/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
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
  import Footer from "../../pages/footer/index";
export const Allvalidator: React.FC = () => {
  const [userType, setUserType] = useUserType();

  // useEffect(() => {
  //   let filtered = []
  //   if (isActiveTab) {
  //     filtered = allValidators.filter(e => e.upTime !== 0)
  //   } else {
  //     filtered = allValidators.filter(e => e.upTime === 0)
  //   }
  //   setValidatorsByStatus(filtered)
  // }, [isActiveTab]);

 
  return (
    <>
      <div className="page-wrapper">
        {/* {loading && <LoadingSpinner />} */}
        <InnerHeader />
        <main className="delegator-sec">
          <div className="botom-space-lg">
            <div className="black_clr_box position-relative sec-spc-high">
              <div className="char-block">
                <img
                  width="655"
                  height="262"
                  className="img-fluid"
                  src="../../assets/images/meaoth.png"
                  alt=""
                />
              </div>
              <div className="container">
                <div className="row">
                  <div className="text-center col-sm-8 text-sm-start">
                    <h1 className="mb-2 light-text mb-sm-3 fnt-58 fnt-100">
                      All Validators
                    </h1>
                    <div className="flex-wrap d-flex align-items-centeer">
                    {userType !== UserType.Validator ? <div className="">
                      <Link href="./become-validator">
                        <a className="btn gradient_btn" title="">
                          <span>Become A Validator</span>
                        </a>
                      </Link>
                    </div> : null}
                    <Link href="/delegator-validator">
                        <a className="ms-2 btn bordered-btn light-text" title="">
                          <span>Choose Your Path</span>
                        </a>
                      </Link>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
           <Valitotors withStatusFilter={true} />
          </div>
          <Footer/>
        </main>
      </div>
    </>
  );
}

export default Allvalidator;
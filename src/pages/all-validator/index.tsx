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
<<<<<<< HEAD

export const Allvalidator: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(true);
=======
import { useUserType } from "app/state/user/hooks";
import { UserType } from "app/enums/UserType";

export const Allvalidator: React.FC = () => {
  const [userType, setUserType] = useUserType();
>>>>>>> 5950c253af96671849793b05619cb21f0ef7bb83

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
<<<<<<< HEAD
                    <div className="">
=======
                    {userType !== UserType.Validator ? <div className="">
>>>>>>> 5950c253af96671849793b05619cb21f0ef7bb83
                      <Link href="./become-validator">
                        <a className="btn gradient_btn" title="">
                          <span>Become A Validator</span>
                        </a>
                      </Link>
<<<<<<< HEAD
                    </div>
=======
                    </div> : null}
>>>>>>> 5950c253af96671849793b05619cb21f0ef7bb83
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
           <Valitotors withStatusFilter={true} />
          </div>
          <footer className="main-footer">
            <div className="container">
              <div className="mt-4 copyright mt-lg-5">
                <h3 className="mb-0 text-center fwb">Powered by xFund.</h3>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

export default Allvalidator;
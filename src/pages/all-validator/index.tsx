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
export const Allvalidator: React.FC = () => {
  const [userType, setUserType] = useUserType();
  const myRef = useRef<any>(null)

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

 
  return (
    <>
      <h1>all-validator index</h1>
    </>
  );
}

export default Allvalidator;
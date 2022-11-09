/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from "react";
import Header from "../layout/header";
import CommonModal from "../../pages/components/CommonModel";
import { TailSpin } from "react-loader-spinner";
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from "react-bootstrap";
import Sidebar from "../layout/Sidebar";

export default function Dashboard() {
  const [isDeposit, setIsDeposit] = useState(true);
  const [isWithdrw, setIsWithdrw] = useState(false);
  const [showImportantModal, setImportantModal] = useState(false);
  const [showtransferOverviewModal, setTransferOverviewModal] = useState(false);
  
  //
  const [showProgressModal, setProgressModal] = useState(false);
  const [showconfirmunboundModal, setconfirmunboundModal] = useState(false);
  const [showUnboundModal, setUnboundModal] = useState(false) // 3rd;
  const [showUnboundprogModal, setUnboundprogModal] = useState(false); // 2nd
  const [showWithdrawModal, setWithdrawModal] = useState(false);
  const [showTransferModal, setTransferModal] = useState(false);
  const [showClaimstakeModal, setClaimstakeModal] = useState(false);
  const [showProgressTwoModal, setProgressTwoModal] = useState(false);
  //

  const [showProgressFourStepsModal, setProgressFourStepsModal] = useState(false);
  const [showProgressFourStepsModalTwo, setProgressFourStepsModalTwo] = useState(false);
  const [showProgressFourStepsModalThree, setProgressFourStepsModalThree] = useState(false);
  const [showProgressFourStepsModalFour, setProgressFourStepsModalFour] = useState(false);
  const [showProgressFourStepsModalFive, setProgressFourStepsModalFive] = useState(false);
  const [showProgressFourStepsModalSix, setProgressFourStepsModalSix] = useState(false);
  const [showProgressFourStepsModalSeven, setProgressFourStepsModalSeven] = useState(false);
  const [showProgressFourStepsModalEight, setProgressFourStepsModalEight] = useState(false);
  const [showProgressFourStepsModalNine, setProgressFourStepsModalNine] = useState(false);
  const [showProgressFourStepsModalTen, setProgressFourStepsModalTen] = useState(false);






  // below is the same as componentDidMount and componentDidUnmount

  const handleDeposit = () => {
    setIsDeposit(true)
    setIsWithdrw(false)
  };
  const handleWithdrw = () => {
    setIsDeposit(false)
    setIsWithdrw(true)
  };


  return (
   <>
    <h1>dashboard</h1>
   </>
  );
}

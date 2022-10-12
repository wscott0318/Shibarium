/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect,useState } from "react";
import Sidebar from "../layout/sidebar";
import ImportantPopup from "../important-popup";
import SendPopup from "../send-popup";
import BalanceTable from "./balance-table";
import {useBoneBalance} from '../../hooks/useBoneBalance';
import QrModal from "pages/components/QrModal";
import { useActiveWeb3React } from "app/services/web3";
import Footer  from "../../pages/footer/index";
// import QrModal from '../QrModal';


export default function Balance() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalSend, setModalSend] = React.useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const boneBal = useBoneBalance();
  const {account} = useActiveWeb3React();


  const handleOnHide = () => {
    setModalShow(false);
    setModalSend(false);
  };
  const handleContinueToSend = () => {
    setModalSend(true);
  };
  // useEffect(()=>{
  //   setAvailBalance(localStorage.getItem('balance'))
  // })
  return (
  <>
  <h1>balance index</h1>
  </>
  );
}

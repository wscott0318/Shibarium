/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";

import Link from "next/link";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import CommonModal from "../components/CommonModel";
import StakingHeader from '../staking-header';
import Header from "../layout/header";

const Rewards = () => {
  const refName = useRef();
  const refWebsite = useRef();
  const refComission = useRef();
  const [activInput, setActivInput] = useState({
    name: false,
    website: false,
    comission: false,
  });



  const handleEdit = (value) => {
    switch (value) {
      case "name":
        setActivInput((activInput) => ({
          ...activInput,
          name: !activInput.name,
          website: false,
          comission: false,
        }));
        break;
      case "website":
        setActivInput((activInput) => ({
          ...activInput,
          name: false,
          website: !activInput.website,
          comission: false,
        }));
        break;
      case "comission":
        setActivInput((activInput) => ({
          ...activInput,
          name: false,
          website: false,
          comission: !activInput.comission,
        }));
        break;
      default:
        break;
    }
  };
  return (
    <>
      <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg">
      <Header />
            {/* <StakingHeader /> */}
      </main>
    </>
  );
};

export default Rewards;

import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserType, useValId, useValInfo } from "../../state/user/hooks";
import { useActiveWeb3React } from "../../services/web3";
import { ValInfoModals } from "pages/components/CommonModel";
import Web3 from "web3";
import { dynamicChaining } from "web3/DynamicChaining";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json"
import * as Sentry from "@sentry/nextjs";
import { getValidatorInfo } from "app/services/apis/network-details/networkOverview";
import { PUPPYNET517 } from "app/hooks/L1Block";
import NumberFormat from "react-number-format";

const StakingHeader = (type: any) => {
  const router = useRouter();

  const [userType, setUserType] = useUserType();  //NOSONAR
  const [valId, setValId] = useValId(); //NOSONAR
  const [valInfoModal, setValInfoModal] = useState(false);
  const [dynasty, setDynasty] = useState('')
  const { account, chainId = 1, library } = useActiveWeb3React();
  const web3Test = PUPPYNET517();
  const [valInfo, setValInfo] = useValInfo(); //NOSONAR
  const [latestBlock, setLatestBlock] = useState<number>(0);
  const [stakingHeader, showStakingHeader] = useState(false);
  const getValInfoApi = async (id: any) => {
    try {
      await getValidatorInfo(id).then(res => {
        if (res.data && res.data.message) {
          let info = res.data.message.val;
          setValInfo(info);
        }
      })
    } catch (error: any) {
      Sentry.captureMessage("getValInfoApi ", error);
    }
  }

  useEffect(() => {
    if (account) {
      getValInfoApi(account);
    }
  }, [account, userType]);

  useEffect(() => {
    if (account) {
      console.log("step 1")
      getDynsetyValue()
    }
  }, [router, account, userType]);


  const getDynsetyValue = async () => {
    try {
      console.log("step 2 ");
      const lib: any = library;
      console.log("step 3 ");
      const web3: any = new Web3(lib?.provider);
      console.log("step 4 ");
      let instance = new web3.eth.Contract(
        stakeManagerProxyABI,
        dynamicChaining[chainId].STAKE_MANAGER_PROXY
      );
      console.log("step 5 ", instance);
      const dynasty = await instance.methods.checkPointBlockInterval().call({ from: account });
      web3Test?.eth?.getBlockNumber().then((lastBlock: number) => {
        setLatestBlock(lastBlock)
      })
      console.log("last checkpoint ", dynasty)
      setDynasty(dynasty);
    } catch (err: any) {

    }
  }

  const renderButtons = () => {
    if (account) {
      if (userType === "Validator") {
        console.log("valId ==> ", valId);
        if (+valId === 0 || valId == null) {
          console.log("in condition entered ");
          return (
            <>
              <li className="nav-item">
                <p className={`nav-link ff-mos ${router.asPath === "/my-account" ? "active" : ""
                  }`} onClick={() => setValInfoModal(true)}>
                  {/* <p
                    className={`nav-link ff-mos ${
                      router.asPath === "/my-account" ? "active" : ""
                    }`}
                  > */}
                  My Account
                  {/* </p> */}
                </p>
              </li>
              <li className="nav-item">
                <DropdownButton
                  className="dd-style cus-arw"
                  id="dropdown-item-button"
                  title={"History"}
                >
                  <Dropdown.Item>
                    <p onClick={() => setValInfoModal(true)}>Reward History</p>
                  </Dropdown.Item>
                </DropdownButton>
              </li>
            </>
          );
        } else {
          return (
            <>
              <li className="nav-item">
                <Link href="/my-account" className="nav-link ff-mos" passHref>
                  <p
                    className={`nav-link ff-mos ${router.asPath === "/my-account" ? "active" : ""
                      }`}
                  >
                    My Account
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <DropdownButton
                  className="dd-style cus-arw"
                  id="dropdown-item-button"
                  title={"History"}
                >
                  <Dropdown.Item>
                    <Link href="/reward-history" passHref>
                      Reward History
                    </Link>
                  </Dropdown.Item>
                </DropdownButton>
              </li>
            </>
          );
        }
      } else if (userType === "Delegator") {
        return (
          <>
            <li className="nav-item">
              <Link href="/my-account" className="nav-link ff-mos" passHref>
                <p
                  className={`nav-link ff-mos ${router.asPath === "/my-account" ? "active" : ""
                    }`}
                >
                  My Account
                </p>
              </Link>
            </li>

            <li className="nav-item">
              <DropdownButton
                className="dd-style cus-arw"
                id="dropdown-item-button"
                title={"History"}
              >
                <Dropdown.Item>
                  <Link href="/unbond-history" passHref>
                    Unbound History
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href="/reward-history" passHref>
                    Reward History
                  </Link>
                </Dropdown.Item>
              </DropdownButton>
            </li>
          </>
        )
      } else {
        return (
          <>
            <li className="nav-item">
              <Link href="/my-account" className="nav-link ff-mos" passHref>
                <p
                  className={`nav-link ff-mos ${router.asPath === "/my-account" ? "active" : ""
                    }`}
                >
                  My Account
                </p>
              </Link>
            </li>
          </>
        );
      }
    } else {
      return null;
    }
  };
  return (
    <>
      <ValInfoModals
        title="Status"
        show={valInfoModal}
        setshow={() => setValInfoModal(false)}
        externalCls=""
      >
        <div className="popmodal-body tokn-popup no-ht trans-mod">
          <div className="pop-block">
            <div className="pop-top">
              <div className="dark-bg-800 h-100 status-sec sec-ht position-relative status-sep-popup">
                <img
                  className="img-fluid"
                  src="../../assets/images/waiting-small.png"
                  alt="Wait"
                />
                <p className="light-text primary-text"> Wait for <NumberFormat style={{ fontSize: "24px" }} displayType='text' thousandSeparator value={+dynasty + +latestBlock} /> blocks to see your account info...
                  <br /><span style={{ color: "red" }}>**If your NODE is fully synced**</span></p>
              </div>
            </div>
          </div>
        </div>
      </ValInfoModals>
      <div className="staking_header_wrapper">
        <div className="staking-header dark-bg-800">
          <button className="toggle_staking_header" onClick={() => showStakingHeader(!stakingHeader)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className={`container ${stakingHeader ? "active" : ""}`}>
            {stakingHeader && <span
              className="close-icon"
              style={{ cursor: "pointer" }}
              onClick={() => showStakingHeader(false)}
            >
              <img
                className="img-fluid"
                src="../../assets/images/close-icon.png"
                alt="close-icon"
              />
            </span>}
            <div className="lft-sec">
              <ul className="lft-links ms-auto">
                <li className="nav-item">
                  <Link href="/" passHref>
                    <p
                      className={`nav-link ff-mos ${router.asPath === "/" ? "active" : ""
                        }`}
                    >
                      Overview
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/all-validator" passHref>
                    <p
                      className={`nav-link ff-mos ${router.asPath === "/all-validator" ? "active" : ""
                        }`}
                    >
                      All Validators
                    </p>
                  </Link>
                </li>
                {renderButtons()}
              </ul>
            </div>
          </div>
        </div>
      {/* @ts-ignore */}
      {userType === "Validator" && valInfo?.valInfo?.signer !== valInfo?.valInfo?.staker && valInfo?.valInfo?.signer === account && <div className="signer_warning">Please switch to your staker account to enable transactions.</div>}
      </div>
    </>
  );
};

export default StakingHeader;

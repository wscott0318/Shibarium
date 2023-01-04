import React, { useState, useEffect, useContext } from "react";
import {
  Dropdown,
  Navbar,
  Container,
  Nav,
  DropdownButton,
} from "react-bootstrap";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useUserType, useValId, useValInfo } from "../../state/user/hooks";
import { useActiveWeb3React } from "../../services/web3";
import { ValInfoModals } from "pages/components/CommonModel";
import Web3 from "web3";
import { dynamicChaining } from "web3/DynamicChaining";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json"
import * as Sentry from "@sentry/nextjs";
import { getUserType, getValidatorInfo } from "app/services/apis/network-details/networkOverview";
import { useAppDispatch } from "app/state/hooks";
import { clearAllTransactions } from "app/state/transactions/actions";
import Image from "next/image";

const StakingHeader = (type:any) => {
  const router = useRouter();

  const routeCheck = (x: string) => {
    return router.asPath.split("/")[1] === x;
  };
  const [history, setHistory] = useState("");
  const [userType, setUserType] = useUserType();
  const [valId, setValId] = useValId();
  const [valInfoModal, setValInfoModal] = useState(false);
  const [dynasty, setDynasty] = useState('')
  const { account, chainId = 1, library, active } = useActiveWeb3React();

  const [valInfo, setValInfo] = useValInfo();
  const dispatch = useAppDispatch();

//  useEffect(() => {
//    const { ethereum } = window as any;
//    const handleAccountsChanged = (accounts: string[]) => {
//     //  console.log("Handling 'accountsChanged' event with payload", accounts);
//      setValInfoModal(false);
//      dispatch(clearAllTransactions({ chainId }));
//    };
//   if(account) {
//     ethereum.on("accountsChanged", handleAccountsChanged)
//   }
// }, [active, account]);

  // useEffect(() => {
  //   if(chainId != 5){
  //     router.push("/home");
  //   }
  // },[chainId]);

  const [stakingHeader, showStakingHeader] = useState(false);
  const getValInfoApi = async (id: any) => {
    try {
      await getValidatorInfo(id).then(res => {
        if (res.data && res.data.message) {
          let info = res.data.message.val;
          console.log("val status = ", res.data.message.val.status);
          console.log("val ID = ", valId);
          setValInfo(info);
        }
      }).catch(err => console.log("err => ", err))
    } catch (error: any) {
      // console.log("catch err => ", error);
      Sentry.captureMessage("getValInfoApi ", error);
    }
  }
  // const getUsertypeAPI = (accountAddress: any) => {
  //   try {
  //     getUserType(accountAddress.toLowerCase()).then(res => {
  //       if (res.data && res.data.data) {
  //         let ut = res.data.data.userType;
  //         let valID = res.data.data.validatorId ? res.data.data.validatorId : "0";
  //         // console.log(ut)
  //         setUserType(ut)
  //         setValId(valID)
  //       }
  //     })
  //   } catch (error: any) {
  //     Sentry.captureMessage("getUsertypeAPI", error);
  //   }
  // }
  // useEffect(() => {
  //   if (account) {
  //     getUsertypeAPI(account)
  //   }
  // }, [account])
  useEffect(() => {
    try {
      if (account) {
        getValInfoApi(account);
      }
    }
    catch (err: any) {
      Sentry.captureMessage("useEffect, file -> staking-header/index.tsx , line no. 55 ", err);
    }
  }, [account,userType]);
  console.log("user type ==> " , userType);
  useEffect(() => {
    if (routeCheck("unbond-history")) {
      setHistory("Unbound History");
    } else if (routeCheck("reward-history")) {
      setHistory("Reward History");
    }
    if (account) {
      getDynsetyValue()
    }
  }, [router, account,userType]);

  // useEffect(() => {
  //   window.location.reload();
  // },[valInfo]);
  // console.log("usertype ==> ", valId);

  const getDynsetyValue = async () => {
    try {
      const lib: any = library;
      const web3: any = new Web3(lib?.provider);
      let instance = new web3.eth.Contract(
        stakeManagerProxyABI,
        dynamicChaining[chainId].STAKE_MANAGER_PROXY
      );
      const dynasty = await instance.methods.dynasty().call({ from: account });
      setDynasty(dynasty)
    } catch (err: any) {

    }
  }

  const renderButtons = () => {
    if (account) {
      if (userType === "Validator") {
        console.log("valId ==> " ,valId);
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
                <p className="light-text primary-text"> Wait for {dynasty} checkpoints to see your account info...</p>
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
                  <Link href="/bone-staking" passHref>
                    <p
                      className={`nav-link ff-mos ${router.asPath === "/bone-staking" ? "active" : ""
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
      </div>
    </>
  );
};

export default StakingHeader;

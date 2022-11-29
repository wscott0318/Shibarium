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
import { useUserType, useValId } from "../../state/user/hooks";
import { useActiveWeb3React } from "../../services/web3";
import CommonModal from "pages/components/CommonModel";

const StakingHeader = () => {
  const router = useRouter();

  const routeCheck = (x: string) => {
    return router.asPath.split("/")[1] === x;
  };
  const [history, setHistory] = useState("");
  const [userType, setUserType] = useUserType();
  const [valId, setValId] = useValId();
  const [valInfoModal, setValInfoModal] = useState(false);

  const { account, chainId = 1, library } = useActiveWeb3React();

  useEffect(() => {
    if (routeCheck("unbond-history")) {
      setHistory("Unbound History");
    } else if (routeCheck("reward-history")) {
      setHistory("Reward History");
    }
  }, [router, account]);

  console.log("usertype ==> ", valId);

  const renderButtons = () => {
    if (account) {
      if (userType === "Validator") {
        if (+valId <= 0) {
          return (
            <>
              <li className="nav-item">
                <p className="nav-link ff-mos" onClick={() => setValInfoModal(true)}>
                  <p
                    className={`nav-link ff-mos ${
                      router.asPath === "/my-account" ? "active" : ""
                    }`}
                  >
                    My Account
                  </p>
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
                    className={`nav-link ff-mos ${
                      router.asPath === "/my-account" ? "active" : ""
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
                className={`nav-link ff-mos ${
                  router.asPath === "/my-account" ? "active" : ""
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
                  className={`nav-link ff-mos ${
                    router.asPath === "/my-account" ? "active" : ""
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
      <CommonModal
        title="Status"
        show={valInfoModal}
        setshow={() => setValInfoModal(false)}
        externalCls=""
      >
        <div className="popmodal-body tokn-popup no-ht trans-mod">
          <div className="pop-block">
            <div className="pop-top">
              <div className="dark-bg-800 h-100 status-sec sec-ht position-relative">
               <p className="text-primary"> wait for 80 checkpoint to see your account info...</p>
              </div>
            </div>
          </div>
        </div>
      </CommonModal>
      <div className="staking-header dark-bg-800">
        <div className="container">
          <div className="lft-sec">
            <ul className="lft-links ms-auto">
              <li className="nav-item">
                <Link href="/bone-staking" passHref>
                  <p
                    className={`nav-link ff-mos ${
                      router.asPath === "/bone-staking" ? "active" : ""
                    }`}
                  >
                    Overview
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/all-validator" passHref>
                  <p
                    className={`nav-link ff-mos ${
                      router.asPath === "/all-validator" ? "active" : ""
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
    </>
  );
};

export default StakingHeader;

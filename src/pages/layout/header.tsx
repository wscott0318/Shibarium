/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect, useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
import StakingHeader from '../staking-header'
import Link from "next/link";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Web3Status from "app/components/Web3Status";
import { getUserType } from "app/services/apis/user/userApi";
import { useUserType, useValId } from "app/state/user/hooks";
import AppHeader from "../inner-header/AppHeader";
import { useNetworkModalToggle } from "../../state/application/hooks";
import { useActiveWeb3React } from "../../services/web3";
import NetworkModel from "../../modals/NetworkModal";
import QrModal from "pages/components/QrModal";
import { getNetworkName } from "web3/commonFunctions";
import * as Sentry from "@sentry/nextjs";

export default function Header() {
  
  const {account, deactivate } = useWeb3React();
  const { chainId } = useActiveWeb3React();
  const router = useRouter();
  const [userType, setUserType] = useUserType();
  const [userQrCode, setUserQrCode] = useState(false);

  const [valId, setValId] = useValId();

  // console.log("valid redux ===> ",userType, valId);

  useEffect(() => {
    if (account) {
      getUsertypeAPI(account)
    }
  }, [account])


  const logoutHandler = () => {
    deactivate();
    router.push("/home");
  };

  const getUsertypeAPI = (accountAddress :any) => {
    try {
      getUserType(accountAddress.toLowerCase()).then(res => {
        if (res.data && res.data.data) {
          let ut = res.data.data.userType;
          let valID = res.data.data.validatorId ? res.data.data.validatorId : "0";
          // console.log(ut)
          setUserType(ut)
          setValId(valID)
        }
      })
    } catch (error:any) {
      console.log(error)
      setUserType('NA')
      setValId("0")
      Sentry.captureMessage("getUsertypeAPI" , error);
    }
  }

const toggleNetworkModal = useNetworkModalToggle();


const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 5);
    });
  },[])

  return (
    <>
      <header
        className={
          scroll
            ? "main-header header-overide sticky-header"
            : "main-header header-overide"
        }
      >
        <Navbar className="py-0">
          <Container>
            <Navbar.Brand href="/">
              {/* <img className='img-fluid' src="../../assets/images/logo.png" alt="site-logo" width={250} /> */}
              <div className="logo-wrap">
                <div className="lg-lft">
                  <img
                    className="img-fluid"
                    src="../../assets/images/shibarium-logo.png"
                    alt="site-logo"
                    width={50}
                  />
                </div>
                <div className="lg-rt">
                  <img
                    className="img-fluid"
                    src="../../assets/images/shib-text.png"
                    alt="site-logo"
                    width={150}
                  />
                </div>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <NavDropdown
                  className="d-none"
                  title="Dropdown"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <AppHeader />
                {!account ? (
                  <Nav.Item className="button-wrap cus_dropdown">
                    <Link href={"/wallet"} passHref>
                      <a className="d-none launch-btn">
                        <img
                          className="img-fluid"
                          src="../../assets/images/launch-app.png"
                          alt=""
                          width={30}
                        />
                      </a>
                    </Link>
                    <Link href={account ? "/wallet" : "/login"} passHref>
                      <a className="btn primary-btn ff-mos">Launch App</a>
                    </Link>
                  </Nav.Item>
                ) : (
                  <Nav.Item className="button-wrap cus_dropdown">
                    {/* <Link href={"/"}> */}
                    <button
                      onClick={toggleNetworkModal}
                      className="d-md-none launch-btn"
                    >
                      <img
                        className="img-fluid"
                        src="../../assets/images/switch-icon.png"
                        alt=""
                        width={30}
                      />
                    </button>
                    {/* </Link> */}
                    <NavDropdown
                      className="form-select d-none d-md-flex innerDivBgBlack hd-sel hd-sel-over"
                      title={getNetworkName(chainId)}
                      id=""
                    >
                      <NavDropdown.Item
                        // disabled={user ? false : true}
                        onClick={toggleNetworkModal}
                      >
                        <h6 className="fw-600 light-text left-border">
                          Switch Network
                        </h6>
                        <span className="light-text">
                          Switch to other Network
                        </span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav.Item>
                )}
                <Nav.Item className="btn-status inner-btn">
                  {account ? (
                    <>
                      <Web3Status />
                      <Dropdown className="nav-item d-flex align-items-center cus-dd mob-drop drop-cus">
                        <div className="dot-icon" id="basic-nav-dropdown"></div>
                        <NavDropdown title="" className="me-3">
                          <div className="drop-head">
                            <div className="head-brand">
                              <img
                                className="mx-auto img-fluid"
                                src="../../assets/images/Shib-Logo.png"
                                alt=""
                              />
                            </div>
                            <div className="head-txt fx-txt">
                              <div className="top-txt">
                                <div>
                                  <span>
                                    {userType === "NA" ? "User" : userType}
                                  </span>
                                </div>
                                <div>
                                  <span className="grey-txt">
                                    {getNetworkName(chainId)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {userType === "Validator" && (
                            <NavDropdown.Item>
                              <div className="custum-row">
                                <div className="lft-img prof-icon">
                                  <img
                                    className="img-fluid"
                                    src="../../assets/images/file-icon.png"
                                    alt="profile"
                                    width={24}
                                  />
                                </div>
                                <Link href="/profile-update" passHref>
                                  <span className="center-txt">Profile</span>
                                </Link>
                                <div className="rt-image">
                                  <img
                                    src="../../assets/images/rt-arow.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </NavDropdown.Item>
                          )}
                          <NavDropdown.Item
                            href="javascript:void(0)"
                            onClick={() => setUserQrCode(true)}
                          >
                            <div className="custum-row">
                              <div className="lft-img">
                                <img
                                  src="../../assets/images/recive-icon.png"
                                  alt=""
                                />
                              </div>
                              <div className="center-txt">
                                <span>Receive Funds</span>
                              </div>
                              <div className="rt-image">
                                <img
                                  src="../../assets/images/rt-arow.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href={`https://etherscan.io/address/${account}`}
                            target="blank"
                          >
                            <div className="custum-row">
                              <div className="lft-img">
                                <img
                                  src="../../assets/images/graph.png"
                                  alt=""
                                />
                              </div>
                              <div className="center-txt">
                                <span>View on Etherscan</span>
                              </div>
                              <div className="rt-image">
                                <img
                                  src="../../assets/images/rt-arow.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">
                            <div className="custum-row">
                              <div className="lft-img">
                                <img
                                  src="../../assets/images/graph.png"
                                  alt=""
                                />
                              </div>
                              <div className="center-txt">
                                <span>View on Shibariumscan</span>
                              </div>
                              <div className="rt-image">
                                <img
                                  src="../../assets/images/rt-arow.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="javascript:void(0)">
                            <div className="custum-row mb-0">
                              <div className="lft-img ps-2">
                                <img
                                  src="../../assets/images/back.png"
                                  alt=""
                                  onClick={logoutHandler}
                                />
                              </div>
                              <div
                                className="center-txt"
                                onClick={logoutHandler}
                              >
                                <span>Logout</span>
                              </div>
                              <div className="rt-image" onClick={logoutHandler}>
                                <img
                                  src="../../assets/images/rt-arow.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Dropdown>
                    </>
                  ) : null}
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <NetworkModel />
        {account && (
          <QrModal
            title={"My QR Code"}
            show={userQrCode}
            setshow={setUserQrCode}
            address={account}
          />
        )}
        {router.asPath !== "/home" && router.asPath !== "/faq" && (
          <StakingHeader />
        )}
      </header>
    </>
  );
}

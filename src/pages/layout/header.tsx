/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect, useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';

import Link from "next/link";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
// import { useAccount } from "../../../hooks/web3hooks";
import { walletConnector } from "../../utils/connectors";
import Web3Status from "app/components/Web3Status";
import { RightMenu } from "app/components/Header/Desktop";
import { NETWORK_LABEL } from "app/config/networks";
// import Web3 from 'web3';
import { getUserType } from "app/services/apis/user/userApi";
import { useUserType } from "app/state/user/hooks";
// import { UserType } from "../../enums/UserType";
import ShibaSidebar from "pages/token-sidebar";
import { login } from "app/functions/login";
import AppHeader from "../inner-header/AppHeader";
import useENSName from "app/hooks/useENSName";
// import { injected } from "app/config/wallets";
import NetworkButton from "pages/inner-header/NetworkButton";
import { useNetworkModalToggle } from "../../state/application/hooks";

export default function Header() {
  const { chainId, account, active, error, library, activate, deactivate } = useWeb3React()
  const { handleAccount } = useContext(ProjectContext)
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [dblock, setDblock] = useState(false);
  const [userType, setUserType] = useUserType();

  const { asPath } = useRouter()
  const toggleNetworkModal = useNetworkModalToggle();

  useEffect(() => {
    if (account) {
      getUsertypeAPI(account)
    }
  }, [account])
  const { ENSName } = useENSName(account ?? undefined);
  const copyAddress = () => {
    let user :any = account
    navigator.clipboard.writeText(user);
  };

  const logoutHandler = async () => {
    deactivate();
    await router.push("/home");
  };
  useEffect(() => {
    if (account)
      localStorage.setItem('isLoggedIn', "true")
    else
      localStorage.removeItem('isLoggedIn')
  }, [account]);

  const getUsertypeAPI = (accountAddress : any) => {
    try {
      getUserType(accountAddress.toLowerCase()).then(res => {
        if (res.data && res.data.data) {
          let ut = res.data.data.userType;
          console.log(ut)
          setUserType(ut)
        }
      }).catch(e => {
        // console.log(e);
        setUserType('NA')
      })
    } catch (error) {

    }
  }

  console.log(asPath)
  

  // below is the same as componentDidMount and componentDidUnmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, isVisible);
    return () => {
      document.removeEventListener("click", handleClickOutside, isVisible);
    };
  }, []);

  const handleClickOutside = (event : any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  },[])

  
  const getNetworkName = () => {
    if(chainId == 1){
      return "Ethereum Mainnet"
    } else if (chainId == 5){
      return "Goerli Testnet"
    } else {
      return "Shibarium Mainnet"
    }
  }

  return (
    <>
      <header className={scroll ? 'main-header header-overide sticky-header' : 'main-header header-overide'}>
        <Navbar className='py-0'>
          <Container>
            <Navbar.Brand href="/">
              {/* <img className='img-fluid' src="../../images/logo.png" alt="site-logo" width={250} /> */}
              <div className="logo-wrap">
                <div className="lg-lft"><img className='img-fluid' src="../../images/shibarium-logo.png" alt="site-logo" width={50} /></div>
                <div className="lg-rt"><img className='img-fluid' src="../../images/shib-text.png" alt="site-logo" width={150} /></div>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <NavDropdown className="d-none" title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                {asPath === "/home" ? null : <AppHeader />}
                <Nav.Item className="button-wrap">
                <Link href={'/'}>
                    <a className='d-md-none launch-btn'>
                      <img className="img-fluid" src="../../images/launch-app.png" alt="" width={30} />
                    </a>
                </Link>
                <NavDropdown
                  className="form-select innerDivBgBlack hd-sel hd-sel-over"
                  title={getNetworkName()}
                  id=""
                >
                  <NavDropdown.Item
                    // disabled={user ? false : true}
                    onClick={() => toggleNetworkModal()}
                  >
                    <h6 className="fw-600 light-text left-border">
                      Switch Network home
                    </h6>
                    <span className="light-text">
                      Switch to other Network
                    </span>
                  </NavDropdown.Item>
                </NavDropdown>
                </Nav.Item>
                <Nav.Item className="btn-status inner-btn">
                    {account ? 
                    <>
                    <Web3Status />
                      <Dropdown className="nav-item d-flex align-items-center cus-dd mob-drop drop-cus">
                        <div className="dot-icon" id="basic-nav-dropdown"></div>
                        <NavDropdown className="me-3" title="">
                          <div className="drop-head">
                            <div className="head-brand">
                              <img
                                className="mx-auto img-fluid"
                                src="../../images/Shib-Logo.png"
                                alt=""
                              />
                            </div>
                            <div className="head-txt">
                              <div className="top-txt">
                                <div>
                                  <span>
                                    {userType === "NA" ? "User" : userType}
                                  </span>
                                </div>
                                <div>
                                  <span className="grey-txt">
                                    {getNetworkName()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <NavDropdown.Item
                            href="javascript:void(0)"
                            onClick={() => setUserQrCode(true)}
                          >
                            <div className="custum-row">
                              <div className="lft-img">
                                <img
                                  src="../../images/recive-icon.png"
                                  alt=""
                                />
                              </div>
                              <div className="center-txt">
                                <span>Receive Funds</span>
                              </div>
                              <div className="rt-image">
                                <img src="../../images/rt-arow.png" alt="" />
                              </div>
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href={`https://etherscan.io/address/${account}`}
                            target="blank"
                          >
                            <div className="custum-row">
                              <div className="lft-img">
                                <img src="../../images/graph.png" alt="" />
                              </div>
                              <div className="center-txt">
                                <span>View on Etherscan</span>
                              </div>
                              <div className="rt-image">
                                <img src="../../images/rt-arow.png" alt="" />
                              </div>
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">
                            <div className="custum-row">
                              <div className="lft-img">
                                <img src="../../images/graph.png" alt="" />
                              </div>
                              <div className="center-txt">
                                <span>View on Shibariumscan</span>
                              </div>
                              <div className="rt-image">
                                <img src="../../images/rt-arow.png" alt="" />
                              </div>
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">
                            <div className="custum-row mb-0">
                              <div className="lft-img ps-2">
                                <img
                                  src="../../images/back.png"
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
                                <img src="../../images/rt-arow.png" alt="" />
                              </div>
                            </div>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Dropdown>
                      </> : null}
                    
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

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
import { useMoralis } from "react-moralis";
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from "../../config/constant"
import { login } from "app/functions/login";
// import { injected } from "app/config/wallets";

export default function Header() {
  const { chainId, account, active, error, library, activate, deactivate } = useWeb3React()
  const { handleAccount } = useContext(ProjectContext)
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [dblock, setDblock] = useState(false);
  const [userType, setUserType] = useUserType();

  const { authenticate, isAuthenticated, User, user, logout, Moralis, ...restMoralisObj } = useMoralis();
  // console.log({authenticate, isAuthenticated,User, user,logout,Moralis})

  useEffect(() => {
    if (!account) logout().then();
    localStorage.setItem("ShibariumUser", JSON.stringify(user || []))
  }, [user, account]);


  async function loginNew() {
    if (!isAuthenticated) {

      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  async function logOut() {
    await Moralis.User.logOut()
    console.log('logged out')
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isAuthenticated) {
      // authenticate()
    }
    if (account && user) {

      getUsertype(account)
    }
  }, [account, user])
  useEffect(() => {
    if (account)
      localStorage.setItem('isLoggedIn', true)
    else
      localStorage.removeItem('isLoggedIn')
  }, [account]);

  const getUsertype = (accountAddress) => {
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
  useEffect(() => {
    const { ethereum } = window
    if (ethereum && ethereum.on && !error) {
      console.log({ eth: ethereum.on })
      const handleConnect = () => {
        // console.log("Connected");
        // activate(injected)
      }
      const handleChainChanged = (chainId) => {
        // if (library) {
        //   sign(account)
        // }
        authenticate()
      }
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0) {
          // if (library) {
          authenticate()
        }
        // activate(injected)
      }
      const handleNetworkChanged = (networkId) => {
        // activate(injected)
        // login(authenticate,isAuthenticated)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
    // else if(error){
    //  const errMsg = getErrorMessage(error)
    //  if (errMsg) {
    //    setErrorMessage(errMsg)
    //  }
    // }
  }, [active, error, activate]);


  function handlClick() {
    setIsOpen((prev) => !prev);
  }
  const toggleRef = useRef();

  // below is the same as componentDidMount and componentDidUnmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, isVisible);
    return () => {
      document.removeEventListener("click", handleClickOutside, isVisible);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  const removeDblockClass = (e) => {
    if (toggleRef.current === e.target) {
      setDblock(false);
    }
  };

  const handleToggleIcon = () => {
    setDblock(!dblock);
  };

  const LogoutMetamask = async () => {
    await logout()
    router.push("/home");
    handleAccount("")
    deactivate()
    // localStorage.removeItem('isLoggedIn')
  };
  // const sign = (publicAddress) => {
  //   let web3 = new Web3(library?.provider)
  //   if (publicAddress && web3 && web3.eth && web3.eth.personal) {
  //     web3.eth.personal.sign(
  //       'Welcome to Shibarium',
  //       publicAddress,
  //       () => { }
  //     )
  //   }
  // }

 const handleScrollToElement = (event) => {
    console.log(event)
}

const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  },[])

  return (
    <>
      <header className={scroll ? 'main-header sticky-header' : 'main-header'}>
        <Navbar className='py-0'>
          <Container>
            <Navbar.Brand href="/">
              <img className='img-fluid' src="../../images/logo.png" alt="site-logo" width={250} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
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
                <Nav.Item>
                <Link href={ account ? "/wallet" : "/login"}>
                    <a className='btn primary-btn ff-mos'>Launch App</a>
                  </Link>
                </Nav.Item>
                <Nav.Item className="btn-status">
                    {account ? <Web3Status /> : null}
                    <Dropdown className="nav-item d-flex align-items-center cus-dd mob-drop">
                    <div className="dot-icon" id="basic-nav-dropdown">
                      {/* <div class="drop-chev">
                      <img className="img-fluid" src="../../images/chev-drop.png" alt="chev-ico"/>
                    </div> */}
                    </div>
                    <NavDropdown className="me-3">
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
                              <span>Account 0xe78</span>
                            </div>
                            <div>
                              <span className="grey-txt">
                                Shibarium Mainnet
                              </span>
                            </div>
                          </div>
                          <div className="botom-txt">
                            <div className="code-txt">
                              {/* <span className="key">0xe7832a34576B9A23b98B7cE8ef83B1a8D9D229f0</span> */}
                              <span className="key">{ENSName || account}</span>
                            </div>
                            <div className="copy-blk">
                              {/* <button> */}
                              <a href="javascript:void(0);" title="Copy">
                                <img
                                  src="../../images/copy.png"
                                  alt=""
                                  onClick={copyAddress}
                                />
                              </a>
                              {/* </button> */}
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
                            <img src="../../images/recive-icon.png" alt="" />
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
                          <div className="center-txt" onClick={logoutHandler}>
                            <span>Logout</span>
                          </div>
                          <div className="rt-image" onClick={logoutHandler}>
                            <img src="../../images/rt-arow.png" alt="" />
                          </div>
                        </div>
                      </NavDropdown.Item>
                      {/* <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                  Separated link
                                </NavDropdown.Item> */}
                    </NavDropdown>
                  </Dropdown>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

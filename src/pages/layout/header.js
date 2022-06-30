/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from "react-bootstrap";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
// import { useAccount } from "../../../hooks/web3hooks";
import { walletConnector } from "../../utils/connectors";
import Web3Status from "app/components/Web3Status";
import { RightMenu } from "app/components/Header/Desktop";
import { NETWORK_LABEL } from "app/config/networks";
import Web3 from 'web3';
import { getUserType } from "app/services/apis/user/userApi";
import { useUserType } from "app/state/user/hooks";

export default function Header() {
  const { chainId, account, active, error, library, activate, deactivate } = useWeb3React()
  const { handleAccount } = useContext(ProjectContext)
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [dblock, setDblock] = useState(false);
  const [userType, setUserType] =useUserType();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (account && !isLoggedIn) {
      sign(account)
    }
  }, [account])
  useEffect(() => {
    if (account)
      localStorage.setItem('isLoggedIn', true)
    else
      localStorage.removeItem('isLoggedIn')
  }, [account]);

  const getUsertype = (accountAddress) =>{
    getUserType(accountAddress.toLowerCase()).then( res =>{
      if (res.data && res.data.data) {
        let ut = UserType[res.data.data.userType];
        setUserType(ut)
      }
    }).catch(e=>{
      console.log(e);
      setUserType('NotValidatorNorDeligator')
    })
  }
  useEffect(() => {
    const { ethereum } = window
    if (ethereum && ethereum.on && !error) {
      const handleConnect = () => {
        console.log("Connected");
        // activate(injected)
      }
      const handleChainChanged = (chainId) => {
        if (library) {
          sign(account)
        }
        // activate(injected)
      }
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          if (library) {
            sign(accounts[0])
            getUsertype(accounts[0])
           }
          }
        // activate(injected)
      }
      const handleNetworkChanged = (networkId) => {
        // activate(injected)
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

  const LogoutMetamask = () => {
    router.push("/home");
    handleAccount("")
    deactivate()
    localStorage.removeItem('isLoggedIn')
  };
  const sign = (publicAddress) => {
    let web3 = new Web3(library?.provider)
    if (publicAddress && web3 && web3.eth && web3.eth.personal) {
      web3.eth.personal.sign(
        'Welcome to Shibarium',
        publicAddress,
        () => { }
      )
    }
  }
  return (
    <>
      <header className="main-header darkBg">
        <nav className="p-0 navbar navbar-expand-xl navbar-light">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <a
                href="javascript:void(0)"
                className="burger-menu d-xl-none"
                onClick={handlClick}
              >
                <img
                  src="../../assets/images/bars-solid.png"
                  alt=""
                  className="menu-sm"
                  width={18}
                />
              </a>
              <a className="navbar-brand " href="/home" passHref={true}>
                <img
                  className="img-fluid"
                  src="../../assets/images/logo.png"
                  alt=""
                />
              </a>
            </div>
            <div ref={wrapperRef} className="active">
              {isOpen ? <Sidebar isOpen={isOpen} /> : null}
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                {/* <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="./dashboard">Fast Withdraw / Deposits</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./payments">On Ramp Transfers</a>
                </li> */}
                {/* <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">How it Works?</a>
                </li>
                <li className="nav-item">
                  <a href="javascript:void(0)" className="nav-link">
                    FAQ
                  </a>
                </li>
                <li className="nav-item">
                  <a className='nav-link' href="javascript:void(0)">
                    User Guide
                  </a>
                </li> */}
              </ul>
            </div>
            <div className="app-menu cus-dd ms-3 d-none">
              {/* <NavDropdown className='light-text' title="App" id="">
                <NavDropdown.Item href="#action/3.1">
                  <h6 className='fw-600 light-text left-border'>Shibarium Wallet</h6>
                  <span className="light-text">Send and receive crypto assets on Shibarium network</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <h6 className='fw-600 light-text left-border'>Shibarium Bridge</h6>
                  <span className='light-text'>Deposit and withdraw between networks</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <h6 className='fw-600 light-text left-border'>Stacking</h6>
                  <span className='light-text'>Stake shiba and earn rewards</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  <h6 className='fw-600 light-text left-border'>Widget Dashboard</h6>
                  <span className='light-text'>Manage all your Shibarium wallet widgets at one place</span>
                </NavDropdown.Item>
              </NavDropdown> */}
            </div>

            <div
              className={`right-widget ms-auto ${dblock ? "d-block" : ""}`}
              ref={toggleRef}
              onClick={(e) => removeDblockClass(e)}
            >
              <div className="widg-col cus-dd">
                <NavDropdown className="light-text" title="App" id="">
                  <NavDropdown.Item href="#action/3.1">
                    <h6 className="fw-600 light-text left-border">
                      Shibarium Wallet
                    </h6>
                    <span className="light-text">
                      Send and receive crypto assets on Shibarium network
                    </span>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <h6 className="fw-600 light-text left-border">
                      Shibarium Bridge
                    </h6>
                    <span className="light-text">
                      Deposit and withdraw between networks
                    </span>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <h6 className="fw-600 light-text left-border">Stacking</h6>
                    <span className="light-text">
                      Stake shiba and earn rewards
                    </span>
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item href="#action/3.3">
                    <h6 className="fw-600 light-text left-border">
                      Widget Dashboard
                    </h6>
                    <span className="light-text">
                      Manage all your Shibarium wallet widgets at one place
                    </span>
                  </NavDropdown.Item> */}
                </NavDropdown>
              </div>
              {router.pathname == "/dashboard" && (
                <div className="widg-col">
                  {/* <a className="btn gradient_btn" href="javascript:void(0)">
                    <span>Switch to Shibarium</span>
                  </a> */}
                </div>
              )}
              {router.pathname == "/balance" && (
                <div className="widg-col ">
                  {/* <a className="btn gradient_btn" href="javascript:void(0)">
                    <span>Switch to Shibarium</span>
                  </a> */}
                </div>
              )}
              {account ? (
                <>
                  <div className="widg-col d-flex align-items-center dd-mask">
                    {/* <div className="prof-img me-2">
                      <img
                        className="img-fluid"
                        src="../../assets/images/meta.png"
                        alt="prof-img"
                      />
                    </div> */}
                    <RightMenu />
                    <div className="cus-dd">
                      
                      <NavDropdown
                        // title={`Account ${
                        //   account && account.slice(0, 4)
                        // }`}
                        title=''
                        id=""
                      >
                        <NavDropdown.Item href="#action/3.1">
                          <div className="detail-col">
                            <div className="d-flex align-items-center">
                              <div className="img-wrap me-2 d-flex align-items-center justify-content-center">
                                <div className="shp-sqr"></div>
                              </div>
                              <div className="item-wrap">
                                <div className="d-flex justify-content-between">
                                  <span className="light-text trs-3">
                                    {`Account ${account &&
                                      account.slice(0, 4)
                                      }`}
                                  </span>
                                  <span className="light-text fw-500 trs-3">
                                    {chainId && NETWORK_LABEL[chainId]}
                                  </span>
                                </div>
                                <div className="label-btn badge-sm">
                                  {account}
                                </div>
                              </div>
                            </div>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="px-2 arrow-after"
                          href="#action/3.2"
                        >
                          <div className="d-flex">
                            <div className="img-wrap me-3">
                              <img
                                src="../../assets/images/scaner.png"
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                            <span className="light-text">Show QR Code</span>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="px-2 arrow-after"
                          onClick={LogoutMetamask}
                        >
                          <div className="d-flex" >
                            <div className="img-wrap me-3">
                              <img
                                src="../../assets/images/logout.png"
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                            <span className="light-text">Logout</span>
                          </div>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {error ? <Web3Status /> : <form action="" className="inline-form ms-2">
                    <a href="jvascript:void(0)" className="btn gradient_btn">
                    <Link href="/login" >
                      {/* <a className=""> */}
                        <span>Connect To A Wallet</span>
                      {/* </a> */}
                    </Link>
                    </a>
                  </form>}
                </>
              )}
              {/* <div className="widg-col d-flex align-items-center">
                <div className="prof-img me-2">
                  <img
                    className="img-fluid"
                    src="../../assets/images/meta.png"
                    alt="prof-img"
                  />
                </div>
                <div className="cus-dd">
                  <NavDropdown
                    title={`Account ${accountAddress&&accountAddress.slice(0,4)}`}
                    id=""
                  >
                    <NavDropdown.Item href="#action/3.1">
                      <div className="detail-col">
                        <div className="d-flex align-items-center">
                          <div className="img-wrap me-2 d-flex align-items-center justify-content-center">
                            <div className="shp-sqr"></div>
                          </div>
                          <div className="item-wrap">
                            <div className="d-flex justify-content-between">
                              <span className="light-text trs-3">
                                {`Account ${accountAddress&&accountAddress.slice(0,4)}`}
                              </span>
                              <span className="light-text fw-500 trs-3">
                                Shibarium
                              </span>
                            </div>
                            <div className="label-btn badge-sm">
                             {accountAddress}
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="px-2 arrow-after"
                      href="#action/3.2"
                    >
                      <div className="d-flex">
                        <div className="img-wrap me-3">
                          <img
                            src="../../assets/images/scaner.png"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <span className="light-text">Show QR Code</span>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="px-2 arrow-after"
                      href="#action/3.2"
                    >
                      <div className="d-flex" onClick={LogoutMetamask}>
                        <div className="img-wrap me-3">
                          <img
                            src="../../assets/images/logout.png"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <span className="light-text">Logout</span>
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </div> */}
            </div>
            {/* <div className="d-flex align-items-center d-none">
              <div className="icon-col">
                <div className="toggle-icon" onClick={handleToggleIcon}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div> */}
          </div>
        </nav>
      </header>
    </>
  );
}

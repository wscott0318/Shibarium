/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect, useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

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
                  <Link className='btn primary-btn ff-mos' href="/assets">
                    Launch App
                  </Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

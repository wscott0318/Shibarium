import React, { useState, useEffect } from "react";
import { Dropdown, Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import useENSName from "../../hooks/useENSName";
import { innerNavTab } from "app/constants/Resources/sideNavTab";
import GlobleHeader from "../components/GlobleHeader";
import Web3Status from "app/components/Web3Status";
import CommonModal from "../components/CommonModel";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../functions/format";
import QrModal from "pages/components/QrModal";
import NetworkModel from "../../modals/NetworkModal";
import { useNetworkModalToggle } from "../../state/application/hooks";
import AppHeader from "./AppHeader";
import { useUserType} from "../../state/user/hooks"
import NetworkButton from "./NetworkButton";
import { useActiveWeb3React } from "app/services/web3";
import { getUserType } from "app/services/apis/user/userApi";
import { getNetworkName } from "web3/commonFunctions";


const InnerHeader = () => {
  const router = useRouter();
  const [show, setshow] = useState();
  const [offset, setOffset] = useState(0);
  const [accountAddress, setAccountAddress] = useState("")
  const [userQrCode, setUserQrCode] = useState(false);

  const {account, active, error, library, activate, deactivate } = useWeb3React();
  const { chainId } = useActiveWeb3React();

  const [userType, setUserType] = useUserType();

  const toggleNetworkModal = useNetworkModalToggle();
  
  useEffect(() => {
    if(account) {
      getUsertypeAPI(account)
      }
  }, [account, chainId]);


  const { ENSName } = useENSName(account ?? undefined);
  const [showScanpop, setScanpop] = useState(false);

  const [menuState, setMenuState] = useState(false);

  const handleMenuState = () => {
    console.log("called menue")
    setMenuState(false)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(account);
  }

  const getUsertypeAPI = (accountAddress) => {
    try {
      getUserType(accountAddress.toLowerCase()).then(res => {
        if (res.data && res.data.data) {
          let ut = res.data.data.userType;
          // console.log(ut)
          setUserType(ut)
        }
      }).catch(e => {
        // console.log(e);
        setUserType('NA')
      })
    } catch (error) {

    }
  }

  const logoutHandler = async () => {
    deactivate();
    await router.push("/home");
  }
  const [selectNet, setSelectNet] = useState("Shibarium Mainnet")

  if (!chainId) return null;



  return (
    <>
      <header className="inner-header">
        {account && (
          <QrModal
            title={"My QR Code"}
            show={userQrCode}
            setshow={setUserQrCode}
            address={account}
          />
        )}
        <NetworkModel />
        <Navbar className="py-0" variant="dark">
          <Container>
            <div className="left-widget"></div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <AppHeader />
                <Nav.Item className="d-flex align-items-center cus_dropdown">
                  {/* <Link href={"/"} passHref> */}
                    <button onClick={toggleNetworkModal}>
                      <a className="d-md-none swap-btn">
                        <img
                          className="img-fluid"
                          src="../../assets/images/switch-icon.png"
                          alt=""
                          width={30}
                        />
                      </a>
                    </button>
                  {/* </Link> */}

                  <NetworkButton />
                </Nav.Item>
                <Nav.Item className="btn-status">
                  <Web3Status />
                  <Dropdown className="nav-item d-flex align-items-center cus-dd mob-drop drop-cus">
                    <div className="dot-icon" id="basic-nav-dropdown"></div>
                    <NavDropdown className="me-3">
                      <div className="drop-head">
                        <div className="head-brand">
                          <img
                            className="mx-auto img-fluid"
                            src="../../assets/images/Shib-Logo.png"
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
                            <div className="fx-txt">
                              <span className="grey-txt">
                                {getNetworkName(chainId)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {userType === 'Validator' && <NavDropdown.Item>
                        <div className="custum-row">
                          <div className="lft-img prof-icon">
                            <img
                              className="img-fluid"
                              src="../../assets/images/profile-round.png"
                              alt="profile"
                              width={32}
                            />
                          </div>
                          <Link href="profile-update" passHref>
                            <span className="center-txt">Profile</span>
                          </Link>
                          <div className="rt-image">
                            <img src="../../assets/images/rt-arow.png" alt="" />
                          </div>
                        </div>
                      </NavDropdown.Item>}
                      <NavDropdown.Item
                        href="/"
                        onClick={() => setUserQrCode(true)}
                      >
                        <div className="custum-row">
                          <div className="lft-img">
                            <img src="../../assets/images/recive-icon.png" alt="" />
                          </div>
                          <div className="center-txt">
                            <span>Receive Funds</span>
                          </div>
                          <div className="rt-image">
                            <img src="../../assets/images/rt-arow.png" alt="" />
                          </div>
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href={`https://etherscan.io/address/${account}`}
                        target="blank"
                      >
                        <div className="custum-row">
                          <div className="lft-img">
                            <img src="../../assets/images/graph.png" alt="" />
                          </div>
                          <div className="center-txt">
                            <span>View on Etherscan</span>
                          </div>
                          <div className="rt-image">
                            <img src="../../assets/images/rt-arow.png" alt="" />
                          </div>
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/">
                        <div className="custum-row">
                          <div className="lft-img">
                            <img src="../../assets/images/graph.png" alt="" />
                          </div>
                          <div className="center-txt">
                            <span>View on Shibariumscan</span>
                          </div>
                          <div className="rt-image">
                            <img src="../../assets/images/rt-arow.png" alt="" />
                          </div>
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/">
                        <div className="custum-row mb-0">
                          <div className="lft-img ps-2">
                            <img
                              src="../../assets/images/back.png"
                              alt=""
                              onClick={logoutHandler}
                            />
                          </div>
                          <div className="center-txt" onClick={logoutHandler}>
                            <span>Logout</span>
                          </div>
                          <div className="rt-image" onClick={logoutHandler}>
                            <img src="../../assets/images/rt-arow.png" alt="" />
                          </div>
                        </div>
                      </NavDropdown.Item>
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
};

export default InnerHeader;

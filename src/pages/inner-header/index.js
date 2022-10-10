import React, { useState, useEffect } from "react";
import { Dropdown, Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

import { innerNavTab } from "app/constants/Resources/sideNavTab";
import GlobleHeader from "../components/GlobleHeader";
import Web3Status from "app/components/Web3Status";
import CommonModal from "../components/CommonModel";

const InnerHeader = () => {
  const router = useRouter();
  const [show, setShow] = useState();
  const [offset, setOffset] = useState(0);
  const [accountAddress, setAccountAddress] = useState("")

  useEffect(() => {
    setAccountAddress(localStorage.getItem('accounts'))
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  const [showScanpop, setScanpop] = useState(false);

  const [menuState, setMenuState] = useState(false);

  const handleMenuState = () => {
    console.log("called menue")
    setMenuState(false)
  }
  return (

    <>
      <header className="inner-header">
        <Navbar className='py-0' variant="dark">
          <Container>
            <div className="left-widget">
              {/* <Navbar.Brand className="nav-logo">
                <img className="img-fluid" src="../../images/logo.png" alt="logo" width={120} />
              </Navbar.Brand> */}
              {/* <Navbar.Brand onClick={() => handleMenuState(true)} className="menu-btn">
                <img className="img-fluid" src="../../images/menu.svg" alt="" />
              </Navbar.Brand> */}
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Dropdown className="nav-item d-flex align-items-center cus-dd app-drop">
                  <div className="dot-icon" id="basic-nav-dropdown">
                    <img src="../../images/menu-icon.png" alt="" />
                  </div>
                  <NavDropdown className="light-text dd-ico" title="App" id="">
                    <NavDropdown.Item href="/wallet">
                      <h6 className="fw-600 light-text left-border">
                        Shibarium Wallet
                      </h6>
                      <span className="light-text">
                        Send and receive crypto assets on Shibarium network
                      </span>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/withdraw">
                      <h6 className="fw-600 light-text left-border">
                        Shibarium Bridge
                      </h6>
                      <span className="light-text">
                        Deposit and withdraw between networks
                      </span>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/bone-staking">
                      <h6 className="fw-600 light-text left-border">Staking</h6>
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
                </Dropdown>

                {/* <Nav.Item>
                              <Link href={'javascript:void(0)'}>
                                <a className='btn primary-btn d-flex align-items-center' href="javascript:void(0)">
                                  <img className="img-fluid me-2" src="../../images/meta-icon.png" alt="meta-img"/>
                                  <span>0x21A...48A5</span>
                                </a>
                              </Link>
                            </Nav.Item> */}
                <Nav.Item className="d-flex align-items-center">
                  <Link href={'javascript:void(0)'}>
                    <a className='d-md-none swap-btn'>
                      <img className="img-fluid" src="../../images/eth-swap.png" alt="" width={30} />
                    </a>
                  </Link>
                  <Link href={'javascript:void(0)'}>
                    <a className='d-none btn primary-btn d-md-flex align-items-center' href="javascript:void(0)">
                      <span className="d-none d-sm-inline-block">Switch to Shibarium</span>
                      <img className="img-fluid d-sm-none" src="../../images/meta-icon.png" alt="img=icon" width={12} />
                    </a>
                  </Link>
                </Nav.Item>
                <Nav.Item className="btn-status">
                  <Web3Status />
                  <Dropdown className="nav-item d-flex align-items-center cus-dd mob-drop">
                    <div className="dot-icon" id="basic-nav-dropdown">
                      {/* <div class="drop-chev">
                      <img className="img-fluid" src="../../images/chev-drop.png" alt="chev-ico"/>
                    </div> */}
                    </div>
                    <NavDropdown className="me-3">
                      <div className="drop-head">
                        <div className="head-brand">
                          <img className="mx-auto img-fluid" src="../../images/Shib-Logo.png" alt="" />
                        </div>
                        <div className="head-txt">
                          <div className="top-txt">
                            <div>
                              <span>Account 0xe78</span>
                            </div>
                            <div>
                              <span className="grey-txt">Shibarium Mainnet</span>
                            </div>
                          </div>
                          <div className="botom-txt">
                            <div className="code-txt">
                              <span className="key">0xe7832a34576B9A23b98B7cE8ef83B1a8D9D229f0</span>
                            </div>
                            <div className="copy-blk">
                              <a href="javascript:void(0);" title="Copy"><img src="../../images/copy.png" alt="" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <NavDropdown.Item href="javascript:void(0)" onClick={() => setScanpop(true)}>
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
                      <NavDropdown.Item href="#action/3.2">
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
                            <img src="../../images/back.png" alt="" />
                          </div>
                          <div className="center-txt">
                            <span>Logout</span>
                          </div>
                          <div className="rt-image">
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
      {/* retake popop start */}
      <CommonModal
        title={"Retake"}
        show={showScanpop}
        setShow={setScanpop}

      >
        <>


          <div className="cmn_modal">
            <div className="qr-wrap">
              <div className="scan-wrap">
                <img className="img-fluid mx-auto" src="../../images/qr.png" alt="qr-img" width={200} />
              </div>
              <div className="mt-4 text-center lite-color">Wallet address </div>
              <div className="text-center word-wrap">0x993E8794Ca03F520c4A8A30F7C0f44f6B57C1D93</div>
            </div>
            <div className="text-center footer-sec modal-footer">
              <button className="btn primary-btn w-100">
                <div className="">
                  <div className="flex items-center gap-1 cursor-pointer"> Copy address </div>
                </div>
              </button>
            </div>
          </div>

        </>
      </CommonModal>
      {/* retake popop ends */}
    </>
  );
};

export default InnerHeader;

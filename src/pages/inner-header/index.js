import React,{useState,useEffect} from "react";
import { Dropdown, Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

import { innerNavTab } from "app/constants/Resources/sideNavTab";
import  GlobleHeader  from "../components/GlobleHeader";

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




  return (
    <div className="wrapper">
      {/* <header className={`main-header darkBg ${offset==0?"":"sticky-header"}`}>
        <div className="container">
          <nav className="nav justify-content-between align-items-center">
            <div className="left-widget">
              <a href="./home" className="navbar-brand">
                <img
                  className="img-fluid"
                  src="../../assets/images/logo.png"
                  alt=""
                />
                <img
                  className="img-fluid d-none"
                  src="../../assets/images/logo-white.png"
                  alt=""
                />
              </a>
            </div>
            <div className="right-widget">
              <div className="widg-col cus-dd">
                <NavDropdown
                  className="light-text"
                  title="App"
                  id="collasible-nav-dropdown"
                >
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
                  <NavDropdown.Item href="#action/3.3">
                    <h6 className="fw-600 light-text left-border">
                      Widget Dashboard
                    </h6>
                    <span className="light-text">
                      Manage all your Shibarium wallet widgets at one place
                    </span>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              
              <div className="widg-col d-flex align-items-center">
                <div className="prof-img me-2">
                  <img
                    className="img-fluid"
                    src="../../assets/images/meta.png"
                    alt="prof-img"
                  />
                </div>
                <div className="cus-dd">
                  <NavDropdown
                    title={accountAddress&&accountAddress.slice(0,4)}
                    id="collasible-nav-dropdown"
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
                                {accountAddress&&accountAddress.slice(0,4)}
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
                      onClick={LogoutMetamask}
                    >
                      <div className="d-flex">
                        <div className="img-wrap me-3" >
                          <img
                            src="../../assets/images/logout.png"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <span className="light-text" >Logout</span>
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header> */}
      <header className="bottom-header">
        <Navbar expand="md" className="py-0">
          <Container>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="nav-toggle"
            />
            <Navbar.Collapse id="basic-navbar-nav header-row">
              <GlobleHeader tab={innerNavTab} />
              <ul className="ms-auto navbar-nav header-row d-none">
                <li className="nav-item">
                  <Nav.Link href="./rewards-calculator">
                    Reward Calculator
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link href="#!">Shiba Explorer</Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link href="#!">FAQ</Nav.Link>
                </li>
              </ul>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};

export default InnerHeader;

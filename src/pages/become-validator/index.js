/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";

import Link from "next/link";

import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';

const Rewards = () => {
  const refName = useRef();
  const refWebsite = useRef();
  const refComission = useRef();
  const [activInput, setActivInput] = useState({
    name: false,
    website: false,
    comission: false,
  });



  const handleEdit = (value) => {
    switch (value) {
      case "name":
        setActivInput((activInput) => ({
          ...activInput,
          name: !activInput.name,
          website: false,
          comission: false,
        }));
        break;
      case "website":
        setActivInput((activInput) => ({
          ...activInput,
          name: false,
          website: !activInput.website,
          comission: false,
        }));
        break;
      case "comission":
        setActivInput((activInput) => ({
          ...activInput,
          name: false,
          website: false,
          comission: !activInput.comission,
        }));
        break;
      default:
        break;
    }
  };
  return (
    <div className="wrapper">
      {/* banner section start */}
      {/* <header className="main-header darkBg">
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
              <div className="widg-col cus-dd me-4">
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
              <div className="widg-col d-flex align-items-center ms-4">
                <div className="prof-img me-2">
                  <img
                    className="img-fluid"
                    src="../../assets/images/meta.png"
                    alt="prof-img"
                  />
                </div>
                <div className="cus-dd">
                  <NavDropdown
                    title="Account 5d45"
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
                                Account 5d45
                              </span>
                              <span className="light-text fw-500 trs-3">
                                Mumbai
                              </span>
                            </div>
                            <div className="label-btn badge-sm">
                              0H2T6362YDC8H5VLUW4S8T1X4W8DT5J4U8V2Z5W8F4J
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
                      <div className="d-flex">
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
            </div>
          </nav>
        </div>
      </header> */}
      {/* <header className='bottom-header'>
                <Navbar expand="md" className="py-0">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-toggle" />
                        <Navbar.Collapse id="basic-navbar-nav header-row">
                            <GlobleHeader tab={leftheaderTab}  handleActiveTab={handleActiveTab}/>
                            <ul className="ms-auto navbar-nav header-row">
                                <li className="nav-item">
                                    <Nav.Link href="javascript:void(0)">Reward Calculator</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link href="javascript:void(0)">Shiba Explorer</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link href="javascript:void(0)">FAQ</Nav.Link>
                                </li>
                            </ul>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header> */}
      <section className="py-4 banner-section darkBg py-md-5">
        <div className="container">
          <h1 className="text-white trs-6 fw-500">Become a validator</h1>
        </div>
      </section>
      {/* banner section end */}

      <section
        className="rewards-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3 validator-steps">
              <ul className="step-vertical">
                <li className="step-list active completed">
                  <p className="light-text fw-700">Setup Node</p>
                  <div className="step-blk step-float">
                    <span className="fw-700 step-num">1</span>
                    <img
                      className="img-fluid tick-img"
                      src="../../assets/images/green-tick.png"
                      alt=""
                      width={20}
                    />
                  </div>
                </li>
                <li className="step-list active">
                  <p className="light-text fw-700">Add Node Detail</p>
                  <div className="step-blk step-float">
                    <span className="fw-700 step-num">2</span>
                    <img
                      className="img-fluid tick-img"
                      src="../../assets/images/green-tick.png"
                      alt=""
                      width={20}
                    />
                  </div>
                </li>
                <li className="step-list">
                  <p className="light-text fw-700">Add Your Stake</p>
                  <div className="step-blk step-float">
                    <span className="fw-700 step-num">3</span>
                    <img
                      className="img-fluid tick-img"
                      src="../../assets/images/green-tick.png"
                      alt=""
                      width={20}
                    />
                  </div>
                </li>
                <li className="step-list">
                  <p className="light-text fw-700">Completed</p>
                  <div className="step-blk step-float">
                    <span className="fw-700 step-num">4</span>
                    <img
                      className="img-fluid tick-img"
                      src="../../assets/images/green-tick.png"
                      alt=""
                      width={20}
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-8">

              {/* step 1 start*/}
                <StepOne />
              {/* step 1 end */}

              {/* step 2  start */}
                <StepTwo />
              {/* step 2 end */}

              {/* step 3 start */}

                <StepThree />

              {/* step 3 end */}

              {/* step 4 start */}
              <StepFour activInput= {activInput} handleEdit= {handleEdit} />

              {/* step 4 end */}
              <div className="btn-wrap col-sm-3 mt-4 mt-5">
                <button type="button" className="btn warning-btn w-100">
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rewards;

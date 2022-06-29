/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";

import Link from "next/link";

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
              <div className="progress-tab">
                <h5 className="mb-2 fw-800">Setup a node</h5>
                <p className="mb-0 fw-700">
                  You can setup your node using any of the options from below
                </p>
                <div className="box-alert top-space-lg">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="circle-box lt-warning me-3">
                        <img
                          className="img-fluid"
                          width="26"
                          height="30"
                          src="../../assets/images/ansible.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="trs-3">
                      <h6 className="fw-600">Ansible</h6>
                      <p className="ft-16 fw-600">
                        Your Ansible playbooks for setting up Shiba Validator
                        node
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 box-alert box-active">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="circle-box lt-white me-3">
                        <img
                          className="img-fluid"
                          width="26"
                          height="30"
                          src="../../assets/images/binaries.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="trs-3">
                      <h6 className="fw-600">Ansible</h6>
                      <p className="ft-16 fw-600">
                        Your Ansible playbooks for setting up Shiba Validator
                        node
                      </p>
                    </div>
                  </div>
                </div>
                <p className="ft-16 fw-700 top-btm-spacelg">
                  Queries? If you face any trouble during installation or
                  syncing, do share your queries in this{" "}
                  <a
                    href="javascript:void(0);"
                    className="fw-700 link-color"
                    title=""
                  >
                    forum
                  </a>{" "}
                  or on our{" "}
                  <a
                    href="javascript:void(0);"
                    className="fw-700 link-color"
                    title=""
                  >
                    Validator Discord channcel.
                  </a>
                </p>
              </div>
              {/* step 1 end */}

              {/* step 2 start start */}
              <div className="progress-tab d-none">
                <div className="mb-4 mb-xl-5">
                  <h5 className="fwb">Add node details</h5>
                  <p>
                    Please provide your node details for better recognizability
                  </p>
                </div>
                <div className="row">
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Validator logo
                      </label>
                      <div className="file-wrap">
                        <div className="file-icons">
                          <img
                            src="../../assets/images/file-icon.png"
                            alt=""
                            className="img-fluid"
                            width={22}
                          />
                        </div>
                        <div className="file-input">
                          <input type="file" className="input-file" />
                          <a href="javascript:void(0)" className="form-control">
                            Upload
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Validator name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="i.e Dark Knight Ventures"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Website
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="https://knightventures.com"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Signer’s address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Signer’s Public key
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Comission in %
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* step 2 end */}

              {/* step 3 start */}
              <div className="progress-tab d-none">
                <div className="mb-4 mb-xl-5">
                  <h5 className="fwb">Add your stake amount</h5>
                  <p>Please provide your stake amount detail here</p>
                </div>
                <div className="row">
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Enter the stake amount
                      </label>
                      <input
                        type="text"
                        className="mb-3 form-control"
                        placeholder="i.e Dark Knight Ventures"
                      />
                      <label htmlFor="" className="form-label">
                        Minimum: 1000 BONE
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* step 3 end */}

              {/* step 4 start */}
              <div className="progress-tab d-none">
                <div className="mb-4 mb-xl-5">
                  <h5 className="fwb">Check complete detail</h5>
                  <p>Please confirm your details and submit</p>
                </div>
                <div className="row">
                  
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <label htmlFor="" className="form-label d-block">
                        Validator logo
                      </label>
                      <div className="icon-wrap">
                          <img className="img-fluid" src="../../assets/images/logo-icon.png" alt="logo" width={20} />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <label htmlFor="" className="form-label d-block">
                        Signer’s address
                      </label>
                      <label htmlFor="" className="form-value">
                        01d2tyke2866633dlpwqs3900371
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="" className="form-label">
                          Validator name
                        </label>
                        <a
                          className="primary-text trs-3"
                          href="javascript:void(0)"
                          onClick={() => handleEdit("name")}
                        >
                          Edit
                        </a>
                      </div>
                      <div className="input-wrap">
                        <label htmlFor="" className="form-value">
                          Dark Knight Ventures
                        </label>
                        {activInput.name ? (
                          <input
                                type="text"
                            className="form-control edit-input show"
                            placeholder="i.e Dark Knight Ventures"
                          />
                        ) : (
                          ""
                        )}
                        {/* <input
                          ref={ref}
                          type="text"
                          className="form-control edit-input show"
                          //   className={`form-control edit-input ${
                          //     activInput.name ? "show" : ""
                          //   }`}
                          placeholder="i.e Dark Knight Ventures"
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <label htmlFor="" className="form-label d-block">
                        Signer’s public key
                      </label>
                      <label htmlFor="" className="form-value">
                        01d2tyke2866633dlpwqs3900371
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="" className="form-label">
                          Website
                        </label>
                        <a
                          className="primary-text trs-3"
                          href="javascript:void(0)"
                          onClick={() => handleEdit("website")}
                        >
                          Edit
                        </a>
                      </div>
                      <div className="input-wrap">
                        <label htmlFor="" className="form-value">
                          https://knightventures.com
                        </label>
                        {activInput.website ? (
                          <input
                            type="text"
                            className="form-control edit-input show"
                            placeholder="i.e Dark Knight Ventures"
                          />
                        ) : (
                          ""
                        )}
                        {/* <input
                          type="text"
                          //   className={`form-control edit-input ${
                          //     activInput.website ? "show" : ""
                          //   }`}
                          className="form-control edit-input show"
                          placeholder="i.e Dark Knight Ventures"
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <label htmlFor="" className="form-label d-block">
                        Stake amount
                      </label>
                      <label htmlFor="" className="form-value">
                        1269.36
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6 form-grid">
                    <div className="form-group">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="" className="form-label">
                          Comission in %
                        </label>
                        <a
                          className="primary-text trs-3"
                          href="javascript:void(0)"
                          onClick={() => handleEdit("comission")}
                        >
                          Edit
                        </a>
                      </div>
                      <div className="input-wrap">
                        <label htmlFor="" className="form-value">
                          10
                        </label>
                        {activInput.comission ? (
                          <input
                            type="text"
                            className="form-control edit-input show"
                            placeholder="i.e Dark Knight Ventures"
                          />
                        ) : (
                          ""
                        )}
                        {/* <input
                          type="text"
                          className="form-control edit-input show"
                        //   className={`form-control edit-input ${
                        //     activInput.comission ? "show" : ""
                        //   }`}
                          placeholder="i.e Dark Knight Ventures"
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* step 4 end */}
              <div className="btn-wrap col-sm-3">
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

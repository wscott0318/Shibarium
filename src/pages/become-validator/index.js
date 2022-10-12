/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";

import Link from "next/link";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import CommonModal from "../components/CommonModel";
import StakingHeader from '../staking-header';
import Header from "../layout/header";

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
    <>
      <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg">
      <Header />
            {/* <StakingHeader /> */}
            <section className="top_bnr_area dark-bg darkbg py-4 py-md-5">
                <div className="container">
                    <h1 className="text-white trs-6 fw-500">Become a validator</h1>
                </div>
            </section>
            {/*  Rewards section start */}
            <section className="rewards-section">
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
                            src="../../images/green-tick.png"
                            alt=""
                            width={20}
                          />
                        </div>
                      </li>
                      <li className="step-list active">
                        <p className="light-text fw-600">Add Node Detail</p>
                        <div className="step-blk step-float">
                          <span className="fw-700 step-num">2</span>
                          <img
                            className="img-fluid tick-img"
                            src="../../images/green-tick.png"
                            alt=""
                            width={20}
                          />
                        </div>
                      </li>
                      <li className="step-list">
                        <p className="light-text fw-600">Add Your Stake</p>
                        <div className="step-blk step-float">
                          <span className="fw-700 step-num">3</span>
                          <img
                            className="img-fluid tick-img"
                            src="../../images/green-tick.png"
                            alt=""
                            width={20}
                          />
                        </div>
                      </li>
                      <li className="step-list">
                        <p className="light-text fw-600">Completed</p>
                        <div className="step-blk step-float">
                          <span className="fw-700 step-num">4</span>
                          <img
                            className="img-fluid tick-img"
                            src="../../images/green-tick.png"
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
                        <h5 className="mb-2 fw-700">Setup a node</h5>
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
                                  src="../../images/ansible.png"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="trs-3">
                              <h6 className="fw-600">Ansible</h6>
                              <p className="ft-14 fw-600">
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
                                  src="../../images/binaries.png"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="trs-3">
                            <h6 className="fw-600">Binaries</h6>
                              <p className="ft-14 fw-600">
                                Build from Source to setup your validator node.
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="ft-14 fw-600 top-btm-spacelg">
                          Queries? If you face any trouble during installation or
                          syncing, do share your queries in this{" "}
                          <a
                            href="#!;"
                            className="fw-600 link-color"
                            title=""
                          >
                            forum
                          </a>{" "}
                          or on our{" "}
                          <a
                            href="#!;"
                            className="fw-600 link-color"
                            title=""
                          >
                            Validator Discord channel.
                          </a>
                        </p>
                      </div>
                    {/* step 1 end */}

                    {/* step 2  start */}
                      <div className=" d-none">
                        <div className="mb-4 mb-xl-5">
                          <h5 className="fwb fw-700 mb-2">Add node details</h5>
                          <p className="">
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
                                  <a href="#!" className="form-control">
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
                              <h5 className="fw-700 mb-2">Add your stake amount</h5>
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
                    {/* <StepFour activInput= {activInput} handleEdit= {handleEdit} /> */}
                      <div className="progress-tab d-none">
                          <div className="mb-4 mb-xl-5">
                              <h5 className="fw-700 mb-2">Check complete detail</h5>
                              <p>Please confirm your details and submit</p>
                          </div>
                          <div className="row">

                              <div className="col-sm-6 form-grid">
                                  <div className="form-group">
                                      <label htmlFor="" className="form-label d-block">
                                          Validator logo
                                      </label>
                                      <div className="icon-wrap">
                                          <img className="img-fluid" src="../../images/logo-icon.png" alt="logo" width={20} />
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
                                              href="#!"
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
                                              href="#!"
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
                                              href="#!"
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
                    <div className="btn-wrap col-sm-3 mt-4 mt-5">
                      <button type="button" className="btn primary-btn w-100">
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*  Rewards section end */}
      </main>
    </>
  );
};

export default Rewards;

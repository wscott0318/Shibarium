/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useContext } from "react";
import { Dropdown, Navbar, Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import InnerHeader from "../inner-header";
import DelegatePopup from "../delegate-popup";
import Link from "next/link";
import  BorderBtn  from "../components/BorderBtn";
import  WarningBtn  from "../components/WarningBtn";
import { validatorsList } from "../../services/apis/validator";
import {useUserType,useUserOpenMev} from '../../state/user/hooks'
import { UserType } from "../../enums/UserType";

const BoneStaking = () => {
  const [validators, setValidators] = useState([])
  const [userType, setUserType] =useUserType();
  
  // const [isValidator, setIsValidator] = useState(false);
  // const [isDelegator, setIsDelegator] = useState(false);
  // useEffect(()=>{
  //   setTimeout(() => {
  //     usss('Deligator')
  //   }, 4000);
  //   let accounts=localStorage.getItem('accounts')
  //   if(accounts=="0x14d76811453183669C4561eF25f57401414DEEfB"){
  //     setIsDelegator(false)
  //     setIsValidator(true)
  //   }else if(accounts=="0xa9f576E15106eb5861ed4AC2793C010999ab0e7D"){
  //     setIsValidator(false)
  //     setIsDelegator(true)
  //   }else{
  //     setIsValidator(false)
  //     setIsDelegator(false)
  //   }
  // })

  useEffect(()=>{
    validatorsList().then(res=>{
      if(res.status==200){
        setValidators(res.data.data.validatorsList)
      }
    }).catch(err=>{
    })
  },[])


  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();
  const [show, setShow] = React.useState();
  return (
    <div>
      <InnerHeader />
      <DelegatePopup show={modalShow} onHide={() => setModalShow(false)} />
      <section className="banner-section card-banner dark_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="mb-4 text-white title-2 mb-lg-5">
                <span className="mb-1 sub-title d-block mb-md-2 mb-lg-3 trs-6">
                  Start Earning Rewards With
                </span>
                <div className="px-2 bg-white d-inline-block">
                  <span className="grad-text trs-6">Shibarium Staking</span>
                </div>
              </h1>
              {userType === UserType.Deligator && (
                <>
                  <BorderBtn
                    link="./become-validator"
                    lable="Become A Validator"
                    handleModal={()=>{}}
                  />
                </>
              )}
              {userType === UserType.NotValidatorNorDeligator && (
                <>
                  <div className="flex-wrap d-flex align-items-centeer">
                    <BorderBtn
                      link="./become-validator"
                      lable="Become A Validator"
                      handleModal={()=>{}}
                    />
                    <WarningBtn
                      link="all-validator"
                      lable="Become A Delegator"
                      handleModal={()=>{}}
                    />{" "}
                    <BorderBtn
                      link="./delegator-validator"
                      lable="Choose Your Path"
                      handleModal={()=>{}}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="col-lg-4 text-lg-end">
              <img
                className="img-fluid"
                src="../../assets/images/shiba-img.png"
                alt="shiba-img"
              />
            </div>
          </div>
        </div>
      </section>
      {/* banner section end */}
      <section className="mb-4 buy-sell-section mb-lg-5">
        <div className="container">
          <div className="baner-card">
            <h3 className="mb-0 mb-3 text-white fwb">Network Overview</h3>
            <div className="row">
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb">13</h3>
                  <span className="mb-0 trs-3">Total Validators</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb">155,554,455 BONE</h3>
                  <p className="mb-0 d-block fw-600">$12365977.36</p>
                  <div className="card-hr"></div>
                  <span className="mb-0">Total Validators</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb">569,554,455 BONE</h3>
                  <p className="mb-0 d-block fw-600">$12365977.36</p>
                  <div className="card-hr"></div>
                  <span className="mb-0">Total Reward Distributed</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb">25,599,69</h3>
                  <div className="card-hr"></div>
                  <span className="mb-0 trs-3">Bor Block Height</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb">9,554,455 </h3>
                  <div className="card-hr"></div>
                  <span className="mb-0 trs-3">Heimdall Block Height</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb d-flex align-items-center">
                    <span>71,582</span>
                    <span className="ms-2 primary-badge trsn-3 badge-md fs-12">
                      <span className="trs-2">28 minutes ago</span>
                    </span>
                  </h3>
                  <div className="card-hr"></div>
                  <span className="mb-0 trs-3">Last Checkpoint</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb d-flex align-items-center">
                    <span>25 Minutes</span>
                  </h3>
                  <div className="card-hr"></div>
                  <span className="mb-0 trs-3">Checkpoint Interval</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-4 mb-lg-5">
        <div className="container">
          <div className="mb-4">
            <h4 className="mb-3 fw-700">All Validators</h4>
          </div>
          <div className="filter-sec topmargin">
            <div className="row align-items-center">
              <div className="mb-4 col-lg-5 col-12 mb-sm-4 mb-lg-0">
                <div className="search-box d-inline-block position-relative w-100">
                  <input
                    className="cus-search w-100"
                    type="text"
                    placeholder="Search by validator name, Id, owner or signer address"
                  ></input>
                  <img
                    width="15"
                    height="15"
                    className="img-fluid"
                    src="../../assets/images/search.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-7 col-12 text-end mob-filter">
                <div className="d-inline-block pe-0 pe-sm-4 mob-filter">
                  <label className="head-xsm fw-600" for="Auction">
                    <span className="top-low-spc pe-2 align">
                      Show Auction Only
                    </span>
                  </label>
                  <label className="switch align">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="d-inline-block pe-4 pe-sm-4">
                  <label className="head-xsm fw-600" for="Auction">
                    <span className="top-low-spc pe-2 align">Sort by</span>
                  </label>
                  <Dropdown className="dark-dd cus-dropdown position-relative d-inline-block">
                    <i className="arrow down"></i>
                    <Dropdown.Toggle id="dropdown-basic">
                      <span>Random</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-inline-flex">
                  <div
                    href="javascript:void(0);"
                    title=""
                    className="view-blk me-2 view-active"
                  >
                    <img
                      className="grey-image"
                      src="../../assets/images/grid-grey.png"
                      width={26}
                      height={19}
                      alt=""
                    ></img>
                    <img
                      className="white-image"
                      src="../../assets/images/grid-white.png"
                      width={26}
                      height={19}
                      alt=""
                    ></img>
                  </div>
                  <div href="javascript:void(0);" title="" className="view-blk">
                    <img
                      className="grey-image"
                      src="../../assets/images/list-grey.png"
                      width={26}
                      height={19}
                      alt=""
                    ></img>
                    <img
                      className="white-image"
                      src="../../assets/images/list-white.png"
                      width={26}
                      height={19}
                      alt=""
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="mb-4 outer-table mb-lg-5">
            <table className="data-table">
              <thead>
                <tr className="table-header">
                  <th>Name</th>
                  <th>Stake</th>
                  <th>Checkpoints Signed</th>
                  <th>Commission</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {validators&&validators.map(elm=>{
                  console.log('elm', elm)
                  return(
                    <tr>
                  <td>
                    <span className="tb-data align">
                      <i className="user-icon"></i>Anonymous 18
                    </span>
                 
                  </td>
                  <td>
                    <span className="tb-data align">{parseInt(elm.stakeAmount).toFixed(0)}</span>
                    <span className="tb-data-sm align">BONE</span>
                  </td>
                  <td>
                    <span className="tb-data warning-color align">100%</span>
                  </td>
                  <td>
                    <span className="tb-data success-color align">{elm.commissionRate}</span>
                  </td>
                  <td className="user-action">
                    <a
                      href="javascript:void(0)"
                      onClick={() => setModalShow(true)}
                      title=""
                      className="btn-small uppercase-txt warning-btn"
                    >
                      <span>Delegate</span>
                    </a>
                  </td>
                </tr>
                  )
                })}
                {/* <tr>
                  <td>
                    <span className="tb-data align">
                      <i className="user-icon"></i>Anonymous 20
                    </span>
                 
                  </td>
                  <td>
                    <span className="tb-data align">13,861</span>
                    <span className="tb-data-sm align">BONE</span>
                  </td>
                  <td>
                    <span className="tb-data warning-color align">0%</span>
                  </td>
                  <td>
                    <span className="tb-data success-color align">10%</span>
                  </td>
                  <td className="user-action">
                    <a
                      href="javascript:void(0)"
                      onClick={() => setModalShow(true)}
                      title=""
                      className="btn-small uppercase-txt warning-btn"
                    >
                      <span>Delegate</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="tb-data align">
                      <i className="user-icon"></i>Shiba-Testnet-1
                    </span>
                 
                  </td>
                  <td>
                    <span className="tb-data align">13,861</span>
                    <span className="tb-data-sm align">BONE</span>
                  </td>
                  <td>
                    <span className="tb-data warning-color align">100%</span>
                  </td>
                  <td>
                    <span className="tb-data success-color align">10%</span>
                  </td>
                  <td className="user-action">
                    <a
                      href="javascript:void(0)"
                      onClick={() => setModalShow(true)}
                      title=""
                      className="btn-small uppercase-txt warning-btn"
                    >
                      <span>Delegate</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="tb-data align">
                      <i className="user-icon"></i>Anonymous 20
                    </span>
                 
                  </td>
                  <td>
                    <span className="tb-data align">13,861</span>
                    <span className="tb-data-sm align">BONE</span>
                  </td>
                  <td>
                    <span className="tb-data warning-color align">0%</span>
                  </td>
                  <td>
                    <span className="tb-data success-color align">10%</span>
                  </td>
                  <td className="user-action">
                    <a
                      href="javascript:void(0)"
                      onClick={() => setModalShow(true)}
                      title=""
                      className="btn-small uppercase-txt warning-btn"
                    >
                      <span>Delegate</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="tb-data align">
                      <i className="user-icon"></i>Poly Two
                    </span>
                 
                  </td>
                  <td>
                    <span className="tb-data align">13,861</span>
                    <span className="tb-data-sm align">BONE</span>
                  </td>
                  <td>
                    <span className="tb-data warning-color align">100%</span>
                  </td>
                  <td>
                    <span className="tb-data success-color align">10%</span>
                  </td>
                  <td className="user-action">
                    <a
                      href="javascript:void(0)"
                      onClick={() => setModalShow(true)}
                      title=""
                      className="btn-small uppercase-txt warning-btn"
                    >
                      <span>Delegate</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="tb-data align">
                      <i className="user-icon"></i>Radar Staking
                    </span>
                 
                  </td>
                  <td>
                    <span className="tb-data align">13,861</span>
                    <span className="tb-data-sm align">BONE</span>
                  </td>
                  <td>
                    <span className="tb-data warning-color align">0%</span>
                  </td>
                  <td>
                    <span className="tb-data success-color align">10%</span>
                  </td>
                  <td>
                    <span className="warning-color lnht fw-600">
                      Offline since
                      <br /> <em className="tbsm-txt ">289633 checkpoints</em>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="tb-data align">
                      <i className="user-icon"></i>Radar Staking
                    </span>
                 
                  </td>
                  <td>
                    <span className="tb-data align">13,861</span>
                    <span className="tb-data-sm align">BONE</span>
                  </td>
                  <td>
                    <span className="tb-data warning-color align">0%</span>
                  </td>
                  <td>
                    <span className="tb-data success-color align">10%</span>
                  </td>
                  <td>
                    <span className="warning-color lnht fw-600">
                      Offline since
                      <br /> <em className="tbsm-txt ">289633 checkpoints</em>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="tb-data align">
                      <i className="user-icon"></i>Poly Two
                    </span>
                 
                  </td>
                  <td>
                    <span className="tb-data align">13,861</span>
                    <span className="tb-data-sm align">BONE</span>
                  </td>
                  <td>
                    <span className="tb-data warning-color align">100%</span>
                  </td>
                  <td>
                    <span className="tb-data success-color align">10%</span>
                  </td>
                  <td className="user-action">
                    <a
                      href="javascript:void(0)"
                      onClick={() => setModalShow(true)}
                      title=""
                      className="btn-small uppercase-txt warning-btn"
                    >
                      <span>Delegate</span>
                    </a>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <footer className="main-footer">
        <div className="container">
          <div className="mt-4 copyright mt-lg-5">
            <h3 className="mb-0 text-center fwb">Powered by xFund.</h3>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BoneStaking;

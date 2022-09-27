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
import BorderBtn from "../components/BorderBtn";
import WarningBtn from "../components/WarningBtn";
import Valitotors from "../all-validator/valitotors";
import { useUserType, useUserOpenMev } from "../../state/user/hooks";
import { UserType } from "../../enums/UserType";
import NetworkDetails from './NetworkDetails';
import Footer from "../../pages/footer/index";
// import { useMoralis } from "react-moralis";
// import BannerCard from './bannerCard'
import StakingHeader from '../staking-header'
const BoneStaking = () => {
  // const [validators, setValidators] = useState([]);
  const [userType, setUserType] = useUserType();

  // const [isValidator, setIsValidator] = useState(false);
  // const [isDelegator, setIsDelegator] = useState(false);
  // useEffect(()=>{
  //   setTimeout(() => {
  //     usss('Delegator')
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

  // useEffect(() => {
  //   validatorsList()
  //     .then((res) => {
  //       if (res.status == 200) {
  //         setValidators(res.data.data.validatorsList);
  //       }
  //     })
  //     .catch((err) => {});
  // }, []);

  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();
  // const {user} = useMoralis();
  // console.log(user)
  const [show, setShow] = React.useState();
  return (
    <>
      <div className="main-content dark-bg-800 full-vh top-space">
        <StakingHeader />
        {/* banner section start */}
        <section className="inner-banner dark-bg">
          <div className="container">
            <div className="section-info">
              <div className="row align-items-center">
                <div className="col-md-7 col-sm-12">
                  <h1>Start Earning Rewards with <br /><span className="white-bg">Shibarium Staking</span></h1>
                  <div className="btns-sec">
                    <div className="btns-wrap">
                      <button className="btn primary-btn">Become a Validator</button>
                    </div>
                    <div className="btns-wrap">
                      <button className="btn  white-btn">Become a Delegator</button>
                    </div>
                    <div className="btns-wrap">
                      <button className="btn grey-btn">Choose Your Path</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-sm-12 m-hide">
                  <div className="shib-img-sec text-end">
                    <img src="../../images/shiba-img.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* banner section closed */}

        {/* card-section */}
        <section className="card-section">
          <div className="container">
            <div className="grid-contain">
              <div className="row">
                <div className="col-md-6 col-xl-4 col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>155,554,455 Shiba</span>
                      </div>
                      <div className="mid-head">
                        <span>$12354655.36</span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span>Total Stake</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>155,554,455 Shiba</span>
                      </div>
                      <div className="mid-head">
                        <span>$12354655.36</span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span>Total Stake</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 col-custum">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>155,554,455 Shiba</span>
                      </div>
                      <div className="mid-head">
                        <span>$12354655.36</span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span>Total Stake</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 mob-margin">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>155,554,455 Shiba</span>
                      </div>
                      <div className="mid-head">
                        <span>$12354655.36</span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span>Total Stake</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 mob-margin">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>155,554,455 Shiba</span>
                      </div>
                      <div className="mid-head">
                        <span>$12354655.36</span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span>Total Stake</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4 mob-margin">
                  <div className="cus-box">
                    <div className="head-sec">
                      <div className="top-head">
                        <span>155,554,455 Shiba</span>
                      </div>
                      <div className="mid-head">
                        <span>$12354655.36</span>
                      </div>
                    </div>
                    <div className="botom-sec">
                      <div className="botom-headsec">
                        <span>Total Stake</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* card section  end */}
        <section className="table-section">
          <div className="container">
            <div className="heading-sec">
              <h2 className="sub-head">All Validators</h2>
            </div>
            <div className="filter-row">
              <div className="left-section">
                <input className="custum-search w-100" type="search " placeholder="Search by validator name, id" />
              </div>
              <div className="right-section">
                <div className="switch-sec">
                  <span className="help-txt">Show Auction Only</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="select-sec">
                  <div>
                    <span>Sort By</span>
                  </div>
                  <div className="cus-sel">
                    <select className="form-select" >
                      <option selected>Random</option>
                      <option value="1">One</option>
                    </select>
                  </div>
                </div>
                <div className="layout-sec">
                  <div className="list blk-active">
                    <a href="javascript:void(0);"><img className="white-icon" src="../../images/list-white.png" /></a>
                    <a href="javascript:void(0);"><img className="grey-icon" src="../../images/list-grey.png" /></a>
                  </div>
                  <div className="cus-grid">
                    <a href="javascript:void(0);"><img className="white-icon" src="../../images/grid-white.png" /></a>
                    <a href="javascript:void(0);"><img className="grey-icon" src="../../images/grid-grey.png" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="cmn_dasdrd_table">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Stake</th>
                      <th>Checkpoints Signed</th>
                      <th>Commission</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span><img src="../../images/shiba-round-icon.png" /></span><b>SHIB</b> - Shibatoken</td>
                      <td>0.0000 - 0.00$</td>
                      <td><a href="#">Deposit</a></td>
                      <td><a href="#">Whitdraw</a></td>
                      <td><a href="#">Send</a></td>
                    </tr>
                    <tr>
                      <td><span><img src="../../images/matic-round-icon.png" /></span><b>MATIC</b> - Polygon</td>
                      <td>0.0000 - 0.00$</td>
                      <td><a href="#">Deposit</a></td>
                      <td><a href="#">Whitdraw</a></td>
                      <td><a href="#">Send</a></td>
                    </tr>
                    <tr>
                      <td><span><img src="../../images/bnb-round-icon.png" /></span><b>BNB</b> - BNB</td>
                      <td>0.0000 - 0.00$</td>
                      <td><a href="#">Deposit</a></td>
                      <td><a href="#">Whitdraw</a></td>
                      <td><a href="#">Send</a></td>
                    </tr>
                    <tr>
                      <td><span><img src="../../images/shiba-round-icon.png" /></span><b>SHIB</b> - Shibatoken</td>
                      <td>0.0000 - 0.00$</td>
                      <td><a href="#">Deposit</a></td>
                      <td><a href="#">Whitdraw</a></td>
                      <td><a href="#">Send</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BoneStaking;

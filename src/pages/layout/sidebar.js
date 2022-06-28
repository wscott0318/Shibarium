/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from "react-bootstrap";
import  NavLink  from "../components/NavLink";
import SideNavTab from "../../constants/Resources/sideNavTab";
export default function Sidebar(props) {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const handlClick = () => {
    setIsVisible((prev) => !prev);
  };

  const handleActiveTab=(index)=>{
    sideNavTab.filter(elm=>{
      if(elm.id==index){
        elm.isActive=true
      }else{
        elm.isActive=false
      }
    })
  }
console.log('sideNavTab', sideNavTab)
  return (
    <>
      {" "}
      {isVisible ? (
        <PerfectScrollbar
          className={
            isVisible
              ? props.isOpen
                ? "sidebar active "
                : "sidebar"
              : "sidebar d-none"
          }
          ref={wrapperRef}
        >
          {/* <button className='d-xl-none' >close</button> */}
          <a
            href="javascript:void(0)"
            onClick={handlClick}
            className="d-xl-none close-icon"
          >
            <img
              className="img-fluid"
              src="../../assets/images/download.svg"
              alt=""
            />
          </a>
          <div className="d-xl-none p-2 py-3">
            <div className="widg-col d-flex align-items-center">
              <div className="prof-img me-2">
                <img
                  className="img-fluid"
                  src="../../assets/images/meta.png"
                  alt="prof-img"
                />
              </div>
              <h6 className="fw-500 text-white">Account 5d45</h6>
            </div>
          </div>
          {/* <div className="side-logo d-none d-xl-block">
            <a href="./home">
              <img
                className="img-fluid"
                src="../../assets/images/logo-white.png"
                alt="logo"
              />
            </a>
          </div> */}

          <ul className="nav-menu">
            {sideNavTab&&sideNavTab.map((tab,index)=>{
              return(
                <NavLink tab={tab} key={index} index={index}handleActiveTab={handleActiveTab}/>
              )
            })}
            {/* <li className="nav-item " >
            <div className="active-shape">
              <img className='img-fluid' src="../../assets/images/radius.png" alt="" />
            </div>
            <a href="./balance" className="nav-link">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/assets-dark.png" alt="" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/assets.png" alt="side-ico" />
              </span>
              <span>Assets on Shibarium</span>
            </a>
          </li> */}
            {/* <NavLink /> */}
            {/* <li className="nav-item active">
              <div className="active-shape">
                <img
                  className="img-fluid"
                  src="../../assets/images/radius.png"
                  alt=""
                />
              </div>
              <a href="./dashboard" className="nav-link active">
                <span className="nav-icon">
                  <img
                    className="img-fluid dark-ico"
                    src="../../assets/images/icons/bridge-dark.png"
                    alt="side-ico"
                  />
                  <img
                    className="img-fluid light-ico"
                    src="../../assets/images/icons/bridge.png"
                    alt="side-ico"
                  />
                </span>
                <span>Bridge</span>
              </a>
            </li>
            <li className="nav-item">
              <div className="active-shape">
                <img
                  className="img-fluid"
                  src="../../assets/images/radius.png"
                  alt=""
                />
              </div>
              <a href="./transactions" className="nav-link">
                <span className="nav-icon">
                  <img
                    className="img-fluid dark-ico"
                    src="../../assets/images/icons/transfer-dark.png"
                    alt="side-ico"
                  />
                  <img
                    className="img-fluid light-ico"
                    src="../../assets/images/icons/transfer.png"
                    alt="side-ico"
                  />
                </span>
                <span>Transactions</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="./shibatoken" className="nav-link">
                <span className="nav-icon">
                  <img
                    className="img-fluid dark-ico"
                    src="../../assets/images/icons/burn-dark.png"
                    alt="side-ico"
                  />
                  <img
                    className="img-fluid light-ico"
                    src="../../assets/images/icons/burn.png"
                    alt="side-ico"
                  />
                </span>
                <span>Shiba Burn</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="./different-chain-bridge" className="nav-link">
                <span className="nav-icon">
                  <img
                    className="img-fluid dark-ico"
                    src="../../assets/images/icons/tokenswap-dark.png"
                    alt="side-ico"
                  />
                  <img
                    className="img-fluid light-ico"
                    src="../../assets/images/icons/tokenswap.png"
                    alt="side-ico"
                  />
                </span>
                <span>Token swap</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="./shibatoken" className="nav-link">
                <span className="nav-icon">
                  <img
                    className="img-fluid dark-ico"
                    src="../../assets/images/icons/gastoken-dark.png"
                    alt="side-ico"
                  />
                  <img
                    className="img-fluid light-ico"
                    src="../../assets/images/icons/gastoken.png"
                    alt="side-ico"
                  />
                </span>
                <span>Swap for gas token</span>
              </a>
            </li>
            <li className="nav-item" onClick={handleFaucet}>
              <Link   ="./faucet">
                <a target="_blank" rel="noopener noreferrer" className="nav-link">
                  <span className="nav-icon">
                    <img
                      className="img-fluid dark-ico"
                      src="../../assets/images/icons/faucet-dark.png"
                      alt="side-ico"
                    />
                    <img
                      className="img-fluid light-ico"
                      src="../../assets/images/icons/faucet.png"
                      alt="side-ico"
                    />
                  </span>
                  <span>Faucet</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <a href="javascript:void(0)" className="nav-link">
                <span className="nav-icon">
                  <img
                    className="img-fluid dark-ico"
                    src="../../assets/images/icons/new-dark.png"
                    alt="side-ico"
                  />
                  <img
                    className="img-fluid light-ico"
                    src="../../assets/images/icons/new.png"
                    alt="side-ico"
                  />
                </span>
                <span>What’s New?</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="javascript:void(0)" className="nav-link">
                <span className="nav-icon">
                  <img
                    className="img-fluid dark-ico"
                    src="../../assets/images/icons/wallet-dark.png"
                    alt="side-ico"
                  />
                  <img
                    className="img-fluid light-ico"
                    src="../../assets/images/icons/wallet.png"
                    alt="side-ico"
                  />
                </span>
                <span>Mainnet Wallet</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="javascript:void(0)" className="nav-link">
                <span className="nav-icon">
                  <img
                    className="img-fluid dark-ico"
                    src="../../assets/images/icons/support-dark.png"
                    alt="side-ico"
                  />
                  <img
                    className="img-fluid light-ico"
                    src="../../assets/images/icons/support.png"
                    alt="side-ico"
                  />
                </span>
                <span>Support</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="javascript:void(0)" className="nav-link">
                <span className="nav-icon">
                  <img
                    className="img-fluid dark-ico"
                    src="../../assets/images/icons/work-dark.png"
                    alt="side-ico"
                  />
                  <img
                    className="img-fluid light-ico"
                    src="../../assets/images/icons/work.png"
                    alt="side-ico"
                  />
                </span>
                <span>How it Works?</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="javascript:void(0)" className="nav-link">
                <span className="nav-icon">
                  <img
                    className="img-fluid dark-ico"
                    src="../../assets/images/icons/faq-dark.png"
                    alt="side-ico"
                  />
                  <img
                    className="img-fluid light-ico"
                    src="../../assets/images/icons/faq.png"
                    alt="side-ico"
                  />
                </span>
                <span>FAQ</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="javascript:void(0)" className="nav-link">
                <span className="nav-icon">
                  <img
                    className="img-fluid dark-ico"
                    src="../../assets/images/icons/userguide-dark.png"
                    alt="side-ico"
                  />
                  <img
                    className="img-fluid light-ico"
                    src="../../assets/images/icons/userguide.png"
                    alt="side-ico"
                  />
                </span>
                <span>User Guide</span>
              </a>
            </li> */}
          </ul>
        </PerfectScrollbar>
      ) : !props.isOpen ? (
        <button onClick={handlClick}>open</button>
      ) : null}
    </>
  );
}

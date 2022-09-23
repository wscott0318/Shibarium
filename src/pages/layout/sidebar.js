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
import NavLink from "../components/NavLink";
import SideNavTab from "../../constants/Resources/sideNavTab";
export default function Sidebar(props) {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const handlClick = () => {
    setIsVisible((prev) => !prev);
  };

  const handleActiveTab = (index) => {
    SideNavTab.filter(elm => {
      if (elm.id == index) {
        elm.isActive = true
      } else {
        elm.isActive = false
      }
    })
  }
  return (
    <>
      {/* sidebar start */}
      <sidebar className="sidebar">
        <div className="sidbar-top-menu">
          <div className="sidebar-logo">
            <a className="close-icon" href="javascript:void(0)">
              <img className="img-fluid" src="../../images/close-icon.png" alt="close-icon"/>
            </a>
            <a className="sidelogo-link" href="javascript:void(0)">
              <img className="img-fluid" src="../../images/logo.png" alt="" />
            </a>
          </div>
          <ul className="side-menu">
            <li className="side-menu-item">
              <Link href={`javascript:void(0)`}>
                <a className="side-link btn primary-btn" >
                  <span className="side-ico"><img className="img-fluid" src="../../images/sidebar/wallet.png" alt="side-icon" /></span>
                  <span>Wallet</span>
                </a>
              </Link>
            </li>
            <li className="side-menu-item">
              <Link href={`javascript:void(0)`}>
                <a className="side-link btn" >
                  <span className="side-ico"><img className="img-fluid" src="../../images/sidebar/transaction.png" alt="side-icon" /></span>
                  <span>Transactions</span>
                </a>
              </Link>
            </li>
            <li className="side-menu-item">
              <Link href={`javascript:void(0)`}>
                <a className="side-link btn" >
                  <span className="side-ico"><img className="img-fluid" src="../../images/sidebar/bridge.png" alt="side-icon" /></span>
                  <span>Bridge</span>
                </a>
              </Link>
            </li>
            <li className="side-menu-item">
              <Link href={`javascript:void(0)`}>
                <a className="side-link btn" >
                  <span className="side-ico"><img className="img-fluid" src="../../images/sidebar/swap.png" alt="side-icon" /></span>
                  <span>Swap token</span>
                </a>
              </Link>
            </li>
            <li className="side-menu-item">
              <Link href={`javascript:void(0)`}>
                <a className="side-link btn" >
                  <span className="side-ico"><img className="img-fluid" src="../../images/sidebar/gas-toke.png" alt="side-icon" /></span>
                  <span>Gas token</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebar-bottom-menu">
          <ul className="side-menu">
            <li className="side-menu-item">
              <Link href={`javascript:void(0)`}>
                <a className="side-link btn" >
                  <span className="side-ico"><img className="img-fluid" src="../../images/sidebar/faq.png" alt="side-icon" /></span>
                  <span>FAQs</span>
                </a>
              </Link>
            </li>
            <li className="side-menu-item">
              <Link href={`javascript:void(0)`}>
                <a className="side-link btn" >
                  <span className="side-ico"><img className="img-fluid" src="../../images/sidebar/tools.png" alt="side-icon" /></span>
                  <span>Developer Tools</span>
                </a>
              </Link>
            </li>
            <li className="side-menu-item">
              <Link href={`javascript:void(0)`}>
                <a className="side-link btn" >
                  <span className="side-ico"><img className="img-fluid" src="../../images/sidebar/wallet.png" alt="side-icon" /></span>
                  <span>Support</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </sidebar>
      {/* sidebar end */}
    </>
  );
}

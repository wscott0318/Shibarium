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
} from "react-bootstrap";
import NavLink from "../components/NavLink";
import SideNavTab from "../../constants/Resources/sideNavTab";
import { useRouter } from 'next/router'
import * as Sentry from "@sentry/nextjs";


export default function SidebarOuter({
  menuState,
  handleMenuState,
  onClickOutside,
  faqType,
  setFaqType,
}: any) {
  const wrapperRef2 = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handlClick = () => {
    setIsVisible((prev) => !prev);
  };

  const handleClickOutside = (event: any) => {
    try {
      if (wrapperRef2.current && !wrapperRef2.current.contains(event.target)) {
      onClickOutside && onClickOutside();
    }
  }
  catch(err:any){
    Sentry.captureException("handleClickOutside ", err);
  }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      // Anything in here is fired on component unmount.
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <>
      {/* sidebar start */}
      <div className="outrsidebar-toggle"
      onClick={()=>handleMenuState()}
      >
        <img className="img-fluid" src="../../assets/images/menu.png" width="25" height="25" alt="" />
      </div>
      <div
        className={menuState ? "outr-sidebar outrside-active" : "outr-sidebar"}
        ref={wrapperRef2}
      >
        <span className="outclose-icon"
        onClick={()=>handleMenuState()}
        >
              <img className="img-fluid" src="../../assets/images/close-icon.png" width="20" height="20" alt="close-icon"/>
        </span>
        <ul className="outr-links">
          <li
            className={`out-navlink ${faqType === "0" && "out-active"}`}
            onClick={() => {setFaqType("0");handleMenuState(); }}
          >
            <a>Technical FAQ</a>
          </li>
          <li
            className={`out-navlink ${faqType === "1" && "out-active"}`}
            onClick={() => {setFaqType("1");handleMenuState()}}
          >
            <a>Delegator FAQ</a>
          </li>
          <li
            className={`out-navlink ${faqType === "2" && "out-active"}`}
            onClick={() => {setFaqType("2");handleMenuState()}}
          >
            <a>Validator FAQ</a>
          </li>
          <li
            className={`out-navlink ${faqType === "3" && "out-active"}`}
            onClick={() => {setFaqType("3");handleMenuState()}}
          >
            <a>Staking FAQ</a>
          </li>
          <li
            className={`out-navlink ${faqType === "4" && "out-active"}`}
            onClick={() => {setFaqType("4");handleMenuState()}}
          >
            <a>Wallet FAQ</a>
          </li>
        </ul>
      </div>
      {/* sidebar end */}
    </>
  );
}


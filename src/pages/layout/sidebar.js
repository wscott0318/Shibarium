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
import { useRouter } from 'next/router'



export default function Sidebar({ menuState, handleMenuState, onClickOutside }) {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handlClick = () => {
    setIsVisible((prev) => !prev);
  };
  
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClickOutside && onClickOutside();
    }
  };

  const topList = [
    {
      name: "Wallet",
      route: "/wallet",
      isSelected: router.asPath == "/wallet" ? true : false,
      img: "../../images/sidebar/wallet.png",
    },
    {
      name: "Staking",
      route: "/bone-staking",
      isSelected: router.asPath == "/transactions" ? true : false,
      img: "../../images/sidebar/transaction.png",
    },
    {
      name: "Bridge",
      route: "/bridge",
      isSelected: router.asPath == "/bridge" ? true : false,
      img: "../../images/sidebar/bridge.png",
    },
    // {
    //   name: "Swap token",
    //   route: "/swap-token",
    //   isSelected: router.asPath == "/swap-token" ? true : false,
    //   img: "../../images/sidebar/swap.png",
    // },
    // {
    //   name: "Gas token",
    //   route: "/gas-token",
    //   isSelected: router.asPath == "/gas-token" ? true : false,
    //   img: "../../images/sidebar/gas-toke.png",
    // },
  ];

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      // Anything in here is fired on component unmount.
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [])
  
  const bottomList = [
    {
      name: "FAQs",
      route: "",
      isSelected: false,
      img: "../../images/sidebar/faq.png",
    },
    // {
    //   name: "Developer Tools",
    //   route: "",
    //   isSelected: false,
    //   img: "../../images/sidebar/tools.png",
    // },
    {
      name: "Faucet",
      route: "/faucet",
      isSelected: router.asPath == "/faucet" ? true : false,
      img: "../../images/sidebar/tools.png",
    },
    {
      name: "Support",
      route: "",
      isSelected: false,
      img: "../../images/sidebar/wallet.png",
    },
  ];

  const [renderTopList, setRenderTopList] = useState(topList);
  const [renderBottomList, setRenderBottomList] = useState(bottomList);

  const activateBtn = (arr, index) => {
    let newData = arr.map((elm) => {
      if (elm.name === index) {
        elm.isSelected = true;
      } else {
        elm.isSelected = false;
      }
      return elm;
    });
    return newData;
  };

  const handelClick = (index, type) => {
    // if(type === 'top'){
    //   let newData = activateBtn(renderTopList, index.name)
    //   setRenderTopList(newData)
    //   setRenderBottomList(bottomList)
    // } else {
    //   let newData = activateBtn(renderBottomList, index.name)
    //   setRenderTopList(topList)
    //   setRenderBottomList(newData)
    // }
    router.push(index.route);
  };

  // console.log(renderTopList)

  return (
    <>
      {/* sidebar start */}
      <div className="sidebar-toggle">
        <Navbar.Brand
          onClick={() => handleMenuState(true)}
          className="menu-btn"
        >
          <img className="img-fluid" src="../../images/menu.png" alt="" />
        </Navbar.Brand>
      </div>
      <div
        className={menuState ? "sidebar sidebar-active" : "sidebar"}
        ref={wrapperRef}
      >
        <div className="sidbar-top-menu">
          <div className="sidebar-logo">
            <span
              className="close-icon"
              style={{ cursor: "pointer" }}
              onClick={() => handleMenuState(false)}
            >
              <img
                className="img-fluid"
                src="../../images/close-icon.png"
                alt="close-icon"
              />
            </span>
            <Link href="/home" passHref>
              <a className="sidelogo-link" href="javascript:void(0)">
                <img className="img-fluid" src="../../images/logo.png" alt="" />
              </a>
            </Link>
          </div>
          <ul className="side-menu">
            {renderTopList.map((x) => (
              <li className="side-menu-item" key={x.name}>
                <button
                  className={
                    x.isSelected
                      ? "side-link btn primary-btn w-100"
                      : "side-link btn w-100"
                  }
                  onClick={() => handelClick(x, "top")}
                >
                  <span>
                    <span className="side-ico">
                      <img className="img-fluid" src={x.img} alt="side-icon" />
                    </span>
                    <span>{x.name}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar-bottom-menu">
          <ul className="side-menu">
            {renderBottomList.map((x) => (
              <li className="side-menu-item" key={x.name}>
                <button
                  className={
                    x.isSelected
                      ? "side-link btn primary-btn w-100"
                      : "side-link btn w-100"
                  }
                  onClick={() => handelClick(x, "bottom")}
                >
                  <span>
                    <span className="side-ico">
                      <img className="img-fluid" src={x.img} alt="side-icon" />
                    </span>
                    <span>{x.name}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* sidebar end */}
    </>
  );
}


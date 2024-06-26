/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { getTransactions } from "pages/components/BridgeCalls";
import { useActiveWeb3React } from "app/services/web3";
import Loader from "app/components/Loader";
import useTransactionCount from "app/hooks/useTransactionCount";

export default function Sidebar({
  menuState,
  handleMenuState,
  onClickOutside,
}) {
  const wrapperRef = useRef(null);
  const router = useRouter();
  const { account } = useActiveWeb3React();
  const [width, setWidth] = useState();
  const { pendingTransactionCount, getTransactionsCount } =
    useTransactionCount();
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClickOutside && onClickOutside();
    }
  };

  const topList = [
    {
      name: "Staking",
      route: "/",
      isSelected: router.asPath == "/" ? true : false,
      img: "../../assets/images/sidebar/transaction.png",
    },
    // {
    //   name: "Wallet",
    //   route: "/wallet",
    //   isSelected: router.asPath == "/wallet" ? true : false,
    //   img: "../../assets/images/sidebar/wallet.png",
    // },
    {
      name: "Bridge",
      route: "/bridge",
      isSelected: router.asPath == "/bridge" ? true : false,
      img: "../../assets/images/sidebar/bridge.png",
    },
    {
      name: `Transactions`,
      route: "/transactions",
      isSelected: router.asPath == "/transactions" ? true : false,
      img: "../../assets/images/sidebar/bridge.png",
    },
    // {
    //   name: "Swap token",
    //   route: "/swap-token",
    //   isSelected: router.asPath == "/swap-token" ? true : false,
    //   img: "../../assets/images/sidebar/swap.png",
    // },
    // {
    //   name: "Gas token",
    //   route: "/gas-token",
    //   isSelected: router.asPath == "/gas-token" ? true : false,
    //   img: "../../assets/images/sidebar/gas-toke.png",
    // },
  ];

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      // Anything in here is fired on component unmount.
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    getTransactionsCount();
  }, [account]);
  const bottomList = [
    // {
    //   name: "FAQs",
    //   route: "/faq",
    //   isSelected: false,
    //   img: "../../assets/images/sidebar/faq.png",
    // },
    // {
    //   name: "Developer Tools",
    //   route: "",
    //   isSelected: false,
    //   img: "../../assets/images/sidebar/tools.png",
    // },
    // {
    //   name: "Faucet",
    //   route: "/faucet",
    //   isSelected: router.asPath == "/faucet" ? true : false,
    //   img: "../../assets/images/sidebar/tools.png",
    // },
    {
      name: "Support",
      route: "",
      isSelected: false,
      img: "../../assets/images/sidebar/wallet.png",
    },
  ];

  const renderTopList = topList;
  const renderBottomList = bottomList;

  const handelClick = (index, type) => {
    router.push(index.route);
  };
  function getWidth() {
    const screenWidth = window.innerWidth;
    setWidth(screenWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", getWidth);
  }, []);
  return (
    <>
      {/* sidebar start */}
      <div className="sidebar-toggle">
        <Navbar.Brand
          onClick={() => handleMenuState(true)}
          className="menu-btn"
        >
          <img
            className="img-fluid"
            src="../../assets/images/menu.png"
            alt=""
          />
        </Navbar.Brand>
        <div className="sidebar-logo">
          <Link href="/" passHref>
            <a className="sidelogo-link" href="/">
              <img
                className="img-fluid"
                src={
                  width > 576
                    ? "../../assets/images/Shibarium white@2x.png"
                    : "../../assets/images/Shibarium Pictogram@2x.png"
                }
                width={width > 576 ? 250 : 100}
                alt=""
              />
            </a>
          </Link>
        </div>
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
                src="../../assets/images/close-icon.png"
                alt="close-icon"
              />
            </span>
            <Link href="/" passHref>
              <a className="sidelogo-link" href="/">
                <img
                  className="img-fluid"
                  src="../../assets/images/Shibarium white@2x.png"
                  alt=""
                />
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
                  <span className="buttonWrapper">
                    <span className="side-ico">
                      <img className="img-fluid" src={x.img} alt="side-icon" />
                    </span>
                    <span>{x.name}</span>
                    {account ? (
                      x.name == "Transactions" && pendingTransactionCount ? (
                        <span className="pendingCountSpan">
                          <Loader /> {pendingTransactionCount}
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
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

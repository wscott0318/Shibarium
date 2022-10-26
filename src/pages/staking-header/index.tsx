import React, { useState, useEffect, useContext } from "react";
import { Dropdown, Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import Router, { useRouter } from "next/router";

const StakingHeader = () => {
const router = useRouter();
const routeHandler = (x:string) => {
    router.push(x);
}
const routeCheck = (x:string) => {
    return router.asPath.split("/")[1] === x;
}
    return (
      <>
        <div className="staking-header dark-bg-800">
          <div className="container">
            <div className="lft-sec">
              <ul className="lft-links ms-auto">
                <li className="nav-item">
                  <button onClick={() => routeHandler("/bone-staking")}>
                    <a
                      className={`nav-link ff-mos ${
                        routeCheck("bone-staking") && "active"
                      }`}
                      href="javascript:void(0);"
                    >
                      Overview
                    </a>
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={() => routeHandler("/all-validator")}>
                    <a
                      className={`nav-link ff-mos ${
                        routeCheck("all-validator") && "active"
                      }`}
                      href="javascript:void(0);"
                    >
                      All Validators
                    </a>
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={() => routeHandler("/my-account")}>
                    <a
                      className={`nav-link ff-mos ${
                        routeCheck("my-account") && "active"
                      }`}
                      href="javascript:void(0);"
                    >
                      My Account
                    </a>
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={() => routeHandler("/unbond-history")}>
                    <a
                      className={`nav-link ff-mos ${
                        routeCheck("unbond-history") && "active"
                      }`}
                      href="javascript:void(0);"
                    >
                      Unbound History
                    </a>
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={() => routeHandler("/reward-history")}>
                    <a
                      className={`nav-link ff-mos ${
                        routeCheck("reward-history") && "active"
                      }`}
                      href="javascript:void(0);"
                    >
                      Reward History
                    </a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
};

export default StakingHeader;

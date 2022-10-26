import React, { useState, useEffect, useContext } from "react";
import { Dropdown, Navbar, Container, Nav, DropdownButton } from "react-bootstrap";
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
                  <DropdownButton id="dropdown-item-button" title="">
                    <Dropdown.Item
                      as="button"
                      onClick={() => router.push("/unbond-history")}
                    >
                      Unbound History
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      onClick={() => router.push("/reward-history")}
                    >
                      Reward History
                    </Dropdown.Item>
                  </DropdownButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
};

export default StakingHeader;

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
const [history,setHistory] = useState("");

useEffect(() => {
  if (routeCheck("unbond-history")) {
    setHistory("Unbound History");
  } else if (routeCheck("reward-history")) {
    setHistory("Reward History");
  }
}, [router])

    return (
      <>
        <div className="staking-header dark-bg-800">
          <div className="container">
            <div className="lft-sec">
              <ul className="lft-links ms-auto">
                <li className="nav-item">
                  <Link href="/bone-staking" passHref>
                    <a
                      className={`nav-link ff-mos ${
                        routeCheck("bone-staking") && "active"
                      }`}
                      href="javascript:void(0);"
                    >
                      Overview
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/all-validator" passHref>
                    <a
                      className={`nav-link ff-mos ${
                        routeCheck("all-validator") && "active"
                      }`}
                      href="javascript:void(0);"
                    >
                      All Validators
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/my-account" passHref>
                    <a
                      className={`nav-link ff-mos ${
                        routeCheck("my-account") && "active"
                      }`}
                      href="javascript:void(0);"
                    >
                      My Account
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <DropdownButton className="dd-style" id="dropdown-item-button" title={"History"}>
                    <Dropdown.Item
                      // as="button"
                      // onClick={() => {
                      //   router.push("/unbond-history");
                      //   setHistory("Unbound History");
                      // }}
                    >
                       <Link href="/unbond-history" passHref>
                      Unbound History
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                      // as="button"
                      // onClick={() => {
                      //   router.push("/reward-history");
                      //   setHistory("Reward History");
                      // }}
                    >
                      <Link href="/reward-history" passHref>
                      Reward History
                      </Link>
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

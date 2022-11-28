import React, { useState, useEffect, useContext } from "react";
import { Dropdown, Navbar, Container, Nav, DropdownButton } from "react-bootstrap";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useUserType } from "../../state/user/hooks";
import { useActiveWeb3React} from '../../services/web3'

const StakingHeader = () => {
const router = useRouter();

const routeCheck = (x:string) => {
    return router.asPath.split("/")[1] === x;
}
const [history,setHistory] = useState("");
const [userType, setUserType] = useUserType();

const { account, chainId = 1, library } = useActiveWeb3React();

useEffect(() => {
  if (routeCheck("unbond-history")) {
    setHistory("Unbound History");
  } else if (routeCheck("reward-history")) {
    setHistory("Reward History");
  }
}, [router, account])

console.log("usertype",router.asPath)

    return (
      <>
        <div className="staking-header dark-bg-800">
          <div className="container">
            <div className="lft-sec">
              <ul className="lft-links ms-auto">
                <li className="nav-item">
                  <Link href="/bone-staking" passHref>
                    <p className={`nav-link ff-mos ${router.asPath === '/bone-staking' ? "active" : ""}`} >
                      Overview
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/all-validator"  passHref>
                    <p className={`nav-link ff-mos ${router.asPath === '/all-validator' ? "active" : ""}`}>
                      All Validators
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                 {account ? <Link href="/my-account" className="nav-link ff-mos" passHref>
                    <p className={`nav-link ff-mos ${router.asPath === '/my-account' ? "active" : ""}`}
                    >
                      My Account
                    </p>
                  </Link> :
                  <p className="nav-link ff-mos">
                    <p className={`nav-link ff-mos ${router.asPath === '/my-account' ? "active" : ""}`}
                    >
                      My Account
                    </p>
                  </p>}
                </li>
                {
                  (userType === 'Delegator' || userType === "Validator") &&
                  <li className="nav-item">
                  <DropdownButton className="dd-style cus-arw" id="dropdown-item-button" title={"History"}>
                    
                      {
                        userType !== "Validator" &&
                        <Dropdown.Item
                    >
                       { account ? <Link href="/unbond-history" passHref>
                      Unbound History
                      </Link> :
                        <p>
                        Unbound History
                        </p>
                      }
                    </Dropdown.Item>
                    }
                    <Dropdown.Item
                    >
                      {account ? <Link href="/reward-history" passHref>
                      Reward History
                      </Link> :
                      <p>
                      Reward History
                      </p> 
                      }
                    </Dropdown.Item>
                  </DropdownButton>
                </li>}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
};

export default StakingHeader;

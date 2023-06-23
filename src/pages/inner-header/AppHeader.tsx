import React, { useEffect, useState } from "react";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { useActiveWeb3React } from "app/services/web3";
import { useRouter } from "next/router";
import Link from "next/link";

const AppHeader = () => {
  const { chainId = 1, account } = useActiveWeb3React();
  const { asPath } = useRouter();
  const [title, setTitle] = useState("Staking");
  const [url, setUrl] = useState("/");

  useEffect(() => {
    if (asPath) {
      if (asPath === "/") {
        setTitle("Staking");
        setUrl("/");
      } else if (asPath === "/faucet") {
        setTitle("Faucet");
        setUrl("/faucet");
      }
      // else if (asPath === "/bridge") {
      //   setTitle("Bridge");
      //   setUrl("/bridge");
      // } else if (asPath === "/transactions") {
      //   setTitle("Transactions");
      //   setUrl("/transactions");
      // }
    }
  }, [asPath]);

  useEffect(() => {
    let ele = document.getElementById("navDropdown_custom") as any;
    // @ts-ignore
    ele.href = "";
    console.log("element ", ele.href);
  }, []);

  return (
    <div className="shib-dropdown d-flex justify-content-center align-items-center">
      <Dropdown className="nav-item d-flex align-items-center cus-dd app-drop">
        <div className="dot-icon" id="basic-nav-dropdown">
          <img src="../../assets/images/menu-icon.png" alt="" />
        </div>
        <Link href={url} passHref>
          <NavDropdown
            className="light-text dd-ico"
            title={title}
            id="navDropdown_custom"
            menuRole="menu"
          >
            <Link href="/" passHref>
              <NavDropdown.Item>
                <h6
                  className={
                    title === "Staking"
                      ? "fw-600 light-text left-border primary-text"
                      : "fw-600 light-text left-border"
                  }
                >
                  Staking
                </h6>
                <span className="light-text">
                  Send and receive crypto assets on Shibarium network
                </span>
              </NavDropdown.Item>
            </Link>
            {account && (
              <>
                <Link href="/faucet" passHref>
                  <NavDropdown.Item>
                    <h6
                      className={
                        title === "Faucet"
                          ? "fw-600 light-text left-border primary-text"
                          : "fw-600 light-text left-border"
                      }
                    >
                      Faucet
                    </h6>
                    <span className="light-text">Earn Puppy Net Faucets</span>
                  </NavDropdown.Item>
                </Link>
                {/* <Link href="/bridge" passHref>
                  <NavDropdown.Item>
                    <h6
                      className={
                        title === "Bridge"
                          ? "fw-600 light-text left-border primary-text"
                          : "fw-600 light-text left-border"
                      }
                    >
                      Bridge
                    </h6>
                    <span className="light-text">
                      Deposit and withdraw between networks
                    </span>
                  </NavDropdown.Item>
                </Link> */}
                {/* <NavDropdown.Item onClick={() => router.push('/bridge', '/bridge', { shallow: true })}>
                <h6
                  className={
                    title === "Bridge"
                      ? "fw-600 light-text left-border primary-text"
                      : "fw-600 light-text left-border"
                  }
                >
                  Bridge
                </h6>
                <span className="light-text">Deposit and withdraw between networks</span>
              </NavDropdown.Item> */}
              </>
            )}
          </NavDropdown>
        </Link>
      </Dropdown>
    </div>
  );
};

export default AppHeader;

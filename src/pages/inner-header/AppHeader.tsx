import React, { useEffect, useState } from 'react';
import { Dropdown, NavDropdown } from "react-bootstrap";
import { useActiveWeb3React } from 'app/services/web3';
import { useRouter } from "next/router";

const AppHeader = () => {
  const { chainId = 1, account, active, library } = useActiveWeb3React();
  const user: any = account
  const { asPath } = useRouter()
  const [title, setTitle] = useState("Staking")
  const router = useRouter()

  useEffect(() => {
    if (asPath) {
      if (asPath === '/wallet') {
        setTitle("Wallet")
      } else if (asPath === '/bridge') {
        setTitle("Bridge")
      } else if (asPath === '/bone-staking') {
        setTitle("Staking")
      } else if (asPath === '/faucet') {
        setTitle("Faucet")
      }
    }
  }, [asPath])

  return (
    <div className="shib-dropdown d-flex justify-content-center align-items-center">
      <Dropdown className="nav-item d-flex align-items-center cus-dd app-drop">
        <div className="dot-icon" id="basic-nav-dropdown">
          <img src="../../assets/images/menu-icon.png" alt="" />
        </div>
        <NavDropdown className="light-text dd-ico" title={title} id="">
          <NavDropdown.Item onClick={() => router.push('/bone-staking', '/bone-staking', { shallow: true })}>
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
          {account && (
            <>
            <NavDropdown.Item onClick={() => router.push('/faucet', '/faucet', { shallow: true })}>
              <h6
                className={
                  title === "Faucet"
                    ? "fw-600 light-text left-border primary-text"
                    : "fw-600 light-text left-border"
                }
              >
                Faucet
              </h6>
              <span className="light-text">
                Earn Puppy Net Faucets
              </span>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => router.push('/bridge', '/bridge', { shallow: true })}>
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
            </NavDropdown.Item>
            </>
          )}
        </NavDropdown>
      </Dropdown>
    </div>
  );
}

export default AppHeader
import React from 'react';
import { Dropdown, Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { useActiveWeb3React } from 'app/services/web3';

const AppHeader = () => {
  const { chainId = 1, account, library } = useActiveWeb3React();
  const user :any = account
  
  return (
    < div className='shib-dropdown'>
      <Dropdown className="nav-item d-flex align-items-center cus-dd app-drop">
        <div className="dot-icon" id="basic-nav-dropdown">
          <img src="../../images/menu-icon.png" alt="" />
        </div>
        <NavDropdown className="light-text dd-ico" title="App" id="">
          <NavDropdown.Item disabled={user ? false : true} href="/wallet">
            <h6 className="fw-600 light-text left-border">
              Wallet
            </h6>
            <span className="light-text">
              Send and receive crypto assets on Shibarium network
            </span>
          </NavDropdown.Item>
          <NavDropdown.Item disabled={user ? false : true} href="/withdraw">
            <h6 className="fw-600 light-text left-border">
              Bridge
            </h6>
            <span className="light-text">
              Deposit and withdraw between networks
            </span>
          </NavDropdown.Item>
          <NavDropdown.Item href="/bone-staking">
            <h6 className="fw-600 light-text left-border">
              Staking
            </h6>
            <span className="light-text">
              Stake shiba and earn rewards
            </span>
          </NavDropdown.Item>
          {/* <NavDropdown.Item href="#action/3.3">
                    <h6 className="fw-600 light-text left-border">
                      Widget Dashboard
                    </h6>
                    <span className="light-text">
                      Manage all your Shibarium wallet widgets at one place
                    </span>
                  </NavDropdown.Item> */}
        </NavDropdown>
      </Dropdown>
    </div>
  )
}

export default AppHeader
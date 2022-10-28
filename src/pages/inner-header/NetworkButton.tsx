import React from 'react';
import { Dropdown, Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { useNetworkModalToggle } from "../../state/application/hooks";
import { useWeb3React } from "@web3-react/core";

const NetworkButton = () => {

    const toggleNetworkModal = useNetworkModalToggle();
    const { account,chainId = 1,  connector, library,deactivate } = useWeb3React()

    const getNetworkName = () => {
        if(chainId == 1){
          return "Ethereum Mainnet"
        } else if (chainId == 5){
          return "Goerli Testnet"
        } else {
          return "Shibarium Mainnet"
        }
      }

  return (
    <div> 
    <NavDropdown
    className="form-select innerDivBgBlack hd-sel hd-sel-over"
    title={getNetworkName()}
    id=""
  >
    <NavDropdown.Item
      // disabled={user ? false : true}
      onClick={toggleNetworkModal}
    >
      <h6 className="fw-600 light-text left-border">
        Switch Network
      </h6>
      <span className="light-text">
        Switch to other Network
      </span>
    </NavDropdown.Item>
  </NavDropdown></div>
  )
}

export default NetworkButton
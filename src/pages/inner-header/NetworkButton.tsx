import React from 'react';
import { Dropdown, Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { useNetworkModalToggle } from "../../state/application/hooks";
import { useWeb3React } from "@web3-react/core";
import { getNetworkName } from 'web3/commonFunctions';

const NetworkButton = () => {

    const toggleNetworkModal = useNetworkModalToggle();
    const { account,chainId = 1,  connector, library,deactivate } = useWeb3React()


  return (
    <div> 
    <NavDropdown
    className="form-select hd-sel hd-sel-over"
    title={getNetworkName(chainId)}
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
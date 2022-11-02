import { useActiveWeb3React } from 'app/services/web3';
import { useNetworkModalToggle } from 'app/state/application/hooks';
import Link from 'next/link';
import React from 'react'
import { Nav, NavDropdown } from 'react-bootstrap';

const NetworkSwitchDropdown = () => {

    const { chainId } = useActiveWeb3React();

    const toggleNetworkModal = useNetworkModalToggle();

      if (!chainId) return null;
      
      const getNetworkName = () => {
        if (chainId == 1) {
          return "Ethereum Mainnet";
        } else if (chainId == 5) {
          return "Goerli Testnet";
        } else {
          return "Shibarium Mainnet";
        }
      };
  return (
    <Nav.Item className="button-wrap cus_dropdown">
      <Link href={"/wallet"}>
        <a className="d-md-none launch-btn">
          <img
            className="img-fluid"
            src="../../images/launch-app.png"
            alt=""
            width={30}
          />
        </a>
      </Link>
      <NavDropdown
        className="form-select innerDivBgBlack hd-sel hd-sel-over"
        title={getNetworkName()}
        id=""
      >
        <NavDropdown.Item
          // disabled={user ? false : true}
          onClick={toggleNetworkModal}
        >
          <h6 className="fw-600 light-text left-border">Switch Network</h6>
          <span className="light-text">Switch to other Network</span>
        </NavDropdown.Item>
      </NavDropdown>
    </Nav.Item>
  );
}

export default NetworkSwitchDropdown
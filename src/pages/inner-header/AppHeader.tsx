import React, { useEffect, useState } from 'react';
import { Dropdown, Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { useActiveWeb3React } from 'app/services/web3';
import { useRouter } from "next/router";
import ChainWarning from 'pages/components/ChainWarning';



const AppHeader = () => {
  const { chainId = 1, account, active, library } = useActiveWeb3React();
  const user :any = account
  const { asPath } = useRouter()
  const [title, setTitle] = useState("")
  const router = useRouter()

  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (chainId !== 5) {
      checkConnectedChain();
    }
  }, [chainId, account, active]);

  const checkConnectedChain = () => {
    if (chainId === 5) {
      setShowWarning(true);
      // router.push("/bone-staking");
    } else {
      setShowWarning(false);
    }
  };
  useEffect(() => {
    if(asPath){
      if(asPath === '/wallet'){
        setTitle("Wallet")
      } else if (asPath === '/bridge'){
        setTitle("Bridge")
      } else { 
        setTitle("Staking")
      }
    } 
  },[asPath])

  // console.log(title)
  if(account)
  {
    return (
      <>
      <ChainWarning
          title={"Switch to Goerli Testnet"}
          show={showWarning}
          setshow={() => {
            setShowWarning(false);
          }}
          externalCls="faucet-pop no-lft"
        >
           <div className="popmodal-body tokn-popup no-ht trans-mod">
            <div className="pop-block">
              <div className="pop-top">
                <div className="dark-bg-800 h-100 status-sec sec-ht position-relative text-center">
                  <img src="../../assets/images/footer-logo.png" className="m-auto mb-3"/>
                  <h3 className="ff-mos small_warning_heading">Approve your network change in Metamask</h3>
                  <p className="small_warning_text ff-mos">To use Shibarium Staking change your Metamask network to Goerli Testnet.</p>
                </div>
              </div>
              <div className="pop-bottom">
                <div className="staus-btn">
                  <button
                    type="button"
                    className="btn primary-btn w-100"
                    // disabled={hashLink ? false : true}
                    // onClick={() => window.open(hashLink)}
                  >
                    Switch to Goerli Testnet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ChainWarning>
      <div className="shib-dropdown">
        <Dropdown className="nav-item d-flex align-items-center cus-dd app-drop">
          <div className="dot-icon" id="basic-nav-dropdown">
            <img src="../../assets/images/menu-icon.png" alt="" />
          </div>
          <NavDropdown className="light-text dd-ico" title={title} id="">
            <NavDropdown.Item onClick={()=>router.push('/wallet', '/wallet', { shallow: true })}>
              <h6
                className={
                  title === "Wallet"
                    ? "fw-600 light-text left-border primary-text"
                    : "fw-600 light-text left-border"
                }
              >
                Wallet
              </h6>
              <span className="light-text">
                Send and receive crypto assets on Shibarium network
              </span>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={()=>router.push('/bridge', '/bridge', { shallow: true })}>
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
            <NavDropdown.Item onClick={()=>router.push('/bone-staking', '/bone-staking', { shallow: true })}>
              <h6
                className={
                  title === "Staking"
                    ? "fw-600 light-text left-border primary-text"
                    : "fw-600 light-text left-border"
                }
              >
                Staking
              </h6>
              <span className="light-text">Stake shiba and earn rewards</span>
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
      </>
    );
  }
  else {
    return null;
  }
  
}

export default AppHeader
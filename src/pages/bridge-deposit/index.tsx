/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";

import { Button, Container, Nav, Navbar, NavDropdown,Dropdown ,Modal} from 'react-bootstrap';

import { useRouter } from "next/dist/client/router";
import Popup from "../components/PopUp";
// import { useWeb3React } from '@web3-react/core'
// import { Web3Provider } from '@ethersproject/providers'
// import  ProjectContext  from "../../context/ProjectContext";
// import { useAccount } from "../../../hooks/web3hooks";
// import { walletConnector } from "../../utils/connectors";
// import Web3 from "web3";
import  CommonModal from "../components/CommonModel";
import Link from 'next/link'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import Sidebar  from "../layout/sidebar"
import Web3Status from "app/components/Web3Status";
import { useActiveWeb3React } from "app/services/web3";

export default function Deposit() {
  const router = useRouter()
  // const {handleAccount}=useContext(ProjectContext)
  const [showSendModal, setSendModal] = useState(false);
  const [menuState, setMenuState] = useState(false);
 
  const { account } = useActiveWeb3React()
  // const account = useAccount()
   
  const connectToMetamask=()=>{
    // authenticate()
    // activate(walletConnector)
  }

  
  // useEffect(() => {
  //   if (library) {
  //    let web3 =  new Web3(library?.provider)
  //    const publicAddress = account;
  //    if ( publicAddress && web3 && web3.eth &&  web3.eth.personal) {
  //      web3.eth.personal.sign(
  //       'Welcome to Shibarium',
  //       publicAddress,
  //       ()=>{}
  //     )
  //    }
  //   }
  // }, [library,account])
  

  // useEffect(()=>{
  //  const isLoggedIn =  localStorage.getItem('isLoggedIn')
  //  if (isLoggedIn) {
  //    connectToMetamask()
  //  }
  // },[])
  useEffect(() => {
    if(account){
      // handleAccount(account)
      // router.push('/assets')
    }
    },[account]);
    // useEffect(() => {
    //   // if(error){
    //   //   const errorMsg = getErrorMessage(error)
    //   //  alert(errorMsg)
    //   //  }
    // },[error]);
  
    const handleMenuState = () => {
        setMenuState(!menuState)
    }

  return (
    <>
      <main className="main-content">
        <Sidebar
          handleMenuState={handleMenuState}
          onClickOutside={() => {
            setMenuState(false);
          }}
          menuState={menuState}
        />
        <CommonModal
          title={"Transferring funds"}
          show={showSendModal}
          setshow={setSendModal}
          externalCls=""
        >
          {/* step 1 */}
          <>Continue
            {/* transferring funds popop start */}

            <div className="cmn_modal">
              <p className="mb-0">Sending funds to exchanges:</p>
              <div className="exchng_msg_box">
                <p>Exchanges supported from Shibarium network</p>
                <p className="sprdt_txt">Supported Excanges</p>
              </div>
              <p className="alert_msg">
                <img src="../../assets/images/i-info-icon.png" /> Sending funds to
                unsupported exchanges will lead to permanent loss of funds.
              </p>
              <div className="pop_btns_area row">
                <div className="col-6">
                  <a className="btn blue-btn w-100" href="/">
                    Cancel
                  </a>{" "}
                </div>
                <div className="col-6">
                  <a
                    className="btn primary-btn w-100"
                    href="/"
                  >
                    Continue
                  </a>{" "}
                </div>
              </div>
              <p className="pop_btm_txt text-center">
                If you want to send funds between chains visit{" "}
                <a href="#">Shibarium Bridge</a>
              </p>
            </div>

            {/* transferring funds popop ends */}

            {/* send popop start */}
            {/* <div className="cmn_modal">
                    <h4 className="pop_main_h text-center">Send</h4>
                     <form>
                        <div className="form-group">                        
                          <input type="text" className="form-control cmn_inpt_fld"  placeholder="Reciver address"/>
                        </div>
                        <div className="form-group">  
                          <label>Enter a valid reciver address on Shibarium Mainnet</label>                      
                          <input type="text" className="form-control cmn_inpt_fld"  placeholder="0.00"/>
                          <p className="inpt_fld_hlpr_txt">
                            <span>0.00$</span>
                            <b>Available Balance: 0.00 SHIB</b>
                          </p>
                          <div className="pop_btns_area mr-top-50 row">
                              <div className="col-6"><a className='btn blue-btn w-100' href="/">Back</a>  </div>
                              <div className="col-6"><a className='btn primary-btn w-100' href="/">Send</a>  </div>
                          </div>
                        </div>
                     </form>
                     <p className="pop_btm_txt text-center">If you want to send funds between chains visit <a href="#" >Shibarium Bridge</a></p>
                </div> */}
            {/* send popop ends */}
          </>
          {/* step 1 end */}
        </CommonModal>
        <section className="assets-section">
          <div className="cmn_dashbord_main_outr">
            <div className="inner-header">
              <Navbar className="py-0">
                <Container>
                  <Navbar.Brand
                    onClick={() => setMenuState(true)}
                    className="menu-btn"
                  >
                    <img
                      className="img-fluid"
                      src="../../assets/images/menu.png"
                      alt=""
                    />
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                      <Dropdown className="d-flex align-items-center">
                        <div className="" id="basic-nav-dropdown">
                          <img src="../../assets/images/menu-icon.png" alt="" />
                        </div>
                        <NavDropdown className="me-3" title="App">
                          <NavDropdown.Item href="#action/3.1">
                            Action
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">
                            Another action
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">
                            Something
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.4">
                            Separated link
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Dropdown>
                      <Nav.Item>
                        <Link className="d-none" href={"/"} passHref>
                          <a
                            className="btn primary-btn d-flex align-items-center"
                            href="/"
                          >
                            <img
                              className="img-fluid me-2"
                              src="../../assets/images/meta-icon.png"
                              alt="meta-img"
                              width={28}
                            />
                            <span>0x21A...48A5</span>
                          </a>
                        </Link>
                      </Nav.Item>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </div>
            {/* assets section start */}
            <div className="assets_outr">
              <h2>My Balance</h2>
              <div className="assets_top_area">
                <div className="main_net_amnt t_a_clm">
                  <h1>20.000$</h1>
                  <p>shibarium mainnet</p>
                </div>
                <div className="btns_area t_a_clm">
                  <a href="#" className="btn grey-btn w-100 d-block">
                    <span>
                      <img src="../../assets/images/recive-icon.png" alt="recive" />
                    </span>
                    Receive
                  </a>
                  <button
                    onClick={() => setSendModal(true)}
                    className="btn grey-btn w-100 d-block"
                  >
                    <span>
                      <img src="../../assets/images/send-icon.png" alt="recive" />
                    </span>
                    Send
                  </button>
                </div>
                <div className="lrg_btns_area t_a_clm">
                  <a href="#" className="btn white-btn w-100 d-block">
                    Move funds from Ethereum to Shibarium
                  </a>
                  <a href="#" className="btn white-btn w-100 d-block">
                    How Shibarium works
                  </a>
                </div>
              </div>

              <div className="assets_btm_area">
                <h2>Assets on Shibarium</h2>
                <div className="cmn_dasdrd_table">
                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Balance</th>
                          <th>Actions</th>
                          <th colSpan={2} className="text-end">
                            <input type="search" placeholder="Search" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span>
                              <img src="../../assets/images/shiba-round-icon.png" />
                            </span>
                            <b>SHIB</b> - Shibatoken
                          </td>
                          <td>0.0000 - 0.00$</td>
                          <td>
                            <a href="#">Deposit</a>
                          </td>
                          <td>
                            <a href="#">Whitdraw</a>
                          </td>
                          <td>
                            <a href="#">Send</a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>
                              <img src="../../assets/images/matic-round-icon.png" />
                            </span>
                            <b>MATIC</b> - Shibarium
                          </td>
                          <td>0.0000 - 0.00$</td>
                          <td>
                            <a href="#">Deposit</a>
                          </td>
                          <td>
                            <a href="#">Whitdraw</a>
                          </td>
                          <td>
                            <a href="#">Send</a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>
                              <img src="../../assets/images/bnb-round-icon.png" />
                            </span>
                            <b>BNB</b> - BNB
                          </td>
                          <td>0.0000 - 0.00$</td>
                          <td>
                            <a href="#">Deposit</a>
                          </td>
                          <td>
                            <a href="#">Whitdraw</a>
                          </td>
                          <td>
                            <a href="#">Send</a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>
                              <img src="../../assets/images/shiba-round-icon.png" />
                            </span>
                            <b>SHIB</b> - Shibatoken
                          </td>
                          <td>0.0000 - 0.00$</td>
                          <td>
                            <a href="#">Deposit</a>
                          </td>
                          <td>
                            <a href="#">Whitdraw</a>
                          </td>
                          <td>
                            <a href="#">Send</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* assets section end */}
          </div>
        </section>
      </main>
    </>
  );
}

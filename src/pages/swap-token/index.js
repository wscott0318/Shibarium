/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
import Selection from './selection';
import Swap from './swap';
import Amount from './amount';
import Footer from '../footer/index';
import Web3Status from "app/components/Web3Status";
export default function differentchainbridge() {

    const [menuState, setMenuState] = useState(false);

    const handleMenuState = () => {
        setMenuState(false)
    }

    return (
       <>
            <main className="main-content">
                <Sidebar handleMenuState={handleMenuState} menuState={menuState}/>
                <div className="cmn_dashbord_main_outr">
                <div className="inner-header">
                    <Navbar className='py-0'>
                      <Container>
                        <Navbar.Brand onClick={() => setMenuState(true)} className="menu-btn">
                          <img className="img-fluid" src="../../images/menu.svg" alt="" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                          <Nav className="ms-auto">
                              <Dropdown className="d-flex align-items-center cus-dd mob-drop">
                              <div className="dot-icon" id="basic-nav-dropdown">
                                <img src="../../images/menu-icon.png" alt="" />
                              </div>
                              <NavDropdown className="me-3" title="App">
                                <div className="drop-head">
                                  <div className="head-brand">
                                    <img src="../../images/Shib-Logo.png" alt="" />
                                  </div>
                                  <div className="head-txt">
                                    <div className="top-txt">
                                      <div>
                                        <span>Account 0xe78</span>
                                      </div>
                                      <div>
                                        <span className="grey-txt">Shibarium Mainnet</span>
                                      </div>
                                    </div>
                                    <div className="botom-txt">
                                      <div className="code-txt">
                                        <span className="key">0xe7832a34576B9A23b98B7cE8ef83B1a8D9D229f0</span>
                                      </div>
                                      <div className="copy-blk">
                                        <a href="javascript:void(0);" title="Copy"><img src="../../images/copy.png" alt="" /></a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <NavDropdown.Item href="#action/3.1">
                                  <div className="custum-row">
                                    <div className="lft-img">
                                      <img src="../../images/recive-icon.png" alt="" />
                                    </div>
                                    <div className="center-txt">
                                      <span>Recive Funds</span>
                                    </div>
                                    <div className="rt-image">
                                      <img src="../../images/rt-arow.png" alt="" />  
                                    </div>
                                  </div>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                  <div className="custum-row">
                                    <div className="lft-img">
                                      <img src="../../images/graph.png" alt="" />
                                    </div>
                                    <div className="center-txt">
                                      <span>View on Etherscan</span>
                                    </div>
                                    <div className="rt-image">
                                      <img src="../../images/rt-arow.png" alt="" />  
                                    </div>
                                  </div>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                  <div className="custum-row">
                                    <div className="lft-img">
                                      <img src="../../images/graph.png" alt="" />
                                    </div>
                                    <div className="center-txt">
                                      <span>View on Shibariumscan</span>
                                    </div>
                                    <div className="rt-image">
                                      <img src="../../images/rt-arow.png" alt="" />  
                                    </div>
                                  </div>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                  <div className="custum-row pb-0">
                                    <div className="lft-img ps-2">
                                      <img src="../../images/back.png" alt="" />
                                    </div>
                                    <div className="center-txt">
                                      <span>Logout</span>
                                    </div>
                                    <div className="rt-image">
                                      <img src="../../images/rt-arow.png" alt="" />  
                                    </div>
                                  </div>
                                </NavDropdown.Item>
                                {/* <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                  Separated link
                                </NavDropdown.Item> */}
                              </NavDropdown>
                              </Dropdown>
                            
                            {/* <Nav.Item>
                              <Link href={'javascript:void(0)'}>
                                <a className='btn primary-btn d-flex align-items-center' href="javascript:void(0)">
                                  <img className="img-fluid me-2" src="../../images/meta-icon.png" alt="meta-img"/>
                                  <span>0x21A...48A5</span>
                                </a>
                              </Link>
                            </Nav.Item> */}
                            <Nav.Item className="btn-status">
                              <Web3Status/>
                            </Nav.Item>
                          </Nav>
                        </Navbar.Collapse>
                      </Container>
                    </Navbar>
                  </div>

                </div>
            </main>
       </>
    )
}

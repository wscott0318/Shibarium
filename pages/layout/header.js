import React, { useState,useRef,useEffect } from 'react'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Sidebar from './sidebar';
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  function handlClick() {
    setIsOpen((prev) => !prev)
  }

  // below is the same as componentDidMount and componentDidUnmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, isVisible);
    return () => {
      document.removeEventListener("click", handleClickOutside, isVisible);
    };
  }, []);

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  return (
    <>
      <header className='main-header inner-header'>
        <nav className="navbar navbar-expand-xl navbar-light p-0">
          <div className="container-fluid" >
            <a href="javascript:void(0)" className="burger-menu d-xl-none" onClick={handlClick}>
              <img src="../../assets/images/bars-solid.png" alt="" className="menu-sm" width={18} />
            </a>
            <div ref={wrapperRef} className="active">
              {isOpen ? <Sidebar isOpen={isOpen} /> : null}
            </div>
            <a className="navbar-brand d-xl-none" href="javascript:void(0)">
              <img className='img-fluid' src="../../assets/images/logo.png" alt="" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                {/* <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="./dashboard">Fast Withdraw / Deposits</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./payments">On Ramp Transfers</a>
                </li> */}
                {/* <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">How it Works?</a>
                </li>
                <li className="nav-item">
                  <a href="javascript:void(0)" className="nav-link">
                    FAQ
                  </a>
                </li>
                <li className="nav-item">
                  <a className='nav-link' href="javascript:void(0)">
                    User Guide
                  </a>
                </li> */}
              </ul>
            </div>
            <div className="app-menu cus-dd ms-3">
              <NavDropdown className='light-text' title="App" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  <h6 className='fw-600 light-text left-border'>Shibarium Wallet</h6>
                  <span className="light-text">Send and receive crypto assets on Shibarium network</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <h6 className='fw-600 light-text left-border'>Shibarium Bridge</h6>
                  <span className='light-text'>Deposit and withdraw between networks</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <h6 className='fw-600 light-text left-border'>Stacking</h6>
                  <span className='light-text'>Stake shiba and earn rewards</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  <h6 className='fw-600 light-text left-border'>Widget Dashboard</h6>
                  <span className='light-text'>Manage all your Shibarium wallet widgets at one place</span>
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            <div className='right-widget ms-auto'>
              <div className='widg-col me-3'>
                <a className='btn gradient_btn' href="javascript:void(0)">
                  <span>Switch to Shibarium</span>
                </a>
              </div>
              <div className="widg-col d-flex align-items-center">
                <div className='prof-img me-2'>
                  <img className='img-fluid' src="../../assets/images/meta.png" alt="prof-img" />
                </div>
                <div className="cus-dd">
                  <NavDropdown title="Account 5d45" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      <div className="detail-col">
                        <div className="d-flex align-items-center">
                          <div className="img-wrap me-2 d-flex align-items-center justify-content-center">
                            <div className="shp-sqr"></div>
                          </div>
                          <div className="item-wrap">
                            <div className="d-flex justify-content-between">
                              <span className="light-text trs-3">
                                Account 5d45
                              </span>
                              <span className="light-text fw-500 trs-3">Mumbai</span>
                            </div>
                            <div className="label-btn badge-sm">
                              0H2T6362YDC8H5VLUW4S8T1X4W8DT5J4U8V2Z5W8F4J
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="px-2 arrow-after" href="#action/3.2">
                      <div className="d-flex">
                        <div className="img-wrap me-3">
                          <img src="../../assets/images/scaner.png" alt="" className="img-fluid" />
                        </div>
                        <span className="light-text">Show QR Code</span>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="px-2 arrow-after" href="#action/3.2">
                      <div className="d-flex">
                        <div className="img-wrap me-3">
                          <img src="../../assets/images/logout.png" alt="" className="img-fluid" />
                        </div>
                        <span className="light-text">Logout</span>
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

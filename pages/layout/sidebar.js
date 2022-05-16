import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
export default function Sidebar(props) {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);





  const handlClick = () => {
    setIsVisible((prev) => !prev)
  };


  return (
    <> {isVisible ?
      <aside className={isVisible ? props.isOpen ? 'sidebar active ' : 'sidebar' : 'sidebar d-none'} ref={wrapperRef}>
        {/* <button className='d-xl-none' >close</button> */}
        <a  href="javascript:void(0)" onClick={handlClick} className="d-xl-none close-icon">
            <img className='img-fluid' src="../../assets/images/download.svg" alt="" />
        </a>
        <div className="d-xl-none p-2 py-3">

          <div className="widg-col d-flex align-items-center">
            <div className='prof-img me-2'>
              <img className='img-fluid' src="../../assets/images/meta.png" alt="prof-img" />
            </div>
            <h6 className='fw-500 text-white'>Account 5d45</h6>
          </div>
        </div>
        <div className='side-logo d-none d-xl-block'>
          <a href="./home">
            <img className='img-fluid' src="../../assets/images/logo-white.png" alt="logo" />
          </a>
        </div>

        <ul className="nav-menu">
          <li className="nav-item">
            <div className="active-shape">
              <img className='img-fluid' src="../../assets/images/radius.png" alt="" />
            </div>
            <a href="./balance" className="nav-link">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/assets-dark.png" alt="" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/assets.png" alt="side-ico" />
              </span>
              <span>Assets on Shibarium</span>
            </a>
          </li>
          <li className="nav-item active">
            <div className="active-shape">
              <img className='img-fluid' src="../../assets/images/radius.png" alt="" />
            </div>
            <a href="./dashboard" className="nav-link active">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/bridge-dark.png" alt="side-ico" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/bridge.png" alt="side-ico" />
              </span>
              <span>Bridge</span>
            </a>
          </li>
          <li className="nav-item">
            <div className="active-shape">
              <img className='img-fluid' src="../../assets/images/radius.png" alt="" />
            </div>
            <a href="./transactions" className="nav-link">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/transfer-dark.png" alt="side-ico" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/transfer.png" alt="side-ico" />
              </span>
              <span>Transactions</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="./shibatoken" className="nav-link">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/burn-dark.png" alt="side-ico" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/burn.png" alt="side-ico" />
              </span>
              <span>Shiba Burn</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="javascript:void(0)" className="nav-link">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/new-dark.png" alt="side-ico" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/new.png" alt="side-ico" />
              </span>
              <span>What’s New?</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="javascript:void(0)" className="nav-link">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/wallet-dark.png" alt="side-ico" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/wallet.png" alt="side-ico" />
              </span>
              <span>Mainnet Wallet</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="javascript:void(0)" className="nav-link">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/wallet-dark.png" alt="side-ico" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/wallet.png" alt="side-ico" />
              </span>
              <span>Mainnet Wallet</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="javascript:void(0)" className="nav-link">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/support-dark.png" alt="side-ico" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/support.png" alt="side-ico" />
              </span>
              <span>Support</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="javascript:void(0)" className="nav-link">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/support-dark.png" alt="side-ico" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/support.png" alt="side-ico" />
              </span>
              <span>How it Works?</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="javascript:void(0)" className="nav-link">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/support-dark.png" alt="side-ico" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/support.png" alt="side-ico" />
              </span>
              <span>FAQ</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="javascript:void(0)" className="nav-link">
              <span className='nav-icon'>
                <img className='img-fluid dark-ico' src="../../assets/images/icons/support-dark.png" alt="side-ico" />
                <img className='img-fluid light-ico' src="../../assets/images/icons/support.png" alt="side-ico" />
              </span>
              <span>User Guide</span>
            </a>
          </li>
        </ul>
      </aside> : !props.isOpen ? <button onClick={handlClick}>open</button> : null}
    </>
  )
}

import React from 'react'
import { Container, Navbar, Nav, NavItem, NavDropdown, } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
function ShibaSidebar() {
    return (
        <>
        <aside className='sidebar'>
            <a href="javascript:void(0)" className="close-icon">
                <img className="img-fluid" src="../../assets/images/download.svg" alt="" />
            </a>
            <div className="side-logo d-none">
                <a href="./home">
                    <img className="img-fluid" src="../../assets/images/logo-white.png" alt="logo" />
                </a>
            </div>
            <ul className='nav-menu side-bg mt-3'>
                <li className="nav-item">
                    <div className="nav-link">
                        <p className='mb-0 fwb text-white'>
                            Burn Contracts
                        </p>
                    </div>
                </li>
                <li className="nav-item">
                    <a href="./balance" className="nav-link">
                        <span className='nav-icon'>
                            <img className='img-fluid light-ico' src="../../assets/images/icons/shiba-ico.png" alt="side-ico" />
                        </span>
                        <span>0v70...3f85</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="./balance" className="nav-link">
                        <span className='nav-icon'>
                            <img className='img-fluid light-ico' src="../../assets/images/icons/eth.png" alt="side-ico" />
                        </span>
                        <span>0v70...3f85</span>
                    </a>
                </li>
            </ul>
            <ul className="nav-menu">
                <li className="nav-item">
                    <a href="./balance" className="nav-link">
                        <span className='nav-icon'>
                            <img className='img-fluid dark-ico' src="../../assets/images/icons/new-dark.png" alt="" />
                            <img className='img-fluid light-ico' src="../../assets/images/icons/new.png" alt="side-ico" />
                        </span>
                        <span>How The Burn Works?</span>
                    </a>
                </li>
                <li className="nav-item">
                    <div className="active-shape">
                        <img className='img-fluid' src="../../assets/images/radius.png" alt="" />
                    </div>
<<<<<<< HEAD
                    <a href="./transactions" className="nav-link">
=======
                    <a href="javascript:void(0)" className="nav-link">
>>>>>>> 5950c253af96671849793b05619cb21f0ef7bb83
                        <span className='nav-icon'>
                            <img className='img-fluid dark-ico' src="../../assets/images/icons/support-dark.png" alt="side-ico" />
                            <img className='img-fluid light-ico' src="../../assets/images/icons/support.png" alt="side-ico" />
                        </span>
                        <span>Get Support</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="./shibatoken" className="nav-link">
                        <span className='nav-icon'>
                            <img className='img-fluid dark-ico' src="../../assets/images/icons/burn-dark.png" alt="side-ico" />
                            <img className='img-fluid light-ico' src="../../assets/images/icons/burn.png" alt="side-ico" />
                        </span>
                        <span>Burn on Mainnet</span>
                    </a>
                </li>
            </ul>
        </aside>
        </>
    )
}

export default ShibaSidebar
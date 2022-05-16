import React from 'react';
import { Dropdown,Navbar,Container,Nav } from 'react-bootstrap';
import { useRouter } from "next/router";

const InnerHeader = () => {
    const router = useRouter();
    const [show, setShow] = React.useState();
    return (
        <div className='wrapper'>
           <header className='main-header darkBg'>
                <div className="container">
                    <nav className='nav justify-content-between align-items-center'>
                        <div className='left-widget'>
                            <a href='./home' className="navbar-brand">
                                <img className='img-fluid' src="../../assets/images/logo.png" alt="" />
                                <img className='img-fluid d-none' src="../../assets/images/logo-white.png" alt="" />
                            </a>
                        </div>
                        <div className="right-widget">
                            <form action="" className='inline-form'>
                                <a href="javascript:void(0)" className='btn warning-btn'>
                                    <span>Connect To A Wallet</span>
                                </a>
                            </form>
                        </div>
                    </nav>
                </div>
            </header>
            <header className='bottom-header'>
                <Navbar expand="md" className="py-0">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-toggle" />
                        <Navbar.Collapse id="basic-navbar-nav header-row">
                            <ul className="me-auto navbar-nav header-row">
                                <li className="nav-item">
                                    <Nav.Link className="active" href="./bone-staking">Overview</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link href="./all-validator">All Validators</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link href="./account">My Account</Nav.Link>
                                </li>
                            </ul>
                            <ul className="ms-auto navbar-nav header-row">
                                <li className="nav-item">
                                    <Nav.Link href="./rewards-calculator">Reward Calculator</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link href="javascript:void(0)">Shiba Explorer</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link href="javascript:void(0)">FAQ</Nav.Link>
                                </li>
                            </ul>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div>
    );
}

export default InnerHeader;

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
                    
                </div>
            </main>
       </>
    )
}

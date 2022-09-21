import React, { useRef, useState } from 'react'
import { Container, Navbar, Nav, NavItem, NavDropdown, } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
function ShibaSidebar(props:any) {
    const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const handlClick = () => {
    setIsVisible((prev) => !prev);
  };

    return (
       <>
       <h1>token-sidebar</h1>
       </>
    )
}

export default ShibaSidebar
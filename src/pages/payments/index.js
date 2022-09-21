/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
import ImportantPopup from '../important-popup'
import SendPopup from '../send-popup'
export default function login() {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalSend, setModalSend] = React.useState(false);
  return (
   <>
    <h1>Payments index.js</h1>
   </>
  )
}

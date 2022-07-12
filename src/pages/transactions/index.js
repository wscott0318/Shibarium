/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import Sidebar from '../layout/sidebar';

import OuterTable from './outerTable';

export default function Transactions() {
  return (
    <>
      {/* <Header /> */}
      <div className="page-wrapper">
      <Sidebar />
      <main className='main-content shiba-token'>
        <div className='heading-sec'>
          <h3 className='fw-700 mb-2'>Transactions</h3>
          <div className='fs-23'>Note: Send transaction is not included in transaction history</div>
        </div>
        <OuterTable />
      </main>
    </div>
    </>
  )
}

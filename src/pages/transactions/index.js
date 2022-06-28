/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import Sidebar from '../layout/sidebar';
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
     
      <div className='outer-table mb-4 mb-lg-5'>
        <table className='data-table'>
          <thead>
          <tr className='table-header'>
            <th>Burn</th>
            <th>#Block</th>
            <th>Transaction Hash</th>
            <th>Action</th>   
          </tr>
          </thead>
          <tbody>
          <tr>
            <td colSpan={4}>
              <div className='text-center'>
                <img width="48" height="58" className='img-fluid' src="../../assets/images/bear.png" alt="" />
                <div className='fw-600'>No Transactions</div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      </main>
    </div>
    </>
  )
}

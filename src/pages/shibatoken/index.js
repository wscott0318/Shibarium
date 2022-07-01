/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
import ShibaSidebar from '../../pages/token-sidebar';
import Burn from './burn';
import CompleteBurn from './completeBurn';

export default function ShibaToken() {
  return (
    <>
      {/* <Header /> */}
      <div className="page-wrapper">
        {/* <Sidebar /> */}
        <ShibaSidebar />
        <main className='main-content shiba-token'>
          <div className='heading-sec'>
            <h3 className='fw-700 mb-2'>Burn BONE Token</h3>
            <div className='fs-23'>Trigger and watch BONE tokens get burned with EIP-1559</div>
          </div>
          <div className='botom-space-md'>
            <div className='row'>
              <div className='col-xl-9 col-xxl-9 col-lg-12'>
                <div className='black_clr_box low-radius sec-spc-low position-relative'>
                  <div className='image-section'><img width="189" height="147" className='img-fluid' src="../../assets/images/shadow-img.png" alt="" /></div>
                  <div className='row'>
                    <div className='col-sm-6 col-12 text-sm-start text-center rt-border'>
                      <h3 className='fw-700 light-text mb-2 mb-sm-4 d-flex align-items-center'>
                        <img width="22" height="33" className='img-fluid' src="../../assets/images/burn.png" alt="" />
                        <span className='ms-2 align'>Total Burned</span>
                      </h3>
                      <h2 className='light-text low-font-wt mb-2 mb-sm-0'><span>101233.33 BONE</span></h2>
                    </div>
                    <div className='col-sm-6 col-12 text-sm-start text-center left-space'>
                      <h3 className='fw-700 light-text mb-2 mb-sm-4 d-flex align-items-center'><img width="22" height="33" className='img-fluid' src="../../assets/images/burn.png" alt="" /><span className='ms-2 align'>Burn In Progress</span></h3>
                      <h2 className='light-text low-font-wt mb-2 mb-sm-0'><span>29.33 BONE</span></h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Burn/>
          <CompleteBurn/>
          
          <div className='filter-sec'>
            <div className='row align-items-center'>
              <div className='col-sm-6 col-12'>
                <h4 className='fw-800'>Completed Burns</h4>
              </div>
              <div className='col-sm-6 col-12 text-end'>
              </div>
            </div>
          </div>
          <div className='outer-table mb-4 mb-lg-5 table-lt-txt d-none'>
            <table className='data-table'>
              <thead>
                <tr className='table-header'>
                  <th>Burned</th>
                  <th>Transaction Hash</th>
                  <th>Date &#38; Time (UTC)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className='tb-data'>580.80 BONE</span></td>
                  <td className='fw-600'><img width="13" height="43" className='img-fluid' src="../../assets/images/diamond.png" alt="" /><span className='align ps-2'>0xbe...4af0</span></td>
                  <td className='fw-600'>10 Mar 2022, 3:14 am</td>
                  <td className='user-action'>
                    <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Burn Completed</span></a>
                  </td>
                </tr>
                <tr>
                  <td><span className='tb-data'>8.75 BONE</span></td>
                  <td className='fw-600'><img width="13" height="43" className='img-fluid' src="../../assets/images/diamond.png" alt="" /><span className='align ps-2'>0xbe...4af0</span></td>
                  <td className='fw-600'>1 Mar 2022, 12:00 pm</td>
                  <td className='user-action'>
                    <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Burn Completed</span></a>
                  </td>
                </tr>
                <tr>
                  <td><span className='tb-data'>580.80 BONE</span></td>
                  <td className='fw-600'><img width="13" height="43" className='img-fluid' src="../../assets/images/diamond.png" alt="" /><span className='align ps-2'>0xbe...4af0</span></td>
                  <td className='fw-600'>10 Mar 2022, 3:14 am</td>
                  <td className='user-action'>
                    <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Burn Completed</span></a>
                  </td>
                </tr>
                <tr>
                  <td><span className='tb-data'>8.75 BONE</span></td>
                  <td className='fw-600'><img width="13" height="43" className='img-fluid' src="../../assets/images/diamond.png" alt="" /><span className='align ps-2'>0xbe...4af0</span></td>
                  <td className='fw-600'>1 Mar 2022, 12:00 pm</td>
                  <td className='user-action'>
                    <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Burn Completed</span></a>
                  </td>
                </tr>
                <tr>
                  <td><span className='tb-data'>8.75 BONE</span></td>
                  <td className='fw-600'><img width="13" height="43" className='img-fluid' src="../../assets/images/diamond.png" alt="" /><span className='align ps-2'>0xbe...4af0</span></td>
                  <td className='fw-600'>1 Mar 2022, 12:00 pm</td>
                  <td className='user-action'>
                    <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Burn Completed</span></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='text-center pagination-sec'>
            <div className='row align-items-center'>
              <div className='col-lg-7 col-md-12 cus-pagination ms-auto'>
                <div className="d-inline-block">
                  <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#"><span>Previous</span></a></li>
                    <li className="page-item"><a className="page-link" href="#"><span>1</span></a></li>
                    <li className="page-item"><a className="page-link" href="#"><span>2</span></a></li>
                    <li className="page-item"><a className="page-link" href="#"><span>3</span></a></li>
                    <li className="page-item"><a className="page-link" href="#"><span>Next</span></a></li>
                  </ul>
                </div>
              </div>
              <div className='col-lg-3 col-md-12 text-center text-lg-end mt-3 mt-lg-0'>
                <span className='fw-700'>
                  Showing 1-8 of 300
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

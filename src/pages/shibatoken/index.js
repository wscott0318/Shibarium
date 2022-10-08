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
      <Header />
      <ShibaSidebar />
      <main className='main-content shib-content shiba-token dark-bg-800 full-vh top-space'>
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
                  <div className='col-sm-6 col-12 text-sm-start  rt-border'>
                    <h3 className='fw-700 light-text mb-2 mb-sm-4 d-flex align-items-center'>
                      <img width="22" height="33" className='img-fluid' src="../../assets/images/burn.png" alt="" />
                      <span className='ms-2 align'>Total Burned</span>
                    </h3>
                    <h2 className='light-text low-font-wt my-2 mb-sm-0'><span>101233.33 BONE</span></h2>
                  </div>
                  <div className='col-sm-6 col-12 text-sm-start left-space'>
                    <h3 className='fw-700 light-text mb-2 mb-sm-4 d-flex align-items-center'><img width="22" height="33" className='img-fluid' src="../../assets/images/burn.png" alt="" /><span className='ms-2 align'>Burn In Progress</span></h3>
                    <h2 className='light-text low-font-wt my-2 mb-sm-0'><span>29.33 BONE</span></h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Burn />


        <div className='filter-sec mt-4 mt-lg-5'>
          <div className='row align-items-center'>
            <div className='col-sm-6 col-12 mb-3'>
              <h4 className='fw-800'>Completed Burns</h4>
            </div>
            <div className='col-sm-6 col-12 text-end'>
            </div>
          </div>
        </div>
        <CompleteBurn />
        <div className='text-center pagination-sec'>
          <div className='row align-items-center'>
            <div className='col-lg-7 col-md-12 cus-pagination ms-auto mt-3 mt-md-4'>
              <div className="cstm_pagination mt-0">
                <div className="pag_con">
                  <div className="">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">Previous</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">2</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">3</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">Next</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-5 col-md-12 text-center text-lg-end mt-3 mt-md-4'>
              <span className=''>
                Showing 1-3 of 300
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

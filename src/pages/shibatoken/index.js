/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
export default function ShibaToken() {
  return (
    <>
      {/* <Header /> */}
      <div className="page-wrapper">
        {/* <Sidebar /> */}
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
              <a href="./transactions" className="nav-link">
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
                      <h3 className='fw-700 light-text mb-2 mb-sm-4'><img width="22" height="33" className='img-fluid' src="../../assets/images/burn.png" alt="" /><span className='ms-2 align'>Total Burned</span></h3>
                      <h2 className='light-text low-font-wt mb-2 mb-sm-0'><span>101233.33 BONE</span></h2>
                    </div>
                    <div className='col-sm-6 col-12 text-sm-start text-center left-space'>
                      <h3 className='fw-700 light-text mb-2 mb-sm-4'><img width="22" height="33" className='img-fluid' src="../../assets/images/burn.png" alt="" /><span className='ms-2 align'>Burn In Progress</span></h3>
                      <h2 className='light-text low-font-wt mb-2 mb-sm-0'><span>29.33 BONE</span></h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='pt-4 botom-spacing'>
            <div className='row'>
              <div className='col-sm-12 col-md-6'>
                <h4 className='fw-700 mb-4'>Initiate Burn On Shibarium</h4>
                <div className='card-box'>
                  <div className='stats-blk'>
                    <div className='burn-image'>
                      <img width="36" height="63" className='img-fluid' src="../../assets/images/burn-lg.png" alt="" />
                    </div>
                    <div>
                      <h6 className='mb-2'>Amount of BONE waiting to be burned</h6>
                      <h2 className='fw-700'>4.56<span className='txt-light'>9026</span> BONE</h2>
                    </div>
                  </div>
                  <div className='btn-sec'>
                    <button type="button" className="btn warning-btn uppercase-txt"><span>Initiate burn</span></button>
                  </div>
                  <div className='cus-alert'>
                    <div className='pe-2'><img width="23" height="23" className='img-fluid' src="../../assets/images/alert-icon.png" alt="" /></div>
                    <div>You will be able to initiate burn once the amount of BONE ready to be burned is greater than 10 BONE</div>
                  </div>
                </div>
              </div>
              <div className='col-sm-12 col-md-6 '>
                <h4 className='fw-700 mb-4 pt-sm-5 pt-md-0 pt-4'>Complete Burn On Ethereum</h4>
                <div className='card-box'>
                  <div className='stats-blk'>
                    <div className='burn-image'>
                      <img width="36" height="63" className='img-fluid' src="../../assets/images/burn-lg.png" alt="" />
                    </div>
                    <div>
                      <h6 className='mb-2'>Amount of BONE waiting to be burned</h6>
                      <h2 className='fw-700'>4.56<span className='txt-light'>9026</span> BONE</h2>
                    </div>
                  </div>
                  <div className='btn-sec'>
                    <button type="button" className="btn warning-btn border-btn light-text uppercase-txt"><span>Complete burn</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='filter-sec'>
            <div className='row align-items-center'>
              <div className='col-sm-6 col-12'>
                <h4 className='fw-800'>Continue And Complete Burn On Ethereum</h4>
              </div>
              <div className='col-sm-6 col-12 text-end'>
                <div className='fs-16 fw-600'>0 transactions left</div>
              </div>
            </div>
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
                      <div className='fw-600'>No Ongoing Transactions</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='filter-sec'>
            <div className='row align-items-center'>
              <div className='col-sm-6 col-12'>
                <h4 className='fw-800'>Completed Burns</h4>
              </div>
              <div className='col-sm-6 col-12 text-end'>
              </div>
            </div>
          </div>
          <div className='outer-table mb-4 mb-lg-5 table-lt-txt'>
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

import React from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
export default function Balance() {
  return (
    <>
      <Header />
      <div className="page-wrapper">
      <Sidebar />
      <main className='main-content'>
     
      <div className='botom-space-md'>
        <div className='row'>
          <div className='col-lg-7'>
              <div className='black_clr_box low-radius sec-spc-low position-relative'>
                <div className='image-section'><img width="189" height="147" className='img-fluid' src="../../assets/images/shadow-img.png" alt="" /></div>
                <div className='row'>
                  <div className='col-sm-8 text-sm-start text-center'>
                    <h3 className='fw-700 light-text mb-2 mb-sm-4'>Shibarium Testnet</h3>
                    <h2 className='light-text low-font-wt mb-2 mb-sm-0'><span>$256.23</span></h2>
                  </div>
                  <div className='col-sm-4 balance-btns'>
                    <div className='mb-3'><button type="button" className='btn gradient_btn border-btn light-text uppercase-txt w-100'><span>Recive</span></button></div>
                    <div><button type="button" className='btn bordered-btn light-text w-100'><span>Send</span></button></div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className='filter-sec'>
        <div className='row align-items-center'>
          <div className='col-sm-5 col-12'>
            <h4 className='fw-700 trs-1'>Balance On Shibarium Testnet</h4>
          </div>
          <div className='col-sm-7 col-12 text-end'>
            <div className='d-inline-block'>
              <div className="form-check cus-chkbox d-inline-block">
                <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                <label className="form-check-label head-xsm fw-600" for="check2"><span className='top-low-spc'>Hide Zero Balances</span></label>
              </div>
              <div className="form-check cus-chkbox d-inline-block">
                <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                <label className="form-check-label head-xsm fw-600" for="check2"><span className='top-low-spc'>Plasma Only</span></label>
              </div>
            </div>
            <div className='search-box d-inline-block position-relative'>
              <input className="cus-search w-100" type="text" placeholder="Search"></input>
              <img width="15" height="15" className='img-fluid' src="../../assets/images/search.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className='outer-table mb-4 mb-lg-5'>
        <table className='data-table'>
          <thead>
          <tr className='table-header'>
            <th>Name</th>
            <th>Balance</th>
            <th>Actions</th>  
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
            <img width="25" height="25" className='img-fluid' src="../../assets/images/coin.png" alt="" />
              <span className='tb-data align'>Matic .</span>
              <span className='tb-data-sm align'>Matic</span>
            </td>
            <td>
              <span className='tb-data align'>0.0000 .</span>
              <span className='tb-data-sm align'>$0.00</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt gradient_btn'><span>Deposit</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt primary-btn'><span>Withdraw</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Send</span></a>
            </td>
          </tr>
          <tr>
            <td>
            <img width="25" height="25" className='img-fluid' src="../../assets/images/blue-coin.png" alt="" />
              <span className='tb-data align'>ETH .</span>
              <span className='tb-data-sm align'>ETH . Ether (Plasma - WETH)</span>
              <span className='badge-sm align'>PLASMA</span>
            </td>
            <td>
              <span className='tb-data align'>0.0000 .</span>
              <span className='tb-data-sm align'>$0.00</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt gradient_btn'><span>Deposit</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt primary-btn'><span>Withdraw</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Send</span></a>
            </td>
          </tr>
          <tr>
            <td>
            <img width="25" height="25" className='img-fluid' src="../../assets/images/dolar.png" alt="" />
              <span className='tb-data align'>USDC .</span>
              <span className='tb-data-sm align'>(PoS) USD Coin</span>
            </td>
            <td>
              <span className='tb-data align'>0.0000 .</span>
              <span className='tb-data-sm align'>$0.00</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt gradient_btn'><span>Deposit</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt primary-btn'><span>Withdraw</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Send</span></a>
            </td>
          </tr>
          <tr>
            <td>
            <img width="25" height="25" className='img-fluid' src="../../assets/images/blue-coin.png" alt="" />
              <span className='tb-data align'>ETH .</span>
              <span className='tb-data-sm align'>ETH . Ether (Plasma - WETH)</span>
              <span className='badge-sm align'>PLASMA</span>
            </td>
            <td>
              <span className='tb-data align'>0.0000 .</span>
              <span className='tb-data-sm align'>$0.00</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt gradient_btn'><span>Deposit</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt primary-btn'><span>Withdraw</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Send</span></a>
            </td>
          </tr>
          <tr>
            <td>
            <img width="25" height="25" className='img-fluid' src="../../assets/images/coin.png" alt="" />
              <span className='tb-data align'>Matic .</span>
              <span className='tb-data-sm align'>Matic</span>
            </td>
            <td>
              <span className='tb-data align'>0.0000 .</span>
              <span className='tb-data-sm align'>$0.00</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt gradient_btn'><span>Deposit</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt primary-btn'><span>Withdraw</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Send</span></a>
            </td>
          </tr>
          <tr>
            <td>
            <img width="25" height="25" className='img-fluid' src="../../assets/images/blue-coin.png" alt="" />
              <span className='tb-data align'>ETH .</span>
              <span className='tb-data-sm align'>ETH . Ether (Plasma - WETH)</span>
              <span className='badge-sm align'>PLASMA</span>
            </td>
            <td>
              <span className='tb-data align'>0.0000 .</span>
              <span className='tb-data-sm align'>$0.00</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt gradient_btn'><span>Deposit</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt primary-btn'><span>Withdraw</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Send</span></a>
            </td>
          </tr>
          <tr>
            <td>
            <img width="25" height="25" className='img-fluid' src="../../assets/images/dolar.png" alt="" />
              <span className='tb-data align'>USDC .</span>
              <span className='tb-data-sm align'>(PoS) USD Coin</span>
            </td>
            <td>
              <span className='tb-data align'>0.0000 .</span>
              <span className='tb-data-sm align'>$0.00</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt gradient_btn'><span>Deposit</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt primary-btn'><span>Withdraw</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Send</span></a>
            </td>
          </tr>
          <tr>
            <td>
            <img width="25" height="25" className='img-fluid' src="../../assets/images/blue-coin.png" alt="" />
              <span className='tb-data align'>ETH .</span>
              <span className='tb-data-sm align'>ETH . Ether (Plasma - WETH)</span>
              <span className='badge-sm align'>PLASMA</span>
            </td>
            <td>
              <span className='tb-data align'>0.0000 .</span>
              <span className='tb-data-sm align'>$0.00</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt gradient_btn'><span>Deposit</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt primary-btn'><span>Withdraw</span></a>
              <a href="javascript:void(0)" title='' className='btn-small uppercase-txt success-btn'><span>Send</span></a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className='text-center pagination-sec'>
          <div className='row align-items-center'>
            <div className='col-lg-7 col-md-12 cus-pagination ms-auto'>
              <div className="d-inline-block">
                <ul class="pagination">
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
      <footer className='main-footer'>
          <div className="container">
              <div className="copyright mt-4 mt-lg-5">
                  <h3 className='mb-0 text-center fwb'>Powered by xFund.</h3>
              </div>
          </div>
      </footer>
      </main>
      
    </div>
    </>
  )
}

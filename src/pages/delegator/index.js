/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Dropdown } from 'react-bootstrap';
import InnerHeader from '../inner-header';
import DelegatePopup from '../delegate-popup';
import StakingHeader from '../staking-header'
export default function delegator() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <div className="main-content dark-bg-800 full-vh">
        <StakingHeader />
        {/* banner section start */}
        <section className="inner-banner dark-bg">
          <div className="container">
            <div className="section-info">
              <div className="row align-items-center">
                <div className="col-md-7 col-sm-12">
                  <div className="lft-txt">
                    <h1 className="mb-2 mb-sm-3 mb-md-4">All Validators</h1>
                    <div className="btns-sec mt-2">
                      <div className="btns-wrap">
                        <button onClick={()=>{
                        router.push('/become-validator')
                       }} className="btn primary-btn">Become a Validator</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-sm-12 m-hide">
                  <div className="shib-img-sec text-end">
                    <img src="../../images/shiba-img.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* banner section closed */}

        <section className="table-section top-pad bottom-pad">
          <div className="container">
            <div className="filter-row mb-md-5 mb-sm-4 mb-3 ff-mos">
              <div className="left-section">
                <input className="custum-search w-100" type="search " placeholder="Search by validator name, id" />
              </div>
              <div className="right-section">
                <div className="switch-sec">
                  <span className="help-txt">Show Auction Only</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="select-sec">
                  <div>
                    <span>Sort By</span>
                  </div>
                  <div className="cus-sel">
                    <select className="form-select" >
                      <option selected>Random</option>
                      <option value="1">One</option>
                    </select>
                  </div>
                </div>
                <div className="layout-sec">
                  <div className="list blk-active">
                    <a href="javascript:void(0);"><img className="white-icon" src="../../images/list-white.png" /></a>
                    <a href="javascript:void(0);"><img className="grey-icon" src="../../images/list-grey.png" /></a>
                  </div>
                  <div className="cus-grid">
                    <a href="javascript:void(0);"><img className="white-icon" src="../../images/grid-white.png" /></a>
                    <a href="javascript:void(0);"><img className="grey-icon" src="../../images/grid-grey.png" /></a>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="heading-sec mt-2 mb-2">
              <h2 className="sub-head mb-sm-4 mb-3">List of active Validators</h2>
            </div> */}
            <div className="cmn_dasdrd_table">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Stake</th>
                      <th>Checkpoints Signed</th>
                      <th>Commission</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span><img src="../../images/shiba-round-icon.png" /></span><b>SHIB</b> - Shibatoken</td>
                      <td>0.0000 - 0.00$</td>
                      <td><a href="#">Deposit</a></td>
                      <td><a href="#">Whitdraw</a></td>
                      <td><a className="sm-btn primary-btn" href="javascript:void(0);">Delegate</a></td>
                    </tr>
                    <tr>
                      <td><span><img src="../../images/matic-round-icon.png" /></span><b>MATIC</b> - Shibarium</td>
                      <td>0.0000 - 0.00$</td>
                      <td><a href="#">Deposit</a></td>
                      <td><a href="#">Whitdraw</a></td>
                      <td><a className="sm-btn primary-btn" href="javascript:void(0);">Delegate</a></td>
                    </tr>
                    <tr>
                      <td><span><img src="../../images/bnb-round-icon.png" /></span><b>BNB</b> - BNB</td>
                      <td>0.0000 - 0.00$</td>
                      <td><a href="#">Deposit</a></td>
                      <td><a href="#">Whitdraw</a></td>
                      <td><a className="sm-btn primary-btn" href="javascript:void(0);">Delegate</a></td>
                    </tr>
                    <tr>
                      <td><span><img src="../../images/shiba-round-icon.png" /></span><b>SHIB</b> - Shibatoken</td>
                      <td>0.0000 - 0.00$</td>
                      <td><a href="#">Deposit</a></td>
                      <td><a href="#">Whitdraw</a></td>
                      <td><a className="sm-btn primary-btn" href="javascript:void(0);">Delegate</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

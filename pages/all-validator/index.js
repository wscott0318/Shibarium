import React from 'react'
import { Dropdown } from 'react-bootstrap';
import InnerHeader from '../inner-header';
import DelegatePopup from '../delegate-popup'
export default function Allvalidator() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
    <div className="page-wrapper">
      <InnerHeader />
      <DelegatePopup  show={modalShow}
        onHide={() => setModalShow(false)}/>
      <main className='delegator-sec'>
        <div className='botom-space-lg'>
            <div className='blue-bg position-relative sec-spc-high position-relative'>
                <div className='char-block'>
                    <img width="655" height="262" className='img-fluid' src="../../assets/images/meaoth.png" alt="" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-8 text-sm-start text-center'>
                        <h1 className='light-text mb-2 mb-sm-3 fnt-58 fnt-100'>All Validators</h1>
                        <div className=''><a href="./become-validator" className='btn light-btn' title=""><span>Become A Validator</span></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='container'> 
            <div className='filter-sec'>
                <div className='row align-items-center'>
                    <div className='col-lg-5 col-12 mb-sm-4 mb-lg-0 mb-4'>
                        <div className='search-box d-inline-block position-relative w-100'>
                            <input className="cus-search w-100" type="text" placeholder="Search by validator name, Id, owner or signer address"></input>
                            <img width="15" height="15" className='img-fluid' src="../../assets/images/search.png" alt="" />
                        </div>
                    </div>
                    <div className='col-lg-7 col-12 text-end mob-filter'>
                        <div className='d-inline-block pe-0 pe-sm-4 mob-filter'>
                            <label className="head-xsm fw-600" for="Auction"><span className='top-low-spc pe-2 align'>Show Auction Only</span></label>
                            <label class="switch align">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div className='d-inline-block pe-4 pe-sm-4'>
                            <label className="head-xsm fw-600" for="Auction"><span className='top-low-spc pe-2 align'>Sort by</span></label>
                            <Dropdown className='cus-dropdown position-relative d-inline-block'>
                                <i class="arrow down"></i>
                                <Dropdown.Toggle  id="dropdown-basic">
                                    <span>Random</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='d-inline-block'>
                            <a href="javascript:void(0);" title="" className='view-blk me-2 view-active'>
                                <img className="grey-image" src="../../assets/images/grid-grey.png" width={26} height={19} alt=""></img>
                                <img className="white-image" src="../../assets/images/grid-white.png" width={26} height={19} alt=""></img>
                            </a>
                            <a href="javascript:void(0);" title="" className='view-blk'>
                                <img className="grey-image" src="../../assets/images/list-grey.png" width={26} height={19} alt=""></img>
                                <img className="white-image" src="../../assets/images/list-white.png" width={26} height={19} alt=""></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      <div className='container'>
      <div className='outer-table mb-4 mb-lg-5'>
        <table className='data-table'>
          <thead>
          <tr className='table-header'>
            <th>Name</th>
            <th>Stake</th>
            <th>Checkpoints Signed</th>
            <th>Commission</th> 
            <th></th> 
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <span className='tb-data align'><i className='user-icon'></i>Anonymous 18</span>
              {/* <span className='tb-data-sm'>Matic</span> */}
            </td>
            <td>
              <span className='tb-data align'>13,861</span>
              <span className='tb-data-sm align'>SHIBA</span>
            </td>
            <td>
              <span className='tb-data warning-color align'>100%</span>
            </td>
            <td>
              <span className='tb-data success-color align'>10%</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" onClick={() => setModalShow(true)} title='' className='btn-small uppercase-txt warning-btn'><span>Delegate</span></a>
            </td>
          </tr>
          <tr>
            <td>
              <span className='tb-data align'><i className='user-icon'></i>Anonymous 20</span>
              {/* <span className='tb-data-sm'>Matic</span> */}
            </td>
            <td>
              <span className='tb-data align'>13,861</span>
              <span className='tb-data-sm align'>SHIBA</span>
            </td>
            <td>
              <span className='tb-data warning-color align'>0%</span>
            </td>
            <td>
              <span className='tb-data success-color align'>10%</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" onClick={() => setModalShow(true)} title='' className='btn-small uppercase-txt warning-btn'><span>Delegate</span></a>
            </td>
          </tr>
          <tr>
            <td>
              <span className='tb-data align'><i className='user-icon'></i>Shiba-Testnet-1</span>
              {/* <span className='tb-data-sm'>Matic</span> */}
            </td>
            <td>
              <span className='tb-data align'>13,861</span>
              <span className='tb-data-sm align'>SHIBA</span>
            </td>
            <td>
              <span className='tb-data warning-color align'>100%</span>
            </td>
            <td>
              <span className='tb-data success-color align'>10%</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" onClick={() => setModalShow(true)} title='' className='btn-small uppercase-txt warning-btn'><span>Delegate</span></a>
            </td>
          </tr>
          <tr>
            <td>
              <span className='tb-data align'><i className='user-icon'></i>Anonymous 20</span>
              {/* <span className='tb-data-sm'>Matic</span> */}
            </td>
            <td>
              <span className='tb-data align'>13,861</span>
              <span className='tb-data-sm align'>SHIBA</span>
            </td>
            <td>
              <span className='tb-data warning-color align'>0%</span>
            </td>
            <td>
              <span className='tb-data success-color align'>10%</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" onClick={() => setModalShow(true)} title='' className='btn-small uppercase-txt warning-btn'><span>Delegate</span></a>
            </td>
          </tr>
          <tr>
            <td>
              <span className='tb-data align'><i className='user-icon'></i>Poly Two</span>
              {/* <span className='tb-data-sm'>Matic</span> */}
            </td>
            <td>
              <span className='tb-data align'>13,861</span>
              <span className='tb-data-sm align'>SHIBA</span>
            </td>
            <td>
              <span className='tb-data warning-color align'>100%</span>
            </td>
            <td>
              <span className='tb-data success-color align'>10%</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" onClick={() => setModalShow(true)} title='' className='btn-small uppercase-txt warning-btn'><span>Delegate</span></a>
            </td>
          </tr>
          <tr>
            <td>
              <span className='tb-data align'><i className='user-icon'></i>Radar Staking</span>
              {/* <span className='tb-data-sm'>Matic</span> */}
            </td>
            <td>
              <span className='tb-data align'>13,861</span>
              <span className='tb-data-sm align'>SHIBA</span>
            </td>
            <td>
              <span className='tb-data warning-color align'>0%</span>
            </td>
            <td>
              <span className='tb-data success-color align'>10%</span>
            </td>
            <td>
              <span className='warning-color lnht fw-600'>Offline since<br/> <em className='tbsm-txt '>289633 checkpoints</em></span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='tb-data align'><i className='user-icon'></i>Radar Staking</span>
              {/* <span className='tb-data-sm'>Matic</span> */}
            </td>
            <td>
              <span className='tb-data align'>13,861</span>
              <span className='tb-data-sm align'>SHIBA</span>
            </td>
            <td>
              <span className='tb-data warning-color align'>0%</span>
            </td>
            <td>
              <span className='tb-data success-color align'>10%</span>
            </td>
            <td>
              <span className='warning-color lnht fw-600'>Offline since<br/> <em className='tbsm-txt '>289633 checkpoints</em></span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='tb-data align'><i className='user-icon'></i>Poly Two</span>
              {/* <span className='tb-data-sm'>Matic</span> */}
            </td>
            <td>
              <span className='tb-data align'>13,861</span>
              <span className='tb-data-sm align'>SHIBA</span>
            </td>
            <td>
              <span className='tb-data warning-color align'>100%</span>
            </td>
            <td>
              <span className='tb-data success-color align'>10%</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" onClick={() => setModalShow(true)} title='' className='btn-small uppercase-txt warning-btn'><span>Delegate</span></a>
            </td>
          </tr>
          <tr>
            <td>
              <span className='tb-data align'><i className='user-icon'></i>Radar Staking</span>
              {/* <span className='tb-data-sm'>Matic</span> */}
            </td>
            <td>
              <span className='tb-data align'>13,861</span>
              <span className='tb-data-sm align'>SHIBA</span>
            </td>
            <td>
              <span className='tb-data warning-color align'>0%</span>
            </td>
            <td>
              <span className='tb-data success-color align'>10%</span>
            </td>
            <td>
              <span className='warning-color lnht fw-600'>Offline since<br/> <em className='tbsm-txt '>289633 checkpoints</em></span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='tb-data align'><i className='user-icon'></i>Radar Staking</span>
              {/* <span className='tb-data-sm'>Matic</span> */}
            </td>
            <td>
              <span className='tb-data align'>13,861</span>
              <span className='tb-data-sm align'>SHIBA</span>
            </td>
            <td>
              <span className='tb-data warning-color align'>0%</span>
            </td>
            <td>
              <span className='tb-data success-color align'>10%</span>
            </td>
            <td>
              <span className='warning-color lnht fw-600'>Offline since<br/> <em className='tbsm-txt '>289633 checkpoints</em></span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='tb-data align'><i className='user-icon'></i>Poly Two</span>
              {/* <span className='tb-data-sm'>Matic</span> */}
            </td>
            <td>
              <span className='tb-data align'>13,861</span>
              <span className='tb-data-sm align'>SHIBA</span>
            </td>
            <td>
              <span className='tb-data warning-color align'>100%</span>
            </td>
            <td>
              <span className='tb-data success-color align'>10%</span>
            </td>
            <td className='user-action'>
              <a href="javascript:void(0)" onClick={() => setModalShow(true)} title='' className='btn-small uppercase-txt warning-btn'><span>Delegate</span></a>
            </td>
          </tr>
         </tbody>
        </table>
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

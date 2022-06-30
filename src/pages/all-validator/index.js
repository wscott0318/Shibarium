/* eslint-disable @next/next/no-img-element */
import React,{useState,useEffect} from "react";
import { Dropdown } from "react-bootstrap";
import InnerHeader from "../inner-header";
import DelegatePopup from "../delegate-popup";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { validatorsList } from "../../services/apis/validator";
import { filter } from "lodash";


export default function Allvalidator() {

  const [modalShow, setModalShow] = React.useState(false);
  const [activeValidators, setActiveValidators] = useState([])
  const [inactiveValidators, setInactiveValidators] = useState([])
  
  const [selectedRow, setSelectedRow] = useState({})
 

  useEffect(()=>{
    validatorsList().then(res=>{
      if(res.status==200){
       const activeList = filter(res.data.data.validatorsList,(e)=>e.status === 1)
       setActiveValidators(activeList)
       const inactiveList = filter(res.data.data.validatorsList,(e)=>e.status !== 1);
       setInactiveValidators(inactiveList)
      }
    }).catch(err=>{
      console.log('err', err)
    })
  },[])
  return (
    <>
      <div className="page-wrapper">
        <InnerHeader />
        <DelegatePopup show={modalShow} onHide={() => setModalShow(false)} data={selectedRow} />
        <main className="delegator-sec">
          <div className="botom-space-lg">
            <div className="black_clr_box position-relative sec-spc-high">
              <div className="char-block">
                <img
                  width="655"
                  height="262"
                  className="img-fluid"
                  src="../../assets/images/meaoth.png"
                  alt=""
                />
              </div>
              <div className="container">
                <div className="row">
                  <div className="text-center col-sm-8 text-sm-start">
                    <h1 className="mb-2 light-text mb-sm-3 fnt-58 fnt-100">
                      All Validators
                    </h1>
                    <div className="">
                      <Link href="./become-validator">
                        <a className="btn gradient_btn" title="">
                          <span>Become A Validator</span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="d-flex align-items-center btns-space">
              <div className="me-3">
                <a
                  href="javascript:void(0);"
                  className="btn black-btn btn-active"
                  title=""
                >
                  <span>ACTIVE</span>
                </a>
              </div>
              <div>
                <a
                  href="javascript:void(0);"
                  className="btn black-btn"
                  title=""
                >
                  <span>INACTIVE</span>
                </a>
              </div>
            </div>
            <div className="filter-sec">
              <div className="row align-items-center">
                <div className="mb-4 col-lg-5 col-12 mb-sm-4 mb-lg-0">
                  <div className="search-box d-inline-block position-relative w-100">
                    <input
                      className="cus-search w-100"
                      type="text"
                      placeholder="Search by validator name, Id, owner or signer address"
                    ></input>
                    <img
                      width="15"
                      height="15"
                      className="img-fluid"
                      src="../../assets/images/search.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-7 col-12 text-end mob-filter">
                  <div className="d-inline-block pe-0 pe-sm-4 mob-filter">
                    <label className="head-xsm fw-600" htmlFor="Auction">
                      <span className="top-low-spc pe-2 align">
                        Show Auction Only
                      </span>
                    </label>
                    <label className="switch align">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="d-inline-block pe-4 pe-sm-4">
                    <label className="head-xsm fw-600" htmlFor="Auction">
                      <span className="top-low-spc pe-2 align">Sort by</span>
                    </label>
                    <Dropdown className="cus-dropdown position-relative d-inline-block">
                      <i className="arrow down"></i>
                      <Dropdown.Toggle id="dropdown-basic">
                        <span>Random</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="d-inline-block">
                    <a
                      href="javascript:void(0);"
                      title=""
                      className="view-blk me-2 view-active"
                    >
                      <img
                        className="grey-image"
                        src="../../assets/images/grid-grey.png"
                        width={26}
                        height={19}
                        alt=""
                      ></img>
                      <img
                        className="white-image"
                        src="../../assets/images/grid-white.png"
                        width={26}
                        height={19}
                        alt=""
                      ></img>
                    </a>
                    <a href="javascript:void(0);" title="" className="view-blk">
                      <img
                        className="grey-image"
                        src="../../assets/images/list-grey.png"
                        width={26}
                        height={19}
                        alt=""
                      ></img>
                      <img
                        className="white-image"
                        src="../../assets/images/list-white.png"
                        width={26}
                        height={19}
                        alt=""
                      ></img>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="mb-3 fw-700">
                Here is a list of active Validators
              </h4>
            </div>
          </div>
          <div className="container">
            <div className="mb-4 outer-table mb-lg-5">
              <table className="data-table">
                <thead>
                  <tr className="table-header">
                    <th className="cell-width-lg">Name</th>
                    <th className="cell-width">Stake</th>
                    <th className="cell-width">Checkpoints Signed</th>
                    <th>Voting Power</th>
                    <th>Self</th>
                    <th>Commission</th>
                    <th>Uptime</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {activeValidators.map((elm,i)=>{
                  return(
                    <tr key={'q4n432+'+i}>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>{elm.name}
                      </span>
                      
                    </td>
                    <td>
                      <span className="tb-data align">{parseInt(elm.stakeAmount).toFixed(0)}</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">100%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">{elm.commissionRate}%</span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td className="user-action">
                      <a
                        href="javascript:void(0)"
                        onClick={() => {setModalShow(true);setSelectedRow(elm)}}
                        title=""
                        className="btn-small uppercase-txt warning-btn"
                      >
                        <span>Delegate</span>
                      </a>
                    </td>
                  </tr>
                  )
                })}
                  {/* <tr>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>Anonymous 18
                      </span>
                      
                    </td>
                    <td>
                      <span className="tb-data align">13,861</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">100%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">10%</span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td className="user-action">
                      <a
                        href="javascript:void(0)"
                        onClick={() => setModalShow(true)}
                        title=""
                        className="btn-small uppercase-txt warning-btn"
                      >
                        <span>Delegate</span>
                      </a>
                    </td>
                  </tr> */}
                  {/* <tr>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>Anonymous 20
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">13,861</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">0%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">10%</span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td className="user-action">
                      <a
                        href="javascript:void(0)"
                        onClick={() => setModalShow(true)}
                        title=""
                        className="btn-small uppercase-txt warning-btn"
                      >
                        <span>Delegate</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>Shiba-Testnet-1
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">13,861</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">100%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">10%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td className="user-action">
                      <a
                        href="javascript:void(0)"
                        onClick={() => setModalShow(true)}
                        title=""
                        className="btn-small uppercase-txt warning-btn"
                      >
                        <span>Delegate</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>Anonymous 20
                      </span>
                      
                    </td>
                    <td>
                      <span className="tb-data align">13,861</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">0%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">10%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td className="user-action">
                      <a
                        href="javascript:void(0)"
                        onClick={() => setModalShow(true)}
                        title=""
                        className="btn-small uppercase-txt warning-btn"
                      >
                        <span>Delegate</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>Poly Two
                      </span>
                      
                    </td>
                    <td>
                      <span className="tb-data align">13,861</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">100%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">10%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td className="user-action">
                      <a
                        href="javascript:void(0)"
                        onClick={() => setModalShow(true)}
                        title=""
                        className="btn-small uppercase-txt warning-btn"
                      >
                        <span>Delegate</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>Radar Staking
                      </span>
                      
                    </td>
                    <td>
                      <span className="tb-data align">13,861</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">0%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">10%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="warning-color lnht fw-600">
                        Offline since
                        <br /> <em className="tbsm-txt ">289633 checkpoints</em>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>Radar Staking
                      </span>
                      
                    </td>
                    <td>
                      <span className="tb-data align">13,861</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">0%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">10%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="warning-color lnht fw-600">
                        Offline since
                        <br /> <em className="tbsm-txt ">289633 checkpoints</em>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>Poly Two
                      </span>
                      
                    </td>
                    <td>
                      <span className="tb-data align">13,861</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">100%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">10%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td className="user-action">
                      <a
                        href="javascript:void(0)"
                        onClick={() => setModalShow(true)}
                        title=""
                        className="btn-small uppercase-txt warning-btn"
                      >
                        <span>Delegate</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>Radar Staking
                      </span>
                      
                    </td>
                    <td>
                      <span className="tb-data align">13,861</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">0%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">10%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="warning-color lnht fw-600">
                        Offline since
                        <br /> <em className="tbsm-txt ">289633 checkpoints</em>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>Radar Staking
                      </span>
                      
                    </td>
                    <td>
                      <span className="tb-data align">13,861</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">0%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">10%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="warning-color lnht fw-600">
                        Offline since
                        <br /> <em className="tbsm-txt ">289633 checkpoints</em>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tb-data align">
                        <i className="user-icon"></i>Poly Two
                      </span>
                      
                    </td>
                    <td>
                      <span className="tb-data align">13,861</span>
                      <span className="tb-data-sm align">SHIBA</span>
                    </td>
                    <td>
                      <span className="tb-data warning-color align">100%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td>
                      <span className="tb-data align">11.02%</span>
                    </td>
                    <td>
                      <span className="tb-data success-color align">10%</span>
                    </td>
                    <td>
                      <span className="tb-data align">
                        2,269,410,000 (4.32%)
                      </span>
                    </td>
                    <td className="user-action">
                      <a
                        href="javascript:void(0)"
                        onClick={() => setModalShow(true)}
                        title=""
                        className="btn-small uppercase-txt warning-btn"
                      >
                        <span>Delegate</span>
                      </a>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
          <footer className="main-footer">
            <div className="container">
              <div className="mt-4 copyright mt-lg-5">
                <h3 className="mb-0 text-center fwb">Powered by xFund.</h3>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

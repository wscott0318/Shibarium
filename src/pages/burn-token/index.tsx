import Link from "next/link";
import React from "react";

export default function BurnCrypto() {

  return (
    <>
      <main className="main-content">
        <div className="sidebar-toggle">
          <span className="menu-btn navbar-brand">
            <img className="img-fluid" src="../../assets/images/menu.png" alt="" />
          </span>
          <div className="sidebar-logo">
            <a className="sidelogo-link" href="/home">
              <img className="img-fluid" src="../../assets/images/logo.png" alt="" />
            </a>
          </div>
        </div>
        <div className="sidebar">
          <div className="sidbar-top-menu">
            <div className="sidebar-logo">
              <span className="close-icon" >
                <img className="img-fluid" src="../../assets/images/close-icon.png" alt="close-icon" />
              </span>
              <a className="sidelogo-link" href="/home">
                <img className="img-fluid" src="../../assets/images/logo.png" alt="" />
              </a>
            </div>
            <ul className="side-menu">
              <li className="side-menu-item">
                <button className="side-link btn w-100">
                  <span>
                    <span className="side-ico">
                      <img className="img-fluid" src="../../assets/images/sidebar/transaction.png" alt="side-icon" />
                    </span>
                    <span>Staking</span>
                  </span>
                </button>
              </li>
              <li className="side-menu-item">
                <button className="side-link btn primary-btn w-100">
                  <span>
                    <span className="side-ico">
                      <img className="img-fluid" src="../../assets/images/sidebar/wallet.png" alt="side-icon" />
                    </span>
                    <span>Wallet</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="sidebar-bottom-menu">
            <ul className="side-menu">
              <li className="side-menu-item">
                <button className="side-link btn w-100">
                  <span>
                    <span className="side-ico">
                      <img className="img-fluid" src="../../assets/images/sidebar/faq.png" alt="side-icon" />
                    </span>
                    <span>FAQs</span>
                  </span>
                </button>
              </li>
              <li className="side-menu-item">
                <button className="side-link btn w-100">
                  <span>
                    <span className="side-ico">
                      <img className="img-fluid" src="../../assets/images/sidebar/tools.png" alt="side-icon" />
                    </span>
                    <span>Faucet</span>
                  </span>
                </button>
              </li>
              <li className="side-menu-item">
                <button className="side-link btn w-100">
                  <span>
                    <span className="side-ico">
                      <img className="img-fluid" src="../../assets/images/sidebar/wallet.png" alt="side-icon" />
                    </span>
                    <span>Support</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="cmn_dashbord_main_outr">
          <header className="inner-header">
            <nav className="py-0 navbar navbar-expand navbar-dark">
              <div className="container">
                <div className="left-widget"></div>
                <button aria-controls="basic-navbar-nav" type="button" aria-label="Toggle navigation" className="navbar-toggler collapsed">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="basic-navbar-nav">
                  <div className="ms-auto align-items-center navbar-nav">
                    <div className="shib-dropdown d-flex justify-content-center align-items-center">
                      <div className="nav-item d-flex align-items-center cus-dd app-drop dropdown">
                        <div className="dot-icon" id="basic-nav-dropdown">
                          <img src="../../assets/images/menu-icon.png" alt="" />
                        </div>
                        <div className="light-text dd-ico nav-item dropdown">
                          <a id="" aria-expanded="false" role="button" className="dropdown-toggle nav-link" href="#">Staking</a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center cus_dropdown nav-item">
                      <button>
                        <a className="d-md-none swap-btn">
                          <img className="img-fluid" src="../../assets/images/switch-icon.png" alt="" width="30" />
                        </a>
                      </button>
                      <div>
                        <div className="form-select hd-sel hd-sel-over nav-item dropdown">
                          <a id="" aria-expanded="false" role="button" className="dropdown-toggle nav-link" href="#">Goerli Testnet</a>
                        </div>
                      </div>
                    </div>
                    <div className="btn-status nav-item">
                      <div id="web3-status-connected" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-dark-1000 text-primary">
                        <div className="flex items-center gap-2">
                          <div className="btn-fonts">0x993E...1D93</div>
                          <span>
                            <span>
                              <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20
																									xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2722%27%20height=%2722%27/%3e"  />
                            </span>
                            <img alt="shiba" src="https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,c_limit,w_48,q_auto/https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,c_limit,w_48,q_auto/https://www.shibatoken.com/images/shib-logo.svg" decoding="async" data-nimg="intrinsic" />
                          </span>
                        </div>
                      </div>
                      <div className="nav-item d-flex align-items-center cus-dd mob-drop drop-cus dropdown">
                        <div className="dot-icon" id="basic-nav-dropdown"></div>
                        <div className="me-3 inner-header-dropwdown nav-item dropdown">
                          <a id="account-dropdown" aria-expanded="false" role="button" className="dropdown-toggle nav-link" href="#"></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>

          {/* burn content start */}
          <div className="burn-wrap">
            <div className="mb-3 mb-sm-4 mb-xxxl-5">
              <h3>Burn Bone Token</h3>
              <p className="lite-color">Trigger and watch BONE tokens get burned with EIP-1559</p>
            </div>

            {/* burn step 1 start */}
            <div className="card-list cus-card border-radius-8 p-0">
              <div className="cus-card-head">
                <div className="burn-top">
                  <div className="burn-step grey-btn btn-sm me-2 me-sm-3">Step 1</div>
                  <div className="burn-flex">
                    <div className="item-grp bs-fs lite-color">Initiate burn on</div>
                    <div className="item-grp burn-img">
                      <img className="img-fluid" src="../../assets/images/Shib-Logo.png" alt="chain-logo" width={20} />
                    </div>
                    <div className="item-grp bs-fs lite-color">Shibarium</div>
                  </div>
                </div>
              </div>
              <div className="cus-card-body lightbg">
                <div className="burn-warn d-flex align-items-center">
                  <div className="brn-warn-icon me-2 me-sm-3">
                    <img className="img-fluid" src="../../assets/images/alert.png" alt="alert-icon" width={20}/>
                  </div>
                    <p className="mb-0 fs-14 fw-600 lite-color">
                      You will be able to Initiate burn once the amount of BONE ready to be 
                      burned is greater than 25000 BONE.
                    </p>
                </div>
              </div>
              <div className="cus-card-body oh fire-body">
                <div className="fire-flaot">
                  <img className="img-fluid" src="../../assets/images/dark-fire.png" alt="" />
                </div>
                <div className="row align-items-center position-relative">
                  <div className="col-sm-6 col-xl-9 col-xxl-10 box-item mb-4 mb-sm-0">
                    <p className="fs-14 fw-600 lite-color mb-0">Amount of BONE waiting to be burned</p>
                    <h2 className="bone-amnt fw-600"><span>42941.05 <span className="lite-color">4080</span> BONE</span></h2>
                  </div>
                  <div className="col-sm-6 col-xl-3 col-xxl-2 box-item text-sm-end">
                    <button type="button" className="btn black-btn btn-disabled">Initiate Burn</button>
                  </div>
                </div>
              </div>
            </div>
            {/* brun step 1 end */}

            {/* burn step 2 start */}
            <div className="card-list cus-card border-radius-8 p-0">
              <div className="cus-card-head">
                <div className="row align-items-center">
                  <div className="col-md-6 mb-2 mb-md-0">
                    <div className="burn-top">
                      <div className="burn-step grey-btn btn-sm me-2 me-sm-3">Step 2</div>
                      <div className="burn-flex">
                        <div className="item-grp bs-fs lite-color">
                          Continue and complete burn on
                        </div>
                        <div className="item-grp burn-img">
                          <img className="img-fluid" src="../../assets/images/Shib-Logo.png" alt="chain-logo" width={20} />
                        </div>
                        <div className="item-grp bs-fs lite-color">Ethereum</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <span className="fs-14 fw-600">0 transaction left</span>
                  </div>
                </div>
              </div>
              <div className="cus-card-body p-0">
                <div className="table-responsive burn-table">
                  <table className="table table-borderless fxd-layout tbl-mob mb-0">
                    <thead>
                      <tr>
                        <th>Burn</th>
                        <th>#Block</th>
                        <th>Trasaction Hash</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr >
                        <td>
                          <span className="fw-600 fs-16">
                            24.5 BONE
                          </span>
                        </td>
                        <td>
                          38737376
                        </td>
                        <td>
                          <div className="trans-td">
                            <div className="trans-icon">
                              <img className="img-fluid" src="../../assets/images/eth.png" alt="chain-logo" width="10"/>
                            </div>
                            <div className="trans-item">0x74...e28a</div>
                          </div>
                        </td>
                        <td className="text-center">
                          <button type="button" className="btn black-btn btn-disabled">Waiting for exit</button>
                        </td>
                      </tr>
                      <tr >
                        <td>
                          <span className="fw-600 fs-16">
                            24.5 BONE
                          </span>
                        </td>
                        <td>
                          38737376
                        </td>
                        <td>
                          <div className="trans-td">
                            <div className="trans-icon">
                              <img className="img-fluid" src="../../assets/images/eth.png" alt="chain-logo" width="10"/>
                            </div>
                            <div className="trans-item">0x74...e28a</div>
                          </div>
                        </td>
                        <td className="text-center">
                          <button type="button" className="btn primary-btn">Confirm Burn</button>
                        </td>
                      </tr>
                      {/* Empty table start  */}
                      <tr>
                        <td colSpan={4} className="d-none">
                          <div className="text-center">
                            No ongoing transactions
                          </div>
                        </td>
                      </tr>
                      {/* Empty table end */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* burn step 2 end */}

            {/* burn step 3 start */}

            <div className="card-list cus-card border-radius-8 p-0">
              <div className="cus-card-head">
                <div className="burn-top">
                  <div className="burn-step grey-btn btn-sm me-2 me-sm-3">Step 3</div>
                  <div className="burn-flex">
                    <div className="item-grp bs-fs lite-color">Complete burn on</div>
                    <div className="item-grp burn-img">
                      <img className="img-fluid" src="../../assets/images/Shib-Logo.png" alt="chain-logo" width={20} />
                    </div>
                    <div className="item-grp bs-fs lite-color">Shibarium</div>
                  </div>
                </div>
              </div>
              <div className="cus-card-body oh fire-body">
                <div className="fire-flaot">
                  <img className="img-fluid" src="../../assets/images/dark-fire.png" alt="" />
                </div>
                <div className="row align-items-center position-relative">
                  <div className="col-sm-6 col-xl-9 col-xxl-10 box-item mb-4 mb-sm-0">
                    <p className="fs-14 fw-600 lite-color mb-0">Amount of BONE waiting to be burned</p>
                    <h2 className="bone-amnt fw-600"><span>0.00 <span className="lite-color">0000</span> BONE</span></h2>
                  </div>
                  <div className="col-sm-6 col-xl-3 col-xxl-2 box-item text-sm-end">
                    <button type="button" className="btn black-btn btn-disabled">Complete Burn</button>
                  </div>
                </div>
              </div>
            </div>

            {/* burn step 3 end */}

            {/* burn step 4 start */}

            <div className="card-list cus-card border-radius-8 p-0">
              <div className="cus-card-head">
                <div className="row align-items-center">
                  <div className="col-md-6 mb-2 mb-md-0">
                    <div className="burn-top">
                      <div className="item-grp bs-fs lite-color">Completed Burns</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cus-card-body p-0">
                <div className="table-responsive burn-table">
                  <table className="table table-borderless fxd-layout tbl-mob mb-0">
                    <thead>
                      <tr>
                        <th>Burned</th>
                        <th>Trasaction Hash</th>
                        <th colSpan={2}>Date & Time (UTC)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          27194.34 BONE
                        </td>
                        <td>
                          <div className="trans-td">
                            <div className="trans-icon">
                              <img className="img-fluid" src="../../assets/images/eth.png" alt="chain-logo" width={10} />
                            </div>
                            <div className="trans-item">
                              0x74...e28a
                            </div>
                          </div>
                        </td>
                        <td>
                          3 Feb 2023, 3:31pm
                        </td>
                        <td>
                          <div className="btn-wrap text-end">
                            <button type="button" className="btn primary-btn-outline d-flex align-items-center ms-auto">
                              <img className="img-fluid me-2" src="../../assets/images/check.png" alt="" width={16} />
                              Burn Completed
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          27194.34 BONE
                        </td>
                        <td>
                          <div className="trans-td">
                            <div className="trans-icon">
                              <img className="img-fluid" src="../../assets/images/eth.png" alt="chain-logo" width={10} />
                            </div>
                            <div className="trans-item">
                              0x74...e28a
                            </div>
                          </div>
                        </td>
                        <td>
                          3 Feb 2023, 3:31pm
                        </td>
                        <td>
                          <div className="btn-wrap text-end">
                            <button type="button" className="btn primary-btn-outline d-flex align-items-center ms-auto">
                              <img className="img-fluid me-2" src="../../assets/images/check.png" alt="" width={16} />
                              Burn Completed
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          27194.34 BONE
                        </td>
                        <td>
                          <div className="trans-td">
                            <div className="trans-icon">
                              <img className="img-fluid" src="../../assets/images/eth.png" alt="chain-logo" width={10} />
                            </div>
                            <div className="trans-item">
                              0x74...e28a
                            </div>
                          </div>
                        </td>
                        <td>
                          3 Feb 2023, 3:31pm
                        </td>
                        <td>
                          <div className="btn-wrap text-end">
                            <button type="button" className="btn primary-btn-outline d-flex align-items-center ms-auto">
                              <img className="img-fluid me-2" src="../../assets/images/check.png" alt="" width={16} />
                              Burn Completed
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          27194.34 BONE
                        </td>
                        <td>
                          <div className="trans-td">
                            <div className="trans-icon">
                              <img className="img-fluid" src="../../assets/images/eth.png" alt="chain-logo" width={10} />
                            </div>
                            <div className="trans-item">
                              0x74...e28a
                            </div>
                          </div>
                        </td>
                        <td>
                          3 Feb 2023, 3:31pm
                        </td>
                        <td>
                          <div className="btn-wrap text-end">
                            <button type="button" className="btn primary-btn-outline d-flex align-items-center ms-auto">
                              <img className="img-fluid me-2" src="../../assets/images/check.png" alt="" width={16} />
                              Burn Completed
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          27194.34 BONE
                        </td>
                        <td>
                          <div className="trans-td">
                            <div className="trans-icon">
                              <img className="img-fluid" src="../../assets/images/eth.png" alt="chain-logo" width={10} />
                            </div>
                            <div className="trans-item">
                              0x74...e28a
                            </div>
                          </div>
                        </td>
                        <td>
                          3 Feb 2023, 3:31pm
                        </td>
                        <td>
                          <div className="btn-wrap text-end">
                            <button type="button" className="btn primary-btn-outline d-flex align-items-center ms-auto">
                              <img className="img-fluid me-2" src="../../assets/images/check.png" alt="" width={16} />
                              Burn Completed
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          27194.34 BONE
                        </td>
                        <td>
                          <div className="trans-td">
                            <div className="trans-icon">
                              <img className="img-fluid" src="../../assets/images/eth.png" alt="chain-logo" width={10} />
                            </div>
                            <div className="trans-item">
                              0x74...e28a
                            </div>
                          </div>
                        </td>
                        <td>
                          3 Feb 2023, 3:31pm
                        </td>
                        <td>
                          <div className="btn-wrap text-end">
                            <button type="button" className="btn primary-btn-outline d-flex align-items-center ms-auto">
                              <img className="img-fluid me-2" src="../../assets/images/check.png" alt="" width={16} />
                              Burn Completed
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row align-items-center px-3 px-lg-4">
                  <div className="col-sm-6 my-3 px-0">
                    <div className="cus-pagination">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>
                          <li className="page-item active"><a className="page-link" href="#">1</a></li>
                          <li className="page-item"><a className="page-link" href="#">2</a></li>
                          <li className="page-item"><a className="page-link" href="#">3</a></li>
                          <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-sm-6 text-sm-end">
                    <p className="mb-0">
                      Showing <span>16-20</span> of <span>123</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* burn step 4 end */}

            
          </div>
          {/* burn content end */}
        </div>
      </main>
    </>
  );

}



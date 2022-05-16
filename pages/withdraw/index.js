import React from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
export default function Withdraw() {
  return (
    <>
      <Header />
      <div className="page-wrapper">
      <Sidebar />
      <main className='main-content'>
      <div className='mb-sm-5 mb-4'>
        <div className='blue-bg low-radius sec-spc-low position-relative'>
            <div className='image-section'><img width="189" height="147" className='img-fluid' src="../../assets/images/shadow-img.png" alt="" /></div>
            <div className=''>
                <h3 className='fw-700 light-text mb-2 mb-sm-3'>Fast Withdraw and Deposit</h3>
                <p className='light-text'>The below mentioned are third party bridging services that aids cross-chain transfers. Kindly note, any disputes or clarifications should be communicated to the respective services as they are independent and their usage is subject to preference.</p>
            </div>
        </div>
       </div>
       <div className='grid-sec'>
            <div className='row side-cover'>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                    <div className='box'>
                        <div className='box-head'>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/coin-round.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>All Bridge</span>
                                </div>
                            </div>
                        </div>
                        <div className='box-body'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='fw-800 ft-16'>Coins</div>
                                <div>
                                    <a className='warning-color fw-600 ft-14' href="javascript:void(0);">visit now</a>
                                </div>
                            </div>
                            <ul className='list-sec'>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-1.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/swap-coin.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-2.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-3.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-5.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-4.jpg" width={25} height={24} alt=""></img></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/bridge.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>cBridge</span>
                                </div>
                            </div>
                        </div>
                        <div className='box-body'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='fw-800 ft-16'>Coins</div>
                                <div>
                                    <a className='warning-color fw-600 ft-14' href="javascript:void(0);">visit now</a>
                                </div>
                            </div>
                            <ul className='list-sec'>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-1.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/swap-coin.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-2.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-3.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-5.jpg" width={25} height={24} alt=""></img></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/evo-defi.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>EVOdefi</span>
                                </div>
                            </div>
                        </div>
                        <div className='box-body'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='fw-800 ft-16'>Coins</div>
                                <div>
                                    <a className='warning-color fw-600 ft-14' href="javascript:void(0);">visit now</a>
                                </div>
                            </div>
                            <ul className='list-sec'>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/swap-coin.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-2.jpg" width={25} height={24} alt=""></img></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/hop.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Hop Bridge</span>
                                </div>
                            </div>
                        </div>
                        <div className='box-body'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='fw-800 ft-16'>Coins</div>
                                <div>
                                    <a className='warning-color fw-600 ft-14' href="javascript:void(0);">visit now</a>
                                </div>
                            </div>
                            <ul className='list-sec'>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-2.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/swap-coin.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-3.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin.png" width={25} height={24} alt=""></img></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/hop.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Hop Bridge</span>
                                </div>
                            </div>
                        </div>
                        <div className='box-body'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='fw-800 ft-16'>Coins</div>
                                <div>
                                    <a className='warning-color fw-600 ft-14' href="javascript:void(0);">visit now</a>
                                </div>
                            </div>
                            <ul className='list-sec'>
                               <li><a href="javascript:void(0);" title=""><img src="../../assets/images/swap-coin.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-2.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-1.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin.png" width={25} height={24} alt=""></img></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/evo-defi.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>EVOdefi</span>
                                </div>
                            </div>
                        </div>
                        <div className='box-body'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='fw-800 ft-16'>Coins</div>
                                <div>
                                    <a className='warning-color fw-600 ft-14' href="javascript:void(0);">visit now</a>
                                </div>
                            </div>
                            <ul className='list-sec'>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/swap-coin.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-2.jpg" width={25} height={24} alt=""></img></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/bridge.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>cBridge</span>
                                </div>
                            </div>
                        </div>
                        <div className='box-body'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='fw-800 ft-16'>Coins</div>
                                <div>
                                    <a className='warning-color fw-600 ft-14' href="javascript:void(0);">visit now</a>
                                </div>
                            </div>
                            <ul className='list-sec'>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-1.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/swap-coin.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-2.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-3.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-5.jpg" width={25} height={24} alt=""></img></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/coin-round.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>All Bridge</span>
                                </div>
                            </div>
                        </div>
                        <div className='box-body'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='fw-800 ft-16'>Coins</div>
                                <div>
                                    <a className='warning-color fw-600 ft-14' href="javascript:void(0);">visit now</a>
                                </div>
                            </div>
                            <ul className='list-sec'>
                            <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-1.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/swap-coin.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-2.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-3.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-5.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-4.jpg" width={25} height={24} alt=""></img></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/coin-round.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>All Bridge</span>
                                </div>
                            </div>
                        </div>
                        <div className='box-body'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='fw-800 ft-16'>Coins</div>
                                <div>
                                    <a className='warning-color fw-600 ft-14' href="javascript:void(0);">visit now</a>
                                </div>
                            </div>
                            <ul className='list-sec'>
                            <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-1.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/swap-coin.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-2.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-3.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-5.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-4.jpg" width={25} height={24} alt=""></img></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/bridge.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>cBridge</span>
                                </div>
                            </div>
                        </div>
                        <div className='box-body'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='fw-800 ft-16'>Coins</div>
                                <div>
                                    <a className='warning-color fw-600 ft-14' href="javascript:void(0);">visit now</a>
                                </div>
                            </div>
                            <ul className='list-sec'>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-1.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/swap-coin.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-2.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-3.jpg" width={25} height={24} alt=""></img></a></li>
                                <li><a href="javascript:void(0);" title=""><img src="../../assets/images/coin-5.jpg" width={25} height={24} alt=""></img></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            
       </div>
   
      </main>
    </div>
    </>
  )
}

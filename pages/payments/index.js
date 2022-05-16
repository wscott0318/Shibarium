import React from 'react'
import Header from '../layout/header'
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Sidebar from '../layout/sidebar';
import ImportantPopup from '../important-popup'
import SendPopup from '../send-popup'
export default function login() {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalSend, setModalSend] = React.useState(false);
  return (
    <>
    <ImportantPopup  show={modalShow}
        onHide={() => setModalShow(false)}/>
        <SendPopup  show={modalSend}
        onHide={() => setModalSend(false)}/>
       <Header />
      <div className="page-wrapper">
      <Sidebar />
      <main className='main-content'>
      
      <div className='mb-sm-5 mb-4'>
        <div className='blue-bg low-radius sec-spc-low position-relative'>
            <div className='image-section'><img width="189" height="147" className='img-fluid' src="../../assets/images/shadow-img.png" alt="" /></div>
            <div className=''>
                <h3 className='fw-700 light-text mb-2 mb-sm-3'>On Ramp Payments</h3>
                <p className='light-text'>The below mentioned are third party onramp services. Kindly note, any disputes or certifications should be communicated to the respective services as they are independent and their usage is subject to preference.</p>
            </div>
        </div>
       </div>
       <div className='grid-sec'>
            <div className='row side-cover'>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                    <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" onClick={() => setModalShow(true)} title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/wyre.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Wyre</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                             <a  href="javascript:void(0);" onClick={() => setModalSend(true)} title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/onpay.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Moonpay</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/simplex.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Simplex</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/banxa.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Banxa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/dharma.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Dharma</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/transak.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Transak</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/mew.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>MEW</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/pillar.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Pillar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                    <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" onClick={() => setModalShow(true)} title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/wyre.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Wyre</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                             <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/onpay.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Moonpay</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/simplex.png" width={36} height={36} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Simplex</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/banxa.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Banxa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/dharma.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Dharma</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/transak.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Transak</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/mew.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>MEW</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 side-space'>
                <div className='box'>
                        <div className='box-head'>
                            <a  href="javascript:void(0);" title="" className='circle-blk'><img src="../../assets/images/white-arrow.png" width={12} height={9} alt="white-arrow"></img></a>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='round-blk'>
                                    <img src="../../assets/images/pillar.png" width={30} height={30} alt=""></img>
                                </div>
                                <div className='fw-700'>
                                    <span className='vertical-align'>Pillar</span>
                                </div>
                            </div>
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

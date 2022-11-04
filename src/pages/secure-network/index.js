/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import CommonModal from "../components/CommonModel";
import StakingHeader from '../staking-header';
import Header from "../layout/header";
export default function secureNetwork() {
    
    return (
        <>
            <main className="main-content dark-bg-800 full-vh  cmn-input-bg">
            <Header />
                <div className="py-xxl-5 py-sm-4 py-4 ffms-inherit">
                    <section className="container mb-xxl-5 mb-xl-4 mb-sm-3 mb-3">
                        <div className="d-inline-block me-2">
                            <img className="img-fluid" src="../../images/dummy-banner-4.png" alt="check-icon"/>
                        </div>
                        <br/>
                        <br/>
                        <h2 className="heading pb-3 ff-mos text-center ">Developer Resources</h2>
                        <p className="mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 text-center ff-mos">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>                         
                    </section>

                    
                    <section className='features-section bottom-pad top-pad'>
                        <div className="container">
                        <div className='text-center pt-3 pt-sm-0'>
                            <h2 className='heading ff-mos d-none d-sm-block'>Lorem Ipsum</h2>
                        </div>
                        <div className="row cus-row justify-content-center">
                            <div className="col-lg-4 col-md-6 col-sm-8 cus-col">
                            <div className="ftrs-card">
                                <div className='ftrs-head'>
                                <h3 className='fw-600 ff-mos'>Lorem</h3>
                                <div className="ftrs-icon">
                                    <img className='img-fluid' src="../../images/swap.png" alt="" />
                                </div>
                                </div>
                                <p className='frts-desc ff-mos'>
                                Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos
                                asperiores illum.
                                </p>
                                <Link href="/swap-token" passHref>
                                <a className='link'><span>Learn More</span>
                                    <img className='img-fluid' src="../../images/link-arrow.png" alt="arrow-icon" />
                                </a>
                                </Link>
                            </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-8 cus-col">
                            <div className="ftrs-card ftrs-active">
                                <div className='ftrs-head'>
                                <h3 className='fw-600 ff-mos'>Impsum</h3>
                                <div className="ftrs-icon">
                                    <img className='img-fluid' src="../../images/bridge.png" alt="" />
                                </div>
                                </div>
                                <p className='frts-desc ff-mos'>
                                Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos
                                asperiores illum.
                                </p>
                                <Link href="/withdraw" passHref>
                                <a className='link ff-mos'><span>Learn More</span>
                                    <img className='img-fluid' src="../../images/link-arrow.png" alt="arrow-icon" />
                                </a>
                                </Link>

                            </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-8 cus-col">
                            <div className="ftrs-card">
                                <div className='ftrs-head'>
                                <h3 className='fw-600 ff-mos'>Dummy</h3>
                                <div className="ftrs-icon">
                                    <img className='img-fluid' src="../../images/burn.png" alt="" />
                                </div>
                                </div>
                                <p className='frts-desc ff-mos'>
                                Lorem ipsum sdolor sit amet. Ut asperiores tenetur et natus laudantium eos
                                asperiores illum.
                                </p>
                                <a href="javascript:void(0)" className='link'><span>Learn More</span>
                                <img className='img-fluid' src="../../images/link-arrow.png" alt="arrow-icon" />
                                </a>
                            </div>
                            </div>
                        </div>
                        </div>
                    </section>

                    <section className="container mb-xxl-5 mb-xl-4 mb-sm-3 mb-3">
                        <h3 className="mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 ff-mos">Where does it come from?</h3>
                        <p className="ff-mos">It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
                        looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
                        <br/>
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <h3 className="mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 ff-mos">Where does it come from?</h3>
                                <p className="ff-mos">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
                        looked up one of the more obscure Latin words, consectetur </p>
                                <ul className="text-list mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 ff-mos">
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                    <li>Sed venenatis urna et orci porttitor, ut semper risus gravida.</li>
                                    <li>Vestibulum nec libero id mi commodo viverra.</li>
                                    <li>Ut nec erat sed justo euismod scelerisque blandit vitae ipsum.</li>
                                    <li>Etiam luctus purus eget dui vulputate tempor.</li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="image-section  static_img">
                                    <div><img className="img-fluid" src="../../images/500x500-4.png" alt="check-icon"/></div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <p className="ff-mos">It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
                        looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
                    </section>
                    


                    <section className='about-section bottom-pad'>
                        <div className="container">
                            <div className="primary-card rad-25 p-25">
                                <div className="row abt-row align-items-center justify-content-center">
                                    <div className="col-lg-6 col-md-7 col-sm-8 order-2 order-md-1 abt-col">
                                        <div className="abt-item">
                                            <h3 className='abt-title mb-3 ff-mos'>There are many variations of passages of Lorem Ipsum</h3>
                                            <p className='abt-desc ff-mos'>
                                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                            </p>
                                            <ul className='abt-list mb-3'>
                                                <li className='abt-lst-item ff-mos'>
                                                    <div className="check-icon">
                                                        <img className="img-fluid" src="../../images/tick.png" alt="tick-icon"/>
                                                    </div>
                                                    The readable content of a page when looking at its layout.
                                                </li>
                                                <li className='abt-lst-item ff-mos'>
                                                    <div className="check-icon">
                                                        <img className="img-fluid" src="../../images/tick.png" alt="tick-icon"/>
                                                    </div>
                                                    Loreum ipsum dummy text of pritinging
                                                </li> 
                                            </ul> 
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-5 col-sm-8 abt-col order-1 order-md-2 text-center mb-4 mb-md-0">
                                        <div className='shib-img'>
                                            <img className='img-fluid mx-auto' src="../../images/steps.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                       {/* shib community section start */}

                        <section className='shib-comun-section bottom-pad grid-pad'>
                            <div className="container">
                            <div className="text-center">
                                <h2 className='heading pb-3 ff-mos'>Lorem ipsum dummy text</h2>
                            </div>
                            <div className="row cus-row">
                                <div className="col-sm-6 col-lg-4 col-xl-3 cus-col">
                                <div className="shib-item text-center">
                                    <div className="shib-img mb-3">
                                    <img className='img-fluid mx-auto' src="../../images/rect-96.png" alt="rect-img" width={96} />
                                    </div>
                                    <h4 className='shib-title mb-2 ff-mos'>
                                    <Link href="javascript:void(0)" passHref>
                                        <a>
                                        Lorem Ipsum
                                        </a>
                                    </Link>
                                    </h4>
                                    <p className="ff-mos">
                                    Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                                    </p>
                                </div>
                                </div>
                                <div className="col-sm-6 col-lg-4 col-xl-3 cus-col">
                                <div className="shib-item text-center">
                                    <div className="shib-img mb-3">
                                    <img className='img-fluid mx-auto' src="../../images/rect-96.png" alt="rect-img" width={96} />
                                    </div>
                                    <h4 className='shib-title mb-2 ff-mos'>
                                    <Link href="javascript:void(0)" passHref>
                                        <a>
                                        Lorem Ipsum
                                        </a>
                                    </Link>
                                    </h4>
                                    <p className="ff-mos">
                                    Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                                    </p>
                                </div>
                                </div>
                                <div className="col-sm-6 col-lg-4 col-xl-3 cus-col">
                                <div className="shib-item text-center">
                                    <div className="shib-img mb-3">
                                    <img className='img-fluid mx-auto' src="../../images/rect-96.png" alt="rect-img" width={96} />
                                    </div>
                                    <h4 className='shib-title mb-2 ff-mos'>
                                    <Link href="javascript:void(0)" passHref>
                                        <a>
                                        Lorem Ipsum
                                        </a>
                                    </Link>
                                    </h4>
                                    
                                    <p className="ff-mos">
                                    Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                                    </p>
                                </div>
                                </div>
                                <div className="col-sm-6 col-lg-4 col-xl-3 cus-col">
                                <div className="shib-item text-center">
                                    <div className="shib-img mb-3">
                                    <img className='img-fluid mx-auto' src="../../images/rect-96.png" alt="rect-img" width={96} />
                                    </div>
                                    <h4 className='shib-title mb-2 ff-mos'>
                                    <Link href="javascript:void(0)" passHref>
                                        <a>
                                        Secure the Network
                                        </a>
                                    </Link>
                                    </h4>
                                    <p className="ff-mos">
                                    Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                                    </p>
                                </div>
                                </div>
                            </div>
                            </div>
                        </section>

                        {/* shib community section end */}          

                    <section className="container mb-xxl-5 mb-xl-4 mb-sm-3 mb-3">
                        <div className="row">
                            <div className="col-md-7 col-sm-7 col-xs-12">
                                <div className="image-section  static_img">
                                    <div><img className="img-fluid" src="../../images/700x300-4.png" alt="check-icon"/></div>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-5 col-xs-12">
                                <p className="ff-mos">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                                    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
                                    making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text. 
                                    Various versions have evolved over the years, sometimes by accident, sometimes on purpose <a href="#" className="text-primary">injected humour and the like.</a>
                                </p>
                            </div>
                        </div>
                        <br/>
                        <p className="ff-mos">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                    </section>
                </div>
               </main>
        </>
    );


}

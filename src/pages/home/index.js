/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"

export default function Home() {
  // const {account}=useContext(ProjectContext)

  // const { active,deactivate } = useWeb3React()
  // const [accountsAddress, setAccountsAddress] = useState("");
  // useEffect(() => {
  //   setAccountsAddress(localStorage.getItem("accounts"));
  //   console.log('chainId',chainId)
  //   console.log('account-home',account)
  // },[account]);
  const { account, chainId = 1 } = useActiveWeb3React()
  /**
   * 
    useEffect(()=>{
      let userDetails = localStorage.getItem('ShibariumUser');
      userDetails = userDetails ? JSON.parse(userDetails)?.objectId: ''
      if (!userDetails && active) {
        deactivate()
      }
    },[active])
  */

  //  console.log('account---------------', account)
  return (
    <>
      <main className="main-content ff-mos">
        {/* Banner section start */}
        <section className="banner-section">
          <div className="container">
            <div className="banner-row">
              <div className="banner-col-s">
                <div className="banner-content">
                  <h1 className='banner-title mb-3'>
                    Shibarium world bridge, trade, swap
                  </h1>
                  <p className='banner-desc'>
                    Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum. Sed nemo autem aut dolores quaerat ut repudiandae recusandae qui facilis
                  </p>
                  <div className='banner-btn'>
                    <div className="btn-col">
                      <a className="btn primary-btn w-100 d-block" href="javascript:void(0)">Launch App</a>
                    </div>
                    <div className="btn-col">
                      <a className="btn secondary-btn w-100 d-block" href="javascript:void(0)">Develop</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="banner-col-e banner-img" style={{backgroundImage: "url(" + "../images/banner-img.png" + ")",}}>
                            </div> */}
              <div className='banner-img'>
                <img className='img-fluid' src="../../images/banner-img.png" alt="banner-img" />
              </div>
            </div>
          </div>
        </section>
        {/* Banner section end */}
        <div className="content-block">

          {/* features section start */}

          <section className='features-section bottom-pad top-pad'>
            <div className="container">
              <div className='text-center'>
                <h2 className='heading'>Shibarium Solutions</h2>
              </div>
              <div className="row cus-row justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-8 cus-col">
                  <div className="ftrs-card">
                    <div className='ftrs-head'>
                      <h3 className='fw-600'>Swap</h3>
                      <div className="ftrs-icon">
                        <img className='img-fluid' src="../../images/swap.png" alt="" />
                      </div>
                    </div>
                    <p className='frts-desc'>
                      Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos
                      asperiores illum.
                    </p>
                    <a href="javascript:void(0)" className='link'><span>Learn More</span>
                      <img className='img-fluid' src="../../images/link-arrow.png" alt="arrow-icon" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-8 cus-col">
                  <div className="ftrs-card ftrs-active">
                    <div className='ftrs-head'>
                      <h3 className='fw-600'>Swap</h3>
                      <div className="ftrs-icon">
                        <img className='img-fluid' src="../../images/swap.png" alt="" />
                      </div>
                    </div>
                    <p className='frts-desc'>
                      Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos
                      asperiores illum.
                    </p>
                    <a href="javascript:void(0)" className='link'><span>Learn More</span>
                      <img className='img-fluid' src="../../images/link-arrow.png" alt="arrow-icon" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-8 cus-col">
                  <div className="ftrs-card">
                    <div className='ftrs-head'>
                      <h3 className='fw-600'>Swap</h3>
                      <div className="ftrs-icon">
                        <img className='img-fluid' src="../../images/swap.png" alt="" />
                      </div>
                    </div>
                    <p className='frts-desc'>
                      Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos
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

          {/* features section end */}

          {/* about section statrt */}
          <section className='about-section bottom-pad'>
              <div className="container">
                  <div className="primary-card rad-25 p-25">
                      <div className="row abt-row align-items-center justify-content-center">
                          <div className="col-lg-6 col-md-7 col-sm-8 order-2 order-md-1 abt-col">
                              <div className="abt-item">
                                  <h3 className='abt-title mb-3'>Built by developers, for developers</h3>
                                  <p className='abt-desc'>
                                      Shibarium combines the best of Ethereum and sovereign blockchains into a full-fledged multi-chain system.
                                  </p>
                                  <ul className='abt-list mb-3'>
                                      <li className='abt-lst-item'>
                                          <div className="check-icon">
                                            <img className="img-fluid" src="../../images/tick.png" alt="tick-icon"/>
                                          </div>
                                          It is able to fully benefit from Ethereum’s network effects
                                      </li>
                                      <li className='abt-lst-item'>
                                          <div className="check-icon">
                                            <img className="img-fluid" src="../../images/tick.png" alt="tick-icon"/>
                                          </div>
                                          It is inherently more secure
                                      </li>
                                      <li className='abt-lst-item'>
                                          <div className="check-icon">
                                            <img className="img-fluid" src="../../images/tick.png" alt="tick-icon"/>
                                          </div>
                                          It is more open and powerful
                                      </li>
                                  </ul>
                                  <a href="javascript:void(0)" className='btn secondary-btn'>First Steps</a>
                              </div>
                          </div>
                          <div className="col-lg-6 col-md-5 col-sm-8 abt-col order-1 order-md-2 text-center mb-4 mb-md-0">
                              <div className='shib-img'>
                                  <img className='img-fluid' src="../../images/steps.png" alt="" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          {/* about section end */}

          {/* Bone section start */}
          <section className='bone-section bottom-pad grid-pad'>
            <div className="container">
              <div className="heading text-center">
                <h2>Stake and earn $BONE</h2>
              </div>
              <div className="row cus-row justify-content-center">
                <div className="col-md-6 col-sm-8 cus-col">
                  <div className="cus-card card-flex">
                    <a href="javacript:void(0)" className='icon-top'>
                      <img className='img-fluid' src="../../images/arrow-top.png" alt="" />
                    </a>
                    <div className='card-item'>
                      <h3 className='mb-2'>Validators</h3>
                      <p>
                        Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                      </p>
                      <a className='primary-gradient-text d-flex align-items-center' href="javascript:void(0)">
                        <span className='me-2'>Set up a node</span>
                        <img className='img-fluid' src="../../images/top-arrow-prim.png" alt="img-fluid" />
                      </a>
                    </div>
                    <div className='card-img-block'>
                      <img className='img-fluid' src="../../images/react-blank.png" alt="card-img" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-8 cus-col">
                  <div className="cus-card card-flex">
                    <a href="javacript:void(0)" className='icon-top'>
                      <img className='img-fluid' src="../../images/arrow-top.png" alt="" />
                    </a>
                    <div className='card-item'>
                      <h3 className='mb-2'>Validators</h3>
                      <p>
                        Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                      </p>
                      <a className='primary-gradient-text d-flex align-items-center' href="javascript:void(0)">
                        <span className='me-2'>Set up a node</span>
                        <img className='img-fluid' src="../../images/top-arrow-prim.png" alt="img-fluid" />
                      </a>
                    </div>
                    <div className='card-img-block'>
                      <img className='img-fluid' src="../../images/react-blank.png" alt="card-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Bone section end */}

          {/* shib community section start */}
          <section className='shib-comun-section bottom-pad grid-pad'>
            <div className="container">
              <div className="text-center">
                <h2 className='heading pb-3'>Let’s grow as community</h2>
              </div>
              <div className="row cus-row">
                <div className="col-sm-6 col-lg-4 col-xl-3 cus-col">
                  <div className="shib-item text-center">
                    <div className="shib-img mb-3">
                      <img className='img-fluid' src="../../images/rect-96.png" alt="rect-img" width={96} />
                    </div>
                    <h4 className='shib-title mb-2'>Developer Resources</h4>
                    <p>
                      Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3 cus-col">
                  <div className="shib-item text-center">
                    <div className="shib-img mb-3">
                      <img className='img-fluid' src="../../images/rect-96.png" alt="rect-img" width={96} />
                    </div>
                    <h4 className='shib-title mb-2'>Developer Resources</h4>
                    <p>
                      Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3 cus-col">
                  <div className="shib-item text-center">
                    <div className="shib-img mb-3">
                      <img className='img-fluid' src="../../images/rect-96.png" alt="rect-img" width={96} />
                    </div>
                    <h4 className='shib-title mb-2'>Developer Resources</h4>
                    <p>
                      Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3 cus-col">
                  <div className="shib-item text-center">
                    <div className="shib-img mb-3">
                      <img className='img-fluid' src="../../images/rect-96.png" alt="rect-img" width={96} />
                    </div>
                    <h4 className='shib-title mb-2'>Developer Resources</h4>
                    <p>
                      Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* shib community section end */}

          {/* shib social section start*/}

          <section className='shib-social-section'>
            <div className="container">
              <ul className="shib-row">
                <li className="shib-col">
                  <div className="shib-item">
                    <img className='img-fluid' src="../../images/instagram.png" alt="socail-icon" width={24} />
                    <span>Instagram</span>
                  </div>
                </li>
                <li className="shib-col">
                  <div className="shib-item">
                    <img className='img-fluid' src="../../images/instagram.png" alt="socail-icon" width={24} />
                    <span>Instagram</span>
                  </div>
                </li>
                <li className="shib-col">
                  <div className="shib-item">
                    <img className='img-fluid' src="../../images/instagram.png" alt="socail-icon" width={24} />
                    <span>Instagram</span>
                  </div>
                </li>
                <li className="shib-col">
                  <div className="shib-item">
                    <img className='img-fluid' src="../../images/instagram.png" alt="socail-icon" width={24} />
                    <span>Instagram</span>
                  </div>
                </li>
                <li className="shib-col">
                  <div className="shib-item">
                    <img className='img-fluid' src="../../images/instagram.png" alt="socail-icon" width={24} />
                    <span>Instagram</span>
                  </div>
                </li>
                <li className="shib-col">
                  <div className="shib-item">
                    <img className='img-fluid' src="../../images/instagram.png" alt="socail-icon" width={24} />
                    <span>Instagram</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

        </div>
      </main>
      <footer className="main-footer primary-bg ff-mos">
        <div className="container">
          <div className="top-footer">
            <div className="row align-items-center py-3 py-md-4">
              <div className="col-6">
                <a className='footer-logo' href="javascript:void(0)">
                  <img className='img-fluid' src="../../images/footer-logo.png" alt="footer-logo" />
                </a>
              </div>
              <div className="col-6 text-end">
                <a className='' href="javascript:void(0)">
                  English
                </a>
              </div>
            </div>
          </div>
          <div className="bottom-footer">
            <div className="row">
              <div className="col-sm-3 col-6">
                <div className='bottom-item'>
                  <h6 className='mb-3 uc'>Category</h6>
                  <ul className='footer-list'>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className='bottom-item'>
                  <h6 className='mb-3 uc'>Category</h6>
                  <ul className='footer-list'>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className='bottom-item'>
                  <h6 className='mb-3 uc'>Category</h6>
                  <ul className='footer-list'>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className='bottom-item'>
                  <h6 className='mb-3 uc'>Category</h6>
                  <ul className='footer-list'>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                    <li className='footer-lst-item'>
                      <a href="javascript:void(0)">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

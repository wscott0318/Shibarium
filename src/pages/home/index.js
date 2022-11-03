/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
      <main className="main-content">
        {/* Banner section start */}
        <section className="banner-section">
          <div className="container">
            <div className="banner-row">
              <div className="banner-col-s">
                <div className="banner-content">
                  <h1 className='banner-title mb-3 ff-mos'>
                    Shibarium world bridge, trade, swap
                  </h1>

                    {/* tolltip test start*/}
                    
                      {/* <div className="cus-tooltip d-inline-block">
                        <div className="tool-ico">
                          !
                        </div>
                        <div className="tool-desc">
                          Lorem, ipsum.
                        </div>
                      </div> */}
                    {/* tooltip test end*/}

                  <p className='banner-desc ff-mos'>
                    Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum. Sed nemo autem aut dolores quaerat ut repudiandae recusandae qui facilis
                  </p>
                  <div className='banner-btn'>
                    <div className="btn-col">
                      <Link href={account ? '/wallet' : '/login'} passHref>
                        <a className="btn primary-btn w-100 d-block ff-mos">Launch App</a>
                      </Link>
                    </div>
                    <div className="btn-col">
                      {/* <a className="btn secondary-btn w-100 d-block ff-mos" href="javascript:void(0)">Develop</a> */}
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
              <div className='text-center pt-3 pt-sm-0'>
                <h2 className='heading ff-mos d-none d-sm-block'>Shibarium Solutions</h2>
              </div>
              <div className="row cus-row justify-content-center">
                {/* <div className="col-lg-4 col-md-6 col-sm-8 cus-col">
                  <div className="ftrs-card">
                    <div className='ftrs-head'>
                      <h3 className='fw-600 ff-mos'>Swap</h3>
                      <div className="ftrs-icon">
                        <img className='img-fluid' src="../../images/swap.png" alt="" />
                      </div>
                    </div>
                    <p className='frts-desc ff-mos'>
                      Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos
                      asperiores illum.
                    </p>
                    <Link href="/swap-token">
                      <a className='link'><span>Learn More</span>
                        <img className='img-fluid' src="../../images/link-arrow.png" alt="arrow-icon" />
                      </a>
                    </Link>
                  </div>
                </div> */}
                <div className="col-lg-4 col-md-6 col-sm-8 cus-col">
                  <div className="ftrs-card ftrs-active">
                    <div className='ftrs-head'>
                      <h3 className='fw-600 ff-mos'>Bridge</h3>
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
                {/* <div className="col-lg-4 col-md-6 col-sm-8 cus-col">
                  <div className="ftrs-card">
                    <div className='ftrs-head'>
                      <h3 className='fw-600 ff-mos'>Burn</h3>
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
                </div> */}
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
                      <h3 className='abt-title mb-3 ff-mos'>Built by developers, for developers</h3>
                      <p className='abt-desc ff-mos'>
                        Shibarium combines the best of Ethereum and sovereign blockchains into a full-fledged multi-chain system.
                      </p>
                      <ul className='abt-list mb-3'>
                        <li className='abt-lst-item ff-mos'>
                          <div className="check-icon">
                            <img className="img-fluid" src="../../images/tick.png" alt="tick-icon" />
                          </div>
                          It is able to fully benefit from Ethereum’s network effects
                        </li>
                        <li className='abt-lst-item ff-mos'>
                          <div className="check-icon">
                            <img className="img-fluid" src="../../images/tick.png" alt="tick-icon" />
                          </div>
                          It is inherently more secure
                        </li>
                        <li className='abt-lst-item ff-mos'>
                          <div className="check-icon">
                            <img className="img-fluid" src="../../images/tick.png" alt="tick-icon" />
                          </div>
                          It is more open and powerful
                        </li>
                      </ul>
                      <Link href="/all-validator" passHref>
                        <a href="javascript:void(0)" className='btn secondary-btn ff-mos'>First Step</a>
                      </Link>
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
          {/* about section end */}

          {/* Bone section start */}
          <section className='bone-section bottom-pad grid-pad'>
            <div className="container">
              <div className="heading text-center">
                <h2 className="ff-mos">Stake and earn $BONE</h2>
              </div>
              <div className="row cus-row justify-content-center">
                <div className="col-md-6 col-sm-8 cus-col">
                  <div className="cus-card card-flex">
                    <Link href="/become-validator" passHref>
                      <a className='icon-top'>
                        <img className='img-fluid' src="../../images/arrow-top.png" alt="" />
                      </a>
                    </Link>
                    <div className='card-item'>
                      <h3 className='mb-2 ff-mos'>Validators</h3>
                      <p>
                        Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                      </p>
                      <a className='primary-gradient-text d-flex align-items-center' href="javascript:void(0)">
                        <span className='me-2 ff-mos'>Set up a node</span>
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
                    <Link href="/all-validator" passHref>
                      <a className='icon-top'>
                        <img className='img-fluid' src="../../images/arrow-top.png" alt="" />
                      </a>
                    </Link>
                    <div className='card-item'>
                      <h3 className='mb-2 ff-mos'>Delegator</h3>
                      <p className="ff-mos">
                        Lorem ipsum dolor sit amet. Ut asperiores tenetur et natus laudantium eos asperiores illum.
                      </p>
                      <a className='primary-gradient-text d-flex align-items-center' href="javascript:void(0)">
                        <span className='me-2 ff-mos'>Set up a node</span>
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
                <h2 className='heading pb-3 ff-mos'>Let’s grow as community</h2>
              </div>
              <div className="row cus-row justify-content-center">
                <div className="col-sm-6 col-lg-4 col-xl-3 cus-col">
                  <div className="shib-item text-center">
                    <div className="shib-img mb-3">
                      <img className='img-fluid mx-auto' src="../../images/rect-96.png" alt="rect-img" width={96} />
                    </div>
                    <h4 className='shib-title mb-2 ff-mos'>
                      <Link href="/developer-resources" passHref>
                        <a>
                          Developer Resources
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
                      <Link href="/ecosystem" passHref>
                        <a>
                          Join the Ecosystem
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
                      <Link href="/community" passHref>
                        <a>
                          Join the Community
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
                      <Link href="/secure-network" passHref>
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

          {/* shib social section start*/}

          <section className='shib-social-section'>
            <div className="container">
              <ul className="shib-row">
                <li className="shib-col">
                  <Link href="/" passHref>
                    <a className="shib-item">
                      <img className='img-fluid' src="../../images/icons/tw.png" alt="socail-icon" width={24} />
                      <span className="ff-mos">Twitter</span>
                    </a>
                  </Link>
                </li>
                <li className="shib-col">
                  <Link href="javascript:void(0)" className="shib-item" passHref>
                    <a className="shib-item">
                      <img className='img-fluid' src="../../images/icons/teli.png" alt="socail-icon" width={24} />
                      <span className="ff-mos">Telegram</span>
                    </a>
                  </Link>
                </li>
                <li className="shib-col">
                  <Link href="javascript:void(0)" className="shib-item" passHref>
                    <a className="shib-item">
                      <img className='img-fluid' src="../../images/icons/discord.png" alt="socail-icon" width={24} />
                      <span className="ff-mos">Discord</span>
                    </a>
                  </Link>
                </li>
                <li className="shib-col">
                  <Link href="javascript:void(0)" className="shib-item" passHref>
                    <a className="shib-item">
                      <img className='img-fluid' src="../../images/icons/reddit.png" alt="socail-icon" width={24} />
                      <span className="ff-mos">Reddit</span>
                    </a>
                  </Link>
                </li>
                <li className="shib-col">
                  <Link href="javascript:void(0)" className="shib-item" passHref>
                    <a className="shib-item">
                      <img className='img-fluid' src="../../images/icons/insta.png" alt="socail-icon" width={24} />
                      <span className="ff-mos">Instagram</span>
                    </a>
                  </Link>
                </li>
                <li className="shib-col lft-spc">
                  <Link href="javascript:void(0)" className="shib-item" passHref>
                    <a className="shib-item">
                      <img className='img-fluid' src="../../images/icons/ether.png" alt="socail-icon" width={24} />
                      <span className="ff-mos">Etherscan</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          {/* shib social section End*/}

          <Footer />
        </div>
      </main>

    </>
  );
}

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Nav} from "react-bootstrap";
import DogTab from './dogTabfirst';
import DogTabfirst from './dogTabsecond';


export default function faucet() {
  const [isTopdoG, setIsTopdoG] = useState(true);
  const [isPuppyDog, setIsPuppyDog] = useState(false);

  const handleTopdoG = () => {
      // console.log("handleTopdoG");
    setIsTopdoG(true);
    setIsPuppyDog(false);
  };
  const handlePuppyDog = () => {
      // console.log("handlePuppyDog");
    setIsTopdoG(false);
    setIsPuppyDog(true);
  };

  // console.log("isTopdoG",isTopdoG);
  // console.log("isPuppyDog",isPuppyDog);
  return (
    <>
      {/* <header className='main-header darkBg'>
                <div className="container faucet-sec">
                    <nav className='nav justify-content-between align-items-center'>
                        <div className='left-widget'>
                            <a href='/home' className="navbar-brand">
                                <img className='img-fluid d-none' src="../../assets/images/logo.png" alt="" />
                                <img className='img-fluid' src="../../assets/images/logo-white.png" alt="" />
                            </a>
                        </div>
                    </nav>
                </div>
            </header> */}
      <div className="wrapper">
        <section className="faucet-section">
          <div className="left-shape">
            <img
              className="img-fluid"
              src="../../assets/images/bone-svg.png"
              alt=""
            />
          </div>
          <div className="right-shape">
            <img
              className="img-fluid"
              src="../../assets/images/bone-svg.png"
              alt=""
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="mx-auto col-lg-8 col-xl-6">
                <div className="p-4 cus-tabs nav-wrap tab-50 darkBg rad-10">
                  <h3 className="fwb">Get Test Tokens</h3>
                  <p>
                    This faucet transfers TestToken on BONE testnets and parent
                    chain. Confirm details before submitting.
                  </p>

                  <h6 className="mb-2 fwb">Network</h6>
                  <Nav
                    className="mb-4 mb-lg-5"
                    variant="pills"
                    defaultActiveKey="/tab-1"
                  >
                    <Nav.Item onClick={handleTopdoG}>
                      <Nav.Link href="#!"  className={`${isTopdoG?"active":""}`}>
                        <span className="trs-2">TOPDOG</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={handlePuppyDog}>
                      <Nav.Link eventKey="link-1" className={`${isPuppyDog?"active":""}`}>
                        <span className="trs-2">PUPPYDOG</span>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  {/* Top Dog start */}
                  {isTopdoG && (
                    <DogTab />
                  )}
                  {/* Top Dog End*/}

                  {/* Puppy Dog Start */}
                  {isPuppyDog && (
                    <DogTabfirst />
                  )}
                  {/* Puppy Dog End */}

                  {/* Withdraw tab start */}
                  <div className="tab-content-wrap">
                    <div className="pt-3 btn-wrap">
                      <button type="button" className="btn gradient_btn w-100">
                        <span>SUBMIT</span>
                      </button>
                    </div>
                  </div>
                  {/* Withdraw tab end */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="main-footer">
        <div className="container">
          <div className="mt-4 copyright mt-lg-5">
            <h3 className="mb-0 text-center fwb">Powered by xFund.</h3>
          </div>
        </div>
      </footer>
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "pages/layout/header";
import 'react-toastify/dist/ReactToastify.css';
import Accordion from 'react-bootstrap/Accordion';
import SidebarOuter from "pages/sidebar-outer/outer-sidebar";

export default function ProfileUpdate() {

   const [current, setCurrent] = useState('0');
   const [faqType, setFaqType] = useState('0');
   const [menuState, setMenuState] = useState(false);
   const checkCurrent = (x:any) => {
        if(current === x)
        {
            setCurrent('');
        }
        else {
            setCurrent(x)
        }
   }
   useEffect(() => {
     setCurrent('0')
   }, [faqType])
   
   const handleMenuState = () => {
    // console.log("called click")
    setMenuState(!menuState);
  }
    return (
      <>
        <Header />
        <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg ffms-inherit oh position-relative">
          <section className="top_bnr_area py-0">
            <div className="container">
              <div className="sec-acc position-relative">
                {/* <div className="fq-baner">
                  <div className="hd-sc">
                    <h1>
                      Frequently Asked
                      <br />
                      Questions
                    </h1>
                  </div>
                </div> */}
                <SidebarOuter
                  handleMenuState={handleMenuState}
                  onClickOutside={() => {
                    setMenuState(false);
                  }}
                  faqType={faqType}
                  setFaqType={setFaqType}
                  menuState={menuState}
                />
                {/* Technical faq section start */}
                {
                  faqType === '0' &&
                  <div className="accor-sec right-sec">
                  <h3 className="head-fq">Technical FAQ</h3>
                  <Accordion activeKey={[current]} flush>
                    <Accordion.Item
                      eventKey="0"
                      className={`${current === "0" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("0")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where does it come from?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="1"
                      className={`${current === "1" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("1")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="2"
                      className={`${current === "2" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("2")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="3"
                      className={`${current === "3" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("3")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                }
                {/* Technical faq section end */}

                {/* Delegator faq section start */}
                { faqType === '1' && <div className="accor-sec right-sec">
                  <h3 className="head-fq">Delegator FAQ</h3>
                  <Accordion activeKey={[current]} flush>
                    <Accordion.Item
                      eventKey="0"
                      className={`${current === "0" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("0")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where does it come from?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="1"
                      className={`${current === "1" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("1")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="2"
                      className={`${current === "2" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("2")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="3"
                      className={`${current === "3" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("3")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div> }
                {/* Delegator faq section end */}

                {/* Validator faq section start */}
                {faqType === '2' && <div className="accor-sec right-sec">
                  <h3 className="head-fq">Validator FAQ</h3>
                  <Accordion activeKey={[current]} flush>
                    <Accordion.Item
                      eventKey="0"
                      className={`${current === "0" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("0")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where does it come from?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="1"
                      className={`${current === "1" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("1")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="2"
                      className={`${current === "2" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("2")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="3"
                      className={`${current === "3" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("3")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div> }
                {/* Validator faq section end */}

                {/* Staking faq section start */}
                {faqType === '3' &&  <div className="accor-sec right-sec">
                  <h3 className="head-fq">Staking FAQ</h3>
                  <Accordion activeKey={[current]} flush>
                    <Accordion.Item
                      eventKey="0"
                      className={`${current === "0" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("0")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where does it come from?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="1"
                      className={`${current === "1" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("1")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="2"
                      className={`${current === "2" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("2")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="3"
                      className={`${current === "3" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("3")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div> }
                {/* Staking faq section end */}

                {/* Wallet faq section start */}
                {faqType === '4' && <div className="accor-sec right-sec">
                  <h3 className="head-fq">Wallet FAQ</h3>
                  <Accordion activeKey={[current]} flush>
                    <Accordion.Item
                      eventKey="0"
                      className={`${current === "0" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("0")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where does it come from?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="1"
                      className={`${current === "1" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("1")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="2"
                      className={`${current === "2" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("2")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey="3"
                      className={`${current === "3" && "acc-active"}`}
                    >
                      <Accordion.Header onClick={() => checkCurrent("3")}>
                        <div className="plus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/plus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="minus-icon">
                          <img
                            width="15"
                            height="15"
                            className="img-fluid"
                            src="../../assets/images/minus-icon.png"
                            alt=""
                          />
                        </div>
                        <div className="acc-head">Where can i get some?</div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div> }
                {/* Wallet faq section end */}
              </div>
            </div>
          </section>
        </main>
      </>
    );
}
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Header from "pages/layout/header";
import 'react-toastify/dist/ReactToastify.css';
import Accordion from 'react-bootstrap/Accordion';

export default function Support() {

   const [current, setCurrent] = useState('0');

   const checkCurrent = (x:any) => {
        if(current === x)
        {
            setCurrent('');
        }
        else {
            setCurrent(x)
        }
   }

    return (
      <>
        <Header />
        <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg ffms-inherit oh position-relative">
          <section className="top_bnr_area py-0">
            <div className="container">
              <div className="section-info ps-0 position-relative">
                <div className="supprt-baner">
                  <div className="sup-content">
                    <h1>Hello, how can we help?</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
                    <div></div>
                  </div>
                </div>
                <div className="accor-sec">
                  <Accordion defaultActiveKey={[current]} flush>
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
              </div>
            </div>
          </section>
        </main>
      </>
    );
}
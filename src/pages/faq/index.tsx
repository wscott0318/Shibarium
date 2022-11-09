/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "pages/layout/header";
import StakingHeader from "pages/staking-header";
import Link from 'next/link';
import { useFormik } from "formik";
import * as yup from "yup";
import { getValidatorInfo, updateValidator } from "app/services/apis/network-details/networkOverview";
import Web3 from "web3";
import { useActiveWeb3React } from "app/services/web3";
import LoadingSpinner from 'pages/components/Loading';
import { useUserType } from "app/state/user/hooks";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Accordion from 'react-bootstrap/Accordion';

export default function ProfileUpdate() {

    return (
        <>
            <Header />
            <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg ffms-inherit oh position-relative">
                <section className="top_bnr_area py-0">
                    <div className="container">
                        <div className="section-info ps-0 position-relative">
                            <div className="fq-baner">
                                <div className="hd-sc">
                                    <h1>Frequently Asked<br/>Questions</h1>
                                </div>
                            </div>
                            <div className="accor-sec">
                            <Accordion defaultActiveKey={['0']} alwaysOpen>
                                <Accordion.Item eventKey="0" className="acc-active">
                                    <Accordion.Header>
                                        <div className="plus-icon"><img width="15" height="15" className="img-fluid" src="../../images/plus-icon.png" alt="" /></div>
                                        <div className="minus-icon"><img width="15" height="15" className="img-fluid" src="../../images/minus-icon.png" alt="" /></div>
                                        <div className="acc-head">Where does it come from?</div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <div className="plus-icon"><img width="15" height="15" className="img-fluid" src="../../images/plus-icon.png" alt="" /></div>
                                        <div className="minus-icon"><img width="15" height="15" className="img-fluid" src="../../images/minus-icon.png" alt="" /></div>
                                        <div className="acc-head">Where can i get some?</div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        <div className="plus-icon"><img width="15" height="15" className="img-fluid" src="../../images/plus-icon.png" alt="" /></div>
                                        <div className="minus-icon"><img width="15" height="15" className="img-fluid" src="../../images/minus-icon.png" alt="" /></div>
                                        <div className="acc-head">Where can i get some?</div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        <div className="plus-icon"><img width="15" height="15" className="img-fluid" src="../../images/plus-icon.png" alt="" /></div>
                                        <div className="minus-icon"><img width="15" height="15" className="img-fluid" src="../../images/minus-icon.png" alt="" /></div>
                                        <div className="acc-head">Where can i get some?</div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.</p>
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
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Link from "next/link";

export default function Footer() {

    return (
        <>
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
                                <div className="dd-style">
                                    <DropdownButton
                                        align="end"
                                        title="English"
                                        id="dropdown-menu-align-end"
                                    >
                                        <Dropdown.Item eventKey="1">English</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">English</Dropdown.Item>
                                        <Dropdown.Item eventKey="3">English</Dropdown.Item>
                                        <Dropdown.Item eventKey="3">English</Dropdown.Item>

                                    </DropdownButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-footer">
                        <div className="row">
                            <div className="col-sm-3 col-6">
                                <div className='bottom-item'>
                                    <h6 className='mb-3 uc ff-mos'>Shib</h6>
                                    <ul className='footer-list'>
                                        <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
                                                Shiba Inu Token Website
                                            </a>
                                        </li>
                                        <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
                                                ShibaSwap DEX
                                            </a>
                                        </li>
                                        <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
                                                SHIB - The Metaverse
                                            </a>
                                        </li>
                                        <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
                                                Shiba Inu Blog
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3 col-6">
                                <div className='bottom-item'>
                                    <h6 className='mb-3 uc ff-mos'>Shib</h6>
                                    <ul className='footer-list'>
                                       <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
                                                SHIBOSHIS NFTs
                                            </a>
                                        </li>
                                        <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
                                                Certik ShibaSwap Audit
                                            </a>
                                        </li>
                                        <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
                                                Shiba Inu Woof Paper V2
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3 col-6">
                                <div className='bottom-item'>
                                    <h6 className='mb-3 uc ff-mos'>Metaverse</h6>
                                    <ul className='footer-list'>
                                        <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
                                                SHIB The Metaverse Reddit
                                            </a>
                                        </li>
                                        <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
                                                The Third Floor x SHIB The Metaverse
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3 col-6">
                                <div className='bottom-item'>
                                    <h6 className='mb-3 ff-mos'>General</h6>
                                    <ul className='footer-list'>
                                        <li className='footer-lst-item'>
                                            <Link href="javascript:void(0)">
                                                <a className="ftr-link ff-mos">
                                                    About
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='footer-lst-item'>
                                            <Link href="javascript:void(0)">
                                                <a className="ftr-link ff-mos">
                                                    Blog
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='footer-lst-item'>
                                            <Link href="javascript:void(0)">
                                                <a className="ftr-link ff-mos">
                                                    Careers
                                                </a>
                                            </Link>
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



/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
                                    <h6 className='mb-3 uc ff-mos'>About</h6>
                                    <ul className='footer-list'>
                                        <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
                                                Link 1
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3 col-6">
                                <div className='bottom-item'>
                                    <h6 className='mb-3 uc ff-mos'>Category</h6>
                                    <ul className='footer-list'>
                                        <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
                                                Link 1
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3 col-6">
                                <div className='bottom-item'>
                                    <h6 className='mb-3 uc ff-mos'>Category</h6>
                                    <ul className='footer-list'>
                                        <li className='footer-lst-item'>
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
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
                                            <a className="ftr-link ff-mos" href="javascript:void(0)">
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



import React, { useState, useEffect, useContext } from "react";
import { Dropdown, Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";

const StakingHeader = () => {

    return (
        <>
            <div className="staking-header dark-bg-800">
                <div className="container">
                    <div className="lft-sec">
                        <ul className="lft-links ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="javascript:void(0);">Overview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="javascript:void(0);">All Validators</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="javascript:void(0);">My Account</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StakingHeader;

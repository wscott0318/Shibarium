/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "pages/layout/header";
import StakingHeader from "pages/staking-header";
import Link from 'next/link'


export default function ErrorPage() {

    return (
        <>
            <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh top-space ffms-inherit">
                <Header />
                <div className="error-container">
                    <div className="text-center">
                        <h1 className="mb-3">
                            <span className="fade-in" id="digit1">4</span>
                            <span className="fade-in" id="digit2">0</span>
                            <span className="fade-in" id="digit3">4</span>
                        </h1>
                        {/* <div className="image-wrap mb-4">
                            <img className="img-fluid" src="../../images/error.gif" alt="error-img" width={400} />
                        </div> */}
                        <Link href="/">
                            <a className="btn primary-btn">Return To Home</a>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}

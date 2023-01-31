/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from "pages/layout/header";
import Link from 'next/link'


export default function ErrorPage() {
    
    return (
        <>
            <Header />
            <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh  ffms-inherit">
                
                <div className="error-container">
                    <div className="text-center">
                        <img className='img-fluid' src="../../assets/images/404-img.gif" alt="404-error" width={600} />
                        <h5>Sorry, the page you are looking for could not be found.</h5>
                        <Link href="/" passHref>
                            <a className="btn">Return To Home</a>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}

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


export default function ProfileUpdate() {

    return (
        <>
            
            <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg ffms-inherit oh position-relative">
                <Header />
                {/* <div className="shape bottom-right">
                    <img className="img-fluid" src="../../images/shape3.png" alt="shape-img" />
                </div> */}
                <section className="top_bnr_area py-0">
                    <div className="container">
                        <div className="section-info ps-0 position-relative">
                            <div className="fq-baner">
                                
                            </div>

                        </div>
                    </div>
                </section>
                
            </main>
        </>
    );
}
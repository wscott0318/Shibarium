/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import CommonModal from "../components/CommonModel";
import StakingHeader from '../staking-header';
import Header from "../layout/header";
export default function HowitWorks() {
    
    return (
        <>
            <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg">
            <Header />
                <div className="py-xxl-5 py-sm-4 py-4">
                    <section className="container mb-xxl-5 mb-xl-4 mb-sm-3 mb-3">
                        <h1 className="mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 ff-mos">Web Wallet Usage Guide</h1>
                        <p className="mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 ff-mos">What follows is a set of instructions to deposit and withdraw funds using Shibarium's network. For performing those actions, you need to connect a wallet to Shibarium's environment.
                        In this tutorial, we used Metamask, but Shibarium is integrated with other wallets such as Coinbase, Bitski, Venly and WalletConnect.</p>
                        <div class="cus-alerbox">
                        <div className="d-flex align-items-center">
                            <div className="d-inline-block me-2">
                                <img width="20" height="20" className="img-fluid" src="../../images/alert-icon.png" alt="check-icon"/>
                            </div>
                            <span className="fw-700 ff-mos">NOTE</span>
                        </div>
                        <p className="mt-2 ff-mos">Please refer to <a className="underline" href="javascript:void(0);">this guide</a> to learn how to connect Shibarium to Metamask.</p>
                        </div>
                    </section>

                    <section className="container mb-xxl-5 mb-xl-4 mb-sm-3 mb-3">
                        <h3 className="mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 ff-mos">Logging into the Shibarium Wallet Suite</h3>
                        <p className="mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 ff-mos">To log into the Shibarium Wallet Suite you need to access the following URL: <a className="underline" href="javascript:void(0);">https://wallet.Shibarium.technology/.</a></p>
                        <p className="mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 ff-mos">To log into the testnet version of Shibarium Wallet Suite, you need to access the following URL: <a className="underline" href="javascript:void(0);">https://wallet-dev.Shibarium.technology/.</a></p>
                        <p className="mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 ff-mos">Once you connect your account with the Web Wallet, you will be taken to 
                        the landing page with various means on how to transact with the web wallet. Shibarium POS chain currently offers the following services:</p>
                        <ul className="text-list mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 ff-mos">
                            <li>The Shibarium Wallet for sending, receiving and storing your assets on the Shibarium network.</li>
                            <li>the Shibarium Bridge, for withdrawals and deposits across networks.</li>
                            <li>Shibarium Staking: your go-to place for staking and getting rewards with your $MATIC.</li>
                            <li>Shibarium Staking: your go-to place for staking and getting rewards with your $MATIC.</li>
                        </ul>
                        <p className="ff-mos">Click on the Shibarium Wallet or Shibarium Bridge, and you will see all your token
                        balances on the Shibarium Wallet across the bridges(PoS and Plasma).</p>
                        <br/>
                        <div className="img-section">
                            <div><img  className="img-fluid" src="../../images/500x500.png" alt="check-icon"/></div>
                        </div>
                        <br/>
                        <div class="cus-alerbox">
                        <div className="d-flex align-items-center">
                            <div className="d-inline-block me-2">
                                <img width="20" height="20" className="img-fluid" src="../../images/bulb.png" alt="check-icon"/>
                            </div>
                            <span className="fw-700 ff-mos">METAMASK</span>
                        </div>
                        <p className="mt-2 ff-mos">Be attentive to all Metamask's popups.
                        Throughout the deposit and withdraw processes, you will be prompted with Metamask's popups to confirm transactions, switch networks and for other procedures.
                         You can only proceed with those transactions if you confirm the actions on Metamask.</p>
                        </div>
                    </section>
                    <section className="container mb-xxl-5 mb-xl-4 mb-sm-3 mb-3">
                        <h3 className="mb-xxl-4 mb-xl-3 mb-sm-2 mb-2 ff-mos">Depositing Funds from Ethereum to Shibarium</h3>
                        <p className="ff-mos">You can either watch the video tutorial below or follow the step-by-step guide.</p>
                        <br/>
                        <div className="img-section">
                            <div><img className="img-fluid" src="../../images/700x300.png" alt="check-icon"/></div>
                        </div>
                    </section>
                </div>
               </main>
        </>
    );


}

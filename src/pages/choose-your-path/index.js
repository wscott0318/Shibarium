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

const Delegatorvalidator = () => {
    return (
        <>
            <Header />
            <main className="main-content dark-bg-800 full-vh cmn-input-bg ffms-inherit staking-main">
            {/* <StakingHeader /> */}
            <section className="top_bnr_area dark-bg darkbg py-4 py-md-5 ffms-inherit">
                <div className="container">
                    <h1 className="text-white trs-6 fw-500 ff-mos">Delegator and Validator</h1>
                </div>
            </section>
            {/* banner section end */}

            {/* featurs section start */}
            <section className="shiba-features position-relative ffms-inherit">
                <div className='floating-img'>
                    <img className='img-fluid' src="../../assets/images/bone-xsm.png" alt="bone-img" />
                </div>
                <div className="container">
                    <div className="row shiba-row mb-lg-5">
                        <div className="col-lg-8 shiba-col order-2 order-lg-1">
                            <h3 className='mb-4 ff-mos'>Become a Delegator</h3>
                            <p className=" ff-mos">
                                Participate as a delegator to earn rewards and contribute to network security. Delegators are token holders who cannot, or do not want to run a validator node themselves. Instead, they secure the network by delegating their stake to validator nodes and play a critical role in the system, as they are responsible for choosing validators. They run their delegation transaction on the staking contract on the Ethereum mainnet. 
                            </p>
                            <p className="ff-mos">
                                Delegation increases the power of the validator. More the power, more probability of the validator to become the block producer and checkpoint proposer and more weight in the consensus.
                            </p>
                            <p className="ff-mos">
                                There is no minimum amount requirement for delegation. Any amount, even 1 BONE, will be accepted in the system. Validators might charge a commission in exchange for their node running services. Other than the commission charged, one needs to evaluate the track record of the validator for example, average uptime or if the node was ever compromised.
                            </p>
                            <ul className="shiba-list mb-4 mb-lg-5 d-none">
                                <li className='shiba-list-item'>
                                    <p className="shiba-text mb-0 ff-mos">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text ff-mos">
                                        Maecenas luctus velit non ipsum ultrices posuere.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text ff-mos">
                                        Nam bibendum dui eu mi lobortis molestie.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text ff-mos">
                                        Sed vel lorem quis arcu consequat accumsan.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text ff-mos">
                                        Phasellus ornare arcu ac leo feugiat, ut fermentum neque cursus.
                                    </p>
                                </li>
                            </ul>
                            {/* <p className='mb-0'>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
                            </p> */}
                        </div>
                        <div className="col-lg-4 shiba-col order-1 order-lg-2">
                            <div className="shiba-img">
                                <img className='img-fluid' src="../../assets/images/shiba-col.png" alt="cus-image" />
                            </div>
                        </div>
                    </div>
                    <div className="row shiba-row pt-4 pt-md-5">
                        <div className="col-lg-4 shiba-col">
                            <div className="shiba-img">
                                <img className='img-fluid' src="../../assets/images/shiba-col-2.png" alt="cus-image" />
                            </div>
                        </div>
                        <div className="col-lg-8 shiba-col">
                            <h3 className='mb-4 ff-mos'>Become a Validator</h3>
                            <p className="ff-mos">
                                Validator nodes are units on the Shibarium blockchain that participate in consensus group work and commit checkpoints on the Ethereum Mainnet. Validators verify transactions and add new blocks on the blockchain. In return, they earn rewards.
                            </p>
                            <p className="ff-mos">
                                Validator Rewards = Staking Rewards + Transaction Fees from Shibarium chain
                            </p>
                            <p className="ff-mos">
                                A validator is a participant in the network who locks up BONE tokens in the system and runs Heimdall validator and Bor block producer nodes in order to help run the network. Validators stake their BONE tokens as collateral to work for the security of the network.
                            </p>
                            <p className="ff-mos">
                                Rewards are distributed to all stakers proportional to their stake at every checkpoint with the exception being the proposer getting an additional bonus. 
                            </p>
                            <ul className="shiba-list mb-4 mb-lg-5 d-none">
                                <li className='shiba-list-item'>
                                    <p className="shiba-text mb-0 ff-mos">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text ff-mos">
                                        Maecenas luctus velit non ipsum ultrices posuere.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text ff-mos">
                                        Nam bibendum dui eu mi lobortis molestie.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text ff-mos">
                                        Sed vel lorem quis arcu consequat accumsan.
                                    </p>
                                </li>
                                <li className="shiba-list-item">
                                    <p className="shiba-text ff-mos">
                                        Phasellus ornare arcu ac leo feugiat, ut fermentum neque cursus.
                                    </p>
                                </li>
                            </ul>
                            <p className='mb-0 d-none ff-mos'>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* features section end */}

            {/* path section start */}
            <section className='path-section ffms-inherit'>
                <div className="float-bottom-left">
                    {/* <img className='img-fluid' src="../../assets/images/shape1.png" alt="shape-img" /> */}
                </div>
                <div className="float-bottom-right">
                    {/* <img className='img-fluid' src="../../assets/images/shape3.png" alt="shape-img" /> */}
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 mx-auto text-center">
                            <h2 className='mb-4 ff-mos'>Stake now and earn rewards</h2>
                            <p className="ff-mos">
                                Shibarium PoS chain is run on Proof of Stake mechanism. Anyone can become a validator on the mainnet.
                            </p>
                            <p className="ff-mos">
                                We allocate 12% of our total supply of tokens to fund the staking rewards. As a validator, you get to set your own commission for accepting delegations to your node. We also provide annual rewards as incentives!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* path section end  */}
            
            </main>
        </>
    );
}

export default Delegatorvalidator;

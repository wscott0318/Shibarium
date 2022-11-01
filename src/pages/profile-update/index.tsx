/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "pages/layout/header";
import StakingHeader from "pages/staking-header";
import Link from 'next/link'


export default function ProfileUpdate() {

    return (
        <>
            <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg ffms-inherit">
            <Header />

                <section className="top_bnr_area dark-bg darkbg py-4 py-md-5">
                    <div className="container">
                        <div className="section-info ps-0 position-relative">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <h1 className="text-white trs-6 fw-500 ff-mos">Update Profile</h1>
                                </div>
                                <div className="col-md-6">
                                    <div className="banner-image">
                                        <img className="img-fluid ms-auto" src="../../images/shiba-img.png" width={350} alt="banner-img" />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
                <section className="rewards-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto cus-card-800">
                                <form>
                                    <div className="progress-tab">
                                        <div className="mb-4 mb-xl-5">
                                            <h5 className="fwb fw-700 mb-2 ff-mos">Add node details</h5>
                                            <p className="ff-mos">Please provide your node details for better recognizability</p>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Validator logo</label>
                                                    <div className="file-wrap">
                                                        <div className="file-icons">
                                                            <img src="../../assets/images/file-icon.png" alt="" className="img-fluid" width={22} />
                                                        </div>
                                                        <div className="file-input">
                                                            <input type="file" className="input-file" accept="image/*" />
                                                            <a href="#!" className="form-control ff-mos">Upload</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Validator name</label>
                                                    <input type="text" className="form-control" placeholder="i.e Dark Knight Ventures" name="validatorname" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Website</label>
                                                    <input type="text" className="form-control" placeholder="https://knightventures.com" name="website" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Signer’s address</label>
                                                    <input type="text" className="form-control" placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx" name="address" />
                                                </div>
                                            </div>
                                            {/* <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Signer’s Public key</label>
                                                    <input type="text" className="form-control" placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx" name="publickey" />
                                                </div>
                                            </div> */}
                                            {/* <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Commission in %</label>
                                                    <input type="text" className="form-control" name="commission" />
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="btn-wrap col-sm-5 mt-4 flx mx-auto">
                                            <button type="submit" value="submit" className="btn primary-btn w-100">
                                                <span className="ff-mos">Update</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

import React, { useState, useEffect, useContext } from "react";
import Footer from "../footer/index"
export default function SnapshotPolygon() {

    // const { active, deactivate } = useWeb3React()

    return (
        <>
            <main className="page-content">
                <div className="position-relative sec-spc-high">
                    <div className="container">
                        <div className="row">
                            <div className="text-center col-sm-8 text-sm-start">
                                <h1 className="light-text fnt-58 fnt-100">Bone Chains Snapshots</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="pb-3 pt-4  pb-lg-3 pt-lg-5 darkBg">
                    <div className="container">
                        <div className="row">
                            <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-6 bs-col">
                                <div className="bs-card card">
                                    <h4 className="fwb mb-3">Mainnet FullNode Bor snapshot</h4>
                                    <div className="card-hr"></div>
                                    <a href="#" className="mb-0 trs-3 primary-text">https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-09-07.tar.gz</a>
                                </div>
                            </div>
                            <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-6 bs-col">
                                <div className="bs-card card">
                                    <h4 className="fwb mb-3">Mainnet Heimdall snapshot</h4>
                                    <div className="card-hr"></div>
                                    <a href="#" className="mb-0 trs-3 primary-text">https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-09-07.tar.gz</a>
                                </div>
                            </div>
                            <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-6 bs-col">
                                <div className="bs-card card">
                                    <h4 className="fwb mb-3">Erigon Mainnet archive snapshot</h4>
                                    <div className="card-hr"></div>
                                    <a href="#" className="mb-0 trs-3 primary-text">https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-09-07.tar.gz</a>
                                </div>
                            </div>

                            <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-6 bs-col">
                                <div className="bs-card card">
                                    <h4 className="fwb mb-3">TestNet Archive Bor snapshot</h4>
                                    <div className="card-hr"></div>
                                    <a href="#" className="mb-0 trs-3 primary-text">https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-09-07.tar.gz</a>
                                </div>
                            </div>
                            <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-6 bs-col">
                                <div className="bs-card card">
                                    <h4 className="fwb mb-3">Testnet FullNode Bor snapshot</h4>
                                    <div className="card-hr"></div>
                                    <a href="#" className="mb-0 trs-3 primary-text">https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-09-07.tar.gz</a>
                                </div>
                            </div>
                            <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-6 bs-col">
                                <div className="bs-card card">
                                    <h4 className="fwb mb-3">TestNet Heimdall snapshot</h4>
                                    <div className="card-hr"></div>
                                    <a href="#" className="mb-0 trs-3 primary-text">https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-09-07.tar.gz</a>
                                </div>
                            </div>
                        </div>
                        <div className="py-4 py-lg-5">
                            <p>
                            Mainnet Archive EBS Snapshot :snap-0e63c424821933faa Region:us-east-1 AWS.Due to large size of archive data sharing a s3 url will not be possible anymore we will look into other possible solutions for archive data snapshots
                            </p>
                        </div>
                    </div>
                </section>

            </main>
            {/* main header closed */}
            <Footer />
        </>
    );
}
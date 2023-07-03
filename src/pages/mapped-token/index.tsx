import React from "react";
import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReactPaginate from "react-paginate";
import { Nav } from "react-bootstrap";
import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";



function MappedToken() {
    const [pageCount, setPageCount] = useState<number>(1);
    return (
        <>
            <div className="main-content dark-bg-800 full-vh font-up ffms-inherit">
                <div className="mapped-token-header">
                    <img src="../../../assets/images/Shibarium white@2x.png" alt="" />
                    <Link href="#">
                        <a className="btn primary-btn ff-mos">Map New Token</a>
                    </Link>
                </div>

                <div className="bottom-pad mapped-token-wrapper">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <div className="hero-cont">
                            <div className="container">
                                <div className="section-title">
                                    <h3>Find mapped tokens</h3>
                                    <p>The place to search for and locate all tokens mapped on Polygon.</p>
                                </div>
                                <div className="choose-network-tabs">
                                    <span className="title">Choose network</span>
                                    <Nav>
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">Ethereum - Polygon Mainnet</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">Goerli - Mumbai Testnet</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                        </div>

                        <div className="container mapped-token-tab-content">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="mapped-token-table-wrapper">
                                        <div className="filter-row ff-mos">
                                            <h4>Mapped tokens</h4>
                                            <div className="left-section icn-wrap d-flex justify-content-between">
                                                <input className="custum-search w-100 me-2 " type="search" placeholder="Search Here" />
                                                <div className="search-icon-block btn btn-active black-btn ff-mos">
                                                    <SearchIcon width={20} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cmn_dasdrd_table scroll-cus">
                                            <div className="table-responsive">
                                                <table className="table table-borderless tbl-mob">
                                                    <thead>
                                                        <tr>
                                                            <th>Tokens</th>
                                                            <th>
                                                                <div class="icon-data">
                                                                    <img src="../../../assets/images/root_chain_illustration.svg" alt="" />
                                                                    <span>Root chain address</span>
                                                                </div>
                                                            </th>
                                                            <th>
                                                                <div class="icon-data">
                                                                    <img src="../../../assets/images/root_chain_illustration.svg" alt="" />
                                                                    <span>Child chain address</span>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[...Array(10)].map((item, idx) => {
                                                            return (
                                                                <tr>
                                                                    <td>TEST-UTILITY-TOKEN</td>
                                                                    <td>
                                                                        <a href="javascript:;" className="redirect-link">
                                                                            <span>0xcbee2ddec9e2c7edbf459fffedf1a0e3c151b912</span>
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <a href="javascript:;" className="redirect-link">
                                                                            <span>0x734008b560a6c89daf0977a77f7ccd5e8afe990b</span>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="cstm_pagination">
                                            <div className="pag_con">
                                                <div className="left_block">
                                                    <p>Showing 1-10 of 2830</p>
                                                </div>
                                                <div className="right_block">
                                                    <nav aria-label="Page navigation example">
                                                        <ReactPaginate
                                                            previousLabel={"Prev"}
                                                            nextLabel={"Next"}
                                                            breakLabel={"..."}
                                                            breakClassName={"break-me"}
                                                            pageCount={pageCount}
                                                            marginPagesDisplayed={2}
                                                            pageRangeDisplayed={5}
                                                            onPageChange={(e) => ChangePagination(e)}
                                                            containerClassName={"pagination"}
                                                            activeClassName={"active"}
                                                        />
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div className="mapped-token-table-wrapper">
                                        <div className="filter-row ff-mos">
                                            <h4>Mapped tokens</h4>
                                            <div className="left-section icn-wrap d-flex justify-content-between">
                                                <input className="custum-search w-100 me-2 " type="search" placeholder="Search Here" />
                                                <div className="search-icon-block btn btn-active black-btn ff-mos">
                                                    <SearchIcon width={20} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cmn_dasdrd_table scroll-cus">
                                            <div className="table-responsive">
                                                <table className="table table-borderless tbl-mob">
                                                    <thead>
                                                        <tr>
                                                            <th>Tokens</th>
                                                            <th>
                                                                <div class="icon-data">
                                                                    <img src="../../../assets/images/root_chain_illustration.svg" alt="" />
                                                                    <span>Root chain address</span>
                                                                </div>
                                                            </th>
                                                            <th>
                                                                <div class="icon-data">
                                                                    <img src="../../../assets/images/root_chain_illustration.svg" alt="" />
                                                                    <span>Child chain address</span>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[...Array(5)].map((item, idx) => {
                                                            return (
                                                                <tr>
                                                                    <td>TEST-UTILITY-TOKEN</td>
                                                                    <td>
                                                                        <a href="javascript:;" className="redirect-link">
                                                                            <span>0xcbee2ddec9e2c7edbf459fffedf1a0e3c151b912</span>
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <a href="javascript:;" className="redirect-link">
                                                                            <span>0x734008b560a6c89daf0977a77f7ccd5e8afe990b</span>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="cstm_pagination">
                                            <div className="pag_con">
                                                <div className="left_block">
                                                    <p>Showing 1-10 of 2830</p>
                                                </div>
                                                <div className="right_block">
                                                    <nav aria-label="Page navigation example">
                                                        <ReactPaginate
                                                            previousLabel={"Prev"}
                                                            nextLabel={"Next"}
                                                            breakLabel={"..."}
                                                            breakClassName={"break-me"}
                                                            pageCount={pageCount}
                                                            marginPagesDisplayed={2}
                                                            pageRangeDisplayed={5}
                                                            onPageChange={(e) => ChangePagination(e)}
                                                            containerClassName={"pagination"}
                                                            activeClassName={"active"}
                                                        />
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </div>

                    </Tab.Container>
                </div>

            </div>
        </>
    )
}

export default MappedToken;
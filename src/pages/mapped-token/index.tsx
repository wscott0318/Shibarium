import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import ReactPaginate from "react-paginate";
import { Nav } from "react-bootstrap";
import { SearchIcon } from "@heroicons/react/outline";
import { getWalletTokenList } from "app/services/apis/validator";
import * as Sentry from "@sentry/nextjs";
import { getExplorerLink } from "../../functions/explorer";
import Link from "next/link";

function MappedToken() {
  const [limit, setLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const perPage = 10;
  const [tokenCount, setTokenCount] = useState(0);
  const [tokenList, setTokenList] = useState<any>();
  const ChangePagination = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setLimit(offset);
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    try {
      getWalletTokenList().then((res) => {
        setTokenCount(res.data.message.tokens.length);
        const slice = res.data.message.tokens.slice(limit, limit + perPage);
        setTokenList(slice);
        console.log(slice);
        setPageCount(Math.ceil(res.data.message.tokens.length / perPage));
      });
    } catch (err: any) {
      Sentry.captureMessage("getTokensList", err);
    }
  }, [limit, currentPage]);

  const getLink = (chainId: number, contract: any) => {
    return getExplorerLink(chainId, contract, "address");
  };
  return (
    <>
      <div className="main-content dark-bg-800 full-vh font-up ffms-inherit">
        <div className="mapped-token-header">
          <img src="../../../assets/images/Shibarium white@2x.png" alt="" />
          <Link href="/map">
            <a className="btn primary-btn ff-mos">Map New Token</a>
          </Link>
        </div>
        <div className="bottom-pad mapped-token-wrapper">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <div className="hero-cont">
              <div className="container">
                <div className="section-title">
                  <h3>Find mapped tokens</h3>
                  <p>
                    The place to search for and locate all tokens mapped on
                    Polygon.
                  </p>
                </div>
                <div className="choose-network-tabs">
                  <span className="title">Choose network</span>
                  <Nav>
                    <Nav.Item>
                      <Nav.Link eventKey="first">Ethereum - Shibarium</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Goerli - PuppyNet</Nav.Link>
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
                        <input
                          className="custum-search w-100 me-2 "
                          type="search"
                          placeholder="Search Here"
                        />
                        <div className="search-icon-block btn btn-active black-btn ff-mos">
                          <SearchIcon width={20} />
                        </div>
                      </div>
                    </div>
                    <div className="cmn_dasdrd_table scroll-cus">
                      <div className="table-responsive table-token-list">
                        <table className="table table-borderless tbl-mob">
                          <thead>
                            <tr>
                              <th>Tokens</th>
                              <th>
                                <div className="icon-data">
                                  <img
                                    src="../../../assets/images/root_chain_illustration.svg"
                                    alt=""
                                  />
                                  <span>Root chain address</span>
                                </div>
                              </th>
                              <th>
                                <div className="icon-data">
                                  <img
                                    src="../../../assets/images/root_chain_illustration.svg"
                                    alt=""
                                  />
                                  <span>Child chain address</span>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan={3}>
                                <div className="no-found">
                                  <img src="../../assets/images/no-record.png" />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="cstm_pagination">
                      <div className="pag_con">
                        <div className="left_block">
                          <p>Showing 0 of 0</p>
                        </div>
                        <div className="right_block">
                          <nav aria-label="Page navigation example">
                            {/* <ReactPaginate
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
                            /> */}
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
                        <input
                          className="custum-search w-100 me-2 "
                          type="search"
                          placeholder="Search Here"
                        />
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
                                <div className="icon-data">
                                  <img
                                    src="../../../assets/images/root_chain_illustration.svg"
                                    alt=""
                                  />
                                  <span>Root chain address</span>
                                </div>
                              </th>
                              <th>
                                <div className="icon-data">
                                  <img
                                    src="../../../assets/images/root_chain_illustration.svg"
                                    alt=""
                                  />
                                  <span>Child chain address</span>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {tokenList?.length > 0 ? (
                              tokenList.map((token: any) => (
                                <tr key={token.parentContract}>
                                  <td>{token.key || "-"}</td>
                                  <td>
                                    <a
                                      href={getLink(5, token.parentContract)}
                                      className="redirect-link"
                                      target="_blank"
                                    >
                                      <span>{token.parentContract}</span>
                                    </a>
                                  </td>
                                  <td>
                                    <a
                                      href={getLink(5, token.childContract)}
                                      className="redirect-link"
                                      target="_blank"
                                    >
                                      <span>{token.childContract}</span>
                                    </a>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <div>No token found.</div>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="cstm_pagination">
                      <div className="pag_con">
                        <div className="left_block">
                          <p>
                            Showing {perPage * (currentPage + 1) - 9}-
                            {perPage * (currentPage + 1) > tokenCount
                              ? tokenCount
                              : perPage * (currentPage + 1)}{" "}
                            of {tokenCount}
                          </p>
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
  );
}

export default MappedToken;
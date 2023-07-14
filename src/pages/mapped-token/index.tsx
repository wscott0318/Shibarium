import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import ReactPaginate from "react-paginate";
import { Dropdown, Nav } from "react-bootstrap";
import { SearchIcon } from "@heroicons/react/outline";
import { getWalletTokenList } from "app/services/apis/validator";
import * as Sentry from "@sentry/nextjs";
import { getExplorerLink } from "../../functions/explorer";
import Link from "next/link";
import { GOERLI_CHAIN_ID, PUPPYNET_CHAIN_ID } from "app/config/constant";

function MappedToken() {
  const [limit, setLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const perPage = 10;
  const [tokenCount, setTokenCount] = useState(0);
  const [tokenList, setTokenList] = useState<any>();
  const [allTokens, setAllTokens] = useState<any>();
  const [fixedTokens, setFixedTokens] = useState<any>();
  const [filterKey, setFilterKey] = useState<any>({
    key: 0,
    value: "Show All",
  });
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
        setAllTokens(res.data.message.tokens);
        setFixedTokens(res.data.message.tokens);
        const slice = res.data.message.tokens.slice(limit, limit + perPage);
        setTokenList(slice);
        console.log(slice);
        setPageCount(Math.ceil(res.data.message.tokens.length / perPage));
        if (filterKey.key != 0) onFilter();
      });
    } catch (err: any) {
      Sentry.captureMessage("getTokensList", err);
    }
  }, [currentPage]);

  const getLink = (chainId: number, contract: any) => {
    return getExplorerLink(chainId, contract, "address");
  };

  const handleSearchToken = (key: any) => {
    try {
      if (key.length) {
        let newData = allTokens.filter(
          (item: any) =>
            `${item.parentName}`.toLowerCase().includes(key.toLowerCase()) ||
            `${item.key}`.toLowerCase().includes(key.toLowerCase()) ||
            `${item.parentContract}`
              .toLowerCase()
              .includes(key.toLowerCase()) ||
            `${item.childContract}`.toLowerCase().includes(key.toLowerCase())
        );
        setTokenList(newData);
        setPageCount(Math.ceil(newData.length / perPage));
        setTokenCount(newData.length);
      } else {
        const slice = allTokens.slice(limit, limit + perPage);
        setTokenList(slice);
        setPageCount(Math.ceil(allTokens.length / perPage));
        setTokenCount(allTokens.length);
      }
    } catch (err: any) {
      Sentry.captureMessage("handleSearchToken", err);
    }
  };

  useEffect(() => {
    onFilter();
  }, [filterKey, currentPage, limit]);

  const onFilter = () => {
    let filtered: any;
    let slice: any;
    if (filterKey.key != 0) {
      filtered = fixedTokens?.filter(
        (item: any) =>
          item.bridgetype.toLowerCase() == filterKey.value.toLowerCase()
      );
    } else {
      filtered = fixedTokens;
    }
    setTokenCount(filtered?.length);
    setPageCount(Math.ceil(filtered?.length / perPage));
    slice = filtered?.slice(limit, limit + perPage);
    setTokenList(slice);
    setAllTokens(filtered);
    if (filtered?.length < perPage * currentPage) {
      setCurrentPage(0);
      setLimit(0);
    }
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
              <div className="container container-header">
                <div className="section-title">
                  <h3>Find mapped tokens</h3>
                  <p>
                    The place to search for and locate all tokens mapped on
                    Shibarium.
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
                      <div className="left-section icn-wrap d-flex justify-content-between align-items-end">
                        <input
                          className="custum-search w-100 me-2 "
                          type="search"
                          placeholder="Search Here"
                          onChange={(e) => handleSearchToken(e.target.value)}
                        />
                        <div className=" drop-sec dropdwn-sec">
                          <label className="head-xsm fw-600" htmlFor="Auction">
                            <span className="top-low-spc pe-2 align">
                              Filter by
                            </span>
                          </label>
                          <Dropdown className="dark-dd cus-dropdown position-relative d-inline-block">
                            <i className="arrow-down"></i>
                            <Dropdown.Toggle id="dropdown-basic">
                              <span>{filterKey.value}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => {
                                  setFilterKey({ key: 0, value: "Show All" });
                                }}
                              >
                                Show All
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  setFilterKey({ key: 1, value: "Plasma" });
                                }}
                              >
                                Plasma
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  setFilterKey({ key: 2, value: "POS" });
                                }}
                              >
                                POS
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
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
                      <div className="left-section icn-wrap d-flex justify-content-between align-items-end">
                        <input
                          className="custum-search w-100 me-2 "
                          type="search"
                          placeholder="Search Here"
                          onChange={(e) => handleSearchToken(e.target.value)}
                        />
                        <div className=" drop-sec dropdwn-sec">
                          <label className="head-xsm fw-600" htmlFor="Auction">
                            <span className="top-low-spc pe-2 align">
                              Filter by
                            </span>
                          </label>
                          <Dropdown className="dark-dd cus-dropdown position-relative d-inline-block">
                            <i className="arrow-down"></i>
                            <Dropdown.Toggle id="dropdown-basic">
                              <span>{filterKey.value}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => {
                                  setFilterKey({ key: 0, value: "Show All" });
                                }}
                              >
                                Show All
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  setFilterKey({ key: 1, value: "Plasma" });
                                }}
                              >
                                Plasma
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  setFilterKey({ key: 2, value: "POS" });
                                }}
                              >
                                POS
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
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
                                      href={getLink(
                                        GOERLI_CHAIN_ID,
                                        token.parentContract
                                      )}
                                      className="redirect-link"
                                      target="_blank"
                                    >
                                      <span>{token.parentContract}</span>
                                    </a>
                                  </td>
                                  <td>
                                    <a
                                      href={getLink(
                                        PUPPYNET_CHAIN_ID,
                                        token.childContract
                                      )}
                                      className="redirect-link"
                                      target="_blank"
                                    >
                                      <span>{token.childContract}</span>
                                    </a>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={3}>
                                  <div className="no-found">
                                    <img src="../../assets/images/no-record.png" />
                                  </div>
                                </td>
                              </tr>
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
                              forcePage={currentPage}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={(e) => ChangePagination(e)}
                              containerClassName={"pagination"}
                              activeClassName={"active primary-text"}
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

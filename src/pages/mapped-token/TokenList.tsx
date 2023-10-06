import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Dropdown, Nav } from "react-bootstrap";
import { SearchIcon } from "@heroicons/react/outline";
import { GOERLI_CHAIN_ID, PUPPYNET_CHAIN_ID } from "app/config/constant";
import { getExplorerLink } from "app/functions";
import DynamicShimmer from "app/components/Shimmer/DynamicShimmer";
import Shimmer from "app/components/Shimmer/Shimmer";
import { ChainId } from "shibarium-get-chains";

const TokenList = ({
  network,
  filterKey,
  setFilterKey,
  tokenList,
  perPage,
  currentPage,
  tokenCount,
  pageCount,
  ChangePagination,
  loader,
  searchToken,
  setSearchToken,
}: any) => {
  const [chain, setChain] = useState({
    l1: GOERLI_CHAIN_ID,
    l2: PUPPYNET_CHAIN_ID,
  });

  useEffect(() => {
    if (network == "Mainnet") {
      setChain({ l1: GOERLI_CHAIN_ID, l2: PUPPYNET_CHAIN_ID });
    } else {
      setChain({ l1: ChainId.GÖRLI, l2: ChainId.PUPPYNET719 });
    }
  }, [network]);
  const getLink = (chainId: number, contract: any) => {
    return getExplorerLink(chainId, contract, "address");
  };

  return (
    <>
      <div className="mapped-token-table-wrapper">
        <div className="filter-row ff-mos">
          <h4>Mapped tokens</h4>
          <div className="left-section icn-wrap d-flex justify-content-between align-items-end">
            <input
              className="custum-search w-100 me-2 "
              type="search"
              placeholder="Search Here"
              value={searchToken}
              onChange={(e) => setSearchToken(e.target.value)}
            />
            <div className=" drop-sec dropdwn-sec">
              <label className="head-xsm fw-600" htmlFor="Auction">
                <span className="top-low-spc pe-2 align">Filter by</span>
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
            {loader ? (
              <Shimmer value={12} line={2} gap={10} />
            ) : (
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
                            href={getLink(chain.l1, token.parentContract)}
                            className="redirect-link"
                            target="_blank"
                          >
                            <span>{token.parentContract}</span>
                          </a>
                        </td>
                        <td>
                          <a
                            href={getLink(chain.l2, token.childContract)}
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
            )}
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
    </>
  );
};

export default TokenList;

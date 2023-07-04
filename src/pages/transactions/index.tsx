/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Sidebar from "../layout/sidebar";
import { useActiveWeb3React } from "app/services/web3";
import InnerHeader from "../inner-header";
import useLocalStorageState from "use-local-storage-state";
import WithdrawModal from "../components/withdraw/Withdraw";
import { BONE_ID } from "app/config/constant";
import { getBoneUSDValue } from "web3/commonFunctions";
import { getTransactions } from "pages/components/BridgeCalls";
import { ChainId } from "shibarium-get-chains";
import { getExplorerLink } from "app/functions";
import LoadingSpinner from "pages/components/Loading";
import Loader from "app/components/Loader";
import { Check } from "react-feather";
import ReactPaginate from "react-paginate";
import { Dropdown } from "react-bootstrap";

const MappedTransactions = ({ transactions, ContinueTransaction }: any) => {
  console.log("transactions in mapped Transactions ", transactions);
  return transactions?.length > 0 ? (
    transactions.map((item: any) => (
      <div key={item?.transactionHash}>
        <div className="single_trns_row">
          <div className="row trns_date">
            <div className="col-12">{item.createdAt.split("T")[0]}</div>
          </div>
          <div className="row trns_data">
            <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
              <span>
                {item.status == 0 ? (
                  <span className="transactionLoader">
                    <Loader size="22px" />
                  </span>
                ) : (
                  <span className="transactionLoader">
                    <Check />
                  </span>
                )}
              </span>
              <div>
                <b>{item?.transactionType == 1 ? "Deposit" : "Withdraw"}</b>
                <b className="grey_txt">
                  {item.createdAt.split("T")[1].split(".")[0]}
                </b>
              </div>
            </div>
            <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
              <span>
                <img
                  className="img-fluid me-2"
                  src="../../assets/images/red-bone.png"
                  alt="meta-img"
                />
              </span>
              <div>
                <b
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {item.amount} BONE
                </b>
                <b
                  className="grey_txt"
                  style={{
                    textOverflow: "ellipsis",
                    width: "45%",
                    overflow: "hidden",
                  }}
                >
                  {item.usdValue.toFixed(2)}$
                </b>
              </div>
            </div>
            <div className="col-sm-4 mb-3 mb-sm-0 cmn_data">
              <div>
                <b>Transaction hash</b>
                <p className="grey_txt trns_has_add">
                  <span
                    style={{
                      textOverflow: "ellipsis",
                      width: "45%",
                      overflow: "hidden",
                    }}
                  >
                    {item.txHash}
                  </span>
                  <a
                    href={getExplorerLink(
                      ChainId.PUPPYNET719,
                      item.txHash,
                      "transaction"
                    )}
                    target="_blank"
                  >
                    <img
                      src="../../assets/images/grey-arrow.png"
                      className="img-fluid"
                    />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {item.status == 0 && (
          <div className="cont_sec">
            <div className="row">
              <div className="col-md-6 col-lg-9 col-xs-12">
                You are {item.stepPoint} away, click continue to complete the
                transaction
              </div>
              <div className="col-md-3 col-lg-3 col-xs-12">
                <button
                  onClick={() => {
                    ContinueTransaction(item);
                  }}
                  className="btn primary-btn w-100"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    ))
  ) : (
    <div>No transaction history.</div>
  );
};
export default function Transaction() {
  const [onlyPending, setOnlyPending] = useState(false);
  const [txState, setTxState] = useLocalStorageState("txState"); //NOSONAR
  const { account } = useActiveWeb3React();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const [boneUSDValue, setBoneUSDValue] = useState(0); //NOSONAR
  const [contTransaction, setContTransaction] = useState<any>();
  const [loader, setLoader] = useState(true);
  const [filterKey, setFilterKey] = useState<string>("Show All");
  const [limit, setLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const perPage = 5;
  const handleMenuState = () => {
    setMenuState(!menuState);
  };
  const [transactions, setTransactions] = useState<any>();
  const [allTransactions, setAllTransactions] = useState<any>();
  useEffect(() => {
    getBoneUSDValue().then((res: any) => {
      setBoneUSDValue(res);
    });
  }, [account]);
  console.log("transactions", transactions);

  const ContinueTransaction = (item: object) => {
    setShowWithdrawModal(true);
    setContTransaction(item);
    setTxState(item);
  };
  useEffect(() => {
    getTransactions().then((res) => {
      console.log("res", res);
      const slice = res.slice(limit, limit + perPage);
      console.log("slice", slice);
      setTransactions(slice);
      setAllTransactions(res);
      setLoader(false);
      setPageCount(Math.ceil(res.length / perPage));
    });
  }, [txState, limit, currentPage]);
  useEffect(() => {
    if (onlyPending) {
      setTransactions(allTransactions.filter((e: any) => e.status == 0));
    } else {
      setTransactions(allTransactions);
    }
  }, [onlyPending]);

  const ChangePagination = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setLimit(offset);
    setCurrentPage(selectedPage);
  };

  const onFilter = (key: number) => {
    let filtered: any;
    if (key != 0) {
      if (onlyPending) {
        filtered = allTransactions.filter(
          (item: any) => item.transactionType == key && item.status == 0
        );
      } else {
        filtered = allTransactions.filter(
          (item: any) => item.transactionType == key
        );
      }
      setTransactions(filtered);
    } else {
      if (onlyPending) {
        filtered = allTransactions.filter((item: any) => item.status == 0);
        setTransactions(filtered);
      } else {
        setTransactions(allTransactions);
      }
    }
  };
  return (
    <>
      <main className="main-content">
        <Sidebar
          handleMenuState={handleMenuState}
          onClickOutside={() => {
            setMenuState(false);
          }}
          menuState={menuState}
        />

        {showWithdrawModal && (
          <WithdrawModal
            // transaction={contTransaction}
            page="tx"
            dWState={true}
            setWithdrawModalOpen={setShowWithdrawModal}
            show={showWithdrawModal}
            withdrawTokenInput={contTransaction?.amount}
            selectedToken={contTransaction?.token}
            boneUSDValue
          />
        )}

        <section className="assets-section">
          <div className="cmn_dashbord_main_outr">
            <InnerHeader />
            {/* transactions section start */}
            <div className="trnsc_outr">
              <h2>Transactions history</h2>
              <div className="trnsc_inr_cont">
                <div className="transaction_top_wrapper">
                  <div className="trns_top_btns_area row">
                    <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12 ">
                      <button
                        onClick={() => {
                          setOnlyPending(false);
                          setFilterKey("Show All");
                        }}
                        className="w-full"
                      >
                        <a
                          href="#"
                          className={`${
                            !onlyPending ? "primary-btn" : "white-btn"
                          } btn w-100`}
                        >
                          All Transactions
                        </a>
                      </button>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 ">
                      <button
                        onClick={() => {
                          setOnlyPending(true);
                          setFilterKey("Show All");
                        }}
                        className="w-full"
                      >
                        <a
                          href="#"
                          className={`${
                            onlyPending ? "primary-btn" : "white-btn"
                          } btn w-100`}
                        >
                          Pending
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className=" drop-sec dropdwn-sec">
                    <label className="head-xsm fw-600" htmlFor="Auction">
                      <span className="top-low-spc pe-2 align">Filter by</span>
                    </label>
                    <Dropdown className="dark-dd cus-dropdown position-relative d-inline-block">
                      <i className="arrow-down"></i>
                      <Dropdown.Toggle id="dropdown-basic">
                        <span>{filterKey}</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            setFilterKey("Show All");
                            onFilter(0);
                          }}
                        >
                          Show All
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setFilterKey("Deposit");
                            onFilter(1);
                          }}
                        >
                          Deposit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setFilterKey("Withdraw");
                            onFilter(2);
                          }}
                        >
                          Withdraw
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                {/* all transactions table start */}
                <div className="transac-data">
                  <div className="transactions_list_outr">
                    {loader ? (
                      <LoadingSpinner />
                    ) : (
                      <MappedTransactions
                        transactions={transactions}
                        ContinueTransaction={ContinueTransaction}
                      />
                    )}
                  </div>
                </div>
                {/* all transactions table ends */}

                {/* pending transactions table start */}
                {/* <div className="transactions_list_outr">
                                  
                            </div> */}
                {/* pending transactions table ends */}

                <div className="cstm_pagination">
                  <div className="pag_con">
                    <div className="left_block">
                      {/* <span>
                        <img
                          src="../../assets/images/download-icon.png"
                          className="img-fluid"
                        />
                      </span> */}
                      {/* <b>Download CSV</b> */}
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
                        {/* <ul className="pagination">
                          <li className="page-item">
                            <a
                              className={`${
                                currentPage == 1 && "disabled"
                              } page-link`}
                              onClick={decrementPagination}
                            >
                              Previous
                            </a>
                          </li>
                          {[...Array(pageCount)].map((page, i) => (
                            <li className="page-item" key={i + 1}>
                              <a
                                className="page-link"
                                onClick={() => ChangePagination(i + 1)}
                              >
                                {i + 1}
                              </a>
                            </li>
                          ))}
                          <li className="page-item">
                            <a
                              className={`${
                                currentPage == pageCount && "disabled"
                              } page-link`}
                              onClick={incrementPagination}
                            >
                              Next
                            </a>
                          </li>
                        </ul> */}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* transactions section end */}
          </div>
        </section>
      </main>
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import InnerHeader from "../inner-header";
import DelegatePopup from "../delegate-popup";
import Link from "next/link";
import LoadingSpinner from "../components/Loading";
import { validatorsList } from "../../services/apis/validator";
import { filter, orderBy } from "lodash";
import ListView from "./listView";
import ValidatorGrid from "./gridView";
import Pagination from 'app/components/Pagination'
import { useSearchFilter } from "app/hooks/useSearchFilter";

export const Allvalidator: React.FC = () => {
  const pageSize = 2;

  const [validatorsByStatus, setValidatorsByStatus] = useState<any[]>([]);
  const [allValidators, setAllValidators] = useState<any[]>([]);
  const [validators, setValidators] = useState<any[]>([]);
  const [isListView, setListView] = useState<boolean>(true);
  const [isActiveTab, setIsActiveTab] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchKey, setSearchKey] = useState<string>('')
  const [sortKey, setSortKey] = useState<string>('Random')

  const searchResult = useSearchFilter(validatorsByStatus, searchKey);

  useEffect(() => {
    const slicedList = searchResult.slice(0, pageSize)
    setValidators(slicedList)
  }, [searchResult])

  useEffect(() => {
    setLoading(true)
    validatorsList()
      .then((res) => {
        setLoading(false)
        if (res.status == 200) {
          setAllValidators(res.data.data.validatorsList);
          const activeList = filter(
            res.data.data.validatorsList,
            (e) => e.status === 1
          );
          const slicedList = activeList.slice(0, pageSize)
          setValidators(slicedList)
          setValidatorsByStatus(activeList);
        }
      })
      .catch((err) => {
        setLoading(false)
      });
  }, []);
  useEffect(() => {
    const activeStatus = 1;
    let filtered = []
    if (isActiveTab) {
      filtered = allValidators.filter(e => e.status === activeStatus)
    } else {
      filtered = allValidators.filter(e => e.status !== activeStatus)
    }
    setValidatorsByStatus(filtered)
  }, [isActiveTab]);

  const pageChangeHandler = (index: number) => {
    console.log(index)
    const slicedList = validatorsByStatus.slice((index - 1) * pageSize, (index * pageSize))
    setValidators(slicedList)
    setCurrentPage(index)

  }
  const onSort = (key: string, column: string,type:string) => {
    setSortKey(key)
    const sortedList = orderBy(validators, column, 'asc');
    setValidators(sortedList)

  }
  return (
    <>
      <div className="page-wrapper">
        {loading && <LoadingSpinner />}
        <InnerHeader />
        <main className="delegator-sec">
          <div className="botom-space-lg">
            <div className="black_clr_box position-relative sec-spc-high">
              <div className="char-block">
                <img
                  width="655"
                  height="262"
                  className="img-fluid"
                  src="../../assets/images/meaoth.png"
                  alt=""
                />
              </div>
              <div className="container">
                <div className="row">
                  <div className="text-center col-sm-8 text-sm-start">
                    <h1 className="mb-2 light-text mb-sm-3 fnt-58 fnt-100">
                      All Validators
                    </h1>
                    <div className="">
                      <Link href="./become-validator">
                        <a className="btn gradient_btn" title="">
                          <span>Become A Validator</span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="d-flex align-items-center btns-space">
              <div className="me-3">
                <a
                  href="javascript:void(0);"
                  className={`btn black-btn ${isActiveTab ? 'btn-active' : ''}`}
                  title="" onClick={() => { setIsActiveTab(true) }}>
                  <span>ACTIVE</span>
                </a>
              </div>
              <div>
                <a
                  href="javascript:void(0);"
                  className={`btn black-btn ${!isActiveTab ? 'btn-active' : ''}`}
                  title="" onClick={() => { setIsActiveTab(false) }}>
                  <span>INACTIVE</span>
                </a>
              </div>
            </div>
            <div className="filter-sec">
              <div className="row align-items-center">
                <div className="mb-4 col-lg-5 col-12 mb-sm-4 mb-lg-0">
                  <div className="search-box d-inline-block position-relative w-100">
                    <input
                      className="cus-search w-100"
                      type="text"
                      placeholder="Search by validator name, owner or signer address"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    ></input>
                    <img
                      width="15"
                      height="15"
                      className="img-fluid"
                      src="../../assets/images/search.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-7 col-12 text-end mob-filter">
                  <div className="d-inline-block pe-0 pe-sm-4 mob-filter">
                    <label className="head-xsm fw-600" htmlFor="Auction">
                      <span className="top-low-spc pe-2 align">
                        Show Auction Only
                      </span>
                    </label>
                    <label className="switch align">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="d-inline-block pe-4 pe-sm-4">
                    <label className="head-xsm fw-600" htmlFor="Auction">
                      <span className="top-low-spc pe-2 align">Sort by</span>
                    </label>
                    <Dropdown className="cus-dropdown position-relative d-inline-block">
                      <i className="arrow down"></i>
                      <Dropdown.Toggle id="dropdown-basic">
                        <span>{sortKey}</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onSort('Random', 'name','string')}>Random</Dropdown.Item>
                        <Dropdown.Item onClick={() => onSort('Commission', 'commissionRate','number')}>Commission</Dropdown.Item>
                        <Dropdown.Item onClick={() => onSort('Voting Power', 'stakeAmount','number')}>
                          Voting Power
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onSort('Uptime', 'uptime','number')}>
                          Uptime
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="d-inline-flex">
                    <div
                      title=""
                      className={`view-blk me-2 ${!isListView ? "view-active" : ""
                        }`}
                      onClick={() => setListView(false)}>
                      <img
                        className="grey-image"
                        src="../../assets/images/grid-grey.png"
                        width={26}
                        height={19}
                        alt=""></img>
                      <img
                        className="white-image"
                        src="../../assets/images/grid-white.png"
                        width={26}
                        height={19}
                        alt=""></img>
                    </div>
                    <div
                      title=""
                      className={`view-blk ${isListView ? "view-active" : ""}`}
                      onClick={() => setListView(true)}>
                      <img
                        className="grey-image"
                        src="../../assets/images/list-grey.png"
                        width={26}
                        height={19}
                        alt=""></img>
                      <img
                        className="white-image"
                        src="../../assets/images/list-white.png"
                        width={26}
                        height={19}
                        alt=""></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="mb-3 fw-700">
                Here is a list of active Validators
              </h4>
            </div>
          </div>
          {isListView ? (
            <ListView validatorsList={validators} />
          ) : (
            <div className="grid-view-wrap">
              <ValidatorGrid validatorsList={validators} />
            </div>
          )}
          <div className="container">
            <Pagination onPageChange={pageChangeHandler} pageSize={pageSize} totalCount={validatorsByStatus.length || 1} currentPage={currentPage} />
          </div>
          <footer className="main-footer">
            <div className="container">
              <div className="mt-4 copyright mt-lg-5">
                <h3 className="mb-0 text-center fwb">Powered by xFund.</h3>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

export default Allvalidator;
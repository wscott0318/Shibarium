import { useSearchFilter } from 'app/hooks/useSearchFilter'
import { validatorsList } from 'app/services/apis/validator'
import { filter, orderBy } from 'lodash';
import { Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import ListView from './listView';
import ValidatorGrid from './gridView';
import Pagination from 'app/components/Pagination';
import LoadingSpinner from 'pages/components/Loading';
// @ts-ignore
import { ShimmerTitle, ShimmerTable } from "react-shimmer-effects";
import { queryProvider } from 'Apollo/client';
import { allValidatorsQuery } from 'Apollo/queries';
import * as Sentry from '@sentry/nextjs'
import { inActiveCount } from 'web3/commonFunctions';
import { useRouter } from 'next/router';
import { LockClosedIcon, SearchIcon, XCircleIcon } from '@heroicons/react/outline';
import { useUserType } from 'app/state/user/hooks';

const Valitotors: React.FC<any> = ({ withStatusFilter }: { withStatusFilter: boolean }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [validatorsByStatus, setValidatorsByStatus] = useState<any[]>([]);
  const [allValidators, setAllValidators] = useState<any[]>([]);
  const [validators, setValidators] = useState<any[]>([]);
  const [isListView, setListView] = useState<boolean>(true);
  const [isActiveTab, setIsActiveTab] = useState<boolean>(true);
  const [searchKey, setSearchKey] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('Uptime');
  const [userType, setUserType] = useUserType()
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  const fetchValList = async () => {
    setLoading(false)
    await validatorsList(searchKey, requestOptions)
      .then((res: any) => {
        // console.log("res => ", res);
        setLoading(false)
        if (res.status == 200) {
          let activeList: any;
          setAllValidators(res.data.validatorsList);
          if (searchKey != "") {
            if (isActiveTab) {
              activeList = filter(
                res.data.validatorsList,
                (e) => e.uptimePercent !== 0
              );
            }
            else {
              activeList = filter(
                res.data.validatorsList,
                (e) => e.uptimePercent == 0
              );
            }
          }
          else {
            setAllValidators(res.data.data.validatorsList);
            activeList = filter(
              res.data.data.validatorsList,
              (e) => e.uptimePercent !== 0
            );
          }
          setValidatorsByStatus(activeList);
          setValidators(activeList);
        }
      })
      .catch((err: any) => {
        setLoading(false)
      });
  }

  useEffect(() => {
    if (searchKey == "") fetchValList();
  }, [searchKey]);

  const filterValidators = () => {
    let filtered = []
    if (isActiveTab) {
      if (userType == "Delegator") {
        filtered = allValidators.filter(e => e.uptimePercent >= inActiveCount).sort((a: any, b: any) => {
          if ((a.fundamental != 1) > (b.fundamental != 1)) return -1
          return 0;
        }
        )
      }
      else{
        filtered = allValidators.filter(e => e.uptimePercent >= inActiveCount)
      }
    } else {
      filtered = allValidators.filter(e => e.uptimePercent <= inActiveCount)
    }
    setValidators(filtered)
  }

  useEffect(() => {
    filterValidators();
  }, [isActiveTab, allValidators]);

  useEffect(() => {
    onSort('Uptime', 'uptimePercent', 'number');
  }, [])
  const onSort = (key: string, column: string, type: string) => {
    try {
      setSortKey(key)
      let sortedList;
      if (type === 'number') {
        sortedList = validators.sort((a: any, b: any) => Number(b[column]) - Number(a[column]))
        // console.log("sorted list", sortedList);
      } else {
        if (userType == "Delegator") {
          sortedList = orderBy(validators, column, 'asc').sort((a: any, b: any) => {
            if ((a.fundamental != 1) > (b.fundamental != 1)) return -1
            return 0;
          })
        }
        else {
          console.log(userType, " ====> usertype");
          sortedList = orderBy(validators, column, 'asc');
        }
      }
      setValidators(sortedList)
    }
    catch (err: any) {
      Sentry.captureMessage("onSort", err);
    }
  }

  // useEffect(() => {
  //   validatorsList(searchKey , requestOptions)
  //   .then((res:any) => {
  //       if (res.status == 200) {
  //         console.log("res " , res.data.validatorsList);
  //         if(isActiveTab){
  //           let activeList = filter(
  //             res.data.validatorsList,
  //             (e) => e.uptimePercent !== 0
  //           );
  //           setValidators(activeList);
  //         }
  //         else{
  //           let inactiveList = filter(
  //             res.data.validatorsList,
  //             (e) => e.uptimePercent == 0
  //           );
  //           setValidators(inactiveList);
  //         }

  //       }
  //     })
  //     .catch((err: any) => {
  //       setLoading(false)
  //     });
  // }, [searchKey])
  return (
    <>

      {loading && <LoadingSpinner />}
      <section className="pb-4 table-section pb-lg-5 active-inactive">
        <div className="container">
          <div className="heading-sec">
            <h2 className="sub-head ff-mos">{router.asPath.split("/")[1] === "migrate-stake" ? "" : "All Validators"}</h2>
          </div>

          <div className="d-flex align-items-center btns-space tab-btns">
            <div className="me-3">
              <p onClick={() => setIsActiveTab(true)} className={`btn black-btn ff-mos ${isActiveTab ? "btn-active" : ""}`} title="">
                <span>Active</span>
              </p>
            </div>
            <div>
              <p onClick={() => setIsActiveTab(false)} className={`btn black-btn ff-mos ${!isActiveTab ? "btn-active" : ""}`} title="">
                <span>Inactive</span>
              </p>
            </div>
          </div>
          <div className="filter-row ff-mos">
            <div className="left-section icn-wrap d-flex justify-content-between">
              <input
                className="custum-search w-100 me-2 "
                type="search "
                placeholder="Search By Validator Name or Validator Address"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <div className={`search-icon-block btn btn-active black-btn ff-mos ${!searchKey && "disabled"}`} onClick={() => fetchValList()}><SearchIcon width={20} /></div>
              {searchKey ? <div className='icon-block custom-icon-block' onClick={() => setSearchKey("")}><XCircleIcon width={20} color={'black'} /></div> : null}
            </div>
            <div className="right-section">
              {/* <div className="switch-sec">
                  <span className="help-txt fw-600">Show Action Only</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div> */}
              <div className=" drop-sec dropdwn-sec">
                <label className="head-xsm fw-600" htmlFor="Auction">
                  <span className="top-low-spc pe-2 align">Sort by</span>
                </label>
                <Dropdown className="dark-dd cus-dropdown position-relative d-inline-block">
                  <i className="arrow-down"></i>
                  <Dropdown.Toggle id="dropdown-basic">
                    <span>{sortKey}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* <Dropdown.Item onClick={() => onSort('Random', 'name','string')}>Random</Dropdown.Item> */}
                    <Dropdown.Item onClick={() => onSort('Commission', 'commissionrate', 'number')}>Commission</Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort('Staked Amount', 'totalstaked', 'number')}>Staked Amount</Dropdown.Item>
                    {/* <Dropdown.Item onClick={() => onSort('Voting Power', 'totalstaked','number')}>
                          Voting Power
                        </Dropdown.Item> */}
                    <Dropdown.Item className="ff-mos" onClick={() => onSort('Uptime', 'uptimePercent', 'number')}>
                      Uptime
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="layout-sec">
                <div onClick={() => setListView(true)} className={isListView ? "list blk-active" : "list"}>
                  <p className="mb-0"><img className="white-icon" src="../../assets/images/list-white.png" /></p>
                  <p className="mb-0"><img className="grey-icon" src="../../assets/images/list-grey.png" /></p>
                </div>
                <div onClick={() => setListView(false)} className={!isListView ? "cus-grid blk-active" : "cus-grid"}>
                  <p className="mb-0"><img className="white-icon" src="../../assets/images/grid-white.png" /></p>
                  <p className="mb-0"><img className="grey-icon" src="../../assets/images/grid-grey.png" /></p>
                </div>
              </div>
            </div>
          </div>
          {isListView ? (
            <ListView migrateData={{}} loading={loading} searchKey={searchKey} validatorsList={validators} />
          ) : (
            <div className="grid-view-wrap">
              <ValidatorGrid migrateData={{}} searchKey={searchKey} validatorsList={validators} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Valitotors
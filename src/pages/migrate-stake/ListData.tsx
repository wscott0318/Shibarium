
import { migrateValidatorsList, validatorsList } from 'app/services/apis/validator'
import { filter, orderBy } from 'lodash';
import { Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useUserType, useMigrateStake } from 'app/state/user/hooks';
import ListView from '../all-validator/listView/index';
import GridView from '../all-validator/gridView/index';
import Pagination from 'app/components/Pagination';
import LoadingSpinner from 'pages/components/Loading';
import * as Sentry from '@sentry/nextjs'
import { inActiveCount, web3Decimals } from 'web3/commonFunctions';
import { useRouter } from 'next/router';
import { useActiveWeb3React } from 'app/services/web3';
import { SearchIcon, XCircleIcon } from '@heroicons/react/outline';


const ListData: React.FC<any> = ({ withStatusFilter }: { withStatusFilter: boolean }) => {
  const { chainId = 1 } = useActiveWeb3React();
  const pageSize = 10;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingVal, setLoadingVal] = useState<boolean>(true);
  const [validatorsByStatus, setValidatorsByStatus] = useState<any[]>([]);
  const [allValidators, setAllValidators] = useState<any[]>([]);
  const [validators, setValidators] = useState<any[]>([]);
  const [isListView, setListView] = useState<boolean>(true);
  const [isActiveTab, setIsActiveTab] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKey, setSearchKey] = useState<string>('');
  const [userType, setUserType] = useUserType()
  const [sortKey, setSortKey] = useState<string>('Uptime');
  const migrateData = useMigrateStake();
  // @ts-ignore
  const balance = migrateData?.data;
  // useEffect(() => {
  //   const slicedList = searchResult.slice(0, pageSize).sort((a: any, b: any) => +(b.uptimePercent) - +(a.uptimePercent))
  //   const sortAgain = slicedList.slice(0, pageSize).sort((a: any, b: any) => +(b.totalStaked) - +(a.totalStaked))
  //   setValidators(sortAgain)
  // }, [searchResult])
  useEffect(() => {
    if (userType != "Delegator") {
      router.push('/bone-staking')
    }
  }, [userType])
  // useEffect(() => {
  //   if(isActiveTab){
  //     let newData = allValidators.filter((x:any) => x.uptimePercent > 0)
  //     console.log(newData)
  //     setValidators(newData)
  //   } else {
  //     let newData = allValidators.filter((x:any) => x.uptimePercent <= 0)
  //     console.log(newData)
  //     setValidators(newData)
  //   }

  // },[isActiveTab])

  // console.log(allValidators, "list ")
  const getMigrateValidators = async () => {
    setLoading(false);
    try {
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      await migrateValidatorsList(searchKey, requestOptions)
        .then((res: any) => {
          setLoading(false)
          setLoadingVal(false);
          console.log("res => " , res);
          if (res.status == 200) {
            setAllValidators(res.data.validatorsList);
            let activeList :any;
            if (searchKey != "") {
              activeList = filter(
                res.data.validatorsList,
                (e) => e.uptimePercent !== 0
              );
            }
            else {
              setAllValidators(res.data.validatorsList);
              activeList = filter(
                res.data.validatorsList,
                (e) => e.uptimePercent !== 0
              );
            }
            if (withStatusFilter) {
              setValidatorsByStatus(activeList);
              const slicedList = activeList.slice(0, pageSize)
              setValidators(slicedList);
            }
          }
        })
        .catch((err: any) => {
          setLoading(false)
          setLoadingVal(false);
        });
    } catch (err: any) {
      Sentry.captureMessage("fetchValList", err);
      setLoading(false)
      setLoadingVal(false);
    }
  }
  useEffect(() => {
    if(searchKey == "" ) getMigrateValidators();
  }, [searchKey]);

  useEffect(() => {
    let filtered = []
    if (isActiveTab) {
      filtered = allValidators.filter(e => e.uptimePercent >= inActiveCount)
    } else {
      filtered = allValidators.filter(e => e.uptimePercent <= inActiveCount)
    }
    setValidatorsByStatus(filtered)
  }, [isActiveTab, allValidators]);

  const pageChangeHandler = (index: number) => {
    // console.log(index)
    try {
      const slicedList = validatorsByStatus.slice((index - 1) * pageSize, (index * pageSize))
      setValidators(slicedList)
      setCurrentPage(index)
    }
    catch (err: any) {
      Sentry.captureMessage("pageChangeHandler", err);
    }
  }
  const onSort = (key: string, column: string, type: string) => {
    try {
      setSortKey(key)
      let sortedList;
      if (type === 'number') {
        sortedList = validators;
        sortedList.sort((a: any, b: any) => {
          return (Number(b[column]) - Number(a[column]))
        })
      } else {
        sortedList = orderBy(validators, column, 'asc');

      }
      setValidators(sortedList)
    }
    catch (err: any) {
      Sentry.captureMessage("onSort", err);
    }
  }

  return (
    <>

      {loading && <LoadingSpinner />}
      <section className="table-section pb-4 pb-lg-5 active-inactive">
        <div className="container">
          <div className="heading-sec">
            <h2 className="sub-head ff-mos">Migrate Your Stake</h2>
          </div>
          <div className='infrm-sec'>
            <div className='text-center'>
              <h3>Choose New Validator</h3>
              <p>Migrate your stake to a new validator from Bone Foundation Nodes. </p>
            </div>
            <div className='block-info'>
              <div className=' row'>
                <div className='bl-lft col-md-6'>
                  <p className='txt-xsm mb-0'>Stake to move</p>
                  <div className='txt-sm'>{balance?.stake != "undefined" ? balance?.stake : "0.00"} BONE</div>
                </div>
                <div className='bl-rt col-md-6'>
                  <p className='txt-xsm mb-0'>Added Rewards to your wallet</p>
                  <div className='txt-sm'>{balance?.migrateData?.reward > 0 ? (parseInt('' + (+(balance?.migrateData?.reward) / 10 ** web3Decimals * 100)) / 100) : "0.00"} BONE</div>
                </div>
              </div>
            </div>
          </div>
          {balance?.migrateData ? null : <div className="d-flex align-items-center btns-space tab-btns">
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
          </div>}
          <div className="filter-row ff-mos">
          <div className="left-section icn-wrap d-flex justify-content-between">
              <input
                className="custum-search w-100 me-2 "
                type="search "
                placeholder="Search By Validator Name or Validator Address"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <div className={`search-icon-block btn btn-active black-btn ff-mos ${!searchKey && "disabled"}`} onClick={() => getMigrateValidators()}><SearchIcon width={20} /></div>
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
            <ListView migrateData={balance.migrateData} loading={loadingVal} searchKey={searchKey} validatorsList={validators} />
          ) : (
            <div className="grid-view-wrap">
              <GridView migrateData={balance.migrateData} loading={loadingVal} searchKey={searchKey} validatorsList={validators} />
            </div>
          )}
          {isListView && validatorsList.length ? <div className='mt-sm-4 mt-3'>
            <Pagination onPageChange={pageChangeHandler} pageSize={pageSize} totalCount={validatorsByStatus.length || 1} currentPage={currentPage} />
          </div> : null
          }
        </div>
      </section>
    </>
  )
}

export default ListData
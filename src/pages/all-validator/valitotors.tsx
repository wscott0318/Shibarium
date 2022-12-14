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


const Valitotors: React.FC<any> = ({ withStatusFilter }: { withStatusFilter: boolean }) => {
  const pageSize = 10;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [validatorsByStatus, setValidatorsByStatus] = useState<any[]>([]);
  const [allValidators, setAllValidators] = useState<any[]>([]);
  const [validators, setValidators] = useState<any[]>([]);
  const [isListView, setListView] = useState<boolean>(true);
  const [isActiveTab, setIsActiveTab] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKey, setSearchKey] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('Uptime');

  const searchResult = useSearchFilter(validatorsByStatus, searchKey.trim());

  useEffect(() => {
    const slicedList = searchResult.slice(0, pageSize).sort((a: any, b: any) => parseInt(b.uptimePercent) - parseInt(a.uptimePercent))
    const sortAgain = slicedList.slice(0, pageSize).sort((a: any, b: any) => parseInt(b.totalStaked) - parseInt(a.totalStaked))
    setValidators(sortAgain)

  }, [searchResult])
  // console.log("validatorsByStatus",validatorsByStatus)

  // console.log("searchResult",searchResult)

  const fetchValidators = async () => {
    try {
      const validators = await queryProvider.query({
        query: allValidatorsQuery(),
      })
    }
    catch (err: any) {
      Sentry.captureMessage("fetchValidators", err);
    }

    // console.log(validators, " graphQL query ==== >")
  }

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

  useEffect(() => {
    setLoading(false)
    validatorsList()
      .then((res: any) => {
        setLoading(false)
        if (res.status == 200) {
          setAllValidators(res.data.data.validatorsList);
          // console.log(res.data.data.validatorsList);
          var activeList = filter(
            res.data.data.validatorsList,
            (e) => e.uptimePercent !== 0
          );
          // console.log(activeList)
          if (withStatusFilter) {
            setValidatorsByStatus(activeList);
            const slicedList = activeList.slice(0, pageSize)
            setValidators(slicedList)
          } else {
            setValidatorsByStatus(activeList);
            const slicedList = activeList.slice(0, pageSize)
            setValidators(slicedList)
          }
        }
      })
      .catch((err: any) => {
        setLoading(false)
      });

    fetchValidators();
  }, []);

  useEffect(() => {
    let filtered = []
    if (isActiveTab) {
      filtered = allValidators.filter(e => e.uptimePercent >= inActiveCount)
    } else {
      filtered = allValidators.filter(e => e.uptimePercent <= inActiveCount)
    }
    // console.log("all validators ", filtered);
    setValidatorsByStatus(filtered)
  }, [isActiveTab , allValidators]);

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
        sortedList = validators.sort((a: any, b: any) => {
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
              <h2 className="sub-head ff-mos">{router.asPath.split("/")[1]==="migrate-stake" ? "" : "All Validators"}</h2>
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
              <div className="left-section icn-wrap">
                <input
                 className="custum-search w-100" 
                 type="search " 
                 placeholder="Search by validator name"
                 value={searchKey}
                 onChange={(e) => setSearchKey(e.target.value)}
                 />
                 {searchKey?<div className='icon-block' onClick={()=>setSearchKey("")}><img className="white-icon img-fluid" src="../../assets/images/cross-icon.png" /></div> : null}
                 
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
                    <Dropdown.Item onClick={() => onSort('Self', 'selfpercent', 'number')}>Self</Dropdown.Item>
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
            <ListView loading={loading} searchKey={searchKey} validatorsList={validators} />
          ) : (
            <div className="grid-view-wrap">
              <ValidatorGrid searchKey={searchKey} validatorsList={validators} />
            </div>
          )}
          {isListView && validatorsList.length ? <div className='mt-sm-4 mt-3'>
            <Pagination onPageChange={pageChangeHandler} pageSize={pageSize} totalCount={searchKey ? searchResult.length : validatorsByStatus.length || 1} currentPage={currentPage} />
          </div> : null
          }
        </div>
      </section>
    </>
  )
}

export default Valitotors
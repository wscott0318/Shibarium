import { useSearchFilter } from 'app/hooks/useSearchFilter'
import { validatorsList } from 'app/services/apis/validator'
import { filter, orderBy } from 'lodash';
import { Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import ListView from './listView';
import ValidatorGrid from './gridView';
import Pagination from 'app/components/Pagination';
import LoadingSpinner from 'pages/components/Loading';

const Valitotors:React.FC<any>= ({withStatusFilter}:{withStatusFilter:boolean}) => {
    const pageSize = 4;

    const [loading, setLoading] = useState<boolean>(true);
    const [validatorsByStatus, setValidatorsByStatus] = useState<any[]>([]);
    const [allValidators, setAllValidators] = useState<any[]>([]);
    const [validators, setValidators] = useState<any[]>([]);
    const [isListView, setListView] = useState<boolean>(true);
    const [isActiveTab, setIsActiveTab] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchKey, setSearchKey] = useState<string>('');
    const [sortKey, setSortKey] = useState<string>('Random');
  
    const searchResult = useSearchFilter(validatorsByStatus, searchKey);
  
    useEffect(() =>{
      const slicedList = searchResult.slice(0, pageSize).sort((a:any, b:any)=> b.stakeAmount - a.stakeAmount)
      setValidators(slicedList)
    }, [searchResult])
  
    useEffect(() => {
      setLoading(true)
      validatorsList()
        .then((res) => {
          setLoading(false)
          if (res.status == 200) {
            setAllValidators(res.data.data.validatorsList);
            if (withStatusFilter ) {
                const activeList = filter(
                  res.data.data.validatorsList,
                  (e) => e.upTime !== 0
                );
                setValidatorsByStatus(activeList);
                const slicedList = activeList.slice(0, pageSize)
                setValidators(slicedList)
            }else{
                setValidatorsByStatus(res.data.data.validatorsList);
                const slicedList = res.data.data.validatorsList.slice(0, pageSize)
                setValidators(slicedList)
            }
          }
        })
        .catch((err) => {
          setLoading(false)
        });
    }, []);
    useEffect(() => {
      let filtered = []
      if (isActiveTab) {
        filtered = allValidators.filter(e => e.upTime !== 0)
      } else {
        filtered = allValidators.filter(e => e.upTime === 0)
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
      let sortedList;
      if (type === 'number') {
         sortedList = validators.sort((a:any, b:any)=>{
          return( Number(b[column]) - Number( a[column]))
        })
      }else{
        sortedList = orderBy(validators, column, 'asc');
  
      }
      setValidators(sortedList)
    }
  return (
    <div>

        {loading && <LoadingSpinner />}
         {withStatusFilter && <div className="d-flex align-items-center btns-space">
              <div className="me-3">
                <a
                  href="#!;"
                  className={`btn black-btn ${isActiveTab ? 'btn-active' : ''}`}
                  title="" onClick={() => { setIsActiveTab(true) }}>
                  <span>ACTIVE</span>
                </a>
              </div>
              <div>
                <a
                  href="#!;"
                  className={`btn black-btn ${!isActiveTab ? 'btn-active' : ''}`}
                  title="" onClick={() => { setIsActiveTab(false) }}>
                  <span>INACTIVE</span>
                </a>
              </div>
            </div>}
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
                <div className="col-lg-7 col-12 text-lg-end mob-filter">
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
                    <Dropdown className="dark-dd cus-dropdown position-relative d-inline-block">
                      <i className="arrow down"></i>
                      <Dropdown.Toggle id="dropdown-basic">
                        <span>{sortKey}</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onSort('Random', 'name','string')}>Random</Dropdown.Item>
                        <Dropdown.Item onClick={() => onSort('Commission', 'commissionPercent','number')}>Commission</Dropdown.Item>
                        <Dropdown.Item onClick={() => onSort('Self', 'selfPercent','number')}>Self</Dropdown.Item>
                        <Dropdown.Item onClick={() => onSort('Voting Power', 'totalStaked','number')}>
                          Voting Power
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onSort('Uptime', 'uptimePercent','number')}>
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
                        src="../../assets/images/grid-white.png"
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
            <div className="mt-4 mb-3">
              <h4 className="mb-0 fw-700">
                Here is a list of active Validators
              </h4>

            </div>
          {isListView ? (
            <ListView validatorsList={validators} />
          ) : (
            <div className="grid-view-wrap">
              <ValidatorGrid validatorsList={validators} />
            </div>
          )}
          <Pagination onPageChange={pageChangeHandler} pageSize={pageSize} totalCount={searchKey ? searchResult.length : validatorsByStatus.length || 1} currentPage={currentPage} />
    </div>
  )
}

export default Valitotors
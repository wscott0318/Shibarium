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
    const [sortKey, setSortKey] = useState<string>('Uptime');
  
    const searchResult = useSearchFilter(validatorsByStatus, searchKey.trim());
  
    useEffect(() =>{
      const slicedList = searchResult.slice(0, pageSize).sort((a:any, b:any)=> parseInt(b.uptimePercent) - parseInt(a.uptimePercent))
      const sortAgain = slicedList.slice(0, pageSize).sort((a:any, b:any) => parseInt(b.totalStaked) - parseInt(a.totalStaked))
      setValidators(sortAgain)
    }, [searchResult])
  
    console.log(validators)

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

    useEffect(() => {
      setLoading(true)
      validatorsList()
        .then((res) => {
          setLoading(false)
          if (res.status == 200) {
            setAllValidators(res.data.data.validatorsList);
            // console.log(res.data.data.validatorsList);
            var activeList = filter(
              res.data.data.validatorsList,
              (e) => e.uptimePercent !== 0
            );
            console.log(activeList)
            if (withStatusFilter) {
                setValidatorsByStatus(activeList);
                const slicedList = activeList.slice(0, pageSize)
                setValidators(slicedList)
            }else{
                setValidatorsByStatus(activeList);
                const slicedList = activeList.slice(0, pageSize)
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
        filtered = allValidators.filter(e => e.uptimePercent !== 0)
      } else {
        filtered = allValidators.filter(e => e.uptimePercent === 0)
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
   <>
   <h1>all-validatos validators</h1>
   </>
  )
}

export default Valitotors
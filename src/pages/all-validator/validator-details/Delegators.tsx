import Pagination from 'app/components/Pagination';
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
interface Props{
    allDelegators:any[];
    boneUsdValue:number;
}
const Delegators:React.FC<Props> = ({ allDelegators,boneUsdValue }) => {
    const pageSize = 4;
    const [delegators, setDelegators] = useState<any[]>([]);
    const [pageIndex, setPageIndex] = useState(1)
    useEffect(() => {
        if (allDelegators) {
            setDelegators(allDelegators.slice(0,pageSize))
        }
    }, [allDelegators])

    const pageChangeHandler = (index: number) => {
        const slicedList = allDelegators.slice((index - 1) * pageSize, (index * pageSize))
        setDelegators(slicedList)
        setPageIndex(index)
    }
    return (
        <>
        <h1>validator-details delegators</h1>
        </>
    )
}

export default Delegators
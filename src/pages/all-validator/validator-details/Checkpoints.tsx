import Pagination from 'app/components/Pagination';
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import TimeAgo from 'timeago-react';

interface Props{
    allCheckpoints:any[];
    boneUsdValue:number;
}
const Checkpoints:React.FC<Props> = ({ allCheckpoints,boneUsdValue }) => {
    const pageSize = 20;
    const [checkpoints, setCheckpoints] = useState<any[]>([]);
    const [pageIndex, setPageIndex] = useState(1)
    useEffect(() => {
        if (allCheckpoints) {
            setCheckpoints(allCheckpoints.slice(0, pageSize))
        }
    }, [allCheckpoints])

    const pageChangeHandler = (index: number) => {
        const slicedList = allCheckpoints.slice((index - 1) * pageSize, (index * pageSize))
        setCheckpoints(slicedList)
        setPageIndex(index)
    }
    return (
        <>
        <h1>validators-details checkpoints</h1>
        </>
    
    )
}

export default Checkpoints
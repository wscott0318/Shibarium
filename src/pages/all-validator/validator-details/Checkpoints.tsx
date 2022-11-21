import Pagination from 'app/components/Pagination';
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import TimeAgo from 'timeago-react';

interface Props {
    allCheckpoints: any[];
    boneUsdValue: number;
}
const Checkpoints: React.FC<Props> = ({ allCheckpoints, boneUsdValue }) => {
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
            <div className="h-auto p-4 mb-4 cus-card mb-lg-5">

                <h3 className="mb-2 mb-sm-4">Checkpoints</h3>
                <div className="cmn_dasdrd_table cmn-tb">
                    <div className="table-responsive">
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>Checkpoint</th>
                                    <th>Start block number</th>
                                    <th>End block number</th>
                                    <th>Result</th>
                                    <th className=''><div className='tb-txt'>Time</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkpoints.map((checkpoint: any, i: any) =>
                                    <tr>
                                        <td>
                                            <NumberFormat displayType='text' thousandSeparator value={checkpoint.checkpointNumber} />
                                        </td>
                                        <td>{checkpoint.startBlock}</td>
                                        <td>{checkpoint.endBlock}</td>
                                        <td><span><img src="../../assets/images/green-tick2.png"></img></span>
                                            <span>
                                                {checkpoint.signed ? 'Success' : 'Not completed'}
                                            </span></td>
                                        <td><TimeAgo datetime={checkpoint.timestamp * 1000} /></td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='mt-sm-4 mt-3'><Pagination onPageChange={pageChangeHandler} pageSize={pageSize} totalCount={allCheckpoints.length || 1} currentPage={pageIndex} /></div>
            </div>
        </>

    )
}

export default Checkpoints
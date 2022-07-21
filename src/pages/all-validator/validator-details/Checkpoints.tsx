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
    const pageSize = 4;
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
        <div className="h-auto p-4 cus-card">
        <div className="table-data-tab">
            <h3 className='mb-3 mb-lg-4'>Transactions</h3>
            <div className="btn-nav">
                <Nav variant="pills" defaultActiveKey="/firts-tab">
                    <Nav.Item>
                        <Nav.Link className='active'><span className='trs-2'>Transactions L1</span></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1"><span className='trs-2'>Transactions L2</span></Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div className="mb-4 table-wrap table-responsive mb-lg-5">
                <table className="table">
                    <thead>
                        <tr className="table-header">
                            <th>Checkpoint</th>
                            <th>Start block number</th>
                            <th>End block number</th>
                            <th>Result</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                        <tbody>
                            {
                                checkpoints.map((checkpoint: any) => {
                                    return (
                                        <tr>
                                            <td>
                                                <NumberFormat displayType='text' thousandSeparator value={checkpoint.checkpointNumber} />
                                            </td>
                                            <td>
                                                <span className="tb-data align">{checkpoint.startBlock} </span>
                                            </td>
                                            <td>
                                                <span className="tb-data align">{checkpoint.endBlock} </span>
                                            </td>
                                            <td>
                                                <span className="tb-data align d-flex align-items-center">
                                                    <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" color="#999999" aria-hidden="true">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                                        </path>
                                                    </svg>
                                                    <span>{checkpoint.signed? 'Success': 'Not completed'}</span>
                                                </span>
                                            </td>
                                            <td>
                                                <span className="tb-data align">
                                                <TimeAgo datetime={checkpoint.timestamp*1000} />

                                                </span>
                                            </td>
                                        </tr>)
                                }
                                )}

                        </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Pagination onPageChange={pageChangeHandler} pageSize={pageSize} totalCount={allCheckpoints.length || 1} currentPage={pageIndex} />
                    {/* <div className="cus-pagination">
                        <ul className="pagination justify-content-end">
                            <li className="page-item"><a className="page-link" href="#"><span>Previous</span></a></li>
                            <li className="page-item"><a className="page-link" href="#"><span>1</span></a></li>
                            <li className="page-item"><a className="page-link" href="#"><span>2</span></a></li>
                            <li className="page-item"><a className="page-link" href="#"><span>3</span></a></li>
                            <li className="page-item"><a className="page-link" href="#"><span>Next</span></a></li>
                        </ul>
                    </div>*/}
                </div> 
            </div>
        </div>
    </div>
    
    )
}

export default Checkpoints
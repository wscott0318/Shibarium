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
        <div className="h-auto p-4 mb-4 cus-card mb-lg-5">
            <div className="table-data-tab">
                <div className="btn-nav">
                    <Nav variant="pills" defaultActiveKey="/firts-tab">
                        <Nav.Item>
                            <Nav.Link className='active'><span className='trs-2'>Delegator</span></Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                                                    <Nav.Link eventKey="link-1"><span className='trs-2'>Polygon</span></Nav.Link>
                                                </Nav.Item> */}
                    </Nav>
                </div>
                <div className="mb-4 table-wrap table-responsive mb-lg-5">
                    <table className="table">
                        <thead>
                            <tr className="table-header">
                                <th>Accounts</th>
                                <th>Bone Staked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {delegators.map((item: any) => (
                                <tr>
                                    <td>
                                        <div className="d-flex">
                                            <div className="coin-wrap">
                                                <img
                                                    width="30"
                                                    height="30"
                                                    className="img-fluid me-3"
                                                    src="../../assets/images/bear.png"
                                                    alt=""
                                                />
                                            </div>
                                            <span className="tb-data align">{item.address}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="tb-data align">
                                            <NumberFormat displayType='text' thousandSeparator value={(item.stake/Math.pow(10,18))} />
                                        </span>
                                        <span className="tb-data-sm align">
                                        <NumberFormat displayType='text' prefix='$ ' thousandSeparator value={(item.stake/Math.pow(10,18) * boneUsdValue).toFixed(2)} />
                                        </span>
                                    </td>
                                </tr>
                            ))
                            }

                        </tbody>
                    </table>
                </div>
                <Pagination onPageChange={pageChangeHandler} pageSize={pageSize} totalCount={allDelegators.length || 1} currentPage={pageIndex} />
            </div>
        </div>
    )
}

export default Delegators
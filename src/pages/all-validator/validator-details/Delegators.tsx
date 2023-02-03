import Pagination from 'app/components/Pagination';
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
import { addDecimalValue } from 'web3/commonFunctions';
import * as Sentry from "@sentry/nextjs";
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
        try{
            const slicedList = allDelegators.slice((index - 1) * pageSize, (index * pageSize))
        setDelegators(slicedList)
        setPageIndex(index)
        }
        catch(err:any){
            Sentry.captureMessage("pageChangeHandler", err);
        }
    }
    return (
      <>
        <div className="h-auto p-4 mb-4 cus-card mb-lg-5">
          <h3 className="mb-2 mb-sm-4">Delegator</h3>
          <div className="cmn_dasdrd_table dt-table">
            <div className="table-responsive">
              <table className="table table-borderless ff-mos align-txt">
                <thead>
                  <tr>
                    <th>Accounts</th>
                    <th>Amount</th>
                    <th>USD Price</th>
                  </tr>
                </thead>
                <tbody>
                  {delegators.length > 0 ? (
                    delegators.map((item: any, i: any) => (
                      <tr key={item?.address}>
                        <td>
                          <span>
                            <img src="../../assets/images/shiba-round-icon.png" />
                          </span>
                          <span className="word-br">{item.address}</span>
                        </td>
                        <td>
                          <span className="amt-value pe-1">
                            <NumberFormat
                              displayType="text"
                              thousandSeparator
                              value={addDecimalValue(+item.stake)}
                            />
                          </span>
                        </td>
                        <td>
                          <span className="amt-txt pe-1 span-child">
                            <NumberFormat
                              displayType="text"
                              prefix="$ "
                              thousandSeparator
                              value={addDecimalValue(+(item.stake)*boneUsdValue)}
                              // value={addDecimalValue(+(item.stake / Math.pow(10, 18))*boneUsdValue)}
                            />
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : 
                    null
                  }
                </tbody>
              </table>
            </div>
            { delegators.length === 0 &&
              <div className="no-found top-spcsm">
                <div>
                  <div className="text-center">
                    <img className="d-inline-block mb-3" src="../../assets/images/no-record.png" />
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="mt-sm-4 mt-3">
            {delegators.length > 0 ? (
              <Pagination
                onPageChange={pageChangeHandler}
                pageSize={pageSize}
                totalCount={allDelegators.length || 1}
                currentPage={pageIndex}
              />
            ) : null}
          </div>
        </div>
      </>
    );
}

export default Delegators
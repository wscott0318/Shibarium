import Pagination from 'app/components/Pagination';
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import TimeAgo from 'timeago-react';
import * as Sentry from "@sentry/nextjs";
import DynamicShimmer from 'app/components/Shimmer/DynamicShimmer';
interface Props {
  allCheckpoints: any[];
  boneUsdValue: number;
  loading: boolean;
}
const Checkpoints: React.FC<Props> = ({ allCheckpoints, boneUsdValue, loading }) => {
  const pageSize = 20;
  const [checkpoints, setCheckpoints] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState(1)
  useEffect(() => {
    if (allCheckpoints) {
      setCheckpoints(allCheckpoints.slice(0, pageSize))
    }
  }, [allCheckpoints])

  function pageChangeHandler(index: number) {
    try {
      const slicedList = allCheckpoints.slice((index - 1) * pageSize, (index * pageSize))
      setCheckpoints(slicedList)
      setPageIndex(index)
    }
    catch (err: any) {
      Sentry.captureMessage("pageChangeHandler", err);
    }
  }
  return (
    <>
      <div className="h-auto p-4 mb-4 cus-card mb-lg-5">
        <h3 className="mb-2 mb-sm-4">Checkpoints</h3>
        <div className="cmn_dasdrd_table cmn-tb checkpoint-table">
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Checkpoint</th>
                  <th>Start block number</th>
                  <th>End block number</th>
                  <th>Result</th>
                  <th className="">
                    <div className="tb-txt">Time</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (checkpoints?.length > 0 && (
                  checkpoints.map((checkpoint: any, i: any) => (
                    <tr key={checkpoint.checkpointNumber}>
                      <td>
                        <NumberFormat
                          displayType="text"
                          thousandSeparator
                          value={checkpoint.checkpointNumber}
                        />
                      </td>
                      <td>{checkpoint.startBlock}</td>
                      <td>{checkpoint.endBlock}</td>
                      <td>
                        <span>
                          <img src="../../assets/images/green-tick2.png"></img>
                        </span>
                        <span>
                          {checkpoint.signed ? "Success" : "Not completed"}
                        </span>
                      </td>
                      <td>
                        <TimeAgo datetime={checkpoint.timestamp * 1000} />
                      </td>
                    </tr>
                  ))
                )) : (
                  <tr>
                    <td colSpan={5}>
                      <DynamicShimmer type={"table"} rows={13} cols={5} />
                    </td>
                  </tr>
                )}
                {!loading && !checkpoints.length && (
                  <tr className='no_record_wrapper'>
                    <td colSpan={5} className="no_record text-left">
                      <img className="d-inline-block mb-3" src="../../assets/images/no-record.png" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-sm-4 mt-3">
          {checkpoints.length > 0 ? (
            <Pagination
              onPageChange={pageChangeHandler}
              pageSize={pageSize}
              totalCount={allCheckpoints.length || 1}
              currentPage={pageIndex}
            ></Pagination>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Checkpoints
import React from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';

function CompleteBurn() {
    
    return (
        <>
            
          <div className='outer-table mb-4 mb-lg-5'>
            <table className='data-table'>
              <thead>
                <tr className='table-header'>
                  <th>Burn</th>
                  <th>#Block</th>
                  <th>Transaction Hash</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4}>
                    <div className='text-center'>
                      <img width="48" height="58" className='img-fluid' src="../../assets/images/bear.png" alt="" />
                      <div className='fw-600'>No Ongoing Transactions</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
    )
}

export default CompleteBurn
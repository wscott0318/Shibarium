function OuterTable() {
    return (
        <>
            <div className='table-wrap table-responsive mb-4 mb-lg-5'>
                <table className='table mb-0'>
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
                                    <img width="48" height="58" className='img-fluid mx-auto' src="../../assets/images/bear.png" alt="" />
                                    <div className='fw-600 text-white mt-2'>No Transactions</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OuterTable
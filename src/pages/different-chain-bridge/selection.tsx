
function Selection() {
    return (
        <>
        <div className='selection-sec mb-3'>
            <div className='lft-roundblk'>
                <div className='circle-blue position-relative'>
                    <div className='coinimage-sec'>
                        <div className="coin-desc">
                            <div className="coin-wrap">
                                <img className='img-fluid' src="../../assets/images/sth.svg" width="53" height="51" alt="" />
                            </div>
                            <span className=''>FROM</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rt-roundblk'>
                <div className='circle-pink position-relative'>
                    <div className='coinimage-sec'>
                        <div className="coin-desc">
                            <div className="coin-wrap">
                                <img className='img-fluid' src="../../assets/images/bear.png" width="53" height="51" alt="" />

                            </div>
                            <span className=''>TO</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Selection
import React from 'react'

const index = () => {
    return (
        <div>
            <div className="heading">
                <p>Shibarium Chains Snapshots</p>
            </div>
            <div className="row">
                <div className="col-2">
                    <p>Mainnet FullNode Bor</p>
                </div>
                <div className="col-9">
                    <p>https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-12-26.tar.gz</p>
                </div>
                <div className="col-1"></div>
            </div>
            <div className="row">
                <div className="col-2">
                    <p>Mainnet Heimdall snapshot</p>
                </div>
                <div className="col-9">
                    <p>https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-12-26.tar.gz</p>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}

export default index
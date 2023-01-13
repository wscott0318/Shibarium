import React, { useEffect, useState } from 'react'
import {getSnapshots} from '../../services/apis/common'
const index = () => {
    const [snapshots, setSnapshots] = useState<any>();

    const fetchSnapshots = async () => {
        await getSnapshots().then((res:any) => setSnapshots(res?.data));
    }
    useEffect(() => {
        fetchSnapshots();
    }, []);
    return (
        <>
            <div className="heading">
                <p>Shibarium Chains Snapshots</p>
            </div>
            <div>
                <div className="row">
                    {Object.keys(snapshots).filter((key: any) => key != "success").map((key: any) => (
                        <>
                            <div className="col-3" key={key}>
                                <p>{key}</p>
                            </div>
                            <div className="col-9">
                                <p>{snapshots[key]}</p>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default index
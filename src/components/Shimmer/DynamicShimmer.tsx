import React from 'react'
// @ts-ignore
import { ShimmerTable } from "react-shimmer-effects";

function DynamicShimmer({type,rows,cols}:any) {
  if(type === "table")
  {
    return <div className='cus-shimer'><ShimmerTable row={rows} col={cols} /></div>;
  } else {
    return (
    null
    )
  }
}

export default DynamicShimmer
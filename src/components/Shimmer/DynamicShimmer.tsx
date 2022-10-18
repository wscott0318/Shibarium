import React from 'react'
// @ts-ignore
import { ShimmerTable } from "react-shimmer-effects";

function DynamicShimmer({type,rows,cols}:any) {
  if(type === "table")
  {
    return <ShimmerTable row={rows} col={cols} />;
  } else {
    return (
    null
    )
  }
}

export default DynamicShimmer
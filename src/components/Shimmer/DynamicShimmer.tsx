import React from 'react'
import { ShimmerTable } from "react-shimmer-effects";

function DynamicShimmer({type,rows,cols}:any) {
  if(type === "table")
  {
    return <ShimmerTable row={rows} col={cols} />;
  }
}

export default DynamicShimmer
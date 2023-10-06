// @ts-nocheck
import React from "react";
import { ShimmerTitle } from "react-shimmer-effects";

const Shimmer = ({ value, line, gap }) => {
  return (
    <div className="row">
      {[...Array(value)].map((x: any, index: any) => (
        <div
          className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col"
          key={index}
        >
          <div className="bs-card card">
            <ShimmerTitle
              line={line}
              gap={gap}
              className="cus-shimer"
              variant="primary"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;

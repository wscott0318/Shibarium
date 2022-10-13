import React from "react";
import { TailSpin } from "react-loader-spinner";
const LoadingSpinner = () => {
  return (
    <div className="fade-bg">
      <div className="spinner-outer position-relative">
        <div className="loading-spinner">
          <TailSpin color="#f06500" height={80} width={80} />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
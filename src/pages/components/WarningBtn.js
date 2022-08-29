import React from "react";

const WarningBtn = ({lable}) => {
  return (
    <>
      <div className="btn-group">
        <a
          href="./delegator"
          className="btn warning-btn light-text"
          title=""
        >
          <span>{lable}</span>
        </a>
      </div>
    </>
  );
};

export default WarningBtn;
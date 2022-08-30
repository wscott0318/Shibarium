import Link from "next/link";
import React from "react";

const WarningBtn = ({lable,link,handleModal}) => {
  return (
    <>
      <div className="btn-group">
        <a
          href="./delegator"
          className="btn warning-btn light-text"
          title=""
        >
          <a className="btn warning-btn light-text">{lable}</a>
        </a>
      </div>
    </>
  );
};

export default WarningBtn;
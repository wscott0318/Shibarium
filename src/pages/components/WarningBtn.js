import Link from "next/link";
import React from "react";

const WarningBtn = ({lable,link,handleModal}) => {
  return (
    <>
      <div className="mb-2 me-3">
        <Link 
          href={link}
          title=""
        >
          <a className="btn warning-btn light-text">{lable}</a>
        </Link>
      </div>
    </>
  );
};

export default WarningBtn;
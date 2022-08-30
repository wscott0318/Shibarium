import Link from "next/link";
import React from "react";

const WarningBtn = ({lable,link,handleModal}) => {
  return (
    <>
      <div className="btn-group">
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
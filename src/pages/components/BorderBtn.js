import React from "react";
import Link from "next/link";

 const BorderBtn = ({ lable,handleModal }) => {
  return (
    <>
      <div className="mb-2 me-3" onClick={()=>handleModal(lable)}>
          <a className="btn bordered-btn light-text">
            <span>{lable}</span>
          </a>
      </div>
    </>
  );
};
export default BorderBtn
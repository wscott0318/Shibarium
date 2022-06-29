import React from "react";
import Link from "next/link";
interface BorderBtnProps{
  lable:string,
  handleModal:(lable:string)=>any
}
 const BorderBtn = ({ lable,handleModal }:BorderBtnProps) => {
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
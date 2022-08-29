import React from "react";
import Link from "next/link";
interface BorderBtnProps {
  lable: string,
  handleModal: (lable: string) => any,
  link?: string,
}
const BorderBtn = ({ lable, handleModal, link }: BorderBtnProps) => {
  return (
    <>
      <div className="btn-group" onClick={() => handleModal(lable)}>
        {!link && <a className="btn bordered-btn light-text"><span>{lable}</span></a>}
        {link && <div className="btn bordered-btn light-text"><Link href={link} ><span>{lable}</span></Link></div>}
      </div>
    </>
  );
};
export default BorderBtn
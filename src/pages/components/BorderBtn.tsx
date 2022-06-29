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
      <div className="mb-2 me-3" onClick={() => handleModal(lable)}>
        {!link && <a className="btn bordered-btn light-text"><span>{lable}</span></a>}
        {link && <a href={link} className="btn bordered-btn light-text"><span>{lable}</span></a>}
      </div>
    </>
  );
};
export default BorderBtn
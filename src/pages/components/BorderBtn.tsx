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
     <h1>components BorderBtn</h1>
    </>
  );
};
export default BorderBtn
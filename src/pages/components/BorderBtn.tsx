import React from "react";
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
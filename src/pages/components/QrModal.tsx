import CopyHelper from 'app/components/AccountDetails/Copy';
import React from 'react'
import { Modal } from 'react-bootstrap'
import QRCode from "react-qr-code";

interface props{
    show:boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    title:string;
    address:string
}

const QrModal:React.FC<props> = ({show,setShow, title,address})=> {
  const abc = {show,setShow, title,address};
  return (
   <>
   <h1>QR modal</h1>
   </>
  )
}
export default QrModal;
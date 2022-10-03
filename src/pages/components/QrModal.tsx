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
  console.log("qr code called")
  return (
    <Modal
    {...abc}
    centered
    show={show}
    onHide={() => setShow(false)}
    backdrop="static"
    keyboard={false}
    className="shib-popup"
  >
    <Modal.Header closeButton className="text-center modal-header">
      <Modal.Title
        id="contained-modal-title-vcenter"
        className="d-inline-block fw-800 trs-3"
      >
        <span style={{ color: "white" }}>{title}</span>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div
          className="qr-code">
          <QRCode value={address} bgColor='#15141b' fgColor='#fff' title={address} />
        </div>
        <div>
          <div className='mt-4 text-center'>Wallet address </div>
          <div  className='text-center word-wrap'>{address}</div>
        </div>
    </Modal.Body>
    <Modal.Footer className='text-center d-block'>
        <button >
          <CopyHelper toCopy={address}> Copy address </CopyHelper>
        </button>
    </Modal.Footer>
  </Modal>
  )
}
export default QrModal;
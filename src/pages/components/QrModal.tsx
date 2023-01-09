import CopyHelper from 'app/components/AccountDetails/Copy';
import React from 'react'
import { Modal } from 'react-bootstrap'
import { QRCode } from 'react-qrcode-logo';
// import QrLogo from "../../assets/images/shiba-round-icon.png"

interface props{
    show:boolean;
    setshow: React.Dispatch<React.SetStateAction<boolean>>
    title:string;
    address:string
}

const QrModal:React.FC<props> = ({show,setshow, title,address})=> {
  const abc = {show,setshow, title,address};
  return (
    <Modal
    {...abc}
    centered
    show={show}
    onHide={() => setshow(false)}
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
        <div className="qr-wrap">
          <div
            className="qr-code">
            <QRCode 
            size={250}
             removeQrCodeBehindLogo={true}
             value={address} 
             logoWidth={30}
             bgColor='#fff' fgColor='#0C0F17' 
             logoHeight={30}  
            // logoImage={QrLogo}
            // logoImage='https://www.thewistle.com/wp-content/uploads/2021/07/Shiba-Token-1.jpg'
            logoImage='../../assets/images/shib-borderd-icon.png'
            />
          </div>
          <div className='mt-3 text-center lite-color'>Wallet address </div>
          <div  className='text-center word-wrap'>{address}</div>
        </div>
        <div>
          
        </div>
    </Modal.Body>
    <Modal.Footer className='text-center footer-sec'>
        <button className='btn primary-btn w-100'>
          <CopyHelper toCopy={address}> Copy address </CopyHelper>
        </button>
    </Modal.Footer>
  </Modal>
  )
}
export default QrModal;
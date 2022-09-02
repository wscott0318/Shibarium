import CopyHelper from 'app/components/AccountDetails/Copy';
import React from 'react'
import { Modal } from 'react-bootstrap'


interface props{
    show:boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    title:string;
    children:React.ReactNode;
}
interface propsNew{
    show:boolean;
    setShow: any;
    title:string;
    children:React.ReactNode;
}

const CommonModal:React.FC<props> = ({show,setShow, title,children})=> {
  const abc = {show,setShow, title,children};
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
    {/* <div className="back-blk">
        <a href="#!;" title="">
        <img className="img-fluid" src="../../assets/images/left-icon.png"width="45" height="78" alt=""></img>
        </a>
    </div> */}
      <Modal.Title
        id="contained-modal-title-vcenter"
        className="d-inline-block fw-800 trs-3"
      >
        <span style={{ color: "white" }}>{title}</span>
      </Modal.Title>
    </Modal.Header>

    <Modal.Body className='low-sidespace body-font-sm'>
       {children}
    </Modal.Body>
    {/* <Modal.Footer className='text-center d-block'>
        <button >
          <CopyHelper toCopy={address}> Copy address </CopyHelper>
        </button>
    </Modal.Footer> */}
  </Modal>
  )
}

export const CommonModalNew:React.FC<propsNew> = ({show,setShow = null, title,children})=> {
  const abc = {show,setShow, title,children};
  return (
    <Modal
    {...abc}
    centered
    show={show}
    onHide={() => setShow()}
    backdrop="static"
    keyboard={false}
    className="shib-popup"
  >
    <Modal.Header closeButton className="text-center modal-header">
    {/* <div className="back-blk">
        <a href="#!;" title="">
        <img className="img-fluid" src="../../assets/images/left-icon.png"width="45" height="78" alt=""></img>
        </a>
    </div> */}
      <Modal.Title
        id="contained-modal-title-vcenter"
        className="d-inline-block fw-800 trs-3"
      >
        <span style={{ color: "white" }}>{title}</span>
      </Modal.Title>
    </Modal.Header>

    <Modal.Body className='low-sidespace body-font-sm'>
       {children}
    </Modal.Body>
    {/* <Modal.Footer className='text-center d-block'>
        <button >
          <CopyHelper toCopy={address}> Copy address </CopyHelper>
        </button>
    </Modal.Footer> */}
  </Modal>
  )
}

export default CommonModal;

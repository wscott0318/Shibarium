import CopyHelper from 'app/components/AccountDetails/Copy';
import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'


interface props{
    show:boolean;
    setshow: React.Dispatch<React.SetStateAction<boolean>>
    title:string;
    externalCls:string;
    children:React.ReactNode;
}
interface propsNew {
  show: boolean;
  setshow: any;
  title: any;
  externalCls: string;
  children: React.ReactNode;
  showClose: boolean;
  setSendModal: any;
  setSenderModal:any;
}
const CommonModal:React.FC<props> = ({show,setshow, title,externalCls,children})=> {
  const abc = {show,setshow, title,externalCls,children};
  return (
    <Modal
    {...abc}
    
    centered
    show={show}
    onHide={() => setshow(false)}
    backdrop="static"
    keyboard={false}
    className={`shib-popup ${externalCls}`}
    // scrollable={true}
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

export const CommonModalNew: React.FC<propsNew> = ({
  show,
  setshow = null,
  title,
  externalCls,
  children,
  showClose,
  setSendModal,
  setSenderModal,
}) => {
  const abc = {
    show,
    setshow,
    title,
    children,
    externalCls,
    showClose,
    setSendModal,
    setSenderModal,
  };
  const backHandler = () => {
    if (title === "Select Token") {
      setSendModal({
        step0: false,
        step1: true,
        step2: false,
        step3: false,
        showTokens: false,
      });
    }
  };

  return (
    <Modal
      {...abc}
      centered
      show={show}
      onHide={() => setshow()}
      backdrop="static"
      keyboard={false}
      className={`shib-popup ${externalCls}`}
      // scrollable={true}
    >
      {title !== "Select Token" && !showClose ? (
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
      ) : (
        <Modal.Header className="text-center modal-header">
          <div className="back-blk backArrowBtn">
            <button onClick={backHandler}>
              <img
                className="img-fluid"
                src="../../assets/images/left-icon.png"
                width="16"
                height="16"
                alt=""
              ></img>
            </button>
          </div>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="d-inline-block fw-800 trs-3"
          >
            <span style={{ color: "white" }}>{title}</span>
          </Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body className="low-sidespace body-font-sm">{children}</Modal.Body>
      {/* <Modal.Footer className='text-center d-block'>
        <button >
          <CopyHelper toCopy={address}> Copy address </CopyHelper>
        </button>
    </Modal.Footer> */}
    </Modal>
  );
};

export default CommonModal;

import React,{useState} from "react";
import { Modal } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
// import copy-wht-icon from "../../images/copy-wht-icon.png"

 const ConfirmPopUp = (props) => {
    const [isCopied, setIsCopied] = useState(false);

    const onCopyHashCode = () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      };
      
  return (
      <div className="modal-wrap">
        <Modal
          className="shib-popup"
          show={props.show}
          onHide={() => props.setShow(false)}
          aria-labelledby="contained-modal-title-vcenter "
          centered
        >
        
          <Modal.Body className="postion-relative">
            <div className="cross-blk"><span className="btn-close" onClick={()=>props.setShow(false)}></span></div>
            <div className="pb-3 align-items-center">
                <h4 className="text-center success-color-sec">{props.message}</h4>
            </div>
            <div className="code-section ">
              <div className="key-txt text-center">{props.text}</div>
              <CopyToClipboard text={props.text} onCopy={onCopyHashCode}>
                <div className="text-center">
                {
                  isCopied ? 
                  <span className=" copy-icon bg-copy">
                  Copied!
                </span>:
                <span className=" copy-icon bg-copy"></span>
                }  
               
                </div>
              </CopyToClipboard>
            </div>
          </Modal.Body>
        </Modal>
      </div>
  );
};

export default ConfirmPopUp;
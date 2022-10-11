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
      <h1>ConfirmPopUp</h1>
  );
};

export default ConfirmPopUp;
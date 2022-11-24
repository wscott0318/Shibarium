import React,{useState} from "react";
import { Modal } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
// import copy-wht-icon from "../../assets/images/copy-wht-icon.png"
import * as Sentry from "@sentry/nextjs";
 const ConfirmPopUp = (props) => {
    const [isCopied, setIsCopied] = useState(false);

    const onCopyHashCode = () => {
      try{
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      }catch(err){
        Sentry.captureMessage("New Error " , err);
      }
    };
      
  return (
      <h1>ConfirmPopUp</h1>
  );
};

export default ConfirmPopUp;
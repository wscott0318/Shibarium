import React,{useState} from "react";
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
        Sentry.captureMessage("ConfirmPopUp ", err);
      }
    };
      
  return (
      <h1>ConfirmPopUp</h1>
  );
};

export default ConfirmPopUp;
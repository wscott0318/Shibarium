import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ToastNotify = ({toastMassage,type}:{toastMassage:String,type:'error'|'success'|undefined}) => {
  useEffect(() => {
   if (toastMassage && type) {
     toast[type](toastMassage,{autoClose:3000})
   }
  }, [toastMassage]);
  return (
    <h1>Toast container</h1>
  )
}
export default ToastNotify;
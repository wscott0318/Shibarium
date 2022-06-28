import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ToastNotify = ({toastMassage}) => {
  toast(toastMassage)
  return (
    <ToastContainer />
  )
}
export default ToastNotify;
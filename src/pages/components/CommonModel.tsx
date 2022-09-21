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
   <h1>CommonModal</h1>
  )
}

export const CommonModalNew:React.FC<propsNew> = ({show,setShow = null, title,children})=> {
  const abc = {show,setShow, title,children};
  return (
    <h1>CommonModalNew</h1>
  )
}

export default CommonModal;

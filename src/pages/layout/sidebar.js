/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from "react-bootstrap";
import  NavLink  from "../components/NavLink";
import SideNavTab from "../../constants/Resources/sideNavTab";
export default function Sidebar(props) {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const handlClick = () => {
    setIsVisible((prev) => !prev);
  };

  const handleActiveTab=(index)=>{
    SideNavTab.filter(elm=>{
      if(elm.id==index){
        elm.isActive=true
      }else{
        elm.isActive=false
      }
    })
  }
  return (
   <>
    <h1>layout sidebar</h1>
   </>
  );
}

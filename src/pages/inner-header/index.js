import React,{useState,useEffect} from "react";
import { Dropdown, Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

import { innerNavTab } from "app/constants/Resources/sideNavTab";
import  GlobleHeader  from "../components/GlobleHeader";

const InnerHeader = () => {
  const router = useRouter();
  const [show, setShow] = useState();
  const [offset, setOffset] = useState(0);
  const [accountAddress, setAccountAddress] = useState("")

  useEffect(() => {
 setAccountAddress(localStorage.getItem('accounts'))
      const onScroll = () => setOffset(window.pageYOffset);
      // clean up code
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
  }, []);




  return (
    <>
      <h1>inner-header index.js</h1>
    </>
  );
};

export default InnerHeader;

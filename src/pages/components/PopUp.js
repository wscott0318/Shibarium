/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Link from "next/link";
export default function Popup(props) {
  const { show, setShow, title } = props;
  const [modaltitle, setModaltitle] = useState("Important");

  return (
   <>
    <h1>popups</h1>
   </>
  );
}

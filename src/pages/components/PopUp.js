/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Link from "next/link";
export default function Popup(props) {
  const { show, setShow, title } = props;
  const [modaltitle, setModaltitle] = useState("Important");

  return (
    <Modal
      {...props}
      //   aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="text-center">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="d-inline-block fw-800 trs-3"
        >
          <span style={{ color: "black" }}>Metamask</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div
          className="d-flex justify-content-center"
          style={{ padding: "70px" }}
        >
          <img src="../../assets/images/meta.png" alt="" />
        </div>
        <div>
          <p style={{ color: "black", textAlign: "center" }}>
            Metamask not Install. Please visit{" "}
            <a href="https://docs.metamask.io/guide/">Docs</a> for guidance in
            installing and createing a Metamask wallet. If metamask is already
            installed, please ensure plugin is enabled
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <div> */}
          <p style={{ color: "black",textAlign:"center" }}>
            <span>Donn&apos;t have wallet?</span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            >
              Download here
            </a>
          </p>
        {/* </div> */}
      </Modal.Footer>
    </Modal>
  );
}

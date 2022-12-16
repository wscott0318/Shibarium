import CopyHelper from 'app/components/AccountDetails/Copy';
import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import * as Sentry from "@sentry/nextjs";

interface props {
    show: boolean;
    setshow: React.Dispatch<React.SetStateAction<boolean>>
    title: string;
    externalCls: string;
}

const ChainWarning: React.FC<props> = ({ show, setshow, title, externalCls }) => {
    const abc = { show, setshow, title, externalCls };
    return (
        <Modal
            {...abc}
            centered
            show={show}
            onHide={() => setshow(false)}
            backdrop="static"
            keyboard={false}
            className={`shib-popup ${externalCls}`}
            style={{background:"#000000d1"}}
        >
            <Modal.Header className="text-center modal-header">
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="d-inline-block fw-800 trs-3"
                >
                    <span style={{ color: "white" }}>{title}</span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='low-sidespace body-font-sm'>
                <div className="popmodal-body tokn-popup no-ht trans-mod">
                    <div className="pop-block">
                        <div className="pop-top">
                            <div className="dark-bg-800 h-100 status-sec sec-ht position-relative text-center">
                                <img src="../../assets/images/footer-logo.png" className="m-auto mb-3" />
                                <h3 className="ff-mos small_warning_heading">Approve your network change in Metamask</h3>
                                <p className="small_warning_text ff-mos">To use Shibarium Staking change your Metamask network to Goerli Testnet.</p>
                            </div>
                        </div>
                        <div className="pop-bottom">
                            <div className="staus-btn">
                                <button
                                    type="button"
                                    className="btn primary-btn w-100"
                                // disabled={hashLink ? false : true}
                                // onClick={() => window.open(hashLink)}
                                >
                                    Switch to Goerli Testnet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer className='text-center d-block'>
        <button >
          <CopyHelper toCopy={address}> Copy address </CopyHelper>
        </button>
    </Modal.Footer> */}
        </Modal>
    )
}

export default ChainWarning;
import React, { useCallback } from 'react'
import { Modal } from 'react-bootstrap'
import * as Sentry from "@sentry/nextjs";
import { useActiveWeb3React } from '../../services/web3'
// @ts-ignore
import cookie from 'cookie-cutter'
import { GOERLI_CHAIN_ID } from 'app/config/constant';

interface Props {
    show: boolean;
    setshow: React.Dispatch<React.SetStateAction<boolean>>
    title: string;
    externalCls: string;
}

const ChainWarning: React.FC<Props> = ({ show, setshow, title, externalCls }) => {
    const abc = { show, setshow, title, externalCls };

    const { library, account } = useActiveWeb3React()
    const switchNetwork = async () => {
        console.debug(`Switching to chain 5`, GOERLI_CHAIN_ID);
        // toggleNetworkModal() 
        const params = GOERLI_CHAIN_ID
        cookie.set("chainId", GOERLI_CHAIN_ID, params);

        try {
            await library?.send("wallet_switchEthereumChain", [
              { chainId: `0x${GOERLI_CHAIN_ID.toString(16)}` },
              account,
            ]);
        } catch (switchError:any) {
            // This error code indicates that the chain has not been added to MetaMask.
            // @ts-ignore TYPE NEEDS FIXING
            if (switchError.code === 4902) {
                try {
                    await library?.send('wallet_addEthereumChain', [params, account])
                } catch (addError:any) {
                    // handle "add" error
                    Sentry.captureMessage("switchNetwork ", addError);
                    console.error(`Add chain error ${addError}`)
                }
            }
            console.error(`Switch chain error ${switchError}`)
            Sentry.captureMessage("switchNetwork ", switchError);
            // handle other "switch" errors
        }
    }

const handleShow = useCallback(()=>{setshow(false)},[])
    
    return (
        <Modal
            {...abc}
            centered
            show={show}
            onHide={handleShow}
            backdrop="static"
            keyboard={false}
            className={`shib-popup ${externalCls}`}
            style={{ background: "#000000d1" }}
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
                                <img src="../../assets/images/shib-switch.png" className="m-auto mb-5" style={{ width: 400 }} />
                                {/* <h3 className="ff-mos small_warning_heading">Approve your network change in Metamask</h3> */}
                                <p className="small_warning_text ff-mos mt-4">To use Shibarium Staking change your Metamask network to Sepolia Testnet.</p>
                            </div>
                        </div>
                        <div className="pop-bottom">
                            <div className="staus-btn">
                                <button
                                    type="button"
                                    className="btn primary-btn w-100"
                                    // disabled={hashLink ? false : true}
                                    onClick={() => switchNetwork()}
                                >
                                    Switch to Sepolia Testnet
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
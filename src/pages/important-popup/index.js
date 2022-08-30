/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ENV_CONFIGS, SHIBARIUM_CHAIN_ID } from "app/config/constant";
import { useActiveWeb3React } from "app/services/web3";
import { useTokenBalance } from "app/hooks/useTokenBalance";
// import { useTokenPrice } from "app/hooks/useTokenPrice";
import { ERC20_ABI } from "app/constants/abis/erc20";
import Web3 from 'web3'
import LoadingSpinner from "pages/components/Loading";
import ConfirmPopUp from "pages/components/ConfirmPopUp";


export default function ImportantPopup(props) {

  const {modalSend,handleContinueToSend,onHide}=props
 const {chainId = SHIBARIUM_CHAIN_ID, account,library} = useActiveWeb3React()
  // const [modaltitle, setModaltitle] = useState("Important");

  const [loading, setLoading] = useState(false)
  const [recieverAddress, setRecieverAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState(ENV_CONFIGS[chainId].BONE);
  const [amount, setAmount] = useState();
  const [confirm, setConfirm] = useState(false)
const [tranHashCode, setTranHashCode] = useState('')
 const tokenBal =  useTokenBalance(tokenAddress)
//  const price = useTokenPrice(tokenAddress);
//  console.log(price)


const transferToken = () => {
  try {
    setLoading(true)
    const web3 = new Web3(library?.provider);
    const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    const amt = web3.utils.toBN((+amount).toFixed(10) * Math.pow(10, 18));
    const txData = {
      from: account,
      to: tokenAddress,
      data: contract.methods.transfer(recieverAddress,amt).encodeABI(),
    };
    web3.eth
      .sendTransaction(txData)
      .on("transactionHash", (res) => {
        setLoading(false);
        setConfirm(true)
        setTranHashCode(res)
        onHide()
      })
      .on("receipt", async (res) => {})
      .on("error", (err) => {setLoading(false)});
  } catch (error) {setLoading(false)}
};
  return (
    <>
    <ConfirmPopUp
          show={confirm}
          setShow={setConfirm}
          text={tranHashCode}
          message={'Transaction done!'}
        />
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="shib-popup"
      >
      <Modal.Header closeButton  className="text-center">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="d-inline-block fw-800 trs-3"
          >
          {modalSend?"Send":"Important"}
        </Modal.Title>
      </Modal.Header>
      {/* <Modal.Header
        closeButton
        className="text-center position-relative d-none"
        >
        <div className="back-blk">
        <a href="#!;" title="">
        <img
        clasName="img-fluid"
        src="../../assets/images/left-icon.png"
        width="45"
        height="78"
        alt=""
        ></img>
        </a>
        </div>
        <Modal.Title
        id="contained-modal-title-vcenter"
        className="d-inline-block fw-800 trs-3 "
        >
        Send
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        {loading && <LoadingSpinner />}
        {!modalSend ? (
          <div className="notify-poup">
            <div className="block-wrap">
              <h1 className="mb-3 ft-20 lft-strip mb-sm-4">
                <span className="align text-hd">What&apos;s supported</span>
              </h1>
              <div className="form-check cus-chkbox d-inline-block me-0">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="check2"
                  name="option2"
                  value="something"
                />
                <label className="form-check-label fw-600" htmlFor="check2">
                  <span className="top-low-spc">
                    Sending funds to any address on the Shibarium Network.
                  </span>
                </label>
              </div>
              <div className="mt-0 mt-2 cus-alert d-inline-block w-100">
                If you want to move your funds from Shibarium mainnet to
                Ethereum mainnet, Please visit <b>Shibarium Bridge.</b>
              </div>
            </div>
            <div className="block-wrap">
              <h1 className="mb-3 ft-20 lft-strip mb-sm-4">
                <span className="align text-hd">
                  Sending funds to exchanges
                </span>
              </h1>
              <div className="d-flex align-items-top ">
                <div className="pe-2">
                  <img
                    width="23"
                    height="23"
                    className="img-fluid"
                    src="../../assets/images/alert-icon.png"
                    alt=""
                  />
                </div>
                <p className="fw-600">
                  Please click{" "}
                  <b>
                    <a href="#!;" title="">
                      here
                    </a> 
                  </b>{" "}
                  to see all the exchanges that support Shibarium Network
                </p>
              </div>
              <div className="mt-0 mt-2 cus-alert d-inline-block w-100">
                Sending funds to any unsupported exchanges will lead to
                permanent loss of funds.
              </div>
            </div>
            <div className="mt-4 d-flex align-items-center justify-content-center flex-column flex-sm-row mob-btns">
              <div className="mb-3 me-0 me-sm-5 mb-sm-0 btn-box">
                <button
                onClick={onHide}
                  type="button"
                  className="btn bordered-btn light-text w-100"
                >
                  <span>CANCEL</span>
                </button>
              </div>
              <div className="btn-box" onClick={handleContinueToSend}>
                <button
                  type="button"
                  className="btn gradient_btn light-text w-100"
                >
                  <span>CONTINUE TO SEND</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="send-block">
              <div>
                <label htmlFor="" className="form-label fwb">
                  To
                </label>
                <div className="mb-4 form-group field-modify">
                  <div className="p-0 swap-control swap-flex">
                    <div className="swap-col">
                      <input
                        className="pe-0 swap-input"
                        type="text"
                        placeholder="Enter receiver address"
                        value={recieverAddress}
                        onChange={(e)=>{setRecieverAddress(e.target.value)}}
                      />
                    </div>
                  </div>
                  <div className="flex-wrap mt-2 helper-txt fw-600 ft-14">
                    <div>
                      Enter vaild address existing on the Shibarium Network.
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-4 form-group drop-field">
                <div className="p-0 swap-control swap-flex">
                  <div className="swap-col">
                    <input type="number" className="swap-input" placeholder="0.00" value={amount} onChange={(e)=>setAmount(e.target.value)} />
                    <span className="primary-text over-text fw-600">MAX</span>
                  </div>
                  <div className="coin-btn position-relative">
                    <i className="arrow down"></i>
                    <div className="movable-block">
                      <img
                        clasName="img-fluid"
                        src="../../assets/images/shiba-coin.png"
                        width="25"
                        height="25"
                        alt=""
                      ></img>
                    </div>
                    <button
                      className="btn warning-btn w-100 text-start"
                      type="button"
                    >
                      <span className="d-inline-block btn-txt">Shiba</span>
                    </button>
                  </div>
                </div>
                <div className="flex-wrap mt-2 d-flex align-items-center justify-content-between helper-txt fw-600 ft-14">
                  <div>$0</div>
                  <div>Available Balance: {tokenBal} SHIBA</div>
                </div>
              </div>
              <div>
                <button type="button" className="btn gradient_btn w-100" onClick={()=>transferToken()}>
                  <span>SEND</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
    </>
  );
}

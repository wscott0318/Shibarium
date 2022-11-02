/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";

import { Button, Container, Nav, Navbar, NavDropdown, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
// @ts-ignore
import Popup from "../components/PopUp";
import { ChainId } from "@shibarium/core-sdk";
import Web3 from "web3";
import CommonModal , {CommonModalNew} from "../components/CommonModel";
import InnerHeader from "../../pages/inner-header";
// @ts-ignore
import Link from 'next/link'
import { useRouter } from "next/router";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import Sidebar from "../layout/sidebar"
import Web3Status from "app/components/Web3Status";
import { useActiveWeb3React } from "app/services/web3";
import { useEthBalance } from "../../hooks/useEthBalance";
import { useTokenBalance, getTokenBalance } from '../../hooks/useTokenBalance';
import { BONE_ID, ENV_CONFIGS } from '../../config/constant';
import ERC20 from "../../ABI/ERC20Abi.json";
import fromExponential from "from-exponential";
import { useAppDispatch } from "../../state/hooks"
import { addTransaction, finalizeTransaction } from "../../state/transactions/actions"
import QrModal from "../components/QrModal";
import { getBoneUSDValue, getWalletTokenList } from "../../services/apis/validator/index";
import NumberFormat from 'react-number-format';
import { useSearchFilter } from "app/hooks/useSearchFilter";
import {dynamicChaining} from "../../web3/DynamicChaining"; 
import Pagination from 'app/components/Pagination';
// @ts-ignore
import { ShimmerTitle, ShimmerTable } from "react-shimmer-effects";
import DynamicShimmer from "app/components/Shimmer/DynamicShimmer";
import Router from "next/router";
import { getExplorerLink } from "app/functions";

const sendInitialState = {
  step0: false,
  step1: false,
  step2: true,
  step3: false,
  showTokens: false
}

export const SortData = (a: any, b: any) => { 
  return (a > b)
    ? 1 : ((b > a)
     ? -1 : 0); 
  }

export default function Wallet() {

  const router = useRouter()
  const { chainId = 1, account, library } = useActiveWeb3React();
  const id :any = chainId
  // console.log(dynamicChaining[id].BONE)

  const availBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(ENV_CONFIGS[chainId].BONE);
  const lib: any = library
  const web3: any = new Web3(lib?.provider)
  const dispatch = useAppDispatch()

  const [listLoader, setListLoader] = useState(true)
  const [hashLink, setHashLink] = useState('')

  const [senderAddress, setSenderAdress] = useState('');
  const [userQrCode, setUserQrCode] = useState(false)
  const [isValidAddress, setIsValidAddress] = useState(false)
  const [sendAmount, setSendAmount] = useState('')
  const [senderModal, setSenderModal] = useState(false)
  const [verifyAmount, setVerifyAmount] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [boneUSDValue, setBoneUSDValue] = useState(0);
  const [showSendModal, setSendModal] = useState(sendInitialState);
  const [menuState, setMenuState] = useState(false);
  const [tokenList, setTokenList] = useState<any>([]);
  const [tokenFilteredList, setTokenFilteredList] = useState<any>([]);
  const [tokenModalList, setTokenModalList] = useState<any>([]);
  const [selectedToken, setSelectedToken] = useState<any>({})
  const [searchKey, setSearchKey] = useState<string>('');
  const [modalKeyword, setmodalKeyword] = useState<string>('');

  const searchResult = useSearchFilter(tokenList, searchKey.trim());

  useEffect(() => {
    if(tokenFilteredList.length) {
     let obj = tokenFilteredList.filter((x:any) => x.parentSymbol === 'BoneToken').map((y:any) => y)[0] 
     setSelectedToken(obj) 
    }
  },[tokenFilteredList, tokenList])

  console.log(selectedToken)

  const verifyAddress = (address: any) => {
    let result = Web3.utils.isAddress(address)
    setIsValidAddress(result)
    return result
  }

  const getNetworkName = () => {
    if(chainId == 1){
      return "Ethereum Mainnet"
    } else if (chainId == 5){
      return "Goerli Testnet"
    } else {
      return "Shibarium Mainnet"
    }
  }

  const getTokensList = () => {
    console.log("token list called ==> ")
    setListLoader(true)
    getWalletTokenList().then(res => {
      let list = res.data.message.tokens;
      list.forEach(async (x: any) => {
        x.balance = await getTokenBalance(lib, account, x.parentContract)
      })
      setTokenList(list)
      setTokenFilteredList(list)
      setTokenModalList(list)
      setListLoader(false)
    })
  }


  console.log(tokenList)

  useEffect(() => {
    if (account) {
      getBoneUSDValue(BONE_ID).then(res => {
        setBoneUSDValue(res.data.data.price);
      })
      getTokensList()
    } else {
      router.push('/')
    }

  }, [account])




  const handleChange = (e: any) => {
    setSenderAdress(e.target.value)
    const isValid = verifyAddress(e.target.value)
    console.log(isValid)
  }


  const handleMenuState = () => {
    console.log("called click")
    setMenuState(!menuState);
  }

  const handleSend = () => {
    console.log("called handleSend")
    if (isValidAddress && sendAmount) {
      setSendModal({
        step0: false,
        step1: false,
        step2: true,
        step3: false,
        showTokens:false
      })
    }
  }
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [slicedTokenFilteredList, setSliceTokenFilteredList] = useState([]);

    useEffect(() => {
      if(tokenFilteredList.length){
        const slicedList = tokenFilteredList.slice(0, pageSize);
      setSliceTokenFilteredList(slicedList);
    } else if (tokenFilteredList.length === 0){
      setSliceTokenFilteredList([])
    } else {
      console.log("check state")
    }

    }, [tokenFilteredList]);

    const pageChangeHandler = (index: number) => {
      const slicedList = tokenFilteredList.slice(
        (index - 1) * pageSize,
        index * pageSize
      );
      setSliceTokenFilteredList(slicedList);
      setCurrentPage(index);
    };

  const handleSearchList = (key:any, type : any ='main') => {
    if(type === 'modal'){
      setmodalKeyword(key)
    } else {
      setSearchKey(key)          
    }
    if(key.length){
      let newData = tokenList.filter((name: any) => {
        return Object.values(name)
              .join(" ")
              .toLowerCase()
              .includes(key.toLowerCase());
        });
        if(type === 'modal'){
          setTokenModalList(newData)
        } else {
          setTokenFilteredList(newData)        
          pageChangeHandler(currentPage);  
        }
    } else {
      if(type === 'modal'){
        setTokenModalList(tokenList)
      } else {
        setTokenFilteredList(tokenList)     
      }
    }
    
  }

  console.log(tokenList, tokenFilteredList, slicedTokenFilteredList)

  const submitTransaction = () => {
    let user: any = account;
    let amount = web3.utils.toBN(fromExponential(+sendAmount * Math.pow(10, 18)));
    let instance = new web3.eth.Contract(ERC20, selectedToken.parentContract);
    instance.methods.transfer(senderAddress, amount).send({ from: user })
      .on('transactionHash', (res: any) => {
        console.log(res, "hash")
        setTransactionHash(res)
        setSendModal({
          step0: false,
          step1: false,
          step2: false,
          step3: true,
          showTokens:false
        })
        dispatch(
          addTransaction({
            hash: res,
            from: user,
            chainId,
            summary: `${res}`,
          })
        )
        let link = getExplorerLink(chainId, res, 'transaction')
        setHashLink(link)
      }).on('receipt', (res: any) => {
        console.log(res, "response")
        dispatch(
          finalizeTransaction({
            hash: res.transactionHash,
            chainId,
            receipt: {
              to: res.to,
              from: res.from,
              contractAddress: res.contractAddress,
              transactionIndex: res.transactionIndex,
              blockHash: res.blockHash,
              transactionHash: res.transactionHash,
              blockNumber: res.blockNumber,
              status: 1
            }
          })
        )
        setTokenFilteredList([])
        setTokenList([])
        getTokensList()
      }).on('error', (err: any) => {
        console.log(err, "error")
        if (err.code === 4001) {
          setSenderModal(false)
          setSendModal(sendInitialState)
        }
      })
  }


  // transactionCounts()

  const handleCloseModal = () => {
    setSenderModal(false)
    setVerifyAmount(false)
    setSendAmount('');
    setSenderAdress('')
    setSendModal(sendInitialState)
  }

  const handledropDown = (x: any) => {
    console.log(x)
    setSelectedToken(x)
  }

  const handleSendAmount = () => {
    if(sendAmount > selectedToken.balance){
      return true
    } else if (!sendAmount){
      return true
    } else {
      return false
    }
  }
  const [sendToken,setSendToken] = useState('');

  const sendTokenWithRoute = async (x:any, type: any = "deposit") => {
    console.log("Router data for send", x)
    localStorage.setItem("depositToken",JSON.stringify(x))
    localStorage.setItem("bridgeType",type)
    await Router.push(`/bridge`);
  }

  
  // const cardShimmerEffects = (lines:any, gaps:any) => {
  //   return <ShimmerTitle line={lines} gap={gaps} variant="primary" />;
  // };

  return (
    <>
      <main className="main-content">
        <Sidebar
          handleMenuState={handleMenuState}
          onClickOutside={() => {
            setMenuState(false);
          }}
          menuState={menuState}
        />

        {/* QR modal starts */}
        {account && (
          <QrModal
            title={"My QR Code"}
            show={userQrCode}
            setShow={setUserQrCode}
            address={account}
          />
        )}
        {/* QR modal ends */}
        <div className="">
          <CommonModalNew
            title={
              showSendModal.step0
                ? "Transferring funds"
                : showSendModal.step1
                ? "Send"
                : showSendModal.step2
                ? "Confirm Send"
                : showSendModal.showTokens
                ? "Select Token"
                : "Submitted"
            }
            showClose={false}
            show={true}
            setShow={handleCloseModal}
            externalCls="dark-modal-100 walet-ht"
            setSendModal={setSendModal}
            setSenderModal={setSenderModal}
          >
            {/* step 1 */}
            <>
              {/* transferring funds popop start */}

              {showSendModal.step0 && (
                <div className="cmn_modal">
                  <div className="pop-top">
                    <p className="mb-0">Sending funds to exchanges:</p>
                    <div className="exchng_msg_box">
                      <p>Exchanges supported from Shibarium network</p>
                      <p className="sprdt_txt">Supported Exchanges</p>
                    </div>
                    <p className="alert_msg">
                      <div className="image-wrap d-inline-block me-2">
                        <img
                          className="img-fluid"
                          src="../../images/i-info-icon.png"
                          width={16}
                        />
                      </div>
                      Sending funds to <a href="#" className="text-primary"> unsupported exchanges</a> will lead to
                      permanent loss of funds.
                    </p>
                  </div>
                  <div className="pop-bottom">
                    <div className="pop_btns_area row form-control">
                      <div className="col-6">
                        <button
                          className="btn blue-btn w-100"
                          onClick={() => {
                            setSenderModal(false);
                            setSendModal(sendInitialState);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          className="btn primary-btn w-100"
                          onClick={() =>
                            setSendModal({
                              step0: false,
                              step1: true,
                              step2: false,
                              step3: false,
                              showTokens: false,
                            })
                          }
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                    <p className="pop_btm_txt text-center">
                      If you want to send funds between chains visit{" "}
                      <p style={{cursor: "pointer"}} className='primary-text' onClick={() => sendTokenWithRoute(selectedToken)} >Shibarium Bridge test</p>
                    </p>
                  </div>
                </div>
              )}

              {/* transferring funds popop ends */}

              {/* send popop start */}
              {showSendModal.step1 && (
                <div className="cmn_modal">
                  {/* <h4 className="pop_main_h text-center">Send</h4>  */}
                  <div className="pop-top h-100">
                    <form className="mr-top-50 flex-group">
                      <div className="group-top">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control cmn_inpt_fld"
                            value={senderAddress}
                            onChange={(e) => handleChange(e)}
                            placeholder="Receiver address"
                          />
                          <div className="error-msg">
                            {!isValidAddress && senderAddress && (
                              <label className="mb-0 red-txt">
                                Enter a valid receiver address
                              </label>
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="position-relative">
                            <div className="float-input">
                              <input
                                type="number"
                                className="form-control cmn_inpt_fld"
                                placeholder="0.00"
                                value={sendAmount}
                                onChange={(e) => setSendAmount(e.target.value)}
                              />

                              <div
                                className="coin-dd float-dd"
                                onClick={() =>
                                  setSendModal({
                                    step0: false,
                                    step1: false,
                                    step2: false,
                                    step3: false,
                                    showTokens: true,
                                  })
                                }
                              >
                                <div id="div-autoclose-true" className="btn-dd">
                                  <div className="drop-flex">
                                    <div className="drop-chev">
                                      <img
                                        className="img-fluid"
                                        src="../../images/chev-drop.png"
                                        alt="chev-ico"
                                      />
                                    </div>
                                    {selectedToken ? (
                                      <div className="drop-ico">
                                        <img
                                          className="img-fluid"
                                          src="../../images/shiba-round-icon.png"
                                          alt="icon"
                                          width={24}
                                        />
                                        <span>
                                          {selectedToken.parentName
                                            ? selectedToken.parentName
                                            : "Select Token"}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="drop-text">
                                        <span>Select Token</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="error-msg">
                              {sendAmount &&
                              +sendAmount > selectedToken.balance &&
                              !selectedToken ? (
                                <label className="mb-0">Select token</label>
                              ) : (sendAmount &&
                                  +sendAmount > selectedToken.balance) ||
                                selectedToken?.balance <= 0 ? (
                                <label className="primary-text mb-0">
                                  Insufficient balance
                                </label>
                              ) : null}
                            </div>
                          </div>
                          <p className="inpt_fld_hlpr_txt">
                            <span>
                              <NumberFormat
                                thousandSeparator
                                displayType={"text"}
                                prefix="$ "
                                value={(
                                  (selectedToken?.balance || 0) * boneUSDValue
                                ).toFixed(2)}
                              />
                            </span>
                            <span style={{ cursor : 'pointer'}} onClick={() => setSendAmount(selectedToken.balance)}>
                              Balance:{" "}
                              {selectedToken.balance
                                ? selectedToken.balance
                                : "00.00"}{" "}
                              {selectedToken.parentSymbol
                                ? selectedToken.parentSymbol
                                : ""}
                            </span>
                          </p>
                        </div>
                        <div className="pop_btns_area mr-top-50 row top-exspace">
                          <div className="col-6">
                            <button
                              className="btn blue-btn w-100"
                              onClick={() =>
                                setSendModal({
                                  step0: true,
                                  step1: false,
                                  step2: false,
                                  step3: false,
                                  showTokens: false,
                                })
                              }
                            >
                              Back
                            </button>
                          </div>
                          <div className="col-6 active-btn">
                            <button
                              disabled={
                                isValidAddress &&
                                +sendAmount < selectedToken.balance &&
                                selectedToken.balance > 0
                                  ? false
                                  : true
                              }
                              onClick={() => handleSend()}
                              className="btn primary-btn w-100"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="pop-bottom">
                    <p className="pop_btm_txt text-center">
                      If you want to send funds between chains visit{" "}
                      <p style={{cursor: "pointer"}} className='primary-text' onClick={() => sendTokenWithRoute(selectedToken)} >Shibarium Bridge</p>
                    </p>
                  </div>
                </div>
              )}

              {/* send popop ends */}

              {/* confirm send popop start */}
              {showSendModal.step2 && (
                <div className="cmn_modal flex-group">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg mt-0">
                      <div className="top_overview col-12">
                        <span>
                          <img src="../../images/shib-borderd-icon.png" />
                        </span>
                        <h6 className="fw-700">{sendAmount} BONE</h6>
                        <p className="fw-600">
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={((+sendAmount || 0) * boneUSDValue).toFixed(
                              2
                            )}
                          />
                        </p>
                      </div>
                      <div className="add_detail col-12">
                        <p>
                          <b>Receiver:</b>
                        </p>
                        <p>{senderAddress}</p>
                      </div>
                    </div>
                    <div className="cnfrm_check_box">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={() => setVerifyAmount(!verifyAmount)}
                          // @ts-ignore
                          value={verifyAmount}
                          id="flexCheckChecked"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                        >
                          I’m not sending funds to an{" "}
                          <a href="#">unsupported excange</a> or incorrect
                          address
                        </label>
                        { !verifyAmount &&
                          <p className="primary-text mt-2 mt-sm-3">Please select the checkbox then proceed</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="pop_btns_area row sep-space pt-0">
                      <div className="col-6">
                        <button
                          className="btn blue-btn w-100"
                          onClick={() => {
                            setSendModal({
                              step0: false,
                              step1: true,
                              step2: false,
                              step3: false,
                              showTokens: false,
                            });
                            setVerifyAmount(false);
                          }}
                        >
                          Back
                        </button>
                      </div>
                      <div className="col-6 active-btn">
                        <button
                          className="btn primary-btn w-100"
                          disabled={verifyAmount ? false : true}
                          onClick={() => submitTransaction()}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                    <p className="pop_btm_txt text-center">
                      If you want to send funds between chains visit{" "}
                      <p style={{cursor: "pointer"}} className='primary-text' onClick={() => sendTokenWithRoute(selectedToken)} >Shibarium Bridge</p>
                    </p>
                  </div>
                </div>
              )}
              {/* confirm send popop ends */}

              {/* submitted popop start */}
              {showSendModal.step3 && (
                <div className="cmn_modal">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg mt-0">
                      <div className="top_overview col-12">
                        <span>
                          <img src="../../images/shib-borderd-icon.png" />
                        </span>
                        <h6 className="fw-700">{sendAmount} BONE</h6>
                        <p>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={((+sendAmount || 0) * boneUSDValue).toFixed(
                              2
                            )}
                          />
                        </p>
                      </div>
                      <div className="add_detail col-12">
                        <p>
                          <b>Transaction Submitted To:</b>
                        </p>
                        <p className="elip-text">{transactionHash}</p>
                      </div>
                    </div>
                    <div className="cnfrm_check_box text-center">
                      Check your wallet activity to see the status of the
                      transaction
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="pop_btns_area row form-control">
                      <div className="col-12">
                        <button
                          className="btn primary-btn w-100"
                          onClick={() => window.open(hashLink)}
                        >
                          View on Block Explorer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* submitted popop ends */}

              {/* Select token popop starts */}
              {showSendModal.showTokens && (
                <div className="popmodal-body tokn-popup token-ht">
                  <div className="pop-block">
                    <div className="pop-top">
                      <div className="sec-search">
                        <div className="position-relative search-row">
                          <input
                            type="text"
                            value={modalKeyword}
                            className="w-100"
                            placeholder="Search token or token address"
                            onChange={(e) =>
                              handleSearchList(e.target.value, "modal")
                            }
                          />
                          <div className="search-icon">
                            <img
                              width="20"
                              height="21"
                              className="img-fluid"
                              src="../../images/search.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className="token-sec">
                        <div className="info-grid">
                          {/* <p
                            className="mb-0"
                            onClick={() => {
                              setSendModal({
                                step0: false,
                                step1: true,
                                step2: false,
                                step3: false,
                                showTokens: false,
                              });
                              setmodalKeyword("");
                            }}
                          >
                            Back
                          </p> */}
                          <div>
                            <p>Token List</p>
                          </div>
                          <div className="token-btn-sec">
                            <button
                              type="button"
                              className="btn primary-btn w-100"
                            >
                              Manage Tokens
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="token-listwrap">
                        {tokenModalList
                          ? tokenModalList.map((x: any) => (
                              <div
                                className="tokn-row"
                                key={x.parentName}
                                onClick={() => {
                                  setSelectedToken(x);
                                  setSendModal({
                                    step0: false,
                                    step1: true,
                                    step2: false,
                                    step3: false,
                                    showTokens: false,
                                  });
                                }}
                              >
                                <div className="cryoto-box">
                                  <img
                                    className="img-fluid"
                                    src="../../images/shib-borderd-icon.png"
                                    alt=""
                                  />
                                </div>
                                <div className="tkn-grid">
                                  <div>
                                    <h6 className="fw-bold">
                                      {x.parentSymbol}
                                    </h6>
                                    <p>{x.parentName}</p>
                                  </div>
                                  <div>
                                    <h6 className="fw-bold">
                                      {x.balance
                                        ? x.balance
                                        : "00.00"}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            ))
                          : null}
                        {!tokenModalList.length && modalKeyword ? (
                          <p className="py-3 py-md-4 py-lg-5 text-center">
                            no record found
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Select token popop ends */}
            </>
          </CommonModalNew>
        </div>
        <section className="assets-section">
          <div className="cmn_dashbord_main_outr">
            <InnerHeader />
            {/* assets section start */}
            <div className="assets_outr">
              <h2>My Balance</h2>
              <div className="assets_top_area bal-row">
                <div className="bal-col">
                  <div className="main_net_amnt t_a_clm h-100">
                    <h1 className="fix-value">
                      <NumberFormat
                        thousandSeparator
                        displayType={"text"}
                        prefix="$ "
                        value={((availBalance || 0) * boneUSDValue).toFixed(2)}
                      />
                    </h1>
                    <p>{getNetworkName()}</p>
                  </div>
                </div>
                <div className="bal-col">
                  <div className="btns_area t_a_clm h-100">
                    <button
                      type="button"
                      onClick={() => setUserQrCode(true)}
                      className="btn grey-btn w-100 d-flex align-items-center justify-content-center"
                    >
                      <span className="me-2">
                        <img
                          className="btn-img"
                          src="../../images/recive-icon.png"
                          alt="recive"
                        />
                      </span>
                      Receive
                    </button>

                    <button
                      onClick={() => setSenderModal(true)}
                      className="btn grey-btn w-100 d-flex align-items-center justify-content-center"
                    >
                      <span className="me-2">
                        <img
                          className="btn-img"
                          src="../../images/send-icon.png"
                          alt="recive"
                        />
                      </span>
                      Send
                    </button>
                  </div>
                </div>
                <div className="bal-col">
                  <div className="lrg_btns_area t_a_clm">
                    <Link href="/">
                      <a className="btn white-btn w-100 d-block">
                        Move funds from Ethereum to Shibarium
                      </a>
                    </Link>

                    <Link  href="/how-it-works">
                      <a target="_blank" className="btn white-btn w-100 d-block">
                        How Shibarium works
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="assets_btm_area">
                <h2>Assets on {getNetworkName()}</h2>
                <div className="cmn_dasdrd_table mb-3 mb-sm-4 fix-layout walet-tb">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0 smb-0 fxd-layout">
                      <thead>
                        <tr>
                          <th colSpan={2}>Name</th>
                          <th className="text-center">Quantity - Balance</th>
                          {/* <th className="text-center"></th> */}
                          <th colSpan={3} className="th-wrap-col">
                            <div className="th-flex-col">
                              <div className="table-th">
                                <span>Actions</span>
                              </div>
                              <div className="table-search">
                                <input
                                  className="shib-search"
                                  value={searchKey}
                                  onChange={(e) => handleSearchList(e.target.value)}
                                  type="search"
                                  placeholder="Search"
                                />
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {slicedTokenFilteredList.length ? (
                          slicedTokenFilteredList.map((x: any) => (
                            <tr key={x.parentName}>
                              <td className="fix-td" colSpan={2}>
                                <span className="ms-1">
                                  <img src="../../images/shiba-round-icon.png" />
                                </span>
                                <b>{x.parentSymbol}</b> - {x.parentName}
                              </td>
                              <td className="fix-td">
                                <div className="d-flex align-items-center justify-content-center">
                                  <span>
                                    {(x.balance || "0.00")} -{" "}
                                  </span>
                                  <span>
                                    <NumberFormat
                                    thousandSeparator
                                    displayType={"text"}
                                    prefix="$ "
                                    value={(
                                      (x.balance || 0) * boneUSDValue
                                    ).toFixed(2)}
                                  />
                                  </span>
                                </div>
                              </td>
                              <td className="fix-td" colSpan={3}>
                                <div className="row mx-0">
                                  <div className="col-4 px-0">
                                      {/* <Link href="/withdraw"> */}
                                      <button className="d-block w-100" onClick={()=>sendTokenWithRoute(x)}>
                                        <a className="px-0 d-block hover-btn text-start">Deposit</a>
                                      </button>
                                      {/* </Link> */}
                                  </div>
                                  <div className="col-4 px-0">
                                  <button className="d-block w-100" onClick={()=>sendTokenWithRoute(x, "withdraw")}>
                                      <a className=" px-0 d-block text-center hover-btn">
                                        Withdraw
                                      </a>
                                    </button>
                                  </div>
                                  <div className="col-4 px-0">
                                    {/* <Link href="/"> */}
                                    <button className="d-block w-100 text-end" onClick={()=>{
                                      setSelectedToken(x);
                                      setSenderModal(true);
                                      }}>
                                      <a className=" px-0 me-2 hover-btn">Send</a>
                                    </button>
                                    {/* </Link> */}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : listLoader && !searchKey.length && !tokenFilteredList.length ? (
                          <tr>
                            <td colSpan={6}>
                              <DynamicShimmer
                                type={"table"}
                                rows={3}
                                cols={3}
                              />
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                  {searchKey.length && !tokenFilteredList.length ? (
                    // <tr>
                    //   <td colSpan={6}>
                    //     <p className="p-3 p-sm-4 p-xl-5 text-center float-found">
                    //       No record found
                    //     </p>
                    //   </td>
                    // </tr>
                    <div className="no-found">
                      <div className="no-found-img">
                        <img
                          className="img-fluid"
                          src="../../images/no-record.png"
                        />
                      </div>
                      {/* <p className="float-found text-center">No Record Found</p */}
                    </div>
                  ) : null}
                </div>
                <Pagination
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalCount={tokenFilteredList.length}
                  onPageChange={pageChangeHandler}
                />
              </div>
            </div>
            {/* assets section end */}
          </div>
        </section>
      </main>
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { ChainId } from "shibarium-get-chains";
import Web3 from "web3";
import { CommonModalNew } from "../components/CommonModel";
import InnerHeader from "../inner-header";
// @ts-ignore
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Sidebar from "../layout/sidebar";
import { useActiveWeb3React } from "app/services/web3";
import { useEthBalance } from "../../hooks/useEthBalance";
import { useTokenBalance } from "../../hooks/useTokenBalance";
import {
  BONE_ID,
  GOERLI_CHAIN_ID,
  PUPPYNET_CHAIN_ID,
} from "../../config/constant";
// import ERC20 from "../../ABI/ERC20Abi.json";
import fromExponential from "from-exponential";
import { useAppDispatch } from "../../state/hooks";
import {
  addTransaction,
  finalizeTransaction,
} from "../../state/transactions/actions";
import QrModal from "../components/QrModal";
import { getWalletTokenList } from "../../services/apis/validator/index";
import NumberFormat from "react-number-format";
import { dynamicChaining } from "../../web3/DynamicChaining";
import Pagination from "app/components/Pagination";
import DynamicShimmer from "app/components/Shimmer/DynamicShimmer";
import { getExplorerLink } from "app/functions";
import { currentGasPrice, getBoneUSDValue } from "web3/commonFunctions";
import { useABI } from "app/hooks/useABI";
import * as Sentry from "@sentry/nextjs";
const sendInitialState = {
  step0: true,
  step1: false,
  step2: false,
  step3: false,
  showTokens: false,
};

export const SortData = (a: any, b: any) => {
  if (a > b) return 1;
  else if (b > a) return -1;
  else return 0;
};

export default function Wallet() {
  const router = useRouter();
  const { chainId = 1, account, library } = useActiveWeb3React();
  const ethBal = useEthBalance();
  const tokenBal = useTokenBalance(dynamicChaining[chainId].BONE);
  const availBalance = chainId === ChainId.SHIBARIUM ? ethBal : tokenBal;
  const lib: any = library;
  const web3: any = new Web3(lib?.provider);
  const dispatch = useAppDispatch();

  const [listLoader, setListLoader] = useState(true);
  const [hashLink, setHashLink] = useState("");

  const [senderAddress, setSenderAdress] = useState("");
  const [userQrCode, setUserQrCode] = useState(false);
  const isValidAddress = false;
  const [sendAmount, setSendAmount] = useState("");
  const [senderModal, setSenderModal] = useState(false);
  const [verifyAmount, setVerifyAmount] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [boneUSDValue, setBoneUSDValue] = useState(0);
  const [showSendModal, setSendModal] = useState(sendInitialState);
  const [menuState, setMenuState] = useState(false);
  const [tokenList, setTokenList] = useState<any>([]);
  const [tokenFilteredList, setTokenFilteredList] = useState<any>([]);
  const [tokenModalList, setTokenModalList] = useState<any>([]);
  const [selectedToken, setSelectedToken] = useState<any>({});
  const [searchKey, setSearchKey] = useState<string>("");
  const [modalKeyword, setmodalKeyword] = useState<string>("");
  const [nullAddress, setNullAddress] = useState(false);
  const ERC20 = useABI("abis/pos/ERC20.json");
  useEffect(() => {
    if (tokenFilteredList.length) {
      let obj = tokenFilteredList
        .filter((x: any) => x.parentSymbol === "BoneToken")
        .map((y: any) => y)[0];
      setSelectedToken(obj);
    }
  }, [tokenFilteredList, tokenList]);

  // console.log(selectedToken)

  const getNetworkName = () => {
    try {
      if (chainId == GOERLI_CHAIN_ID) {
        return "Ethereum Mainnet";
      } else {
        return "Shibarium Mainnet";
      }
    } catch (err: any) {
      Sentry.captureException("getNetworkName ", err);
    }
  };

  const getTokensList = () => {
    try {
      // console.log("token list called ==> ")
      setListLoader(true);
      getWalletTokenList().then((res) => {
        let list = res.data.message.tokens;
        // .sort((a: any, b: any) => {
        //   return (parseInt(b.balance) - parseInt(a.balance));
        // });
        list.forEach(async (x: any) => {
          x.balance = 0; //await getTokenBalance(lib, account, x.parentContract)
        });
        setTokenList(list);
        setTokenFilteredList(list);
        setTokenModalList(list);
        setListLoader(false);
      });
    } catch (err: any) {
      Sentry.captureException("getTokensList ", err);
    }
  };

  // console.log(tokenList)

  useEffect(() => {
    if (account) {
      getBoneUSDValue().then((res: any) => {
        setBoneUSDValue(res);
      });
      getTokensList();
    } else {
      router.push("/");
    }
  }, [account]);

  const handleChange = (e: any) => {
    setNullAddress(true);
    setSenderAdress(e.target.value);
  };

  const handleMenuState = () => {
    // console.log("called click")
    setMenuState(!menuState);
  };

  const handleSend = (e: any) => {
    try {
      e.preventDefault();
      // console.log("called handleSend")
      if (isValidAddress && sendAmount && senderAddress) {
        // console.log("called handleSend")
        setSendModal({
          step0: false,
          step1: false,
          step2: true,
          step3: false,
          showTokens: false,
        });
      }
    } catch (err: any) {
      Sentry.captureException("handleSend ", err);
    }
  };
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [slicedTokenFilteredList, setSliceTokenFilteredList] = useState([]);

  useEffect(() => {
    if (tokenFilteredList.length) {
      const slicedList = tokenFilteredList.slice(0, pageSize);
      setSliceTokenFilteredList(slicedList);
    } else if (tokenFilteredList.length === 0) {
      setSliceTokenFilteredList([]);
    } else {
      // console.log("check state")
    }
  }, [tokenFilteredList]);

  const pageChangeHandler = (index: number) => {
    try {
      const slicedList = tokenFilteredList
        .sort((a: any, b: any) => {
          return b.balance - a.balance;
        })
        .slice((index - 1) * pageSize, index * pageSize);
      setSliceTokenFilteredList(slicedList);
      setCurrentPage(index);
    } catch (err: any) {
      Sentry.captureException("pageChangeHandler ", err);
    }
  };

  const handleSearchList = (key: any, type: any = "main") => {
    try {
      if (type === "modal") {
        setmodalKeyword(key);
      } else {
        setSearchKey(key);
      }
      if (key.length) {
        let newData = tokenList.filter((name: any) => {
          return Object.values(name)
            .join(" ")
            .toLowerCase()
            .includes(key.toLowerCase());
        });
        if (type === "modal") {
          setTokenModalList(newData);
        } else {
          setTokenFilteredList(newData);
          pageChangeHandler(currentPage);
        }
      } else {
        if (type === "modal") {
          setTokenModalList(tokenList);
        } else {
          setTokenFilteredList(tokenList);
        }
      }
    } catch (err: any) {
      Sentry.captureException("handleSearchList ", err);
    }
  };

  // console.log(tokenList, tokenFilteredList, slicedTokenFilteredList)

  const submitTransaction = async () => {
    try {
      let user: any = account;
      let amount = web3.utils.toBN(
        fromExponential(+sendAmount * Math.pow(10, 18))
      );
      let instance = new web3.eth.Contract(
        ERC20,
        "0x5063b1215bbF268ab00a5F47cDeC0A4783c3Ab58"
      );
      instance.methods.transfer(senderAddress, amount).send({ from: user });

      let gasFee = await instance.methods
        .transfer(senderAddress, amount)
        .estimateGas({ from: user });
      let encodedAbi = await instance.methods
        .transfer(senderAddress, amount)
        .encodeABI();
      let CurrentgasPrice: any = await currentGasPrice(web3);
      //  console.log((parseInt(gasFee) + 30000) * CurrentgasPrice, " valiuee ==> ")
      await web3.eth
        .sendTransaction({
          from: user,
          to: "0x5063b1215bbF268ab00a5F47cDeC0A4783c3Ab58",
          gas: (parseInt(gasFee) + 30000).toString(),
          gasPrice: CurrentgasPrice,
          // value : web3.utils.toHex(combinedFees),
          data: encodedAbi,
        })
        .on("transactionHash", (res: any) => {
          // console.log(res, "hash")
          setTransactionHash(res);
          setSendModal({
            step0: false,
            step1: false,
            step2: false,
            step3: true,
            showTokens: false,
          });
          dispatch(
            addTransaction({
              hash: res,
              from: user,
              chainId,
              summary: `${res}`,
            })
          );
          let link = getExplorerLink(chainId, res, "transaction");
          setHashLink(link);
        })
        .on("receipt", (res: any) => {
          // console.log(res, "response")
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
                status: 1,
              },
            })
          );
          setTokenFilteredList([]);
          setTokenList([]);
          getTokensList();
        })
        .on("error", (err: any) => {
          // console.log(err, "error")
          if (err.code === 4001) {
            setSenderModal(false);
            setSendModal(sendInitialState);
          }
        });
    } catch (err: any) {
      Sentry.captureException("submitTransaction ", err);
    }
  };

  // transactionCounts()

  const handleCloseModal = () => {
    setSenderModal(false);
    setVerifyAmount(false);
    setSendAmount("");
    setSenderAdress("");
    setSendModal(sendInitialState);
  };

  const sendTokenWithRoute = async (x: any, type: any = "deposit") => {
    try {
      // console.log("Router data for send", x)
      localStorage.setItem("depositToken", JSON.stringify(x));
      localStorage.setItem("bridgeType", type);
      await Router.push(`/bridge`);
    } catch (err: any) {
      Sentry.captureException("sendTokenWithRoute ", err);
    }
  };
  const setTitle = () => {
    if (showSendModal.step0) return "Transferring funds";
    else if (showSendModal.step1) return "Send";
    else if (showSendModal.step2) return "Confirm Send";
    else if (showSendModal.showTokens) return "Select Token";
    else return "Submitted";
  };
  const displayErr = () => {
    if (sendAmount && +sendAmount > selectedToken.balance && !selectedToken)
      return <label className="mb-0">Select token</label>;
    else if (
      (sendAmount && +sendAmount > selectedToken.balance) ||
      selectedToken?.balance <= 0
    )
      return <label className="primary-text mb-0">Insufficient balance</label>;
    else if (sendAmount === "" || +sendAmount <= 0)
      return <label className="primary-text mb-0">Balance Required</label>;

    return null;
  };

  const nullAddressRender = () => {
    if (nullAddress) {
      if (!isValidAddress) {
        return (
          <label className="mb-0 red-txt" style={{ color: "#F06500" }}>
            {senderAddress ? (
              <>Enter a valid receiver address</>
            ) : (
              <>receiver address should not be null</>
            )}
          </label>
        );
      } else {
        return null;
      }
    }
  };

  const selectedTokenRender = () => {
    if (selectedToken) {
      return (
        <div className="drop-ico">
          <img
            className="img-fluid"
            src="../../assets/images/shiba-round-icon.png"
            alt="icon"
            width={24}
          />
          <span>
            {selectedToken.parentName
              ? selectedToken.parentName
              : "Select Token"}
          </span>
        </div>
      );
    } else {
      return (
        <div className="drop-text">
          <span>Select Token</span>
        </div>
      );
    }
  };

  const paginationRender = () => {
    if (slicedTokenFilteredList.length) {
      return (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={tokenFilteredList.length}
          onPageChange={pageChangeHandler}
        />
      );
    } else {
      return null;
    }
  };

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
            setshow={setUserQrCode}
            address={account}
          />
        )}
        {/* QR modal ends */}
        <div className="">
          <CommonModalNew
            title={setTitle()}
            showClose={false}
            show={senderModal}
            setshow={handleCloseModal}
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
                          src="../../assets/images/i-info-icon.png"
                          width={16}
                        />
                      </div>
                      Sending funds to{" "}
                      <a href="#" className="text-primary">
                        {" "}
                        unsupported exchanges
                      </a>{" "}
                      will lead to permanent loss of funds.
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
                    <span className="pop_btm_txt text-center d-block">
                      If you want to send funds between chains visit{" "}
                      <p
                        style={{ cursor: "pointer" }}
                        className="primary-text"
                        onClick={() => sendTokenWithRoute(selectedToken)}
                      >
                        Shibarium Bridge test
                      </p>
                    </span>
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
                          <div className="error-msg">{nullAddressRender()}</div>
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
                                        src="../../assets/images/chev-drop.png"
                                        alt="chev-ico"
                                      />
                                    </div>
                                    {selectedTokenRender()}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="error-msg">{displayErr()}</div>
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
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setSendAmount(selectedToken.balance)
                              }
                            >
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
                              // disabled={
                              //   isValidAddress &&
                              //   +sendAmount < selectedToken.balance &&
                              //   selectedToken.balance > 0 &&
                              //   +sendAmount > 0
                              //     ? false
                              //     : true
                              // }
                              onClick={(e) => handleSend(e)}
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
                    <span className="pop_btm_txt text-center d-block">
                      If you want to send funds between chains visit{" "}
                      <p
                        style={{ cursor: "pointer" }}
                        className="primary-text"
                        onClick={() => sendTokenWithRoute(selectedToken)}
                      >
                        Shibarium Bridge
                      </p>
                    </span>
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
                          <img src="../../assets/images/shib-borderd-icon.png" />
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
                      <div className="form-check box-al">
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
                        {!verifyAmount && (
                          <p className="primary-text">
                            Please select the checkbox then proceed
                          </p>
                        )}
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
                    <span className="pop_btm_txt text-center d-block">
                      If you want to send funds between chains visit{" "}
                      <p
                        style={{ cursor: "pointer" }}
                        className="primary-text"
                        onClick={() => sendTokenWithRoute(selectedToken)}
                      >
                        Shibarium Bridge
                      </p>
                    </span>
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
                          <img src="../../assets/images/shib-borderd-icon.png" />
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
                              src="../../assets/images/search.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className="token-sec">
                        <div className="info-grid">
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
                                    src="../../assets/images/shib-borderd-icon.png"
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
                                      {x.balance ? x.balance : "00.00"}
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
                          src="../../assets/images/recive-icon.png"
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
                          src="../../assets/images/send-icon.png"
                          alt="recive"
                        />
                      </span>
                      Send
                    </button>
                  </div>
                </div>
                <div className="bal-col">
                  <div className="lrg_btns_area t_a_clm">
                    <Link href="/" passHref>
                      <a className="btn white-btn w-100 d-block">
                        Move funds from Ethereum to Shibarium
                      </a>
                    </Link>

                    <Link href="/how-it-works" passHref>
                      <a
                        target="_blank"
                        className="btn white-btn w-100 d-block"
                      >
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
                                  onChange={(e) =>
                                    handleSearchList(e.target.value)
                                  }
                                  type="search"
                                  placeholder="Search"
                                />
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {slicedTokenFilteredList.length
                          ? slicedTokenFilteredList.map((x: any) => (
                              <tr key={x.parentName}>
                                <td className="fix-td" colSpan={2}>
                                  <span className="ms-1">
                                    <img
                                      src={
                                        x.logo
                                          ? x.logo
                                          : "../../assets/images/shiba-round-icon.png"
                                      }
                                    />
                                  </span>
                                  <b>{x.parentSymbol}</b>
                                </td>
                                <td className="fix-td">
                                  <div className="d-flex align-items-center justify-content-center">
                                    <span>{x.balance || "0.00"} - </span>
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
                                      <button
                                        className="d-block w-100"
                                        onClick={() => sendTokenWithRoute(x)}
                                      >
                                        <a className="px-0 d-block hover-btn text-start">
                                          Deposit
                                        </a>
                                      </button>
                                      {/* </Link> */}
                                    </div>
                                    <div className="col-4 px-0">
                                      <button
                                        className="d-block w-100"
                                        onClick={() =>
                                          sendTokenWithRoute(x, "withdraw")
                                        }
                                      >
                                        <a className=" px-0 d-block text-center hover-btn">
                                          Withdraw
                                        </a>
                                      </button>
                                    </div>
                                    <div className="col-4 px-0">
                                      {/* <Link href="/"> */}
                                      <button
                                        className="d-block w-100 text-end"
                                        onClick={() => {
                                          setSelectedToken(x);
                                          setSenderModal(true);
                                        }}
                                      >
                                        <a className=" px-0 me-2 hover-btn">
                                          Send
                                        </a>
                                      </button>
                                      {/* </Link> */}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          : listLoader &&
                            !searchKey.length &&
                            !tokenFilteredList.length && (
                              <tr>
                                <td colSpan={6}>
                                  <DynamicShimmer
                                    type={"table"}
                                    rows={3}
                                    cols={3}
                                  />
                                </td>
                              </tr>
                            )}
                      </tbody>
                    </table>
                  </div>
                  {searchKey.length && !tokenFilteredList.length ? (
                    <div className="no-found">
                      <div className="no-found-img">
                        <img
                          className="img-fluid"
                          src="../../assets/images/no-record.png"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
                {paginationRender()}
              </div>
            </div>
            {/* assets section end */}
          </div>
        </section>
      </main>
    </>
  );
}

import React, { useState, useEffect } from "react";
import CommonModal from "../components/CommonModel";
import { getWalletTokenList } from "../../services/apis/validator/index";
import { getTokenBalance } from "../../hooks/useTokenBalance";
import { useActiveWeb3React } from "../../services/web3";
import { BONE_ID } from "../../config/constant";
import Web3 from "web3";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import {
  getBoneUSDValue,
  getDefaultChain,
  useStorage,
} from "../../web3/commonFunctions";
import TokenList from "./TokenList";
import { uniqBy } from "lodash";
import { useToken } from "app/hooks/Tokens";
import { CircularProgress } from "@material-ui/core";
import { ChainId } from "shibarium-get-chains";

export const Warning = ({
  listing,
  setCoinList,
  resetLink,
  sortedLists,
}: any) => {
  const [agree, setAgree] = useState(false);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="../../assets/images/alert.png" alt=""></img>
      </div>
      <h3 style={{ textAlign: "center", margin: "10px" }}>
        Import at your own risk
      </h3>
      <div style={{ fontSize: "15px", margin: "10px" }}>
        By adding this token you are implicitly trusting that the data is
        correct. If you purchase this token, you may not be able to sell it
        back.
      </div>
      <div style={{ textAlign: "center" }}>
        <label style={{ margin: "10px 0", textAlign: "center" }}>
          <input
            style={{ marginRight: "5px" }}
            type="checkbox"
            checked={agree}
            onChange={() => setAgree((a) => !a)}
          />
          I understand
        </label>
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          className="btn primary-btn"
          style={{ width: "200px" }}
          disabled={!agree}
          onClick={() => {
            if (!agree) return;
            setTimeout(() => {
              setCoinList((l: any) => [
                {
                  data: listing.url,
                  enabled: false,
                },
                ...l,
              ]);
              sortedLists();
              resetLink();
            }, 1);
          }}
        >
          Import
        </button>
      </div>
    </>
  );
};
export default function ManageToken({
  setLoader,
  setOpenManageToken,
  setSelectedToken,
  defUrl = (id: any) => `https://api.1inch.exchange/v3.0/${id}/tokens`,
  ...props
}: any) {
  const { chainId = 1, account, library } = useActiveWeb3React();
  const lib: any = library;
  const web3: any = new Web3(lib?.provider);

  const [showTokenModal, setTokenModal] = useState(true);
  const [boneUSDValue, setBoneUSDValue] = useState(0); //NOSONAR
  const [newToken, addNewToken] = useState("");
  const [confirmImport, setConfirmImport] = useState(true);
  const [agreeImport, setAgreeImport] = useState(false);
  const [dupToken, setDuplicateToken] = useState(false);
  const [addUrl, setAddUrl] = useState("");
  const [linkQuery, setLinkQuery] = useState("");
  const [coinList, setCoinList, setChain] = useStorage();
  const [isWrong, setIsWrong] = useState(false); //NOSONAR
  const [defChain, setDefChain] = useState("");
  const [DEFAULT_LIST, SET_DEFAULT_LIST] = useState({
    enabled: true,
    locked: true,
    data: "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link",
  }); //NOSONAR
  // console.log("final list => ", coinList);
  useEffect(() => {
    getDefaultChain().then((ch) => {
      setDefChain(ch);
    });
  }, []);
  useEffect(() => {
    getDefaultChain()
      .then((chain) => {
        //@ts-ignore
        // setAddUrl(`https://${map[chain]}scan.com/address/`);
        setAddUrl("https://puppyscan.shib.io/address/");
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    getBoneUSDValue().then((res: any) => {
      setBoneUSDValue(res);
    });
  }, [account]);
  const [tokenState, setTokenState] = useState({
    step0: true,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    title: "Select a Token",
  });
  const [tokenModalList, setTokenModalList] = useState<any>([]);
  const [modalKeyword, setmodalKeyword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const searchToken: any = useToken(newToken);
  const [localTokens, setLocalTokens] = useState<any>(
    JSON.parse(localStorage.getItem("newToken") || "[]")
  );
  const [importedTokens, setImportedTokens] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedList, setSearchedList] = useState<any>(null);
  const [offset, setOffset] = useState<any>(10);
  const [tempTokens, setTempTokens] = useState<any>({
    parentContract: "",
    name: "",
    symbol: "",
    decimals: "",
    addedByUser: false,
    logo: "",
    chainId: "",
  });
  console.log("step ", searchToken, newToken);
  const getTokensList = async () => {
    setIsLoading(true);
    try {
      await getWalletTokenList().then((res) => {
        let list = [...localTokens, ...res.data.message.tokens];
        // console.log("token to search =>" , list)
        list.forEach(async (x: any) => {
          let tokenAddress =
            chainId === ChainId.GÖRLI ? x?.parentContract : x?.childContract;
          await getTokenBalance(lib, account, tokenAddress)
            .then((res: any) => {
              x.balance = res > 0 ? res : "00.00";
            })
            .catch((err: any) => {
              console.log("Error fetching balance => ", err);
            });
        });
        setTokenModalList([...list]);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
    } catch (err: any) {
      setIsLoading(false);
      Sentry.captureMessage("getTokensList", err);
    }
  };
  useEffect(() => {
    if (account) {
      getTokensList();
    }
  }, [account]);


  const handleLink = (x: any, addUrl: any) => {
    let url;
    if (x.childContract) {
      url = addUrl + x.childContract
    } else if (x.address) {
      url = addUrl + x.address
    } else {
      url = x.parentContract
    }
    return url
  }

  const handleSearchList = (key: any) => {
    try {
      setmodalKeyword(key);
      if (key.length) {
        let combinedList = [...tokenModalList, ...importedTokens];
        let newData = combinedList.filter((item: any) => {
          let found = false;
          Object.keys(item).forEach((k: any) => {
            if (`${item[k]}`.toLowerCase().includes(key.toLowerCase())) {
              found = true;
            }
          });
          return found;
        });
        setSearchedList(newData);
        setOffset(10);
      } else {
        setSearchedList(null);
        setOffset(10);
      }
    } catch (err: any) {
      Sentry.captureMessage("handleSearchList", err);
    }
  };
  console.log("searched ", searchedList);
  const handleTokenSelect = (token: any) => {
    setOpenManageToken(false);
    setLoader(false);
    setSelectedToken(token);
    setTokenModal(false);
  };

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
    event.currentTarget.className = "error me-2";
  };

  const addTokenHandler = async () => {
    addNewToken("");
    setConfirmImport(true);
    setAgreeImport(!agreeImport);
    try {
      let tokenInfo = searchToken?.tokenInfo;
      console.log("token info => ", tokenInfo);
      let obj: any;
      if (tokenInfo) {
        let logoURI: any;
        if (tokenInfo?.logoURI.startsWith("ipfs://")) {
          logoURI = "https://ipfs.io/ipfs/" + tokenInfo?.logoURI.slice(7);
        } else {
          logoURI = tokenInfo?.logoURI;
        }
        obj = {
          parentContract: tokenInfo?.address,
          name: tokenInfo?.name,
          symbol: tokenInfo?.symbol,
          decimals: tokenInfo?.decimals,
          logo: logoURI,
          chainId: tokenInfo?.chainId,
          balance: 0,
          addedByUser: true,
        };
        setLocalTokens([...localTokens, obj]);
        setTokenModalList([...tokenModalList, obj]);
        toast.success(`${obj.name} successfully added.`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
        setTokenState({
          step0: false,
          step1: false,
          step2: false,
          step3: false,
          step4: true,
          title: "Manage Token",
        });
      } else {
        console.log("no record found");
        setTempTokens({});
      }
    } catch (err: any) {
      Sentry.captureMessage("addTokenHandler", err);
    }
  };

  useEffect(() => {
    if (!showTokenModal) {
      addNewToken("");
    }
  }, [showTokenModal]);

  useEffect(() => {
    try {
      if (showTokenModal) {
        localStorage.setItem("newToken", JSON.stringify(localTokens));
        let uniqueObjArray = [
          ...new Map(
            localTokens.map((item: any) => [item["parentContract"], item])
          ).values(),
        ];
        let uniqueObjArray2 = [
          ...new Map(
            tokenModalList.map((item: any) => [item["parentContract"], item])
          ).values(),
        ];
        let combineArray = [...uniqueObjArray, ...uniqueObjArray2];
        let finalUniqueArray = [
          ...new Map(
            combineArray.map((item: any) => [item["parentContract"], item])
          ).values(),
        ];
        setTokenModalList(finalUniqueArray);
      }
    } catch (err: any) {
      Sentry.captureMessage("UseEffect line 512 in bridge backup ", err);
    }
  }, [localTokens]);

  useEffect(() => {
    try {
      if (tokenModalList.length > 0) {
        let updatedArray = [...tokenModalList, ...localTokens];
        let uniqArray = uniqBy(updatedArray, "name");
        setTokenModalList(uniqArray);
      }
    } catch (err: any) {
      Sentry.captureMessage("UseEffect line 540", err);
    }
  }, []);

  useEffect(() => {
    if (newToken !== "") {
      getTempTokens();
    }
  }, [searchToken, newToken]);
  const getTempTokens = async () => {
    try {
      console.log("step 1");
      if (account) {
        const isalreadypresent = localTokens.find(
          (st: any) => st.parentContract == newToken
        );
        const foundInTokenModalList = tokenModalList.find(
          (e: any) => e.parentContract == newToken
        );
        const foundInimportedTokens = importedTokens.find(
          (e: any) => e.address == newToken
        );
        console.log("step 2");
        setTokenState({
          step0: false,
          step1: false,
          step2: false,
          step3: true,
          step4: false,
          title: "Manage Token",
        });
        if (
          !!isalreadypresent ||
          !!foundInTokenModalList ||
          !!foundInimportedTokens
        ) {
          setDuplicateToken(true);
        } else {
          console.log("step 3");
          const isValidAddress = web3.utils.isAddress(String(newToken));
          if (isValidAddress && newToken) {
            let tokenInfo = searchToken?.tokenInfo;
            console.log("step 4 ", tokenInfo);
            if (tokenInfo) {
              let logoURI = tokenInfo?.logoURI;
              if (tokenInfo.logoURI.startsWith("ipfs://")) {
                logoURI = "https://ipfs.io/ipfs/" + tokenInfo?.logoURI.slice(7);
              }
              setTempTokens({
                parentContract: tokenInfo?.address,
                name: tokenInfo?.name,
                symbol: tokenInfo?.symbol,
                decimals: tokenInfo?.decimals,
                logo: logoURI,
                chainId: tokenInfo?.chainId,
                addedByUser: true,
              });
            } else {
              setTempTokens({});
            }
          } else if (!isValidAddress && newToken) {
            setIsLoading(false);
            toast.error("Invalid Address", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 600,
            });
            setTokenState({
              step0: false,
              step1: false,
              step2: true,
              step3: false,
              step4: false,
              title: "Manage Token",
            });
          }
        }
      }
    } catch (err: any) {
      Sentry.captureMessage("getTempTokens", err);
    }
  };

  const clearAllCustomTokens = () => {
    try {
      let checkArray = tokenModalList;
      let localtokenarray = localTokens.map((st: any) => st.parentContract);
      const notLocalTokens = checkArray.filter(
        (item: any) => !localtokenarray.includes(item.parentContract)
      );
      setTokenModalList(notLocalTokens);
      setLocalTokens([]);
      localStorage.setItem("newToken", "[]");
    } catch (err: any) {
      Sentry.captureMessage("clearAllCustomTokens", err);
    }
  };

  // const confirmDeleteToken = (index) => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => spliceCustomToken(index),
  //       },
  //       {
  //         label: "No",
  //         //onClick: () => alert('Click No')
  //       },
  //     ],
  //   });
  // };
  const spliceCustomToken = (index: any) => {
    try {
      if (window.confirm("Are you sure you want to delete this token?")) {
        let incomingObject = localTokens[index];
        const filteredModallist = localTokens.filter((ss: any) => {
          return ss.parentContract !== incomingObject.parentContract;
        });
        setLocalTokens(filteredModallist);
        const filtered2 = tokenModalList.filter((ss: any) => {
          return ss.parentContract !== incomingObject.parentContract;
        });
        setTokenModalList(filtered2);
      }
    } catch (err: any) {
      Sentry.captureMessage("spliceCustomToken ", err);
    }
  };

  useEffect(() => {
    let fetchList = JSON.parse(localStorage.getItem("tokenList") || "[]");
    if (fetchList.length) {
      let enabledTokens = fetchList.filter((e: any) => e?.enabled === true);
      enabledTokens.map((e: any) => {
        let uniqueTokens = uniqBy(e?.tokens, "name");
        return setImportedTokens([...importedTokens, ...uniqueTokens]);
      });
    }
  }, []);

  const onBackClick = () => {
    setTokenModal(true);
    setConfirmImport(true);
    setAgreeImport(false);
    setTokenState({
      step0: true,
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      title: "Select a Token",
    });
  };

  return (
    <div>
      {/* Token popups start */}
      <CommonModal
        title={"Select token"}
        show={showTokenModal}
        setshow={() => {
          setOpenManageToken(false);
          setTokenModal(false);
          setLoader(false);
        }}
        externalCls="tkn-ht"
      >
        {/* Token popups start */}
        <>
          {/* Select token popop starts */}
          {showTokenModal && tokenState.step0 && (
            <div className="popmodal-body tokn-popup no-ht">
              <div className="pop-block">
                <div className="pop-top">
                  <div className="sec-search ng-16">
                    <div className="position-relative search-row">
                      <input
                        type="text"
                        className="w-100"
                        placeholder="Search token or token address"
                        onChange={(e) => {
                          handleSearchList(e.target.value);
                          console.log("searched list ", e.target.value);
                          // getTempTokens()
                        }}
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
                          onClick={() => {
                            setTokenState({
                              step0: false,
                              step1: false,
                              step2: true,
                              step3: false,
                              step4: false,
                              title: "Manage Token",
                            });
                            setOffset(10);
                            setSearchedList(null);
                          }}
                        >
                          Manage Tokens
                        </button>
                      </div>
                    </div>
                  </div>
                  {!isLoading ? (
                    <div
                      className="token-listwrap noScrollbar"
                      id="scrollable-tokenList"
                    >
                      {defChain && (
                        <TokenList
                          coinList={coinList}
                          DEFAULT_ITEM={DEFAULT_LIST}
                          // shouldReset={firstKey}
                          searchedList={searchedList}
                          handleTokenSelect={handleTokenSelect}
                          setCoinList={setCoinList}
                          setTokenModalList={setTokenModalList}
                          showWarning={showWarning}
                          setShowWarning={setShowWarning}
                          defaultChain={defChain}
                          setChain={setChain}
                          linkQuery={linkQuery}
                          setLinkQuery={setLinkQuery}
                          tokenModalList={tokenModalList}
                          tokenState={tokenState}
                          offset={offset}
                        />
                      )}
                      {!tokenModalList.length && modalKeyword ? (
                        <p className="py-3 py-md-4 py-lg-5 text-center">
                          no record found
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <div className="text-center pt-5">
                      <CircularProgress
                        size={80}
                        style={{ color: "#f28102" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Select token popop ends */}

          {/* Manage token popop starts */}

          {showTokenModal && tokenState.step1 && (
            <div className="popmodal-body tokn-popup no-ht">
              <button className="myBackBtnInTM" onClick={onBackClick}>
                <img src="../../assets/images/back.png" alt=""></img>
              </button>
              <div className="pop-block">
                <div className="pop-top">
                  <div className="black-bg-sec">
                    <div className="token-btn-sec pop-btns-grid">
                      <div className="blk-width">
                        <button
                          type="button"
                          className={`btn w-100 ${tokenState.step1 && "btn-active"
                            }`}
                        >
                          Token Lists
                        </button>
                      </div>
                      <div className="blk-width">
                        <button
                          type="button"
                          className={`btn w-100 ${tokenState.step2 && "btn-active"
                            }`}
                          onClick={() => {
                            setTokenState({
                              step0: false,
                              step1: false,
                              step2: true,
                              step3: false,
                              step4: false,
                              title: "Manage Token",
                            });
                            addNewToken("");
                          }}
                        >
                          Add token
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="sec-search sec-search-secondry">
                    <div className="position-relative search-row">
                      <input
                        type="text"
                        className="w-100"
                        placeholder="Add list by https://"
                        value={linkQuery}
                        onChange={(e) => {
                          if (e.target.value) {
                            setLinkQuery(e.target.value);
                          } else {
                            setLinkQuery("");
                          }
                        }}
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
                  <div className="token-listwrap list-ht noScrollbar">
                    <>
                      {isWrong ? <div>Seems like the url is broken</div> : ""}
                    </>
                    {defChain && (
                      <TokenList
                        coinList={coinList}
                        DEFAULT_ITEM={DEFAULT_LIST}
                        // shouldReset={firstKey}
                        searchedList={searchedList}
                        handleTokenSelect={handleTokenSelect}
                        setCoinList={setCoinList}
                        setTokenModalList={setTokenModalList}
                        showWarning={showWarning}
                        setShowWarning={setShowWarning}
                        defaultChain={defChain}
                        setChain={setChain}
                        linkQuery={linkQuery}
                        setLinkQuery={setLinkQuery}
                        tokenModalList={tokenModalList}
                        tokenState={tokenState}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manage token popop ends */}

          {/* Add token popop starts */}

          {showTokenModal && tokenState.step2 && (
            <div className="popmodal-body tokn-popup no-ht">
              <button className="myBackBtnInTM" onClick={onBackClick}>
                <img src="../../assets/images/back.png" alt=""></img>
              </button>
              <div className="pop-block">
                <div className="pop-top">
                  <div className="sec-search sec-search-secondry">
                    <div
                      className="position-relative search-row"
                    // onClick={() => {
                    //   if(newToken !== '')
                    //   setTokenState({
                    //     step0: false,
                    //     step1: false,
                    //     step2: false,
                    //     step3: true,
                    //     step4: false,
                    //     title: "Manage Token",
                    //   });
                    // }}
                    // onClick={() => {
                    //   addTokenHandler();
                    // }}
                    >
                      <input
                        type="text"
                        className="w-100"
                        placeholder="Enter Token Address"
                        autoFocus={newToken.length > 0}
                        // value={newToken}
                        onChange={(e: any) => {
                          setDuplicateToken(false);
                          if (e.target.value) {
                            addNewToken(e.target.value);
                            // console.log("if condition")
                          } else {
                            // console.log("else  condition")
                            addNewToken("");
                            setTempTokens({});
                            setTokenState({
                              step0: false,
                              step1: false,
                              step2: true,
                              step3: false,
                              step4: false,
                              title: "Manage Token",
                            });
                          }
                        }}
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
                  <div className="pop-bottom pt-0">
                    <div className="">
                      <div className="grid-block">
                        <div className="blk-width">
                          <div>{localTokens.length} Token Found</div>
                          <p className="lite-color">
                            Token stored in your browser
                          </p>
                        </div>
                        <div style={{ textAlign: "right" }} className="btn-sm">
                          {/* className="blk-width btn-sm" */}
                          <button
                            type="button"
                            // className="btn primary-btn w-95"
                            className="primary-text"
                            onClick={clearAllCustomTokens}
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                      <div className="token-listwrap usr-listht">
                        {dupToken && (
                          <div className="dupToken" style={{ color: "red" }}>
                            Token already exists.
                          </div>
                        )}
                        {localTokens.map((x: any, index: any) => (
                          <div className="tokn-row" key={x?.parentContract}>
                            <div className="cryoto-box">
                              <img
                                className="img-fluid"
                                src={
                                  x?.logo || x?.logoURI
                                    ? x.logo || x?.logoURI
                                    : "../../../assets/images/shib-borderd-icon.png"
                                }
                                onError={imageOnErrorHandler}
                                width={40}
                                alt=""
                              />
                            </div>
                            <div className="tkn-grid">
                              <div>
                                <div className="d-flex align-items-end">
                                  <h6 className="fw-bold">
                                    {x?.parentSymbol || x?.symbol}
                                  </h6>
                                  {x?.addedByUser && (
                                    <small
                                      className="ms-2"
                                      style={{ color: "#666" }}
                                    >
                                      Added By User
                                    </small>
                                  )}
                                </div>
                                <p>{x?.parentName || x?.name}</p>
                              </div>
                              <div>
                                <span
                                  className="me-4"
                                  onClick={() => spliceCustomToken(index)}
                                >
                                  <img
                                    className="img-fluid"
                                    src="../../../assets/images/del.png"
                                    alt=""
                                  />
                                </span>
                                <span>

                                  <Link
                                    href="https://puppyscan.shib.io/address/"
                                    passHref
                                  >
                                    <a target="_blank">
                                      <img
                                        className="img-fluid"
                                        src="../../../assets/images/up.png"
                                        alt=""
                                      />
                                    </a>
                                  </Link>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="pop-mid">
                    <div className="center-content">
                      <p>Custom token not found Add your first custom token</p>
                    </div>
                  </div> */}

                <div className="myTipsArea">
                  Tip: Custom tokens are stored locally in your browser{" "}
                </div>
              </div>
            </div>
          )}
          {/* Add token popop ends */}

          {/* search popop starts */}

          {showTokenModal && tokenState.step3 && (
            <div className="popmodal-body tokn-popup no-ht">
              <button className="myBackBtnInTM" onClick={onBackClick}>
                <img src="../../assets/images/back.png" alt=""></img>
              </button>
              <div className="pop-block">
                <div className="pop-top">
                  <div className="sec-search sec-search-secondry">
                    <div className="position-relative search-row">
                      <input
                        type="text"
                        className="w-100"
                        placeholder="Enter Token Address"
                        onChange={(e) => {
                          setDuplicateToken(false);
                          if (e.target.value) {
                            addNewToken(e.target.value);
                          } else {
                            addNewToken("");
                            setTempTokens({});
                            setTokenState({
                              step0: false,
                              step1: false,
                              step2: true,
                              step3: false,
                              step4: false,
                              title: "Manage Token",
                            });
                          }
                        }}
                        autoFocus={newToken.length > 0}
                        value={newToken ? newToken : ""}
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
                  <div className="pop-bottom pt-0">
                    {confirmImport ? (
                      <>
                        <div className="">
                          <div className="grid-block">
                            <div className="blk-width">
                              <div>{localTokens.length} Token Found</div>
                              <p className="lite-color">
                                Token stored in your browser
                              </p>
                            </div>
                            <div
                              style={{ textAlign: "right" }}
                              className="btn-sm"
                            >
                              {/* className="blk-width btn-sm" */}
                              <button
                                type="button"
                                // className="btn primary-btn w-100"
                                className="primary-text"
                                onClick={clearAllCustomTokens}
                              >
                                Clear All
                              </button>
                            </div>
                          </div>
                          <div className="token-listwrap usr-listht">
                            <div className="token-listwrap usr-listh">
                              {dupToken && (
                                <div style={{ color: "red" }}>
                                  Token already exists.
                                </div>
                              )}
                              {dupToken === false &&
                                (tempTokens &&
                                  Object.keys(tempTokens).length !== 0 ? (
                                  <div className="tokn-row">
                                    <div className="cryoto-box">
                                      <img
                                        className="img-fluid"
                                        src={
                                          tempTokens?.logo
                                            ? tempTokens?.logo
                                            : "../../../assets/images/shib-borderd-icon.png"
                                        }
                                        width={40}
                                        alt=""
                                        onError={imageOnErrorHandler}
                                      />
                                    </div>
                                    <div className="tkn-grid">
                                      <div>
                                        <h6 className="fw-bold">
                                          {tempTokens?.parentSymbol ||
                                            tempTokens?.symbol
                                            ? tempTokens.parentSymbol ||
                                            tempTokens?.symbol
                                            : "Unknown"}
                                        </h6>
                                        <p>
                                          {tempTokens?.parentSymbol ||
                                            tempTokens?.name
                                            ? tempTokens.parentSymbol ||
                                            tempTokens?.name
                                            : "Unknown"}
                                        </p>
                                      </div>
                                      <div>
                                        <span
                                          className="primary-text"
                                          onClick={() => {
                                            setConfirmImport(!confirmImport);
                                          }}
                                        >
                                          Import
                                          {/* <img
                                      className="img-fluid"
                                      src="../../../assets/images/up.png"
                                      alt=""
                                    /> */}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div>No token found</div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img src="../../assets/images/alert.png" alt=""></img>
                        </div>
                        <h3 style={{ textAlign: "center", margin: "10px" }}>
                          Import at your own risk
                        </h3>
                        <div style={{ fontSize: "15px", margin: "10px" }}>
                          By adding this token you are implicitly trusting that
                          the data is correct. If you purchase this token, you
                          may not be able to sell it back.
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <label
                            style={{ margin: "10px 0", textAlign: "center" }}
                          >
                            <input
                              style={{ marginRight: "5px" }}
                              type="checkbox"
                              onChange={() => setAgreeImport(!agreeImport)}
                            />
                            I understand
                          </label>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <button
                            className="btn primary-btn"
                            style={{ width: "200px" }}
                            disabled={agreeImport === false}
                            onClick={addTokenHandler}
                          >
                            Import
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pop-bottom">
                  <div className="">
                    <div className="myTipsArea">
                      Tip: Custom tokens are stored locally in your browser{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            // </div>
          )}
          {/* Search popop ends */}

          {/* new added token with delete action starts */}
          {showTokenModal && tokenState.step4 && (
            <div className="popmodal-body tokn-popup no-ht">
              <button className="myBackBtnInTM" onClick={onBackClick}>
                {/* BO */}
                <img src="../../assets/images/back.png" alt=""></img>
              </button>
              <div className="pop-block">
                <div className="pop-top">
                  <div className="sec-search sec-search-secondry">
                    <div className="position-relative search-row">
                      <input
                        type="text"
                        className="w-100"
                        placeholder="Enter Token Address"
                        autoFocus={newToken.length > 0}
                        onChange={(e: any) => {
                          setDuplicateToken(false);
                          if (e.target.value) {
                            addNewToken(e.target.value);
                          } else {
                            addNewToken("");
                            setTempTokens({});
                            setTokenState({
                              step0: false,
                              step1: false,
                              step2: true,
                              step3: false,
                              step4: false,
                              title: "Manage Token",
                            });
                          }
                        }}
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
                  <div className="pop-bottom pt-0">
                    <div className="">
                      <div className="grid-block">
                        <div className="blk-width">
                          <div>{localTokens?.length} Token Found</div>
                          <p className="lite-color">
                            Token stored in your browser
                          </p>
                        </div>
                        <div style={{ textAlign: "right" }} className="btn-sm">
                          {/* className="blk-width btn-sm" */}
                          <button
                            type="button"
                            // className="btn primary-btn w-100"
                            className="primary-text"
                            onClick={clearAllCustomTokens}
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="token-listwrap usr-listht">
                    {localTokens.map((x: any, index: any) => (
                      <div className="tokn-row" key={x.parentContract}>
                        <div className="cryoto-box">
                          <img
                            className="img-fluid"
                            src={
                              x?.logo
                                ? x.logo
                                : "../../../assets/images/shib-borderd-icon.png"
                            }
                            onError={imageOnErrorHandler}
                            width={40}
                          />
                        </div>
                        <div className="tkn-grid">
                          <div>
                            <h6 className="fw-bold">
                              {x.symbol ? x?.symbol : "Unknown"}
                            </h6>
                            <p>{x?.name ? x?.name : "Unknown"}</p>
                          </div>
                          <div>
                            <span
                              className="me-4"
                              onClick={() => spliceCustomToken(index)}
                            >
                              <img
                                className="img-fluid"
                                src="../../../assets/images/del.png"
                                alt=""
                              />
                            </span>
                            <span>
                              <Link href={addUrl + x.parentContract} passHref>
                                <a target="_blank">
                                  <img
                                    className="img-fluid"
                                    src="../../../assets/images/up.png"
                                    alt=""
                                  />
                                </a>
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* new added token with delete action ends */}
                  </div>
                </div>

                <div className="myTipsArea">
                  Tip: Custom tokens are stored locally in your browser{" "}
                </div>
              </div>
            </div>
          )}

          {/* Token popups end */}
        </>
      </CommonModal>
      {/* Token popups end */}
    </div>
  );
}

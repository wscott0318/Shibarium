import React, { useState, useEffect } from "react";
import CommonModal from "../components/CommonModel";
import { getWalletTokenList } from "../../services/apis/validator/index";
import { getTokenBalance } from "../../hooks/useTokenBalance";
import { getBoneUSDValue } from "../../services/apis/validator/index";
import { useActiveWeb3React } from "../../services/web3";
import { BONE_ID } from "../../config/constant";
import Web3 from "web3";
import { useAppDispatch } from "../../state/hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addTokenAbi from "../../ABI/custom-token-abi.json";
import * as Sentry from "@sentry/nextjs";
import { dynamicChaining } from "web3/DynamicChaining";
import Link from "next/link";
import { fetchLink, getDefaultChain, useStorage } from "../../web3/commonFunctions";
import { useLocation, useRoutes } from "react-router-dom";
import TokenList from "./TokenList";

export const Warning = ({ listing, setCoinList, resetLink, addTokenHandler }: any) => {
  const [agree, setAgree] = useState(false);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}><img src="../../assets/images/alert.png" alt=""></img></div>
      <h3 style={{ textAlign: "center", margin: "10px" }}>Import at your own risk</h3>
      <div style={{ fontSize: "15px", margin: "10px" }}>
        By adding this token you are implicitly trusting
        that the data is correct. If you purchase this token, you may not be able to
        sell it back.
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
                  enabled: true,
                },
                ...l,
              ]);
              resetLink();
              
              // console.log("listing ==> ", listing);
            }, 1);
          }}
        >
          Import
        </button>
      </div>
    </>
  );
};
export default function ManageToken({ setOpenManageToken, setSelectedToken, defUrl = (id: any) => `https://api.1inch.exchange/v3.0/${id}/tokens`, ...props }: any) {

  const { chainId = 1, account, library } = useActiveWeb3React();
  const lib: any = library;
  const web3: any = new Web3(lib?.provider);
  const dispatch = useAppDispatch();

  const bridgeType: string = localStorage.getItem("bridgeType") || "deposit";
  // const [selectedToken, setSelectedToken] = useState(
  //   JSON.parse(localStorage.getItem("depositToken") || "{}")
  // );
  const [showTokenModal, setTokenModal] = useState(true);
  const [boneUSDValue, setBoneUSDValue] = useState(0);
  const [newToken, addNewToken] = useState("");
  const [confirmImport, setConfirmImport] = useState(true);
  const [agreeImport, setAgreeImport] = useState(false);
  const [dupToken, setDuplicateToken] = useState(false);
  const [addUrl, setAddUrl] = useState('');
  const [linkQuery, setLinkQuery] = useState("");
  // const [newListing, setNewListing] = useState(null);
  const [coinList, setCoinList, setChain] = useStorage();
  const [isWrong, setIsWrong] = useState(false);
  const [defChain, setDefChain] = useState("");
  // const [firstKey, setFirstKey] = useState(Math.random());
  const [DEFAULT_LIST, SET_DEFAULT_LIST] = useState({ enabled: true, locked: true, data: 'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link' })
  // const handleMenuState = () => {
  //   setMenuState(!menuState);
  // };
  // const router = useRouter()
  // useEffect(() => {
  //   console.log("chain id  , ", SUPPORTED_NETWORKS);
  // })
  // const { search } = useLocation();
  // const chain = new URLSearchParams(search).get('chain');
  // useEffect(() => {
  //   if(defUrl().includes('1inch')){
  //     SET_DEFAULT_LIST({ enabled: true, locked: true, data: defUrl() });
  //   }
  // }, [defUrl()]);
  // useEffect(() => {
  //   if (chain) {
  //     // @ts-ignore
  //     setChain(chain);
  //     console.log(DEFAULT_LIST);
  //   }
  // }, [chain])
  useEffect(() => {
    getDefaultChain().then((ch) => {
      setDefChain(ch);
    });
  }, []);
  useEffect(() => {
    getDefaultChain().then(chain => {
      const map = { 'bsc': 'bsc', 'eth': 'ether' };
      //@ts-ignore
      setAddUrl(`https://${map[chain]}scan.com/address/`);
    }).catch(() => { });
  }, []);

  // useEffect(() => {
  //   if (linkQuery) {
  //     fetchLink(linkQuery, setNewListing, setIsWrong);
  //     console.log("new listing 130 ==> " , newListing, linkQuery);
  //   }
  //   else {
  //     setNewListing(null);
  //     setIsWrong(false);
  //   }
  // }, [linkQuery]);

  useEffect(() => {
    getBoneUSDValue(BONE_ID).then((res) => {
      setBoneUSDValue(res.data.data.price);
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
  const [tokenList, setTokenList] = useState([]);
  const [modalKeyword, setmodalKeyword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [localTokens, setLocalTokens] = useState<any>(
    JSON.parse(localStorage.getItem("newToken") || "[]")
  );
  const [tempTokens, setTempTokens] = useState<any>({
    parentContract: "",
    childContract: "",
    parentName: "",
    parentSymbol: "",
  });
  const getTokensList = () => {
    try {
      getWalletTokenList().then((res) => {
        let list = res.data.message.tokens;
        list.forEach(async (x: any) => {
          if (x.parentName === "BoneToken") {
            x.balance = await getTokenBalance(
              lib,
              account,
              dynamicChaining[chainId].BONE
            );
          } else {
            x.balance = await getTokenBalance(lib, account, x.parentContract);
          }
        });
        setTokenList(list);
        // setTokenFilteredList(list);
        setTokenModalList([...localTokens, ...list]);
        console.log("token modal list ==> " , tokenModalList);
      });
    } catch (err: any) {
      Sentry.captureMessage("getTokensList", err);
    }
  };
  useEffect(() => {
    if (account) {
      getTokensList();
    }
    // else {
    //   router.push('/')
    // }
  }, [account]);

  const handleSearchList = (key: any) => {

    // console.log(key, "keyyy")
    try {
      setmodalKeyword(key);
      if (key.length) {
        let newData = tokenList.filter((name) => {
          return Object.values(name)
            .join(" ")
            .toLowerCase()
            .includes(key.toLowerCase());
        });
        setTokenModalList(newData);
        if (newData.length <= 0) {
          addNewToken(key)
        }
        // console.log(newData, "new data ====")
      } else {

        setTokenModalList(tokenList);
      }
    } catch (err: any) {
      Sentry.captureMessage("handleSearchList", err);
    }
  };

  const handleTokenSelect = (token: any) => {
    // console.log(token)
    setOpenManageToken(false)
    setSelectedToken(token);
    setTokenModal(false);
  };

  const addTokenHandler = async () => {
    addNewToken('')
    setConfirmImport(true);
    setAgreeImport(true);
    try {
      const isValidAddress = await web3.utils.isAddress(String(newToken));
      if (isValidAddress) {
        const checkArray = tokenModalList.map((st: any) => st?.parentContract);
        // let localtoken = JSON.parse(localStorage.getItem("newToken") || "[]");
        let localtokenarray = localTokens.map((st: any) => st.parentContract);
        const isalreadypresent = checkArray.some((item: any) =>
          localtokenarray.includes(newToken)
        );
        if (isalreadypresent) {
          toast.error("Address already exists !", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            toastId: 'presentAddress',
          });
        } else {
          const contractInstance = new web3.eth.Contract(
            addTokenAbi,
            String(newToken)
          );
          let symbol = await contractInstance.methods
            .symbol()
            .call({ from: String(account) })
            .then((token: any) => token)
            .catch((err: any) => console.log(err));
          let name = await contractInstance.methods
            .name()
            .call({ from: String(account) })
            .then((token: any) => token)
            .catch((err: any) => console.log(err));
          const obj = {
            parentContract: String(newToken),
            childContract: String(newToken),
            parentName: name,
            parentSymbol: symbol,
          };
          setLocalTokens([...localTokens, obj]);
          setTokenModalList([...tokenModalList, obj]);
          toast.success(`${name} successfully added.`, {
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
        }
      } else {
      }
    } catch (err: any) {
      // console.log(err, "ereerrr ===>")
      Sentry.captureMessage("addTokenHandler", err);
    }
  };


  useEffect(() => {
    if (!showTokenModal) {
      addNewToken("");
    }
  }, [showTokenModal]);
  useEffect(() => {
    const isValidAddress = web3.utils.isAddress(String(newToken));
    try {
      if ((tokenState.step2 || tokenState.step0) && isValidAddress) {
        toast.success("Address is valid", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600,
        });
        setTokenState({
          step0: false,
          step1: false,
          step2: false,
          step3: true,
          step4: false,
          title: "Manage Token",
        });
      } else if (!isValidAddress && newToken.length > 0) {
        toast.error("Address is Invalid", {
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
      if (tokenState.step4 && isValidAddress) {
        // toast.success("Address is valid", {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 600,
        // });
        setTokenState({
          step0: false,
          step1: false,
          step2: false,
          step3: true,
          step4: false,
          title: "Manage Token",
        });
      }
      // code below is to check whether tokens are already present or not
      const checkArray = tokenModalList.map((st: any) => st?.parentContract);
      let localtokenarray = localTokens.map((st: any) => st.parentContract);
      const isalreadypresent = checkArray.some((item: any) =>
        localtokenarray.includes(newToken)
      );
      if (isalreadypresent && newToken.length > 0) {
        toast.error("Address is already present", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          toastId: 'presentAddress',
        });
      }
    } catch (err: any) {
      Sentry.captureMessage("useEffect on line 449 in bridge > backup", err);
    }
  }, [newToken]);

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
        // console.log("initial page load");
        let updatedArray = [...tokenModalList, ...localTokens];
        setTokenModalList(updatedArray);
      }
    } catch (err: any) {
      Sentry.captureMessage("UseEffect line 540", err);
    }
  }, []);

  const getTempTokens = async () => {
    try {
      const isValidAddress = web3.utils.isAddress(String(newToken));

      if (
        isValidAddress &&
        account &&
        (tokenState.step2 || tokenState.step3 || tokenState.step4)
      ) {
        const contractInstance = new web3.eth.Contract(
          addTokenAbi,
          String(newToken)
        );
        let symbol: any = await contractInstance.methods
          .symbol()
          .call({ from: String(account) })
          .then((token: any) => token)
          .catch((err: any) => console.log(err));
        let name: any = await contractInstance.methods
          .name()
          .call({ from: String(account) })
          .then((token: any) => token)
          .catch((err: any) => console.log(err));
        const obj = {
          parentContract: String(newToken),
          childContract: String(newToken),
          parentName: name,
          parentSymbol: symbol,
        };
        const isalreadypresent = localTokens
          .map((st: any) => st.parentContract)
          .includes(obj.parentContract);
        // console.log("isalreadypresent", isalreadypresent);
        if (!isalreadypresent) {
          setTempTokens({
            parentContract: String(newToken),
            childContract: String(newToken),
            parentName: name,
            parentSymbol: symbol,
          });
        } else if (isalreadypresent) {
          // toast.error("Address is already present", {
          //   position: toast.POSITION.TOP_RIGHT,
          //   autoClose: 1500,
          // });
          setTempTokens({
            // parentContract: "",
            // childContract: "",
            // parentName: "",
            // parentSymbol: "",
          });
        }
      }
      // console.log("temptoken", tempTokens);
    } catch (err: any) {
      Sentry.captureMessage("getTempTokens", err);
    }
  };

  useEffect(() => {
    getTempTokens();
  }, [newToken, tokenState]);

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

  // console.log("tokenmodallist", tokenModalList);

  const spliceCustomToken = (index: any) => {
    try {
      let incomingObject = localTokens[index];
      const filteredModallist = localTokens.filter((ss: any) => {
        return ss.parentContract !== incomingObject.parentContract;
      });
      setLocalTokens(filteredModallist);
      const filtered2 = tokenModalList.filter((ss: any) => {
        return ss.parentContract !== incomingObject.parentContract;
      });
      setTokenModalList(filtered2);
    } catch (err: any) {
      Sentry.captureMessage("spliceCustomToken ", err);
    }
  };



  const onBackClick = () => {
    setTokenModal(true);
    setConfirmImport(true);
    setAgreeImport(false)
    setTokenState({
      step0: true,
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      title: "Select a Token",
    });
  }
  // const NewTokenCheck = async (e:any) => {
  //   // console.log("tokenListModal ==> " ,tokenModalList);
  //   var duplicateToken = tokenModalList.filter((val:any) => val?.parentContract == e?.target?.value).length > 0;
  //   if(duplicateToken){
  //     return
  //   }
  //   // console.log(e.target.value);
  // }
  //   const checkStatus = (url: any) => {
  //     const index = [DEFAULT_ITEM, ...tokenModalList].findIndex(
  //       (el) => (el?.data?.includes(url) || url.includes(el.data))
  //     );
  //     console.log(url, " ==> " , DEFAULT_ITEM, ...tokenModalList)
  //   return index !== -1;
  // };
  return (
    <div>
      {/* Token popups start */}
      <CommonModal
        title={"Select token"}
        show={showTokenModal}
        setshow={() => { setOpenManageToken(false); setTokenModal(false); }}
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
                          getTempTokens()

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
                              step1: true,
                              step2: false,
                              step3: false,
                              step4: false,
                              title: "Manage Token",
                            });
                          }}
                        >
                          Manage Tokens
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="token-listwrap">
                     {/* {console.log("setLinkquery ",setLinkQuery)} */}
                    {defChain &&
                      <TokenList coinList={coinList}
                        DEFAULT_ITEM={DEFAULT_LIST}
                        // shouldReset={firstKey}
                        setCoinList={setCoinList}
                        showWarning={showWarning}
                        setShowWarning={setShowWarning}
                        defaultChain={defChain}
                        setChain={setChain}
                        linkQuery={linkQuery}
                        setLinkQuery={setLinkQuery}
                        tokenModalList={tokenModalList}
                        tokenState={tokenState}
                        />
                    }
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

          {/* Manage token popop starts */}

          {showTokenModal && tokenState.step1 && (
            <div className="popmodal-body tokn-popup no-ht">
              <button
                className="myBackBtnInTM"
                onClick={onBackClick}
              >
                <img src="../../assets/images/back.png" alt=""></img>
              </button>
              <div className="pop-block">
                <div className="pop-top">
                  <div className="black-bg-sec">
                    <div className="token-btn-sec pop-btns-grid">
                      <div className="blk-width">
                        <button
                          type="button"
                          className={`btn w-100 ${tokenState.step1 && "btn-active"}`}
                        >
                          Token Lists
                        </button>
                      </div>
                      <div className="blk-width">
                        <button
                          type="button"
                          className={`btn w-100 ${tokenState.step2 && "btn-active"}`}
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
                          setLinkQuery(e.target.value);
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
                  <div className="token-listwrap list-ht">
                    <>
                      {isWrong ? <div>Seems like the url is broken</div> : ""}  
                    </>
                    {defChain &&
                      <TokenList coinList={coinList}
                        DEFAULT_ITEM={DEFAULT_LIST}
                        // shouldReset={firstKey}
                        setCoinList={setCoinList}
                        showWarning={showWarning}
                        setShowWarning={setShowWarning}
                        defaultChain={defChain}
                        setChain={setChain} 
                        linkQuery={linkQuery}
                        setLinkQuery={setLinkQuery}
                        tokenState={tokenState}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manage token popop ends */}

          {/* Add token popop starts */}

          {showTokenModal && tokenState.step2 && (
            <div className="popmodal-body tokn-popup no-ht">
              <button
                className="myBackBtnInTM"
                onClick={onBackClick}
              >
                <img src="../../assets/images/back.png" alt=""></img>
              </button>
              <div className="pop-block">
                <div className="pop-top">
                  <div className="black-bg-sec">
                    <div className="token-btn-sec pop-btns-grid">
                      <div className="blk-width">
                        <button
                          type="button"
                          className={`btn w-100 ${tokenState.step1 && "btn-active"}`}
                          onClick={() => {
                            setTokenState({
                              step0: false,
                              step1: true,
                              step2: false,
                              step3: false,
                              step4: false,
                              title: "Manage Token",
                            });
                          }}
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
                            addTokenHandler();
                          }}
                        >
                          Add token
                        </button>
                      </div>
                    </div>
                  </div>
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
                          if (tokenModalList.filter((val: any) => val?.parentContract == e?.target?.value).length > 0) {
                            setDuplicateToken(true);
                          } else {
                            addNewToken(e.target.value);
                          }
                          // NewTokenCheck(e);
                          // addTokenHandler();
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
                        <div
                          style={{ textAlign: "right" }}
                          className="btn-sm"
                        >
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
                          <div className="dupToken" style={{ color: "red" }}>Token already exists.</div>
                        )}
                        {localTokens.map((x: any, index: any) => (
                          <div className="tokn-row" key={x.parentContract}>
                            <div className="cryoto-box">
                              <img
                                className="img-fluid"
                                src={
                                  x.logo
                                    ? x.logo
                                    : "../../../assets/images/shib-borderd-icon.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className="tkn-grid">
                              <div>
                                <h6 className="fw-bold">
                                  {x.parentSymbol}</h6>
                                <p>{x.parentName}</p>
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
                                  <Link href={addUrl + x.childContract} passHref>
                                    <a target='_blank'>
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
              <button
                className="myBackBtnInTM"
                onClick={onBackClick}
              >
                <img src="../../assets/images/back.png" alt=""></img>
              </button>
              <div className="pop-block">
                <div className="pop-top">
                  <div className="black-bg-sec">
                    <div className="token-btn-sec pop-btns-grid">
                      <div className="blk-width">
                        <button
                          type="button"
                          className={`btn w-100 ${tokenState.step1 && "btn-active"}`}
                          onClick={() => {
                            setTokenState({
                              step0: false,
                              step1: true,
                              step2: false,
                              step3: false,
                              step4: false,
                              title: "Manage Token",
                            });
                          }}
                        >
                          Token Lists
                        </button>
                      </div>
                      <div className="blk-width">
                        <button type="button" className={`btn w-100 ${tokenState.step3 && "btn-active"}`}>
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
                        placeholder="Enter Token Address"
                        onChange={(e) => {
                          if (tokenModalList.filter((val: any) => val?.parentContract == e?.target?.value).length > 0) {
                            setDuplicateToken(true);
                          } else {
                            addNewToken(e.target.value);
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
                            <div className="token-listwrap usr-listht">
                              {JSON.stringify(tempTokens) !== "{}" ? (
                                <div className="tokn-row">
                                  <div className="cryoto-box">
                                    <img
                                      className="img-fluid"
                                      src={
                                        tempTokens?.logo
                                          ? tempTokens?.logo
                                          : "../../../assets/images/shib-borderd-icon.png"
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="tkn-grid">
                                    <div>
                                      <h6 className="fw-bold">
                                        {/* {console.log("temp tokens ==> ", tempTokens)} */}
                                        {tempTokens.parentSymbol ? tempTokens.parentSymbol : "Unknown"}
                                      </h6>
                                      <p>{tempTokens.parentSymbol ? tempTokens.parentSymbol : "Unknown Token Name"}</p>
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
                                ""
                              )}
                            </div>
                            {localTokens.map((x: any, index: any) => (
                              <div
                                className="tokn-row"
                                key={x.parentContract}
                              >
                                <div className="cryoto-box">
                                  <img
                                    className="img-fluid"
                                    src={
                                      x.logo
                                        ? x.logo
                                        : "../../../assets/images/shib-borderd-icon.png"
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="tkn-grid">
                                  <div>
                                    <h6 className="fw-bold">
                                      {/* {console.log("x has values => ", x)} */}
                                      {x.parentSymbol}
                                    </h6>
                                    <p>{x.parentName}</p>
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
                                      <Link href={addUrl + x.childContract} passHref>
                                        <a target='_blank'>
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
                      </>
                    ) :
                      (
                        // showWarning ?
                        //   (<Warning setAgreeImport={setAgreeImport}
                        //     addTokenHandler={addTokenHandler}
                        //     resetLink={() => {
                        //       setLinkQuery("");
                        //       setNewListing(null);
                        //       setShowWarning(false);
                        //     }}
                        //     setCoinList={tokenModalList}
                        //     setShowWarning={setShowWarning}
                        //     listing={newListing} />)
                        //   :
                        //   (
                        //     <>
                        //       {isWrong ? <div>Seems like the url is broken</div> : ""}
                        //       {newListing ? (
                        //         <div className="tokn-row">
                        //           <h1>newListing</h1>
                        //           {/* <div className="cryoto-box">
                        //             <img
                        //               className="img-fluid"
                        //               src={
                        //                 newListing
                        //                   ? newListing
                        //                   : "../../../assets/images/shib-borderd-icon.png"
                        //               }
                        //               alt=""
                        //             />
                        //           </div>
                        //           <div className="tkn-grid">
                        //             <div>
                        //               <h6 className="fw-bold">
                        //                 {console.log("temp tokens ==> ", tempTokens)}
                        //                 {tempTokens.parentSymbol ? tempTokens.parentSymbol : "Unknown"}
                        //               </h6>
                        //               <p>{tempTokens.parentSymbol ? tempTokens.parentSymbol : "Unknown Token Name"}</p>
                        //             </div>
                        //             <div>
                        //               <span
                        //                 className="primary-text"
                        //                 onClick={() => {
                        //                   setConfirmImport(!confirmImport);
                        //                 }}
                        //               >
                        //                 Import

                        //               </span>
                        //             </div>
                        //           </div> */}
                        //         </div>
                        //       ) : ("")}
                        //     </>
                        //   )
                        <>
                          <div style={{ display: "flex", justifyContent: "center" }}><img src="../../assets/images/alert.png" alt=""></img></div>
                          <h3 style={{ textAlign: "center", margin: "10px" }}>Import at your own risk</h3>
                          <div style={{ fontSize: "15px", margin: "10px" }}>
                            By adding this token you are implicitly trusting
                            that the data is correct. If you purchase this token, you may not be able to
                            sell it back.
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <label style={{ margin: "10px 0", textAlign: "center" }}>
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
                <div className="pop-bottom pt-0">
                  <div className="">
                    <div className="grid-block"></div>
                  </div>
                </div>
                {/* <div className="h-100">
                    <div className="two-col position-relative">
                      <div className="left-sec-img">
                        <div>
                          <img
                            className="img-fluid"
                            src="../../assets/images/alert.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <p className="text-block">
                        Anyone can create a token, including creating FAKE
                        version of existing tokens. Interact with any new token
                        carefully.
                      </p>
                    </div>
                    <div className="row-wrap">
                      <div className="crypto-info">
                        <div className="left-side data">
                          <p className="lite-color">
                            Token Address on Ethereum
                          </p>
                        </div>
                        <div className="right-side data">
                          <p>0x95ad6...4c4ce</p>
                        </div>
                      </div>
                      <div className="crypto-info">
                        <div className="left-side data">
                          <p className="lite-color">
                            Token Address on Shibarium
                          </p>
                        </div>
                        <div className="right-side data">
                          <p>0x6f8a0...1d4ec</p>
                        </div>
                      </div>

                      <div className="crypto-info">
                        <div className="left-side data">
                          <p className="lite-color">Project name</p>
                        </div>
                        <div className="right-side data">
                          <p>BONE INU</p>
                        </div>
                      </div>
                      <div className="crypto-info">
                        <div className="left-side data">
                          <p className="lite-color">Ticker name</p>
                        </div>
                        <div className="right-side data">
                          <p>SHIB</p>
                        </div>
                      </div>
                      <div className="crypto-info">
                        <div className="left-side data">
                          <p className="lite-color">Token Decimal</p>
                        </div>
                        <div className="right-side data">
                          <p>18</p>
                        </div>
                      </div>
                    </div>
                  </div> */}

                <div className="pop-bottom">
                  <div className="">
                    {/* <a
                          className="btn primary-btn w-100"
                          href="javascript:void(0)"
                          onClick={() => {
                            // setTokenState({
                            //   step0: false,
                            //   step1: false,
                            //   step2: false,
                            //   step3: false,
                            //   step4: true,
                            //   title: "Manage Token",
                            // });
                            addTokenHandler();
                            addNewToken('')
                          }}
                        >
                          Add Token
                        </a> */}
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
              <button
                className="myBackBtnInTM"
                onClick={onBackClick}
              >
                {/* BO */}
                <img src="../../assets/images/back.png" alt=""></img>
              </button>
              <div className="pop-block">
                <div className="pop-top">
                  <div className="black-bg-sec">
                    <div className="token-btn-sec pop-btns-grid">
                      <div className="blk-width">
                        <button
                          type="button"
                          className={`btn w-100 ${tokenState.step1 && "btn-active"}`}
                          onClick={() => {
                            setTokenState({
                              step0: false,
                              step1: true,
                              step2: false,
                              step3: false,
                              step4: false,
                              title: "Manage Token",
                            });
                          }}
                        >
                          Token Lists
                        </button>
                      </div>
                      <div className="blk-width">
                        <button type="button" className={`btn w-100 ${tokenState.step4 && "btn-active"}`}>
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
                          // if (tokenModalList.filter((val: any) => val?.parentContract == e.target.value).length > 0) {
                          //   setDuplicateToken(true);
                          // }
                          // else {
                          setLinkQuery(e.target.value);
                          //   setDuplicateToken(false);
                          // }
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
                    </div>
                  </div>
                  <div className="token-listwrap usr-listht">
                    {localTokens.map((x: any, index: any) => (
                      <div className="tokn-row" key={x.parentContract}>
                        <div className="cryoto-box">
                          <img
                            className="img-fluid"
                            src={
                              x.logo
                                ? x.logo
                                : "../../../assets/images/shib-borderd-icon.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className="tkn-grid">
                          <div>
                            <h6 className="fw-bold">{x.parentSymbol ? x.parentSymbol : "Unknown"}</h6>
                            <p>{x.parentName ? x.parentName : "Unknown Token Name"}</p>
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
                              <Link href={addUrl + x.childContract} passHref>
                                <a target='_blank'>
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
                    {/* <div className="tokn-row">
                          <div className="cryoto-box">
                            <img
                              className="img-fluid"
                              src="../../assets/images/shib-borderd-icon.png"
                              alt=""
                            />
                          </div>
                          <div className="tkn-grid">
                            <div>
                              <h6 className="fw-bold">SHIB</h6>
                              <p>Shibatoken</p>
                            </div>
                            <div>
                              <span
                                className="me-4"
                                onClick={() => {
                                  setTokenState({
                                    step0: false,
                                    step1: false,
                                    step2: true,
                                    step3: false,
                                    step4: false,
                                    title: "Manage Token",
                                  });
                                }}
                              >
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/del.png"
                                  alt=""
                                />
                              </span>
                              <span>
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/up.png"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="tokn-row">
                          <div className="cryoto-box">
                            <img
                              className="img-fluid"
                              src="../../assets/images/shib-borderd-icon.png"
                              alt=""
                            />
                          </div>
                          <div className="tkn-grid">
                            <div>
                              <h6 className="fw-bold">SHIB</h6>
                              <p>Shibatoken</p>
                            </div>
                            <div>
                              <span
                                className="me-4"
                                onClick={() => {
                                  setTokenState({
                                    step0: false,
                                    step1: false,
                                    step2: true,
                                    step3: false,
                                    step4: false,
                                    title: "Manage Token",
                                  });
                                }}
                              >
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/del.png"
                                  alt=""
                                />
                              </span>
                              <span>
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/up.png"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="tokn-row">
                          <div className="cryoto-box">
                            <img
                              className="img-fluid"
                              src="../../assets/images/shib-borderd-icon.png"
                              alt=""
                            />
                          </div>
                          <div className="tkn-grid">
                            <div>
                              <h6 className="fw-bold">SHIB</h6>
                              <p>Shibatoken</p>
                            </div>
                            <div>
                              <span
                                className="me-4"
                                onClick={() => {
                                  setTokenState({
                                    step0: false,
                                    step1: false,
                                    step2: true,
                                    step3: false,
                                    step4: false,
                                    title: "Manage Token",
                                  });
                                }}
                              >
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/del.png"
                                  alt=""
                                />
                              </span>
                              <span>
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/up.png"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="tokn-row">
                          <div className="cryoto-box">
                            <img
                              className="img-fluid"
                              src="../../assets/images/shib-borderd-icon.png"
                              alt=""
                            />
                          </div>
                          <div className="tkn-grid">
                            <div>
                              <h6 className="fw-bold">SHIB</h6>
                              <p>Shibatoken</p>
                            </div>
                            <div>
                              <span
                                className="me-4"
                                onClick={() => {
                                  setTokenState({
                                    step0: false,
                                    step1: false,
                                    step2: true,
                                    step3: false,
                                    step4: false,
                                    title: "Manage Token",
                                  });
                                }}
                              >
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/del.png"
                                  alt=""
                                />
                              </span>
                              <span>
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/up.png"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="tokn-row">
                          <div className="cryoto-box">
                            <img
                              className="img-fluid"
                              src="../../assets/images/shib-borderd-icon.png"
                              alt=""
                            />
                          </div>
                          <div className="tkn-grid">
                            <div>
                              <h6 className="fw-bold">SHIB</h6>
                              <p>Shibatoken</p>
                            </div>
                            <div>
                              <span
                                className="me-4"
                                onClick={() => {
                                  setTokenState({
                                    step0: false,
                                    step1: false,
                                    step2: true,
                                    step3: false,
                                    step4: false,
                                    title: "Manage Token",
                                  });
                                }}
                              >
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/del.png"
                                  alt=""
                                />
                              </span>
                              <span>
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/up.png"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="tokn-row">
                          <div className="cryoto-box">
                            <img
                              className="img-fluid"
                              src="../../assets/images/shib-borderd-icon.png"
                              alt=""
                            />
                          </div>
                          <div className="tkn-grid">
                            <div>
                              <h6 className="fw-bold">SHIB</h6>
                              <p>Shibatoken</p>
                            </div>
                            <div>
                              <span
                                className="me-4"
                                onClick={() => {
                                  setTokenState({
                                    step0: false,
                                    step1: false,
                                    step2: true,
                                    step3: false,
                                    step4: false,
                                    title: "Manage Token",
                                  });
                                }}
                              >
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/del.png"
                                  alt=""
                                />
                              </span>
                              <span>
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/up.png"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="tokn-row">
                          <div className="cryoto-box">
                            <img
                              className="img-fluid"
                              src="../../assets/images/shib-borderd-icon.png"
                              alt=""
                            />
                          </div>
                          <div className="tkn-grid">
                            <div>
                              <h6 className="fw-bold">SHIB</h6>
                              <p>Shibatoken</p>
                            </div>
                            <div>
                              <span
                                className="me-4"
                                onClick={() => {
                                  setTokenState({
                                    step0: false,
                                    step1: false,
                                    step2: true,
                                    step3: false,
                                    step4: false,
                                    title: "Manage Token",
                                  });
                                }}
                              >
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/del.png"
                                  alt=""
                                />
                              </span>
                              <span>
                                <img
                                  className="img-fluid"
                                  src="../../assets/images/up.png"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
    </div >
  )
}


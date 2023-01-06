import { URL_ARRAY } from 'app/config/networks';
import { Warning } from './ManageToken';
import { useActiveWeb3React } from 'app/services/web3';
import { uniq, uniqBy, update } from 'lodash';
import React, { useEffect, useState } from 'react'
import { fetchLink, generateSecondary, getDefaultChain } from 'web3/commonFunctions';
import { toast } from 'react-toastify';
import { Switch } from '@material-ui/core';
import { TrashIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import { Settings } from 'react-feather';
import { Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
const TokenList = ({
  coinList = [],
  DEFAULT_ITEM,
  searchedList,
  setCoinList,
  // shouldReset,
  showWarning,
  setShowWarning,
  defaultChain,
  setChain,
  handleTokenSelect,
  linkQuery,
  setLinkQuery,
  tokenModalList,
  setTokenModalList,
  tokenState,
  ...props }: any) => {
  const [isWrong, setIsWrong] = useState(false);
  const [renderData, setRenderData] = useState<any>();
  const [defaultList, setDefaultList] = useState<any>(JSON.parse(localStorage.getItem("tokenList") || "[]"));
  const [newListing, setNewListing] = useState<any>(null);
  // const [linkQuery, setLinkQuery] = useState("");
  const { chainId = 1, account, library } = useActiveWeb3React();
  const [importedCoins, setImportedCoins] = useState<any>([]);
  const [dup, setdup] = useState(false);
  const [defaultfetched, setDefaultfetched] = useState<any>([]);
  const [searched, setSearched] = useState<any>();
  const [userAddedTokens, setUserAddedTokens] = useState<any>(
    JSON.parse(localStorage.getItem("importedByUser") || "[]")
  );
  const sortedLists = async () => {
    if (linkQuery) {
      await fetch(
        linkQuery?.includes("http")
          ? linkQuery
          : generateSecondary(linkQuery)
      ).then(async (response) => {
        const res = await response.json();
        console.log("entered use effect try block ", res);
        const obj = {
          tokens: res?.tokens,
          name: res?.name,
          logo: res?.logoURI,
          data: linkQuery,
          enabled: false
        }
        addToLocalStorage(obj);
      }).catch((err: any) => { })
    }
  }
  console.log("searchedList", searchedList);
  const getDefaultTokenList = () => {
    // type URL_ARRAY_types = 'eth' | 'bsc' | 'polygon';
    const defaultTokenUrls = URL_ARRAY[defaultChain].filter(
      (item: any) => item?.default
    );
    console.log("data ", defaultTokenUrls);
    console.log("render data ", renderData);
    Promise.all(
      defaultTokenUrls.map(async (item) => {
        try {
          const response = await fetch(
            item?.data?.includes("http")
              ? item?.data
              : generateSecondary(item?.data)
          );
          const res = await response.json();
          const tokens = res?.tokens;
          const name = res?.name;
          const logo = res?.logoURI;
          return { ...item, name, logo, tokens };
        } catch (e: any) {
          // console.log("entered use effect catch block ", item, e);
          return { ...item };
        }
      })
    )
      .then((response) => {
        console.log("entered use effect try block ", response);
        let uniqList = uniqBy(response, 'data');
        addToLocalStorage(uniqList);
        // setDefaultfetched(uniqList);
      })
      .catch((err) => { console.log() });
  }

  console.log("default list ", defaultList);
  useEffect(() => {
    getDefaultTokenList();

  }, []);
  useEffect(() => {
    let fetchList = JSON.parse(localStorage.getItem("tokenList") || "[]");
    let enabledTokens = fetchList?.filter((e: any) => e?.enabled === true);
    var uniqueTokens: any = [];
    enabledTokens.forEach((e: any) => uniqueTokens.push(...e?.tokens));
    uniqueTokens = uniqBy(uniqueTokens, 'address');
    setImportedCoins([...importedCoins, ...uniqueTokens]);
    // console.log("uniqueTokens " )
    // uniqueTokens = uniqBy(uniqueTokens, "name");
  }, []);

  console.log("importedCoins ", importedCoins);
  const addToLocalStorage = async (response: any) => {
    let oldList;
    oldList = JSON.parse(localStorage.getItem("tokenList") || "[]");
    if (oldList.length) {
      let newImportedList = response;
      var newTokens: any;
      if (newImportedList.length) {
        newTokens = [...oldList, ...newImportedList];
      }
      else {
        newTokens = [...oldList, newImportedList];
      }
      newTokens = uniqBy(newTokens, "name")
      // console.log("response ", newTokens)
      setRenderData(newTokens);
      localStorage.setItem("tokenList", JSON.stringify(newTokens));
    }
    else {
      let newList = [...response];
      setDefaultList(newList);
      localStorage.setItem("tokenList", JSON.stringify(newList));
      // console.log("local storage token list ", response);
    }
    // console.log("local storage token list " ,localStorage.getItem("tokenList"));
  }
  useEffect(() => {
    setdup(false);
    if (linkQuery) {
      if (defaultList.filter((e: any) => e.data == linkQuery).length > 0) {
        setdup(true);
        setSearched(defaultList.filter((e: any) => e.data == linkQuery));
      }
      else {
        setdup(false);
        fetchLink(linkQuery, setNewListing, setIsWrong);
      }
    }
    else {
      setNewListing(null);
      setIsWrong(false);
    }
  }, [linkQuery]);

  // useEffect(() => {
  //   if(localStorage.getItem("tokenList")){
  //     const tokenList: string = JSON.parse(localStorage.getItem("tokenList") || "[]");
  //     setRenderData(tokenList);
  //     console.log("render data ==>",renderData);
  //   }
  // },[renderData]);
  const updateList = (data: any) => {
    setTimeout(async () => {
      const copy = defaultList.slice();
      const index = copy.findIndex((el: any) => el.data === data);
      if (index > -1) {
        copy[index].enabled = !copy[index]?.enabled;
        const chain = await getDefaultChain();
        updateLocalstorage(data, index);
        setChain(chain);
        setCoinList(copy);
        if (copy[index].enabled) {
          // console.log("switch enabled ==> " ,copy[index].enabled)
          const newaddedTokens = copy[index]?.tokens;
          const localTokens = JSON.parse(localStorage.getItem("importedByUser") || "[]")
          let updatedLocalTokens = [...localTokens, ...newaddedTokens];
          localStorage.setItem("importedByUser", JSON.stringify(uniqBy(updatedLocalTokens, "address")))
          setImportedCoins(newaddedTokens);
        }
        else {
          const removeTokens = copy[index]?.tokens;
          let localTokens = JSON.parse(localStorage.getItem("importedByUser") || "[]")
          localTokens = localTokens.filter((e: any) => !removeTokens.find((el: any) => el.address == e.address));
          localStorage.setItem("importedByUser", JSON.stringify(uniqBy(localTokens, "address")));
          // console.log("else condition ", localTokens, removeTokens);
        }
        // console.log("updated chain , " , chain , copy)
      }
    }, 1);
  };
  useEffect(() => {
    let uniqueList = uniqBy(defaultList, "name");
    setDefaultList(uniqueList);
    if (renderData?.length > 1) {
      let newUniqueList = [...uniqueList, ...uniqBy(renderData, "name")];
      setDefaultList(uniqBy(newUniqueList, "name"))
    }
  }, [renderData]);

  const updateLocalstorage = (data: any, index: any) => {
    let storedTokens: any = JSON.parse(localStorage.getItem("tokenList") || "[]");
    // console.log("storedTokens" , storedTokens);
    if (storedTokens != null) {
      storedTokens[index].enabled = !storedTokens[index]?.enabled;
      // console.log("updated storedTokens" , storedTokens);
      localStorage.setItem("tokenList", JSON.stringify(storedTokens));
    }
  }
  const checkStatus = (url: any) => {
    const index = [DEFAULT_ITEM, ...coinList].findIndex(
      (el) => el.data.includes(url) || url.includes(el.data)
    );
    return index !== -1;
  };

  const deleteList = (data: any) => {
    try {
      let confirmed = confirm("Are you sure your want to delete this list?");
      if (confirmed) {
        let oldList = defaultList.slice();
        let updatedList = oldList.filter((el: any) => el.data !== data);
        // console.log("updatedList", updatedList);
        localStorage.setItem("tokenList", JSON.stringify(updatedList))
        setDefaultList(updatedList);
        setCoinList(updatedList);
      }
    } catch (err: any) {
      Sentry.captureMessage("deleteList ", err);
    }
  }
  // console.log("defaultList ==> ", defaultList);
  return (
    <>

      {tokenState?.step0 && !searchedList && (tokenModalList
        ? tokenModalList.map((x: any) => (
          <div
            className="tokn-row"
            key={x?.parentContract}
            onClick={() => handleTokenSelect(x)}
          >
            <div className="cryoto-box">
              <img
                className="img-fluid"
                width={32}
                src={
                  x?.logo
                    ? x.logo
                    : "../../assets/images/shib-borderd-icon.png"
                }
                alt=""
              />
            </div>
            <div className="tkn-grid">
              <div>
                <div className='d-flex align-items-end'>
                  <h6 className="fw-bold">{x?.parentSymbol || x?.symbol || "Unknown"}</h6>
                  {x?.addedByUser && <small className='ms-2' style={{ color: "#666" }}>Added By User</small>}
                </div>
                <p>{x?.parentName || x?.name || "Unknown"}</p>
              </div>
              <div>
                <h6 className="fw-bold">
                  {x?.balance ? x.balance : "00.00"}
                </h6>
              </div>
            </div>
          </div>
        ))
        : null)
      }
      {tokenState?.step0 && !searchedList &&
        importedCoins?.length
        ? importedCoins.map((x: any) => {
          // console.log("value of x ", x);
          return (
            <div
              className="tokn-row"
              key={x?.address}
              onClick={() => handleTokenSelect(x)}
            >
              <div className="cryoto-box">
                <img
                  className="img-fluid"
                  width={32}
                  src={
                    x?.logo ? x?.logo : x?.logoURI && x?.logoURI.startsWith('ipfs://') ? "https://ipfs.io/ipfs/" + x?.logoURI.slice(7) :
                      x?.logoURI ? x?.logoURI : "../../assets/images/shib-borderd-icon.png"
                  }
                  alt=""
                />
              </div>
              <div className="tkn-grid">
                <div>
                  <h6 className="fw-bold">{x?.symbol}</h6>
                  <p>{x?.name}</p>
                </div>
                {/* <div>
                      <h6 className="fw-bold">
                        {x?.balance ? x.balance : "00.00"}
                      </h6>
                    </div> */}
              </div>
            </div>)
        })
        : null
      }
      {tokenState?.step0 && searchedList?.length != 0 &&
        searchedList?.map((x: any) => {
          // console.log("value of x ", x);
          return (
            <div
              className="tokn-row"
              key={x?.address}
              onClick={() => handleTokenSelect(x)}
            >
              <div className="cryoto-box">
                <img
                  className="img-fluid"
                  width={32}
                  src={
                    x?.logoURI && x?.logoURI.startsWith('ipfs://')
                      ? "https://ipfs.io/ipfs/" + x?.logoURI.slice(7)
                      : x?.logoURI ? x?.logoURI
                        : "../../assets/images/shib-borderd-icon.png"
                  }
                  alt=""
                />
              </div>
              <div className="tkn-grid">
                <div>
                  <h6 className="fw-bold">{x?.symbol || x?.parentSymbol}</h6>
                  <p>{x?.name || x?.parentName}</p>
                </div>
                {/* <div>
                      <h6 className="fw-bold">
                        {x?.balance ? x.balance : "00.00"}
                      </h6>
                    </div> */}
              </div>
            </div>)
        })
      }
      {tokenState.step1 &&
        (showWarning ? (
          <Warning
            resetLink={() => {
              setLinkQuery("");
              setNewListing(null);
              setShowWarning(false);
            }}
            sortedLists={sortedLists}
            setCoinList={setCoinList}
            setShowWarning={setShowWarning}
            listing={newListing}
          />
        ) : (
          <div className="token-listwrap_">
            {dup && <div style={{ color: "red" }}>List already imported.</div>}
            {newListing ?
              (<div className="tokn-row">
                <div className="cryoto-box">
                  <img src={newListing?.data?.logoURI ? newListing?.data?.logoURI : "../../assets/images/eth.png"} width={24}
                  />
                </div>
                <div className="tkn-grid" style={{ paddingLeft: "40px" }}>
                  <div>
                    <h6 className="fw-bold">
                      {newListing?.data?.name}
                      {/* {console.log("new listing" ,newListing)} */}
                    </h6>
                    <p>{newListing?.data?.tokens?.length || 0} tokens</p>
                  </div>
                  < div >
                    <span
                      className="primary-text"
                      onClick={() => {
                        setShowWarning(true);
                      }}
                    >
                      Import
                    </span>
                  </div>
                </div>
              </div>
              )
              : ("")
            }
            {defaultList && defaultList.length > 0 &&
              (defaultList.map((item: any, i: any, arr: any) => {
                // console.log("item contains ==> ", item);
                return (
                  <div key={item?.data} className="flex justify-content-between mb-3">
                    <div className="flex w-50 align-items-center">
                      <img src={item?.logo && item?.logo.startsWith('ipfs://') ? "https://ipfs.io/ipfs/" + item?.logo.slice(7) :
                        item?.logo ? item?.logo : "../../assets/images/shib-borderd-icon.png"
                      } width="35" className='me-2' />
                      <div>
                        <h5>{item?.name ? item?.name : item?.data}</h5>
                        <div className='d-flex align-items-center'>
                          <p className="m-0">{item?.tokens?.length} tokens</p>
                          <div className="manageTokenDropdown ms-2">
                            <Dropdown>
                              <Dropdown.Toggle>
                                <Settings />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => window.open(`https://tokenlists.org/token-list?url=${item?.data}`, "_blank")}>View List</Dropdown.Item>
                                <Dropdown.Item onClick={() => deleteList(item?.data)} target="_blank">Remove List</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className='d-flex align-items-center switch-wrapper'>
                      {/* <TrashIcon width={25} height={25} onClick={() => deleteList(item?.data)} style={{ cursor: 'pointer' }} /> */}
                      <label className="switch">
                        <input className="switch-input" type="checkbox" 
                          checked={arr[arr.findIndex((el: any) => el.data === item.data)].enabled}
                          onChange={() => updateList(item?.data)} />
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                      </label>
                      {/* <Switch
                        checked={arr[arr.findIndex((el: any) => el.data === item.data)].enabled}
                        onChange={() => updateList(item?.data)} /> */}
                    </div>
                  </div>
                )
              })
              )
            }

          </div>
        ))}
    </>
  );
};

const SingleToken = ({
  coinList = [],
  DEFAULT_ITEM,
  setCoinList,
  // shouldReset,
  showWarning,
  setShowWarning,
  defaultChain,
  setChain,
  handleTokenSelect,
  linkQuery,
  setLinkQuery,
  tokenModalList,
  tokenState
}: any) => {
  const [isWrong, setIsWrong] = useState(false);
  const [renderData, setRenderData] = useState<any>([]);
  const [newListing, setNewListing] = useState<any>(null);
  // const [linkQuery, setLinkQuery] = useState("");
  const { chainId = 1, account, library } = useActiveWeb3React();

  return (
    <>
      {tokenState?.step0 && (tokenModalList
        ? tokenModalList.map((x: any) => (
          <div
            className="tokn-row"
            key={x?.parentName}
            onClick={() => handleTokenSelect(x)}
          >
            <div className="cryoto-box">
              <img
                className="img-fluid"
                src={
                  x?.logo
                    ? x.logo
                    : "../../assets/images/shib-borderd-icon.png"
                }
                alt=""
              />
            </div>
            <div className="tkn-grid">
              <div>
                <h6 className="fw-bold">{x?.parentSymbol}</h6>
                <p>{x?.parentName}</p>
              </div>
              <div>
                <h6 className="fw-bold">
                  {x?.balance ? x.balance : "00.00"}
                </h6>
              </div>
            </div>
          </div>
        ))
        : null)
      }
      {tokenState?.step0 &&
        newListing?.tokens?.length
        ? newListing?.tokens?.map((x: any) => (
          <div
            className="tokn-row"
            key={x?.name}
            onClick={() => handleTokenSelect(x)}
          >
            <div className="cryoto-box">
              <img
                className="img-fluid"
                src={
                  x?.logoURI
                    ? x?.logoURI
                    : "../../assets/images/shib-borderd-icon.png"
                }
                alt=""
              />
            </div>
            <div className="tkn-grid">
              <div>
                <h6 className="fw-bold">{x?.symbol}</h6>
                {/* <p>{x?.tokens.length} tokens</p> */}
              </div>
              {/* <div>
                      <h6 className="fw-bold">
                        {x?.balance ? x.balance : "00.00"}
                      </h6>
                    </div> */}
            </div>
          </div>
        ))
        : null
      }
    </>
  );
};
export default TokenList
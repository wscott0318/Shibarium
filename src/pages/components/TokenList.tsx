import { URL_ARRAY } from 'app/config/networks';
import { Warning } from './ManageToken';
import { useActiveWeb3React } from 'app/services/web3';
import { uniq, uniqBy, update } from 'lodash';
import React, { useEffect, useState } from 'react'
import { fetchLink, generateSecondary, getDefaultChain } from 'web3/commonFunctions';
import { toast } from 'react-toastify';
import { Switch } from '@material-ui/core';

const TokenList = ({
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
  const [renderData, setRenderData] = useState<any>();
  const [defaultList, setDefaultList] = useState<any>(JSON.parse(localStorage.getItem("tokenList") || "[]"));
  const [newListing, setNewListing] = useState<any>(null);
  // const [linkQuery, setLinkQuery] = useState("");
  const { chainId = 1, account, library } = useActiveWeb3React();
  const [importedCoins, setImportedCoins] = useState<any>();
  const [dup, setdup] = useState(false);
  const [searchedList, setSearchedList] = useState<any>(null);
  useEffect(() => {
    // type URL_ARRAY_types = 'eth' | 'bsc' | 'polygon';
    const defaultTokenUrls = URL_ARRAY[defaultChain].filter(
      (item: any) => item?.default
    );
    // console.log("default token urls " , defaultTokenUrls , coinList);
    Promise.all(
      [defaultTokenUrls, ...coinList].map(async (item) => {
        console.log(coinList, item, 'default token urls ')
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
          // const data = res?.data;
          // console.log(" response ==>", response);
          return { ...item, name, logo, tokens, locked: false };
        } catch (e) {
          // console.log("fetching list error ", e);
          return { ...item, locked: true };
        }
      })
    )
      .then((response) => {
        const uniqArray = uniqBy(response, "name");
        setRenderData(uniqArray);
        setNewListing(response[1].res);
        setImportedCoins(response.slice(1));
        addToLocalStorage(uniqArray);
      })
      .catch((err) => { console.log() });
  }, [coinList, chainId]);

  const addToLocalStorage = async (response: any) => {

    let newImportedList = { ...response[1] };
    let oldList;
    if (localStorage.getItem("tokenList")) {
      oldList = JSON.parse(localStorage.getItem("tokenList") || "[]");
      var newTokens = [...oldList, newImportedList];
      newTokens = uniqBy(newTokens, "name")
      localStorage.setItem("tokenList", JSON.stringify(newTokens));
    }
    else {
      localStorage.setItem("tokenList", JSON.stringify(response));
    }
    // console.log("local storage token list " ,localStorage.getItem("tokenList"));
  }
  useEffect(() => {
    if (linkQuery) {
      if (defaultList.filter((e: any) => e.data == linkQuery).length > 0) {
        setdup(true);
        setSearchedList(defaultList.filter((e: any) => e.data == linkQuery));
      }
      else {
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
  const updateList = (data: any, locked: any) => {
    setTimeout(async () => {
      if (locked) return;
      const copy = defaultList.slice();
      console.log('copy' , copy);
      const index = copy.findIndex((el: any) => el.data === data);
      if (index > -1) {
        copy[index].enabled = !copy[index]?.enabled;
        const chain = await getDefaultChain();
        setChain(chain);
        setCoinList(copy);
        console.log("updated chain , " , chain , copy)
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
  // console.log("new default list -> " , defaultList);
  const checkStatus = (url: any) => {
    const index = [DEFAULT_ITEM, ...coinList].findIndex(
      (el) => el.data.includes(url) || url.includes(el.data)
    );
    return index !== -1;
  };
  // {console.log("printed value ==> " ,localTokens.map((e:any)=> (e.parentContract)) == x.parentContract)}
  // console.log("defaultList ==> ", defaultList);
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
        renderData?.tokens?.length
        ? renderData.slice(1).tokens.map((x: any) => {
          console.log("value of x ", x);
          return (
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
            </div>)
        })
        : null
      }
      {tokenState.step1 &&
        (showWarning ? (
          <Warning
            resetLink={() => {
              setLinkQuery("");
              setNewListing(null);
              setShowWarning(false);
            }}
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
                  <img src={newListing?.data?.logoURI ? newListing?.data?.logoURI : "../../assets/images/eth.png"} alt={newListing?.data?.name}
                  />
                </div>
                <div className="tkn-grid">
                  <div>
                    <h6 className="fw-bold">
                      {newListing?.data?.name}
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
            {defaultList && defaultList.length > 1 ?
              (defaultList.slice(1).map((item: any,i:any, arr: any) => {
                // console.log("item contains ==> ", item);
                return (
                  <div key={item?.data} className="flex justify-content-between mb-3">
                    <div className="flex w-50">
                      <img src={item?.logo} width="50" height="25" />
                      <div>
                        <h5>{item?.name ? item?.name : item?.data}</h5>
                        <p>{item?.tokens?.length} tokens</p>
                      </div>
                    </div>
                    <div>
                      <Switch
                        checked={arr[arr.findIndex((el:any) => el.data === item.data)].enabled}
                        onChange={(e: any) => {
                          updateList(item?.data, item?.locked);
                          // console.log("arr ->>>>>.. " ,arr);
                        }}
                      />
                    </div>
                  </div>
                )
              })
              )
              : "No Lists are Imported"
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
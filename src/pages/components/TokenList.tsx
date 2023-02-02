import { URL_ARRAY } from 'app/config/networks';
import { Warning } from './ManageToken';
import { useActiveWeb3React } from 'app/services/web3';
import { uniqBy } from 'lodash';
import React, { useEffect, useState } from 'react'
import { fetchLink, generateSecondary, getDefaultChain } from 'web3/commonFunctions';
import * as Sentry from '@sentry/nextjs';
import { Settings } from 'react-feather';
import { Dropdown } from 'react-bootstrap';
import useLocalStorageState from 'use-local-storage-state';
import InfiniteScroll from "react-infinite-scroll-component";
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
  offset,
  ...props }: any) => {
  const [isWrong, setIsWrong] = useState(false);
  const [renderData, setRenderData] = useState<any>();
  const [defaultList, setDefaultList] = useLocalStorageState<any>("tokenList");
  const [newListing, setNewListing] = useState<any>(null);
  const { chainId = 1 } = useActiveWeb3React();
  const [importedCoins, setImportedCoins] = useState<any>([]);
  const [dup, setdup] = useState(false);
  const [defaultfetched, setDefaultfetched] = useState<any>([]);
  const sortedLists = async () => {
    if (linkQuery) {
      await fetch(
        linkQuery?.includes("http")
          ? linkQuery
          : generateSecondary(linkQuery)
      ).then(async (response) => {
        const res = await response.json();
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
  useEffect(() => {
    console.log("console 1");
    getDefaultTokenList();
  }, []);
  const getDefaultTokenList = async () => {
    console.log("console 2")
    const defaultTokenUrls = URL_ARRAY[defaultChain].filter(
      (item: any) => item?.default
    );
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
          return { ...item };
        }
      })
    )
      .then((response) => {
        let uniqList = uniqBy(response, 'data');
        addToLocalStorage(uniqList);
        console.log('console follow 3')
      })
      .catch((err) => { console.log("error") });
  }
  const addToLocalStorage = (response: any) => {
    let oldList;
    oldList = defaultList;
    console.log("console 3", oldList)
    if (oldList) {
      let newImportedList = response;
      let newTokens: any;
      if (newImportedList.length) {
        newTokens = [...oldList, ...newImportedList];
      }
      else {
        newTokens = [...oldList, newImportedList];
      }
      newTokens = uniqBy(newTokens, "name")
      // useLocalStorageState('tokenList', { defaultValue: newTokens })
      setRenderData(newTokens);
      setDefaultList([...newTokens]);
    }
    else {
      console.log("console 3 else")
      let newList = [...response];
      setDefaultList(newList);
      useLocalStorageState('tokenList', { defaultValue: newList })
    }
    getEnabledTokens();
  }
  const getEnabledTokens = () => {
    console.log("console 4", defaultList)
    if (defaultList?.length > 0) {
      let enabledTokens = defaultList?.filter((e: any) => e?.enabled === true);
      let uniqueTokens: any = [];
      enabledTokens.forEach((e: any) => uniqueTokens.push(...e?.tokens));
      uniqueTokens = uniqBy(uniqueTokens, 'address');
      setImportedCoins([...importedCoins, ...uniqueTokens]);
    }
  }

  useEffect(() => {
    setdup(false);
    if (linkQuery) {
      if (defaultList.filter((e: any) => e.data == linkQuery).length > 0) {
        setdup(true);
       
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

    console.log(isWrong, 'isWrong');
    
  }, [linkQuery]);

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
        // console.log("switch enabled ==> " ,copy[index])
        if (copy[index].enabled) {
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
        }
      }
    }, 1);
  };
  useEffect(() => {
    if (defaultList?.length) {
      let uniqueList = uniqBy(defaultList, "name");
      setDefaultList(uniqueList);
      if (renderData?.length > 1) {
        let newUniqueList = [...uniqueList, ...uniqBy(renderData, "name")];
        setDefaultList(uniqBy(newUniqueList, "name"))
      }
    }
  }, [renderData]);

  const updateLocalstorage = (data: any, index: any) => {
    let storedTokens: any = defaultList;
    if (storedTokens != null) {
      defaultList[index].enabled = !defaultList[index].enabled;
      storedTokens[index].enabled = !storedTokens[index].enabled;
      setDefaultList([...defaultList]);
    }
  }

  const deleteList = (data: any) => {
    try {
      let confirmed = confirm("Are you sure your want to delete this list?");
      if (confirmed) {
        let oldList = defaultList.slice();
        let updatedList = oldList.filter((el: any) => el.data !== data);
        setDefaultList([...updatedList]);
        setCoinList(updatedList);
      }
    } catch (err: any) {
      Sentry.captureMessage("deleteList ", err);
    }
  }

  const getLogo = (x: any) => {
    let logoURL: string;
    if (x?.logo) {
      logoURL = x?.logo
    }
    else if (x?.logoURI) {
      if (x?.logoURI.startsWith('ipfs://')) {
        logoURL = "https://ipfs.io/ipfs/" + x?.logoURI.slice(7);
      }
      else if (x?.logoURI.startsWith('https://tokens.1inch.io')) {
        logoURL = "https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,fl_sanitize,q_auto/" + x?.logoURI;
      }
      else {
        logoURL = x?.logoURI;
      }
    }
    else {
      logoURL = "../../assets/images/shib-borderd-icon.png";
    }
    return logoURL;
  }
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
    event.currentTarget.className = "error me-2";
  };

  useEffect(() => {
    let imported = importedCoins;
    imported = imported.slice(0, 15);
    setDefaultfetched(imported);
  }, [offset, tokenModalList, importedCoins]);

  const fetchData = () => {
    console.log("fetch data called")
    if (defaultfetched?.length >= importedCoins?.length) {
   
      return;
    }
    setTimeout(() => {
      const mergeCoinsList = () => [...defaultfetched, ...importedCoins.slice(defaultfetched.length, defaultfetched.length+5)];
      setDefaultfetched(mergeCoinsList);
    }, 500);
  }


  return (
    <div>
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
                onError={imageOnErrorHandler}
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
      {tokenState?.step0 && !searchedList && defaultfetched?.length ?
        (<InfiniteScroll
          dataLength={defaultfetched?.length}
          next={() => { fetchData() }}
          hasMore={true}
          loader={<small>Loading...</small>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollable-tokenList"
          scrollThreshold="245px"
        >

          {defaultfetched.map((x: any) => {
            let logoImg = getLogo(x);
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
                    src={logoImg}
                    onError={imageOnErrorHandler}
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
          })}

        </InfiniteScroll>)
        : null
      }
      {tokenState?.step0 && searchedList?.length != 0 &&
        searchedList?.map((x: any) => {
          let logoImg = getLogo(x);
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
                  src={logoImg}
                  onError={imageOnErrorHandler}
                  alt=""
                />
              </div>
              <div className="tkn-grid">
                <div>
                  <h6 className="fw-bold">{x?.symbol || x?.parentSymbol}</h6>
                  <p>{x?.name || x?.parentName}</p>
                </div>
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
                  <img src={newListing?.data?.logoURI ? newListing?.data?.logoURI : "../../assets/images/eth.png"} width={24} onError={imageOnErrorHandler}
                  />
                </div>
                <div className="tkn-grid" style={{ paddingLeft: "40px" }}>
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
            {defaultList && defaultList.length > 0 &&
              (defaultList.map((item: any, i: any, arr: any) => {
                let logo = getLogo(item);
                return (
                  <div key={item?.data} className="flex mb-3 justify-content-between">
                    <div className="flex w-50 align-items-center">
                      <img src={logo} width="35" className='me-2' onError={imageOnErrorHandler} />
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
    </div>
  );
};

export default TokenList
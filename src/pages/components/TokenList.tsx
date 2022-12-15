import { URL_ARRAY } from 'app/config/networks';
import { Warning } from './ManageToken';
import { useActiveWeb3React } from 'app/services/web3';
import { uniqBy } from 'lodash';
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
  const [newListing, setNewListing] = useState<any>(null);
  // const [linkQuery, setLinkQuery] = useState("");
  const { chainId = 1, account, library } = useActiveWeb3React();

  useEffect(() => {
    // type URL_ARRAY_types = 'eth' | 'bsc' | 'polygon';
    const defaultTokenUrls = URL_ARRAY[defaultChain].filter(
      (item: any) => item?.default
    );
    Promise.all(
      [defaultTokenUrls, ...coinList].map(async (item) => {
        console.log(coinList, item, 'default token urls ')
        try {
          const response = await fetch(
            item.data.includes("http")
              ? item.data
              : generateSecondary(item.data)
          );
          const res = await response.json();
          const tokens = res.tokens;
          const name = res.name;
          const logo = res.logoURI;
          console.log(" response ==>", response);
          return { ...item, name, logo, tokens };
        } catch (e) {
          console.log("fetching list error ", e);
          return {
            ...item,
          };
        }
      })
    )
      .then((response) => {
        // setNewListing(response.data.tokens);
        const uniqArray = uniqBy(response, "name");
        setRenderData(uniqArray);
        setNewListing(response[1].res);
        let oldList = [];
        if(localStorage.getItem("tokenList")){
          oldList = JSON.parse(localStorage.getItem("tokenList") || "[]");
        }
        var newTokens = [...uniqArray]
        localStorage.setItem("tokenList" , JSON.stringify(newTokens));
      })
      .catch((err) => setRenderData(coinList));
  }, [coinList, chainId]);

  useEffect(() => {
    if (linkQuery) {
      fetchLink(linkQuery, setNewListing, setIsWrong);
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
      const copy = coinList.slice();
      const index = copy.findIndex((el: any) => el.data === data);
      if (index > -1) {
        copy[index].enabled = !copy[index]?.enabled;
        const chain = await getDefaultChain();
        setChain(chain);
        setCoinList(copy);
      }
    }, 1);
  };

  const checkStatus = (url: any) => {
    const index = [DEFAULT_ITEM, ...coinList].findIndex(
      (el) => el.data.includes(url) || url.includes(el.data)
    );
    return index !== -1;
  };
  // {console.log("printed value ==> " ,localTokens.map((e:any)=> (e.parentContract)) == x.parentContract)}
  console.log("coinList ", renderData);
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
      {tokenState.step1 &&
        (showWarning ? (
          <Warning
            resetLink={() => {
              setLinkQuery();
              setNewListing(null);
              setShowWarning(false);
            }}
            setCoinList={setCoinList}
            setShowWarning={setShowWarning}
            listing={newListing}
          />
        ) : (
          <div className="token-listwrap">
            {/* @ts-ignore */}
            {newListing ?
              (<div className="tokn-row">
                <div className="cryoto-box">
                  {/* @ts-ignore */}
                  <img src={newListing?.data?.logoURI ? newListing?.data?.logoURI : "../../assets/images/eth.png"} alt={newListing?.data?.name}
                  />
                </div>
                <div className="tkn-grid">
                  <div>
                    <h6 className="fw-bold">
                      {console.log("temp tokens ==> ", newListing)}
                      {/* @ts-ignore */}
                      {newListing?.data?.name}
                    </h6>
                    {/* @ts-ignore */}
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
            {renderData?.length > 0 ? renderData.slice(1).map((item: any) => {
              console.log("item contains ==> ", item);
              return (
                <div key={item?.data} className="flex justify-content-between mb-3">
                  <div className="flex w-50">
                    <img src={item?.logo} width="50" height="25" />
                    <div>
                      <h5>{item?.name}</h5>
                      <p>{item?.data?.tokens?.length} tokens</p>
                    </div>
                  </div>
                  <div>
                    <Switch />
                  </div>
                </div>
              )

            }
            ) : "no data"}
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
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import { Nav } from "react-bootstrap";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import TokenList from "./TokenList";
import LoadingSpinner from "pages/components/Loading";
import useMappedTokens from "app/hooks/useMappedTokens";
import useTestnetTokens from "app/hooks/usetestnetTokens";
import DynamicShimmer from "app/components/Shimmer/DynamicShimmer";

function MappedToken() {
  const [loader, setLoader] = useState(true);
  const [limit, setLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const perPage = 10;
  const [tokenCount, setTokenCount] = useState(0);
  const [tokenList, setTokenList] = useState<any>();
  const [allTokens, setAllTokens] = useState<any>();
  const [network, setNetwork] = useState("Mainnet");
  const testnetTokens = useTestnetTokens();
  const mainnetTokens: any = useMappedTokens();
  const [mainTokenList, setMainTokenList] = useState<any>(mainnetTokens.data);
  const [fixedTokens, setFixedTokens] = useState<any>();
  const [filterKey, setFilterKey] = useState<any>({
    key: 0,
    value: "Show All",
  });
  const ChangePagination = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setLimit(offset);
    setCurrentPage(selectedPage);
  };

  const getTokenList = async () => {
    setTokenCount(mainTokenList?.length);
    setAllTokens(mainTokenList);
    setFixedTokens(mainTokenList);
    const slice = mainTokenList?.slice(limit, limit + perPage);
    setTokenList(slice);
    console.log({ slice });
    setPageCount(Math.ceil(mainTokenList?.length / perPage));
    if (filterKey.key != 0) onFilter();
    if (slice?.length > 0) {
      setLoader(false);
    }
  };

  useEffect(() => {
    getTokenList();
  }, [currentPage, mainTokenList]);

  useEffect(() => {
    handletabChange();
  }, [network, mainnetTokens.data]);

  const handletabChange = () => {
    if (network == "Mainnet") {
      setMainTokenList(mainnetTokens.data);
    } else {
      setMainTokenList(testnetTokens.data);
    }
  };
  const handleSearchToken = (key: any) => {
    try {
      if (key.length) {
        let newData = allTokens.filter(
          (item: any) =>
            `${item.parentName}`.toLowerCase().includes(key.toLowerCase()) ||
            `${item.key}`.toLowerCase().includes(key.toLowerCase()) ||
            `${item.parentContract}`
              .toLowerCase()
              .includes(key.toLowerCase()) ||
            `${item.childContract}`.toLowerCase().includes(key.toLowerCase())
        );
        setTokenList(newData);
        setPageCount(Math.ceil(newData.length / perPage));
        setTokenCount(newData.length);
      } else {
        const slice = allTokens.slice(limit, limit + perPage);
        setTokenList(slice);
        setPageCount(Math.ceil(allTokens.length / perPage));
        setTokenCount(allTokens.length);
      }
    } catch (err: any) {
      Sentry.captureMessage("handleSearchToken", err);
    }
  };

  useEffect(() => {
    onFilter();
  }, [filterKey, currentPage, limit]);

  const onFilter = () => {
    let filtered: any;
    let slice: any;
    if (filterKey.key != 0) {
      filtered = fixedTokens?.filter(
        (item: any) =>
          item.bridgetype.toLowerCase() == filterKey.value.toLowerCase()
      );
    } else {
      filtered = fixedTokens;
    }
    setTokenCount(filtered?.length);
    setPageCount(Math.ceil(filtered?.length / perPage));
    slice = filtered?.slice(limit, limit + perPage);
    setTokenList(slice);
    setAllTokens(filtered);
    if (filtered?.length < perPage * currentPage) {
      setCurrentPage(0);
      setLimit(0);
    }
  };

  const propsToTokenList = {
    handleSearchToken,
    filterKey,
    setFilterKey,
    tokenList,
    perPage,
    currentPage,
    tokenCount,
    pageCount,
    ChangePagination,
    loader,
  };
  return (
    <>
      <div className="main-content dark-bg-800 full-vh font-up ffms-inherit">
        <div className="mapped-token-header">
          <img src="../../../assets/images/Shibarium white@2x.png" alt="" />
          <Link href="/map">
            <a className="btn primary-btn ff-mos">Map New Token</a>
          </Link>
        </div>
        <div className="bottom-pad mapped-token-wrapper">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <div className="hero-cont">
              <div className="container container-header">
                <div className="section-title">
                  <h3>Find mapped tokens</h3>
                  <p>
                    The place to search for and locate all tokens mapped on
                    Shibarium.
                  </p>
                </div>
                <div className="choose-network-tabs">
                  <span className="title">Choose network</span>
                  <Nav>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="first"
                        onClick={() => setNetwork("Mainnet")}
                      >
                        Ethereum - Shibarium
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="second"
                        onClick={() => setNetwork("Testnet")}
                      >
                        Sepolia - PuppyNet
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </div>
            </div>
            <div className="container mapped-token-tab-content">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <TokenList {...propsToTokenList} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <TokenList {...propsToTokenList} />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      </div>
    </>
  );
}

export default MappedToken;

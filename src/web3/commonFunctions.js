import Web3 from "web3";
import ERC20abi from "../ABI/ERC20Abi.json";
import { ChainId } from "shibarium-get-chains";
import * as Sentry from "@sentry/nextjs";
import { CHAINS, URL_ARRAY } from "../config/networks";
import { useEffect, useState } from "react";

export const getAllowanceAmount = async (library, token, account, contract) => {
  if (account) {
    let lib = library;
    let web3 = new Web3(lib?.provider);
    let instance = new web3.eth.Contract(ERC20abi, token);
    let allowance = await instance.methods
      .allowance(account, contract)
      .call({ from: account });
    return parseInt(allowance) / 10 ** 18;
  }
};

export const currentGasPrice = async (web3) => {
  let value;
  await web3.eth
    .getGasPrice()
    .then((res) => {
      value = parseInt(res * 2.1);
    })
    .catch((err) => {
      Sentry.captureException("currentGasPrice ", err);
    });
  return value;
};

export const getNetworkName = (ID) => {
  if (ID == ChainId.ETHEREUM) {
    return "Ethereum Mainnet";
  } else if (ID == ChainId.GÖRLI) {
    return "Goerli Testnet";
  } else if (ID == ChainId.PUPPYNET917) {
    return "Puppy Net";
  } else {
    return "Shibarium Mainnet";
  }
};

export const USER_REJECTED_TX = 4001;
export const tokenDecimal = 2;

export const toFixedNull = 2;
export const toFixedPrecent = 2;

export const supportedChains = [5];

export const web3Decimals = 18;

export const addDecimalValue = (value) => {
  let num = value % 1;
  if (num > 0) {
    return value.toFixed(tokenDecimal);
  } else {
    return value.toFixed(toFixedNull);
  }
};

export const MAXAMOUNT = 100000;

export const inActiveCount = 5;

export const mobileWalletEndpoint = "shibarium.shib.io";

export const imagUrlChecking = (imgURL) => {
  if ((imgURL && imgURL.split("/")[0] === "http") || "https") {
    return imgURL;
  } else {
    return "../../assets/images/shiba-round-icon.png";
  }
};

export const checkImageType = (image) => {
  if (image.size) {
    return URL.createObjectURL(image);
  } else if ((image && image.split("/")[0] === "http") || "https") {
    return image;
  } else {
    return "../../assets/images/file-icon.png";
  }
};

export const checkpointVal = 80;
export const comissionVal = 10;

export const ErrorMessage = "execution reverted: not pub";

export const stakeForErrMsg = (msg) => {
  if (msg === "Error: execution reverted: not pub\n") {
    return "Public key is invalid! ";
  } else {
    return "something went wrong please try again later! ";
  }
};

export const generateSecondary = (link) =>
  `https://wispy-bird-88a7.uniswap.workers.dev/?url=http://${link}.link`;

export const fetchLink = async (link, setter, errorSetter) => {
  const second = generateSecondary(link);
  console.log(link);
  try {
    const response = await fetch(link.includes("http") ? link : second);
    const data = await response.json();
    if (Array.isArray(data.tokens)) errorSetter(false);
    setter({ data, url: link });
    console.log("fetch link data ", data);
  } catch (err) {
    errorSetter(true);
    setter(null);
  }
};

export const useStorage = (defaultChain = "") => {
  const [coinList, setCoinList] = useState([]);
  const [chain, setChain] = useState(defaultChain);


  useEffect(() => {
    if (chain) {
      const coinListRaw = localStorage.getItem("coinList");
      let parsed;
      try {
        parsed = JSON.parse(coinListRaw);
        const firstData = parsed[chain][0].data;
        if (!firstData) throw new Error("Incorrect format!");
      } catch (e) {
        parsed = false;
      }

      if (!parsed) {

        setCoinList(URL_ARRAY[chain]);
        localStorage.setItem("coinList", JSON.stringify(URL_ARRAY));
      } else {
        setCoinList(parsed[chain]);

      }
    } else {
      setCoinList([]);
    }
  }, [chain, URL_ARRAY]);

  useEffect(() => {
    try {
      if (chain && coinList && coinList.length) {
        let tempList = URL_ARRAY;
        tempList[chain] = coinList;
        localStorage.setItem("coinList", JSON.stringify(tempList));

      }
    } catch (error) {
      localStorage.removeItem("coinList");
      window.location.reload();
    }
  }, [coinList, chain]);

  return [coinList, setCoinList, setChain];
};

export const getDefaultChain = async () => {
  const chainId = await window?.ethereum?.request({ method: "eth_chainId" });

  if (chainId == CHAINS.Ropsten || chainId == CHAINS.Mainnet) {
    return "eth";
  } else if (chainId == CHAINS.BSCTESTNET || chainId == CHAINS.BSCMAINNET) {
    return "bsc";
  } else if (
    chainId == CHAINS.FANTOMTESTNET ||
    chainId == CHAINS.FANTOMMAINNET
  ) {
    return "ftm";
  } else if (chainId == CHAINS.POLYGONMAINNET) {
    return "polygon";
  } else {
    return "eth";
  }
};

export const clearCacheData = () => {

  self.addEventListener("activate", (event) => {
    const cachesToKeep = ["v2"];
    console.log("in clearing cache");
    event.waitUntil(
      caches.keys().then((keyList) =>
        Promise.all(
          keyList.map((key) => {
            if (!cachesToKeep.includes(key)) {
              return caches.delete(key);
            }
          })
        )
      )
    );
  });
};

export const getUserTimeZone = (time) => {
  let date = new Date(time);
  return date.toLocaleString();
};

export const parseError = (err) => {
  let error = `${err}`;
  let splitError = error.split("{");
  splitError.shift();
  console.log("string error " , splitError)
  let stringErr = JSON.parse("{" + splitError.join("{"));
  return stringErr.originalError;
};

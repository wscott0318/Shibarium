import Web3 from "web3";
import ERC20abi from "../ABI/ERC20Abi.json";
import { ChainId } from "shibarium-chains";
import * as Sentry from "@sentry/nextjs";

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
  } else if (ID == ChainId.PUPPY_NET) {
    return "Puppy Net";
  } else {
    return "Shibarium Mainnet";
  }
};

export const tokenDecimal = 2;

export const toFixedNull = 2;
export const toFixedPrecent = 2;

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

export const inActiveCount = 10;

export const mobileWalletEndpoint = "devui.hailshiba.com";

export const imagUrlChecking = (imgURL) => {
  if (imgURL && imgURL.split("/")[0]=== "http" || "https") {
    return imgURL;
  } else {
    return "../../assets/images/shiba-round-icon.png";
  }
};

export const checkImageType = (image) => {
  if(image.size) {
    return URL.createObjectURL(image)
  } else if (image && image.split("/")[0]=== "http" || "https") {
    return image
  } else {
    return "../../assets/images/file-icon.png"
  }
}

export const checkpointVal = 0;
export const comissionVal = 0;

export const ErrorMessage = "execution reverted: not pub"

export const stakeForErrMsg = (msg) => {
  if(msg === 'Error: execution reverted: not pub\n'){
    return "Public key is invalid! "
  } else {
    return "something went wrong please try again later! "
  }
}

export const CHAINS = {
  Mainnet: '0x1',
  Kovan: '0x42',
  Ropsten: '0x3',
  Rinkeby: '0x4',
  Goerli: '0x5',
  BSCTESTNET: '0x61',
  BSCMAINNET: '0x38',
  FANTOMTESTNET:'0xfa2',
  FANTOMMAINNET:'0xfa',
  POLYGONMAINNET: '0x89'
};

export const getDefaultChain = async () => {
      
  const chainId = await window?.ethereum?.request({ method: 'eth_chainId' });
// console.log(chainId);
  if (
    chainId == CHAINS.Ropsten ||
    chainId == CHAINS.Mainnet
  ) {
    return 'eth';
  } else if (
    chainId == CHAINS.BSCTESTNET ||
    chainId == CHAINS.BSCMAINNET
  ) {
  return 'bsc';
}else if(
  chainId == CHAINS.FANTOMTESTNET ||
  chainId == CHAINS.FANTOMMAINNET
){
  return 'ftm';
}else if(chainId == CHAINS.POLYGONMAINNET){
  return 'polygon'
}
else {
  return 'eth';
};
};
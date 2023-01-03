import { ChainId } from "shibarium-chains";
// import { SHIBARIUM_CHAINID } from 'app/constants'

const Arbitrum =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/arbitrum.jpg";
const Avalanche =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/avalanche.jpg";
const Bsc =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/bsc.jpg";
const Fantom =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/fantom.jpg";
const Goerli =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/goerli.jpg";
const Harmony =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/harmonyone.jpg";
const Heco =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/heco.jpg";
const Kovan =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/kovan.jpg";
const Mainnet =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/mainnet.jpg";
const Matic =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg";
const Moonbeam =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/moonbeam.jpg";
const OKEx =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/okex.jpg";
const Polygon =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg";
const Rinkeby =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/rinkeby.jpg";
const Ropsten =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/ropsten.jpg";
const xDai =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/gnosis.jpg";
const Celo =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/celo.jpg";
const Palm =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/palm.jpg";
const Moonriver =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/moonriver.jpg";
const Fuse =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/fuse.jpg";
const Telos =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/telos.jpg";
const Shibarium =
  "https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,c_limit,w_48,q_auto/https://www.shibatoken.com/images/shib-logo.svg";
const Puppy_net =
  "https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,c_limit,w_48,q_auto/https://www.shibatoken.com/images/shib-logo.svg";

export const NETWORK_ICON = {
  [ChainId.ETHEREUM]: Mainnet,
  [ChainId.ROPSTEN]: Ropsten,
  [ChainId.RINKEBY]: Rinkeby,
  [ChainId.GÖRLI]: Goerli,
  [ChainId.KOVAN]: Kovan,
  [ChainId.FANTOM]: Fantom,
  [ChainId.FANTOM_TESTNET]: Fantom,
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
  [ChainId.MATIC]: Polygon,
  [ChainId.MATIC_TESTNET]: Matic,
  [ChainId.XDAI]: xDai,
  [ChainId.ARBITRUM]: Arbitrum,
  [ChainId.ARBITRUM_TESTNET]: Arbitrum,
  [ChainId.MOONBEAM_TESTNET]: Moonbeam,
  [ChainId.AVALANCHE]: Avalanche,
  [ChainId.AVALANCHE_TESTNET]: Avalanche,
  [ChainId.HECO]: Heco,
  [ChainId.HECO_TESTNET]: Heco,
  [ChainId.HARMONY]: Harmony,
  [ChainId.HARMONY_TESTNET]: Harmony,
  [ChainId.OKEX]: OKEx,
  [ChainId.OKEX_TESTNET]: OKEx,
  [ChainId.CELO]: Celo,
  [ChainId.PALM]: Palm,
  [ChainId.MOONRIVER]: Moonriver,
  [ChainId.FUSE]: Fuse,
  [ChainId.TELOS]: Telos,
  [ChainId.SHIBARIUM]: Shibarium,
  [ChainId.PUPPY_NET]: Puppy_net,
};
// enum SHIBARIUM{
//   SHIBARIUM = SHIBARIUM_CHAINID
// }
// type Chain_id= ChainId | SHIBARIUM

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.ETHEREUM]: "Ethereum",
  [ChainId.RINKEBY]: "Rinkeby",
  [ChainId.ROPSTEN]: "Ropsten",
  [ChainId.GÖRLI]: "Göerli",
  [ChainId.KOVAN]: "Kovan",
  [ChainId.FANTOM]: "Fantom",
  [ChainId.FANTOM_TESTNET]: "Fantom Testnet",
  [ChainId.MATIC]: "Polygon",
  [ChainId.MATIC_TESTNET]: "Polygon Testnet",
  [ChainId.XDAI]: "Gnosis",
  [ChainId.ARBITRUM]: "Arbitrum",
  [ChainId.ARBITRUM_TESTNET]: "Arbitrum Testnet",
  [ChainId.BSC]: "BSC",
  [ChainId.BSC_TESTNET]: "BSC Testnet",
  [ChainId.MOONBEAM_TESTNET]: "Moonbase",
  [ChainId.AVALANCHE]: "Avalanche",
  [ChainId.AVALANCHE_TESTNET]: "Fuji",
  [ChainId.HECO]: "HECO",
  [ChainId.HECO_TESTNET]: "HECO Testnet",
  [ChainId.HARMONY]: "Harmony",
  [ChainId.HARMONY_TESTNET]: "Harmony Testnet",
  [ChainId.OKEX]: "OKEx",
  [ChainId.OKEX_TESTNET]: "OKEx",
  [ChainId.CELO]: "Celo",
  [ChainId.PALM]: "Palm",
  [ChainId.MOONRIVER]: "Moonriver",
  [ChainId.FUSE]: "Fuse",
  [ChainId.TELOS]: "Telos EVM",
  [ChainId.SHIBARIUM]: "Shibarium",
  [ChainId.PUPPY_NET]: "Puppy Net",
};
export const CHAINS = {
  Mainnet: "0x1",
  Kovan: "0x42",
  Ropsten: "0x3",
  Rinkeby: "0x4",
  Goerli: "0x5",
  BSCTESTNET: "0x61",
  BSCMAINNET: "0x38",
  FANTOMTESTNET: "0xfa2",
  FANTOMMAINNET: "0xfa",
  POLYGONMAINNET: "0x89",
};


export const URL_ARRAY:{[key:string]:Array<any>} = {
  eth: [
    {
      enabled: true,
      default: true,
      data: "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link",
    },
    {
      home: "https://tokenlists.org/token-list?url=https://www.gemini.com/uniswap/manifest.json",
      data: "https://www.gemini.com/uniswap/manifest.json",
      enabled: false,
    },
    {
      home: "https://tokenlists.org/token-list?url=https://tokens.coingecko.com/uniswap/all.json",
      data: "https://tokens.coingecko.com/uniswap/all.json",
      enabled: false,
    },
    //   {
    //     home: 'https://tokenlists.org/token-list?url=defi.cmc.eth',
    //     data: 'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://defi.cmc.eth.link',
    //   enabled: false,
    // },
    {
      home: "https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json",
      data: "https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json",
      enabled: false,
    },
    {
      home: "https://netapi.anyswap.net/bridge/v2/info",
      data: "https://www.gemini.com/uniswap/manifest.json",
      enabled: false,
    },
  ],
  bsc: [
    {
      enabled: true,
      default: true,
      home: "https://wispy-bird-88a7.uniswap.workers.dev/?url=https://tokens.pancakeswap.finance/pancakeswap-extended.json",
      data: "https://wispy-bird-88a7.uniswap.workers.dev/?url=https://tokens.pancakeswap.finance/pancakeswap-extended.json",
    },
  ],
  polygon: [
    {
      enabled: true,
      default: true,
      home: "https://api-polygon-tokens.polygon.technology/tokenlists/allTokens.tokenlist.json",
      data: "https://api-polygon-tokens.polygon.technology/tokenlists/allTokens.tokenlist.json",
    },
  ],
};

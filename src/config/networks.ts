import { ChainId } from "shibarium-get-chains";
import { PUPPYNET_CHAIN_ID } from "./constant";
// import { SHIBARIUM_CHAINID } from 'app/constants'
const icons = {
  Arbitrum:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/arbitrum.jpg",
  Avalanche:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/avalanche.jpg",
  Bsc: "https://raw.githubusercontent.com/sushiswap/icons/master/network/bsc.jpg",
  Fantom:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/fantom.jpg",
  Goerli:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/goerli.jpg",
  Harmony:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/harmonyone.jpg",
  Heco: "https://raw.githubusercontent.com/sushiswap/icons/master/network/heco.jpg",
  Kovan:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/kovan.jpg",
  Mainnet:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/mainnet.jpg",
  Matic:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg",
  Moonbeam:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/moonbeam.jpg",
  OKEx: "https://raw.githubusercontent.com/sushiswap/icons/master/network/okex.jpg",
  Polygon:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg",
  Rinkeby:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/rinkeby.jpg",
  Ropsten:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/ropsten.jpg",
  xDai: "https://raw.githubusercontent.com/sushiswap/icons/master/network/gnosis.jpg",
  Celo: "https://raw.githubusercontent.com/sushiswap/icons/master/network/celo.jpg",
  Palm: "https://raw.githubusercontent.com/sushiswap/icons/master/network/palm.jpg",
  Moonriver:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/moonriver.jpg",
  Fuse: "https://raw.githubusercontent.com/sushiswap/icons/master/network/fuse.jpg",
  Telos:
    "https://raw.githubusercontent.com/sushiswap/icons/master/network/telos.jpg",
  Shibarium:
    "https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,c_limit,w_48,q_auto/https://www.shibatoken.com/images/shib-logo.svg",
  PUPPYNET:
    "https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,c_limit,w_48,q_auto/https://www.shibatoken.com/images/shib-logo.svg",
};
export const NETWORK_ICON: Record<
  typeof ChainId[number],
  typeof icons[keyof typeof icons]
> = {
  [ChainId.ETHEREUM]: icons.Mainnet,
  [ChainId.ROPSTEN]: icons.Ropsten,
  [ChainId.RINKEBY]: icons.Rinkeby,
  [ChainId.GÖRLI]: icons.Goerli,
  [ChainId.SEPOLIA]: icons.Goerli,
  [ChainId.KOVAN]: icons.Kovan,
  [ChainId.FANTOM]: icons.Fantom,
  [ChainId.FANTOM_TESTNET]: icons.Fantom,
  [ChainId.BSC]: icons.Bsc,
  [ChainId.BSC_TESTNET]: icons.Bsc,
  [ChainId.MATIC]: icons.Polygon,
  [ChainId.MATIC_TESTNET]: icons.Matic,
  [ChainId.XDAI]: icons.xDai,
  [ChainId.ARBITRUM]: icons.Arbitrum,
  [ChainId.ARBITRUM_TESTNET]: icons.Arbitrum,
  [ChainId.MOONBEAM_TESTNET]: icons.Moonbeam,
  [ChainId.AVALANCHE]: icons.Avalanche,
  [ChainId.AVALANCHE_TESTNET]: icons.Avalanche,
  [ChainId.HECO]: icons.Heco,
  [ChainId.HECO_TESTNET]: icons.Heco,
  [ChainId.HARDHAT]: icons.Heco,
  [ChainId.HARMONY]: icons.Harmony,
  [ChainId.HARMONY_TESTNET]: icons.Harmony,
  [ChainId.OKEX]: icons.OKEx,
  [ChainId.OKEX_TESTNET]: icons.OKEx,
  [ChainId.CELO]: icons.Celo,
  [ChainId.PALM]: icons.Palm,
  [ChainId.PALM_TESTNET]: icons.Palm,
  [ChainId.MOONRIVER]: icons.Moonriver,
  [ChainId.MOONBEAM]: icons.Moonriver,
  [ChainId.FUSE]: icons.Fuse,
  [ChainId.TELOS]: icons.Telos,
  [ChainId.SHIBARIUM]: icons.Shibarium,
  [ChainId.PUPPYNET517]: icons.PUPPYNET,
  [ChainId.PUPPYNET917]: icons.PUPPYNET,
  [ChainId.PUPPYNET719]: icons.PUPPYNET,
  [ChainId.PUPPYNET]: icons.PUPPYNET,
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
  [ChainId.PALM_TESTNET]: "Palm",
  [ChainId.MOONRIVER]: "Moonriver",
  [ChainId.FUSE]: "Fuse",
  [ChainId.TELOS]: "Telos EVM",
  [ChainId.SHIBARIUM]: "Shibarium",
  [ChainId.PUPPYNET517]: "Puppy Net 517",
  [ChainId.PUPPYNET917]: "Puppy Net 917",
  [ChainId.PUPPYNET719]: "Puppy Net",
  [PUPPYNET_CHAIN_ID]: "Puppy Net",
  [ChainId.SEPOLIA]: "Sepolia",
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

export const URL_ARRAY: { [key: string]: Array<any> } = {
  eth: [
    {
      enabled: true,
      default: true,
      data: "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link",
      name: "1inch",
    },
    {
      default: true,
      home: "https://tokenlists.org/token-list?url=https://www.gemini.com/uniswap/manifest.json",
      data: "https://www.gemini.com/uniswap/manifest.json",
      enabled: false,
      name: "gemini",
    },
    {
      default: true,
      home: "https://tokenlists.org/token-list?url=https://tokens.coingecko.com/uniswap/all.json",
      data: "https://tokens.coingecko.com/uniswap/all.json",
      enabled: false,
      name: "coingecko",
    },
    //   {
    //     home: 'https://tokenlists.org/token-list?url=defi.cmc.eth',
    //     data: 'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://defi.cmc.eth.link',
    //   enabled: false,
    // },
    {
      default: true,
      home: "https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json",
      data: "https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json",
      enabled: false,
      name: "compound",
    },
    {
      default: true,
      home: "https://netapi.anyswap.net/bridge/v2/info",
      data: "https://www.gemini.com/uniswap/manifest.json",
      enabled: false,
      name: "uniswap",
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

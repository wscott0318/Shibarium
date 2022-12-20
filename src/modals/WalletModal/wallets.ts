import { ChainId } from 'shibarium-chains'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// import { SHIBARIUM_CHAINID } from 'app/constants'
// import { SHIBARIUM_CHAINID } from 'app/constants'
// import { ChainId } from 'app/enums'
import { NetworkConnector } from './NetworkConnector'

import RPC from './rpc'

const POLLING_INTERVAL = 8000;

const supportedChainIds = [...Object.values(ChainId) as number[]]

const INFURA_NETWORK_URLS = {
  1: `https://mainnet.infura.io/v3/340a5f13a5a34f1ab3dcdca0a2bbf81d`,
  3: `https://ropsten.infura.io/v3/340a5f13a5a34f1ab3dcdca0a2bbf81d`,
  4: `https://rinkeby.infura.io/v3/340a5f13a5a34f1ab3dcdca0a2bbf81d`,
  5: `https://goeril.infura.io/v3/340a5f13a5a34f1ab3dcdca0a2bbf81d`,
}

export const walletconnect = new WalletConnectConnector({
  rpc: INFURA_NETWORK_URLS,
  supportedChainIds: [1, 3, 4, 5],
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  // @ts-ignore
  pollingInterval: POLLING_INTERVAL
})



export const network = new NetworkConnector({
  defaultChainId: 1,
  urls: RPC,
})

export const injected = new InjectedConnector({
  supportedChainIds,
})

export interface WalletInfo {
  connector?: (() => Promise<AbstractConnector>) | AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'injected.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  METAMASK_MOBILE: {
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Open in MetaMask app.',
    href: 'https://metamask.app.link/dapp/devui.hailshiba.com',
    color: '#E8831D',
    mobile: true,
    mobileOnly: true,
  },
  WALLET_CONNECT: {
    connector: async () => {
      const WalletConnectConnector = (await import('@web3-react/walletconnect-connector')).WalletConnectConnector
      return new WalletConnectConnector({
        rpc: RPC,
        bridge: 'https://bridge.walletconnect.org',
        qrcode: true,
        supportedChainIds,
      })
    },
    name: 'WalletConnect',
    iconName: 'wallet-connect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  }
}
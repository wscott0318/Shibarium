import { ChainId } from 'shibarium-chains'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
// import { SHIBARIUM_CHAINID } from 'app/constants'
// import { SHIBARIUM_CHAINID } from 'app/constants'
// import { ChainId } from 'app/enums'
import { NetworkConnector } from './NetworkConnector'

import RPC from './rpc'

const supportedChainIds = [...Object.values(ChainId) as number[]]

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
    href: 'https://metamask.app.link/dapp/app.sushi.com',
    color: '#E8831D',
    mobile: true,
    mobileOnly: true,
  }
}
import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from 'shibarium-chains'
import { useWeb3React } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'


export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?: ChainId
} {
  // replace with address to impersonate
  const impersonate = false
  const context = useWeb3React<Web3Provider>()
  const contextNetwork = useWeb3React<Web3Provider>('NETWORK')
  return context.active
    ? { ...context, account: impersonate || context.account }
    : { ...contextNetwork, account: impersonate || contextNetwork.account }
}

import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '@sushiswap/core-sdk'
import { useWeb3React } from '@web3-react/core'
// import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
// import { NetworkContextName } from '../../../constants'
import Web3 from 'web3'

export function useLocalWeb3(): any {
  const context :any= useWeb3React<Web3Provider>()
  return context.active
    ? new Web3(context?.library?.provider)
    : null
}

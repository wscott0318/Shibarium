import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import {
  CHAIN_KEY,
  ENS_REGISTRAR_ADDRESS,
  MULTICALL2_ADDRESS,
} from 'shibarium-get-chains'
import { LIMIT_ORDER_HELPER_ADDRESS, STOP_LIMIT_ORDER_ADDRESS } from '@sushiswap/limit-order-sdk'

import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
// import FACTORY_ABI from 'app/constants/abis/factory.json'
// import INARI_ABI from 'app/constants/abis/inari.json'
// import KASHI_REPOSITORY_ABI from 'app/constants/abis/kashi-repository.json'
// import LIMIT_ORDER_ABI from 'app/constants/abis/limit-order.json'
// import LIMIT_ORDER_HELPER_ABI from 'app/constants/abis/limit-order-helper.json'
// import MAKER_ABI from 'app/constants/abis/maker.json'
// import MASTERCHEF_ABI from 'app/constants/abis/masterchef.json'
// import MASTERCHEF_V2_ABI from 'app/constants/abis/masterchef-v2.json'
// import MEOWSHI_ABI from 'app/constants/abis/meowshi.json'
// import MERKLE_DISTRIBUTOR_ABI from 'app/constants/abis/merkle-distributor.json'
// import MINICHEF_ABI from 'app/constants/abis/minichef-v2.json'
// import MISO_HELPER_ABI from 'app/constants/abis/miso-helper.json'
import MULTICALL2_ABI from '../constants/abis/multicall2.json'
// import ROUTER_ABI from 'app/constants/abis/router.json'
// import SUSHI_ABI from 'app/constants/abis/sushi.json'
// import SUSHIROLL_ABI from 'app/constants/abis/sushi-roll.json'
// import TIMELOCK_ABI from 'app/constants/abis/timelock.json'
// import TRIDENT_MIGRATION_ABI from 'app/constants/abis/trident-migration.json'
// import UNI_FACTORY_ABI from 'app/constants/abis/uniswap-v2-factory.json'
// import IUniswapV2PairABI from 'app/constants/abis/uniswap-v2-pair.json'
// import WETH9_ABI from 'app/constants/abis/weth.json'
// import ZENKO_ABI from 'app/constants/abis/zenko.json'

import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall';

import { getContract } from '../functions/contract'
import { useActiveWeb3React } from '../services/web3'
import { useMemo } from 'react'

const UNI_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'



// returns null on errors
export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()
  return useMemo(() => {
    if (!address || address === AddressZero || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.log('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}


export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && ENS_REGISTRAR_ADDRESS[chainId], ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}


export function useMulticall2Contract() {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL2_ADDRESS[chainId], MULTICALL2_ABI, false)
}
const MULTICALL_NETWORK: any = MULTICALL_NETWORKS;
export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL_NETWORK[chainId], MULTICALL_ABI, false)
}


export function useLimitOrderContract(withSignerIfPossibe?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  // @ts-ignore TYPE NEEDS FIXING
  return useContract(STOP_LIMIT_ORDER_ADDRESS[chainId], LIMIT_ORDER_ABI, withSignerIfPossibe)
}

export function useLimitOrderHelperContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  // @ts-ignore TYPE NEEDS FIXING
  return useContract(chainId && LIMIT_ORDER_HELPER_ADDRESS[chainId], LIMIT_ORDER_HELPER_ABI, withSignerIfPossible)
}


export function useTridentRouterContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  // @ts-ignore TYPE NEEDS FIXING
  const router = TRIDENT[chainId]?.[CHAIN_KEY[chainId]]?.contracts.TridentRouter
  return useContract(router?.address, router?.abi, withSignerIfPossible)
}

export function useMasterDeployerContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  // @ts-ignore TYPE NEEDS FIXING
  const masterDeployer = TRIDENT[chainId]?.[CHAIN_KEY[chainId]]?.contracts.MasterDeployer
  return useContract(masterDeployer?.address, masterDeployer?.abi, withSignerIfPossible)
}

export function useConstantProductPoolFactory(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  // @ts-ignore TYPE NEEDS FIXING
  const factory = TRIDENT[chainId]?.[CHAIN_KEY[chainId]]?.contracts.ConstantProductPoolFactory
  return useContract(factory?.address, factory?.abi, withSignerIfPossible)
}

export function useStablePoolFactory(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  // @ts-ignore TYPE NEEDS FIXING
  const factory = TRIDENT[chainId]?.[CHAIN_KEY[chainId]]?.contracts.HybridPoolFactory
  return useContract(factory?.address, factory?.abi, withSignerIfPossible)
}


import { ChainId } from "@shibarium/core-sdk";

export const BONE_ID = 'bone-shibaswap';
                                
export const API_BASE_URL = 'https://dev-staking-api-1.hailshiba.com/api/v1/'
/**
 * Staking APi BASE URL
 */
export const STAKING_API_BASE_URL = 'https://dev-staking-api-1.hailshiba.com/api/v1/'

/**
 *Using for Transaction via Metamask
 */

export const SHIBARIUM_CHAIN_ID = ChainId.SHIBARIUM; 
export const ENV_CONFIGS ={
    [ChainId.SHIBARIUM]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x809bbf767883277f6fdB8f378489B259A02fD7a7',

    },
    [ChainId.GÖRLI]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x809bbf767883277f6fdB8f378489B259A02fD7a7',
    },
    [ChainId.ETHEREUM]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.ROPSTEN]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.RINKEBY]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.KOVAN ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.MATIC ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.MATIC_TESTNET]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.FANTOM ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.FANTOM_TESTNET]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.XDAI ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.BSC]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.BSC_TESTNET]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.ARBITRUM ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.ARBITRUM_TESTNET ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.MOONBEAM_TESTNET ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.AVALANCHE ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.AVALANCHE_TESTNET ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.HECO ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.HECO_TESTNET ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.HARMONY ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.HARMONY_TESTNET ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.OKEX ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.OKEX_TESTNET ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.CELO ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.PALM ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.PALM_TESTNET]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.MOONRIVER ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.FUSE ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.TELOS ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.HARDHAT ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.MOONBEAM]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.OPTIMISM]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.KAVA]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.METIS ]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },
    [ChainId.SHIBARIUM_TESTNET]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    },

}
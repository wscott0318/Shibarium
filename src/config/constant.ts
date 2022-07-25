import { ChainId } from "@shibarium/core-sdk";

export const BONE_ID = 'bone-shibaswap';

export const API_BASE_URL = 'http://18.219.186.181:5020/'
/**
 * Staking APi BASE URL
 */
export const STAKING_API_BASE_URL = 'http://3.17.75.111:3000/api/v1/'

/**
 *Using for Transaction via Metamask
 */

export const MORALIS_SERVER_URL="https://7q5upqnuqufz.usemoralis.com:2053/server";
export const MORALIS_APP_ID="IjZ7Ik5VKdXUOkKOpOZT3OowA5FqXLBu0zemJwbB";

export const ENV_CONFIGS:{[chainId in ChainId]:any} ={
    [ChainId.SHIBARIUM]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x809bbf767883277f6fdB8f378489B259A02fD7a7',
    },
    [ChainId.GÖRLI]:{
        STAKE_MANAGER: '0x92f1fe54C01eE8af31f55D400f0e48B7f990F8a2',
        BONE : '0x0000000000000000000000000000000000001010',
    }
}
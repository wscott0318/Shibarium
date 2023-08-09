import { ChainId } from "shibarium-get-chains";

export const BONE_ID = "bone-shibaswap";
// 18.216.5.132:3000/api/v1/ http://18.216.5.132:3000/api/v1/tokens/getList

export const API_BASE_URL = `${process.env.NEXT_PUBLIC_STAKING_API_URL}/api/v1`; // dev
// export const API_BASE_URL = "http://10.89.4.174:3000/api/v1"; // staging
// export const API_BASE_URL = "http://localhost:3001/api/v1"; // staging

export const S3PATH = `${process.env.NEXT_PUBLIC_ABI_API_URL}/beta/v2/`;
/**
 * Staking APi BASE URL
 */

/**
 *Using for Transaction via Metamask
 */

export const SHIBARIUM_CHAIN_ID = ChainId.SHIBARIUM;
export const GOERLI_CHAIN_ID = ChainId.ETHEREUM;
export const PUPPYNET_CHAIN_ID = ChainId.SHIBARIUM;
export const ETHEREUM_CHAIN_ID = ChainId.ETHEREUM;

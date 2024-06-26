import { ChainId, Token } from 'shibarium-get-chains'

export const USDC = new Token(ChainId.FANTOM, '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6, 'USDC', 'USD Coin')
export const WBTC = new Token(
  ChainId.FANTOM,
  '0x321162Cd933E2Be498Cd2267a90534A804051b11',
  8,
  'WBTC',
  'Wrapped Bitcoin'
)
export const DAI = new Token(ChainId.FANTOM, '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', 18, 'DAI', 'Dai Stablecoin')
export const WETH = new Token(ChainId.FANTOM, '0x74b23882a30290451A17c44f4F05243b6b58C76d', 18, 'WETH', 'Wrapped Ether')
export const MIM = new Token(
  ChainId.FANTOM,
  '0x82f0B8B456c1A451378467398982d4834b6829c1',
  18,
  'MIM',
  'Magic Internet Money'
)
export const ICE = new Token(ChainId.FANTOM, '0xf16e81dce15B08F326220742020379B855B87DF9', 18, 'ICE', 'IceToken')
export const SPELL = new Token(ChainId.FANTOM, '0x468003B688943977e6130F4F68F23aad939a1040', 18, 'SPELL', 'SpellToken')

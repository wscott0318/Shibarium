import { CurrencyAmount, Token } from 'shibarium-chains'

type TokenAddress = string

export type TokenBalancesMap = Record<TokenAddress, CurrencyAmount<Token>>

import { CurrencyAmount, Token } from 'shibarium-get-chains'

type TokenAddress = string

export type TokenBalancesMap = Record<TokenAddress, CurrencyAmount<Token>>

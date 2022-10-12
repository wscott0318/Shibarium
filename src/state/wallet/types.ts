import { CurrencyAmount, Token } from '@shibarium/core-sdk'

type TokenAddress = string

export type TokenBalancesMap = Record<TokenAddress, CurrencyAmount<Token>>

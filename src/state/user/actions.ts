import { createAction } from '@reduxjs/toolkit'

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
export const updateUserSingleHopOnly = createAction<{
  userSingleHopOnly: boolean
}>('user/updateUserSingleHopOnly')
export const updateUserDeadline = createAction<{ userDeadline: number }>('user/updateUserDeadline')
export const addSerializedToken = createAction<{
  serializedToken: SerializedToken
}>('user/addSerializedToken')
export const removeSerializedToken = createAction<{
  chainId: number
  address: string
}>('user/removeSerializedToken')
export const addSerializedPair = createAction<{
  serializedPair: SerializedPair
}>('user/addSerializedPair')
export const removeSerializedPair = createAction<{
  chainId: number
  tokenAAddress: string
  tokenBAddress: string
}>('user/removeSerializedPair')
export const toggleURLWarning = createAction<void>('app/toggleURLWarning')

export const updateUserUseOpenMev = createAction<{
  userUseOpenMev: boolean
}>('user/updateUserUseOpenMev')

export const updateUserType = createAction<{
  userType: string
}>('user/updateUserType')
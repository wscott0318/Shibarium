import { createReducer } from "@reduxjs/toolkit";
import { DEFAULT_DEADLINE_FROM_NOW } from "../../constants";
import { updateVersion } from "../../state/global/actions";

import {
  addSerializedPair,
  addSerializedToken,
  removeSerializedPair,
  removeSerializedToken,
  SerializedPair,
  SerializedToken,
  toggleURLWarning,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserSingleHopOnly,
  updateUserType,
  updateValInfoContract,
  updateUserUseOpenMev,
  updateValId,
  updateValInfo,
  updateEpochDyna,
  updateMigrateData,
  updateTotalValCount,
  updateValidatorThreshold,
  updateBorBlockHeight,
} from "./actions";
import { updatePendingTransactionCount } from "../user/actions";

const currentTimestamp = () => new Date().getTime();

export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number;

  userExpertMode: boolean;

  userSingleHopOnly: boolean; // only allow swaps on direct pairs

  // deadline set by user in minutes, used in all txns
  userDeadline: number;

  // true if OpenMEV protection is enabled
  userUseOpenMev: boolean;

  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken;
    };
  };

  pairs: {
    [chainId: number]: {
      // keyed by token0Address:token1Address
      [key: string]: SerializedPair;
    };
  };

  timestamp: number;
  URLWarningVisible: boolean;
  userType: string;
  valId: string;
  valInfo: object;
  valInfoContract: object;
  epochDyna: object;
  migrateData: object;
  stake: number;
  totalValCount: number;
  pendingTransactionCount: number;
  validatorThreshold: number;
  borBlockHeight: number;
}

function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`;
}

export const initialState: UserState = {
  userExpertMode: false,
  userSingleHopOnly: false,
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  tokens: {},
  pairs: {},
  timestamp: currentTimestamp(),
  URLWarningVisible: true,
  userUseOpenMev: true,
  userType: "NA",
  valId: "1",
  valInfo: {},
  valInfoContract: {},
  epochDyna: {},
  migrateData: {},
  stake: 0,
  totalValCount: 0,
  pendingTransactionCount: 0,
  validatorThreshold: 0,
  borBlockHeight: 0,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateVersion, (state) => {
      // deadline isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (typeof state.userDeadline !== "number") {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW;
      }

      state.lastUpdateVersionTimestamp = currentTimestamp();
    })

    .addCase(updateUserExpertMode, (state, action) => {
      state.userExpertMode = action.payload.userExpertMode;
      state.timestamp = currentTimestamp();
    })
    .addCase(updateUserDeadline, (state, action) => {
      state.userDeadline = action.payload.userDeadline;
      state.timestamp = currentTimestamp();
    })
    .addCase(updateUserSingleHopOnly, (state, action) => {
      state.userSingleHopOnly = action.payload.userSingleHopOnly;
    })
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
      state.tokens[serializedToken.chainId] =
        state.tokens[serializedToken.chainId] || {};
      state.tokens[serializedToken.chainId][serializedToken.address] =
        serializedToken;
      state.timestamp = currentTimestamp();
    })
    .addCase(
      removeSerializedToken,
      (state, { payload: { address, chainId } }) => {
        state.tokens[chainId] = state.tokens[chainId] || {};
        delete state.tokens[chainId][address];
        state.timestamp = currentTimestamp();
      }
    )
    .addCase(addSerializedPair, (state, { payload: { serializedPair } }) => {
      if (
        serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address
      ) {
        const chainId = serializedPair.token0.chainId;
        state.pairs[chainId] = state.pairs[chainId] || {};
        state.pairs[chainId][
          pairKey(serializedPair.token0.address, serializedPair.token1.address)
        ] = serializedPair;
      }
      state.timestamp = currentTimestamp();
    })
    .addCase(
      removeSerializedPair,
      (state, { payload: { chainId, tokenAAddress, tokenBAddress } }) => {
        if (state.pairs[chainId]) {
          // just delete both keys if either exists
          delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)];
          delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)];
        }
        state.timestamp = currentTimestamp();
      }
    )
    .addCase(toggleURLWarning, (state) => {
      state.URLWarningVisible = !state.URLWarningVisible;
    })
    .addCase(updateUserUseOpenMev, (state, action) => {
      state.userUseOpenMev = action.payload.userUseOpenMev;
    })
    .addCase(updateUserType, (state, action) => {
      state.userType = action.payload.userType;
    })
    .addCase(updateValInfoContract, (state, action) => {
      state.valInfoContract = action.payload.valInfoContract;
    })
    .addCase(updateValId, (state, action) => {
      state.valId = action.payload.valId;
    })
    .addCase(updateValInfo, (state, action) => {
      state.valInfo = action.payload;
    })
    .addCase(updateEpochDyna, (state, action) => {
      state.epochDyna = action.payload;
    })
    .addCase(updateMigrateData, (state, action) => {
      state.migrateData = action.payload;
    })
    .addCase(updateTotalValCount, (state, action) => {
      state.totalValCount = action.payload.totalValCount;
    })
    .addCase(updateValidatorThreshold, (state, action) => {
      state.validatorThreshold = action.payload.validatorThreshold;
    })
    .addCase(updatePendingTransactionCount, (state, action) => {
      state.pendingTransactionCount = action.payload.pendingTransactionCount;
    })
    .addCase(updateBorBlockHeight, (state, action) => {
      state.borBlockHeight = action.payload.borBlockHeight;
    })
);

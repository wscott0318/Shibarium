import { createReducer } from "@reduxjs/toolkit";
import { getVersionUpgrade, VersionUpgrade } from "@uniswap/token-lists";
import { TokenList } from "@uniswap/token-lists/dist/types";

import {
  DEFAULT_ACTIVE_LIST_URLS,
  DEFAULT_LIST_OF_LISTS,
} from "../../config/token-lists";
import { updateVersion } from "../global/actions";
import {
  acceptListUpdate,
  addList,
  disableList,
  enableList,
  fetchTokenList,
  removeList,
} from "./actions";

export interface ListsState {
  readonly byUrl: {
    readonly [url: string]: {
      readonly current: TokenList | null;
      readonly pendingUpdate: TokenList | null;
      readonly loadingRequestId: string | null;
      readonly error: string | null;
    };
  };
  // this contains the default list of lists from the last time the updateVersion was called, i.e. the app was reloaded
  readonly lastInitializedDefaultListOfLists?: string[];

  // currently active lists
  readonly activeListUrls: string[] | undefined;
}

type ListState = ListsState["byUrl"][string];

const NEW_LIST_STATE: ListState = {
  error: null,
  current: null,
  loadingRequestId: null,
  pendingUpdate: null,
};

type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? U[] : T[P];
};

const initialState: ListsState = {
  lastInitializedDefaultListOfLists: DEFAULT_LIST_OF_LISTS,
  byUrl: {
    ...DEFAULT_LIST_OF_LISTS.reduce<Mutable<ListsState["byUrl"]>>(
      (memo, listUrl) => {
        memo[listUrl] = NEW_LIST_STATE;
        return memo;
      },
      {}
    ),
  },
  activeListUrls: DEFAULT_ACTIVE_LIST_URLS,
};
// console.log("code found 1");
export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      fetchTokenList.pending,
      (state, { payload: { requestId, url } }) => {
        state.byUrl[url] = {
          // @ts-ignore TYPE NEEDS FIXING
          current: null,
          // @ts-ignore TYPE NEEDS FIXING
          pendingUpdate: null,
          ...state.byUrl[url],
          loadingRequestId: requestId,
          error: null,
        };
      }
    )
    .addCase(
      fetchTokenList.fulfilled,
      (state, { payload: { requestId, tokenList, url } }) => {
        const current = state.byUrl[url]?.current;
        const loadingRequestId = state.byUrl[url]?.loadingRequestId;
        console.log("code found 1");
        // no-op if update does nothing
        if (current) {
          const upgradeType = getVersionUpgrade(
            current.version,
            tokenList.version
          );
          console.log("code found 2");
          if (upgradeType === VersionUpgrade.NONE) return;
          if (loadingRequestId === null || loadingRequestId === requestId) {
            state.byUrl[url] = {
              ...state.byUrl[url],
              loadingRequestId: null,
              error: null,
              current: current,
              pendingUpdate: tokenList,
            };
          }
        } else {
          console.log("code found 8");
          // activate if on default active
          if (DEFAULT_ACTIVE_LIST_URLS.includes(url)) {
            state.activeListUrls?.push(url);
          }

          state.byUrl[url] = {
            ...state.byUrl[url],
            loadingRequestId: null,
            error: null,
            current: tokenList,
            pendingUpdate: null,
          };
        }
      }
    )
    .addCase(
      fetchTokenList.rejected,
      (state, { payload: { url, requestId, errorMessage } }) => {
        console.log("code found 9");
        if (state.byUrl[url]?.loadingRequestId !== requestId) {
          // no-op since it's not the latest request
          return;
        }
        console.log("code found 3");
        state.byUrl[url] = {
          ...state.byUrl[url],
          loadingRequestId: null,
          error: errorMessage,
          current: null,
          pendingUpdate: null,
        };
      }
    )
    .addCase(addList, (state, { payload: url }) => {
      console.log("code found 10");
      if (!state.byUrl[url]) {
        state.byUrl[url] = NEW_LIST_STATE;
      }
    })
    .addCase(removeList, (state, { payload: url }) => {
      console.log("code found 11");
      if (state.byUrl[url]) {
        delete state.byUrl[url];
      }
      // remove list from active urls if needed
      if (state.activeListUrls && state.activeListUrls.includes(url)) {
        state.activeListUrls = state.activeListUrls.filter((u) => u !== url);
      }
    })
    .addCase(enableList, (state, { payload: url }) => {
      console.log("code found 12");
      if (!state.byUrl[url]) {
        state.byUrl[url] = NEW_LIST_STATE;
      }
      console.log("code found 4");
      if (state.activeListUrls && !state.activeListUrls.includes(url)) {
        state.activeListUrls.push(url);
      }

      if (!state.activeListUrls) {
        state.activeListUrls = [url];
      }
    })
    .addCase(disableList, (state, { payload: url }) => {
      console.log("code found 13");
      if (state.activeListUrls && state.activeListUrls.includes(url)) {
        state.activeListUrls = state.activeListUrls.filter((u) => u !== url);
      }
    })
    .addCase(acceptListUpdate, (state, { payload: url }) => {
      console.log("code found 14");
      if (!state.byUrl[url]?.pendingUpdate) {
        throw new Error("accept list update called without pending update");
      }
      state.byUrl[url] = {
        ...state.byUrl[url],
        pendingUpdate: null,
        current: state.byUrl[url].pendingUpdate,
      };
    })
    .addCase(updateVersion, (state) => {
      console.log("code found 15");
      // state loaded from localStorage, but new lists have never been initialized
      if (!state.lastInitializedDefaultListOfLists) {
        state.byUrl = initialState.byUrl;
        state.activeListUrls = initialState.activeListUrls;
      } else if (state.lastInitializedDefaultListOfLists) {
        const lastInitializedSet =
          state.lastInitializedDefaultListOfLists.reduce<Set<string>>(
            (s, l) => s.add(l),
            new Set()
          );
        const newListOfListsSet = DEFAULT_LIST_OF_LISTS.reduce<Set<string>>(
          (s, l) => s.add(l),
          new Set()
        );
        console.log("code found 5");
        DEFAULT_LIST_OF_LISTS.forEach((listUrl) => {
          if (!lastInitializedSet.has(listUrl)) {
            state.byUrl[listUrl] = NEW_LIST_STATE;
          }
        });

        state.lastInitializedDefaultListOfLists.forEach((listUrl) => {
          if (!newListOfListsSet.has(listUrl)) {
            delete state.byUrl[listUrl];
          }
        });
      }

      state.lastInitializedDefaultListOfLists = DEFAULT_LIST_OF_LISTS;
      console.log("code found 6");
      // if no active lists, activate defaults
      if (!state.activeListUrls) {
        state.activeListUrls = DEFAULT_ACTIVE_LIST_URLS;

        // for each list on default list, initialize if needed
        DEFAULT_ACTIVE_LIST_URLS.map((listUrl: string) => {
          if (!state.byUrl[listUrl]) {
            state.byUrl[listUrl] = NEW_LIST_STATE;
          }
          return true;
        });
      }
      console.log("code found 7");
    })
);

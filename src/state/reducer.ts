import { combineReducers } from '@reduxjs/toolkit'

import application from './application/reducer'
import transactions from './transactions/reducer';
import multicall from './multicall/reducer'
import lists from './lists/reducer';
import user from './user/reducer';
import web3Context from './global/web3ContextSlice'
import valInfoCon from './user/reducer';


const reducer = combineReducers({
  application,
  transactions,
  web3Context,
  multicall,
  lists,
  user,
  valInfoCon
})

export default reducer

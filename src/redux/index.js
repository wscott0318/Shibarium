import { combineReducers } from 'redux';
import users from './reducer/user';
import transaction from "./reducer/allTransactions";

const rootReducer = combineReducers({
  users: users,
  transaction: transaction
});

export default rootReducer;
import { combineReducers } from 'redux';
import users from './reducer/user';

const rootReducer = combineReducers({
  users: users,
});

export default rootReducer;
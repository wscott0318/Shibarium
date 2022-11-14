import * as type from '../types';

function getUsers() {
    return {
      type: type.GET_USERS_REQUESTED,
    }
  }
  
export default getUsers;
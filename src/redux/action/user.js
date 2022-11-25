import * as type from '../types';

function getUsers() {
    return {
      type: type.GET_USERS_REQUESTED,
      valId:type.GET_USERS_VALID
    }
  }
  
export default getUsers;
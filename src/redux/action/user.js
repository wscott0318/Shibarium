import * as type from '../types';

function getUsers() {
    return {
      type: type.GET_USERS_REQUESTED,
      valId: type.GET_USERS_VALID,
      epochDyna: type.GET_EPOCH_DYNASTY,
    };
  }
  
export default getUsers;
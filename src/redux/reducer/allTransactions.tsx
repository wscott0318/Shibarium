import * as type from '../types'
const initialState = {
    transactionHash: '',
    status:'',
    heading:'',
    loading: false,
    error: null,
  }
  
  export default function allTransaction(state = initialState, action :any) {
    switch (action.type) {
      case type.GET_TRANSACTION_HASH:
        return {
          ...state,
          loading: true,
          status:action.status,
          heading:action.heading,
          transactionHash: action.hash,
        }
      case type.GET_TRANSACTION_HASH_SUCCESS:
        return {
          ...state,
          loading: false,
          status:action.status,
          heading:action.heading,
          transactionHash: action.hash,
        }
      case type.GET_TRANSACTION_HASH_FAIL:
        return {
          ...state,
          loading: false,
          error: action.message,
        }
      default:
        return state
    }
  }
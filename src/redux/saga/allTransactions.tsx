import { call, put, takeEvery } from 'redux-saga/effects'

const apiUrl = `http://localhost:5020/validator/list`;
function getApi() {
  return fetch(apiUrl, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',

      }
  }).then(response => response.json())
    .catch((error) => {throw error})
}

function* fetchTransaction(action :any) : any {
   try {
      const users = yield call(getApi);
      yield put({type: 'GET_USERS_SUCCESS', users: users});
   } catch (e : any) {
      yield put({type: 'GET_USERS_FAILED', message: e.message});
   }
}

function* transactionSaga() {
   yield takeEvery('GET_USERS_REQUESTED', fetchTransaction);
}

export default transactionSaga;

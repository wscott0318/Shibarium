import { call, put, takeEvery } from 'redux-saga/effects'
import * as Sentry from "@sentry/nextjs"
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

function* fetchUsers(action) {
   try {
      const users = yield call(getApi);
      yield put({type: 'GET_USERS_SUCCESS', users: users});
      // yield put({type: 'GET_USERS_VALID', valid: users.valid});
   } catch (e) {
      Sentry.captureException("fetchUsers ", e);
      yield put({type: 'GET_USERS_FAILED', message: e.message});
   }
}

function* userSaga() {
   yield takeEvery('GET_USERS_REQUESTED', fetchUsers);
}

export default userSaga;

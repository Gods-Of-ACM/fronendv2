import { call, takeLatest, takeEvery, put } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { basicSearch as basicSearchSaga } from 'containers/SearchPage/saga';
import { basicSearch as basicSearchAction } from 'containers/SearchPage/actions';
import { API_URL } from 'containers/App/constants';
import request from 'utils/request';
import { LOG_IN, REGISTER } from './constants';
import { loginSuccess } from './actions';

export function* search(action) {
  if (action.payload.pathname === '/search') {
    let query = action.payload.search;
    if (query.length > 3) {
      query = query.slice(3);
      yield call(basicSearchSaga, basicSearchAction(query));
    }
  }
}

export function* login(action) {
  const requestUrl = `${API_URL}/auth/login`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: action.username,
      password: action.pwd,
    }),
  };

  try {
    const data = yield call(request, requestUrl, options);
    console.log(data);
    if (data.success) {
      yield put(loginSuccess(data.payload.token, 'admin'));
      yield put(push('/'));
    } else {
      throw new Error(data.err);
    }
  } catch (err) {
    window.alert(err);
  }
}

export function* register(action) {
  const requestUrl = `${API_URL}/auth/register`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: action.username,
      password: action.password,
      first_name: action.firstName,
      last_name: action.lastName,
    }),
  };

  try {
    const data = yield call(request, requestUrl, options);
    if (data.success) {
      window.alert('You may now login');
    } else {
      throw new Error(data.err);
    }
  } catch (err) {
    window.alert(err);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOCATION_CHANGE, search);
  yield takeEvery(LOG_IN, login);
  yield takeEvery(REGISTER, register);
}

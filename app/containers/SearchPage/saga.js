import { call, takeLatest, put } from 'redux-saga/effects';
import { API_URL } from 'containers/App/constants';
import request from 'utils/request';

import { BASIC_SEARCH, ADVANCED_SEARCH } from './constants';
import { searchResults, errorSearch } from './actions';

export function* basicSearch(action) {
  const requestUrl = `${API_URL}/search/basic?q=${action.query}`;
  const options = {
    method: 'GET',
  };

  try {
    const data = yield call(request, requestUrl, options);
    if (data.success) {
      yield put(searchResults(data.payload, 'basic', action.query));
    } else {
      throw new Error(data.err);
    }
  } catch (err) {
    yield put(errorSearch(err));
  }
}

export function* advancedSearch(action) {
  const requestUrl = `${API_URL}/search/advanced${action.query}`;
  const options = {
    method: 'GET',
  };

  try {
    const data = yield call(request, requestUrl, options);
    if (data.success) {
      yield put(searchResults(data.payload, action.model, action.query));
    } else {
      throw new Error(data.err);
    }
  } catch (err) {
    yield put(errorSearch(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(BASIC_SEARCH, basicSearch);
  yield takeLatest(ADVANCED_SEARCH, advancedSearch);
}

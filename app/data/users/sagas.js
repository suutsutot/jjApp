import { takeEvery, call, put } from 'redux-saga/effects';

import types from '../../constants/actionTypes';
import { followUser } from '../../api/usersApi';
import actions from '../actions';

function* followRequest(action) {
  const { id } = action.payload;

  const response = yield call(followUser, id);
  const { error } = response;
  if (error) return;

  yield put(actions.notifications.fetchList());
}

export default function*() {
  yield takeEvery(types.USERS.FOLLOW_USER_REQUEST, followRequest);
}

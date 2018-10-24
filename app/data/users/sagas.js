import { takeEvery, call, put } from 'redux-saga/effects';

import types from '../../constants/actionTypes';
import { followUser } from '../../api/usersApi';
import actions from '../actions';
import * as Snackbar from '../../framework/snackbar';

function* followRequest(action) {
  const { id } = action.payload;

  const response = yield call(followUser, id);
  const { error } = response;

  if (!error) {
    yield put(actions.notifications.fetchList());
  } else {
    yield call(Snackbar.show, {
      title: 'Please try again',
      duration: Snackbar.LENGTH_LONG,
      action: {
        title: 'Try again'
      }
    });
    yield put(actions.users.followUserRequest(id));
  }
}

export default function*() {
  yield takeEvery(types.USERS.FOLLOW_USER_REQUEST, followRequest);
}

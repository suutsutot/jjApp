import { takeEvery, call, put, all } from 'redux-saga/effects';
import { compose, find, values } from 'ramda';

import types from '../../constants/actionTypes';
import { followUser } from '../../api/usersApi';
import { setNotificationAnswered } from '../../api/notificationsApi';
import actions from '../actions';
import * as Snackbar from '../../framework/snackbar';

const getErrorResponse = compose(
  find(x => x && x.error),
  values
);

function* followRequest(action) {
  const { userId, notificationId } = action.payload;

  const responses = yield all([
    call(followUser, userId, true),
    call(setNotificationAnswered, notificationId)
  ]);

  if (responses) {
    const errorResponse = getErrorResponse(responses);

    if (!errorResponse) {
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
}

export default function*() {
  yield takeEvery(types.USERS.FOLLOW_USER_REQUEST, followRequest);
}

import { takeEvery, call, put, all } from 'redux-saga/effects';
import { compose, find, values } from 'ramda';

import types from 'src/constants/actionTypes';
import { followUser } from 'src/api/usersApi';
import { setNotificationAnswered } from 'src/api/notificationsApi';
import actions from '../actions';
import { showNotificationsSnackbar } from '../shared/snackbar';

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

  console.log('responses', responses);

  if (responses) {
    const errorResponse = getErrorResponse(responses);

    if (!errorResponse) {
      const [response] = responses;
      yield put(actions.users.followUserSuccess(response, notificationId));
      // yield put(actions.notifications.fetchList({ silent: true }));
    } else {
      const { error } = errorResponse;

      yield put(actions.users.followUserError(error, notificationId));
      yield showNotificationsSnackbar();
    }
  }
}

export default function*() {
  yield takeEvery(types.USERS.FOLLOW_USER_REQUEST, followRequest);
}

import { takeEvery, call, select, put } from 'redux-saga/effects';
import { path } from 'ramda';

import types from 'src/constants/actionTypes';
import { joinEvent, rejectEvent } from 'src/api/eventsApi';
import actions from '../actions';
import { showNotificationsSnackbar } from '../shared/snackbar';

function* joinRequest(action) {
  const { id, notificationId } = action.payload;
  const state = yield select(state => state);
  const auth0Id = path(['user', 'profile', 'auth0Id'], state);

  const response = yield call(joinEvent, id, auth0Id);
  const { error } = response;

  if (!error) {
    yield put(actions.events.joinEventSuccess(response, notificationId));
    // yield put(actions.notifications.fetchList({ silent: true }));
  } else {
    yield put(actions.events.joinEventError(error, notificationId));
    yield showNotificationsSnackbar();
  }
}

function* rejectRequest(action) {
  const { id, notificationId } = action.payload;

  const response = yield call(rejectEvent, id);
  const { error } = response;

  if (!error) {
    yield put(actions.events.rejectEventSuccess(response, notificationId));
    yield put(actions.notifications.fetchList({ silent: true }));
  } else {
    yield put(actions.events.rejectEventError(error, notificationId));
    yield showNotificationsSnackbar();
  }
}

export default function*() {
  yield takeEvery(types.EVENTS.JOIN_EVENT_REQUEST, joinRequest);
  yield takeEvery(types.EVENTS.REJECT_EVENT_REQUEST, rejectRequest);
}

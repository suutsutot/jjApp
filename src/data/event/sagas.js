import { takeLatest, call, select, put } from 'redux-saga/effects';
import { path } from 'ramda';

import types from '../../constants/actionTypes';
import { joinEvent, rejectEvent } from '../../api/eventsApi';
import actions from '../actions';
import * as Snackbar from '../../framework/snackbar';

function* joinRequest(action) {
  const { id } = action.payload;
  const state = yield select(state => state);
  const auth0Id = path(['authorize', 'profile', 'auth0Id'], state);

  const response = yield call(joinEvent, id, auth0Id);
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
    yield put(actions.events.joinEventRequest(id));
  }
}

function* rejectRequest(action) {
  const { id } = action.payload;

  const response = yield call(rejectEvent, id);
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
    yield put(actions.events.rejectEventRequest(id));
  }
}

export default function*() {
  yield takeLatest(types.EVENTS.JOIN_EVENT_REQUEST, joinRequest);
  yield takeLatest(types.EVENTS.REJECT_EVENT_REQUEST, rejectRequest);
}

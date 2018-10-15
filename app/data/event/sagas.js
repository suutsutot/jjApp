import { takeEvery, call, select, put } from 'redux-saga/effects';
import { path } from 'ramda';

import types from '../../constants/actionTypes';
import { joinEvent } from '../../api/eventsApi';
import actions from '../actions';

function* joinRequest(action) {
  const { id } = action.payload;
  const state = yield select(state => state);
  const auth0Id = path(['authorize', 'profile', 'auth0Id'], state);

  yield call(joinEvent, id, auth0Id);
  yield put(actions.notifications.fetchList());
}

export default function*() {
  yield takeEvery(types.EVENTS.JOIN_EVENT_REQUEST, joinRequest);
}

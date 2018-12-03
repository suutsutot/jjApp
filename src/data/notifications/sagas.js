import { filter, isEmpty, indexBy, prop, map } from 'ramda';
import { delay } from 'redux-saga';
import { takeEvery, call, put, select, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import {
  getNotifications,
  postViewedNotification
} from 'src/api/notificationsApi';
import actions from 'src/data/actions';
import types from 'src/constants/actionTypes';
import { getNotViewedNotificationsIds } from './selectors';
import * as Snackbar from '../../framework/snackbar';

function* fetchList() {
  const notifications = yield call(getNotifications);
  const { error } = notifications;

  if (!error) {
    const list = map(x => x._id, notifications);
    const data = indexBy(prop('_id'), notifications);

    yield put(actions.notifications.setList(list, data));

    const navState = yield select(state => state.nav);
    const {
      routes: [StartScreen, { index }]
    } = navState;
    // TODO: make it more explicit
    if (index == 0) {
      yield call(postViewed);
    }
  } else {
    yield put(actions.notifications.fetchListError());
    yield call(Snackbar.show, {
      title: 'Server error on loading list',
      duration: Snackbar.LENGTH_LONG
    });
  }
}

function* navigate(action) {
  const { routeName } = action;

  if (routeName === 'Notifications') {
    yield call(postViewed);
  }
}

export function* postViewed() {
  const state = yield select();
  const newNotificationsIds = getNotViewedNotificationsIds(state);

  if (newNotificationsIds && !isEmpty(newNotificationsIds)) {
    for (let notificationId of newNotificationsIds) {
      yield call(delay, 250);
      yield call(postViewedNotification, notificationId);
    }
    yield call(fetchList);
  }
}

export default function*() {
  yield takeLatest(types.NOTIFICATIONS.FETCH_LIST, fetchList);
  yield takeEvery(NavigationActions.NAVIGATE, navigate);
}

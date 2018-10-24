import { filter, isEmpty, indexBy, prop, map } from 'ramda';
import { delay } from 'redux-saga';
import { takeEvery, call, put, select, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import {
  getNotifications,
  postViewedNotification
} from 'app/api/notificationsApi';
import actions from 'app/data/actions';
import types from 'app/constants/actionTypes';

function* fetchList() {
  const notifications = yield call(getNotifications);

  const list = map(x => x._id, notifications);
  const data = indexBy(prop('_id'), notifications);

  notifications.forEach(notification => console.log(notification.community && notification.community.title));

  yield put(actions.notifications.setList(list, data));

  const navState = yield select(state => state.nav);
  const {
    routes: [AuthLoadingScreen, { index }]
  } = navState;
  // TODO: make it more explicit
  if (index == 0) {
    yield call(postViewed);
  }
}

function* navigate(action) {
  const { routeName } = action;

  if (routeName === 'Notifications') {
    yield call(postViewed);
  }
}

export function* postViewed() {
  const notificationsIds = yield select(state => state.notifications.list);
  const newNotificationsIds = filter(x => !x.viewed, notificationsIds);

  if (newNotificationsIds && !isEmpty(newNotificationsIds)) {
    // for (let notificationId of newNotificationsIds) {
    //   yield call(delay, 100);
    //   yield call(postViewedNotification, notificationId);
    // }
    // yield call(fetchList);
  }
}

export default function*() {
  yield takeLatest(types.NOTIFICATIONS.FETCH_LIST, fetchList);
  yield takeEvery(NavigationActions.NAVIGATE, navigate);
}

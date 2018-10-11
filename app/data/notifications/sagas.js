import { filter, isEmpty, indexBy, prop, map } from 'ramda';
import { takeEvery, call, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import {
  getNotifications,
  postViewedNotification
} from 'app/api/notificationsApi';
import actions from 'app/data/actions';
import types from 'app/constants/actionTypes';

export function* fetchList() {
  const notifications = yield call(getNotifications());

  const list = map(x => x._id, notifications);
  const data = indexBy(prop('_id'), notifications);
  console.log('list', list, data);
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

export function* navigate(action) {
  const { routeName } = action;

  if (routeName === 'Notifications') {
    yield call(postViewed);
  }
}

export function* postViewed() {
  const notifications = yield select(state => state.notifications.list);
  const newNotifications = filter(x => !x.viewed, notifications);

  if (newNotifications && !isEmpty(newNotifications)) {
    for (let notification of newNotifications) {
      yield call(postViewedNotification(notification._id));
    }
    yield call(fetchList);
  }
}

export default function*() {
  yield takeEvery(types.NOTIFICATIONS.FETCH_LIST, fetchList);
  yield takeEvery(NavigationActions.NAVIGATE, navigate);
}

import { takeEvery, call, put } from 'redux-saga/effects';

import { getNotifications } from 'app/api/notificationsApi';
import actions from 'app/data/actions';
import types from 'app/constants/actionTypes';

export function* fetchList() {
  const data = yield call(getNotifications);
  yield put(actions.notification.setList(data));
};

export default function* () {
  yield takeEvery(types.NOTIFICATIONS.FETCH_LIST, fetchList);
};

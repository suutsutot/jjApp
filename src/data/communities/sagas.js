import { takeEvery, call, put } from 'redux-saga/effects';

import types from 'src/constants/actionTypes';
import { joinCommunity, leaveCommunity } from 'src/api/communitiesApi';
import actions from '../actions';
import { showNotificationsSnackbar } from '../shared/snackbar';

function* joinRequest(action) {
  const { id, notificationId } = action.payload;

  const response = yield call(joinCommunity, id);
  const { error } = response;

  if (!error) {
    yield put(
      actions.communities.joinCommunitySuccess(response, notificationId)
    );
    // yield put(actions.notifications.fetchList({ silent: true }));
  } else {
    yield put(actions.communities.joinCommunityError(error, notificationId));
    yield showNotificationsSnackbar();
  }
}

function* leaveRequest(action) {
  const { id, notificationId } = action.payload;

  const response = yield call(leaveCommunity, id);
  const { error } = response;

  if (!error) {
    yield put(
      actions.communities.leaveCommunitySuccess(response, notificationId)
    );
    yield put(actions.notifications.fetchList({ silent: true }));
  } else {
    yield put(actions.communities.leaveCommunityError(error, notificationId));
    yield showNotificationsSnackbar();
  }
}

export default function*() {
  yield takeEvery(types.COMMUNITIES.JOIN_COMMUNITY_REQUEST, joinRequest);
  yield takeEvery(types.COMMUNITIES.LEAVE_COMMUNITY_REQUEST, leaveRequest);
}

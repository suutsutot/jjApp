import { takeEvery, call, put } from 'redux-saga/effects';

import types from '../../constants/actionTypes';
import { joinCommunity, leaveCommunity } from '../../api/communitiesApi';
import actions from '../actions';

function* joinRequest(action) {
  const { id } = action.payload;

  yield call(joinCommunity, id);
  yield put(actions.notifications.fetchList());
}

function* leaveRequest(action) {
  const { id } = action.payload;

  yield call(leaveCommunity, id);
  yield put(actions.notifications.fetchList());
}

export default function*() {
  yield takeEvery(types.COMMUNITIES.JOIN_COMMUNITY_REQUEST, joinRequest);
  yield takeEvery(types.COMMUNITIES.LEAVE_COMMUNITY_REQUEST, leaveRequest);
}

import { takeLatest, call, put } from 'redux-saga/effects';

import * as Snackbar from '../../framework/snackbar';
import types from '../../constants/actionTypes';
import { joinCommunity, leaveCommunity } from '../../api/communitiesApi';
import actions from '../actions';

function* joinRequest(action) {
  const { id } = action.payload;

  const response = yield call(joinCommunity, id);
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
    yield put(actions.communities.joinCommunityRequest(id));
  }
}

function* leaveRequest(action) {
  const { id } = action.payload;

  const response = yield call(leaveCommunity, id);
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
    yield put(actions.communities.leaveCommunityRequest(id));
  }
}

export default function*() {
  yield takeLatest(types.COMMUNITIES.JOIN_COMMUNITY_REQUEST, joinRequest);
  yield takeLatest(types.COMMUNITIES.LEAVE_COMMUNITY_REQUEST, leaveRequest);
}

import { compose, assoc, dissoc, over, lensProp, lensPath, set } from 'ramda';

import types from 'src/constants/actionTypes';

let defaultState = {
  list: [],
  data: {},
  loaded: false,
  pending: false,
  loadingItems: {}
};

const removeLoadingItem = notificationId =>
  compose(over(lensProp('loadingItems'), dissoc(notificationId)));

export let notifications = (state = defaultState, action) => {
  let { payload } = action;
  switch (action.type) {
    case types.NOTIFICATIONS.FETCH_LIST: {
      return assoc('pending', !payload.silent, state);
    }
    case types.NOTIFICATIONS.FETCH_LIST_ERROR: {
      return assoc('pending', false, state);
    }
    case types.NOTIFICATIONS.SET_LIST: {
      return compose(
        assoc('data', payload.data),
        assoc('list', payload.list),
        assoc('loaded', true),
        assoc('pending', false)
      )(state);
    }
    case types.NOTIFICATIONS.UPDATE_NOTIFICATION: {
      return compose(
        assoc('data', payload.data),
        assoc('list', payload.list),
        assoc('loaded', true),
        assoc('pending', false)
      )(state);
    }
    case types.USERS.FOLLOW_USER_REQUEST:
    case types.COMMUNITIES.LEAVE_COMMUNITY_REQUEST:
    case types.COMMUNITIES.JOIN_COMMUNITY_REQUEST:
    case types.EVENTS.REJECT_EVENT_REQUEST:
    case types.EVENTS.JOIN_EVENT_REQUEST: {
      const { notificationId } = payload;
      return compose(
        over(
          lensProp('loadingItems'),
          assoc(notificationId, { id: notificationId, type: action.type })
        )
      )(state);
    }
    case types.USERS.FOLLOW_USER_SUCCESS:
    case types.COMMUNITIES.LEAVE_COMMUNITY_SUCCESS:
    case types.COMMUNITIES.JOIN_COMMUNITY_SUCCESS:
    case types.EVENTS.REJECT_EVENT_SUCCESS:
    case types.EVENTS.JOIN_EVENT_SUCCESS: {
      const { notificationId } = payload;
      return compose(
        set(lensPath(['data', notificationId, 'answered']), true),
        removeLoadingItem(notificationId)
      )(state);
    }
    case types.USERS.FOLLOW_USER_ERROR:
    case types.COMMUNITIES.LEAVE_COMMUNITY_ERROR:
    case types.COMMUNITIES.JOIN_COMMUNITY_ERROR:
    case types.EVENTS.REJECT_EVENT_ERROR:
    case types.EVENTS.JOIN_EVENT_ERROR: {
      const { notificationId } = payload;
      console.log('FOLLOW_USER_ERROR', payload);
      return removeLoadingItem(notificationId)(state);
    }
    default:
      return state;
  }
};

import { mergeRight } from 'ramda';

import types from 'src/constants/actionTypes';

let defaultState = {
  userId: null,
  email: null,
  notificationsInfo: {
    pushNotificationToken: null,
    fcmToken: null
  },
  profile: {}
};

export let user = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.AUTHORIZATION.LOGIN: {
      const { userId, email, profile } = payload;
      return mergeRight(state, { userId, email, profile });
    }
    case types.USER.SET_NOTIFICATIONS_INFO: {
      return mergeRight(state, { notificationsInfo: payload });
    }
    case types.USER.SET_USER_PROFILE: {
      return mergeRight(state, { profile: payload });
    }
    default:
      return state;
  }
};

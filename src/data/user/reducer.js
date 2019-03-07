import { merge } from 'ramda';

import types from 'src/constants/actionTypes';

let defaultState = {
  userId: null,
  email: null,
  profile: {}
};

export let user = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.AUTHORIZATION.LOGIN: {
      const { userId, email, profile } = payload;
      return merge(state, { userId, email, profile });
    }
    case types.USER.SET_USER_PROFILE: {
      return merge(state, { profile: payload });
    }
    default:
      return state;
  }
};

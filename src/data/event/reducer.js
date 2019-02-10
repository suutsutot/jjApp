import { assoc } from 'ramda';

import types from 'src/constants/actionTypes';

let defaultState = {
  userEvents: {
    list: {},
    loaded: false
  },
  recommended: {
    list: {},
    loaded: false
  },
  newEvents: {
    list: {},
    loaded: false
  }
};

export let events = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.EVENTS.ADD_USER_EVENTS_LIST_INFO:
      return assoc('userEvents', { list: payload.info, loaded: true }, state);
    case types.EVENTS.ADD_NEW_EVENTS:
      return assoc('newEvents', { list: payload.info, loaded: true }, state);
    case types.EVENTS.ADD_RECOMMENDED_EVENTS:
      return assoc('recommended', { list: payload.info, loaded: true }, state);
    default:
      return state;
  }
};

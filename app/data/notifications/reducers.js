import { compose, merge, assoc } from 'ramda';

import types from 'app/constants/actionTypes';

let defaultState = {
  list: [],
  data: {},
  loaded: false,
  pending: false
};

export let notifications = (state = defaultState, action) => {
  let { payload } = action;
  switch (action.type) {
    case types.NOTIFICATIONS.FETCH_LIST:
      return assoc('pending', true, state);
    case types.NOTIFICATIONS.SET_LIST:
      return compose(
        // state => merge(state, { data: payload.data }),
        assoc('data', payload.data),
        assoc('list', payload.list),
        assoc('loaded', true),
        assoc('pending', false)
      )(state);
    default:
      return state;
  }
};

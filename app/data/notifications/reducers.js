import types from 'app/constants/actionTypes';

let defaultState = {
  list: undefined,
  loaded: false,
  pending: false,
};

export let notifications = (state = defaultState, action) => {
  let { payload } = action;
  switch (action.type) {
    case types.NOTIFICATIONS.FETCH_LIST:
      return {
        ...state,
        pending: true
      };
    case types.NOTIFICATIONS.SET_LIST:
      return {
        ...state,
        list: payload,
        loaded: true,
        pending: false,
      };
    default:
      return state;
  }
};

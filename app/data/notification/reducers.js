import types from 'app/constants/actionTypes';

let defaultState = {
  list: [],
  loaded: false
};

export let notifyReducer = (state = defaultState, action) => {
  let { payload } = action;
  switch (action.type) {
    case types.NOTIFICATIONS.SET_LIST:
      return {
        ...state,
        list: [...payload],
        loaded: true
      };
    default:
      return state;
  }
};

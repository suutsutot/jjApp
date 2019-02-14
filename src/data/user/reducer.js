import * as types from 'src/constants/actionTypes';

let defaultState = {
  info: {},
  loaded: false,
  profile: {},
  user: {}
};

export let user = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.ADD_PROFILE:
      return {
        ...state,
        profile: payload.info,
        loaded: true
      };
    case types.ADD_USER_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          [payload.uid]: {
            ...payload.info
          }
        },
        loaded: true
      };
    case types.SET_USER_PROFILE:
      return {
        ...state,
        user: payload.user
      }
    default:
      return state;
  }
};

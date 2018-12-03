import * as types from 'src/constants/actionTypes';

let defaultState = {
  email: '',
  userId: '',
  authed: false,
  profile: {},
  wrongCredentials: false,
  errorUserGet: false
};

export let authorize = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        email: payload.email,
        authed: true,
        profile: payload.profile
      };
    case types.GET_USER_ID:
      return {
        ...state,
        userId: payload.userId,
        email: payload.email,
        authed: true
      };
    case types.LOGOUT:
      return defaultState;
    case types.WRONG_CREDENTIALS:
      return {
        ...state,
        wrongCredentials: true
      };
    case types.CURRENT_CREDENTIALS:
      return {
        ...state,
        wrongCredentials: false
      };
    case types.NO_USER_GET:
      return {
        ...state,
        errorUserGet: true
      };
    case types.SUCCESS_USER_GET:
      return {
        ...state,
        errorUserGet: false
      };
    default:
      return state;
  }
};

import * as types from 'src/constants/actionTypes';

let defaultState = {
  loading: false,
  messageOpen: false,
  error: ''
};

export const globalReducer = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.LOGOUT:
      return {
        ...state,
        userId: null,
        email: null
      };
    case types.SHOW_ERROR_MESSAGE_GLOBAL:
      return {
        ...state,
        error: action.payload,
        messageOpen: true
      };
    case types.SHOW_REQUEST_SUCCESS_MESSAGE_GLOBAL:
      return {
        ...state,
        error: 'Your request has processed successfully',
        messageOpen: true
      };
    case types.HIDE_MESSAGE_GLOBAL:
      return {
        ...state,
        error: '',
        messageOpen: false,
        messageColor: ''
      };
    case types.SHOW_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.HIDE_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

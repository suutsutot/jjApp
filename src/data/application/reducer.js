import { merge } from 'ramda';

import types from 'src/constants/actionTypes';

let defaultState = {
  loading: false,
  messageOpen: false,
  error: ''
};

export const applicationReducer = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.APPLICATION.SHOW_ERROR_MESSAGE_GLOBAL:
      return merge(state, {
        error: payload,
        messageOpen: true
      });
    case types.APPLICATION.SHOW_REQUEST_SUCCESS_MESSAGE_GLOBAL:
      return merge(state, {
        error: 'Your request has processed successfully',
        messageOpen: true
      });
    case types.APPLICATION.HIDE_MESSAGE_GLOBAL:
      return merge(state, {
        error: '',
        messageOpen: false,
        messageColor: ''
      });
    case types.APPLICATION.SHOW_LOADING:
      return merge(state, {
        loading: true
      });
    case types.APPLICATION.HIDE_LOADING:
      merge(state, {
        loading: false
      });
    default:
      return state;
  }
};

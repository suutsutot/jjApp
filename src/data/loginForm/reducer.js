import { merge } from 'ramda';
import types from 'src/constants/actionTypes';
import { NavigationActions } from 'react-navigation';

let defaultState = {
  email: '',
  password: ''
};

export const loginForm = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.LOGIN_PAGE.CHANGE_FIELD:
      return merge(state, payload)
    case NavigationActions.NAVIGATE:
      return action.routeName !== 'Login' ? defaultState : state;
    default:
      return state;
  }
};

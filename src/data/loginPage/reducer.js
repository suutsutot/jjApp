import { merge, filter, difference, keys } from 'ramda';
import { trim } from 'lodash';
import { NavigationActions } from 'react-navigation';

import types from 'src/constants/actionTypes';
import { isPasswordValid, isEmailValid } from 'src/data/loginPage/selector';

let defaultState = {
  email: '',
  password: '',
  validation: [],
  loading: false,
  error: ''
};

export const loginPage = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.LOGIN_PAGE.CHANGE_FIELD:
      const statePayload = merge(state, payload);
      const validatedKeys = keys(filter(value => trim(value), statePayload));
      return merge(statePayload, {
        validation: difference(statePayload.validation, validatedKeys)
      });
    case types.LOGIN_PAGE.TOGGLE_LOADING:
      return merge(state, { loading: payload });
    case types.AUTHORIZATION.LOGIN_REQUEST:
      return merge(state, { validation: getValidationErrors(state), error: '' });
    case types.AUTHORIZATION.LOGIN_ERROR:
      return merge(state, { error: payload, loading: false });
    case NavigationActions.NAVIGATE:
      return action.routeName !== 'Login' ? defaultState : state;
    default:
      return state;
  }
};

const getValidationErrors = ({ email, password }) => {
  const errors = [];
  if (!isEmailValid(email)) {
    errors.push('email');
  }
  if (!isPasswordValid(password)) {
    errors.push('password');
  }
  return errors;
};

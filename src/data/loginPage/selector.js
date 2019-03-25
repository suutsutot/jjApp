import { trim } from 'lodash';

export const isEmailValid = email => {
  return trim(email) !== '';
};

export const isPasswordValid = password => {
  return trim(password) !== '';
};

export const isLoginFormValid = (email, password) => {
  return isEmailValid(email) && isPasswordValid(password);
};

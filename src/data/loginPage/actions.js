import types from 'src/constants/actionTypes';

export const changeField = payload => {
  return {
    type: types.LOGIN_PAGE.CHANGE_FIELD,
    payload
  };
};

export const toggleLoading = payload => {
  return {
    type: types.LOGIN_PAGE.TOGGLE_LOADING,
    payload
  };
};

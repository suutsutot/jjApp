import types from 'src/constants/actionTypes';

export const changeField = payload => {
  return {
    type: types.REGISTRATION.CHANGE_FIELD,
    payload
  };
};

export const changeTabIndex = payload => {
  return {
    type: types.REGISTRATION.CHANGE_TAB_INDEX,
    payload
  };
};

import types from 'app/constants/actionTypes';

export const setList = payload => ({
  type: types.NOTIFICATIONS.SET_LIST,
  payload
});

export const fetchList = () => ({
  type: types.NOTIFICATIONS.FETCH_LIST
});

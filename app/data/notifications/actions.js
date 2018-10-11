import types from 'app/constants/actionTypes';

export const setList = (list, data) => ({
  type: types.NOTIFICATIONS.SET_LIST,
  payload: {
    list,
    data
  }
});

export const fetchList = () => ({
  type: types.NOTIFICATIONS.FETCH_LIST
});

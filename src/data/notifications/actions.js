import types from 'src/constants/actionTypes';

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

export const fetchListError = () => ({
  type: types.NOTIFICATIONS.FETCH_LIST_ERROR
});

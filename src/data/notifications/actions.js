import types from 'src/constants/actionTypes';

export const setList = (list, data) => ({
  type: types.NOTIFICATIONS.SET_LIST,
  payload: {
    list,
    data
  }
});

export const fetchList = (payload = { silent: false }) => {
  const { silent } = payload;
  return {
    type: types.NOTIFICATIONS.FETCH_LIST,
    payload: { silent }
  };
};

export const fetchListError = () => ({
  type: types.NOTIFICATIONS.FETCH_LIST_ERROR
});

import types from 'app/constants/actionTypes';

export const followUserRequest = id => {
  return {
    type: types.USERS.FOLLOW_USER_REQUEST,
    payload: { id }
  };
};

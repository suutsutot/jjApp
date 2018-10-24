import types from 'app/constants/actionTypes';

export const followUserRequest = (userId, notificationId) => {
  return {
    type: types.USERS.FOLLOW_USER_REQUEST,
    payload: { userId, notificationId }
  };
};

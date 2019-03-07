import types from 'src/constants/actionTypes';

export const followUserRequest = (userId, notificationId) => {
  return {
    type: types.USERS.FOLLOW_USER_REQUEST,
    payload: { userId, notificationId }
  };
};

export const followUserSuccess = (response, notificationId) => {
  return {
    type: types.USERS.FOLLOW_USER_SUCCESS,
    payload: { response, notificationId }
  };
};

export const followUserError = (error, notificationId) => {
  return {
    type: types.USERS.FOLLOW_USER_ERROR,
    payload: { error, notificationId }
  };
};

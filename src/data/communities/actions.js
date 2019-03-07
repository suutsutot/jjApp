import types from 'src/constants/actionTypes';

export const joinCommunityRequest = (id, notificationId) => {
  return {
    type: types.COMMUNITIES.JOIN_COMMUNITY_REQUEST,
    payload: { id, notificationId }
  };
};

export const joinCommunitySuccess = (response, notificationId) => {
  return {
    type: types.COMMUNITIES.JOIN_COMMUNITY_SUCCESS,
    payload: { response, notificationId }
  };
};

export const joinCommunityError = (error, notificationId) => {
  return {
    type: types.COMMUNITIES.JOIN_COMMUNITY_ERROR,
    payload: { error, notificationId }
  };
};


export const leaveCommunityRequest = (id, notificationId) => {
  return {
    type: types.COMMUNITIES.LEAVE_COMMUNITY_REQUEST,
    payload: { id, notificationId }
  };
};

export const leaveCommunitySuccess = (response, notificationId) => {
  return {
    type: types.COMMUNITIES.LEAVE_COMMUNITY_SUCCESS,
    payload: { response, notificationId }
  };
};

export const leaveCommunityError = (error, notificationId) => {
  return {
    type: types.COMMUNITIES.LEAVE_COMMUNITY_ERROR,
    payload: { error, notificationId }
  };
};

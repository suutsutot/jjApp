import types from 'src/constants/actionTypes';

export const joinCommunityRequest = id => {
  return {
    type: types.COMMUNITIES.JOIN_COMMUNITY_REQUEST,
    payload: { id }
  };
};

export const leaveCommunityRequest = id => {
  return {
    type: types.COMMUNITIES.LEAVE_COMMUNITY_REQUEST,
    payload: { id }
  };
};

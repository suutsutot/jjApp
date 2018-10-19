import config from 'app/config';

import request from './request';

export const joinCommunity = (communityId) =>
  request(`${config.server}/api/communities/${communityId}/join`, {
    method: 'POST'
  });

export const leaveCommunity = (communityId) =>
  request(`${config.server}/api/communities/${communityId}/leave`, {
    method: 'POST'
  });

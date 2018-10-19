import config from 'app/config';

import request from './request';

export const joinCommunity = (communitieId) =>
  request(`${config.server}/api/communities/${communitieId}/join`, {
    method: 'POST'
  });

export const leaveCommunity = (communitieId) =>
  request(`${config.server}/api/communities/${communitieId}/leave`, {
    method: 'POST'
  });

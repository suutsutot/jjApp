import config from 'app/config';

import request from './request';

export const joinEvent = (eventId, auth0Id) =>
  request(`${config.server}/api/events/${eventId}/join`, {
    method: 'POST',
    body: JSON.stringify({ auth0Id })
  });

export const rejectEvent = (eventId) =>
  request(`${config.server}/api/events/${eventId}/leave`, {
    method: 'POST'
  });

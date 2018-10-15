import config from 'app/config';

import request from './request';

export const joinEvent = (id, auth0Id) =>
  request(`${config.server}/api/events/${id}/join`, {
    method: 'POST',
    body: JSON.stringify({ auth0Id })
  });

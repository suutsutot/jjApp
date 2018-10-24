import config from 'app/config';

import request from './request';

export const followUser = (userId, notificationsData = false) =>
  request(`${config.server}/api/users/acceptFollow`, {
    method: 'POST',
    body: JSON.stringify({ userId, notificationsData })
  });

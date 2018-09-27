import config from 'app/config';

import request from './request';

export const getNotifications = () => async () =>
  await request(`${config.server}/api/notifications`, {
    method: 'GET'
  });

export const postViewedNotification = id => async () =>
  await request(`${config.server}/api/notifications/${id}`, {
    method: 'POST'
  });

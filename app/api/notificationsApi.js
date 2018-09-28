import config from 'app/config';

import request from './request';

export const getNotifications = () =>
  request(`${config.server}/api/notifications`, {
    method: 'GET'
  });

export const postViewedNotification = id =>
  request(`${config.server}/api/notifications/${id}`, {
    method: 'POST'
  });

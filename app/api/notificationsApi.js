import config from 'app/config';

import request from './request';

export const getNotifications = () =>
  request(`${config.server}/api/notifications`, {
    method: 'GET'
  });

export const postViewedNotification = notificationId =>
  request(`${config.server}/api/notifications/${notificationId}`, {
    method: 'POST'
  });

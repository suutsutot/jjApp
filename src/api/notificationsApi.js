import config from 'src/config';

import request from './request';

export const getNotifications = () =>
  request(`${config.server}/api/notifications`, {
    method: 'GET'
  });

export const postViewedNotification = notificationId =>
  request(`${config.server}/api/notifications/${notificationId}`, {
    method: 'POST'
  });

export const setNotificationAnswered = notificationId =>
  request(`${config.server}/api/notifications/${notificationId}/answered`, {
    method: 'POST'
  });

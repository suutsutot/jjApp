import { Platform, Alert } from 'react-native';

import config from 'src/config';
import request from './request';

export const setPushNotificationToken = (userId, tokenData) => {
  return request(`${config.server}/api/users/set-push-token`, {
    method: 'POST',
    body: JSON.stringify({
      id: userId,
      tokenData: {
        ...tokenData,
        os: Platform.OS
      }
    })
  });
};

export const getUserData = (userId) => {
  return request(`${config.server}/api/users/profile/${userId}`, {
    method: 'GET'
  })
};

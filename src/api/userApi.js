import { Platform, Alert } from 'react-native';

import config from 'src/config';
import request from './request';

export const setPushNotificationToken = (userId, tokenData) => {
  // Alert.alert(JSON.stringify({
  //   id: userId,
  //   tokenData: {
  //     ...tokenData,
  //     os: Platform.OS
  //   }
  // }, null, 2));
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

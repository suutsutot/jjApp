import React from 'react';
import PushNotification from 'react-native-push-notification';
import { lifecycle } from 'recompose';
import { AsyncStorage } from 'react-native';

import config from 'app/config';

const PushNotificationsController = lifecycle({
  componentDidMount() {
    PushNotification.configure({
      onRegister: (token) => {
        console.log('TOKEN:', token);
        AsyncStorage.setItem('pushNotificationsToken', token);
      },
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification);
      },
      senderID: config.senderID,
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
})(() => null);

export default PushNotificationsController;

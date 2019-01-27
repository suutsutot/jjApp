import React from 'react';
import PushNotification from 'react-native-push-notification';
import { compose } from 'ramda';
import { lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Alert, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import config from 'src/config';
import actions from 'src/data/actions';

const PushNotificationsController = compose(
  connect(
    undefined,
    {
      navigate: NavigationActions.navigate,
      fetchList: actions.notifications.fetchList
    }
  ),
  lifecycle({
    componentDidMount() {
      const { navigate, fetchList } = this.props;

      PushNotification.configure({
        onRegister: ({ token }) => {
          console.log('TOKEN:', token);
          // Alert.alert(token);
          AsyncStorage.setItem('pushNotificationToken', token);
        },
        onNotification: notification => {
          console.log('NOTIFICATION:', notification);
          // Alert.alert(notification.message);
          const { foreground } = notification;
          fetchList();
          if (!foreground) {
            navigate({ routeName: 'Notifications' });
          }
        },
        senderID: config.senderID,
        popInitialNotification: true,
        requestPermissions: true
      });
    }
  })
)(() => null);

export default PushNotificationsController;

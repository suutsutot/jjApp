import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import { AsyncStorage, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';

import config from 'src/config';
import actions from 'src/data/actions';
import { setPushNotificationToken } from '../api/userApi';

class PushNotificationsController extends Component {
  componentDidMount() {
    const { navigate, fetchList } = this.props;

    this.setFCMTokenIOS(this.props.fcmToken);

    PushNotification.configure({
      onRegister: async ({ token, os }) => {
        console.log('TOKEN:', token);
        console.log('OS:', os);

        AsyncStorage.setItem('pushNotificationToken', token);

        const userId = await AsyncStorage.getItem('userId');
        userId && setPushNotificationToken(
          userId,
          Platform.select({
            ios: { apnsToken: token },
            android: { fcmToken: token }
          })
        );
      },
      onNotification: notification => {
        console.log('NOTIFICATION:', notification);

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

  async componentDidUpdate(prevProps) {
    if (prevProps.fcmToken !== this.props.fcmToken) {
      this.setFCMTokenIOS(this.props.fcmToken);
    }
  }

  async setFCMTokenIOS(fcmToken) {
    if (Platform.OS !== 'ios' || !fcmToken) return;

    AsyncStorage.setItem('fcmToken', this.props.fcmToken);

    const userId = await AsyncStorage.getItem('userId');
    userId && setPushNotificationToken(userId, { fcmToken });
  }

  render() {
    return null;
  }
}

export default connect(
  undefined,
  {
    navigate: NavigationActions.navigate,
    fetchList: actions.notifications.fetchList
  }
)(PushNotificationsController);

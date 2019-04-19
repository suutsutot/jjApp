import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';

import store from 'src/store';
import config from 'src/config';
import actions from 'src/data/actions';
import { setPushNotificationToken } from '../api/userApi';
import { isUserLoggedIn } from 'src/data/user/selector';

class PushNotificationsController extends Component {
  componentDidMount() {
    const { fcmToken, navigate, fetchList, setNotificationsInfo } = this.props;

    this.setFCMTokenIOS(fcmToken);

    PushNotification.configure({
      onRegister: ({ token, os }) => {
        console.log('TOKEN:', token);
        console.log('OS:', os);

        setNotificationsInfo({ pushNotificationToken: token });

        const { userId } = store.getState().user;

        userId &&
          setPushNotificationToken(
            userId,
            Platform.select({
              ios: { apnsToken: token },
              android: { fcmToken: token }
            })
          );
      },
      onNotification: notification => {
        console.log('NOTIFICATION:', notification);

        const isLoggedIn = isUserLoggedIn(store.getState());

        const { foreground } = notification;
        fetchList({ silent: foreground });
        if (isLoggedIn && !foreground) {
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

    const { setNotificationsInfo } = this.props;

    setNotificationsInfo({ fcmToken });
    const { userId } = store.getState().user;

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
    fetchList: actions.notifications.fetchList,
    setNotificationsInfo: actions.user.setNotificationsInfo
  }
)(PushNotificationsController);

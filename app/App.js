import React from 'react';
import {Provider} from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'

import store, { persistor } from 'app/store/index';
import withStore from 'app/hocs/withStore';
import SocketController from 'app/components/SocketController';
import PushNotificationsController from 'app/components/PushNotificationsController';
import AppStateController from 'app/components/AppStateController';
import Router from 'app/components/Router';
import * as authorizationActions from 'app/data/authorization/authorizationActions';

const Application = () => (
  <PersistGate loading={null} persistor={persistor}>
    <Router />

    <SocketController />
    <PushNotificationsController />
    <AppStateController />
  </PersistGate>
);

export default compose(
  withStore(store, Provider),
  connect(
    undefined,
    { getUserId: authorizationActions.getUserId }
  ),
  lifecycle({
    componentDidMount() {
      const {getUserId} = this.props;
      AsyncStorage.multiGet(['userId', 'email'], (err, stores) => {
        const [[, userId], [, email]] = stores;
        getUserId(userId, email);
      });
    }
  })
)(Application);

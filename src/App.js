import React from 'react';
import { Provider } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { YellowBox } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { path } from 'ramda';
import moment from 'moment';

import store, { persistor } from 'src/store/index';
import withStore from 'src/hocs/withStore';
import StartScreen from 'src/pureComponents/StartScreen';
import PushNotificationsController from 'src/components/PushNotificationsController';
import AppStateController from 'src/components/AppStateController';
import Router from 'src/components/Router';

import 'moment/locale/ru';
import 'moment/locale/nb';

YellowBox.ignoreWarnings(['Setting a timer']);

const Application = ({ fcmToken }) => (
  <PersistGate loading={<StartScreen />} persistor={persistor}>
    <Router />

    <PushNotificationsController fcmToken={fcmToken} />
    <AppStateController />
  </PersistGate>
);

export default compose(
  withStore(store, Provider),
  connect(
    state => ({
      locale: path(['user', 'profile', 'language'], state)
    })
  ),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { locale } = this.props;
      if (prevProps.locale !== locale) {
        moment.locale(locale);
      }
    }
  })
)(Application);

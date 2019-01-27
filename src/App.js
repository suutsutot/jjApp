import React from 'react';
import { Provider } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { AsyncStorage, YellowBox } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { path } from 'ramda';
import moment from 'moment';

import store, { persistor } from 'src/store/index';
import withStore from 'src/hocs/withStore';
import PushNotificationsController from 'src/components/PushNotificationsController';
import AppStateController from 'src/components/AppStateController';
import Router from 'src/components/Router';
import actions from 'src/data/actions';

import 'moment/locale/ru';
import 'moment/locale/nb';

YellowBox.ignoreWarnings(['Setting a timer']);

const Application = () => (
  <PersistGate loading={null} persistor={persistor}>
    <Router />

    <PushNotificationsController />
    <AppStateController />
  </PersistGate>
);

export default compose(
  withStore(store, Provider),
  connect(
    state => ({
      locale: path(['authorize', 'profile', 'language'], state)
    }),
    { getUserId: actions.authorization.getUserId }
  ),
  lifecycle({
    componentDidMount() {
      const { getUserId } = this.props;
      AsyncStorage.multiGet(['userId', 'email'], (err, stores) => {
        const [[, userId], [, email]] = stores;
        getUserId(userId, email);
      });
    },
    componentDidUpdate(prevProps) {
      const { locale } = this.props;
      if (prevProps.locale !== locale) {
        moment.locale(locale);
      }
    }
  })
)(Application);

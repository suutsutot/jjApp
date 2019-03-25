import React from 'react';
import { compose } from 'ramda';
import { lifecycle, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { AppState } from 'react-native';

import actions from 'src/data/actions';
import { isUserLoggedIn } from '../data/user/selector';

const AppStateController = compose(
  connect(
    state => ({
      loggedIn: isUserLoggedIn(state)
    }),
    {
      fetchList: actions.notifications.fetchList
    }
  ),
  withState('appState', 'setAppState', 'active'),
  withHandlers({
    handleAppStateChange: ({
      loggedIn,
      fetchList,
      appState,
      setAppState
    }) => nextAppState => {
      if (
        loggedIn &&
        appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        fetchList();
      }
      setAppState(nextAppState);
    }
  }),
  lifecycle({
    componentDidMount() {
      AppState.addEventListener('change', this.props.handleAppStateChange);
    },
    componentWillUnmount() {
      AppState.removeEventListener('change', this.props.handleAppStateChange);
    }
  })
)(() => null);

export default AppStateController;

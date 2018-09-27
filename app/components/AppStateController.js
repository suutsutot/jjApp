import React from 'react';
import { compose } from 'ramda';
import { lifecycle, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { AppState } from 'react-native';

import actions from 'app/data/actions';

const AppStateController = compose(
  connect(
    undefined,
    {
      fetchList: actions.notifications.fetchList
    }
  ),
  withState('appState', 'setAppState', 'active'),
  withHandlers({
    handleAppStateChange: ({
      fetchList,
      appState,
      setAppState
    }) => nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
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

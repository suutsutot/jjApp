import React from 'react';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import StartScreen from 'src/pureComponents/StartScreen';
import { isUserLoggedIn } from 'src/data/user/selector';

export default compose(
  connect(state => ({
    loggedIn: isUserLoggedIn(state)
  })),
  lifecycle({
    componentDidMount() {
      const { loggedIn } = this.props;
      setTimeout(
        () =>
          this.props.navigation.navigate(loggedIn ? 'Notifications' : 'Login'),
        1000 // for animation
      );
    }
  })
)(StartScreen);

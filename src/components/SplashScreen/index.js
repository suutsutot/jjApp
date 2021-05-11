import React from 'react';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import SplashScreen from 'src/pureComponents/SplashScreen';
import { isUserLoggedIn } from 'src/data/user/selector';

export default compose(
  connect(state => ({
    email: state.user.email,
    loggedIn: isUserLoggedIn(state)
  })),
  lifecycle({
    componentDidMount() {
      const { email, loggedIn } = this.props;
      console.log('EMAIL', email);
      setTimeout(
        () =>
          this.props.navigation.navigate(loggedIn ? 'Notifications' : 'StartScreen'),
        1000 // for animation
      );
    }
  })
)(SplashScreen);

import React, { Component } from 'react';

import { AndroidBackHandler } from 'react-navigation-backhandler';

export default handler => WrappedComponent =>
  class extends Component {
    onBackButtonPressAndroid = () => {
      if (handler) {
        handler(this.props);
        return true;
      } else {
        return false;
      }
    };

    render() {
      return (
        <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
          <WrappedComponent {...this.props} />
        </AndroidBackHandler>
      );
    }
  };

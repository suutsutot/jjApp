import React, { Component } from 'react';
import { View, Image } from 'react-native';

import styles from './styles';

class StartScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./logo.png')}
        />
      </View>
    );
  }
}

export default StartScreen;

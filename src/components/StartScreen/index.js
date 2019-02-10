import React, { Component } from 'react';
import { View, AsyncStorage, Image } from 'react-native';
import styles from './styles';

class StartScreen extends Component {
  constructor() {
    super();
    this.redirect();
  }

  redirect = async () => {
    const userId = await AsyncStorage.getItem('userId');
    this.props.navigation.navigate(userId ? 'Notifications' : 'Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri:
              'https://s3-eu-west-1.amazonaws.com/jj-files/logo/safari_180.png'
          }}
        />
      </View>
    );
  }
}

export default StartScreen;

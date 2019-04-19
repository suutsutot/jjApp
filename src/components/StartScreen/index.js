import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import * as R from 'ramda';

import { Button } from 'src/pureComponents/Button';
import i18n from 'src/framework/i18n';

import styles from './styles';
import { getPhoneJJLocale } from '../../framework/i18n/getPhoneLocale';

class StartScreen extends Component {
  phoneLocale = getPhoneJJLocale();

  i18n = key => i18n(key, 'general', this.phoneLocale);

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.logo}
            source={require('src/assets/textLogo.png')}
          />
        </View>
        <View style={styles.section}>
          <Button
            onPress={() => navigation.navigate('Registration')}
            buttonStyle={styles.button}
          >
            {R.toUpper(this.i18n('sign_up_button'))}
          </Button>
        </View>
        <View style={StyleSheet.flatten([styles.section, styles.lastSection])}>
          <Text style={styles.loginTipText}>{this.i18n('log_in_tip')}</Text>
          <Button
            onPress={() => navigation.navigate('Login')}
            type="secondary"
            buttonStyle={styles.button}
          >
            {R.toUpper(this.i18n('log_in_button'))}
          </Button>
        </View>
      </View>
    );
  }
}

export default StartScreen;

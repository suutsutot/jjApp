import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import * as R from 'ramda';

import { Button } from 'src/pureComponents/Button';
import withPhoneTranslations from 'src/hocs/withPhoneTranslations';

import styles from './styles';

const StartScreen = ({ navigation, i18n }) => {
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
          {R.toUpper(i18n('sign_up_button'))}
        </Button>
      </View>
      <View style={StyleSheet.flatten([styles.section, styles.lastSection])}>
        <Text style={styles.loginTipText}>{i18n('log_in_tip')}</Text>
        <Button
          onPress={() => navigation.navigate('Login')}
          type="secondary"
          buttonStyle={styles.button}
        >
          {R.toUpper(i18n('log_in_button'))}
        </Button>
      </View>
    </View>
  );
};

export default withPhoneTranslations(StartScreen);

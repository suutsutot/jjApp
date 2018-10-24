import React from 'react';
import { Platform } from 'react-native';
import { Header } from 'react-native-elements';

import styles from './styles';

export const HeaderSection = ({ title }) => (
  <Header
    backgroundColor="#00bcd4"
    outerContainerStyles={{
      borderBottomWidth: 0,
      height: Platform.OS === 'ios' ? 70 : 70 - 24
    }}
    centerComponent={{ text: title || 'JustJoin', style: styles.header }}
  />
);

import React from 'react';
import { Header } from 'react-native-elements';

import styles from './styles';

export const HeaderSection = ({ leftComponent, title, rightComponent }) => (
  <Header
    backgroundColor="#00bcd4"
    containerStyle={styles.containerStyle}
    leftComponent={leftComponent}
    rightComponent={rightComponent}
    centerComponent={{ text: title || 'JustJoin', style: styles.header }}
  />
);

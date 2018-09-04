import React from 'react';
import {Header} from 'react-native-elements';

import styles from './styles';

export const HeaderSection =  ({ title }) => (
  <Header backgroundColor='#00bcd4'
          outerContainerStyles={{borderBottomWidth: 0}}
          centerComponent={{text: title || 'JustJoin', style: styles.header}} />
);

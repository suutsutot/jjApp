import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

export const ArrowBackIcon = ({ onPress }) => (
  <MaterialIcons
    name="arrow-back"
    onPress={onPress}
    style={styles.materialIconBackStyle}
  />
);

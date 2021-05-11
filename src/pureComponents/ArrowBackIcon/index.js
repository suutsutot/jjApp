import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

export const ArrowBackIcon = ({ onPress, color = "#fff" }) => (
  <MaterialIcons
    name="arrow-back"
    color={color}
    onPress={onPress}
    style={styles.materialIconBackStyle}
  />
);

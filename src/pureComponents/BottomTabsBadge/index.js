import { Text, View } from 'react-native';
import React from 'react';

import styles from './styles';

const BottomTabsBadge = ({ number }) => (
  <View style={styles.badgeView}>
    <Text style={styles.badgeText}>{number}</Text>
  </View>
);

export default BottomTabsBadge;

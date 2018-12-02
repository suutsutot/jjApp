import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles, { getSpecificStyles } from './styles';

export const Button = ({
  onPress,
  children,
  textStyle,
  buttonStyle,
  type = 'primary'
}) => {
  const specificStyles = getSpecificStyles(type);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonView, specificStyles.buttonView, buttonStyle]}
    >
      <Text style={[styles.buttonText, specificStyles.buttonText, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

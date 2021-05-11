import React from 'react';
import { Button } from 'react-native-elements';
import { Image, View } from 'react-native';

import styles from './styles';

const SocialButton = ({ source, title, buttonStyle, onPress }) => {
  return (
    <Button
      icon={
        <View style={styles.icon_aria}>
          <Image style={{ width: 24, height: 24 }} source={source} />
        </View>
      }
      title={title}
      titleStyle={{ flex: 1 }}
      buttonStyle={[styles.social_button, { marginBottom: 24 }, buttonStyle]}
      onPress={onPress}
    />
  );
};

export default SocialButton;

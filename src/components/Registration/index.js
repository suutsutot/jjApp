import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';

import { HeaderSection } from 'src/pureComponents/HeaderSection';
import RegistrationTabView from 'src/components/Registration/RegistrationTabView';

const uri = 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/New_Logo.png';

class Registration extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderSection
          leftComponent={
            <Image
              style={styles.logo}
              source={{ uri }}
            />
          }
          title={' '}
        />
        <RegistrationTabView />
      </View>
    );
  }
}

export default Registration;

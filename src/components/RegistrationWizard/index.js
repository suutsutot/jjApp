import React from 'react';
import { View, Image } from 'react-native';

import { ArrowBackIcon } from 'src/pureComponents/ArrowBackIcon';
import { HeaderSection } from 'src/pureComponents/HeaderSection';
import RegistrationTabView from 'src/components/RegistrationWizard/RegistrationTabView';

import styles from './styles';

const uri = 'https://s3-eu-west-1.amazonaws.com/jj-files/logo/New_Logo.png';

class Registration extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.view}>
        <HeaderSection
          leftComponent={<ArrowBackIcon onPress={() => navigation.goBack()} />}
          rightComponent={<Image style={styles.logo} source={{ uri }} />}
        />
        <RegistrationTabView />
      </View>
    );
  }
}

export default Registration;

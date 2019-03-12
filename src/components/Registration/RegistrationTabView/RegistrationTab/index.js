import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

import actions from 'src/data/actions';
import i18n from 'src/framework/i18n';
import LoadingButton from 'src/pureComponents/Button/LoadingButton';

import styles from './styles';

class RegistrationTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { registrationForm, changeTabIndex, changeField } = this.props;
    return (
      <View style={styles.view}>
        <View style={styles.mainContainer}>
          <View style={styles.generalInformationView}>
            <Text style={styles.generalInformationText}>
              {i18n('email_password_title')}
            </Text>
          </View>
          <TextField
            label={i18n('email_label')}
            tintColor="#00bcd4"
            onChangeText={value => changeField({ email: value })}
            value={registrationForm.email}
            labelHeight={15}
          />
          <TextField
            label={i18n('password_label')}
            tintColor="#00bcd4"
            onChangeText={value => changeField({ password: value })}
            value={registrationForm.password}
            labelHeight={15}
          />
          <TextField
            label={i18n('confirm_password')}
            tintColor="#00bcd4"
            onChangeText={value =>
              changeField({ confirmPassword: value })
            }
            value={registrationForm.confirmPassword}
            labelHeight={15}
          />
          <Text>{JSON.stringify(this.props, null, 2)}</Text>
          <View style={styles.nextButton}>
            <LoadingButton title="NEXT" onPress={() => changeTabIndex(1)} />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  ({ registration }) => {
    const { registrationForm } = registration;
    return { registrationForm };
  },
  dispatch => {
    return {
      changeField: payload =>
        dispatch(actions.registration.changeField('registrationForm', payload)),
      changeTabIndex: payload =>
        dispatch(actions.registration.changeTabIndex(payload))
    };
  }
)(RegistrationTab);

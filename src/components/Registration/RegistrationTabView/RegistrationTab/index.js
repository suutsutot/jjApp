import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

import actions from 'src/data/actions';
import i18n from 'src/framework/i18n';
import LoadingButton from 'src/pureComponents/Button/LoadingButton';
import { isFieldNotValid } from '../../../../data/registration/selector';

import styles from './styles';

class RegistrationTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      registrationForm: { email, password, confirmPassword },
      changeTabIndex,
      changeField,
      registrationValidation,
      validateField
    } = this.props;
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
            value={email}
            labelHeight={15}
            onBlur={() => validateField(['email'])}
            error={
              registrationValidation.indexOf('email') !== -1 &&
              isFieldNotValid(email)
                ? i18n('email_required')
                : null
            }
          />
          <TextField
            label={i18n('password_label')}
            tintColor="#00bcd4"
            onChangeText={value => changeField({ password: value })}
            value={password}
            labelHeight={15}
            onBlur={() => validateField(['password'])}
            error={
              registrationValidation.indexOf('password') !== -1 &&
              isFieldNotValid(password)
                ? i18n('password_required')
                : null
            }
          />
          <TextField
            label={i18n('confirm_password')}
            tintColor="#00bcd4"
            onChangeText={value => changeField({ confirmPassword: value })}
            value={confirmPassword}
            labelHeight={15}
            onBlur={() => validateField(['confirmPassword'])}
            error={
              registrationValidation.indexOf('confirmPassword') !== -1 &&
              isFieldNotValid(confirmPassword)
                ? i18n('confirm_password_required')
                : null
            }
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
    const { registrationForm, registrationValidation } = registration;
    return { registrationForm, registrationValidation };
  },
  dispatch => {
    return {
      changeField: payload =>
        dispatch(actions.registration.changeField('registrationForm', payload)),
      validateField: payload =>
        dispatch(
          actions.registration.validateField('registrationValidation', payload)
        ),
      changeTabIndex: payload =>
        dispatch(actions.registration.changeTabIndex(payload))
    };
  }
)(RegistrationTab);

// validation for registration +
// validation for personalData +
// request
// fetch activities
// send request password email
// fetch user data and use for request activities

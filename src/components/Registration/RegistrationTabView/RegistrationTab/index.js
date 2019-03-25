import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

import actions from 'src/data/actions';
import i18n from 'src/framework/i18n';
import LoadingButton from 'src/pureComponents/Button/LoadingButton';
import { isFieldNotValid } from 'src/data/registration/selector';

import styles from './styles';

class RegistrationTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      registrationForm: { email, password, confirmPassword },
      signUp,
      changeField,
      registrationValidation,
      validateField
    } = this.props;
    return (
      <View style={styles.view}>
        <ScrollView>
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
            <View style={styles.nextButton}>
              <LoadingButton
                title="NEXT"
                onPress={() => signUp(email, password)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  ({ registration }) => {
    const { registrationForm, registrationValidation, userInfo, data } = registration;
    return { registrationForm, registrationValidation, userInfo, data };
  },
  dispatch => {
    return {
      signUp: (email, password) =>
        dispatch(actions.registration.signUp(email, password)),
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
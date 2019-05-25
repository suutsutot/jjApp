import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import * as R from 'ramda';

import actions from 'src/data/actions';
import LoadingButton from 'src/pureComponents/Button/LoadingButton';
import { externalLoginTypes } from 'src/data/authorization/constants';
import withBackHandler from 'src/hocs/withBackHandler';
import { ArrowBackIcon } from 'src/pureComponents/ArrowBackIcon';
import SocialButton from 'src/pureComponents/SocialButton';
import withPhoneTranslations from 'src/hocs/withPhoneTranslations';

import styles from './styles';

class Login extends Component {
  renderSocialButtons() {
    const { externalLogin, i18n } = this.props;

    return (
      <View>
        <SocialButton
          source={require('src/assets/google-icon.png')}
          title={i18n('google_log_in')}
          buttonStyle={{ backgroundColor: '#dc4e41' }}
          onPress={() => externalLogin(externalLoginTypes.google)}
        />

        <SocialButton
          source={require('src/assets/facebook-icon.png')}
          title={i18n('facebook_log_in')}
          buttonStyle={{ backgroundColor: '#5e81a8' }}
          onPress={() => externalLogin(externalLoginTypes.facebook)}
        />
      </View>
    );
  }

  renderInputs() {
    const {
      email,
      password,
      error,
      validation,
      changeField,
      i18n
    } = this.props;

    return (
      <View>
        <TextField
          label={i18n('email_label')}
          tintColor="#00bcd4"
          keyboardType="email-address"
          onChangeText={value => changeField({ email: value })}
          value={email}
          error={
            validation.indexOf('email') !== -1 ? i18n('email_required') : null
          }
          autoCapitalize="none"
          labelHeight={15}
        />
        <TextField
          label={i18n('password_label')}
          tintColor="#00bcd4"
          onChangeText={value => changeField({ password: value })}
          value={password}
          error={
            validation.indexOf('password') !== -1
              ? i18n('password_required')
              : null
          }
          autoCapitalize="none"
          secureTextEntry
          labelHeight={15}
        />
        <View style={styles.errorView}>
          {error === 'connection' ? (
            <Text style={styles.errorText}>
              {i18n('login_page_connection_problems_warning')}
            </Text>
          ) : null}
          {error === 'credentials' ? (
            <Text style={styles.errorText}>
              {i18n('login_page_wrong_credentials_warning')}
            </Text>
          ) : null}
          {error === 'externalError' ? (
            <Text style={styles.errorText}>
              {i18n('login_page_external_error_warning')}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }

  renderLoginButton() {
    const { loading, internalLogin, email, password, i18n } = this.props;

    return (
      <View>
        <LoadingButton
          onPress={() => internalLogin(email, password)}
          loading={loading}
          title={R.toUpper(i18n('log_in_button'))}
          height={40}
          width={340}
          titleFontSize={16}
          backgroundColor="#00bcd4"
          borderRadius={20}
        />
      </View>
    );
  }

  goToRegistration = () => {
    this.props.navigation.navigate('RegistrationWizard');
  };

  render() {
    const { navigation, i18n } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.auth_content}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={0}
            behavior={'position'}
          >
            <Image
              style={styles.logo}
              source={require('src/assets/textLogo.png')}
            />
            <View style={{ height: 10 }} />
            <Text style={styles.logo_title}>{i18n('login_title')}</Text>
            <View style={{ height: 10 }} />
            {this.renderSocialButtons()}
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 26,
                marginTop: 26,
                fontSize: 14,
                color: '#b0bec5'
              }}
            >
              {i18n('or')}
            </Text>
            {this.renderInputs()}
            <View style={{ height: 15 }} />
            {this.renderLoginButton()}
            <View style={{ height: 25 }} />
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.arrowBackIcon}>
          <ArrowBackIcon color="#00bcd4" onPress={() => navigation.goBack()} />
        </View>
      </View>
    );
  }
}

export default R.compose(
  connect(
    ({ loginPage }) => {
      const { email, password, validation, error, loading } = loginPage;
      return { email, password, validation, error, loading };
    },
    {
      internalLogin: actions.authorization.internalLogin,
      externalLogin: actions.authorization.externalLogin,
      changeField: actions.loginPage.changeField
    }
  ),
  withBackHandler(({ navigation }) => navigation.goBack()),
  withPhoneTranslations
)(Login);

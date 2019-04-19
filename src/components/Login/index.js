import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import * as R from 'ramda';

import actions from 'src/data/actions';
import LoadingButton from 'src/pureComponents/Button/LoadingButton';
import i18n from 'src/framework/i18n';
import { getPhoneJJLocale } from 'src/framework/i18n/getPhoneLocale';
import { externalLoginTypes } from 'src/data/authorization/constants';
import withBackHandler from 'src/hocs/withBackHandler';

import styles from './styles';
import { ArrowBackIcon } from '../../pureComponents/ArrowBackIcon';

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

class Login extends Component {
  phoneLocale = getPhoneJJLocale();

  i18n = key => i18n(key, 'general', this.phoneLocale);

  redirect(route) {
    this.props.navigation.navigate(route);
  }

  renderSocialButtons() {
    const { externalLogin } = this.props;

    return (
      <View>
        <SocialButton
          source={require('src/assets/google-icon.png')}
          title={this.i18n('google_log_in')}
          buttonStyle={{ backgroundColor: '#dc4e41' }}
          onPress={() => externalLogin(externalLoginTypes.google)}
        />

        <SocialButton
          source={require('src/assets/facebook-icon.png')}
          title={this.i18n('facebook_log_in')}
          buttonStyle={{ backgroundColor: '#5e81a8' }}
          onPress={() => externalLogin(externalLoginTypes.facebook)}
        />
      </View>
    );
  }

  renderInputs() {
    const { email, password, error, validation, changeField } = this.props;

    return (
      <View>
        <TextField
          label={this.i18n('email_label')}
          tintColor="#00bcd4"
          keyboardType="email-address"
          onChangeText={value => changeField({ email: value })}
          value={email}
          error={
            validation.indexOf('email') !== -1
              ? this.i18n('email_required')
              : null
          }
          autoCapitalize="none"
          labelHeight={15}
        />
        <TextField
          label={this.i18n('password_label')}
          tintColor="#00bcd4"
          onChangeText={value => changeField({ password: value })}
          value={password}
          error={
            validation.indexOf('password') !== -1
              ? this.i18n('password_required')
              : null
          }
          autoCapitalize="none"
          secureTextEntry
          labelHeight={15}
        />
        <View style={styles.errorView}>
          {error === 'connection' ? (
            <Text style={styles.errorText}>
              {this.i18n('login_page_connection_problems_warning')}
            </Text>
          ) : null}
          {error === 'credentials' ? (
            <Text style={styles.errorText}>
              {this.i18n('login_page_wrong_credentials_warning')}
            </Text>
          ) : null}
          {error === 'externalError' ? (
            <Text style={styles.errorText}>
              {this.i18n('login_page_external_error_warning')}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }

  renderLoginButton() {
    const { loading, internalLogin, email, password } = this.props;

    return (
      <View>
        <LoadingButton
          onPress={() => internalLogin(email, password)}
          loading={loading}
          title={R.toUpper(this.i18n('log_in_button'))}
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
    this.props.navigation.navigate('Registration');
  };

  render() {
    const { navigation } = this.props;

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
            <Text style={styles.logo_title}>{this.i18n('login_title')}</Text>
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
              {this.i18n('or')}
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
  withBackHandler(({ navigation }) => navigation.goBack())
)(Login);

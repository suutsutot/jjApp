import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  Image,
  Linking,
  KeyboardAvoidingView
} from 'react-native';
import { Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';

import actions from 'src/data/actions';
import config from 'src/config';
import LoadingButton from 'src/pureComponents/Button/LoadingButton';
import i18n from 'src/framework/i18n';

import styles from './styles';

class Login extends Component {
  redirect(route) {
    this.props.navigation.navigate(route);
  }

  renderSocialButtons() {
    const { loginViaFacebook, loginViaGoogle } = this.props;

    return (
      <View>
        <Button
          icon={
            <View style={styles.icon_aria}>
              <Image
                style={{ width: 24, height: 24 }}
                source={{
                  uri:
                    'https://s3-eu-west-1.amazonaws.com/jj-files/icons/google-icon.png'
                }}
              />
            </View>
          }
          title={i18n('google_log_in')}
          titleStyle={{ flex: 1 }}
          buttonStyle={[
            styles.social_button,
            { backgroundColor: '#dc4e41', marginBottom: 24 }
          ]}
          onPress={() => loginViaGoogle()}
        />

        <Button
          icon={
            <View style={styles.icon_aria}>
              <Image
                style={{ width: 25, height: 25 }}
                source={{
                  uri:
                    'https://s3-eu-west-1.amazonaws.com/jj-files/icons/facebook-icon.png'
                }}
              />
            </View>
          }
          title={i18n('facebook_log_in')}          
          titleStyle={{ flex: 1 }}
          buttonStyle={[styles.social_button, { backgroundColor: '#5e81a8' }]}
          onPress={() => loginViaFacebook()}
        />
      </View>
    );
  }

  renderInputs() {
    const { email, password, error, validation, changeField } = this.props;

    return (
      <View>
        <TextField
          label={i18n('email_label')}
          tintColor="#00bcd4"
          keyboardType="email-address"
          onChangeText={value => changeField({ email: value })}
          value={email}
          error={validation.indexOf('email') !== -1 ? i18n('email_required') : null}
          autoCapitalize="none"
          labelHeight={15}
        />
        <TextField
          label={i18n('password_label')}
          tintColor="#00bcd4"
          onChangeText={value => changeField({ password: value })}
          value={password}
          error={validation.indexOf('password') !== -1 ? i18n('password_required') : null}
          autoCapitalize="none"
          secureTextEntry
          labelHeight={15}
        />
        {error === 'conection' ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>
            {i18n('login_page_connection_problems_warning')}
          </Text>
        ) : null}
        {error === 'credentials' ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>
            {i18n('login_page_wrong_credentials_warning')}
          </Text>
        ) : null}
        {error === 'externalError' ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>
            {i18n('login_page_external_error_warning')}
          </Text>
        ) : null}
      </View>
    );
  }

  renderLoginButton() {
    const { loading, loginWithCredentials, email, password } = this.props;

    return (
      <View>
        <LoadingButton
          onPress={() => loginWithCredentials(email, password)}
          loading={loading}
          title={i18n("log_in_button")}
          height={40}
          width={340}
          titleFontSize={16}
          backgroundColor="#00bcd4"
          borderRadius={20}
        />
      </View>
    );
  }

  goToSignIn() {
    let url = config.client + '/login';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }

  render() {
    return (
      <View style={[styles.container]}>
        <ScrollView style={styles.auth_content}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={0}
            behavior={'position'}
          >
            <Image
              style={styles.logo}
              source={{
                uri:
                  'https://s3-eu-west-1.amazonaws.com/jj-files/logo/Logo_colored.png'
              }}
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
      </View>
    );
  }
}

export default connect(
  ({ loginPage }) => {
    const { email, password, validation, error, loading } = loginPage;
    return { email, password, validation, error, loading };
  },
  dispatch => {
    return {
      loginWithCredentials: (email, password) =>
        dispatch(actions.authorization.loginWithCredentials(email, password)),
      loginViaFacebook: () =>
        dispatch(actions.authorization.loginWithFacebook()),
      loginViaGoogle: () => dispatch(actions.authorization.loginWithGoogle()),
      changeField: payload => dispatch(actions.loginPage.changeField(payload))
    };
  }
)(Login);

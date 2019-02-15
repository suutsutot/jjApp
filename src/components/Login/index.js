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
import { SocialIcon, Button, Icon } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import actions from 'src/data/actions';
import { trim } from 'lodash';
import styles from './styles';
import config from 'src/config';

import LoadingButton from 'src/pureComponents/LoadingButton';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      loading: false,
      isLogin: false
    };
  }

  redirect(route) {
    this.props.navigation.navigate(route);
  }

  renderSocialButtons() {
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
          title="Log In With Google"
          titleStyle={{ flex: 1 }}
          buttonStyle={[
            styles.social_button,
            { backgroundColor: '#dc4e41', marginBottom: 24 }
          ]}
          onPress={this.onLoginWithGoogle.bind(this)}
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
          title="Log In With Facebook"
          titleStyle={{ flex: 1 }}
          buttonStyle={[styles.social_button, { backgroundColor: '#5e81a8' }]}
          onPress={this.onLoginWithFacebook.bind(this)}
        />
      </View>
    );
  }

  renderInputs() {
    const {
      emailInput,
      emailInputError,
      passwordInput,
      passwordInputError
    } = this.state;
    const { wrongCredentials, errorUserGet } = this.props;

    return (
      <View>
        <TextField
          label="Email"
          keyboardType="email-address"
          tintColor="#00bcd4"
          onChangeText={this.onEmailChange.bind(this)}
          value={emailInput}
          error={emailInputError}
          labelHeight={15}
        />
        <TextField
          secureTextEntry
          label="Password"
          tintColor="#00bcd4"
          onChangeText={this.onPasswordChange.bind(this)}
          value={passwordInput}
          error={passwordInputError}
          autoCapitalize="none"
          labelHeight={15}
        />
        {wrongCredentials ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>
            Wrong email or password.
          </Text>
        ) : null}
        {errorUserGet ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>
            Sorry, there was an authorization error
          </Text>
        ) : null}
      </View>
    );
  }

  renderLoginButton() {
    const { loading } = this.props;

    return (
      <View>
        <LoadingButton
          onPress={this.onLoginWithCredentials.bind(this)}
          loading={loading}
          title="LOG IN"
          height={40}
          width={340}
          titleFontSize={16}
          backgroundColor="#00bcd4"
          borderRadius={20}
        />
      </View>
    );
  }

  onLoginWithFacebook() {
    const { loginViaFacebook } = this.props;
    loginViaFacebook();
    console.log('facebook');
  }

  onLoginWithGoogle() {
    const { loginViaGoogle } = this.props;
    loginViaGoogle();
    console.log('google');
  }

  onEmailChange(text) {
    this.setState({
      emailInput: text,
      emailInputError: ''
    });
  }

  onPasswordChange(text) {
    this.setState({
      passwordInput: text,
      passwordInputError: ''
    });
  }

  onLoginWithCredentials() {
    const { LoginWithCredentials, wrongCredentials, errorUserGet } = this.props;
    const { emailInput, passwordInput } = this.state;

    if (trim(emailInput) === '') {
      this.setState({
        emailInputError: 'Field is required.'
      });
      return;
    }

    if (trim(passwordInput) === '') {
      this.setState({
        passwordInputError: 'Field is required.'
      });
      return;
    }

    LoginWithCredentials(emailInput, passwordInput);
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
            <Text style={styles.logo_title}>Login</Text>
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
              or
            </Text>
            {this.renderInputs()}
            <View style={{ height: 15 }} />
            {this.renderLoginButton()}
            <View style={{ height: 25 }} />
            {/*<Text*/}
            {/*style={{ fontSize: 20, color: '#37474f', textAlign: 'center' }}*/}
            {/*>*/}
            {/*Are you not registered?*/}
            {/*</Text>*/}
            {/*<View*/}
            {/*style={{*/}
            {/*flexDirection: 'row',*/}
            {/*justifyContent: 'center',*/}
            {/*alignItems: 'center'*/}
            {/*}}*/}
            {/*>*/}
            {/*<TouchableOpacity*/}
            {/*onPress={() => {*/}
            {/*this.goToSignIn();*/}
            {/*}}*/}
            {/*>*/}
            {/*<Text style={{ fontSize: 20, color: '#00bcd4', marginTop: 15 }}>*/}
            {/*Sign up now*/}
            {/*</Text>*/}
            {/*</TouchableOpacity>*/}
            {/*</View>*/}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    LoginWithCredentials: (email, password) =>
      dispatch(actions.authorization.dbLoginWithCredentials(email, password)),
    loginViaFacebook: () => dispatch(actions.authorization.dbLoginViaFacebook()),
    loginViaGoogle: () => dispatch(actions.authorization.dbLoginViaGoogle())
  };
};

const mapStateToProps = ({ application, authorize }) => {
  const { wrongCredentials, errorUserGet } = authorize;
  const { error, loading } = application;
  return { error, loading, wrongCredentials, errorUserGet };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

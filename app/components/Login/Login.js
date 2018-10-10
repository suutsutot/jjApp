import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  KeyboardAvoidingView
} from 'react-native';
import { CardSection } from 'app/pureComponents';
import { SocialIcon, Button, Icon } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import { authorizationActions } from 'app/data/authorization';
import { trim } from 'lodash';
import styles from './styles';
import config from 'app/config';

import LoginButton from 'react-native-animate-loading-button';

import CustomIcon from '../../customIcons/components/customFonts.js';

export class Login extends Component {
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
        {/*{emailInputError ? <Text>{emailInputError}</Text> : null}*/}
        <TextField
          secureTextEntry
          label="Password"
          tintColor="#00bcd4"
          onChangeText={this.onPasswordChange.bind(this)}
          value={passwordInput}
          error={passwordInputError}
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
    /*if (this.props.loading) {
            return (
                <CardSection style={styles.buttons}>
                    <Button textStyle={styles.buttonText}>
                        Loading ...
                    </Button>
                </CardSection>
            )
        }*/

    return (
      <View>
        <LoginButton
          onPress={this.onLoginWithCredentials.bind(this)}
          ref={c => (this.loadingButton = c)}
          title="LOG IN"
          height={40}
          width={340}
          titleFontSize={16}
          backgroundColor="#00bcd4"
          borderRadius={20}
        />
      </View>
      /*<CardSection style={styles.buttons}>
                <Button onPress={this.onLoginWithCredentials.bind(this)}>
                    Log in
                </Button>
            </CardSection>*/
    );
  }

  /*renderRegisterButton() {
        return <View>
            <Text style={{textAlign: 'center',}}>You dont have an account?</Text>
            <CardSection style={styles.buttons}>
                <Button onPress={() => this.redirect('Register')}>
                    Register
                </Button>
            </CardSection>
        </View>
    }*/

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

    this.loadingButton.showLoading(true);
    LoginWithCredentials(emailInput, passwordInput);
    if (!this.props.loading) this.loadingButton.showLoading(false);
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
            <Text
              style={{ fontSize: 20, color: '#37474f', textAlign: 'center' }}
            >
              Are you not registered?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.goToSignIn();
                }}
              >
                <Text style={{ fontSize: 20, color: '#00bcd4', marginTop: 15 }}>
                  Sign up now
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    LoginWithCredentials: (email, password) =>
      dispatch(authorizationActions.dbLoginWithCredentials(email, password)),
    loginViaFacebook: () => dispatch(authorizationActions.dbLoginViaFacebook()),
    loginViaGoogle: () => dispatch(authorizationActions.dbLoginViaGoogle())
  };
};

const mapStateToProps = ({ global, authorize }) => {
  const { wrongCredentials, errorUserGet } = authorize;
  const { error, loading } = global;
  return { error, loading, wrongCredentials, errorUserGet };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

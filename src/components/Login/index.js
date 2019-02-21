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
import styles from './styles';
import config from 'src/config';

import LoadingButton from 'src/pureComponents/LoadingButton';

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
          title="Log In With Google"
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
          title="Log In With Facebook"
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
          label="Email"
          keyboardType="email-address"
          tintColor="#00bcd4"
          onChangeText={value => changeField({ email: value })}
          value={email}
          error={validation.indexOf('email') !== -1 ? 'Email is required' : null}
          labelHeight={15}
        />
        <TextField
          secureTextEntry
          label="Password"
          tintColor="#00bcd4"
          onChangeText={value => changeField({ password: value })}
          value={password}
          error={validation.indexOf('password') !== -1 ? 'Password is required' : null}
          autoCapitalize="none"
          labelHeight={15}
        />
        {error === 'conection' ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>
            You're offline. Please, check your connection.
          </Text>
        ) : null}
        {error === 'credentials' ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>
            Wrong email or password.
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
            {/* <Text*/}
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
            {/*</View> */}
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
        dispatch(actions.authorization.loginViaFacebook()),
      loginViaGoogle: () => dispatch(actions.authorization.loginViaGoogle()),
      changeField: payload => dispatch(actions.loginPage.changeField(payload))
    };
  }
)(Login);

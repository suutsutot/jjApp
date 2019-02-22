import { AsyncStorage, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { refreshByCredentials } from 'src/api/refreshTokenAPI';
import { setPushNotificationToken } from 'src/api/userApi';
import config from 'src/config';
import types from 'src/constants/actionTypes';
import {
  WRONG_CREDENTIALS,
  CURRENT_CREDENTIALS,
  NO_USER_GET,
  SUCCESS_USER_GET
} from 'src/constants/actionTypes';
import * as applicationActions from 'src/data/application/actions';
import actions from 'src/data/actions';
import auth0 from 'src/framework/auth0';
import auth0Config from 'src/config/auth0Config';

const loginRequest = credentials => async dispatch => {
  dispatch(currentCredentials());
  await AsyncStorage.setItem('refreshToken', credentials.refreshToken);

  const { accessToken, idToken } = await refreshByCredentials(credentials);

  AsyncStorage.setItem('accessToken', accessToken);
  AsyncStorage.setItem('idToken', idToken);

  const profile = await auth0.auth.userInfo({ token: accessToken });

  try {
    const result = await fetch(`${config.server}/api/users/duplicate-auth0`, {
      method: 'POST',
      body: JSON.stringify({
        email: profile.email
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: idToken
      }
    });

    const response = await result.json();

    if (response && response.user) {
      dispatch(successUserGet());
      const userInfo = response.user;

      AsyncStorage.setItem('userId', userInfo._id);
      AsyncStorage.setItem('email', userInfo.email);

      dispatch(
        actions.authorization.login({
          userId: userInfo._id,
          email: userInfo.email,
          profile: userInfo
        })
      );

      dispatch(applicationActions.showNotificationSuccess());
      dispatch(NavigationActions.navigate({ routeName: 'Notifications' }));
      dispatch(applicationActions.hideLoading());

      try {
        const pushNotificationToken = await AsyncStorage.getItem(
          'pushNotificationToken'
        );
        const fcmToken = await AsyncStorage.getItem('fcmToken');

        setPushNotificationToken(
          userInfo._id,
          Platform.select({
            ios: { apnsToken: pushNotificationToken, fcmToken },
            android: { fcmToken: pushNotificationToken }
          })
        );
      } catch (e) {}
    } else {
      dispatch(noUserGet());
      dispatch(applicationActions.hideLoading());
    }
  } catch (error) {
    console.log('AuthorizeActionError:', error);
    dispatch(noUserGet());
    dispatch(applicationActions.hideLoading());
    dispatch(applicationActions.showErrorMessageWithTimeout(error.code));
  }
};

export const dbLoginWithCredentials = (
  username,
  password
) => async dispatch => {
  dispatch(applicationActions.showLoading());

  try {
    const credentials = await auth0.auth.passwordRealm({
      username,
      password,
      realm: 'Username-Password-Authentication',
      scope: 'openid offline_access'
    });

    await loginRequest(credentials)(dispatch);
  } catch (error) {
    console.log('AuthorizeActionError:', error);
    dispatch(wrongCredentials());
    dispatch(applicationActions.hideLoading());
  }
};

export const dbLoginViaFacebook = () => dispatch => {
  dispatch(applicationActions.showLoading());

  auth0.webAuth
    .authorize({
      scope: 'openid email profile offline_access',
      audience: 'https://' + auth0Config.domain + '/userinfo',
      connection: 'facebook'
    })
    .then(credentials => {
      return loginRequest(credentials)(dispatch);
    })
    .catch(error => {
      console.log('AuthorizeActionError:', error);
      dispatch(noUserGet());
      dispatch(applicationActions.hideLoading());
    });
};

export const dbLoginViaGoogle = () => dispatch => {
  dispatch(applicationActions.showLoading());

  auth0.webAuth
    .authorize({
      scope: 'openid email profile offline_access',
      audience: 'https://' + auth0Config.domain + '/userinfo',
      connection: 'google-oauth2'
    })
    .then(credentials => {
      return loginRequest(credentials)(dispatch);
    })
    .catch(error => {
      console.log('AuthorizeActionError:', error);
      dispatch(noUserGet());
      dispatch(applicationActions.hideLoading());
    });
};

export const dbSignUp = (email, password) => {
  return (dispatch, getState) => {
    dispatch(applicationActions.showLoading());

    const url = 'https://ynpl.auth0.com/dbconnections/signup';
    const data = {
      client_id: 'BBLp6dT9ug1mxY5UI3xwld6cA3Ukn8aH',
      email: email,
      password: password,
      connection: 'Username-Password-Authentication'
    };

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(responseData => {
        if (responseData) {
          console.log('responseData', responseData);
          const resetAction = NavigationActions.navigate({
            routeName: 'Login'
          });
          dispatch(resetAction);
          alert('Successfully! Please log in');
          dispatch(applicationActions.hideLoading());
        } else {
          alert('Sorry, there was a sign up error');
          dispatch(applicationActions.hideLoading());
        }
      })
      .catch(error => {
        console.log('AuthorizeActionError:', error);
        dispatch(applicationActions.hideLoading());
      });
  };
};

export const login = ({ userId, email, profile }) => {
  return {
    type: types.AUTHORIZATION.LOGIN,
    payload: {
      userId,
      email,
      profile
    }
  };
};

export const logout = () => dispatch => {
  dispatch(NavigationActions.navigate({ routeName: 'Login' }));
  AsyncStorage.clear();
  dispatch({ type: types.AUTHORIZATION.LOGOUT });
};

const wrongCredentials = () => {
  return { type: WRONG_CREDENTIALS };
};

const currentCredentials = () => {
  return { type: CURRENT_CREDENTIALS };
};

const noUserGet = () => {
  return { type: NO_USER_GET };
};

const successUserGet = () => {
  return { type: SUCCESS_USER_GET };
};

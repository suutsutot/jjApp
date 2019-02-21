import { AsyncStorage, Platform, NetInfo } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { refreshByCredentials } from 'src/api/refreshTokenAPI';
import { setPushNotificationToken } from 'src/api/userApi';
import types from 'src/constants/actionTypes';
import * as applicationActions from 'src/data/application/actions';
import actions from 'src/data/actions';
import auth0 from 'src/framework/auth0';
import auth0Config from 'src/config/auth0Config';
import { isLoginFormValid } from 'src/data/loginPage/selector';
import { postUserData } from 'src/api/authorizationAPI';

const loginRequest = (credentials, errorType) => async dispatch => {
  await AsyncStorage.setItem('refreshToken', credentials.refreshToken);
  const { accessToken, idToken } = await refreshByCredentials(credentials);
  AsyncStorage.setItem('accessToken', accessToken);
  AsyncStorage.setItem('idToken', idToken);
  const profile = await auth0.auth.userInfo({ token: accessToken });

  const response = await postUserData(idToken, profile.email);

  if (response && response.user && !response.error) {
    const userInfo = response.user;

    AsyncStorage.setItem('userId', userInfo._id);
    AsyncStorage.setItem('email', userInfo.email);

    dispatch(
      actions.authorization.login({
        userId: userInfo._id,
        email: userInfo.email
      })
    );

    dispatch(NavigationActions.navigate({ routeName: 'Notifications' }));
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
    dispatch(loginError(errorType));
  }
};

const isNotConnected = async () => {
  const connectionInfo = await NetInfo.getConnectionInfo();
  return connectionInfo.type === 'none';
}

export const loginWithCredentials = (username, password) => async dispatch => {
  dispatch(actions.loginPage.loginRequest());
  if  (await isNotConnected()) {
    return dispatch(loginError('conection'));
  }
  if (!isLoginFormValid(username, password)) return;

  dispatch(actions.loginPage.toggleLoading(true));

  try {
    const credentials = await auth0.auth.passwordRealm({
      username,
      password,
      realm: 'Username-Password-Authentication',
      scope: 'openid offline_access'
    });

    await loginRequest(credentials, 'credentials')(dispatch);
  } catch (error) {
    console.log('AuthorizeActionError:', error);
    dispatch(loginError('credentials'));
  }
};

export const loginWithGoogle = () => async dispatch => {
  dispatch(actions.loginPage.toggleLoading(true));
  if  (await isNotConnected()) {
    return dispatch(loginError('conection'));
  }

  auth0.webAuth
    .authorize({
      scope: 'openid email profile offline_access',
      audience: 'https://' + auth0Config.domain + '/userinfo',
      connection: 'google-oauth2'
    })
    .then(credentials => {
      return loginRequest(credentials, 'externalError')(dispatch);
    })
    .catch(error => {
      console.log('AuthorizeActionError:', error);
      dispatch(loginError('externalError'));
    });
};

export const loginWithFacebook = () => async dispatch => {
  dispatch(actions.loginPage.toggleLoading(true));
  if  (await isNotConnected()) {
    return dispatch(loginError('conection'));
  }

  auth0.webAuth
    .authorize({
      scope: 'openid email profile offline_access',
      audience: 'https://' + auth0Config.domain + '/userinfo',
      connection: 'facebook'
    })
    .then(credentials => {
      return loginRequest(credentials, 'externalError')(dispatch);
    })
    .catch(error => {
      console.log('AuthorizeActionError:', error);
      dispatch(loginError('externalError'));
    });
};

export const dbSignUp = (email, password) => {
  return dispatch => {
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

export const login = ({ userId, email }) => {
  return {
    type: types.AUTHORIZATION.LOGIN,
    payload: {
      userId,
      email
    }
  };
};

const loginError = payload => {
  return { type: types.AUTHORIZATION.LOGIN_ERROR, payload };
};

export const logout = () => dispatch => {
  dispatch(NavigationActions.navigate({ routeName: 'Login' }));
  AsyncStorage.clear();
  dispatch({ type: types.AUTHORIZATION.LOGOUT });
};

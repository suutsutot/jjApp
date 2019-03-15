import { AsyncStorage, Platform, NetInfo } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { refreshByCredentials } from 'src/api/refreshTokenAPI';
import { setPushNotificationToken } from 'src/api/userApi';
import types from 'src/constants/actionTypes';
import actions from 'src/data/actions';
import auth0 from 'src/framework/auth0';
import auth0Config from 'src/config/auth0Config';
import { isLoginFormValid } from 'src/data/loginPage/selector';
import { postUserData } from 'src/api/authorizationAPI';
import { isNotConnected } from 'src/framework/connection';

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
          email: userInfo.email,
          profile: userInfo
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

export const internalLogin = (username, password) => async dispatch => {
  dispatch(actions.loginPage.loginRequest());
  if (await isNotConnected()) {
    return dispatch(loginError('connection'));
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

export const externalLogin = (connection) => async dispatch => {
  dispatch(actions.loginPage.toggleLoading(true));
  if (await isNotConnected()) {
    return dispatch(loginError('connection'));
  }

  auth0.webAuth
  .authorize({
    scope: 'openid email profile offline_access',
    audience: 'https://' + auth0Config.domain + '/userinfo',
    connection
  })
  .then(credentials => {
    return loginRequest(credentials, 'externalError')(dispatch);
  })
  .catch(error => {
    console.log('AuthorizeActionError:', error);
    dispatch(loginError('externalError'));
  });
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

const loginError = payload => {
  return { type: types.AUTHORIZATION.LOGIN_ERROR, payload };
};

export const logout = () => dispatch => {
  dispatch(NavigationActions.navigate({ routeName: 'Login' }));
  AsyncStorage.clear();
  dispatch({ type: types.AUTHORIZATION.LOGOUT });
};

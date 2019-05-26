import { AsyncStorage, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { refreshByCredentials } from 'src/api/refreshTokenApi';
import { setPushNotificationToken } from 'src/api/userApi';
import types from 'src/constants/actionTypes';
import actions from 'src/data/actions';
import auth0 from 'src/framework/auth0';
import config from 'src/config';
import { isLoginFormValid } from 'src/data/loginPage/selector';
import {
  duplicateAuth0Login,
  duplicateAuth0SignUp
} from 'src/api/authorizationAPI';
import { isNotConnected } from 'src/framework/connection';
import { serverLog } from 'src/framework/logging';
import {
  LOGIN_ERROR,
  SEND_PUSH_NOTIFICATIONS_INFO_ERROR
} from 'src/constants/errors';
import { isSignUpFormValid } from 'src/data/registrationPage/selector';
import { registerUserAuth0 } from 'src/api/registrationApi';

const baseLogin = credentials => async (dispatch, getState) => {
  await AsyncStorage.setItem('refreshToken', credentials.refreshToken);

  const { accessToken } = await refreshByCredentials(credentials);

  const profile = await auth0.auth.userInfo({ token: accessToken });
  const response = await duplicateAuth0Login(profile.email);

  if (response.error) {
    return response;
  }

  if (R_.isNilOrEmpty(response.user)) {
    return { error: 'response is null' };
  }

  const { user } = response;

  dispatch(
    actions.authorization.loginSuccess({
      userId: user._id,
      email: user.email,
      profile: user
    })
  );

  dispatch(NavigationActions.navigate({ routeName: 'Notifications' }));
  const {
    user: {
      notificationsInfo: { pushNotificationToken, fcmToken }
    }
  } = getState();

  const result = await setPushNotificationToken(
    user._id,
    Platform.select({
      ios: { apnsToken: pushNotificationToken, fcmToken },
      android: { fcmToken: pushNotificationToken }
    })
  );

  if (result.error) {
    serverLog(SEND_PUSH_NOTIFICATIONS_INFO_ERROR, {
      result,
      userId: user._id,
      pushNotificationToken,
      fcmToken
    });
  }

  return response;
};

export const handleLoginError = (errorType, response) => dispatch => {
  console.log(errorType, JSON.stringify(response));
  serverLog(LOGIN_ERROR, { errorType, response });
  return dispatch(loginError(errorType, response.error));
};

export const handleSignUpError = (errorType, response) => dispatch => {
  console.log(errorType, JSON.stringify(response));
  return dispatch(signUpError(errorType, response.error));
};

export const internalLogin = (email, password) => async dispatch => {
  dispatch(actions.authorization.loginRequest());

  if (await isNotConnected()) {
    return dispatch(handleLoginError('connection'));
  }

  if (!isLoginFormValid(email, password)) {
    return;
  }

  dispatch(actions.loginPage.toggleLoading(true));

  try {
    const credentials = await auth0.auth.passwordRealm({
      username: email,
      password,
      realm: 'Username-Password-Authentication',
      scope: 'openid offline_access'
    });

    const result = await dispatch(baseLogin(credentials));

    if (result && result.error) {
      throw result;
    }
  } catch (result) {
    dispatch(handleLoginError('credentials', { ...result, username: email }));
  }
};

export const externalLogin = connection => async dispatch => {
  dispatch(actions.authorization.externalLoginRequest());

  if (await isNotConnected()) {
    return dispatch(handleLoginError('connection'));
  }

  dispatch(actions.loginPage.toggleLoading(true));

  try {
    const credentials = await auth0.webAuth.authorize({
      scope: 'openid email profile offline_access',
      audience: 'https://' + config.auth0.domain + '/userinfo',
      prompt: 'select_account',
      connection
    });

    const result = await dispatch(baseLogin(credentials));

    if (result && result.error) {
      throw result;
    }
  } catch (result) {
    dispatch(handleLoginError('externalError', result));
  }
};

export const externalLoginRequest = () => {
  return {
    type: types.AUTHORIZATION.EXTERNAL_LOGIN_REQUEST
  };
};

export const loginRequest = () => {
  return {
    type: types.AUTHORIZATION.LOGIN_REQUEST
  };
};

export const loginSuccess = ({ userId, email, profile }) => {
  return {
    type: types.AUTHORIZATION.LOGIN_SUCCESS,
    payload: {
      userId,
      email,
      profile
    }
  };
};

const loginError = (errorType, error = {}) => {
  return {
    type: types.AUTHORIZATION.LOGIN_ERROR,
    payload: { errorType, error }
  };
};

export const signUp = (email, password) => async dispatch => {
  dispatch(actions.authorization.signUpRequest());

  if (await isNotConnected()) {
    return dispatch(handleSignUpError('connection'));
  }

  if (!isSignUpFormValid(email, password)) {
    return;
  }

  dispatch(actions.registrationPage.toggleLoading(true));

  try {
    const registerData = await registerUserAuth0({
      client_id: config.auth0.clientId,
      email: email,
      password: password,
      connection: 'Username-Password-Authentication'
    });

    const credentials = await auth0.auth.passwordRealm({
      username: email,
      password: password,
      realm: 'Username-Password-Authentication',
      scope: 'openid offline_access'
    });

    await AsyncStorage.setItem('refreshToken', credentials.refreshToken);

    const { accessToken } = await refreshByCredentials(credentials);
    const userInfo = await auth0.auth.userInfo({ token: accessToken });
    const userInfoPrepared = R.mergeRight(userInfo, {
      auth0Id: userInfo.sub,
      user_id: userInfo.sub
    });
    const response = await duplicateAuth0SignUp(userInfoPrepared);
    const response1 = await duplicateAuth0SignUp(userInfoPrepared);

    const profile = response1.user;

    dispatch(NavigationActions.navigate({ routeName: 'RegistrationWizard' }));
    dispatch(
      signUpSuccess({
        userId: profile._id,
        email,
        profile
      })
    );
  } catch (result) {
    dispatch(handleSignUpError('credentials', { ...result, username: email }));
  }
};

export const signUpRequest = () => {
  return {
    type: types.AUTHORIZATION.SIGN_UP_REQUEST
  };
};

export const signUpSuccess = ({ userId, email, profile }) => {
  return {
    type: types.AUTHORIZATION.SIGN_UP_SUCCESS,
    payload: {
      userId,
      email,
      profile
    }
  };
};

const signUpError = (errorType, error = {}) => {
  return {
    type: types.AUTHORIZATION.SIGN_UP_ERROR,
    payload: { errorType, error }
  };
};

export const logout = () => (dispatch, getState) => {
  const { userId } = getState().user;

  const newToken = 'unset'; // workaround

  userId &&
    setPushNotificationToken(
      userId,
      Platform.select({
        ios: { apnsToken: newToken, fcmToken: newToken },
        android: { fcmToken: newToken }
      })
    );
  AsyncStorage.clear();
  dispatch({ type: types.AUTHORIZATION.LOGOUT });
};

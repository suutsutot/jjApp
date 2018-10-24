import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { getNotifications } from 'app/api/notificationsApi';
import { refreshByCredentials } from 'app/api/refreshTokenAPI';
import { setList } from 'app/data/notifications/actions';
import config from 'app/config';
import * as types from 'app/constants/actionTypes';
import * as globalActions from 'app/data/global/globalActions';
import auth0 from 'app/framework/auth0';

export const dbLoginWithCredentials = (
  username,
  password
) => async dispatch => {
  dispatch(globalActions.showLoading());

  try {
    const credentials = await auth0.auth.passwordRealm({
      username,
      password,
      realm: 'Username-Password-Authentication',
      scope: 'openid offline_access'
    });

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
        const userInfo = response.user || {};

        AsyncStorage.setItem('userId', userInfo._id);
        AsyncStorage.setItem('email', userInfo.email);

        dispatch(globalActions.showNotificationSuccess());
        dispatch(login(userInfo.email, userInfo));
        getNotifications().then(data => dispatch(setList(data)));
        dispatch(NavigationActions.navigate({ routeName: 'Notifications' }));
        dispatch(globalActions.hideLoading());

        const pushNotificationToken = await AsyncStorage.getItem(
          'pushNotificationToken'
        );
        try {
          fetch(`${config.server}/api/users/set-push-token`, {
            method: 'POST',
            body: JSON.stringify({
              id: userInfo._id,
              pushNotificationToken
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: idToken
            }
          });
        } catch (e) {}
      } else {
        dispatch(noUserGet());
        dispatch(globalActions.hideLoading());
      }
    } catch (error) {
      console.log('AuthorizeActionError:', error);
      dispatch(noUserGet());
      dispatch(globalActions.hideLoading());
      dispatch(globalActions.showErrorMessageWithTimeout(error.code));
    }
  } catch (error) {
    console.log('AuthorizeActionError:', error);
    dispatch(wrongCredentials());
    dispatch(globalActions.hideLoading());
  }
};

export const dbLoginViaFacebook = () => {
  return (dispatch, getState) => {
    auth0.webAuth
      .authorize({
        scope: 'openid email profile offline_access',
        audience: 'https://' + credentials.domain + '/userinfo',
        connection: 'facebook'
      })
      .then(credentials => {
        dispatch(successUserGet());
        AsyncStorage.setItem('refreshToken', credentials.refreshToken);

        refreshByCredentials(credentials).then(newToken => {
          AsyncStorage.setItem('accessToken', newToken.accessToken);
          AsyncStorage.setItem('idToken', newToken.idToken);

          auth0.auth
            .userInfo({ token: newToken.accessToken })
            .then(profile => {
              dispatch(successUserGet());
              const url = config.server + '/api/users/duplicate-auth0';
              const email = profile.email;
              const data = { email };

              fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: newToken.idToken
                }
              })
                .then(r => r.json())
                .catch(error => {
                  console.log('AuthorizeActionError:', error);
                  dispatch(noUserGet());
                })
                .then(response => {
                  if (response && response.user) {
                    dispatch(successUserGet());
                    const userInfo = response.user || {};

                    AsyncStorage.setItem('userId', userInfo._id);
                    AsyncStorage.setItem('email', userInfo.email);

                    dispatch(globalActions.showNotificationSuccess());
                    dispatch(login(userInfo.email, userInfo));

                    getNotifications().then(data => dispatch(setList(data)));

                    const resetAction = NavigationActions.navigate({
                      routeName: 'Notifications'
                    });
                    dispatch(resetAction);
                  } else {
                    dispatch(noUserGet());
                  }
                });
            })
            .catch(error => {
              console.log('AuthorizeActionError:', error);
              dispatch(noUserGet());
            });
        });
      })
      .catch(error => {
        console.log('AuthorizeActionError:', error);
        dispatch(noUserGet());
      });
  };
};

export const dbLoginViaGoogle = () => {
  return (dispatch, getState) => {
    auth0.webAuth
      .authorize({
        scope: 'openid email profile offline_access',
        audience: 'https://' + credentials.domain + '/userinfo',
        connection: 'google-oauth2'
      })
      .then(credentials => {
        dispatch(successUserGet());
        AsyncStorage.setItem('refreshToken', credentials.refreshToken);

        refreshByCredentials(credentials).then(newToken => {
          AsyncStorage.setItem('accessToken', newToken.accessToken);
          AsyncStorage.setItem('idToken', newToken.idToken);

          auth0.auth
            .userInfo({ token: newToken.accessToken })
            .then(profile => {
              dispatch(successUserGet());
              const url = config.server + '/api/users/duplicate-auth0';
              const email = profile.email;
              const data = { email };

              fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: newToken.idToken
                }
              })
                .then(r => r.json())
                .catch(error => {
                  console.log('AuthorizeActionError:', error);
                  dispatch(noUserGet());
                })
                .then(response => {
                  if (response && response.user) {
                    dispatch(successUserGet());
                    const userInfo = response.user || {};

                    AsyncStorage.setItem('userId', userInfo._id);
                    AsyncStorage.setItem('email', userInfo.email);

                    dispatch(globalActions.showNotificationSuccess());
                    dispatch(login(userInfo.email, userInfo));

                    getNotifications().then(data => dispatch(setList(data)));

                    const resetAction = NavigationActions.navigate({
                      routeName: 'Notifications'
                    });
                    dispatch(resetAction);
                  } else {
                    dispatch(noUserGet());
                  }
                });
            })
            .catch(error => {
              console.log('AuthorizeActionError:', error);
              dispatch(noUserGet());
            });
        });
      })
      .catch(error => {
        console.log('AuthorizeActionError:', error);
        dispatch(noUserGet());
      });
  };
};

export const dbSignUp = (email, password) => {
  return (dispatch, getState) => {
    dispatch(globalActions.showLoading());

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
          dispatch(globalActions.hideLoading());
        } else {
          alert('Sorry, there was a sign up error');
          dispatch(globalActions.hideLoading());
        }
      })
      .catch(error => {
        console.log('AuthorizeActionError:', error);
        dispatch(globalActions.hideLoading());
      });
  };
};

export const dbLogout = () => {
  return (dispatch, getState) => {
    dispatch(logout());
    AsyncStorage.clear();
    const resetAction = NavigationActions.navigate({ routeName: 'Login' });
    dispatch(resetAction);
  };
};

const login = (email, profile) => {
  return { type: types.LOGIN, payload: { email, profile } };
};

const logout = () => {
  return { type: types.LOGOUT };
};

export const getUserId = (userId, email) => {
  return {
    type: types.GET_USER_ID,
    payload: { userId, email }
  };
};

const wrongCredentials = () => {
  return { type: types.WRONG_CREDENTIALS };
};

const currentCredentials = () => {
  return { type: types.CURRENT_CREDENTIALS };
};

const noUserGet = () => {
  return { type: types.NO_USER_GET };
};

const successUserGet = () => {
  return { type: types.SUCCESS_USER_GET };
};

import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { refresh } from 'src/api/refreshTokenAPI';
import config from 'src/config';
import * as types from 'src/constants/actionTypes';

const getToken = () => AsyncStorage.getItem('idToken');
const getEmail = () => AsyncStorage.getItem('email');

export const dbGetProfile = () => {
  return (dispatch, getState) => {
    getEmail().then(email => {
      refresh().then(newToken => {
        console.log('dbGetProfile');

        let url = config.server + '/api/users/duplicate-auth0';
        let data = { email };

        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: newToken.idToken
          }
        })
        .then(r => r.json())
        .catch(error => console.log('Error: ', error))
        .then(response => {
          let userInfo = response.user || {};
          dispatch(addProfile(response.user.email, userInfo));
        });
      });
    });
  };
};

export const dbGetUserInfo = userId => {
  return (dispatch, getState) => {
    console.log('dbGetUserInfoDone');

    if (userId) {
      getToken().then(token => {
        let url = config.server + '/api/users/profile/' + userId;

        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        })
          .then(r => r.json())
          .catch(error => console.log('Error: ', error))
          .then(response => {
            let userInfo = response.user || {};
            dispatch(addUserInfo(userId, userInfo));
          });
      });
    } else {
      console.error('Error: userId is required!!!');
    }
  };
};

export const dbUpdateUser = (data, i) => {
  return (dispatch, getState) => {
    console.log('dbUpdateUser');

    refresh().then(newToken => {
      let url = config.server + '/api/users/';

      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: newToken.idToken
        }
      })
        .then(r => r.json())
        .catch(error => console.log('Error: ', error))
        .then(response => {
          console.log('ffff2222', data);
          dispatch(addProfile(data.email, data));
        });
    });
  };
};

export const addProfile = (email, info) => {
  return {
    type: types.ADD_PROFILE,
    payload: { email, info }
  };
};

export const addUserInfo = (email, info) => {
  return {
    type: types.ADD_PROFILE,
    payload: { email, info }
  };
};

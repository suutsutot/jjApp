import {refresh} from 'app/api/refreshTokenAPI';
import config from 'app/config';
import types from 'app/constants/actionTypes';

export const dbGetNotifies = () => {
  return (dispatch, getState) => {
    refresh().then((newToken) => {
      if (newToken && newToken.idToken) {
        console.log('dbGetNotifies');
        
        let url = config.server + '/api/notifications';
        
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': newToken.idToken
          }
        })
        .then(r => r.json())
        .catch(error => console.log('Error notifications:', error))
        .then(response => {
          let notifications = response || {};
          dispatch(setList(notifications))
        });
      }
    });
  }
};

export const setList = payload => ({
  type: types.NOTIFICATIONS.SET_LIST,
  payload
});


export const fetchList = () => ({
  type: types.NOTIFICATIONS.FETCH_LIST,
});

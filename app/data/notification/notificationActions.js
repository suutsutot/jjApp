import {refresh} from 'app/api/refreshTokenAPI';
import config from 'app/config';
import * as types from 'app/constants/actionTypes'


export const dbGetNotifies = () => {
    return (dispatch, getState) => {
        refresh().then((newToken) => {
            console.log('dbGetNotifies token', newToken);

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
                    console.log('notifications111', response);
                    dispatch(addNotifyList(notifications))
                });
        });
    }
};


export const addNotifyList = (userNotifies) => {

    return {
        type: types.ADD_NOTIFY_LIST,
        payload: userNotifies
    }
};

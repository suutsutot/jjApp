import {AsyncStorage} from 'react-native';
const getToken = () => AsyncStorage.getItem("idToken");
const refreshToken = () => AsyncStorage.getItem("refreshToken");
const getUserId = () => AsyncStorage.getItem("userId");

import Auth0 from 'react-native-auth0';
let credentials = require('../config/auth0-credentials');
const auth0 = new Auth0(credentials);

import * as types from './../constants/actionTypes'

export const dbGetEventsList = () => {
    return (dispatch, getState) => {
        getUserId().then((userId) => {
            refresh((newToken) => {
                console.log('dbGetEventsList token', newToken);

                let url = 'http://justjoin1.ru/public-api/' + userId +'/getEvents';
                // let url = 'http://10.8.0.10:3000/api/events/joinedEvents';
                // let url = 'http://justjoin1.ru/api/events/joinedEvents';

                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': newToken.idToken
                    }
                })
                    .then(r => r.json())
                    .catch(error => console.log('Error: ', error))
                    .then(response => {
                        let eventsList = response || {};
                        console.log('eventsList', response);
                        dispatch(addUserEventsListInfo(userId, eventsList))
                    });
            });
        });
    }
};


export const addUserEventsListInfo = (uid, info) => {
    return {
        type: types.ADD_USER_EVENTS_LIST_INFO,
        payload: {uid, info}
    }
};


function refresh(callback) {
    refreshToken().then((refreshToken) => {
        auth0
            .auth
            .refreshToken({refreshToken: refreshToken})
            .then(refreshUser => {
                callback(refreshUser);
            })
            .catch(error => {
                console.error('Error: ', error)
            });
    });
}

import {AsyncStorage} from 'react-native';
const getUserId = () => AsyncStorage.getItem("userId");

import {refresh} from 'app/api/refreshTokenAPI'
import config from 'app/config';
import * as types from 'app/constants/actionTypes'

export const dbGetEventsList = () => {
    return (dispatch, getState) => {
        getUserId().then((userId) => {
            refresh().then((newToken) => {
                console.log('dbGetEventsList');

                // let url = config.server + '/public-api/' + userId +'/getEvents';
                // let url = 'http://10.8.0.10:3000/api/events/joinedEvents';
                let url = config.server + '/api/events/joinedEvents';

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
                        dispatch(addUserEventsListInfo(userId, eventsList))
                    });
            })
        })
    }
};


export const addUserEventsListInfo = (uid, info) => {
    return {
        type: types.ADD_USER_EVENTS_LIST_INFO,
        payload: {uid, info}
    }
};

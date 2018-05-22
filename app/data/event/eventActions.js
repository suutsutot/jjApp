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

export const dbGetRecommendedEvents = () => {
    return (dispatch, getState) => {
        getUserId().then((userId) => {
            refresh().then((newToken) => {
                console.log('dbGetRecommendedEvents');

                let url = config.server + '/api/events/recommendedEvents';

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
                        dispatch(addRecommenedEvents(userId, eventsList))
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

export const addRecommenedEvents = (uid, info) => {
    return {
        type: types.ADD_RECOMMENDED_EVENTS,
        payload: {uid, info}
    }
};

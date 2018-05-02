import {AsyncStorage} from 'react-native';
const getToken = () => AsyncStorage.getItem("idToken");
const refreshToken = () => AsyncStorage.getItem("refreshToken");
const getUserId = () => AsyncStorage.getItem("userId");

// Auth0
import Auth0 from 'react-native-auth0';
let credentials = require('../config/auth0-credentials');
const auth0 = new Auth0(credentials);

// - Import action types
import * as types from './../constants/actionTypes'

/* _____________ CRUD DB _____________ */

// - Get user`s events list from database
export const dbGetEventsList = () => {
    return (dispatch, getState) => {
        getUserId().then((userId) => {
            refresh((newToken) => {
                console.log('dbGetEventsList token', newToken);

                let url = 'http://justjoin1.ru/public-api/' + userId +'/getEvents';

                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': newToken.idToken
                    }
                }).then(res => {
                    return res.json();
                })
                    .catch(error => console.log('Error: ', error))
                    .then(response => {
                        let eventsList = response || {};
                        console.log('eventsList', response);
                        dispatch(addUserEventsListInfo(userId, eventsList))
                    });
            });
        });




        // let uid = getState().authorize.userId;
        // if (uid) {
        //     getToken().then((token) => {
        //         console.log('dbGetEventsList token', token);
        //
        //         // let email = uid;
        //         let url = 'http://justjoin1.ru/api/events/joinedEvents';
        //         // let data = {email};
        //
        //         fetch(url, {
        //             method: 'GET',
        //             // body: JSON.stringify(data),
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': token
        //             }
        //         }).then(res => {
        //             return res.json();
        //         })
        //             .catch(error => console.log('Error: ', error))
        //             .then(response => {
        //                 let eventsList = response || {};
        //                 console.log('responseNEW', response);
        //                 dispatch(addUserEventsListInfo(uid, eventsList))
        //             });
        //     });
        // }
    }
};

/* _____________ CRUD State _____________ */

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
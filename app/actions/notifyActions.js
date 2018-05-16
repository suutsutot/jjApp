// import {AsyncStorage} from 'react-native';
// const refreshToken = () => AsyncStorage.getItem("refreshToken");
// const getUserId = () => AsyncStorage.getItem("userId");
//
// import Auth0 from 'react-native-auth0';
// let credentials = require('../config/auth0-credentials');
// const auth0 = new Auth0(credentials);
//
// import * as types from './../constants/actionTypes'
//
//
// export const dbGetNotifies = () => {
//     return (dispatch, getState) => {
//         refresh((newToken) => {
//             console.log('dbGetNotifies token', newToken);
//
//             getUserId().then((userId) => {
//
//                 let url = 'http://justjoin1.ru/public-api/'+ userId +'/getNotifications';
//
//                 fetch(url, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': newToken.idToken
//                     }
//                 })
//                     .then(r => r.json())
//                     .catch(error => console.log('Error notifications:', error))
//                     .then(response => {
//                         let notifications = response || {};
//                         console.log('notifications111', response);
//                         dispatch(addNotifyList(notifications))
//                     });
//             });
//         });
//     }
// };
//
//
// export const addNotifyList = (userNotifies) => {
//
//     return {
//         type: types.ADD_NOTIFY_LIST,
//         payload: userNotifies
//     }
// };
//
//
// function refresh(callback) {
//     refreshToken().then((refreshToken) => {
//         auth0
//             .auth
//             .refreshToken({refreshToken: refreshToken})
//             .then(refreshUser => {
//                 callback(refreshUser);
//             })
//             .catch(error => {
//                 console.error('Error: ', error)
//             });
//     });
// }

// import {AsyncStorage} from 'react-native';
// const getToken = () => AsyncStorage.getItem("idToken");
// const getEmail = () => AsyncStorage.getItem("email");
//
// import * as types from './../constants/actionTypes'
//
// export const dbGetProfile = () => {
//     return (dispatch, getState) => {
//         if (getState().authorize.email) {
//             let email = getState().authorize.email;
//             getToken().then((token) => {
//                 console.log('dbGetProfile token', token);
//
//                 let url = 'http://justjoin1.ru/api/users/duplicate-auth0';
//                 let data = {email};
//
//                 fetch(url, {
//                     method: 'POST',
//                     body: JSON.stringify(data),
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': token
//                     }
//                 })
//                     .then(r => r.json())
//                     .catch(error => console.log('Error: ', error))
//                     .then(response => {
//                         let userInfo = response.user || {};
//                         console.log('userInfo111', response.user);
//
//                         AsyncStorage.setItem('userId', response.user._id);
//                         AsyncStorage.setItem('email', response.user.email);
//                         dispatch(addProfile(response.user.email, userInfo))
//                     });
//             });
//         }
//         else {
//             getEmail().then((email) => {
//                 getToken().then((token) => {
//                     console.log('dbGetProfile token', token);
//
//                     let url = 'http://justjoin1.ru/api/users/duplicate-auth0';
//                     let data = {email};
//
//                     console.log('emailemail', email);
//
//                     fetch(url, {
//                         method: 'POST',
//                         body: JSON.stringify(data),
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': token
//                         }
//                     })
//                         .then(r => r.json())
//                         .catch(error => console.log('Error: ', error))
//                         .then(response => {
//                             let userInfo = response.user || {};
//                             console.log('userInfo222', response);
//
//                             AsyncStorage.setItem('userId', response.user._id);
//                             AsyncStorage.setItem('email', response.user.email);
//                             dispatch(addProfile(response.user.email, userInfo))
//                         });
//                 });
//             });
//         }
//     }
// };
//
// export const dbGetUserInfo = (userId) => {
//     return (dispatch, getState) => {
//         console.log('dbGetUserInfoDone', userId);
//
//         if (userId) {
//             getToken().then((token) => {
//                 console.log('token', token);
//
//                 let url = 'http://justjoin1.ru/api/users/profile/' + userId;
//
//                 fetch(url, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': token
//                     }
//                 })
//                     .then(r => r.json())
//                     .catch(error => console.log('Error: ', error))
//                     .then(response => {
//                         let userInfo = response.user || {};
//                         dispatch(addUserInfo(userId, userInfo))
//                     });
//             });
//         }
//         else {
//             console.error('Error: userId is required!!!')
//         }
//     }
// };
//
// export const addProfile = (email, info) => {
//     return {
//         type: types.ADD_PROFILE,
//         payload: {email, info}
//     }
// };
//
// export const addUserInfo = (email, info) => {
//     return {
//         type: types.ADD_PROFILE,
//         payload: {email, info}
//     }
// };

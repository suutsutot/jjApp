// - Import react components
import {AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation'

// Auth0
import Auth0 from 'react-native-auth0';
let credentials = require('../config/auth0-credentials');
const auth0 = new Auth0(credentials);

// - Import action types
import * as types from './../constants/actionTypes'

// - Import actions
import * as globalActions from './globalActions'

/* _____________ CRUD DB _____________ */

export let dbLogin = () => {
    return (dispatch, getState) => {
        console.log('start login');
        dispatch(globalActions.showLoading());

        // get tokens from Auth0
        auth0.webAuth
            .authorize({
                // connection: 'google-oauth2',
                scope: 'openid email profile offline_access',
                audience: 'https://' + credentials.domain + '/userinfo',
                // responseType: 'id_token',
            })
            .then(credentials => {
                console.log('credentials123', credentials);

                refreshToken(credentials, (newToken) => {
                    // setItem to AsyncStorage
                    AsyncStorage.setItem('refreshToken', credentials.refreshToken);
                    AsyncStorage.setItem('accessToken', newToken.accessToken);
                    AsyncStorage.setItem('idToken', newToken.idToken);

                    // get user profile from Auth0
                    auth0.auth
                        .userInfo({token: newToken.accessToken})
                        .then(profile => {
                            console.log('profile', profile);
                            console.log('Success auth!');
                            dispatch(globalActions.showNotificationSuccess());
                            dispatch(login(profile.email));
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({routeName: 'Tabs'})
                                ]
                            });
                            dispatch(resetAction);
                            dispatch(globalActions.hideLoading());
                        })
                        .catch(error => {
                            dispatch(globalActions.hideLoading());
                            dispatch(globalActions.showErrorMessageWithTimeout(error.code));
                        });
                });
            })
            .catch(error => console.error('Error: ', error));
    }
};

export let dbLogout = () => {
    return (dispatch, getState) => {
        dispatch(logout());
        AsyncStorage.clear();
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Login'})
            ]
        });
        dispatch(resetAction)
    }
};

/**
 * Register user in database
 * @param {object} user
 */
export var dbSignup = (user) => {
    return (dispatch, getState) => {
        dispatch(globalActions.showNotificationRequest())
        return firebaseAuth().createUserWithEmailAndPassword(user.email, user.password).then((signupResult) => {
            firebaseRef.child(`users/${signupResult.uid}/info`).set({
                ...user,
                avatar: 'noImage'
            }).then((result) => {

                dispatch(globalActions.showNotificationSuccess())

            }, (error) => dispatch(globalActions.showErrorMessageWithTimeout(error.code)))

            dispatch(signup({
                uid: signupResult.uid,
                ...user
            }))
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Tabs'})
                ]
            })
            dispatch(resetAction)
        }, (error) => dispatch(globalActions.showErrorMessageWithTimeout(error.code)))
    }

};

/**
 * Change user's password
 * @param {string} newPassword
 */
export const dbUpdatePassword = (newPassword) => {
    return (dispatch, getState) => {
        dispatch(globalActions.showNotificationRequest())
        firebaseAuth().onAuthStateChanged((user) => {
            if (user) {

                user.updatePassword(newPassword).then(() => {
                    // Update successful.
                    dispatch(globalActions.showNotificationSuccess())
                    dispatch(updatePassword())
                    // TODO: Change to home page
                }, (error) => {
                    // An error happened.
                    switch (error.code) {
                        case 'auth/requires-recent-login':
                            dispatch(globalActions.showErrorMessageWithTimeout(error.code))
                            dispatch(dbLogout())
                            break;
                        default:

                    }
                })
            }

        })
    }
};

/* _____________ CRUD State _____________ */

export let login = (email) => {
    return {type: types.LOGIN, authed: true, email}
};

export let logout = () => {
    return {type: types.LOGOUT}
};

export const getUserId = (userId, email) => {
    return {
        type: types.GET_USER_ID,
        payload: {userId, email}
    }
};

export var signup = (user) => {
    return {
        type: types.SIGNUP,
        ...user
    }

};

/**
 * Update user's password
 */
export const updatePassword = () => {
    return {type: types.UPDATE_PASSWORD}
};

function refreshToken(user, callback) {

    if (!user.refreshToken) return callback(null);

    auth0
        .auth
        .refreshToken({refreshToken: user.refreshToken})
        .then(refreshUser => {
            callback(refreshUser);
        })
        .catch(error => {
            console.error('Error: ', error)
        });
}

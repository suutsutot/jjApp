import {AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation'
import Auth0 from 'react-native-auth0';
let credentials = require('app/config/auth0-credentials');
const auth0 = new Auth0(credentials);
import {getNotifications} from 'app/api/NotificationsAPI';
import {refreshByCredentials} from 'app/api/refreshTokenAPI'
import config from 'app/config';
import * as types from 'app/constants/actionTypes'
import * as globalActions from 'app/data/global/globalActions'

export let dbLogin = () => {
    return (dispatch, getState) => {
        dispatch(globalActions.showLoading());

        auth0.webAuth
            .authorize({
                scope: 'openid email profile offline_access',
                audience: 'https://' + credentials.domain + '/userinfo'
            })
            .then(credentials => {
                AsyncStorage.setItem('refreshToken', credentials.refreshToken);

                refreshByCredentials(credentials).then((newToken) => {
                    AsyncStorage.setItem('accessToken', newToken.accessToken);
                    AsyncStorage.setItem('idToken', newToken.idToken);

                    auth0.auth
                        .userInfo({token: newToken.accessToken})
                        .then(profile => {

                            let url = config.server + '/api/users/duplicate-auth0';
                            let email = profile.email;
                            let data = {email};

                            fetch(url, {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': newToken.idToken
                                }
                            })
                                .then(r => r.json())
                                .catch(error => {
                                    console.log('AuthorizeActionError:', error);
                                    dispatch(globalActions.hideLoading());
                                    dispatch(globalActions.showErrorMessageWithTimeout(error.code));
                                })
                                .then(response => {
                                    let userInfo = response.user || {};

                                    AsyncStorage.setItem('userId', userInfo._id);
                                    AsyncStorage.setItem('email', userInfo.email);

                                    dispatch(globalActions.showNotificationSuccess());
                                    dispatch(login(userInfo.email, userInfo));

                                    getNotifications().then((data) => {
                                        dispatch(updateNotifications(data));
                                    });

                                    let resetAction;

                                    // if (!userInfo.wizardSteps.personal || !userInfo.wizardSteps.activities) {
                                        resetAction = NavigationActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({routeName: 'Wizard'})
                                            ]
                                        });
                                    // }
                                    // else {
                                    //     resetAction = NavigationActions.reset({
                                    //         index: 0,
                                    //         actions: [
                                    //             NavigationActions.navigate({routeName: 'Tabs'})
                                    //         ]
                                    //     });
                                    // }
                                    dispatch(resetAction);
                                    dispatch(globalActions.hideLoading());

                                });
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

export let login = (email, user) => {
    return {type: types.LOGIN, email, profile: user}
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

const updateNotifications = payload => ({
    type: 'UPDATE_NOTIFICATIONS',
    payload
});
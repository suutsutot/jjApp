import {AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Auth0 from 'react-native-auth0';
let credentials = require('app/config/auth0-credentials');
const auth0 = new Auth0(credentials);
import {getNotifications} from 'app/api/NotificationsAPI';
import {refreshByCredentials} from 'app/api/refreshTokenAPI';
import config from 'app/config';
import * as types from 'app/constants/actionTypes';
import * as globalActions from 'app/data/global/globalActions';

export let dbLoginWithCredentials = (email, password) => {
    return (dispatch, getState) => {
        dispatch(globalActions.showLoading());

        auth0
            .auth
            .passwordRealm({
                username: email,
                password: password,
                realm: "Username-Password-Authentication",
                scope: 'openid offline_access',
            })
            .then(credentials => {
                dispatch(currentCredentials());
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
                                    dispatch(noUserGet());
                                    dispatch(globalActions.hideLoading());
                                    dispatch(globalActions.showErrorMessageWithTimeout(error.code));
                                })
                                .then(response => {
                                    if (response && response.user) {
                                        dispatch(successUserGet());
                                        let userInfo = response.user || {};

                                        AsyncStorage.setItem('userId', userInfo._id);
                                        AsyncStorage.setItem('email', userInfo.email);

                                        dispatch(globalActions.showNotificationSuccess());
                                        dispatch(login(userInfo.email, userInfo));

                                        getNotifications().then((data) => {
                                            dispatch(updateNotifications(data));
                                        });

                                        let resetAction = NavigationActions.navigate({routeName: 'Tabs'});
                                        dispatch(resetAction);
                                        dispatch(globalActions.hideLoading());
                                    }
                                    else {
                                        dispatch(noUserGet());
                                        dispatch(globalActions.hideLoading());
                                    }


                                });
                        })
                        .catch(error => {
                            dispatch(noUserGet());
                            dispatch(globalActions.hideLoading());
                            dispatch(globalActions.showErrorMessageWithTimeout(error.code));
                        });
                });
            })
            .catch(error => {
                console.log('AuthorizeActionError:', error);
                dispatch(wrongCredentials());
                dispatch(globalActions.hideLoading());
            })
    }
};

export let dbLoginViaFacebook = () => {
    return (dispatch, getState) => {
        auth0.webAuth
            .authorize({
                scope: 'openid email profile offline_access',
                audience: 'https://' + credentials.domain + '/userinfo',
                connection: 'facebook'
            })
            .then(credentials => {
                dispatch(successUserGet());
                AsyncStorage.setItem('refreshToken', credentials.refreshToken);

                refreshByCredentials(credentials).then((newToken) => {
                    AsyncStorage.setItem('accessToken', newToken.accessToken);
                    AsyncStorage.setItem('idToken', newToken.idToken);

                    auth0.auth
                        .userInfo({token: newToken.accessToken})
                        .then(profile => {
                            dispatch(successUserGet());
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
                                    dispatch(noUserGet());
                                })
                                .then(response => {
                                    if (response && response.user) {
                                        dispatch(successUserGet());
                                        let userInfo = response.user || {};

                                        AsyncStorage.setItem('userId', userInfo._id);
                                        AsyncStorage.setItem('email', userInfo.email);

                                        dispatch(globalActions.showNotificationSuccess());
                                        dispatch(login(userInfo.email, userInfo));

                                        getNotifications().then((data) => {
                                            dispatch(updateNotifications(data));
                                        });

                                        let resetAction = NavigationActions.navigate({routeName: 'Tabs'});
                                        dispatch(resetAction);
                                    }
                                    else {
                                        dispatch(noUserGet());
                                    }

                                });
                        })
                        .catch(error => {
                            console.log('AuthorizeActionError:', error);
                            dispatch(noUserGet());
                        });
                });
            })
            .catch(error => {
                console.log('AuthorizeActionError:', error);
                dispatch(noUserGet());
            });
    }
};

export let dbLoginViaGoogle = () => {
    return (dispatch, getState) => {
        auth0.webAuth
            .authorize({
                scope: 'openid email profile offline_access',
                audience: 'https://' + credentials.domain + '/userinfo',
                connection: 'google-oauth2'
            })
            .then(credentials => {
                dispatch(successUserGet());
                AsyncStorage.setItem('refreshToken', credentials.refreshToken);

                refreshByCredentials(credentials).then((newToken) => {
                    AsyncStorage.setItem('accessToken', newToken.accessToken);
                    AsyncStorage.setItem('idToken', newToken.idToken);

                    auth0.auth
                        .userInfo({token: newToken.accessToken})
                        .then(profile => {
                            dispatch(successUserGet());
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
                                    dispatch(noUserGet());
                                })
                                .then(response => {
                                    if (response && response.user) {
                                        dispatch(successUserGet());
                                        let userInfo = response.user || {};

                                        AsyncStorage.setItem('userId', userInfo._id);
                                        AsyncStorage.setItem('email', userInfo.email);

                                        dispatch(globalActions.showNotificationSuccess());
                                        dispatch(login(userInfo.email, userInfo));

                                        getNotifications().then((data) => {
                                            dispatch(updateNotifications(data));
                                        });

                                        let resetAction = NavigationActions.navigate({routeName: 'Tabs'});
                                        dispatch(resetAction);
                                    }
                                    else {
                                        dispatch(noUserGet());
                                    }
                                });
                        })
                        .catch(error => {
                            console.log('AuthorizeActionError:', error);
                            dispatch(noUserGet());
                        });
                });
            })
            .catch(error => {
                console.log('AuthorizeActionError:', error);
                dispatch(noUserGet());
            });
    }
};

export let dbSignUp = (email, password) => {
    return (dispatch, getState) => {
        dispatch(globalActions.showLoading());


        let url = 'https://ynpl.auth0.com/dbconnections/signup';
        let data = {
            "client_id": "BBLp6dT9ug1mxY5UI3xwld6cA3Ukn8aH",
            "email": email,
            "password": password,
            "connection": "Username-Password-Authentication"
        };

        return fetch(url,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(r => r.json())
            .then((responseData) => {
                if (responseData) {
                    console.log('responseData', responseData);
                    let resetAction = NavigationActions.navigate({routeName: 'Login'});
                    dispatch(resetAction);
                    alert("Successfully! Please log in");
                    dispatch(globalActions.hideLoading());
                }
                else {
                    alert("Sorry, there was a sign up error");
                    dispatch(globalActions.hideLoading());
                }
            })
            .catch((error) => {
                console.log('AuthorizeActionError:', error);
                dispatch(globalActions.hideLoading());
            })
    }
};

export let dbLogout = () => {
    return (dispatch, getState) => {
        dispatch(logout());
        AsyncStorage.clear();
        const resetAction = NavigationActions.navigate({routeName: 'Login'});
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

export let wrongCredentials = () => {
    return {type: types.WRONG_CREDENTIALS}
};

export let currentCredentials = () => {
    return {type: types.CURRENT_CREDENTIALS}
};

export let noUserGet = () => {
    return {type: types.NO_USER_GET}
};

export let successUserGet = () => {
    return {type: types.SUCCESS_USER_GET}
};

const updateNotifications = payload => ({
    type: types.UPDATE_NOTIFICATIONS,
    payload
});

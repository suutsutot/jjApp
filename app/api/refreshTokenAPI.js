import {AsyncStorage} from 'react-native';
const refreshToken = () => AsyncStorage.getItem("refreshToken");

import Auth0 from 'react-native-auth0';
let credentials = require('./../config/auth0-credentials');
const auth0 = new Auth0(credentials);

const refresh = () => {
    return refreshToken().then((refreshToken) => {
        auth0
            .auth
            .refreshToken({refreshToken: refreshToken})
            .then(refreshUser => {
                return refreshUser;
            })
            .catch(error => {
                console.error('Error: ', error)
            });
    });
};

export default refresh;

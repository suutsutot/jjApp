import {AsyncStorage} from 'react-native';
const refreshToken = () => AsyncStorage.getItem("refreshToken");
import Auth0 from 'react-native-auth0';
let credentials = require('./../config/auth0-credentials');
const auth0 = new Auth0(credentials);

export const refresh = () => {
    return new Promise((resolve, reject) => {
        refreshToken().then((refreshToken) => {
            if (!refreshToken) resolve(null);
            else
                auth0
                    .auth
                    .refreshToken({refreshToken: refreshToken})
                    .then(refreshUser => {
                        resolve(refreshUser);
                    })
                    .catch(error => {
                        console.error('Error: ', error);
                        reject(error);
                    });
        });
    });
};

export const refreshByCredentials = (user) => {
    return new Promise((resolve, reject) => {
        if (!user.refreshToken) resolve(null);

        auth0
            .auth
            .refreshToken({refreshToken: user.refreshToken})
            .then(refreshUser => {
                resolve(refreshUser);
            })
            .catch(error => {
                console.error('Error: ', error)
            });
    });
};

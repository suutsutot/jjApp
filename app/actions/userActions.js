import {AsyncStorage} from 'react-native';
const getToken = () => AsyncStorage.getItem("idToken");
const getEmail = () => AsyncStorage.getItem("email");

// - Import action types
import * as types from './../constants/actionTypes'


/* _____________ CRUD DB _____________ */

// - Get profile after login
export const dbGetProfile = () => {
    return (dispatch, getState) => {
        if (getState().authorize.email) {
            let email = getState().authorize.email;
            getToken().then((token) => {
                console.log('dbGetProfile token', token);

                let url = 'http://justjoin1.ru/api/users/duplicate-auth0';
                let data = {email};

                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).then(res => {
                    return res.json();
                })
                    .catch(error => console.log('Error: ', error))
                    .then(response => {
                        let userInfo = response.user || {};
                        console.log('userInfo111', response.user);

                        // setItem to AsyncStorage
                        AsyncStorage.setItem('userId', response.user._id);
                        AsyncStorage.setItem('email', response.user.email);
                        dispatch(addProfile(response.user.email, userInfo))
                    });
            });
        }
        else {
            getEmail().then((email) => {
                getToken().then((token) => {
                    console.log('dbGetProfile token', token);

                    let url = 'http://justjoin1.ru/api/users/duplicate-auth0';
                    let data = {email};

                    console.log('emailemail', email);

                    fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    }).then(res => {
                        return res.json();
                    })
                        .catch(error => console.log('Error: ', error))
                        .then(response => {
                            let userInfo = response.user || {};
                            console.log('userInfo222', response);

                            // setItem to AsyncStorage
                            AsyncStorage.setItem('userId', response.user._id);
                            AsyncStorage.setItem('email', response.user.email);
                            dispatch(addProfile(response.user.email, userInfo))
                        });
                });
            });
        }
    }
};

// - Get user info from database
export const dbGetUserInfo = (userId) => {
    return (dispatch, getState) => {
        console.log('dbGetUserInfoDone', userId);

        if (userId) {
            getToken().then((token) => {
                console.log('token', token);

                let url = 'http://justjoin1.ru/api/users/profile/' + userId;

                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
                    .then(res => {
                        return res.json()
                    })
                    .catch(error => console.log('Error: ', error))
                    .then(response => {
                        let userInfo = response.user || {};
                        dispatch(addUserInfo(userId, userInfo))
                    });
            });
        }
        else {
            console.error('Error: userId is required!!!')
        }
    }
};


// ЭТО РЕШЕНИЕ !!!!
export const dbGetUserInfoByUserId = (uid, sw) => {
    return (dispatch, getState) => {
        if (uid) {
            var userInfoRef = firebaseRef.child(`users/${uid}/info`);

            return userInfoRef.once('value').then((snapshot) => {
                var userInfo = snapshot.val() || {};
                dispatch(addUserInfo(uid, userInfo))
                switch (sw) {
                    case 'header':
                        dispatch(globalActions.setHeaderTitle(userInfo.fullName))

                        break;

                    default:
                        break;
                }
            }, error => console.log(error));

        }
    }
}

export const dbUpdateUserInfo = (newInfo) => {
    return (dispatch, getState) => {

        // Get current user id
        var uid = getState().authorize.uid

        // Write the new data simultaneously in the list
        let updates = {};
        let info = getState().user.info[uid]
        let updatedInfo = {
            avatar: newInfo.avatar || info.avatar,
            email: newInfo.email || info.email,
            fullName: newInfo.fullName || info.fullName,
            tagLine: newInfo.tagLine || info.tagLine,
            birthday: newInfo.birthday || info.birthday
        }
        updates[`users/${uid}/info`] = updatedInfo
        return firebaseRef.update(updates).then((result) => {

            dispatch(updateUserInfo(uid, updatedInfo))
            dispatch(globalActions.closeEditProfile())
        }, (error) => {
            dispatch(globalActions.showErrorMessage(error.message))
        })
    }

}

/* _____________ CRUD State _____________ */

// - Set user avatar
export const addProfile = (email, info) => {
    return {
        type: types.ADD_PROFILE,
        payload: {email, info}
    }
};

/**
 * Add user information
 * @param {string} email is the user identifier
 * @param {object} info is the information about user
 */
export const addUserInfo = (email, info) => {
    return {
        type: types.ADD_PROFILE,
        payload: {email, info}
    }
};

/**
 * Update user information
 * @param {string} uid is the user identifier
 * @param {object} info is the information about user
 */
export const updateUserInfo = (uid, info) => {
    return {
        type: types.UPDATE_USER_INFO,
        payload: {uid, info}
    }
}

export const clearAllUsers = () => {
    return {
        type: types.CLEAR_ALL_DATA_USER
    }
}


// export const dbGetUserInfo = () => {
//     return (dispatch, getState) => {
//         console.log('dbGetUserInfoDone');
//         // let uid = getState().authorize.uid;
//         let email = getState().global.email;
//         let userId = getState().global.userId;
//         if (email) {
//             getToken().then((token) => {
//                 console.log('token', token);
//
//                 // let email = uid;
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
//                 }).then(res => {
//                     return res.json();
//                 })
//                     .catch(error => console.log('Error: ', error))
//                     .then(response => {
//                         let userInfo = response.user || {};
//                         // console.log('userInfo111', userInfo);
//                         // setItem to AsyncStorage
//                         AsyncStorage.setItem('isLogin', true);
//                         AsyncStorage.setItem('userId', response.user._id);
//                         AsyncStorage.setItem('email', response.user.email);
//                         dispatch(addUserInfo(userId, userInfo))
//                     });
//             });
//         }
//     }
// };



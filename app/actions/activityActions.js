import keyBy from 'lodash/keyBy'
import filter from 'lodash/filter'

import {AsyncStorage} from 'react-native';
const getToken = () => AsyncStorage.getItem("idToken");

// - Import action types
import * as types from './../constants/actionTypes'

/* _____________ CRUD DB _____________ */

// - Get activities list from database
export const dbGetActivitiesList = () => {
    return (dispatch, getState) => {
        console.log('dbGetActivitiesList')
        // let userId = getState().global.userId;
        // if (userId) {
        //     getToken().then((token) => {
        //         console.log('dbGetActivitiesList token', token);

                let url = 'http://justjoin1.ru/public-api/activities';

                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': token
                    }
                }).then(res => {
                    return res.json();
                })
                    .catch(error => console.log('ErrorActivities: ', error))
                    .then(response => {
                        response = filter(response, function(val){
                            if ( val.id) return val;
                        });
                        response = keyBy(response, 'id');
                        let activityList = response || {};
                        console.log('activityList');
                        dispatch(addActivitiesListInfo(activityList))
                    });
            // });
        // }
    }
};


/* _____________ CRUD State _____________ */

// - Send activities list to state
export const addActivitiesListInfo = (info) => {
    return {
        type: types.GET_ACTIVITIES_LIST_INFO,
        payload: {info}
    }
};




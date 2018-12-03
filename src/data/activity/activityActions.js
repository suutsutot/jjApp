import keyBy from 'lodash/keyBy';
import filter from 'lodash/filter';
import * as types from 'src/constants/actionTypes';
import config from 'src/config';

export const dbGetActivitiesList = () => {
    return (dispatch, getState) => {
        console.log('dbGetActivitiesList');

        let url = config.server + '/public-api/activities';

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(r => r.json())
            .catch(error => console.log('ErrorActivities: ', error))
            .then(response => {
                response = filter(response, function (val) {
                    if (val.id) return val;
                });
                response = keyBy(response, 'id');
                let activityList = response || {};
                dispatch(addActivitiesListInfo(activityList))
            });
    }
};


export const addActivitiesListInfo = (info) => {
    return {
        type: types.GET_ACTIVITIES_LIST_INFO,
        payload: {info}
    }
};

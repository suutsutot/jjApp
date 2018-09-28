import {AsyncStorage} from 'react-native';
const getUserId = () => AsyncStorage.getItem("userId");
import {refresh} from 'app/api/refreshTokenAPI';
import config from 'app/config';
import * as types from 'app/constants/actionTypes';

export const dbJoinEvent = (eventId) =>{
    return (dispatch, getState) => {
        getUserId().then((userId) => {
            refresh().then((newToken) => {
                console.log('joinEvent', eventId);

                let url = config.server + `/api/events/${eventId}/join`,
                    data = {
                        auth0Id: '',
                        calendarId: '',
                        calendarEventId: ''
                    };

                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': newToken.idToken
                    }
                })
                    .then(r => r.json())
                    .catch(error => console.log('Error: ', error))
                    .then(response => {
                        if (response) {
                            console.log(response, 'join_event_resp');
                            let event = response.data || {};
                            dispatch(addJoinEventInfo(userId, event));
                        }
                        else {
                            console.log('Error: dbGetEventsList')
                        }
                    });
            })
        })
    }
};

export const dbGetEventsList = () => {
    return (dispatch, getState) => {
        getUserId().then((userId) => {
            refresh().then((newToken) => {
                console.log('dbGetEventsList');

                let url = config.server + '/api/events/joinedEvents';

                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': newToken.idToken
                    }
                })
                    .then(r => r.json())
                    .catch(error => console.log('Error: ', error))
                    .then(response => {
                        if (response) {
                            let eventsList = response.myEvents || {};
                            let newEventsList = response.invited || {};
                            dispatch(addUserEventsListInfo(userId, eventsList));
                            dispatch(addNewEventsListInfo(userId, newEventsList));
                        }
                        else {
                            console.log('Error: dbGetEventsList')
                        }
                    });
            })
        })
    }
};

export const dbGetRecommendedEvents = () => {
    return (dispatch, getState) => {
        getUserId().then((userId) => {
            refresh().then((newToken) => {
                console.log('dbGetRecommendedEvents');

                let url = config.server + '/api/events/recommendedEvents';

                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': newToken.idToken
                    }
                })
                    .then(r => r.json())
                    .catch(error => console.log('Error: ', error))
                    .then(response => {
                        let eventsList = response.recommended || {};
                        dispatch(addRecommenedEvents(userId, eventsList))
                    });
            })
        })
    }
};


export const addUserEventsListInfo = (uid, info) => {
    return {
        type: types.ADD_USER_EVENTS_LIST_INFO,
        payload: {uid, info}
    }
};

export const addNewEventsListInfo = (uid, info) => {
    return {
        type: types.ADD_NEW_EVENTS,
        payload: {uid, info}
    }
};

export const addRecommenedEvents = (uid, info) => {
    return {
        type: types.ADD_RECOMMENDED_EVENTS,
        payload: {uid, info}
    }
};

export const addJoinEventInfo = (uid, info) => {
    return {
        type: types.JOIN_EVENT,
        payload: {uid, info}
    }
};

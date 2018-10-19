import { AsyncStorage } from 'react-native';
const getUserId = () => AsyncStorage.getItem('userId');
import { refresh } from 'app/api/refreshTokenAPI';
import config from 'app/config';
import types from 'app/constants/actionTypes';

export const dbGetEventsList = () => {
  return (dispatch, getState) => {
    getUserId().then(userId => {
      refresh().then(newToken => {
        console.log('dbGetEventsList');

        let url = config.server + '/api/events/joinedEvents';

        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: newToken.idToken
          }
        })
          .then(r => r.json())
          .catch(error => console.log('Error: ', error))
          .then(response => {
            if (response) {
              let eventsList = response.joined || {};
              let newEventsList = response.requested || {};
              dispatch(addUserEventsListInfo(userId, eventsList));
              dispatch(addNewEventsListInfo(userId, newEventsList));
            } else {
              console.log('Error: dbGetEventsList');
            }
          });
      });
    });
  };
};

export const dbGetRecommendedEvents = () => {
  return (dispatch, getState) => {
    getUserId().then(userId => {
      refresh().then(newToken => {
        console.log('dbGetRecommendedEvents');

        let url = config.server + '/api/events/recommendedEvents';

        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: newToken.idToken
          }
        })
          .then(r => r.json())
          .catch(error => console.log('Error: ', error))
          .then(response => {
            let eventsList = response.recommended || {};
            dispatch(addRecommenedEvents(userId, eventsList));
          });
      });
    });
  };
};

export const addUserEventsListInfo = (uid, info) => {
  return {
    type: types.EVENTS.ADD_USER_EVENTS_LIST_INFO,
    payload: { uid, info }
  };
};

export const addNewEventsListInfo = (uid, info) => {
  return {
    type: types.EVENTS.ADD_NEW_EVENTS,
    payload: { uid, info }
  };
};

export const addRecommenedEvents = (uid, info) => {
  return {
    type: types.EVENTS.ADD_RECOMMENDED_EVENTS,
    payload: { uid, info }
  };
};

export const joinEventRequest = id => {
  return {
    type: types.EVENTS.JOIN_EVENT_REQUEST,
    payload: { id }
  };
};

export const rejectEventRequest = id => {
  return {
    type: types.EVENTS.REJECT_EVENT_REQUEST,
    payload: { id }
  };
};

export const joinEventSuccess = response => {
  return {
    type: types.EVENTS.JOIN_EVENT_SUCCESS,
    payload: response
  };
};

export const joinEventError = response => {
  return {
    type: types.EVENTS.JOIN_EVENT_ERROR,
    payload: response
  };
};

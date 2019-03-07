import { AsyncStorage } from 'react-native';
const getUserId = () => AsyncStorage.getItem('userId');
import { refresh } from 'src/api/refreshTokenAPI';
import config from 'src/config';
import types from 'src/constants/actionTypes';

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
            dispatch(addRecommendedEvents(userId, eventsList));
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

export const addRecommendedEvents = (uid, info) => {
  return {
    type: types.EVENTS.ADD_RECOMMENDED_EVENTS,
    payload: { uid, info }
  };
};

export const rejectEventRequest = (id, notificationId) => {
  return {
    type: types.EVENTS.REJECT_EVENT_REQUEST,
    payload: { id, notificationId }
  };
};

export const rejectEventSuccess = (response, notificationId) => {
  return {
    type: types.EVENTS.REJECT_EVENT_SUCCESS,
    payload: { response, notificationId }
  };
};

export const rejectEventError = (error, notificationId) => {
  return {
    type: types.EVENTS.REJECT_EVENT_ERROR,
    payload: { error, notificationId }
  };
};

export const joinEventRequest = (id, notificationId) => {
  return {
    type: types.EVENTS.JOIN_EVENT_REQUEST,
    payload: { id, notificationId }
  };
};

export const joinEventSuccess = (response, notificationId) => {
  return {
    type: types.EVENTS.JOIN_EVENT_SUCCESS,
    payload: { response, notificationId }
  };
};

export const joinEventError = (error, notificationId) => {
  return {
    type: types.EVENTS.JOIN_EVENT_ERROR,
    payload: { error, notificationId }
  };
};

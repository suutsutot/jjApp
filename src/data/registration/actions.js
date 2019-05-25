import { indexBy, map, prop } from 'ramda';

import types from 'src/constants/actionTypes';
import { getActivities, putPersonalData } from 'src/api/registrationApi';

export const fetchActivities = () => async dispatch => {
  dispatch(fetchActivitiesRequest());
  const activities = await getActivities();
  const { error } = activities;

  if (!error) {
    const list = map(x => x.id, activities);
    const data = indexBy(prop('id'), activities);

    dispatch(fetchActivitiesSuccess(list, data));
  } else {
    dispatch(fetchActivitiesError('error'));
  }
};

export const postPersonalData = personalDataForm => async dispatch => {
  try {
    const responseData = await putPersonalData(personalDataForm);
  } catch (error) {
    console.log('Error:', error);
  }
};

const fetchActivitiesRequest = () => {
  return {
    type: types.REGISTRATION.FETCH_ACTIVITIES_REQUEST
  };
};

const fetchActivitiesSuccess = (list, data) => {
  return {
    type: types.REGISTRATION.FETCH_ACTIVITIES_SUCCESS,
    payload: {
      list,
      data
    }
  };
};

const fetchActivitiesError = payload => {
  return {
    type: types.REGISTRATION.FETCH_ACTIVITIES_REQUEST,
    payload
  };
};

const setUserCredentialsInfo = payload => {
  return {
    type: types.REGISTRATION.CREDENTIALS_INFO,
    payload
  };
};

export const changeField = (formId, fields) => {
  return {
    type: types.REGISTRATION.CHANGE_FIELD,
    payload: { formId, fields }
  };
};

export const validateField = (validationId, fields) => {
  return {
    type: types.REGISTRATION.VALIDATE_FIELD,
    payload: { validationId, fields }
  };
};

export const changeTabIndex = payload => {
  return {
    type: types.REGISTRATION.CHANGE_TAB_INDEX,
    payload
  };
};

export const toggleActivity = payload => {
  return {
    type: types.REGISTRATION.TOGGLE_ACTIVITY,
    payload
  };
};

// const signUpError = (errorType, error = {}) => {
//   return {
//     type: types.AUTHORIZATION.REGISTRATION_ERROR,
//     payload: { errorType, error }
//   };
// };

import { indexBy, map, prop } from 'ramda';
import * as R from 'ramda';

import { getProfile, getPersonalDataForm } from './selectors';
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
    dispatch(fetchActivitiesError(error));
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

export const postPersonalData = () => async (dispatch, getState) => {
  dispatch(postPersonalDataRequest());

  const state = getState();
  const form = getPersonalDataForm(state);
  const data = R.mergeRight(getProfile(state), {
    firstName: form.firstName,
    lastName: form.lastName,
    gender: form.gender,
    languages: [form.language]
  });

  const response = await putPersonalData(data);
  const { error } = response;

  if (!error) {
    dispatch(postPersonalDataSuccess());
    dispatch(changeTabIndex(1));
  } else {
    dispatch(postPersonalDataError(error));
  }
};

const postPersonalDataRequest = () => {
  return {
    type: types.REGISTRATION.POST_PERSONAL_DATA_REQUEST
  };
};

const postPersonalDataSuccess = payload => {
  return {
    type: types.REGISTRATION.POST_PERSONAL_DATA_SUCCESS,
    payload
  };
};

const postPersonalDataError = payload => {
  return {
    type: types.REGISTRATION.POST_PERSONAL_DATA_ERROR,
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

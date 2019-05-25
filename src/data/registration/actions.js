import { AsyncStorage } from 'react-native';

import types from 'src/constants/actionTypes';
import auth0 from 'src/framework/auth0';
import { getActivities, putPersonalData } from 'src/api/registrationApi';
import { postRegistrationData } from 'src/api/registrationApi';
import { refreshByCredentials } from 'src/api/refreshTokenApi';
// import { isNotConnected } from 'src/framework/connection';

export const signUp = (email, password) => async dispatch => {
  // if (await isNotConnected()) {
  //   return dispatch(signUpError('connection'));
  // }
  try {
    const responseData = await postRegistrationData({
      client_id: 'BBLp6dT9ug1mxY5UI3xwld6cA3Ukn8aH',
      email: email,
      password: password,
      connection: 'Username-Password-Authentication'
    });

    const credentials = await auth0.auth.passwordRealm({
      username: email,
      password: password,
      realm: 'Username-Password-Authentication',
      scope: 'openid offline_access'
    });
    await AsyncStorage.setItem('refreshToken', credentials.refreshToken);

    const { idToken } = await refreshByCredentials(credentials);
    AsyncStorage.setItem('idToken', idToken);

    dispatch(setUserCredentialsInfo(responseData));
    dispatch(changeTabIndex(1));
    dispatch(fetchActivities())
  } catch (error) {
    // dispatch(signUpError('connection'));
    console.log('AuthorizeActionError:', error);
  }
};

export const fetchActivities = () => async dispatch => {
  dispatch(fetchActivitiesRequest());
  const activities = await getActivities();
  if (activities) {
    dispatch(fetchActivitiesSucess(activities));
  } else {
    dispatch(fetchActivitiesError('error'));
  }
};


export const postPersonalData = (personalDataForm) => async dispatch => {
  console.log('personalDataForm', personalDataForm)
  try {
    const responseData = await putPersonalData(personalDataForm);
    console.log('responseData', responseData)
  } catch(error) {
    console.log('Error:', error);
  }

}

const fetchActivitiesRequest = () => {
  return {
    type: types.REGISTRATION.FETCH_ACTIVITIES_REQUEST,
  };
};

const fetchActivitiesSucess = payload => {
  return {
    type: types.REGISTRATION.FETCH_ACTIVITIES_SUCCESS,
    payload
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
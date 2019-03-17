import types from 'src/constants/actionTypes';
import { postRegistrationData } from 'src/api/registrationAPI';

export const signUp = (email, password) => async () => {
  const data = {
    client_id: 'BBLp6dT9ug1mxY5UI3xwld6cA3Ukn8aH',
    email: email,
    password: password,
    connection: 'Username-Password-Authentication'
  };
  try {
    const responseData = await postRegistrationData(data);
    console.log('responseData', responseData)
  } catch (error) {
    console.log('AuthorizeActionError:', error);
  }
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

export const toogleActivity = payload => {
  return {
    type: types.REGISTRATION.TOGGLE_ACTIVITY,
    payload
  };
};

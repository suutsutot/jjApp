import { isNil, isEmpty } from 'ramda';

export const isFieldNotValid = value => isNil(value) || isEmpty(value);
export const getProfile = state => state.registration.profile;
export const getPersonalDataForm = state => state.registration.personalDataForm;

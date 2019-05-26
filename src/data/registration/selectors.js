import * as R from 'ramda';

export const isFieldNotValid = value => R.isNil(value) || R.isEmpty(value);
export const getProfile = state => state.registration.profile;
export const getPersonalDataForm = state => state.registration.personalDataForm;
export const getSelectedActivitiesIds = state =>
  state.registration.selectedActivities;
export const getSelectedActivities = state =>
  R.values(
    R.pick(
      state.registration.selectedActivities,
      state.registration.data.activities
    )
  );
export const getRegistrationData = state => ({
  userId: state.registration.userId,
  email: state.registration.email,
  profile: state.registration.profile
});

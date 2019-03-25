import types from 'src/constants/actionTypes';
import { getUserData } from '../../api/userApi';

export const fetchUserProfile = () => async (dispatch, getState) => {
  const { userId } = getState().user;
  const data = await getUserData(userId);
  dispatch(setUserProfile(data.user));
};

export const setUserProfile = profile => {
  return {
    type: types.USER.SET_USER_PROFILE,
    payload: profile
  };
};

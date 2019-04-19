import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import * as R from 'ramda';

import types from 'src/constants/actionTypes';
import { activityReducer } from './activity/activityReducer';
import { authorize } from './authorization/reducer';
import { user } from './user/reducer';
import { navReducer } from './nav/navReducer';
import { events } from './event/reducer';
import { notifications } from './notifications/reducer';
import { registration } from './registration/reducer';
import { loginPage } from './loginPage/reducer';

const appReducer = combineReducers({
  nav: navReducer,
  activity: activityReducer,
  authorize: persistReducer(
    {
      key: 'authorize',
      storage: AsyncStorage,
      whitelist: ['profile', 'auth0Id']
    },
    authorize
  ),
  user: persistReducer(
    {
      key: 'user',
      storage: AsyncStorage,
      whitelist: ['userId', 'email', 'notificationsInfo', 'profile']
    },
    user
  ),
  events,
  notifications: persistReducer(
    {
      key: 'notifications',
      storage: AsyncStorage,
      whitelist: ['list', 'data']
    },
    notifications
  ),
  loginPage,
  registration
});

export default (state, action) => {
  if (action.type === types.AUTHORIZATION.LOGOUT) {
    const defaultState = appReducer(undefined, action);
    return R.mergeDeepLeft(
      {
        user: { notificationsInfo: state.user.notificationsInfo }
      },
      defaultState
    );
  }

  return appReducer(state, action);
};

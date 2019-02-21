import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import types from 'src/constants/actionTypes';
import {activityReducer} from './activity/activityReducer';
import {authorize} from './authorization/reducer';
import {user} from './user/reducer';
import {navReducer} from './nav/navReducer';
import {events} from './event/reducer';
import {notifications} from './notifications/reducer';
import {loginPage} from './loginPage/reducer'

const appReducer = combineReducers({
  nav: navReducer,
  activity: activityReducer,
  authorize: persistReducer({
    key: 'authorize',
    storage: AsyncStorage,
    whitelist: ['profile', 'auth0Id']
  }, authorize),
  user: persistReducer({
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['userId', 'email', 'profile']
  }, user),
  events,
  notifications: persistReducer({
    key: 'notifications',
    storage: AsyncStorage,
    whitelist: ['list', 'data']
  }, notifications),
  loginPage
});

export default (state, action) => {
  if (action.type === types.AUTHORIZATION.LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
}

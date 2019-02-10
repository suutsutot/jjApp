import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import { LOGOUT } from 'src/constants/actionTypes';
import {activityReducer} from './activity/activityReducer';
import {authorize} from './authorization/reducer';
import {globalReducer} from './global/globalReducer';
import {user} from './user/reducer';
import {navReducer} from './nav/navReducer';
import {events} from './event/reducer';
import {notifications} from './notifications/reducers';

const appReducer = combineReducers({
  nav: navReducer,
  activity: activityReducer,
  authorize: persistReducer({
    key: 'authorize',
    storage: AsyncStorage,
    whitelist: ['profile', 'auth0Id']
  }, authorize),
  global: globalReducer,
  user,
  events,
  notifications: persistReducer({
    key: 'notifications',
    storage: AsyncStorage,
    whitelist: ['list', 'data']
  }, notifications),
});

export default (state, action) => {
  if (action.type === LOGOUT) {
    appReducer(undefined, action);
  }

  return appReducer(state, action);
}

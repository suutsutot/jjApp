import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import {activityReducer} from './activity/activityReducer';
import {authorize} from './authorization/reducer';
import {globalReducer} from './global/globalReducer';
import {user} from './user/reducer';
import {navReducer} from './nav/navReducer';
import {events} from './event/reducer';
import {notifications} from './notifications/reducers';

export default combineReducers({
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

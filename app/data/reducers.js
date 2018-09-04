import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import {activityReducer} from './activity/activityReducer';
import {authorizeReducer} from './authorization/authorizationReducer';
import {globalReducer} from './global/globalReducer';
import {userReducer} from './user/userReducer';
import {navReducer} from './nav/navReducer';
import {eventReducer} from './event/eventReducer';
import {notifications} from './notifications/reducers';

export default combineReducers({
  nav: navReducer,
  activity: activityReducer,
  authorize: authorizeReducer,
  global: globalReducer,
  user: userReducer,
  events: eventReducer,
  notifications: persistReducer({
    key: 'notifications',
    storage: AsyncStorage,
    whitelist: ['list']
  }, notifications),
});

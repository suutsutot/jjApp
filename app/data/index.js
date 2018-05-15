import {combineReducers} from 'redux';

import {activityReducer} from './activity/activityReducer';
import {authorizeReducer} from './authorization/authorizationReducer';
import {globalReducer} from './global/globalReducer';
import {userReducer} from './user/userReducer';
import {navReducer} from './nav/navReducer';
import {eventReducer} from './event/eventReducer';
import {notifyReducer} from './notification/notificationReducer';


export default combineReducers({
    nav: navReducer,
    activity: activityReducer,
    authorize: authorizeReducer,
    global: globalReducer,
    user: userReducer,
    events: eventReducer,
    notifications: notifyReducer,
});

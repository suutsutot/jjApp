// - Import react components
import {combineReducers} from 'redux'

// - Import reducers
import {activityReducer} from './activityReducer'
import {authorizeReducer} from './authorizeReducer'
import {globalReducer} from './globalReducer'
import {userReducer} from './userReducer'
import {navReducer} from './navReducer'
import {eventReducer} from './eventReducer'
import {notifyReducer} from './notifyReducer'


export default combineReducers({
    nav: navReducer,
    activity: activityReducer,
    authorize: authorizeReducer,
    global: globalReducer,
    user: userReducer,
    events: eventReducer,
    notifications: notifyReducer,
})

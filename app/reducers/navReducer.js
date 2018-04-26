import {NavigationActions} from 'react-navigation'
import {
    StatusBar
} from 'react-native'
import {MasterNavigator} from '../routes/Router'


// Start with two routes: The Main screen, with the Login screen on top.

export let navReducer = (state, action) => {
    let nextState;
    switch (action.type) {
        default:
            nextState = MasterNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};


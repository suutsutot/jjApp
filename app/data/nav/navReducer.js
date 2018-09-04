import {MasterNavigator} from 'app/components/Router';

export let navReducer = (state, action) => {
    let nextState;
    switch (action.type) {
        default:
            nextState = MasterNavigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
};

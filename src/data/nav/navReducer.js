import {Navigator} from 'src/components/Router';

export let navReducer = (state, action) => {
    let nextState;
    switch (action.type) {
        default:
            nextState = Navigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
};

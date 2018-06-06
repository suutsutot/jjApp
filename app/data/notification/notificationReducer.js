import * as types from 'app/constants/actionTypes';

let defaultState = {
    userNotifies: [],
    loaded: false
};

export let notifyReducer = (state = defaultState, action) => {
    let {payload} = action;
    switch (action.type) {
        case types.ADD_NOTIFY:
            return state;

        case types.ADD_NOTIFY_LIST:
            return {
                ...state,
                userNotifies: [...payload],
                loaded: true
            };

        case types.UPDATE_NOTIFICATIONS:
            return {
                ...state,
                userNotifies: [...payload],
                loaded: true
            };
        default:
            return state;

    }
};

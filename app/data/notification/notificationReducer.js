import merge from 'lodash/merge'

import * as types from './../../constants/actionTypes'

let defaultState = {
    userNotifies: [],
    loaded: false
};

export let notifyReducer = (state = defaultState, action) => {
    let {payload} = action;
    console.log('payloadqwerty', payload)
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

        case types.SEEN_NOTIFY:
            return {
                ...state,
                userNotifies: {
                    ...state.userNotifies,
                    [payload]: {
                        ...state.userNotifies[payload],
                        isSeen: true
                    }
                },
                loaded: true
            };

        case types.DELETE_NOTIFY:
            var parsedNotifies = {};
            Object.keys(state.userNotifies).map((id) => {
                if (id !== payload) {
                    merge(parsedNotifies, {[id]: {...state.userNotifies[id]}})
                }

            });
            return {
                ...state,
                userNotifies: {
                    ...parsedNotifies
                }
            };


        case types.CLEAR_ALL_DATA_NOTIFY:
            return defaultState;


        default:
            return state;

    }
};
